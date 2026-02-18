import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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
    checks.webhook_secret = { status: "fail", message: "STRIPE_WEBHOOK_SECRET is not set — webhook signature verification disabled" };
  }

  // 3. Stripe API connectivity
  if (stripeKey) {
    try {
      const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });
      await stripe.balance.retrieve();
      checks.stripe_api = { status: "pass", message: "Stripe API connection successful" };
    } catch (e) {
      checks.stripe_api = { status: "fail", message: `Stripe API error: ${e instanceof Error ? e.message : String(e)}` };
    }
  } else {
    checks.stripe_api = { status: "fail", message: "Cannot test — no API key" };
  }

  // 4. Supabase env
  const supaUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (supaUrl && serviceKey) {
    checks.supabase_env = { status: "pass", message: "SUPABASE_URL and SERVICE_ROLE_KEY are configured" };
  } else {
    checks.supabase_env = { status: "fail", message: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" };
  }

  // 5. Webhook endpoint URL
  const webhookUrl = `${supaUrl}/functions/v1/stripe-webhook`;
  checks.webhook_endpoint = { status: "pass", message: `Webhook endpoint: ${webhookUrl}` };

  const allPassing = Object.values(checks).every((c) => c.status === "pass");

  return new Response(
    JSON.stringify({ healthy: allPassing, checks, timestamp: new Date().toISOString() }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
  );
});
