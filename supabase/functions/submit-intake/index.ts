import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

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

const GHL_WEBHOOK_URL = Deno.env.get("GHL_WEBHOOK_URL");
if (!GHL_WEBHOOK_URL) {
  throw new Error("GHL_WEBHOOK_URL is not configured");
}

// Server-side validation
const validateIntakeData = (data: Record<string, unknown>): string | null => {
  const fullName = String(data.fullName || "").trim();
  if (fullName.length < 2 || fullName.length > 100) return "Invalid name";

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

    const webhookResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        firstName: String(body.fullName || "").trim().split(/\s+/)[0] || "",
        lastName: String(body.fullName || "").trim().split(/\s+/).slice(1).join(" ") || "",
        // GHL expects YYYY-MM-DD format — HTML date inputs already send YYYY-MM-DD
        // Just pass through if already in correct format, otherwise normalize
        dateOfBirth: (() => {
          const raw = String(body.dob || "").trim();
          // HTML date input gives YYYY-MM-DD — validate and pass through
          if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
          // Fallback: try to parse and reformat
          const parts = raw.split(/[-\/]/);
          if (parts.length === 3) {
            // Handle MM/DD/YYYY or DD/MM/YYYY by assuming MM/DD/YYYY (US format)
            const [a, b, c] = parts;
            if (a.length === 4) return `${a}-${b.padStart(2,"0")}-${c.padStart(2,"0")}`;
            return `${c}-${a.padStart(2,"0")}-${b.padStart(2,"0")}`;
          }
          return raw;
        })(),
        integrationStatus: "Not Started",
        submittedAt: new Date().toISOString(),
        source: "temple-mother-earth-sacred-intake",
      }),
    });

    if (!webhookResponse.ok) {
      console.error("GHL webhook error:", webhookResponse.status);
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
