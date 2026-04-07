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
    const { firstName, lastName, email, phone, birthDate, birthTime, birthCity } = await req.json();

    if (!firstName || typeof firstName !== "string" || firstName.trim().length === 0) {
      return new Response(JSON.stringify({ error: "First name is required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return new Response(JSON.stringify({ error: "A valid email is required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!birthDate || typeof birthDate !== "string") {
      return new Response(JSON.stringify({ error: "Date of birth is required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!birthCity || typeof birthCity !== "string" || birthCity.trim().length === 0) {
      return new Response(JSON.stringify({ error: "City & country of birth is required." }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ghlResult = await upsertGHLContact({
      firstName: firstName.trim().slice(0, 100),
      lastName: (lastName || "").trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 255),
      phone: (phone || "").trim().slice(0, 20),
      tags: ["sacred-blueprint-request"],
      source: "sacred-blueprint-page",
    });

    if (!ghlResult.success) {
      console.error("GHL upsert failed:", ghlResult.error);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-sacred-blueprint error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
