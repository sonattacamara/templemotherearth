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

const validateIntakeData = (data: Record<string, unknown>): string | null => {
  const firstName = String(data.firstName || "").trim();
  if (firstName.length < 1 || firstName.length > 50) return "First name is required";

  const lastName = String(data.lastName || "").trim();
  if (lastName.length < 1 || lastName.length > 50) return "Last name is required";

  const email = String(data.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) return "Invalid email";

  const phone = String(data.phone || "").trim();
  if (!/^[\d\s\-\+\(\)]{7,20}$/.test(phone)) return "Invalid phone number";

  const dob = String(data.dob || "");
  const dobDate = new Date(dob);
  if (isNaN(dobDate.getTime())) return "Invalid date of birth";
  const age = (Date.now() - dobDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  if (age < 21) return "Must be at least 21 years old";

  const cityState = String(data.cityState || "").trim();
  if (cityState.length < 2 || cityState.length > 200) return "City/state of residence is required";

  const emergencyName = String(data.emergencyName || "").trim();
  if (emergencyName.length < 2 || emergencyName.length > 100) return "Invalid emergency contact name";

  const emergencyPhone = String(data.emergencyPhone || "").trim();
  if (!/^[\d\s\-\+\(\)]{7,20}$/.test(emergencyPhone)) return "Invalid emergency phone";

  const emergencyRelation = String(data.emergencyRelation || "").trim();
  if (!emergencyRelation) return "Emergency contact relationship is required";

  const ceremonyType = String(data.ceremonyType || "").trim();
  if (!ceremonyType) return "Ceremony type is required";

  const experienceLevel = String(data.experienceLevel || "").trim();
  if (!experienceLevel) return "Experience level is required";

  const intentions = String(data.intentions || "").trim();
  if (intentions.length < 10 || intentions.length > 2000) return "Intentions must be 10-2000 characters";

  if (!data.rfrAgreement || !data.liabilityWaiver || !data.truthfulness || 
      !data.confidentiality || !data.preparationCompliance || !data.emergencyAuth ||
      !data.communityGuidelines || !data.eligibilityStatement || !data.ageConfirmation21) {
    return "All agreements must be accepted";
  }

  for (const key of Object.keys(data)) {
    if (typeof data[key] === "string") {
      const val = data[key] as string;
      if (val.length > 5000) return `Field ${key} exceeds maximum length`;
    }
  }

  return null;
};

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    const validationError = validateIntakeData(body);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();

    // Normalize DOB to YYYY-MM-DD
    const dateOfBirth = (() => {
      const raw = String(body.dob || "").trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
      const parts = raw.split(/[-\/]/);
      if (parts.length === 3) {
        const [a, b, c] = parts;
        if (a.length === 4) return `${a}-${b.padStart(2,"0")}-${c.padStart(2,"0")}`;
        return `${c}-${a.padStart(2,"0")}-${b.padStart(2,"0")}`;
      }
      return raw;
    })();

    const ghlResult = await upsertGHLContact({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: String(body.email).trim(),
      phone: String(body.phone || "").trim(),
      tags: ["ceremony-intake-submission"],
      source: "temple-mother-earth-sacred-intake",
    });

    if (!ghlResult.success) {
      console.error("GHL upsert error:", ghlResult.error);
      return new Response(JSON.stringify({ error: "Submission failed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 502,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Submit intake error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
