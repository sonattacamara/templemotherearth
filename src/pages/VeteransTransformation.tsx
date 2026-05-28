import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import DonationCTA from "@/components/DonationCTA";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Heart, Brain, Users, Phone, MessageCircle, ChevronDown, ChevronUp, AlertTriangle, Leaf, Zap, Sun, Sparkles, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import MidImageBanner from "@/components/story/MidImageBanner";
import FooterVideoBanner from "@/components/story/FooterVideoBanner";
import midVeteransImg from "@/assets/image-mid-veterans.jpg";
import footerVeteransVideoAsset from "@/assets/video-footer-veterans.mp4.asset.json";
import SEOHead from "@/components/SEOHead";
import heroImg from "@/assets/veterans-hero.jpg";
import veteransVideo from "@/assets/video-veterans-hero.mp4";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ─── Pain Points ─── */
const painPoints = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Chronic Physical Pain",
    text: "Your body remembers every patrol, every blast, every sleepless night. The pain in your back, your knees, your joints is not just wear and tear. It is your body holding the weight of what you have been through.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "PTSD & Hypervigilance",
    text: "You cannot turn it off. The scanning, the rage that comes out of nowhere, the nightmares that make sleep feel like another deployment. You are not broken. Your nervous system is still in combat mode.",
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Failed VA Protocols",
    text: "You have done the intake forms. Sat in the waiting rooms. Taken the pills that made you feel like a zombie. Tried the talk sessions that barely scratched the surface. You are not a lost cause. The system was not built to reach where your pain actually lives.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Isolation & Loss of Purpose",
    text: "In uniform, you had mission, brotherhood, purpose. Now the days blur together. The people around you do not understand. You feel like a stranger in your own life.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Suicidal Thoughts",
    text: "If you have thought about ending it, you are not alone. Not weak. Not selfish. You are a warrior whose pain has exceeded the tools you have been given. There is another way. And it does not involve another prescription.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "TBI & Brain Fog",
    text: "The blasts you survived left invisible damage. The fog, the headaches, the memory gaps. Your brain is trying to restore itself and it needs support that goes deeper than what a scan can show.",
  },
  {
    icon: <Leaf className="h-6 w-6" />,
    title: "Substance Dependence",
    text: "The drinking, the pills, the substances you use to numb it all · those are not your weakness. They are the only coping tools a broken system gave you. We offer something different.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Relationship Destruction",
    text: "Your marriage is hanging by a thread. Your kids walk on eggshells. You keep pushing away the people who love you because you cannot feel safe enough to let them in.",
  },
];

/* ─── Kambo Fears Table ─── */
const kamboFears = [
  { fear: "\"I do not want to trip or hallucinate\"", reality: "Kambo does not alter your mind. Full mental clarity throughout. You stay sharp." },
  { fear: "\"I need to stay in control\"", reality: "You are conscious and present the entire time. No loss of agency." },
  { fear: "\"I have been on meds for years\"", reality: "Kambo helps purge pharmaceutical buildup. Many report mental clarity." },
  { fear: "\"My body is destroyed\"", reality: "Kambo peptides address inflammation, chronic pain, and immune dysfunction." },
  { fear: "\"I do not trust spiritual stuff\"", reality: "Kambo works on biochemistry. No belief required." },
];

/* ─── Transformation Phases ─── */
const phases = [
  { phase: "Phase 1", name: "Purification", offering: "Kambo Ceremony", addresses: "Physical buildup, pharmaceutical residue, immune system reset", benefit: "Clears the body so deeper transformation can take root. Like clearing a weapon before maintenance, you strip it down first.", icon: <Leaf className="h-8 w-8" /> },
  { phase: "Phase 2", name: "Nervous System Reset", offering: "Hapé (Sacred Snuff)", addresses: "Grounding, mental clarity, energetic clearing", benefit: "Downregulates your threat-detection system. Takes you off high alert so you can actually rest.", icon: <Brain className="h-8 w-8" /> },
  { phase: "Phase 3", name: "Deep Restoration", offering: "Sacred Earth Medicine Ceremony", addresses: "Root trauma, PTSD, emotional wounds, spiritual disconnection", benefit: "Goes where talk sessions cannot reach, into the places your body locked the mission away.", icon: <Heart className="h-8 w-8" /> },
  { phase: "Phase 4", name: "Spiritual Reset", offering: "Sacred Earth Medicine Ceremony", addresses: "Identity restoration, existential return, spiritual reconnection", benefit: "Helps you remember who you were before the uniform, and who you are becoming after.", icon: <Sun className="h-8 w-8" /> },
  { phase: "Phase 5", name: "Integration", offering: "Integration Circles & Ongoing Support", addresses: "Sustained transformation, community accountability, new patterns", benefit: "You do not get dropped back into the world alone. We build your support network, your new unit.", icon: <Sparkles className="h-8 w-8" /> },
];

