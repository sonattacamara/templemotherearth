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
    const { email, firstName, calling, source: clientSource } = await req.json();

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Email is required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 255) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Optional · validate and tag "what called you here" radio choice
    const ALLOWED_CALLINGS = new Set([
      "purification",     // Kambo / cleansing
      "stillness",        // Yin / rest
      "ceremony",         // Sacred Tea / cacao / hapé
      "community",        // Membership / village
      "guidance",         // 1:1 / Blueprint / private
      "still-listening",  // not sure yet
    ]);
    const tags = ["temple-transmissions-newsletter"];
    let safeCalling: string | null = null;
    if (typeof calling === "string" && ALLOWED_CALLINGS.has(calling)) {
      safeCalling = calling;
      tags.push(`calling-${calling}`);
    }

    const safeFirstName =
      typeof firstName === "string" && firstName.trim().length > 0 && firstName.trim().length <= 80
        ? firstName.trim()
        : undefined;

    const safeSource =
      typeof clientSource === "string" && clientSource.trim().length > 0 && clientSource.trim().length <= 80
        ? clientSource.trim()
        : "temple_transmissions";

    const ghlResult = await upsertGHLContact({
      email: trimmedEmail,
      ...(safeFirstName && { firstName: safeFirstName }),
      tags,
      source: safeSource,
    });

    if (!ghlResult.success) {
      console.error("GHL upsert error:", ghlResult.error);
      return new Response(JSON.stringify({ error: "Submission failed" }), {
        status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, calling: safeCalling }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
