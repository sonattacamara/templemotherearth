import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ShieldCheck, Heart, AlertTriangle, FileText, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { z } from "zod";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonationCTA from "@/components/DonationCTA";
import Navigation from "@/components/Navigation";
import logo from "@/assets/logo.png";
import { supabase } from "@/integrations/supabase/client";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const CONTRAINDICATED_MEDICATIONS = [
  { key: "ssri", label: "SSRIs (Selective Serotonin Reuptake Inhibitors) — e.g., Prozac, Zoloft, Lexapro, Celexa, Paxil" },
  { key: "snri", label: "SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors) — e.g., Effexor, Cymbalta, Pristiq" },
  { key: "maoi", label: "MAOIs (Monoamine Oxidase Inhibitors) — e.g., Nardil, Parnate, Marplan, Selegiline, Emsam" },
  { key: "ndri", label: "NDRIs (Norepinephrine-Dopamine Reuptake Inhibitors) — e.g., Wellbutrin, Bupropion, Focalin" },
  { key: "tca", label: "Tricyclic Antidepressants — e.g., Amitriptyline, Nortriptyline, Imipramine, Anafranil" },
  { key: "lithium", label: "Lithium (mood stabilizer)" },
  { key: "benzodiazepines", label: "Benzodiazepines — e.g., Xanax, Klonopin, Ativan, Valium" },
  { key: "antipsychotics", label: "Antipsychotics — e.g., Seroquel, Risperdal, Zyprexa, Abilify" },
  { key: "stimulants", label: "Stimulants / ADHD Medications — e.g., Adderall, Ritalin, Vyvanse, Concerta" },
  { key: "bloodThinners", label: "Blood Thinners / Anticoagulants — e.g., Warfarin, Heparin, Eliquis" },
  { key: "bloodPressureMeds", label: "Blood Pressure Medications — e.g., Lisinopril, Metoprolol, Amlodipine" },
  { key: "opioids", label: "Opioids / Narcotic Pain Medications — e.g., Oxycodone, Vicodin, Codeine, Fentanyl, Methadone, Tramadol" },
  { key: "immunosuppressants", label: "Immunosuppressants — e.g., Methotrexate, Prednisone (long-term)" },
  { key: "sleepAids", label: "Sleep Medications — e.g., Ambien, Trazodone, Lunesta" },
  { key: "asthmaInhaler", label: "Asthma Inhalers / Asthma Medications" },
  { key: "lTryptophan", label: "L-Tryptophan supplements" },
  { key: "herbsSupplements", label: "5-HTP, St. John's Wort, or other serotonergic supplements" },
];

const MEDICAL_CONDITIONS = {
  "Heart & Circulation": [
    "Heart disease or heart condition", "High blood pressure", "Low blood pressure",
    "Blood clotting disorder", "History of stroke", "History of aneurysm",
  ],
  "Neurological": [
    "Seizure disorder or epilepsy", "History of traumatic brain injury", "Chronic migraines",
  ],
  "Organ Health": [
    "Liver disease or liver condition", "Kidney disease", "Diabetes Type 1", "Diabetes Type 2", "Thyroid condition",
  ],
  "Mental Health": [
    "Schizophrenia or schizoaffective disorder", "Bipolar disorder", "History of psychosis",
    "Severe anxiety or panic disorder", "PTSD", "Active eating disorder", "Personality disorder diagnosis",
  ],
  "Respiratory": ["Asthma", "Severe asthma or emphysema", "Chronic respiratory condition", "Sleep apnea"],
  "Digestive": ["Crohn's disease", "Irritable bowel syndrome (IBS)", "Ulcerative colitis", "Intestinal ulcers", "Surgery on digestive system in last 3 months"],
  "Immune & Other": [
    "Autoimmune disorder", "Cancer (active or in remission)", "HIV/AIDS", "Hepatitis", "Chronic pain condition",
  ],
  "Reproductive": ["Currently pregnant or possibility of pregnancy", "Currently breastfeeding"],
  "Other": ["Recent surgery within last 6 months", "Silicone implants (breast, cosmetic, etc.)", "None of the above"],
};

const FLAGGED_CONDITIONS = [
  "Schizophrenia or schizoaffective disorder", "Bipolar disorder", "History of psychosis",
  "Seizure disorder or epilepsy", "Currently pregnant or possibility of pregnancy",
  "History of aneurysm", "History of stroke",
];

const EARTH_MEDICINES = [
  "Ayahuasca", "Kambo", "5-MeO-DMT (Bufo/Sapo)", "Psilocybin (mushrooms)",
  "San Pedro / Huachuma", "Iboga / Ibogaine", "Hapé", "Cacao (ceremonial)",
  "Sweat Lodge", "Cannabis in ceremony", "Other", "None - this will be my first experience",
];

const RECENT_SUBSTANCES = [
  "Alcohol", "Cannabis/Marijuana", "Caffeine (excessive)", "Energy drinks",
  "Recreational drugs", "Prescription sleep aids", "None of the above",
];

// Zod validation schemas per step
const step1Schema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20, "Phone number is too long").regex(/^[\d\s\-\+\(\)]+$/, "Phone number contains invalid characters"),
  dob: z.string().min(1, "Date of birth is required").refine((val) => {
    const date = new Date(val);
    const age = (Date.now() - date.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
    return age >= 21;
  }, "You must be at least 21 years old to participate in sacred ceremonies"),
  cityState: z.string().trim().min(2, "City/state of residence is required").max(200),
});

const step2Schema = z.object({
  emergencyName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  emergencyPhone: z.string().trim().min(7, "Please enter a valid phone number").max(20).regex(/^[\d\s\-\+\(\)]+$/, "Phone number contains invalid characters"),
  emergencyRelation: z.string().trim().min(1, "Relationship is required"),
});

const step3Schema = z.object({
  ceremonyType: z.string().min(1, "Please select a ceremony type"),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  intentions: z.string().trim().min(10, "Please share a bit more about your intentions").max(2000, "Intentions must be less than 2000 characters"),
});

