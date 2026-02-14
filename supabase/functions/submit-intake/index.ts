import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const GHL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/vMRpHtI7DCeMXTjneZMn/webhook-trigger/4d155fcf-352a-4e01-b718-417f1d7817e1";

// Server-side validation
const validateIntakeData = (data: Record<string, unknown>): string | null => {
  // Step 1: Basic info
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
  if (age < 18) return "Must be at least 18 years old";

  // Step 2: Emergency contact
  const emergencyName = String(data.emergencyName || "").trim();
  if (emergencyName.length < 2 || emergencyName.length > 100) return "Invalid emergency contact name";

  const emergencyPhone = String(data.emergencyPhone || "").trim();
  if (!/^[\d\s\-\+\(\)]{7,20}$/.test(emergencyPhone)) return "Invalid emergency phone";

  const emergencyRelation = String(data.emergencyRelation || "").trim();
  if (!emergencyRelation) return "Emergency contact relationship is required";

  // Step 3: Ceremony info
  const ceremonyType = String(data.ceremonyType || "").trim();
  if (!ceremonyType) return "Ceremony type is required";

  const experienceLevel = String(data.experienceLevel || "").trim();
  if (!experienceLevel) return "Experience level is required";

  const intentions = String(data.intentions || "").trim();
  if (intentions.length < 10 || intentions.length > 2000) return "Intentions must be 10-2000 characters";

  // Step 5: Required agreements
  if (!data.rfrAgreement || !data.liabilityWaiver || !data.truthfulness || 
      !data.confidentiality || !data.preparationCompliance || !data.emergencyAuth) {
    return "All agreements must be accepted";
  }

  // Sanitize all string fields to prevent injection
  for (const key of Object.keys(data)) {
    if (typeof data[key] === "string") {
      const val = data[key] as string;
      if (val.length > 5000) return `Field ${key} exceeds maximum length`;
    }
  }

  return null; // valid
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Server-side validation
    const validationError = validateIntakeData(body);
    if (validationError) {
      return new Response(JSON.stringify({ error: validationError }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Forward validated data to GHL webhook
    const webhookResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
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
