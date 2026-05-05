import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
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

const formatIntakeNote = (data: Record<string, unknown>): string => {
  const v = (k: string) => {
    const val = data[k];
    if (Array.isArray(val)) return val.length ? val.join(", ") : "—";
    if (val === undefined || val === null || val === "") return "—";
    if (typeof val === "boolean") return val ? "Yes" : "No";
    return String(val);
  };

  return [
    `=== SACRED INTAKE — ${v("firstName")} ${v("lastName")} ===`,
    "",
    "— Personal —",
    `Email: ${v("email")} | Phone: ${v("phone")}`,
    `DOB: ${v("dob")} | Pronouns: ${v("pronouns")}`,
    `Location: ${v("cityState")} | Armed Forces: ${v("armedForcesStatus")}`,
    "",
    "— Emergency Contact —",
    `${v("emergencyName")} (${v("emergencyRelation")}) — ${v("emergencyPhone")}`,
    "",
    "— Ceremony Selection —",
    `Ceremony: ${v("ceremonyType")}`,
    `Experience Level: ${v("experienceLevel")}`,
    `Intentions: ${v("intentions")}`,
    `How Heard: ${v("howHeard")} ${v("howHeardOther") !== "—" ? "(" + v("howHeardOther") + ")" : ""}`,
    `Referral: ${v("referralName")}`,
    `Current Challenges: ${v("currentChallenges")}`,
    `Trauma Triggers: ${v("traumaTriggers")}`,
    `Questions/Concerns: ${v("questionsOrConcerns")}`,
    "",
    "— Health Screening —",
    `Currently on medications: ${v("takingMedications")} — ${v("medicationsList")}`,
    `Psych meds: ${v("takingPsychMeds")} — ${v("psychMedsList")}`,
    `Recent psych meds (30d): ${v("recentPsychMeds")} — ${v("recentPsychMedsDetails")}`,
    `Blood thinners: ${v("takingBloodThinners")} | Immunosuppressants: ${v("takingImmunosuppressants")}`,
    `Can stop medications: ${v("canStopMedications")} — ${v("canStopMedicationsDetails")}`,
    `Terminal condition: ${v("terminalCondition")} — ${v("terminalConditionDetails")}`,
    `Tobacco adverse reaction: ${v("tobaccoAdverseReaction")}`,
    `Selected Conditions: ${v("selectedConditions")}`,
    `Condition Details: ${v("conditionDetails")}`,
    "",
    "— Mental Health —",
    `Psychiatric hospitalization: ${v("psychiatricHospital")} — ${v("psychiatricHospitalDetails")}`,
    `Suicidal ideation: ${v("suicidalIdeation")} — ${v("suicidalIdeationDetails")}`,
    `Psychotic episodes: ${v("psychoticEpisodes")} — ${v("psychoticEpisodesDetails")}`,
    `Currently in therapy: ${v("inTherapy")} — ${v("therapistName")}`,
    `Recent trauma (6mo): ${v("recentTrauma")} — ${v("recentTraumaDetails")}`,
    `Emotional stability (1-10): ${v("emotionalStability")}`,
    "",
    "— Substances —",
    `Non-sacramental substances: ${v("recreationalDrugs")} — ${v("recreationalDrugsDetails")}`,
    `Alcohol: ${v("consumeAlcohol")} (${v("alcoholFrequency")})`,
    `Cannabis: ${v("useCannabis")} (${v("cannabisFrequency")})`,
    `Treatment history: ${v("substanceAbuseTreatment")} — ${v("substanceAbuseTreatmentDetails")}`,
    `Recent psychedelics (30d): ${v("recentPsychedelics")} — ${v("recentPsychedelicsDetails")}`,
    `Last 48h: ${v("recentSubstances")}`,
    "",
    "— Allergies & Body —",
    `Allergies: ${v("hasAllergies")} — ${v("allergiesList")}`,
    `Frog/amphibian allergy: ${v("frogAllergy")}`,
    `Food sensitivities: ${v("foodSensitivities")} — ${v("foodSensitivitiesDetails")}`,
    `Weight: ${v("weight")} lbs | Height: ${v("heightFeet")}'${v("heightInches")}"`,
    `Fasted before: ${v("hasFasted")} (${v("fastDuration")})`,
    `Mobility limits: ${v("mobilityLimitations")} — ${v("mobilityDetails")}`,
    `Difficulty sitting on floor: ${v("difficultyFloor")}`,
    "",
    "— Previous Ceremony —",
    `Experience level: ${v("ceremonyExperienceLevel")}`,
    `Medicines worked with: ${v("previousMedicines")}${v("previousMedicineOther") !== "—" ? " | Other: " + v("previousMedicineOther") : ""}`,
    `Details: ${v("previousExperienceDetails")}`,
    `Adverse reaction history: ${v("adverseReaction")} — ${v("adverseReactionDetails")}`,
    "",
    "— Kambo Specific (if applicable) —",
    `Had Kambo before: ${v("hadKamboBefore")} (${v("kamboTimes")} times, last: ${v("lastKamboDate")})`,
    `Surgery 6mo: ${v("kamboSurgery")} | Pacemaker: ${v("kamboPacemaker")} | Stroke: ${v("kamboStroke")}`,
    `Addison's: ${v("kamboAddisons")} | Clotting: ${v("kamboClotting")} | Transplant: ${v("kamboTransplant")}`,
    `Implants: ${v("kamboImplants")} | Water fast: ${v("kamboWaterFast")} | Bufo 28d: ${v("kamboBufo28")}`,
    "",
    "— Intentions & Support —",
    `Ceremony intention: ${v("ceremonyIntention")}`,
    `Seeking healing for: ${v("seekingHealing")}`,
    `Integration support: ${v("integrationSupport")}`,
    `Notes for facilitators: ${v("facilitatorNotes")}`,
    "",
    "— Inner Landscape —",
    `Breath: ${v("breathEasily")} | Practice: ${v("breathPractice")}`,
    `Water: ${v("waterIntake")} | Contacts: ${v("wearContacts")}`,
    `Exercise: ${v("exerciseMovement")}`,
    `Food: ${v("nourishFood")}`,
    `Sleep prep: ${v("sleepPrep")} | Hours: ${v("sleepHours")} | Rested: ${v("wakeRested")} | Environment: ${v("sleepEnvironment")}`,
    `Dreams: ${v("dreams")}`,
    `Hold tension: ${v("holdTension")}`,
    `Unfinished business: ${v("unfinishedBusiness")}`,
    `Emotional strengths: ${v("emotionalStrengths")}`,
    `Relate to unconscious: ${v("relateUnconscious")}`,
    `Spiritual person: ${v("spiritualPerson")} | Belief: ${v("beliefInGod")} | Teacher: ${v("spiritualTeacher")}`,
    `Family of origin: ${v("familyRelationship")}`,
    `Community meaning: ${v("communityMeaning")}`,
    `Social: ${v("socialNourishment")} | Time balance: ${v("timeBalance")}`,
    `Time in nature: ${v("timeInNature")} | Home: ${v("homeMessTidy")}`,
    `Repeating patterns: ${v("repeatingPatterns")} | Knowledge vs experience: ${v("knowledgeVsExperience")}`,
    `Innovation area: ${v("innovationArea")}`,
    `Feel love: ${v("feelLove")} | In body: ${v("loveInBody")}`,
    `Express love to self: ${v("expressLoveSelf")}`,
    `Love languages: ${v("loveLanguages")}`,
    `Core essence: ${v("coreEssence")}`,
    `Being with self: ${v("beingWithSelf")}`,
    `Addiction history: ${v("historyAddiction")} — ${v("historyAddictionDetails")}`,
    `Fears/phobias: ${v("fearsPhobias")} — ${v("fearsPhobiasDetails")}`,
    `Energy blockages: ${v("energyBlockages")} — ${v("energyBlockagesDetails")}`,
    `Shadow fears: ${v("shadowFears")}`,
    `Physical/mental/emotional/spiritual notes: ${v("physicalMentalSpiritual")}`,
    `Unmet needs: ${v("unmetNeeds")}`,
    `Willing to sacrifice: ${v("willingToSacrifice")}`,
    `Clarify about life: ${v("clarifyAboutLife")}`,
    `12-hour set-aside: ${v("setAside12Hours")}`,
    `Beliefs that make small: ${v("smallBeliefs")}`,
    `Ready changes: ${v("readyChanges")}`,
    `Our role in healing: ${v("ourRoleInHealing")}`,
    `Anything else: ${v("anythingElseToShare")}`,
  ].join("\n");
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
  if (intentions.length > 2000) return "Intentions must be less than 2000 characters";

  if (!data.rfrAgreement || !data.liabilityWaiver || !data.truthfulness || 
      !data.confidentiality || !data.preparationCompliance || !data.emergencyAuth ||
      !data.communityGuidelines || !data.eligibilityStatement || !data.ageConfirmation21) {
    return "All agreements must be accepted";
  }

  for (const key of Object.keys(data)) {
    if (typeof data[key] === "string") {
      const val = data[key] as string;
      if (val.length > 10000) return `Field ${key} exceeds maximum length`;
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

    // 1) Persist FULL intake to database first (source of truth, never lost)
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (SUPABASE_URL && SERVICE_ROLE) {
      try {
        const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
        await admin.from("form_submissions").insert({
          form_name: "ceremony-intake",
          metadata: body,
        });
      } catch (dbErr) {
        console.error("DB insert (form_submissions) failed:", dbErr);
      }
    }

    // 2) Build tags based on ceremony type
    const ceremonyType = String(body.ceremonyType || "").trim();
    const tags = [
      "ceremony-intake-submission",
      "sacred-intake",
      "intake-submitted-notify-seeker",
      "intake-submitted-notify-admin",
    ];
    if (ceremonyType) tags.push(`intake-${ceremonyType.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`);

    // 3) Push to GHL with rich note. Don't fail submission if GHL hiccups — DB has the record.
    const ghlResult = await upsertGHLContact({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: String(body.email).trim(),
      phone: String(body.phone || "").trim(),
      tags,
      source: "temple-mother-earth-sacred-intake",
    });

    if (!ghlResult.success) {
      console.error("GHL upsert error:", ghlResult.error);
      return new Response(JSON.stringify({ success: true, ghl: "deferred" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // 4) Attach intake note to the GHL contact
    try {
      const GHL_API_TOKEN = Deno.env.get("GHL_API_TOKEN");
      if (GHL_API_TOKEN && ghlResult.contactId) {
        const note = formatIntakeNote(body).slice(0, 9000);
        await fetch(`https://services.leadconnectorhq.com/contacts/${ghlResult.contactId}/notes`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GHL_API_TOKEN}`,
            Version: "2021-07-28",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ body: note }),
        });
      }
    } catch (noteErr) {
      console.error("GHL note attach failed:", noteErr);
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
