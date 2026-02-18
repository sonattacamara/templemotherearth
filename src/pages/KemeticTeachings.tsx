import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { Sun, Moon, Sunrise, Sunset, Heart, Shield, Flame, Droplets, Sparkles, Eye, ExternalLink, Bell, ArrowRight, Send, Instagram, Globe, BookOpen } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import { usePageTracking } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import drGeorge from "@/assets/facilitator-george-new.jpg";
import logo from "@/assets/logo.png";
import ctaFooterImg from "@/assets/cta-footer.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

/* ── Solar Cycle Data ── */
const solarCycle = [
  {
    time: "Sunrise",
    icon: Sunrise,
    neter: "Tehuti + Khepera",
    practice: "Ankh Activation",
    desc: "The transformative power of Khepera restoring the Sun each morning. Activate the Ankh — the key of life — as the sun rises.",
    gradient: "from-amber-300/20 to-orange-400/20",
    accent: "text-amber-400",
  },
  {
    time: "Noon",
    icon: Sun,
    neter: "Amun Ra",
    practice: "Walking Meditation",
    desc: "The walking meditation of Amun Ra. Move in prayer under the full light of the noonday sun.",
    gradient: "from-yellow-300/20 to-amber-300/20",
    accent: "text-yellow-400",
  },
  {
    time: "Sunset",
    icon: Sunset,
    neter: "Atum",
    practice: "Standing Meditation",
    desc: "The sunset standing meditation of Atum. Stand in still communion as the sun descends.",
    gradient: "from-orange-400/20 to-red-400/20",
    accent: "text-orange-400",
  },
  {
    time: "Bedtime",
    icon: Moon,
    neter: "IamHetep + Osiris",
    practice: "IamHetep Regeneration",
    desc: "Sleep regeneration through the backbone of Osiris. Goal affirmations of connection, alignment, merging, and elevation.",
    gradient: "from-indigo-400/20 to-purple-400/20",
    accent: "text-indigo-300",
  },
];

/* ── Affirmation Cards ── */
const affirmations = [
  { text: "I am safe.", isfet: "When you are NOT safe, the limbic system activates survival mode. This creates Wekhedu — stagnation that blocks the Metou." },
  { text: "I am warm.", isfet: "When you lack warmth — physical or emotional — the body contracts. Circulation slows, creating blockage in the Metou." },
  { text: "My hunger and thirst are satisfied.", isfet: "Unmet nourishment creates primal anxiety. The body hoards energy, disrupting the natural flow of life force." },
  { text: "I am fertile or virile.", isfet: "When creative and regenerative energy is blocked, stagnation manifests as depression, disconnection, and loss of purpose." },
  { text: "I like myself.", isfet: "Self-rejection is the deepest Isfet. It poisons every Metou pathway, creating chaos that radiates outward into all relationships." },
];

/* ── Trinity Data ── */
const trinity = [
  {
    name: "Ptah",
    role: "The Father",
    color: "from-emerald-900 to-emerald-800",
    border: "border-emerald-600/30",
    desc: "The first god of Kemet, found in the Delta. Originally depicted as a dwarf, in later dynasties shown as a full man with green skin representing immortality and a blue cap representing divinity. His cult became the builders and architects foundation that Master Masons come from. Father of IamHetep.",
  },
  {
    name: "Sekhmet",
    role: "The Mother",
    color: "from-red-900 to-red-800",
    border: "border-red-600/30",
    desc: "Warrior goddess worshipped during the 60-year war against the Hyksos revolution. Taught IamHetep herbs, teas, and wound healing. Mother of Kemetic Reiki. Mother of the god of medicine.",
  },
  {
    name: "IamHetep",
    role: "The Son",
    color: "from-blue-900 to-blue-800",
    border: "border-blue-600/30",
    desc: "First god of medicine AND a real historical person. Architect of the first pyramid. Called 'Son of Ptah.' Described the Metou during the Third Dynasty. First physician known by name in written history. Diagnosed and treated over 200 diseases. Author of the Edwin Smith Papyrus.",
  },
];

/* ── Future Teachings ── */
const futureTeachings = [
  "Ptah — The Creator",
  "Sekhmet — The Warrior Healer",
  "IamHetep — The Divine Physician",
  "The Daily Practice Guide",
  "Wekhedu in Modern Life",
  "Maat vs. Isfet — Balance & Chaos",
  "The Kemetic Origin of Chinese Medicine",
  "Qi Gong and the Metou",
];