/* ─── Weekend Schedule ─── */
const schedule = [
  { day: "Friday", morning: "Arrival, intake, safety briefing, intention setting", afternoon: "Kambo Session 1: Purification", evening: "Rest, hydration, community fire circle" },
  { day: "Saturday", morning: "Kambo Session 2: Deeper Cleanse", afternoon: "Integration talk, breathwork, nature immersion", evening: "Hapé ceremony for grounding" },
  { day: "Sunday", morning: "Kambo Session 3: Final Release", afternoon: "Optional sacred earth medicine ceremony (qualified participants)", evening: "Closing circle, aftercare plan, departure" },
];

/* ─── FAQ ─── */
const faqs = [
  { q: "Is Kambo safe for veterans on VA medications?", a: "We require a comprehensive pre-screening process that evaluates all current medications and health conditions. Our intake process is designed to identify any contraindications. Certain medications may require a washout period. Your safety is our first priority · we will be transparent about what is and is not appropriate for your specific situation." },
  { q: "Will I lose control or hallucinate?", a: "No. Kambo does not alter your state of mind. You maintain full consciousness and mental clarity throughout the entire process. This is a physical purification. You will be aware, present, and in control at all times · the same tactical awareness you are used to." },
  { q: "Is this legal?", a: "Temple Mother Earth operates as a 508(c)(1)(A) temple under the Religious Freedom Restoration Act (RFRA). Our ceremonies are conducted as bona fide religious practices protected under the First Amendment. Kambo itself is not a controlled substance." },
  { q: "I have TBI. Is this safe for me?", a: "Pre-screening is required for all participants, especially those with TBI. We are transparent about what conditions require additional medical clearance. We work with each veteran individually to determine the safest approach." },
  { q: "Do you accept VA benefits or insurance?", a: "Currently, our ceremonies are not covered by VA benefits or insurance. However, we offer a Veteran Scholarship Fund and flexible sacred reciprocity options. No warrior will be turned away for inability to contribute." },
  { q: "What if I am in crisis right now?", a: "Please call the Veterans Crisis Line immediately: dial 988, press 1. You can also chat at VeteransCrisisLine.net or text 838255. When you are ready for the next step, we are here." },
  { q: "Can I bring my spouse or partner?", a: "Affirmative. We understand that military service impacts entire families. We offer couples ceremonies and encourage partners to participate when appropriate. Your family has been carrying this too." },
  { q: "What if I have never done anything like this?", a: "Most of our veterans had not either. This program is built for first-timers. Kambo is the ideal starting point · you stay fully aware and in control the entire time. No surprises." },
  { q: "How is this different from the VA?", a: "Our approach is personalized, sacred, and community-based. We work on root causes, not just symptoms. One transformative weekend can accomplish what years of conventional approaches could not. You are not a number here · you are a warrior who deserves to come home to yourself." },
  { q: "What does a typical Kambo ceremony involve?", a: "A Kambo ceremony lasts approximately 20 to 40 minutes. Small points are applied to the skin, and the secretion of the Giant Monkey Frog is administered. You will experience a powerful physical purge that cleanses stored impurities from your body. The entire process is held in sacred, supportive space by trained facilitators. Think of it as a system reboot." },
];

/* ─── Branches ─── */
const branches = ["U.S. Army", "U.S. Navy", "U.S. Air Force", "U.S. Marine Corps", "U.S. Coast Guard", "U.S. Space Force", "National Guard", "Reserves", "Other"];

const struggles = ["PTSD", "Chronic Pain", "Substance Dependence", "Suicidal Thoughts", "TBI / Brain Injury", "Relationship Issues", "Loss of Purpose", "Anxiety / Depression", "Sleep Disorders / Insomnia", "Anger / Emotional Dysregulation", "Moral Injury", "Other"];

const serviceEras = ["Post-9/11 (2001·Present)", "Gulf War (1990·2001)", "Cold War (1947·1991)", "Vietnam Era", "Other"];

const dischargeTypes = ["Honorable", "General (Under Honorable)", "Other Than Honorable", "Medical", "Retired", "Currently Serving", "Prefer Not to Say"];

const currentSupport = ["VA Healthcare", "Private Therapist", "Support Group", "Medication Management", "Faith-Based Counseling", "None Currently", "Other"];

const hearAbout = ["Google Search", "Social Media", "Another Veteran", "Podcast", "Therapist / Counselor Referral", "VA / Military Organization", "Other"];

const programInterest = ["Kambo Purification (Single Session)", "Relax & Reset Weekend", "Full Transformation Pathway", "Not Sure · Help Me Decide"];

