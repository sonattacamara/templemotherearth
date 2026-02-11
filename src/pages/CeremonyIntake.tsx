import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { ShieldCheck, Heart, AlertTriangle, FileText, ArrowRight, CheckCircle2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import logo from "@/assets/logo.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const CONTRAINDICATED_MEDICATIONS = [
  { key: "ssri", label: "SSRIs (Selective Serotonin Reuptake Inhibitors) — e.g., Prozac, Zoloft, Lexapro, Celexa, Paxil" },
  { key: "snri", label: "SNRIs (Serotonin-Norepinephrine Reuptake Inhibitors) — e.g., Effexor, Cymbalta, Pristiq" },
  { key: "maoi", label: "MAOIs (Monoamine Oxidase Inhibitors) — e.g., Nardil, Parnate, Marplan, Selegiline" },
  { key: "tca", label: "Tricyclic Antidepressants — e.g., Amitriptyline, Nortriptyline, Imipramine" },
  { key: "lithium", label: "Lithium (mood stabilizer)" },
  { key: "benzodiazepines", label: "Benzodiazepines — e.g., Xanax, Klonopin, Ativan, Valium" },
  { key: "antipsychotics", label: "Antipsychotics — e.g., Seroquel, Risperdal, Zyprexa, Abilify" },
  { key: "stimulants", label: "Stimulants / ADHD Medications — e.g., Adderall, Ritalin, Vyvanse" },
  { key: "bloodThinners", label: "Blood Thinners / Anticoagulants — e.g., Warfarin, Heparin, Eliquis" },
  { key: "bloodPressureMeds", label: "Blood Pressure Medications — e.g., Lisinopril, Metoprolol, Amlodipine" },
  { key: "opioids", label: "Opioids / Pain Medications — e.g., Oxycodone, Hydrocodone, Tramadol, Morphine" },
  { key: "immunosuppressants", label: "Immunosuppressants — e.g., Methotrexate, Prednisone (long-term)" },
  { key: "sleepAids", label: "Sleep Medications — e.g., Ambien, Trazodone, Lunesta" },
  { key: "herbsSupplements", label: "5-HTP, St. John's Wort, or other serotonergic supplements" },
];

