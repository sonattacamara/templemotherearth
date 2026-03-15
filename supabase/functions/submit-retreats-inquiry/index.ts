import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/vMRpHtI7DCeMXTjneZMn/webhook-trigger/4d155fcf-352a-4e01-b718-417f1d7817e1";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { fullName, email, phone, retreatInterest, groupSize, experience, dietaryNeeds, intentions, medicalConcerns, howHeard } = body;

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
      retreatInterest,
      groupSize,
      experience,
      dietaryNeeds,
      intentions,
      medicalConcerns,
      howHeard,
      tags: ["retreats-inquiry"],
      source: "retreats-inquiry-page",
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
    console.error("submit-retreats-inquiry error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
