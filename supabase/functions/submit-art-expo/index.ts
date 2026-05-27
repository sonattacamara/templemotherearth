import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { upsertGHLContact } from "../_shared/ghl-contact.ts";
import { validateLead } from "../_shared/validation.ts";

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
    const body = await req.json();
    const { city, event } = body;
    const v = validateLead(body);
    if (!v.ok) {
      return new Response(JSON.stringify({ error: v.error }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { firstName, lastName, email, phone } = v.value;
    const cityClean = String(city || "").trim().slice(0, 100);
    if (!phone || !cityClean) {
      return new Response(JSON.stringify({ error: "Please fill in all required fields." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tags = ["art-expo-applicant"];
    if (event === "Spring Equinox — March 28, 2026") tags.push("art-expo-spring-2026");
    else if (event === "Fall Equinox — Fall 2026") tags.push("art-expo-fall-2026");
    else if (event === "Canvas & Ceremony — July 2026") tags.push("canvas-ceremony-july-2026");
    else if (event === "All of the above") {
      tags.push("art-expo-spring-2026", "art-expo-fall-2026", "canvas-ceremony-july-2026");
    }

    const ghlResult = await upsertGHLContact({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      tags,
      source: "art-expo-submission",
    });

    if (!ghlResult.success) {
      console.error("GHL upsert failed:", ghlResult.error);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-art-expo error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
