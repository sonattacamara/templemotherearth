import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { upsertGHLContact } from "../_shared/ghl-contact.ts";

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
    const { firstName, lastName, email, phone, interests, availability, experience, whyJoin, roleTags, source } = body;

    if (!firstName || !lastName || !email) {
      return new Response(JSON.stringify({ error: "First name, last name, and email are required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tags = ["volunteer-application"];
    if (Array.isArray(roleTags)) {
      for (const t of roleTags) {
        if (typeof t === "string" && t.length < 60) tags.push(t);
      }
    }
    if (source === "scholarship-page") tags.push("scholarship-applicant");

    const ghlResult = await upsertGHLContact({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      name: `${String(firstName).trim()} ${String(lastName).trim()}`,
      email: String(email).trim().toLowerCase(),
      phone: String(phone || "").trim(),
      tags,
      source: source === "scholarship-page" ? "scholarship-page" : "volunteer-page",
    });

    // Log volunteer details for follow-up (visible in edge function logs until GHL custom field IDs are wired)
    console.log("Volunteer application details:", {
      email: String(email).trim().toLowerCase(),
      interests: String(interests || ""),
      availability: String(availability || ""),
      experience: String(experience || "").slice(0, 500),
      whyJoin: String(whyJoin || "").slice(0, 500),
    });

    if (!ghlResult.success) {
      console.error("GHL upsert failed:", ghlResult.error);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-volunteer error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
