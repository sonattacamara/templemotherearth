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
    const { fullName, email, phone, location, ceremonyType, groupSize, preferredDates, venue, intentions, additionalInfo } = body;

    if (!fullName || !email) {
      return new Response(JSON.stringify({ error: "Name and email are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = {
      firstName: fullName.trim().split(" ")[0],
      lastName: fullName.trim().split(" ").slice(1).join(" "),
      email: email.trim().toLowerCase(),
      phone: (phone || "").trim(),
      location,
      ceremonyType,
      groupSize,
      preferredDates,
      venue,
      intentions,
      additionalInfo,
      tags: ["traveling-ceremony-inquiry"],
      source: "traveling-ceremonies-page",
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
    console.error("submit-traveling-ceremony error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