const CeremonyIntake = () => {
  const [step, setStep] = useState(1);
  const [isFlagged, setIsFlagged] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "", dob: "",
    cityState: "", armedForcesStatus: "",
    emergencyName: "", emergencyPhone: "", emergencyRelation: "",
    ceremonyType: "", experienceLevel: "", intentions: "",
    referralName: "", currentChallenges: "", traumaTriggers: "", questionsOrConcerns: "",
    // Medications
    takingMedications: "", medicationsList: "",
    takingPsychMeds: "", psychMedsList: "",
    recentPsychMeds: "", recentPsychMedsDetails: "",
    takingBloodThinners: "", takingImmunosuppressants: "",
    // Contraindicated meds
    ...Object.fromEntries(CONTRAINDICATED_MEDICATIONS.map(m => [m.key, false])),
    medicationDetails: "",
    currentMedications: "",
    canStopMedications: "", canStopMedicationsDetails: "",
    // Terminal condition
    terminalCondition: "", terminalConditionDetails: "",
    // Tobacco/nicotine
    tobaccoAdverseReaction: "",
    // Medical conditions
    selectedConditions: [] as string[],
    conditionDetails: "",
    // Mental health
    psychiatricHospital: "", psychiatricHospitalDetails: "",
    suicidalIdeation: "", suicidalIdeationDetails: "",
    psychoticEpisodes: "", psychoticEpisodesDetails: "",
    inTherapy: "", therapistName: "",
    recentTrauma: "", recentTraumaDetails: "",
    emotionalStability: 5,
    // Substance use
    recreationalDrugs: "", recreationalDrugsDetails: "",
    consumeAlcohol: "", alcoholFrequency: "",
    useCannabis: "", cannabisFrequency: "",
    substanceAbuseTreatment: "", substanceAbuseTreatmentDetails: "",
    recentPsychedelics: "", recentPsychedelicsDetails: "",
    recentSubstances: [] as string[],
    // Allergies & Physical
    hasAllergies: "", allergiesList: "",
    frogAllergy: "",
    foodSensitivities: "", foodSensitivitiesDetails: "",
    weight: "", heightFeet: "", heightInches: "",
    hasFasted: "", fastDuration: "",
    mobilityLimitations: "", mobilityDetails: "",
    difficultyFloor: "",
    // Prev ceremony
    ceremonyExperienceLevel: "",
    previousMedicines: [] as string[],
    previousMedicineOther: "",
    previousExperienceDetails: "",
    adverseReaction: "", adverseReactionDetails: "",
    // Kambo-specific
    hadKamboBefore: "", kamboTimes: "", lastKamboDate: "",
    kamboSurgery: "", kamboPacemaker: "", kamboStroke: "",
    kamboAddisons: "", kamboClotting: "", kamboTransplant: "",
    kamboImplants: "", kamboWaterFast: "", kamboBufo28: "",
    // Intentions & support
    ceremonyIntention: "", seekingHealing: "",
    integrationSupport: "",
    howHeard: "", howHeardOther: "",
    facilitatorNotes: "",
    // Waivers
    rfrAgreement: false, liabilityWaiver: false, truthfulness: false,
    confidentiality: false, preparationCompliance: false, emergencyAuth: false,
    communityGuidelines: false, eligibilityStatement: false, ageConfirmation21: false,
  });

  const update = (field: string, value: any) => setFormData((prev) => ({ ...prev, [field]: value }));
  const toggleArrayItem = (field: string, item: string) => {
    const arr = formData[field as keyof typeof formData] as string[];
    if (item === "None of the above" || item === "None - this will be my first experience") {
      update(field, arr.includes(item) ? [] : [item]);
    } else {
      const filtered = arr.filter(i => i !== "None of the above" && i !== "None - this will be my first experience");
      update(field, filtered.includes(item) ? filtered.filter(i => i !== item) : [...filtered, item]);
    }
  };

  const hasFlaggedMedication = CONTRAINDICATED_MEDICATIONS.some(
    (med) => formData[med.key as keyof typeof formData] === true
  ) || formData.takingPsychMeds === "yes" || formData.recentPsychMeds === "yes";

  const hasFlaggedCondition = formData.selectedConditions.some(c => FLAGGED_CONDITIONS.includes(c));
  const isHealthFlagged = hasFlaggedMedication || hasFlaggedCondition;

  // Kambo-specific flags
  const isKambo = formData.ceremonyType === "Kambo Ceremony";
  const kamboFlagged = isKambo && (
    formData.kamboSurgery === "yes" || formData.kamboPacemaker === "yes" ||
    formData.kamboStroke === "yes" || formData.kamboAddisons === "yes" ||
    formData.kamboClotting === "yes" || formData.kamboTransplant === "yes" ||
    formData.kamboImplants === "yes" || formData.kamboBufo28 === "yes"
  );

  const totalFlagged = isHealthFlagged || kamboFlagged;

  const validateStep = () => {
    setValidationErrors({});
    try {
      if (step === 1) {
        step1Schema.parse({ fullName: formData.fullName, email: formData.email, phone: formData.phone, dob: formData.dob, cityState: formData.cityState });
      } else if (step === 2) {
        step2Schema.parse({ emergencyName: formData.emergencyName, emergencyPhone: formData.emergencyPhone, emergencyRelation: formData.emergencyRelation });
      } else if (step === 3) {
        step3Schema.parse({ ceremonyType: formData.ceremonyType, experienceLevel: formData.experienceLevel, intentions: formData.intentions });
      }
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        err.errors.forEach((e) => { if (e.path[0]) errors[e.path[0] as string] = e.message; });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const canProceed = () => {
    if (step === 1) return formData.fullName && formData.email && formData.phone && formData.dob && formData.cityState;
    if (step === 2) return formData.emergencyName && formData.emergencyPhone && formData.emergencyRelation;
    if (step === 3) return formData.ceremonyType && formData.experienceLevel && formData.intentions;
    if (step === 4) return !totalFlagged;
    if (step === 5) return formData.rfrAgreement && formData.liabilityWaiver && formData.truthfulness && formData.confidentiality && formData.preparationCompliance && formData.emergencyAuth && formData.communityGuidelines && formData.eligibilityStatement && formData.ageConfirmation21;
    return false;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    // Submit via edge function with server-side validation
    try {
      const { error } = await supabase.functions.invoke('submit-intake', {
        body: formData,
      });
      if (error) {
        console.error("Intake submission error:", error);
      }
    } catch (err) {
      // Silent fail — don't block the user from seeing confirmation
      console.error("Submission error:", err);
    }

    setStep(6);
  };

  const inputClass = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";
  const checkboxClass = "mr-3 h-4 w-4 rounded border-input accent-primary";
  const radioClass = "mr-3 h-4 w-4 appearance-none rounded-full border-2 border-muted-foreground/40 transition-all cursor-pointer checked:border-primary checked:bg-primary checked:shadow-[inset_0_0_0_2px_hsl(var(--background))] hover:border-primary";
  const radioYesNo = (field: string, value: string) => (
    <div className="flex gap-4 mt-1">
      {["yes", "no"].map(v => (
        <label key={v} className="flex items-center text-sm text-foreground cursor-pointer">
          <input type="radio" name={field} className={radioClass} checked={value === v} onChange={() => update(field, v)} />
          {v === "yes" ? "Yes" : "No"}
        </label>
      ))}
    </div>
  );

  const consultationAlert = (
    <div className="rounded-lg border-2 border-accent bg-accent/20 p-5 text-sm space-y-3">
      <p className="font-semibold text-accent-foreground text-base">
        <Heart className="inline h-4 w-4 mr-1" /> Thank you for your honesty.
      </p>
      <p className="text-muted-foreground">
        Based on your responses, a private pre-ceremony consultation with our Sacred Earth Medicine Keeper is required before you can participate. This is for your safety and wellbeing. Please click below to schedule your consultation.
      </p>
      <a
        href="mailto:info@templemotherearth.org?subject=Pre-Ceremony%20Consultation%20Request&body=I%20completed%20the%20Sacred%20Intake%20form%20and%20was%20flagged%20for%20a%20pre-ceremony%20consultation.%20Please%20contact%20me%20to%20schedule."
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
      >
        <Mail className="h-4 w-4" /> Schedule Consultation
      </a>
      <p className="text-xs text-muted-foreground">
        If you believe this flag was triggered in error, please email us directly at info@templemotherearth.org
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Begin Your Journey | Sacred Intake Form" description="Complete your sacred intake form to start your healing journey with Temple Mother Earth. Kambo, ayahuasca, and plant medicine ceremonies in DC." path="/ceremony-intake" />
      <Navigation />

      {/* Hero */}
      <section className="relative flex items-center justify-center px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.img variants={fadeUp} src={logo} alt="Temple Mother Earth" className="mx-auto mb-6 h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary/30" />
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-foreground md:text-5xl">Begin Your Journey</motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Your safety and sacred experience are our highest priority. This intake process helps our facilitators prepare the most supportive sacred journey for your healing.
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground/80">
            As a 501(c)(3) religious organization operating under the Religious Freedom Restoration Act (RFRA), Temple Mother Earth is committed to responsible, ethical, and legally compliant facilitation of Earth Medicine ceremonies.
          </motion.p>
        </motion.div>
      </section>

      {/* Why This Matters */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">Why We Ask These Questions</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, title: "Your Safety", desc: "Earth Medicine works powerfully with the body. We screen for contraindications to keep you safe." },
              { icon: Heart, title: "Personalized Care", desc: "Understanding your history allows facilitators to hold space specifically for your unique needs." },
              { icon: AlertTriangle, title: "Medication Interactions", desc: "SSRIs, MAOIs, SNRIs, and many other medications can have dangerous interactions with sacred medicines." },
              { icon: FileText, title: "Legal Protection", desc: "Under the Religious Freedom Restoration Act (RFRA), we maintain proper documentation for our sacramental practices." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-background p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
            {["Personal Info", "Emergency Contact", "Ceremony Selection", "Health Screening", "Agreement"].map((label, i) => (
              <div key={label} className={`flex flex-col items-center gap-1 ${i + 1 <= step ? "text-primary" : ""}`}>
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${i + 1 < step ? "bg-primary text-primary-foreground" : i + 1 === step ? "border-2 border-primary text-primary" : "border border-input text-muted-foreground"}`}>
                  {i + 1 < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className="hidden sm:block text-center">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary transition-all duration-500" style={{ width: `${((step - 1) / 4) * 100}%` }} />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 md:p-10">

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-card-foreground">Personal Information</h3>
              {[
                { field: "fullName", label: "Full Legal Name (as it appears on ID) *", type: "text", placeholder: "First and Last Name" },
                { field: "email", label: "Email Address *", type: "email", placeholder: "Email Address" },
                { field: "phone", label: "Phone Number * (e.g. 555-555-5555)", type: "tel", placeholder: "Phone Number" },
                { field: "dob", label: "Date of Birth *", type: "date", placeholder: "" },
                { field: "cityState", label: "City and State of Residence (enter country if outside the USA) *", type: "text", placeholder: "e.g. Washington, DC" },
              ].map(f => (
                <div key={f.field}>
                  <label className="mb-1 block text-sm font-medium text-foreground">{f.label}</label>
                  <input className={`${inputClass} ${validationErrors[f.field] ? "ring-2 ring-destructive border-destructive" : ""}`} type={f.type} placeholder={f.placeholder} value={formData[f.field as keyof typeof formData] as string} onChange={(e) => update(f.field, e.target.value)} required />
                  {validationErrors[f.field] && <p className="mt-1 text-xs text-destructive">{validationErrors[f.field]}</p>}
                </div>
              ))}

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Are you serving in the armed forces? (If no, skip)</label>
                {["Active Duty", "Veteran", "Retired"].map((opt) => (
                  <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                    <input type="radio" name="armedForcesStatus" className={radioClass} checked={formData.armedForcesStatus === opt} onChange={() => update("armedForcesStatus", opt)} />
                    {opt}
                  </label>
                ))}
                {formData.armedForcesStatus && (
                  <button type="button" onClick={() => update("armedForcesStatus", "")} className="text-xs text-muted-foreground underline mt-1">Clear selection</button>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Emergency Contact */}
          {step === 2 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-card-foreground">Emergency Contact</h3>
              <p className="text-sm text-muted-foreground">This person will be contacted only in the event of an emergency during ceremony.</p>
              {[
                { field: "emergencyName", label: "Emergency Contact Name *", placeholder: "Emergency Contact Name" },
                { field: "emergencyPhone", label: "Emergency Contact Phone *", placeholder: "Emergency Contact Phone", type: "tel" },
              ].map(f => (
                <div key={f.field}>
                  <label className="mb-1 block text-sm font-medium text-foreground">{f.label}</label>
                  <input className={`${inputClass} ${validationErrors[f.field] ? "ring-2 ring-destructive border-destructive" : ""}`} type={(f as any).type || "text"} placeholder={f.placeholder} value={formData[f.field as keyof typeof formData] as string} onChange={(e) => update(f.field, e.target.value)} required />
                  {validationErrors[f.field] && <p className="mt-1 text-xs text-destructive">{validationErrors[f.field]}</p>}
                </div>
              ))}
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Relationship to You *</label>
                <select
                  className={`${inputClass} ${validationErrors.emergencyRelation ? "ring-2 ring-destructive border-destructive" : ""}`}
                  value={formData.emergencyRelation}
                  onChange={(e) => update("emergencyRelation", e.target.value)}
                  required
                >
                  <option value="">Select relationship...</option>
                  <option value="Spouse/Partner">Spouse/Partner</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Child">Child</option>
                  <option value="Friend">Friend</option>
                  <option value="Other Family Member">Other Family Member</option>
                  <option value="Caregiver">Caregiver</option>
                  <option value="Other">Other</option>
                </select>
                {validationErrors.emergencyRelation && <p className="mt-1 text-xs text-destructive">{validationErrors.emergencyRelation}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Ceremony Selection */}
          {step === 3 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-card-foreground">Ceremony Selection</h3>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Which ceremony are you seeking? *</label>
                {["Kambo Ceremony", "Hapé Circle", "Sacred Mother Earth Ceremony", "Cacao Ceremony", "Integration Circle", "Private / 1-on-1 Ceremony", "Not sure — I'd like guidance"].map((opt) => (
                  <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                    <input type="radio" name="ceremonyType" className={radioClass} checked={formData.ceremonyType === opt} onChange={() => update("ceremonyType", opt)} />
                    {opt}
                  </label>
                ))}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Experience Level *</label>
                {["First time — I'm new to Earth Medicine", "I've participated in 1-3 ceremonies", "Experienced — I've sat in many ceremonies", "Practitioner / Facilitator"].map((opt) => (
                  <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                    <input type="radio" name="experienceLevel" className={radioClass} checked={formData.experienceLevel === opt} onChange={() => update("experienceLevel", opt)} />
                    {opt}
                  </label>
                ))}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">What are your intentions for this ceremony? *</label>
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="Share what you hope to receive, release, or explore..." value={formData.intentions} onChange={(e) => update("intentions", e.target.value)} required />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">How did you find us? Please state full name if you were referred by someone. *</label>
                <input className={inputClass} placeholder="e.g. Instagram, Friend referral — Jane Smith" value={formData.referralName} onChange={(e) => update("referralName", e.target.value)} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Can you tell us about the current challenges you're navigating in your life?</label>
                <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Optional — share what feels right" value={formData.currentChallenges} onChange={(e) => update("currentChallenges", e.target.value)} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Would you like to inform us of any triggers related to past trauma?</label>
                <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Optional — this helps our facilitators hold space for you safely" value={formData.traumaTriggers} onChange={(e) => update("traumaTriggers", e.target.value)} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Do you have any questions or concerns?</label>
                <textarea className={inputClass + " min-h-[60px] resize-none"} placeholder="Optional" value={formData.questionsOrConcerns} onChange={(e) => update("questionsOrConcerns", e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 4: Health Screening (Comprehensive) */}
          {step === 4 && (
            <div className="space-y-8">
              <h3 className="font-display text-xl font-bold text-card-foreground">Health & Medical Screening</h3>

              {/* Critical Warning Banner */}
              <div className="rounded-lg bg-destructive/15 border border-destructive/30 p-4 text-sm text-destructive">
                <strong>⚠️ IMPORTANT:</strong> Please answer ALL health questions honestly and completely. Withholding medical information can be life-threatening. All information is kept strictly confidential.
              </div>

              {/* Current Medications */}
              <div className="space-y-4">
                <h4 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">Current Medications</h4>

                <div>
                  <label className="block text-sm font-medium text-foreground">Are you currently taking any medications? *</label>
                  {radioYesNo("takingMedications", formData.takingMedications)}
                  {formData.takingMedications === "yes" && (
                    <textarea className={inputClass + " mt-2 min-h-[80px] resize-none"} placeholder="List ALL current medications including prescription, over-the-counter, and supplements with dosages" value={formData.medicationsList} onChange={(e) => update("medicationsList", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Are you currently taking any SSRIs, SNRIs, MAOIs, lithium, anti-psychotics, or psychiatric medications? *</label>
                  {radioYesNo("takingPsychMeds", formData.takingPsychMeds)}
                  {formData.takingPsychMeds === "yes" && (
                    <input className={inputClass + " mt-2"} placeholder="Please list the specific psychiatric medications and dosages" value={formData.psychMedsList} onChange={(e) => update("psychMedsList", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Have you taken any psychiatric medications in the last 30 days? *</label>
                  {radioYesNo("recentPsychMeds", formData.recentPsychMeds)}
                  {formData.recentPsychMeds === "yes" && (
                    <input className={inputClass + " mt-2"} placeholder="Which medications and when did you stop?" value={formData.recentPsychMedsDetails} onChange={(e) => update("recentPsychMedsDetails", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Are you currently taking any blood thinners or heart medications? *</label>
                  {radioYesNo("takingBloodThinners", formData.takingBloodThinners)}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Are you currently taking any immunosuppressant medications? *</label>
                  {radioYesNo("takingImmunosuppressants", formData.takingImmunosuppressants)}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Are you able to stop all medication and supplementation prior to the ceremony? Please consult your treating physician before stopping any medication. *</label>
                  {radioYesNo("canStopMedications", formData.canStopMedications)}
                  {formData.canStopMedications === "no" && (
                    <textarea className={inputClass + " mt-2 min-h-[60px] resize-none"} placeholder="Please explain in detail which medications you cannot stop and why" value={formData.canStopMedicationsDetails} onChange={(e) => update("canStopMedicationsDetails", e.target.value)} />
                  )}
                </div>

                {/* Contraindicated Medications Checklist */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Contraindicated Medications — Are you currently taking any of the following?</label>
                  <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive mb-3">
                    ⚠️ <strong>Critical Warning:</strong> Many of these medications can cause <strong>serotonin syndrome</strong> or other life-threatening reactions. <strong>Do not stop any medication without consulting your doctor.</strong>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto rounded-lg border border-border p-3">
                    {CONTRAINDICATED_MEDICATIONS.map((med) => (
                      <label key={med.key} className="flex items-start gap-2 text-sm text-foreground cursor-pointer">
                        <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-input accent-primary" checked={formData[med.key as keyof typeof formData] as boolean} onChange={(e) => update(med.key, (e.target as HTMLInputElement).checked)} />
                        <span>{med.label}</span>
                      </label>
                    ))}
                  </div>
                  {hasFlaggedMedication && (
                    <textarea className={inputClass + " mt-3 min-h-[80px] resize-none"} placeholder="Please list the specific medications, dosages, how long you've been taking them, and when you last took them..." value={formData.medicationDetails} onChange={(e) => update("medicationDetails", e.target.value)} />
                  )}
                </div>
              </div>

              {/* Medical Conditions */}
              <div className="space-y-4">
                <h4 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">Medical Conditions</h4>
                <p className="text-sm text-muted-foreground">Check ALL conditions that apply to you, past or present:</p>
                {Object.entries(MEDICAL_CONDITIONS).map(([category, conditions]) => (
                  <div key={category}>
                    <p className="text-sm font-semibold text-foreground mt-3 mb-1">{category.toUpperCase()}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {conditions.map(c => (
                        <label key={c} className="flex items-center text-sm text-foreground cursor-pointer py-0.5">
                          <input type="checkbox" className={checkboxClass} checked={formData.selectedConditions.includes(c)} onChange={() => toggleArrayItem("selectedConditions", c)} />
                          {c}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <textarea className={inputClass + " min-h-[60px] resize-none"} placeholder="Please describe any conditions you checked above or any other medical conditions not listed (optional)" value={formData.conditionDetails} onChange={(e) => update("conditionDetails", e.target.value)} />

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you currently have a diagnosis of a terminal medical condition? *</label>
                  {radioYesNo("terminalCondition", formData.terminalCondition)}
                  {formData.terminalCondition === "yes" && (
                    <textarea className={inputClass + " mt-2 min-h-[60px] resize-none"} placeholder="Please explain in detail" value={formData.terminalConditionDetails} onChange={(e) => update("terminalConditionDetails", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you have an adverse reaction to tobacco and/or nicotine? *</label>
                  <p className="text-xs text-muted-foreground">This is important for Kambo and Hapé ceremonies which involve sacred tobacco</p>
                  {radioYesNo("tobaccoAdverseReaction", formData.tobaccoAdverseReaction)}
                </div>
              </div>

              {/* Mental Health History */}
              <div className="space-y-4">
                <h4 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">Mental Health History</h4>

                {/* Crisis Resource Inline Callout */}
                <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                  <p className="text-sm font-semibold text-foreground">
                    If you are currently in crisis or experiencing suicidal thoughts:
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <a href="tel:988" className="font-bold text-destructive underline">Call or text 988</a>
                    {" · "}
                    Text HOME to <a href="sms:741741?body=HOME" className="font-bold text-destructive underline">741741</a>
                    {" · "}
                    Veterans: <a href="tel:988" className="font-bold text-destructive underline">988, press 1</a>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">Free, confidential, 24/7 support.</p>
                </div>

                {[
                  { field: "psychiatricHospital", details: "psychiatricHospitalDetails", q: "Have you ever been hospitalized for psychiatric reasons? *", placeholder: "Please briefly describe" },
                  { field: "suicidalIdeation", details: "suicidalIdeationDetails", q: "Have you ever experienced suicidal ideation or suicide attempts? *", placeholder: "Please briefly describe and indicate if this is current" },
                  { field: "psychoticEpisodes", details: "psychoticEpisodesDetails", q: "Have you ever experienced psychotic episodes, hallucinations, or delusions outside of a ceremony setting? *", placeholder: "Please describe" },
                  { field: "inTherapy", details: "therapistName", q: "Are you currently in therapy or under the care of a mental health professional? *", placeholder: "Name of therapist or provider (optional)" },
                  { field: "recentTrauma", details: "recentTraumaDetails", q: "Have you experienced any major emotional trauma in the last 6 months? *", placeholder: "Please briefly describe" },
                ].map(item => (
                  <div key={item.field}>
                    <label className="block text-sm font-medium text-foreground">{item.q}</label>
                    {radioYesNo(item.field, formData[item.field as keyof typeof formData] as string)}
                    {formData[item.field as keyof typeof formData] === "yes" && (
                      <input className={inputClass + " mt-2"} placeholder={item.placeholder} value={formData[item.details as keyof typeof formData] as string} onChange={(e) => update(item.details, e.target.value)} />
                    )}
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-foreground">On a scale of 1-10, how would you rate your current emotional stability? *</label>
                  <p className="text-xs text-muted-foreground">1 = Very unstable · 10 = Very stable</p>
                  <div className="flex items-center gap-3 mt-2">
                    <input type="range" min={1} max={10} value={formData.emotionalStability} onChange={(e) => update("emotionalStability", parseInt(e.target.value))} className="flex-1 accent-primary" />
                    <span className="text-lg font-semibold text-primary w-8 text-center">{formData.emotionalStability}</span>
                  </div>
                </div>
              </div>

              {/* Substance Use */}
              <div className="space-y-4">
                <h4 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">Substance Use</h4>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you currently use any recreational drugs or substances? *</label>
                  {radioYesNo("recreationalDrugs", formData.recreationalDrugs)}
                  {formData.recreationalDrugs === "yes" && (
                    <input className={inputClass + " mt-2"} placeholder="Please specify substances and frequency of use" value={formData.recreationalDrugsDetails} onChange={(e) => update("recreationalDrugsDetails", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you consume alcohol? *</label>
                  {radioYesNo("consumeAlcohol", formData.consumeAlcohol)}
                  {formData.consumeAlcohol === "yes" && (
                    <select className={inputClass + " mt-2"} value={formData.alcoholFrequency} onChange={(e) => update("alcoholFrequency", e.target.value)}>
                      <option value="">How often?</option>
                      {["Daily", "Several times per week", "Weekly", "Occasionally", "Rarely"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you use cannabis/marijuana? *</label>
                  {radioYesNo("useCannabis", formData.useCannabis)}
                  {formData.useCannabis === "yes" && (
                    <select className={inputClass + " mt-2"} value={formData.cannabisFrequency} onChange={(e) => update("cannabisFrequency", e.target.value)}>
                      <option value="">How often?</option>
                      {["Daily", "Several times per week", "Weekly", "Occasionally", "Rarely"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Have you ever been in treatment for substance abuse or addiction? *</label>
                  {radioYesNo("substanceAbuseTreatment", formData.substanceAbuseTreatment)}
                  {formData.substanceAbuseTreatment === "yes" && (
                    <input className={inputClass + " mt-2"} placeholder="Please briefly describe" value={formData.substanceAbuseTreatmentDetails} onChange={(e) => update("substanceAbuseTreatmentDetails", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Have you used any psychedelics or plant medicines in the last 30 days? *</label>
                  {radioYesNo("recentPsychedelics", formData.recentPsychedelics)}
                  {formData.recentPsychedelics === "yes" && (
                    <input className={inputClass + " mt-2"} placeholder="Please specify which medicine(s) and the date(s)" value={formData.recentPsychedelicsDetails} onChange={(e) => update("recentPsychedelicsDetails", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Have you consumed any of the following in the last 48 hours? (Check all that apply) *</label>
                  <div className="mt-2 space-y-1">
                    {RECENT_SUBSTANCES.map(s => (
                      <label key={s} className="flex items-center text-sm text-foreground cursor-pointer">
                        <input type="checkbox" className={checkboxClass} checked={formData.recentSubstances.includes(s)} onChange={() => toggleArrayItem("recentSubstances", s)} />
                        {s}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Allergies & Physical Health */}
              <div className="space-y-4">
                <h4 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">Allergies & Physical Health</h4>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you have any known allergies? *</label>
                  {radioYesNo("hasAllergies", formData.hasAllergies)}
                  {formData.hasAllergies === "yes" && (
                    <textarea className={inputClass + " mt-2 min-h-[60px] resize-none"} placeholder="List all allergies (medications, foods, environmental, latex, etc.)" value={formData.allergiesList} onChange={(e) => update("allergiesList", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Are you allergic to tree frogs, amphibian secretions, or frog peptides? *</label>
                  <p className="text-xs text-muted-foreground">This is specifically important for Kambo ceremonies</p>
                  {radioYesNo("frogAllergy", formData.frogAllergy)}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you have any food sensitivities or dietary restrictions? *</label>
                  {radioYesNo("foodSensitivities", formData.foodSensitivities)}
                  {formData.foodSensitivities === "yes" && (
                    <input className={inputClass + " mt-2"} placeholder="Please describe" value={formData.foodSensitivitiesDetails} onChange={(e) => update("foodSensitivitiesDetails", e.target.value)} />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Current weight (lbs) *</label>
                    <input className={inputClass} type="number" placeholder="Weight" value={formData.weight} onChange={(e) => update("weight", e.target.value)} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Height *</label>
                    <div className="flex gap-2">
                      <select className={inputClass} value={formData.heightFeet} onChange={(e) => update("heightFeet", e.target.value)}>
                        <option value="">Feet</option>
                        {[4,5,6,7].map(f => <option key={f} value={f}>{f}'</option>)}
                      </select>
                      <select className={inputClass} value={formData.heightInches} onChange={(e) => update("heightInches", e.target.value)}>
                        <option value="">Inches</option>
                        {Array.from({length:12},(_,i)=>i).map(i => <option key={i} value={i}>{i}"</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Have you fasted before (water fast, juice fast, dry fast)? *</label>
                  {radioYesNo("hasFasted", formData.hasFasted)}
                  {formData.hasFasted === "yes" && (
                    <select className={inputClass + " mt-2"} value={formData.fastDuration} onChange={(e) => update("fastDuration", e.target.value)}>
                      <option value="">Longest fast duration</option>
                      {["1 day", "2-3 days", "4-7 days", "7+ days"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you have any mobility limitations, chronic pain, or physical disabilities? *</label>
                  {radioYesNo("mobilityLimitations", formData.mobilityLimitations)}
                  {formData.mobilityLimitations === "yes" && (
                    <input className={inputClass + " mt-2"} placeholder="Please describe" value={formData.mobilityDetails} onChange={(e) => update("mobilityDetails", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you have any difficulty sitting on the floor for extended periods? *</label>
                  {radioYesNo("difficultyFloor", formData.difficultyFloor)}
                </div>
              </div>

              {/* Previous Ceremony Experience */}
              <div className="space-y-4">
                <h4 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">Previous Ceremony Experience</h4>

                <div>
                  <label className="block text-sm font-medium text-foreground">Have you participated in plant medicine or earth medicine ceremonies before? *</label>
                  <select className={inputClass + " mt-1"} value={formData.ceremonyExperienceLevel} onChange={(e) => update("ceremonyExperienceLevel", e.target.value)}>
                    <option value="">Select...</option>
                    {["This is my first time", "1-3 times", "4-10 times", "10+ times"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Which earth medicines have you worked with? (Select all that apply)</label>
                  <div className="mt-2 space-y-1">
                    {EARTH_MEDICINES.map(m => (
                      <label key={m} className="flex items-center text-sm text-foreground cursor-pointer">
                        <input type="checkbox" className={checkboxClass} checked={formData.previousMedicines.includes(m)} onChange={() => toggleArrayItem("previousMedicines", m)} />
                        {m}
                      </label>
                    ))}
                  </div>
                  {formData.previousMedicines.includes("Other") && (
                    <input className={inputClass + " mt-2"} placeholder="Please specify" value={formData.previousMedicineOther} onChange={(e) => update("previousMedicineOther", e.target.value)} />
                  )}
                </div>

                <textarea className={inputClass + " min-h-[60px] resize-none"} placeholder="If you have previous ceremony experience, briefly describe your experiences and any difficult reactions you had (optional)" value={formData.previousExperienceDetails} onChange={(e) => update("previousExperienceDetails", e.target.value)} />

                <div>
                  <label className="block text-sm font-medium text-foreground">Have you ever had a difficult, challenging, or adverse reaction during a ceremony? *</label>
                  {radioYesNo("adverseReaction", formData.adverseReaction)}
                  {formData.adverseReaction === "yes" && (
                    <textarea className={inputClass + " mt-2 min-h-[60px] resize-none"} placeholder="Please describe what happened and how it was resolved" value={formData.adverseReactionDetails} onChange={(e) => update("adverseReactionDetails", e.target.value)} />
                  )}
                </div>
              </div>

              {/* Kambo-Specific Screening */}
              {isKambo && (
                <div className="space-y-4">
                  <h4 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">Kambo-Specific Safety Screening</h4>
                  <p className="text-sm text-muted-foreground">Kambo is a powerful earth medicine that requires additional safety screening. Please answer these questions carefully.</p>

                  <div>
                    <label className="block text-sm font-medium text-foreground">Have you had Kambo before? *</label>
                    {radioYesNo("hadKamboBefore", formData.hadKamboBefore)}
                    {formData.hadKamboBefore === "yes" && (
                      <div className="mt-2 flex gap-3">
                        <select className={inputClass} value={formData.kamboTimes} onChange={(e) => update("kamboTimes", e.target.value)}>
                          <option value="">How many times?</option>
                          {["1", "2-5", "6-10", "10+"].map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <input className={inputClass} type="date" placeholder="Last session date" value={formData.lastKamboDate} onChange={(e) => update("lastKamboDate", e.target.value)} />
                      </div>
                    )}
                  </div>

                  {[
                    { field: "kamboSurgery", q: "Have you had any surgery in the last 6 months?" },
                    { field: "kamboPacemaker", q: "Do you have a pacemaker or any heart implant?" },
                    { field: "kamboStroke", q: "Have you ever had a stroke or brain hemorrhage?" },
                    { field: "kamboAddisons", q: "Do you have Addison's disease?" },
                    { field: "kamboClotting", q: "Do you have any blood clotting disorders (e.g., Factor V Leiden)?" },
                    { field: "kamboTransplant", q: "Have you had any organ transplants?" },
                    { field: "kamboImplants", q: "Do you have any silicone implants (breast implants, cosmetic fillers, etc.)?" },
                    { field: "kamboWaterFast", q: "Are you currently on a water fast or have you been fasting for more than 24 hours?" },
                    { field: "kamboBufo28", q: "Have you consumed any Bufo/5-MeO-DMT in the last 28 days?" },
                  ].map(item => (
                    <div key={item.field}>
                      <label className="block text-sm font-medium text-foreground">{item.q} *</label>
                      {radioYesNo(item.field, formData[item.field as keyof typeof formData] as string)}
                    </div>
                  ))}
                </div>
              )}

              {/* Intentions & Support */}
              <div className="space-y-4">
                <h4 className="font-display text-lg font-semibold text-foreground border-b border-border pb-2">Intentions & Support</h4>

                <div>
                  <label className="block text-sm font-medium text-foreground">What is your intention for this ceremony or healing experience? *</label>
                  <p className="text-xs text-muted-foreground">There is no wrong answer. Share what is calling you to this work.</p>
                  <textarea className={inputClass + " mt-1 min-h-[80px] resize-none"} placeholder="Share your intention..." value={formData.ceremonyIntention} onChange={(e) => update("ceremonyIntention", e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Is there anything specific you are seeking healing for? (Physical, emotional, spiritual, relational)</label>
                  <textarea className={inputClass + " mt-1 min-h-[60px] resize-none"} placeholder="Optional" value={formData.seekingHealing} onChange={(e) => update("seekingHealing", e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Do you have integration support in place after your ceremony? *</label>
                  <p className="text-xs text-muted-foreground">(therapist, coach, support group, trusted friend/family)</p>
                  {radioYesNo("integrationSupport", formData.integrationSupport)}
                  {formData.integrationSupport === "no" && (
                    <div className="mt-2 rounded-lg bg-primary/10 p-3 text-sm text-primary">
                      We offer integration circles and support. We will connect you with resources after your ceremony.
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">How did you hear about Temple Mother Earth? *</label>
                  <select className={inputClass + " mt-1"} value={formData.howHeard} onChange={(e) => update("howHeard", e.target.value)}>
                    <option value="">Select...</option>
                    {["Instagram", "Facebook", "Friend or family referral", "Google search", "Eventbrite", "Ayahuasca Advisor", "RootSeller", "Return member", "Community event", "Other"].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                  {formData.howHeard === "Other" && (
                    <input className={inputClass + " mt-2"} placeholder="Please specify" value={formData.howHeardOther} onChange={(e) => update("howHeardOther", e.target.value)} />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground">Is there anything else the facilitators should know to support you safely and lovingly during ceremony?</label>
                  <textarea className={inputClass + " mt-1 min-h-[60px] resize-none"} placeholder="Optional" value={formData.facilitatorNotes} onChange={(e) => update("facilitatorNotes", e.target.value)} />
                </div>
              </div>

              {/* Safety Flagging */}
              {totalFlagged ? consultationAlert : (
                <div className="rounded-lg bg-primary/10 border border-primary/30 p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  <p className="text-sm text-foreground font-medium">Health screening complete. You may proceed to the Sacred Agreement.</p>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Sacred Agreement & Waiver */}
          {step === 5 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-card-foreground">Sacred Agreement & Waiver</h3>

              {/* Statement of Beliefs */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-foreground space-y-3">
                <p className="font-semibold font-display text-base">Our Statement of Beliefs</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• We believe that the Earth is sacred and that her medicines — Kambo, Hapé, Cacao, and sacred plant allies — are divine gifts given to humanity for healing, spiritual growth, and reconnection with the Creator within.</li>
                  <li>• We believe that every human being is a sovereign being — a divine essence having a human experience — and that each person carries the God within.</li>
                  <li>• We believe in the power of ceremony as a sincere religious exercise, practiced in community with intention, reverence, and accountability.</li>
                  <li>• We believe that healing is a personal responsibility and that Earth Medicine, when used sacramentally, is a pathway to spiritual awakening, not a substitute for medical care.</li>
                  <li>• We believe in ethical reciprocity with indigenous wisdom keepers who carry these ancestral traditions, and we honor their lineages through partnership and giving back.</li>
                  <li>• We believe in radical inclusivity — welcoming all seekers regardless of race, gender, background, or status — while remaining rooted in the BIPOC community that founded this temple.</li>
                </ul>
              </div>
              {/* Eligibility Statement */}
              <div className="rounded-lg border-2 border-accent bg-accent/10 p-4 text-sm text-muted-foreground space-y-3">
                <p className="font-semibold text-foreground">Eligibility Statement</p>
                <p>If any of the following apply to you, you are <strong>not eligible</strong> to participate in a sacred healing ceremony:</p>
                <p>You are under the age of 21, in your first trimester of pregnancy, you have a history of psychosis and/or schizophrenia, have been diagnosed with a personality disorder, current active medicated bipolar disorder, history of seizures or diagnosis of epilepsy, current anorexia and/or bulimia, experienced a stroke or embolism, severe asthma or emphysema, a known cardiac illness, uncontrolled high blood pressure, Crohn's disease, irritable bowel syndrome, ulcerative colitis, or intestinal ulcers, surgery within the last three months on any part of your digestive system or liver disease.</p>
                <p>For health and safety reasons you cannot attend a sacred healing ceremony if at the time of the retreat you are taking SSRIs, recreational drugs, have taken any medication or supplements 24 hours prior to the ceremony.</p>
                <p className="font-medium text-foreground">All of your responses are entirely confidential.</p>
              </div>

              {/* Community Guidelines */}
              <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground space-y-3 max-h-60 overflow-y-auto">
                <p className="font-semibold text-foreground">Community Guidelines and Rules</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li><strong>Respect and Consent:</strong> Respect the boundaries, privacy, and personal space of others. Obtain consent before touching or engaging in any physical contact.</li>
                  <li><strong>Confidentiality:</strong> Maintain confidentiality regarding personal experiences shared during the ceremony. Do not disclose or discuss the experiences of others without their explicit permission.</li>
                  <li><strong>Non-Judgment:</strong> Refrain from judging or criticizing the experiences, beliefs, or emotions of fellow participants. Everyone's journey is unique.</li>
                  <li><strong>Safety:</strong> Prioritize safety at all times. Follow the instructions provided by the facilitators and guides. If you feel physically or emotionally overwhelmed, seek assistance from the facilitators immediately.</li>
                  <li><strong>Sobriety:</strong> Abstain from alcohol, recreational drugs, and any substances that may interfere with the ceremony experience. Follow any dietary restrictions or guidelines provided.</li>
                  <li><strong>Ceremony Etiquette:</strong> Maintain a respectful and quiet atmosphere during the ceremony. Refrain from unnecessary talking, loud noises, or disruptive behavior.</li>
                  <li><strong>Ceremony Preparation:</strong> Follow any pre-ceremony guidelines provided, such as avoiding certain foods or medications. Prepare yourself mentally and emotionally.</li>
                  <li><strong>Integration:</strong> Understand that the real work begins after the ceremony. Respect the integration process by allowing yourself time and space to reflect on and integrate your experiences.</li>
                  <li><strong>Environmental Stewardship:</strong> Respect the natural surroundings of the ceremonial space. Minimize your impact on the environment.</li>
                  <li><strong>Personal Responsibility:</strong> Take responsibility for your own well-being and experiences. Participating in a ceremony is a personal choice, and you are responsible for your own decisions and actions.</li>
                </ol>
              </div>

              {/* RFRA & Liability */}
              <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground space-y-3 max-h-60 overflow-y-auto">
                <p className="font-semibold text-foreground">Religious Freedom Restoration Act (RFRA) Declaration</p>
                <p>Temple Mother Earth is a 501(c)(3) nonprofit religious organization. Our sacramental use of Earth Medicine is protected under the Religious Freedom Restoration Act (RFRA) of 1993. By participating in our ceremonies, you acknowledge that these practices are sincere religious exercises conducted within a structured spiritual community that holds the beliefs stated above.</p>
                <p className="font-semibold text-foreground">Assumption of Risk & Liability Waiver</p>
                <p>I understand that participation in Earth Medicine ceremonies carries inherent risks. I voluntarily assume all risks associated with my participation. I release Temple Mother Earth, its facilitators, staff, and volunteers from any and all liability arising from my participation in ceremonies, immersions, and related activities.</p>
                <p>I understand that Earth Medicine is not a substitute for professional medical care and that I am encouraged to continue working with my healthcare providers.</p>
              </div>

              {/* Additional Waiver Sections */}
              <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground space-y-3 max-h-60 overflow-y-auto">
                <p className="font-semibold text-foreground">Confidentiality Agreement</p>
                <p>I agree to maintain the confidentiality of all participants, facilitators, and ceremony details at Temple Mother Earth. I will not share names, personal stories, photographs, or identifying details of others without their explicit written consent.</p>

                <p className="font-semibold text-foreground">Media & Recording Policy</p>
                <p>I understand that photography, video recording, and audio recording are strictly prohibited during all ceremonies unless explicitly authorized by Temple Mother Earth leadership. Violation of this policy may result in removal from ceremony without refund.</p>

                <p className="font-semibold text-foreground">Substance Compliance</p>
                <p>I confirm that I have followed all pre-ceremony dietary and substance guidelines provided to me. I have not consumed alcohol within 48 hours of this ceremony, and I have disclosed all substances currently in my system. I understand that failure to comply may result in being unable to participate for my own safety.</p>

                <p className="font-semibold text-foreground">Emergency Medical Authorization</p>
                <p>In the event of a medical emergency during ceremony, I authorize Temple Mother Earth staff to contact emergency medical services (911) on my behalf and to share relevant medical information from this intake form with emergency responders to ensure my safety.</p>
              </div>

              {/* All checkboxes */}
              {[
                { key: "eligibilityStatement", label: "I acknowledge the eligibility statement above. I confirm that none of the listed disqualifying conditions apply to me. *" },
                { key: "communityGuidelines", label: "I have read, understand, and agree to the Community Guidelines and Rules. *" },
                { key: "ageConfirmation21", label: "I confirm that I am 21 years of age or older. *" },
                { key: "rfrAgreement", label: "I have read and affirm the Statement of Beliefs. I acknowledge the RFRA declaration and understand the religious context of these ceremonies. *" },
                { key: "liabilityWaiver", label: "I voluntarily assume all risks and release Temple Mother Earth from liability. I understand that my healing journey is my own responsibility. *" },
                { key: "truthfulness", label: "I affirm that all information provided is accurate to the best of my knowledge. I understand that withholding information relevant to my well-being could potentially harm both myself and other participants. *" },
                { key: "confidentiality", label: "I agree to maintain the confidentiality of all ceremony participants, facilitators, and ceremony details. *" },
                { key: "preparationCompliance", label: "I confirm I have followed all pre-ceremony preparation guidelines provided to me. *" },
                { key: "emergencyAuth", label: "I authorize emergency medical services to be contacted on my behalf if needed during ceremony. *" },
              ].map(item => (
                <label key={item.key} className="flex items-start gap-3 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" className="mt-1 h-4 w-4 rounded border-input accent-primary" checked={formData[item.key as keyof typeof formData] as boolean} onChange={(e) => update(item.key, (e.target as HTMLInputElement).checked)} />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Step 6: Thank You */}
          {step === 6 && (
            <div className="text-center py-8">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">Thank You, Sacred Seeker</h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your Sacred Intake has been submitted successfully. Our facilitators will review your screening and reach out if they need any additional information. You are now ready to enter the ceremony.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Questions? Reach out through our community circles on Telegram.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.eventbrite.com/o/29347213477#events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
                >
                  Enter the Ceremony <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl border border-input px-8 py-3 font-body text-sm font-semibold text-foreground transition hover:bg-accent"
                >
                  Return Home
                </Link>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {step <= 5 && (
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button onClick={() => { setValidationErrors({}); setStep(step - 1); }} className="rounded-lg border border-input px-6 py-2.5 text-sm font-body text-foreground transition hover:bg-accent">Back</button>
              ) : <div />}
              {step < 5 ? (
                <button onClick={handleNext} disabled={!canProceed()} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-body font-semibold text-primary-foreground transition hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={!canProceed()} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-body font-semibold text-primary-foreground transition hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                  Complete Sacred Intake <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Keyword-rich SEO section — visible to crawlers, hidden from users */}
      <section className="sr-only" aria-label="Earth Medicine Ceremony Information">
        <h2>Sacred Earth Medicine Ceremonies at Temple Mother Earth</h2>
        <p>
          Temple Mother Earth facilitates sacred <Link to="/ceremony-intake">Ayahuasca ceremonies</Link>, <Link to="/ceremony-intake">Kambo healing ceremonies</Link>, 
          <Link to="/ceremony-intake">Hapé (Rapé) ceremonies</Link>, and <Link to="/ceremony-intake">ceremonial Cacao circles</Link> in the Washington DC metropolitan area. 
          Our experienced facilitators guide participants through transformative experiences with Ayahuasca (Banisteriopsis caapi), 
          Psilocybin mushrooms, San Pedro (Huachuma), 5-MeO-DMT (Bufo Alvarius), and other sacred plant medicines.
        </p>
        <p>
          We also offer <Link to="/retreats-inquiry">international Ayahuasca retreats in Mexico</Link>, <Link to="/retreats-inquiry">plant medicine immersions in Costa Rica</Link>, 
          and <Link to="/retreats-inquiry">healing retreats in Peru, Colombia, and Brazil</Link>. Our <Link to="/traveling-ceremonies">traveling ceremony program</Link> brings 
          Kambo, Hapé, and Earth Medicine ceremonies to communities across the United States.
        </p>
        <p>
          Whether you seek Ayahuasca ceremony near Washington DC, Kambo detox healing, Iboga therapy, San Pedro ceremony, 
          psilocybin-assisted healing, or sacred plant medicine retreats internationally, Temple Mother Earth provides 
          safe, legally compliant facilitation under the Religious Freedom Restoration Act (RFRA). 
          Explore our <Link to="/plant-medicine-glossary">complete plant medicine glossary</Link> to learn about 
          Bobinsana, Chiric Sanango, Mapacho, Sananga, Blue Lotus, Kava, and dozens more traditional healing allies.
        </p>
      </section>

      <DonationCTA
        eyebrow="Gift the Journey to Someone Else"
        headline="Help Someone Else Experience Healing"
        body="If you would like to donate so that someone who may not have the financial means can experience the transformative power of sacred ceremony, your generous contribution makes that possible."
        buttonLabel="Gift a Journey"
        donateUrl="https://www.paypal.com/donate?campaign_id=733MK2T3UK5LS"
      />

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">© {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CeremonyIntake;