const CeremonyIntake = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
    ceremonyType: "",
    experienceLevel: "",
    intentions: "",
    heartCondition: false,
    pregnant: false,
    seizures: false,
    diabetes: false,
    highBloodPressure: false,
    liverKidney: false,
    mentalHealthHistory: "",
    ptsd: false,
    bipolar: false,
    psychosis: false,
    // Contraindicated medications
    ssri: false,
    snri: false,
    maoi: false,
    tca: false,
    lithium: false,
    benzodiazepines: false,
    antipsychotics: false,
    stimulants: false,
    bloodThinners: false,
    bloodPressureMeds: false,
    opioids: false,
    immunosuppressants: false,
    sleepAids: false,
    herbsSupplements: false,
    medicationDetails: "",
    currentMedications: "",
    allergies: "",
    lastMealTime: "",
    dietaryRestrictions: "",
    spiritualGoals: "",
    rfrAgreement: false,
    liabilityWaiver: false,
    truthfulness: false,
  });

  const update = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const hasFlaggedMedication = CONTRAINDICATED_MEDICATIONS.some(
    (med) => formData[med.key as keyof typeof formData] === true
  );

  const canProceed = () => {
    if (step === 1) return formData.fullName && formData.email && formData.phone && formData.dob;
    if (step === 2) return formData.emergencyName && formData.emergencyPhone && formData.emergencyRelation;
    if (step === 3) return formData.ceremonyType && formData.experienceLevel && formData.intentions;
    if (step === 4) return true;
    if (step === 5) return formData.rfrAgreement && formData.liabilityWaiver && formData.truthfulness;
    return false;
  };

  const handleSubmit = () => {
    window.open("https://www.eventbrite.com/o/29347213477#events", "_blank");
    setStep(6);
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary";
  const checkboxClass = "mr-3 h-4 w-4 rounded border-input accent-primary";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="relative flex items-center justify-center px-4 pt-32 pb-16 md:pt-40 md:pb-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.img
            variants={fadeUp}
            src={logo}
            alt="Temple Mother Earth"
            className="mx-auto mb-6 h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary/30"
          />
          <motion.h1
            variants={fadeUp}
            className="font-display text-3xl font-bold text-foreground md:text-5xl"
          >
            Begin Your Journey
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Your safety and sacred experience are our highest priority. This intake process helps our
            facilitators prepare the most supportive environment for your healing journey. Whether
            you're a first-time seeker or experienced practitioner, every person who sits in ceremony
            completes this sacred screening — it is how we honor the medicine, protect our community,
            and ensure that each seeker receives the care they deserve.
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground/80">
            As a 501(c)(3) religious organization operating under the Religious Freedom Restoration Act (RFRA),
            Temple Mother Earth is committed to responsible, ethical, and legally compliant facilitation of
            Earth Medicine ceremonies. This intake is required by our organizational protocols and serves as
            your formal entry into our sacred ceremonial space.
          </motion.p>
        </motion.div>
      </section>

      {/* Why This Matters */}
      <section className="bg-card px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl">
            Why We Ask These Questions
          </h2>
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
              <div
                key={label}
                className={`flex flex-col items-center gap-1 ${i + 1 <= step ? "text-primary" : ""}`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    i + 1 < step
                      ? "bg-primary text-primary-foreground"
                      : i + 1 === step
                      ? "border-2 border-primary text-primary"
                      : "border border-input text-muted-foreground"
                  }`}
                >
                  {i + 1 < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className="hidden sm:block text-center">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((step - 1) / 4) * 100}%` }}
            />
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 md:p-10">
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-card-foreground">Personal Information</h3>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Full Legal Name *</label>
                <input className={inputClass} placeholder="Full Legal Name" value={formData.fullName} onChange={(e) => update("fullName", e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Email Address *</label>
                <input className={inputClass} type="email" placeholder="Email Address" value={formData.email} onChange={(e) => update("email", e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Phone Number *</label>
                <input className={inputClass} type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => update("phone", e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Date of Birth *</label>
                <input className={inputClass} type="date" value={formData.dob} onChange={(e) => update("dob", e.target.value)} required />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-card-foreground">Emergency Contact</h3>
              <p className="text-sm text-muted-foreground">This person will be contacted only in the event of an emergency during ceremony.</p>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Emergency Contact Name *</label>
                <input className={inputClass} placeholder="Emergency Contact Name" value={formData.emergencyName} onChange={(e) => update("emergencyName", e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Emergency Contact Phone *</label>
                <input className={inputClass} type="tel" placeholder="Emergency Contact Phone" value={formData.emergencyPhone} onChange={(e) => update("emergencyPhone", e.target.value)} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Relationship to You *</label>
                <input className={inputClass} placeholder="Relationship to You" value={formData.emergencyRelation} onChange={(e) => update("emergencyRelation", e.target.value)} required />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-card-foreground">Ceremony Selection</h3>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Which ceremony are you seeking? *</label>
                {["Kambo Ceremony", "Hapé Circle", "Sacred Plant Ceremony", "Cacao Ceremony", "Integration Circle", "Private / 1-on-1 Ceremony", "Not sure — I'd like guidance"].map((opt) => (
                  <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                    <input type="radio" name="ceremonyType" className={checkboxClass} checked={formData.ceremonyType === opt} onChange={() => update("ceremonyType", opt)} />
                    {opt}
                  </label>
                ))}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Experience Level *</label>
                {["First time — I'm new to Earth Medicine", "I've participated in 1-3 ceremonies", "Experienced — I've sat in many ceremonies", "Practitioner / Facilitator"].map((opt) => (
                  <label key={opt} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                    <input type="radio" name="experienceLevel" className={checkboxClass} checked={formData.experienceLevel === opt} onChange={() => update("experienceLevel", opt)} />
                    {opt}
                  </label>
                ))}
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">What are your intentions for this ceremony? *</label>
                <textarea className={inputClass + " min-h-[100px] resize-none"} placeholder="Share what you hope to receive, release, or explore..." value={formData.intentions} onChange={(e) => update("intentions", e.target.value)} required />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <h3 className="font-display text-xl font-bold text-card-foreground">Health & Medical Screening</h3>
              <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                <strong>Important:</strong> Please answer honestly. Certain medical conditions and medications can create dangerous — even life-threatening — interactions with Earth Medicine. Your transparency protects your life.
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Do you have any of the following conditions?</label>
                {[
                  { key: "heartCondition", label: "Heart condition or cardiovascular disease" },
                  { key: "pregnant", label: "Currently pregnant or breastfeeding" },
                  { key: "seizures", label: "History of seizures or epilepsy" },
                  { key: "diabetes", label: "Diabetes (Type 1 or 2)" },
                  { key: "highBloodPressure", label: "High blood pressure (uncontrolled)" },
                  { key: "liverKidney", label: "Liver or kidney disease" },
                ].map((item) => (
                  <label key={item.key} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                    <input type="checkbox" className={checkboxClass} checked={formData[item.key as keyof typeof formData] as boolean} onChange={(e) => update(item.key, e.target.checked)} />
                    {item.label}
                  </label>
                ))}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Mental Health History</label>
                {[
                  { key: "ptsd", label: "PTSD or C-PTSD" },
                  { key: "bipolar", label: "Bipolar Disorder" },
                  { key: "psychosis", label: "History of Psychosis or Schizophrenia" },
                ].map((item) => (
                  <label key={item.key} className="mb-2 flex items-center text-sm text-foreground cursor-pointer">
                    <input type="checkbox" className={checkboxClass} checked={formData[item.key as keyof typeof formData] as boolean} onChange={(e) => update(item.key, e.target.checked)} />
                    {item.label}
                  </label>
                ))}
                <textarea className={inputClass + " mt-2 min-h-[80px] resize-none"} placeholder="Please share any additional mental health context that would help our facilitators support you..." value={formData.mentalHealthHistory} onChange={(e) => update("mentalHealthHistory", e.target.value)} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Contraindicated Medications — Are you currently taking any of the following?
                </label>
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive mb-3">
                  ⚠️ <strong>Critical Warning:</strong> Many of these medications can cause <strong>serotonin syndrome</strong> or other life-threatening reactions when combined with Earth Medicine. You may need to taper off under medical supervision before ceremony. <strong>Do not stop any medication without consulting your doctor.</strong>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto rounded-lg border border-border p-3">
                  {CONTRAINDICATED_MEDICATIONS.map((med) => (
                    <label key={med.key} className="flex items-start gap-2 text-sm text-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
                        checked={formData[med.key as keyof typeof formData] as boolean}
                        onChange={(e) => update(med.key, e.target.checked)}
                      />
                      <span>{med.label}</span>
                    </label>
                  ))}
                </div>
                {hasFlaggedMedication && (
                  <div className="mt-3 space-y-2">
                    <div className="rounded-lg bg-accent p-3 text-sm text-accent-foreground">
                      You've indicated you're taking one or more contraindicated medications. Please provide details below so our facilitators can assess safety and guide you on next steps.
                    </div>
                    <textarea
                      className={inputClass + " min-h-[80px] resize-none"}
                      placeholder="Please list the specific medications, dosages, how long you've been taking them, and when you last took them..."
                      value={formData.medicationDetails}
                      onChange={(e) => update("medicationDetails", e.target.value)}
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Other current medications not listed above</label>
                <input className={inputClass} placeholder="List any other medications you are currently taking" value={formData.currentMedications} onChange={(e) => update("currentMedications", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Known allergies</label>
                <input className={inputClass} placeholder="List any known allergies" value={formData.allergies} onChange={(e) => update("allergies", e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Dietary restrictions</label>
                <input className={inputClass} placeholder="Dietary restrictions" value={formData.dietaryRestrictions} onChange={(e) => update("dietaryRestrictions", e.target.value)} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-foreground">Spiritual goals & what you hope to receive</label>
                <textarea className={inputClass + " min-h-[80px] resize-none"} placeholder="Share your spiritual intentions, what brought you to Earth Medicine, and what you hope to carry forward..." value={formData.spiritualGoals} onChange={(e) => update("spiritualGoals", e.target.value)} />
              </div>
            </div>
          )}

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

              <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground space-y-3 max-h-60 overflow-y-auto">
                <p className="font-semibold text-foreground">Religious Freedom Restoration Act (RFRA) Declaration</p>
                <p>
                  Temple Mother Earth is a 501(c)(3) nonprofit religious organization. Our sacramental use of Earth Medicine
                  is protected under the Religious Freedom Restoration Act (RFRA) of 1993. By participating in our ceremonies,
                  you acknowledge that these practices are sincere religious exercises conducted within a structured spiritual community
                  that holds the beliefs stated above.
                </p>
                <p className="font-semibold text-foreground">Assumption of Risk & Liability Waiver</p>
                <p>
                  I understand that participation in Earth Medicine ceremonies carries inherent risks. I voluntarily assume all risks
                  associated with my participation. I release Temple Mother Earth, its facilitators, staff, and volunteers from any
                  and all liability arising from my participation in ceremonies, retreats, and related activities.
                </p>
                <p>
                  I understand that Earth Medicine is not a substitute for professional medical care and that I am encouraged to
                  continue working with my healthcare providers. I acknowledge that my healing journey is my own responsibility,
                  and that the facilitators serve as guides in a sacred ceremonial context protected under RFRA.
                </p>
              </div>

              <label className="flex items-start gap-3 text-sm text-foreground cursor-pointer">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-input accent-primary" checked={formData.rfrAgreement} onChange={(e) => update("rfrAgreement", e.target.checked)} />
                <span>I have read and affirm the Statement of Beliefs. I acknowledge the RFRA declaration and understand the religious context of these ceremonies. *</span>
              </label>

              <label className="flex items-start gap-3 text-sm text-foreground cursor-pointer">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-input accent-primary" checked={formData.liabilityWaiver} onChange={(e) => update("liabilityWaiver", e.target.checked)} />
                <span>I voluntarily assume all risks and release Temple Mother Earth from liability. I understand that my healing journey is my own responsibility, and I take full ownership of my experience within this sacred ceremonial context. *</span>
              </label>

              <label className="flex items-start gap-3 text-sm text-foreground cursor-pointer">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-input accent-primary" checked={formData.truthfulness} onChange={(e) => update("truthfulness", e.target.checked)} />
                <span>I certify that all information provided is truthful and complete. I understand that withholding medical information could endanger my life. *</span>
              </label>
            </div>
          )}

          {step === 6 && (
            <div className="text-center py-8">
              <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
              <h3 className="mt-6 font-display text-2xl font-bold text-card-foreground">
                Thank You, Sacred Seeker
              </h3>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto">
                Your intake has been submitted. You've been redirected to our Eventbrite page to select and book your ceremony date.
                Our facilitators will review your screening and reach out if they need any additional information.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Questions? Email us at{" "}
                <a href="mailto:AskUs@TempleMotherEarth.org" className="text-primary hover:underline">
                  AskUs@TempleMotherEarth.org
                </a>
              </p>
              <a
                href="/"
                className="mt-8 inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
              >
                Return Home
              </a>
            </div>
          )}

          {/* Navigation Buttons */}
          {step <= 5 && (
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="rounded-lg border border-input px-6 py-2.5 text-sm font-body text-foreground transition hover:bg-accent"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              {step < 5 ? (
                <button
                  onClick={() => canProceed() && setStep(step + 1)}
                  disabled={!canProceed()}
                  className="rounded-lg bg-primary px-6 py-2.5 text-sm font-body font-semibold text-primary-foreground transition hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="rounded-lg bg-primary px-6 py-2.5 text-sm font-body font-semibold text-primary-foreground transition hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Complete Sacred Intake <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CeremonyIntake;
