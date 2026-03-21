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

const GHL_WEBHOOK_URL = Deno.env.get("GHL_WEBHOOK_URL");
if (!GHL_WEBHOOK_URL) {
  throw new Error("GHL_WEBHOOK_URL is not configured");
}

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

    const { email, firstName, lastName, full_name, user_id } = await req.json();

    // Validate inputs
    const emailStr = String(email || "").trim();
    if (!emailStr || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr) || emailStr.length > 255) {
      throw new Error("Valid email is required");
    }
    const firstNameStr = String(firstName || "").trim().slice(0, 100);
    const lastNameStr = String(lastName || "").trim().slice(0, 100);
    const nameStr = String(full_name || `${firstNameStr} ${lastNameStr}`).trim().slice(0, 200);
    const userIdStr = String(user_id || "").trim();
    if (userIdStr && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(userIdStr)) {
      throw new Error("Invalid user ID format");
    }

    logStep("Welcome email request", { email: emailStr, firstName: firstNameStr, lastName: lastNameStr });

    const webhookResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstNameStr,
        lastName: lastNameStr,
        name: nameStr,
        email: emailStr,
        source: "temple-mother-earth-welcome-circle",
        event: "new_member_signup",
        tier: "welcome-circle",
        tags: ["welcome-circle-member"],
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
      metadata: { email: emailStr, full_name: nameStr, user_id: userIdStr },
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