const VeteransTransformation = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    branch: "",
    branchOther: "",
    serviceEra: "",
    serviceEraOther: "",
    yearsOfService: "",
    dischargeType: "",
    deployments: "",
    struggles: [] as string[],
    strugglesOther: "",
    currentSupport: [] as string[],
    currentSupportOther: "",
    currentMedications: "",
    plantMedicineExperience: "",
    programInterest: "",
    contactMethod: "",
    hearAbout: "",
    hearAboutOther: "",
    hasSpouseInterest: "",
    emergencyName: "",
    emergencyPhone: "",
    additionalInfo: "",
    email: "",
    phone: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [activeSection, setActiveSection] = useState("");

  const sectionAnchors = [
    { id: "hero", label: "Home" },
    { id: "problem", label: "Your Story" },
    { id: "kambo", label: "Kambo" },
    { id: "pathway", label: "The Path" },
    { id: "weekend", label: "Weekend" },
    { id: "voices", label: "Voices" },
    { id: "faq", label: "FAQ" },
    { id: "apply", label: "Reserve Your Seat" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sectionAnchors.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleCheckboxToggle = (field: "struggles" | "currentSupport", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).includes(value)
        ? (prev[field] as string[]).filter((x) => x !== value)
        : [...(prev[field] as string[]), value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setFormError("Please enter your first and last name.");
      return;
    }
    if (!formData.email.trim()) {
      setFormError("Please enter your email.");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Please enter your phone number.");
      return;
    }
    if (!formData.branch) {
      setFormError("Please select your branch of service.");
      return;
    }
    
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-veterans", {
        body: formData,
      });
      if (error) throw error;
      if (data?.error) {
        setFormError(data.error);
        return;
      }
      setFormSubmitted(true);
    } catch (err) {
      console.error("Veterans form error:", err);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* ═══════ FLOATING SIDEBAR NAV ═══════ */}
      <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-start gap-1">
        {sectionAnchors.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`group flex items-center gap-3 py-1.5 transition-all duration-300`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeSection === id
                  ? "h-3 w-3 bg-[#B8860B] shadow-[0_0_8px_rgba(184,134,11,0.5)]"
                  : "h-2 w-2 bg-white/30 group-hover:bg-white/60"
              }`}
            />
            <span
              className={`font-body text-xs uppercase tracking-wider transition-all duration-300 ${
                activeSection === id
                  ? "text-[#B8860B] opacity-100 translate-x-0"
                  : "text-white/0 group-hover:text-white/70 -translate-x-2 group-hover:translate-x-0"
              }`}
            >
              {label}
            </span>
          </a>
        ))}
      </nav>
      <SEOHead
        title="Veterans Healing Program | Plant Medicine for PTSD"
        description="Specialized plant medicine healing program for veterans. Kambo, ayahuasca, and integrative support for PTSD, depression, and trauma recovery."
        path="/veterans-transformation-program"
      />
      <Navigation />

      {/* ═══════ CRISIS LINE STICKY BANNER ═══════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#556B2F] text-white text-center py-2 px-4 text-sm font-body flex items-center justify-center gap-2 flex-wrap">
        <Phone className="h-4 w-4 flex-shrink-0" />
        <span>
          Veterans Crisis Line:{" "}
          <a href="tel:988" className="font-bold underline">Dial 988, Press 1</a>
          {" | "}
          <a href="https://www.veteranscrisisline.net/get-help-now/chat/" target="_blank" rel="noopener noreferrer" className="underline">Chat Online</a>
          {" | "}
          <a href="sms:838255" className="underline">Text 838255</a>
        </span>
      </div>

      {/* ═══════ HERO ═══════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            src={veteransVideo}
            poster={heroImg}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/70 via-[#1A1A1A]/50 to-[#1A1A1A]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-24 pb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-xs uppercase tracking-[0.3em] text-[#B8860B] mb-6"
          >
            Temple Mother Earth · Veterans Transformation Program
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-4xl font-bold text-white md:text-6xl lg:text-7xl leading-tight"
          >
            You Survived the Battlefield.{" "}
            <span className="text-[#B8860B]">Now Survive the War Within.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-8 max-w-2xl font-body text-lg text-white/80 leading-relaxed"
          >
            When the VA, the pills, and the therapy sessions have not been enough · there is another way. Temple Mother Earth's Veterans Transformation Program uses sacred earth medicine and ancient purification practices to help warriors reclaim their bodies, their minds, and their lives. No more waiting rooms. No more band-aids. Ancient medicine for the modern warrior.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#apply"
              className="rounded-lg bg-[#556B2F] px-8 py-4 font-body text-base font-semibold text-white transition hover:bg-[#6B8E23] shadow-lg"
            >
              Begin Your Transformation
            </a>
            <a
              href="tel:988"
              className="rounded-lg border-2 border-[#B8860B] px-8 py-4 font-body text-base font-semibold text-[#B8860B] transition hover:bg-[#B8860B] hover:text-white"
            >
              Talk to Someone Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════ TRUST BAR ═══════ */}
      <section className="bg-[#2F4F4F] py-4">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-center gap-6 px-4 text-sm text-white/80 font-body">
          <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-[#B8860B]" /> 508(c)(1)(A) Recognized Temple</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-[#B8860B]" /> RFRA Protected Ceremonies</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="flex items-center gap-2"><Users className="h-4 w-4 text-[#B8860B]" /> Veteran-Led Facilitation</span>
          <span className="hidden sm:inline text-white/30">|</span>
          <span className="flex items-center gap-2"><Heart className="h-4 w-4 text-[#B8860B]" /> Confidential & Sacred</span>
        </div>
      </section>

      {/* ═══════ THE PROBLEM ═══════ */}
      <section id="problem" className="bg-[#1A1A1A] px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#B8860B]">Alternative PTSD Treatment for Veterans</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[#F5F0E6] md:text-5xl">
              We Know What You Are Carrying
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {painPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={fadeUp}
                className="rounded-xl border border-[#556B2F]/30 bg-[#2F4F4F]/20 p-6 hover:border-[#556B2F]/60 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-[#B8860B] flex-shrink-0">{point.icon}</div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#F5F0E6]">{point.title}</h3>
                    <p className="mt-2 font-body text-[#F5F0E6]/70 leading-relaxed">{point.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Crisis callout after suicidal thoughts section */}
          <motion.div variants={fadeUp} className="mt-8 rounded-xl bg-[#556B2F]/20 border border-[#556B2F]/40 p-6 text-center">
            <p className="font-body text-[#F5F0E6]/90">
              <strong>If you are in crisis right now:</strong>{" "}
              <a href="tel:988" className="text-[#B8860B] font-bold underline">Veterans Crisis Line · Dial 988, Press 1</a>
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ WHAT IS KAMBO ═══════ */}
      <section id="kambo" className="bg-[#F5F0E6] px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#556B2F]">Sacred Earth Medicine for Veterans</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[#2F4F4F] md:text-5xl">
              Kambo: The Warrior's Medicine That Heals What Pills Cannot
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="mx-auto max-w-4xl mb-12 overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={heroImg}
              alt="Silhouette of a warrior at sunrise in the forest, awakening to sacred earth medicine"
              className="w-full h-[280px] md:h-[420px] object-cover"
              loading="lazy"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="mx-auto max-w-3xl space-y-6 font-body text-[#2F4F4F]/80 leading-relaxed">
            <p>
              Kambo does <strong>not alter your state of mind</strong>. You will not hallucinate. You will not lose control. For someone trained to maintain tactical awareness, this matters.
            </p>
            <p>
              It is a physical purification from the secretion of the Giant Monkey Frog (<em>Phyllomedusa bicolor</em>), used by Amazonian warriors for centuries to sharpen their senses before hunts.
            </p>
            <p>
              Kambo contains <strong>16 bioactive peptides</strong> that stimulate the immune system, reduce inflammation, release pain-fighting compounds stronger than morphine (without addiction), and reset the body's detox systems.
            </p>
            <p>
              It purges stored impurities, pharmaceutical residue, and stagnant energy from the body. Veterans who have been on years of VA medications often report feeling <em>"clean"</em> for the first time.
            </p>
            <p>
              It takes approximately <strong>20 to 40 minutes</strong>. Not weeks. Not months. One powerful session.
            </p>
          </motion.div>

          {/* Fears vs Reality Table */}
          <motion.div variants={fadeUp} className="mt-16">
            <h3 className="text-center font-display text-2xl font-bold text-[#2F4F4F] mb-8">Why Veterans Choose Kambo First</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#556B2F] text-white">
                    <th className="p-4 text-left font-body font-semibold rounded-tl-lg">What You Fear</th>
                    <th className="p-4 text-left font-body font-semibold rounded-tr-lg">What Kambo Actually Is</th>
                  </tr>
                </thead>
                <tbody>
                  {kamboFears.map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F5F0E6]"}>
                      <td className="p-4 font-body text-[#2F4F4F] italic">{item.fear}</td>
                      <td className="p-4 font-body text-[#2F4F4F]/80">{item.reality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ TRANSFORMATION PATHWAY ═══════ */}
      <section id="pathway" className="bg-[#2F4F4F] px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#B8860B]">Your Complete Healing Journey</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[#F5F0E6] md:text-5xl">
              Your Healing Does Not End with One Session
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-[#F5F0E6]/70">
              Each veteran's path is personalized. Not everyone does all phases. Kambo may be the only thing you need. The journey is sacred and individual.
            </p>
          </motion.div>

          <div className="space-y-6">
            {phases.map((p, i) => (
              <motion.div
                key={p.phase}
                variants={fadeUp}
                className="rounded-xl border border-[#556B2F]/40 bg-[#1A1A1A]/40 p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex items-center gap-4 md:w-64 flex-shrink-0">
                    <div className="text-[#B8860B]">{p.icon}</div>
                    <div>
                      <span className="font-body text-xs uppercase tracking-wider text-[#B8860B]">{p.phase}</span>
                      <h3 className="font-display text-xl font-bold text-[#F5F0E6]">{p.name}</h3>
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="font-body text-sm text-[#B8860B] font-semibold">{p.offering}</p>
                    <p className="font-body text-[#F5F0E6]/70">{p.addresses}</p>
                    <p className="font-body text-[#F5F0E6]/90 italic">"{p.benefit}"</p>
                  </div>
                </div>
                {i < phases.length - 1 && (
                  <div className="flex justify-center mt-4 text-[#556B2F]">
                    <ChevronDown className="h-6 w-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ RELAX & RESET WEEKEND ═══════ */}
      <section id="weekend" className="bg-[#1A1A1A] px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#B8860B]">Veteran Healing Retreat Weekend</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[#F5F0E6] md:text-5xl">
              3 Days. 3 Kambo Sessions. A Lifetime of Healing.
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-[#556B2F]">
                  <th className="p-4 font-body font-semibold text-white rounded-tl-lg">Day</th>
                  <th className="p-4 font-body font-semibold text-white">Morning</th>
                  <th className="p-4 font-body font-semibold text-white">Afternoon</th>
                  <th className="p-4 font-body font-semibold text-white rounded-tr-lg">Evening</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={row.day} className={i % 2 === 0 ? "bg-[#2F4F4F]/30" : "bg-[#2F4F4F]/10"}>
                    <td className="p-4 font-display font-bold text-[#B8860B]">{row.day}</td>
                    <td className="p-4 font-body text-[#F5F0E6]/80">{row.morning}</td>
                    <td className="p-4 font-body text-[#F5F0E6]/80">{row.afternoon}</td>
                    <td className="p-4 font-body text-[#F5F0E6]/80">{row.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 text-center">
            <p className="mt-2 font-body text-[#F5F0E6]/70">Full Veteran's Weekend: Relax & Reset</p>
            <p className="mt-4 font-body text-sm text-[#F5F0E6]/50 italic max-w-lg mx-auto">
              Scholarship opportunities available for veterans in financial hardship. No warrior turned away for inability to pay.
            </p>
            <a
              href="#apply"
              className="mt-8 inline-block rounded-lg bg-[#556B2F] px-8 py-4 font-body font-semibold text-white transition hover:bg-[#6B8E23] shadow-lg"
            >
              Reserve Your Weekend
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section id="voices" className="bg-[#F5F0E6] px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#556B2F]">Veteran Voices</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[#2F4F4F] md:text-5xl">
              Warriors Who Found Their Way Back
            </h2>
          </motion.div>

          <motion.blockquote
            variants={fadeUp}
            className="mt-12 rounded-xl bg-white border border-[#556B2F]/20 p-8 md:p-12"
          >
            <p className="font-display text-xl italic text-[#2F4F4F] leading-relaxed md:text-2xl">
              "Kambo pulls issues out by the root. It can be an excellent medicine for someone looking for something beyond what the system has offered them."
            </p>
            <footer className="mt-6 font-body text-sm text-[#556B2F]">· Veteran Community Member</footer>
          </motion.blockquote>

          <motion.div variants={fadeUp} className="mt-8">
            <p className="font-body text-[#2F4F4F]/60 italic">
              Your story starts here. If you have walked this path and want to share your experience to help a fellow warrior, reach out to our team.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ FAQ ═══════ */}
      <section id="faq" className="bg-[#2F4F4F] px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#B8860B]">Questions Veterans Ask</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[#F5F0E6] md:text-5xl">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-xl border border-[#556B2F]/30 bg-[#1A1A1A]/30 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-display text-base font-semibold text-[#F5F0E6] pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-5 w-5 text-[#B8860B] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[#B8860B] flex-shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="font-body text-[#F5F0E6]/70 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ COUNTER-NARRATIVE: LEGAL & SAFETY ═══════ */}
      <section className="bg-[#1A1A1A] px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          <motion.div variants={fadeUp} className="rounded-xl border border-[#556B2F]/30 bg-[#2F4F4F]/20 p-8 md:p-12">
            <h3 className="font-display text-2xl font-bold text-[#F5F0E6] mb-6">Is This Legal? Is This Safe?</h3>
            <div className="space-y-4 font-body text-[#F5F0E6]/70 leading-relaxed">
              <p>
                Temple Mother Earth operates as a <strong className="text-[#B8860B]">508(c)(1)(A) temple</strong> under the Religious Freedom Restoration Act (RFRA) and the First Amendment. Our ceremonies are bona fide religious practices.
              </p>
              <p>
                Kambo is <strong className="text-[#F5F0E6]">not a controlled substance</strong>. It is a natural secretion used for centuries by Indigenous peoples. Our facilitators are trained practitioners who conduct thorough pre-screening for every participant.
              </p>
              <p>
                Your intake includes a comprehensive health assessment, medication review, and contraindication screening. Veterans are trained to assess risk · we give you all the intel you need to trust this operation.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ SCHOLARSHIP FUND ═══════ */}
      <section className="bg-[#F5F0E6] px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp}>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#556B2F]">Support a Warrior</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[#2F4F4F] md:text-5xl">
              Veteran Scholarship Fund
            </h2>
            <p className="mx-auto mt-6 max-w-2xl font-body text-[#2F4F4F]/70 leading-relaxed">
              Your donation sends a veteran through a full transformation weekend. Every dollar goes directly to healing a warrior who has given everything for this country.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8">
            <a
              href="https://www.paypal.com/donate?campaign_id=R877JP38Q4F8S"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-[#556B2F] px-8 py-4 font-body font-semibold text-white transition hover:bg-[#6B8E23] shadow-lg"
            >
              Sponsor a Veteran's Healing
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════ APPLICATION FORM ═══════ */}
      <section id="apply" className="bg-[#1A1A1A] px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-2xl"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <p className="font-body text-xs uppercase tracking-[0.3em] text-[#B8860B]">Take the First Step</p>
            <h2 className="mt-4 font-display text-3xl font-bold text-[#F5F0E6] md:text-5xl">
              Your Mission Is Not Over. It Is Just Beginning.
            </h2>
          </motion.div>

          {formSubmitted ? (
            <motion.div id="veteran-form-section" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-xl bg-[#556B2F]/20 border border-[#556B2F]/40 p-8 text-center">
              <Shield className="h-12 w-12 text-[#B8860B] mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-[#F5F0E6]">Thank You for Your Courage</h3>
              <p className="mt-4 font-body text-[#F5F0E6]/70 leading-relaxed">
                A member of our team will reach out within 24 hours.
              </p>
              <p className="mt-4 font-body text-[#F5F0E6]/70">
                If you are in crisis now, call{" "}
                <a href="tel:988" className="text-[#B8860B] font-bold underline">988 and press 1</a>.
              </p>
            </motion.div>
          ) : (
            <motion.form variants={fadeUp} onSubmit={handleSubmit} className="space-y-8">

              {/* ── Section: Personal Info ── */}
              <div className="space-y-1 mb-2">
                <h3 className="font-display text-lg font-bold text-[#B8860B]">Personal Information</h3>
                <p className="font-body text-xs text-[#F5F0E6]/40">All fields marked * are required</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">First Name *</label>
                  <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="First name" />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Last Name *</label>
                  <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Last name" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Phone *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="(555) 123-4567" />
                </div>
              </div>

              {/* ── Section: Service History ── */}
              <div className="pt-4 border-t border-[#556B2F]/20">
                <h3 className="font-display text-lg font-bold text-[#B8860B] mb-1">Service History</h3>
                <p className="font-body text-xs text-[#F5F0E6]/40 mb-4">Help us understand your background</p>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Branch of Service *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {branches.map((b) => (
                    <label key={b} className="flex items-center gap-3 cursor-pointer group">
                      <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${formData.branch === b ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.branch === b && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{b}</span>
                      <input type="radio" name="branch" value={b} checked={formData.branch === b} onChange={(e) => setFormData({ ...formData, branch: e.target.value })} className="sr-only" />
                    </label>
                  ))}
                </div>
                {formData.branch === "Other" && (
                  <input type="text" value={formData.branchOther} onChange={(e) => setFormData({ ...formData, branchOther: e.target.value })} className="mt-2 w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Please specify your branch..." />
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Service Era</label>
                <div className="space-y-2">
                  {serviceEras.map((era) => (
                    <label key={era} className="flex items-center gap-3 cursor-pointer group">
                      <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${formData.serviceEra === era ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.serviceEra === era && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{era}</span>
                      <input type="radio" name="serviceEra" value={era} checked={formData.serviceEra === era} onChange={(e) => setFormData({ ...formData, serviceEra: e.target.value })} className="sr-only" />
                    </label>
                  ))}
                </div>
                {formData.serviceEra === "Other" && (
                  <input type="text" value={formData.serviceEraOther} onChange={(e) => setFormData({ ...formData, serviceEraOther: e.target.value })} className="mt-2 w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Please specify your service era..." />
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Years of Service</label>
                  <input type="text" value={formData.yearsOfService} onChange={(e) => setFormData({ ...formData, yearsOfService: e.target.value })} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="e.g., 8 years" />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Number of Deployments</label>
                  <input type="text" value={formData.deployments} onChange={(e) => setFormData({ ...formData, deployments: e.target.value })} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="e.g., 3" />
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Discharge Status</label>
                <div className="grid grid-cols-2 gap-2">
                  {dischargeTypes.map((dt) => (
                    <label key={dt} className="flex items-center gap-3 cursor-pointer group">
                      <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${formData.dischargeType === dt ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.dischargeType === dt && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{dt}</span>
                      <input type="radio" name="dischargeType" value={dt} checked={formData.dischargeType === dt} onChange={(e) => setFormData({ ...formData, dischargeType: e.target.value })} className="sr-only" />
                    </label>
                  ))}
                </div>
              </div>

              {/* ── Section: What You Are Carrying ── */}
              <div className="pt-4 border-t border-[#556B2F]/20">
                <h3 className="font-display text-lg font-bold text-[#B8860B] mb-1">What You Are Carrying</h3>
                <p className="font-body text-xs text-[#F5F0E6]/40 mb-4">No judgment. Just understanding. Select everything that applies.</p>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Primary Struggles (select all that apply)</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {struggles.map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer group">
                      <span className={`h-5 w-5 rounded border-2 flex items-center justify-center transition flex-shrink-0 ${formData.struggles.includes(s) ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.struggles.includes(s) && <span className="text-white text-xs font-bold">✓</span>}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{s}</span>
                      <input type="checkbox" checked={formData.struggles.includes(s)} onChange={() => handleCheckboxToggle("struggles", s)} className="sr-only" />
                    </label>
                  ))}
                </div>
                {formData.struggles.includes("Other") && (
                  <input type="text" value={formData.strugglesOther} onChange={(e) => setFormData({ ...formData, strugglesOther: e.target.value })} className="mt-2 w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Please describe what you are carrying..." />
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Current Support Systems (select all that apply)</label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {currentSupport.map((cs) => (
                    <label key={cs} className="flex items-center gap-2 cursor-pointer group">
                      <span className={`h-5 w-5 rounded border-2 flex items-center justify-center transition flex-shrink-0 ${formData.currentSupport.includes(cs) ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.currentSupport.includes(cs) && <span className="text-white text-xs font-bold">✓</span>}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{cs}</span>
                      <input type="checkbox" checked={formData.currentSupport.includes(cs)} onChange={() => handleCheckboxToggle("currentSupport", cs)} className="sr-only" />
                    </label>
                  ))}
                </div>
                {formData.currentSupport.includes("Other") && (
                  <input type="text" value={formData.currentSupportOther} onChange={(e) => setFormData({ ...formData, currentSupportOther: e.target.value })} className="mt-2 w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Please describe your support system..." />
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Current Medications (if any)</label>
                <textarea value={formData.currentMedications} onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })} rows={2} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Include prescriptions, supplements, or anything you take regularly..." />
              </div>

              {/* ── Section: Program Interest ── */}
              <div className="pt-4 border-t border-[#556B2F]/20">
                <h3 className="font-display text-lg font-bold text-[#B8860B] mb-1">Your Path Forward</h3>
                <p className="font-body text-xs text-[#F5F0E6]/40 mb-4">Tell us what interests you so we can guide you to the right starting point.</p>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Which program interests you? *</label>
                <div className="space-y-2">
                  {programInterest.map((pi) => (
                    <label key={pi} className="flex items-center gap-3 cursor-pointer group">
                      <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${formData.programInterest === pi ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.programInterest === pi && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{pi}</span>
                      <input type="radio" name="programInterest" value={pi} checked={formData.programInterest === pi} onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })} className="sr-only" />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Have you ever worked with sacred earth medicine before?</label>
                <div className="flex gap-6">
                  {["Yes", "No", "Unsure"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${formData.plantMedicineExperience === opt ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.plantMedicineExperience === opt && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{opt}</span>
                      <input type="radio" name="plantMedicine" value={opt} checked={formData.plantMedicineExperience === opt} onChange={(e) => setFormData({ ...formData, plantMedicineExperience: e.target.value })} className="sr-only" />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Would your spouse or partner like to participate?</label>
                <div className="flex gap-6">
                  {["Yes", "No", "Maybe"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${formData.hasSpouseInterest === opt ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.hasSpouseInterest === opt && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{opt}</span>
                      <input type="radio" name="spouseInterest" value={opt} checked={formData.hasSpouseInterest === opt} onChange={(e) => setFormData({ ...formData, hasSpouseInterest: e.target.value })} className="sr-only" />
                    </label>
                  ))}
                </div>
              </div>

              {/* ── Section: Emergency & Logistics ── */}
              <div className="pt-4 border-t border-[#556B2F]/20">
                <h3 className="font-display text-lg font-bold text-[#B8860B] mb-1">Emergency Contact & Logistics</h3>
                <p className="font-body text-xs text-[#F5F0E6]/40 mb-4">For your safety during any ceremony or retreat</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Emergency Contact Name</label>
                  <input type="text" value={formData.emergencyName} onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Name of someone we can contact" />
                </div>
                <div>
                  <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Emergency Contact Phone</label>
                  <input type="tel" value={formData.emergencyPhone} onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="(555) 123-4567" />
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">How did you hear about us?</label>
                <div className="grid grid-cols-2 gap-2">
                  {hearAbout.map((h) => (
                    <label key={h} className="flex items-center gap-3 cursor-pointer group">
                      <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${formData.hearAbout === h ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.hearAbout === h && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{h}</span>
                      <input type="radio" name="hearAbout" value={h} checked={formData.hearAbout === h} onChange={(e) => setFormData({ ...formData, hearAbout: e.target.value })} className="sr-only" />
                    </label>
                  ))}
                </div>
                {formData.hearAbout === "Other" && (
                  <input type="text" value={formData.hearAboutOther} onChange={(e) => setFormData({ ...formData, hearAboutOther: e.target.value })} className="mt-2 w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Please tell us how you found us..." />
                )}
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-3">Preferred Contact Method</label>
                <div className="flex gap-6">
                  {["Phone", "Email", "Text"].map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                      <span className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition ${formData.contactMethod === opt ? "border-[#B8860B] bg-[#B8860B]" : "border-[#556B2F]/50 group-hover:border-[#B8860B]/50"}`}>
                        {formData.contactMethod === opt && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>
                      <span className="font-body text-sm text-[#F5F0E6]/80">{opt}</span>
                      <input type="radio" name="contactMethod" value={opt} checked={formData.contactMethod === opt} onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })} className="sr-only" />
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-body text-sm font-semibold text-[#F5F0E6] mb-2">Anything else you want us to know?</label>
                <textarea value={formData.additionalInfo} onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })} rows={3} className="w-full rounded-lg border border-[#556B2F]/30 bg-[#2F4F4F]/20 px-4 py-3 font-body text-[#F5F0E6] placeholder:text-[#F5F0E6]/30 focus:border-[#B8860B] focus:outline-none focus:ring-1 focus:ring-[#B8860B]" placeholder="Your story matters. Share whatever feels right · we are listening." />
              </div>

              {formError && (
                <div className="rounded-lg bg-red-900/30 border border-red-500/40 p-4 text-center">
                  <p className="font-body text-sm text-red-300">{formError}</p>
                </div>
              )}

              <button type="submit" disabled={submitting} className="w-full rounded-lg bg-[#556B2F] py-4 font-body text-base font-semibold text-white transition hover:bg-[#6B8E23] shadow-lg disabled:opacity-50">
                {submitting ? "Submitting..." : "Begin Your Transformation"}
              </button>

              <p className="text-center font-body text-xs text-[#F5F0E6]/40">
                Your information is confidential and sacred. We will never share your details. If you are in crisis, call <a href="tel:988" className="text-[#B8860B] underline">988, press 1</a>.
              </p>
            </motion.form>
          )}
        </motion.div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="bg-[#1A1A1A] border-t border-[#556B2F]/20 px-4 py-12 pb-20">
        <div className="mx-auto max-w-6xl text-center">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <img src={logo} alt="Temple Mother Earth" className="h-10 w-10 rounded-full" />
            <span className="font-display text-lg font-bold text-[#F5F0E6]">Temple Mother Earth</span>
          </Link>
          <p className="font-body text-sm text-[#F5F0E6]/50 max-w-xl mx-auto">
            Temple Mother Earth is a sacred ceremony church organized under section 508(c)(1)(A). Our ceremonies are protected religious practices under the Religious Freedom Restoration Act (RFRA) and the First Amendment.
          </p>
          <p className="mt-4 font-body text-xs text-[#F5F0E6]/30">
            Kambo ceremony near me | Plant medicine for PTSD | Veteran healing retreat Maryland DC Virginia
          </p>
          <p className="mt-6 font-body text-sm text-[#B8860B]">
            "The same courage that took you into combat can take you into healing."
          </p>
        </div>
      </footer>

      <MidImageBanner
        image={midVeteransImg}
        eyebrow="Warrior, Welcome Home"
        headline={<>You Came Home <em className="font-serif italic text-primary">For a Reason</em></>}
        body="You did not survive what you survived to keep carrying it alone. The medicine is here. The brothers and sisters are here. The reason is here."
        ctaLabel="Reserve Your Seat"
        ctaHref="/ceremony-intake"
      />

      <FooterVideoBanner
        video={footerVeteransVideoAsset.url}
        eyebrow="Stand Down, Soldier"
        headline={<>The Mission<br /><em className="font-serif italic text-primary">Is Coming Home</em></>}
        body="The same courage that took you into combat can take you into healing. Take the first step."
        ctaLabel="Reserve Your Seat"
        ctaHref="/ceremony-intake"
      />

      <DonationCTA
        variant="olive"
        eyebrow="No Warrior Left Behind"
        headline="Send a Veteran Into Healing"
        body="Your contribution directly funds a veteran's transformation weekend · covering ceremony, lodging, meals, and aftercare. Every dollar goes to a warrior who gave everything for this country."
        buttonLabel="Sponsor a Veteran"
        donateUrl="https://www.paypal.com/donate?campaign_id=R877JP38Q4F8S"
      />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "MedicalOrganization",
                name: "Temple Mother Earth - Veterans Transformation Program",
                description: "Sacred Kambo healing and plant medicine ceremonies designed for veterans with PTSD, chronic pain, and military trauma.",
                url: "https://templemotherearth.lovable.app/veterans-transformation-program",
                address: {
                  "@type": "PostalAddress",
                  addressRegion: "MD",
                  addressCountry: "US",
                },
                areaServed: ["Maryland", "Washington DC", "Virginia"],
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.a,
                  },
                })),
              },
              {
                "@type": "Event",
                name: "Veteran's Weekend: Relax & Reset Retreat",
                description: "3 days, 3 Kambo sessions, a lifetime of healing. Sacred plant medicine retreat for veterans.",
                offers: {
                  "@type": "Offer",
                  price: "1497",
                  priceCurrency: "USD",
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
};

export default VeteransTransformation;
