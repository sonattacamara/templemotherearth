import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { firstName, lastName, email, phone, birthDate, birthTime, birthCity } = await req.json();

    // Validate required fields
    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      return new Response(JSON.stringify({ error: "First name is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "A valid email is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!birthDate || typeof birthDate !== "string") {
      return new Response(JSON.stringify({ error: "Date of birth is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!birthCity || typeof birthCity !== "string" || birthCity.trim().length === 0) {
      return new Response(JSON.stringify({ error: "City & country of birth is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GHL_WEBHOOK_URL = Deno.env.get("GHL_WEBHOOK_URL");
    if (!GHL_WEBHOOK_URL) {
      console.error("GHL_WEBHOOK_URL is not configured");
      return new Response(JSON.stringify({ error: "Webhook not configured. Please contact support." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Send to GoHighLevel
    const ghlPayload = {
      firstName: firstName.trim().slice(0, 100),
      lastName: (lastName || "").trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 255),
      phone: (phone || "").trim().slice(0, 20),
      birthDate: birthDate.trim(),
      birthTime: (birthTime || "").trim(),
      birthCity: birthCity.trim().slice(0, 200),
      tags: ["sacred-blueprint-request"],
      source: "sacred-blueprint-page",
    };

    const ghlResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ghlPayload),
    });

    if (!ghlResponse.ok) {
      console.error("GHL webhook failed:", ghlResponse.status, await ghlResponse.text());
      // Still return success to user — contact was attempted
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-sacred-blueprint error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
