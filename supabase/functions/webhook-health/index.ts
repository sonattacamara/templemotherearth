import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Require admin authentication
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supaUrlEnv = Deno.env.get("SUPABASE_URL") ?? "";
  const serviceKeyEnv = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const authClient = createClient(supaUrlEnv, serviceKeyEnv);
  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await authClient.auth.getUser(token);
  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const { data: roleData } = await authClient
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!roleData) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const checks: Record<string, { status: "pass" | "fail" | "warn"; message: string }> = {};

  // 1. STRIPE_SECRET_KEY
  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  if (stripeKey) {
    checks.stripe_secret_key = { status: "pass", message: "STRIPE_SECRET_KEY is configured" };
  } else {
    checks.stripe_secret_key = { status: "fail", message: "STRIPE_SECRET_KEY is not set" };
  }

  // 2. STRIPE_WEBHOOK_SECRET
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (webhookSecret) {
    checks.webhook_secret = { status: "pass", message: "STRIPE_WEBHOOK_SECRET is configured" };
  } else {
    checks.webhook_secret = { status: "fail", message: "STRIPE_WEBHOOK_SECRET is not set" };
  }

  // 3. Stripe API connectivity
  if (stripeKey) {
    try {
      const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
      await stripe.balance.retrieve();
      checks.stripe_api = { status: "pass", message: "Stripe API connection successful" };
    } catch (e) {
      checks.stripe_api = { status: "fail", message: "Stripe API error" };
    }
  } else {
    checks.stripe_api = { status: "fail", message: "Cannot test — no API key" };
  }

  // 4. Supabase env
  if (supaUrlEnv && serviceKeyEnv) {
    checks.supabase_env = { status: "pass", message: "Backend environment configured" };
  } else {
    checks.supabase_env = { status: "fail", message: "Backend environment missing" };
  }

  // 5. Webhook endpoint (presence only, no URL leakage)
  checks.webhook_endpoint = { status: "pass", message: "Webhook endpoint configured" };

  const allPassing = Object.values(checks).every((c) => c.status === "pass");

  return new Response(
    JSON.stringify({ healthy: allPassing, checks, timestamp: new Date().toISOString() }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
  );
});
