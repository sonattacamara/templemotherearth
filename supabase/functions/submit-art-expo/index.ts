import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHL_WEBHOOK_URL = Deno.env.get("GHL_WEBHOOK_URL");
if (!GHL_WEBHOOK_URL) {
  throw new Error("GHL_WEBHOOK_URL is not configured");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, city, mediums, description, portfolio, event, heardFrom } = body;

    if (!firstName || !lastName || !email || !phone || !city) {
      return new Response(JSON.stringify({ error: "Please fill in all required fields." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build event-specific tags
    const tags = ["art-expo-applicant"];
    if (event === "Spring Equinox — March 28, 2026") tags.push("art-expo-spring-2026");
    else if (event === "Fall Equinox — Fall 2026") tags.push("art-expo-fall-2026");
    else if (event === "Canvas & Ceremony — July 2026") tags.push("canvas-ceremony-july-2026");
    else if (event === "All of the above") {
      tags.push("art-expo-spring-2026", "art-expo-fall-2026", "canvas-ceremony-july-2026");
    }

    const payload = {
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      name: `${String(firstName).trim()} ${String(lastName).trim()}`,
      email: String(email).trim().toLowerCase(),
      phone: String(phone || "").trim(),
      city,
      mediums: Array.isArray(mediums) ? mediums.join(", ") : mediums,
      description,
      portfolio,
      event,
      heardFrom,
      tags,
      source: "art-expo-submission",
      submittedAt: new Date().toISOString(),
    };

    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("GHL webhook failed:", res.status, await res.text());
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-art-expo error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