/* ── Scroll Progress Sections ── */
const progressSections = ["The Practice", "Daily Cycle", "Eye of Horus", "Wekhedu", "The Trinity", "Join Us"];

const KemeticTeachings = () => {
  usePageTracking();
  const { toast } = useToast();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSolar, setActiveSolar] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [flippedTrinity, setFlippedTrinity] = useState<Set<number>>(new Set());
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleCard = (i: number) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const toggleTrinity = (i: number) => {
    setFlippedTrinity((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await supabase.functions.invoke("submit-newsletter", { body: { email, source: "kemetic-teachings" } });
      toast({ title: "Blessed! 🌿", description: "You'll receive new teachings from Dr. Love." });
      setEmail("");
    } catch {
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-foreground text-primary-foreground">
      <SEOHead
        title="Kemetic Teachings — Dr. George Xavier Love"
        description="Explore the ancient African Egyptian spiritual tradition of Kemetism through the teachings of Dr. George Xavier Love, Jr. — High Priest of Kemetic Healing at Temple Mother Earth."
        path="/kemetic-teachings"
      />
      <Navigation />

      {/* ── Scroll Progress Bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-foreground/50">
        <motion.div className="h-full bg-secondary" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_30%,hsl(48_70%_50%/0.3),transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <img src={drGeorge} alt="Dr. George Xavier Love, Jr." className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-secondary/40 shadow-xl" />
            </motion.div>
            <motion.p variants={fadeUp} className="text-secondary font-body text-sm tracking-[0.25em] uppercase mb-4">
              Temple Mother Earth Presents
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-secondary via-accent to-secondary bg-clip-text text-transparent">
              Kemetic Teachings
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto mb-4">
              Our temple is rooted in the ancient spiritual practices of Kemet — honoring Mother Earth as the sacred source of all healing, wisdom, and transformation.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-sm text-secondary/80 italic">
              High Priest of Kemetic Healing · Keeper of the Wisdom of IamHetep
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION A: THE PRACTICE ── */}
      <section id="the-practice" className="py-8 md:py-12 bg-foreground/95">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="mx-auto max-w-4xl px-4">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-center mb-8 text-secondary">
            What is Kemetism?
          </motion.h2>
          <motion.div variants={fadeUp} className="font-body text-base md:text-lg text-primary-foreground/80 leading-relaxed space-y-6">
            <p>
              Temple Mother Earth is founded on the ancient Kemetic practices of living in sacred relationship with the Earth — the original mother, healer, and provider. Our ancestors in{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="text-secondary cursor-help border-b border-dashed border-secondary/40">Kemet</strong>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-background border-secondary/30 text-foreground">
                  <p className="font-body text-sm"><strong>Kemet</strong> — meaning "The Black Land" — is the original name for ancient Egypt, referring to the rich, dark soil along the Nile that sustained all life.</p>
                </TooltipContent>
              </Tooltip>{" "}
              (ancient Egypt) understood that the Earth herself is medicine, and that true healing begins when we align ourselves with her rhythms, her seasons, and her wisdom.
            </p>
            <p>
              Kemetism is the spiritual practice of awareness, connection, and elevation through these Kemetic spiritual principles — creating the balance of{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="text-secondary cursor-help border-b border-dashed border-secondary/40">Maat</strong>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-background border-secondary/30 text-foreground">
                  <p className="font-body text-sm"><strong>Maat</strong> — the divine principle of truth, justice, balance, and cosmic order. Living in Maat means aligning your actions with universal harmony.</p>
                </TooltipContent>
              </Tooltip>{" "}
              with the guidance of{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="text-secondary cursor-help border-b border-dashed border-secondary/40">Tehuti</strong>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-background border-secondary/30 text-foreground">
                  <p className="font-body text-sm"><strong>Tehuti</strong> (also known as Thoth) — the Neter of wisdom, writing, and sacred knowledge. Tehuti guides the mind toward higher understanding and spiritual intelligence.</p>
                </TooltipContent>
              </Tooltip>{" "}
              and the transformative power of{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="text-secondary cursor-help border-b border-dashed border-secondary/40">Khepera</strong>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-background border-secondary/30 text-foreground">
                  <p className="font-body text-sm"><strong>Khepera</strong> — the sacred scarab, the Neter of transformation and rebirth. Khepera pushes the Sun into being each morning, symbolizing perpetual renewal and the power to become.</p>
                </TooltipContent>
              </Tooltip>{" "}
              restoring the Sun each morning. We follow the Sun. We honor the Earth. We remember what our ancestors always knew.
            </p>
          </motion.div>

          {/* Body-as-Temple teaching */}
          <motion.div variants={fadeUp} className="mt-10 rounded-2xl border border-secondary/20 bg-secondary/5 p-6 md:p-8">
            <h3 className="font-display text-xl md:text-2xl font-bold text-secondary mb-4 text-center">
              You Are the Temple
            </h3>
            <div className="font-body text-base md:text-lg text-primary-foreground/80 leading-relaxed space-y-4">
              <p>
                In Kemetic philosophy, the body is not separate from the sacred — <em>your body is the first temple</em>. Every breath, every heartbeat, every cell carries the divine spark of creation. When you care for your body — through nourishment, movement, rest, and ceremony — you are not merely maintaining flesh. You are honoring the vessel through which the divine experiences itself.
              </p>
              <p>
                And just as your body is your personal temple, <strong className="text-secondary">Mother Earth is the greater container</strong> — the original sanctuary that holds everything we need for healing, sustenance, and spiritual elevation. The plants, the water, the soil, the sunlight — these are not resources to be consumed. They are sacred gifts from a living, breathing temple that cradles all of humanity.
              </p>
              <p className="text-secondary/90 italic text-center">
                When you heal the temple within, you deepen your connection to the divine. When you honor the Earth, you honor the source from which all temples arise.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION B: DAILY PRACTICE — SOLAR CYCLE ── */}
      <section id="daily-cycle" className="py-16 md:py-24 bg-foreground">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="mx-auto max-w-5xl px-4">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">
            The Daily Practice Cycle
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-center text-primary-foreground/60 mb-12">
            Follow the Sun through four sacred practices each day
          </motion.p>

          {/* Solar Cycle Selector */}
          <motion.div variants={fadeUp} className="flex justify-center gap-2 md:gap-4 mb-10 flex-wrap">
            {solarCycle.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  key={i}
                  onClick={() => setActiveSolar(i)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-body text-sm transition-all duration-300 ${
                    activeSolar === i
                      ? "bg-secondary/20 text-secondary border border-secondary/40 shadow-lg shadow-secondary/10"
                      : "bg-foreground/50 text-primary-foreground/50 border border-primary-foreground/10 hover:border-secondary/30"
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{item.time}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Active Practice Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSolar}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={`mx-auto max-w-2xl rounded-2xl border border-secondary/20 bg-gradient-to-br ${solarCycle[activeSolar].gradient} p-8 md:p-10 text-center`}
            >
              <div className={`text-5xl mb-4 ${solarCycle[activeSolar].accent}`}>
                {(() => { const Icon = solarCycle[activeSolar].icon; return <Icon size={48} className="mx-auto" />; })()}
              </div>
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">
                {solarCycle[activeSolar].practice}
              </h3>
              <p className="font-body text-sm text-secondary mb-4">
                Guided by {solarCycle[activeSolar].neter}
              </p>
              <p className="font-body text-primary-foreground/80 leading-relaxed">
                {solarCycle[activeSolar].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ── SECTION C: EYE OF HORUS — AFFIRMATION CARDS ── */}
      <section id="eye-of-horus" className="py-16 md:py-24 bg-foreground/95">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="mx-auto max-w-5xl px-4">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">
            The Inner Wisdom — Eye of Horus
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-center text-primary-foreground/60 mb-4 max-w-2xl mx-auto">
            With IamHetep, your sleep regeneration reveals the inner wisdom Eye of Horus — reflecting the Limbic System:
          </motion.p>
          <motion.p variants={fadeUp} className="font-body text-center text-primary-foreground/40 text-sm mb-12">
            Tap each affirmation to reveal what happens when it is not true
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {affirmations.map((a, i) => (
              <motion.div
                key={i}
                onClick={() => toggleCard(i)}
                className="cursor-pointer perspective-1000"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`relative rounded-xl border min-h-[180px] transition-all duration-500 ${
                  flippedCards.has(i)
                    ? "bg-gradient-to-br from-red-900/30 to-foreground border-red-600/30"
                    : "bg-gradient-to-br from-secondary/10 to-foreground border-secondary/30 shadow-lg shadow-secondary/5"
                }`}>
                  <div className="p-6 flex flex-col justify-center min-h-[180px]">
                    {!flippedCards.has(i) ? (
                      <div className="text-center">
                        <Sparkles className="mx-auto mb-3 text-secondary" size={24} />
                        <p className="font-display text-xl font-semibold text-primary-foreground">✦ {a.text}</p>
                      </div>
                    ) : (
                      <div>
                        <Eye className="mb-3 text-red-400" size={20} />
                        <p className="font-body text-sm text-primary-foreground/80 leading-relaxed">{a.isfet}</p>
                        <p className="font-body text-xs text-red-400/80 mt-3 italic">This creates Isfet — chaos or disharmony.</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION D: WEKHEDU & METOU ── */}
      <section id="wekhedu" className="py-16 md:py-24 bg-foreground">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="mx-auto max-w-4xl px-4">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-center mb-8 text-secondary">
            Wekhedu and the Metou
          </motion.h2>
          <motion.div variants={fadeUp} className="space-y-6 font-body text-base md:text-lg text-primary-foreground/80 leading-relaxed">
            <blockquote className="border-l-4 border-secondary/40 pl-6 italic text-primary-foreground/70">
              Chaos in behavior creates depletion, or accumulation and stagnation that we call <strong className="text-secondary">Wekhedu</strong>.
            </blockquote>
            <p>
              Wekhedu prevents the free flow of blood and oxygen through the energy pathways we call <strong className="text-secondary">Metou</strong>.
            </p>
            <p>
              IamHetep — first god of medicine and a real person, architect of the first pyramid — described these Metou during the Third Dynasty, approximately 4500 BC.
            </p>
            <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-6 md:p-8">
              <p className="font-display text-lg font-semibold text-secondary mb-2">
                The Origin of Equilibrium Medicine
              </p>
              <p className="text-primary-foreground/70">
                This is the <strong className="text-primary-foreground">KEMETIC (African Egyptian) origin</strong> of Chinese medicine, called Equilibrium Medicine. The Metou are the predecessors of what the Chinese call meridians — energy pathways mapped over 4,500 years ago by IamHetep himself.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION E: THE TRINITY ── */}
      <section id="the-trinity" className="py-16 md:py-24 bg-foreground/95">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="mx-auto max-w-5xl px-4">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">
            The Trinity — Ptah, Sekhmet, IamHetep
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-center text-primary-foreground/40 text-sm mb-12">
            Tap each card to reveal the teaching
          </motion.p>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trinity.map((t, i) => (
              <motion.div
                key={i}
                onClick={() => toggleTrinity(i)}
                className="cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`rounded-2xl border ${t.border} bg-gradient-to-b ${t.color} p-6 md:p-8 min-h-[280px] flex flex-col justify-center transition-all duration-300`}>
                  {!flippedTrinity.has(i) ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Sparkles className="text-secondary" size={28} />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">{t.name}</h3>
                      <p className="font-body text-sm text-secondary">{t.role}</p>
                      <p className="font-body text-xs text-primary-foreground/40 mt-4">Tap to learn more</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-display text-lg font-bold text-secondary mb-1">{t.name} — {t.role}</h3>
                      <p className="font-body text-sm text-primary-foreground/80 leading-relaxed">{t.desc}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 text-center">
            <blockquote className="font-body text-primary-foreground/70 italic max-w-2xl mx-auto border-l-4 border-secondary/40 pl-6 text-left">
              They were worshipped as a triune. Our Kemetic temple is based upon the trinity of Ptah–Sekhmet–IamHetep.
            </blockquote>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SECTION F: JOIN OUR TEMPLE ── */}
      <section id="join-us" className="py-16 md:py-24 bg-foreground">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mx-auto max-w-3xl px-4 text-center">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold mb-6 text-secondary">
            Join Our Temple
          </motion.h2>
          <motion.div variants={fadeUp} className="font-body text-primary-foreground/80 leading-relaxed space-y-4 mb-8">
            <p>
              We have sacred service weekly Saturday nights 9 PM – 12 AM to express gratitude and joy for the week. Followed by a sunrise service at the beach to merge with divine.
            </p>
            <p>
              When you join the temple, you can avail yourself of the healing services of our ordained priests and priestesses.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link to="/membership">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/80 font-body text-base px-8">
                Join Temple Mother Earth <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── ABOUT THE TEACHER ── */}
      <section className="py-16 md:py-24 bg-foreground/95">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="mx-auto max-w-5xl px-4">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-center mb-12 text-secondary">
            About the Teacher
          </motion.h2>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
            <div className="w-full md:w-1/3 flex-shrink-0">
              <img src={drGeorge} alt="Dr. George Xavier Love, Jr." className="w-full max-w-[280px] mx-auto rounded-2xl object-cover border-2 border-secondary/20 shadow-xl" />
              <div className="mt-6 flex justify-center gap-3">
                <a href="https://instagram.com/drqilove" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-secondary transition-colors">
                  <Instagram size={16} /> @drqilove
                </a>
                <a href="https://drqilove.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-secondary transition-colors">
                  <Globe size={16} /> drqilove.com
                </a>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold text-primary-foreground mb-1">Dr. George Xavier Love, Jr.</h3>
              <p className="font-body text-sm text-secondary mb-6">High Priest of Kemetic Healing · Keeper of the Wisdom of IamHetep</p>
              <div className="font-body text-sm md:text-base text-primary-foreground/75 leading-relaxed space-y-4">
                <p>
                  Dr. George Xavier Love, Jr. is a Doctor of Oriental Medicine, 13th Lineage Holder of Qing Long (Blue Dragon) Qigong, and Grandmaster of Blue Dragon Immortal Qigong. He is a licensed Acupuncture Physician (since 1986), expert in Holographic Medicine, Tibetan Buddhist Psychiatry, and Taoist Psychology.
                </p>
                <p>
                  A trance drummer for ancestral soul retrieval, author of 10 books, and international lecturer, Dr. Love has studied Ayurveda, Unani Tibb, Tibetan, Persian, and West African healing systems.
                </p>
                <p>
                  Dr. Love is the living bridge between the Kemetic healing tradition and Chinese/Oriental medicine — embodying the Metou-to-Meridian wisdom pathway that IamHetep first described nearly 4,500 years ago.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body text-primary-foreground/50">
                <span>• Doctor of Oriental Medicine</span>
                <span>• Ph.D. Sports Medicine (1982)</span>
                <span>• M.S. Biology, Temple University</span>
                <span>• Licensed Acupuncture Physician (FL, 1986)</span>
                <span>• 13th Lineage Holder, Qing Long Qigong</span>
                <span>• Author of 10 books</span>
                <span>• Teaching Qigong since 1985</span>
                <span>• Oriental Medical Doctor (Beijing, 1984)</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-foreground to-foreground/95">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="mx-auto max-w-xl px-4 text-center">
          <motion.div variants={fadeUp}>
            <BookOpen className="mx-auto mb-4 text-secondary" size={32} />
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-2">Receive the Teachings</h3>
            <p className="font-body text-sm text-primary-foreground/60 mb-6">
              Get new teachings from Dr. Love delivered to your inbox
            </p>
            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-foreground/50 border-secondary/30 text-primary-foreground placeholder:text-primary-foreground/30"
              />
              <Button type="submit" disabled={submitting} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 shrink-0">
                <Send size={16} />
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FUTURE TEACHINGS GRID ── */}
      <section className="py-16 md:py-24 bg-foreground/95">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="mx-auto max-w-5xl px-4">
          <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl font-bold text-center mb-4 text-secondary">
            Upcoming Teachings
          </motion.h2>
          <motion.p variants={fadeUp} className="font-body text-center text-primary-foreground/60 text-sm mb-4 max-w-2xl mx-auto">
            New teachings are added as Dr. Love produces more content. This page is a living repository of Kemetic wisdom.
          </motion.p>
          <motion.p variants={fadeUp} className="font-body text-center text-secondary/80 text-sm font-semibold mb-12 max-w-2xl mx-auto">
            Temple members receive direct access to Dr. Love's teachings, live sessions, and Q&A through our membership pathway.
          </motion.p>
          <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {futureTeachings.map((title, i) => (
              <div
                key={i}
                className="rounded-xl border border-primary-foreground/10 bg-foreground/50 p-5 flex flex-col justify-between min-h-[120px] hover:border-secondary/30 transition-colors"
              >
                <p className="font-display text-sm font-semibold text-primary-foreground/80 mb-3">{title}</p>
                <span className="inline-flex items-center gap-1 text-xs font-body text-primary-foreground/30">
                  <Bell size={12} /> Coming Soon
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ctaFooterImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/85" />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Welcome Home</h2>
          <p className="font-body text-primary-foreground/70 mb-8">
            The teachings of Kemet are alive in our temple. Come, remember what your ancestors always knew.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ceremony-intake">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/80 font-body w-full sm:w-auto">
                Begin Your Journey
              </Button>
            </Link>
            <a href="https://www.eventbrite.com/o/temple-of-mother-earth-29347213477" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 font-body w-full sm:w-auto">
                Enter the Sacred Space <ExternalLink size={16} className="ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground border-t border-primary-foreground/10 py-10 px-4">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Temple Mother Earth" className="h-8 w-8 rounded-full" />
            <span className="font-display text-sm text-primary-foreground/60">Temple Mother Earth</span>
          </div>
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default KemeticTeachings;
