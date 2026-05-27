import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { upsertGHLContact } from "../_shared/ghl-contact.ts";
import { validateLead } from "../_shared/validation.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const body = await req.json();
    const v = validateLead(body);
    if (!v.ok) {
      return new Response(JSON.stringify({ error: v.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const { firstName, lastName, email, phone } = v.value;
    const result = await upsertGHLContact({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      phone,
      tags: ["sayulita-immersion", "infinite-yes", "mexico-2026"],
      source: "sayulita-infinite-yes-application",
    });
    if (!result.success) console.error("GHL upsert failed:", result.error);
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("submit-sayulita error:", err);
    return new Response(JSON.stringify({ error: "Internal server error." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});