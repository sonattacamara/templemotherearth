import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/vMRpHtI7DCeMXTjneZMn/webhook-trigger/4d155fcf-352a-4e01-b718-417f1d7817e1";

const validateContactData = (data: Record<string, unknown>): string | null => {
  const name = String(data.name || "").trim();
  if (name.length < 2 || name.length > 100) return "Name must be 2-100 characters";

  const email = String(data.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return "Invalid email address";

  const message = String(data.message || "").trim();
  if (message.length < 5 || message.length > 2000) return "Message must be 5-2000 characters";

  const subject = String(data.subject || "").trim();
  if (subject.length > 200) return "Subject must be under 200 characters";

  return null;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const validationError = validateContactData(body);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const webhookResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(body.name).trim(),
        email: String(body.email).trim(),
        subject: String(body.subject || "").trim(),
        message: String(body.message).trim(),
        submittedAt: new Date().toISOString(),
        source: "temple-mother-earth-contact-form",
      }),
    });

    if (!webhookResponse.ok) {
      console.error("GHL webhook error:", webhookResponse.status);
      return new Response(JSON.stringify({ error: "Submission failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 502,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Submit contact error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
