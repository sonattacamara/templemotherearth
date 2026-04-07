import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { upsertGHLContact } from "../_shared/ghl-contact.ts";

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

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    const firstName = String(body.firstName || "").trim();
    if (firstName.length < 1 || firstName.length > 50) {
      return new Response(JSON.stringify({ error: "First name is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
      });
    }

    const lastName = String(body.lastName || "").trim();
    if (lastName.length < 1 || lastName.length > 50) {
      return new Response(JSON.stringify({ error: "Last name is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
      });
    }

    const email = String(body.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
      });
    }

    const phone = String(body.phone || "").trim();
    if (phone.length < 7) {
      return new Response(JSON.stringify({ error: "Valid phone number is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
      });
    }

    const ghlResult = await upsertGHLContact({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      tags: ["veterans-transformation-program"],
      source: "temple-mother-earth-veterans-form",
    });

    if (!ghlResult.success) {
      console.error("GHL upsert error:", ghlResult.error);
      return new Response(JSON.stringify({ error: "Submission failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 502,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (error) {
    console.error("Submit veterans error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500,
    });
  }
});
