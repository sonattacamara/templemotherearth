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
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const lastName = String(body.lastName || "").trim();
    if (lastName.length < 1 || lastName.length > 50) {
      return new Response(JSON.stringify({ error: "Last name is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const email = String(body.email || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const phone = String(body.phone || "").trim();
    if (phone.length < 7) {
      return new Response(JSON.stringify({ error: "Valid phone number is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const nameParts = fullName.split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const webhookResponse = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fullName,
        firstName,
        lastName,
        email,
        phone,
        branch: String(body.branch || "").trim(),
        branchOther: String(body.branchOther || "").trim(),
        serviceEra: String(body.serviceEra || "").trim(),
        yearsOfService: String(body.yearsOfService || "").trim(),
        deployments: String(body.deployments || "").trim(),
        dischargeType: String(body.dischargeType || "").trim(),
        struggles: Array.isArray(body.struggles) ? body.struggles.join(", ") : "",
        strugglesOther: String(body.strugglesOther || "").trim(),
        currentSupport: Array.isArray(body.currentSupport) ? body.currentSupport.join(", ") : "",
        currentSupportOther: String(body.currentSupportOther || "").trim(),
        currentMedications: String(body.currentMedications || "").trim(),
        programInterest: String(body.programInterest || "").trim(),
        plantMedicineExperience: String(body.plantMedicineExperience || "").trim(),
        hasSpouseInterest: String(body.hasSpouseInterest || "").trim(),
        contactMethod: String(body.contactMethod || "").trim(),
        hearAbout: String(body.hearAbout || "").trim(),
        hearAboutOther: String(body.hearAboutOther || "").trim(),
        emergencyName: String(body.emergencyName || "").trim(),
        emergencyPhone: String(body.emergencyPhone || "").trim(),
        additionalInfo: String(body.additionalInfo || "").trim(),
        submittedAt: new Date().toISOString(),
        source: "temple-mother-earth-veterans-form",
        tags: ["veterans-transformation-program"],
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
    console.error("Submit veterans error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
