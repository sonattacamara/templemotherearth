import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const ALLOWED_ORIGINS = [
  "https://templemotherearth.lovable.app",
  "https://templemotherearth.org",
  "http://localhost:8080",
  "http://localhost:5173",
];

const getCorsHeaders = (req: Request) => {
  const origin = req.headers.get("origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
};

const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/vMRpHtI7DCeMXTjneZMn/webhook-trigger/4d155fcf-352a-4e01-b718-417f1d7817e1";

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : "";
  console.log(`[WELCOME-EMAIL] ${step}${detailsStr}`);
};

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const { email, full_name, user_id } = await req.json();
    logStep("Welcome email request", { email, full_name });

    if (!email) throw new Error("Email is required");

    const webhookResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: String(email).trim(),
        name: String(full_name || "").trim(),
        source: "temple-mother-earth-welcome-circle",
        event: "new_member_signup",
        tier: "welcome-circle",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!webhookResponse.ok) {
      logStep("GHL webhook error", { status: webhookResponse.status });
      return new Response(JSON.stringify({ error: "Failed to send welcome email" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 502,
      });
    }

    logStep("Welcome email triggered successfully");

    await supabase.from("form_submissions").insert({
      form_name: "welcome-circle-signup",
      metadata: { email, full_name, user_id },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: msg });
    return new Response(JSON.stringify({ error: msg }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
