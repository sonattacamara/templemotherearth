import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, type Easing } from "framer-motion";
import { Shield, Droplets, Brain, Heart, Sparkles, Leaf, ChevronDown, ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import Navigation from "@/components/Navigation";
import EventbriteCTA from "@/components/EventbriteCTA";
import logo from "@/assets/logo.png";
import offeringCeremony from "@/assets/offering-ceremony.jpg";
import founderJames from "@/assets/founder-james.jpg";

const KAMBO_URL = "https://kambo.templemotherearth.org/";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const benefits = [
  { icon: Shield, title: "Immune System Strengthening", desc: "Kambo peptides stimulate the immune system, helping clear accumulated buildup and support the body's natural intelligence." },
  { icon: Brain, title: "Mental Clarity & Focus", desc: "Many participants report sharp mental clarity, lifted brain fog, and heightened awareness after ceremony." },
  { icon: Heart, title: "Emotional Release & Purification", desc: "The purging process helps release stored emotions, grief, and energetic blockages held deep in the body." },
  { icon: Sparkles, title: "Spiritual Purification", desc: "Kambo is considered a spiritual reset, clearing negative energy and realigning your connection to source." },
];

const whatToExpect = [
  { title: "Preparation", desc: "Complete the Sacred Intake Form, follow dietary guidelines for 48 hours, and arrive hydrated. Your facilitator will review your health history." },
  { title: "The Ceremony", desc: "Small points are applied to the skin. The Kambo secretion is administered and the body's natural purging process begins — typically lasting 20–40 minutes." },
  { title: "Aftercare & Integration", desc: "Rest deeply after ceremony. Drink nourishing fluids, journal your experience, and attend integration circles to process insights." },
];

const faqs = [
  { q: "Is Kambo safe?", a: "When facilitated by trained practitioners with proper medical screening, Kambo is safe. All participants must complete our Sacred Intake Form, which screens for contraindications including heart conditions, blood pressure medications, and psychiatric medications." },
  { q: "How do I prepare for Kambo?", a: "Fast from food for 10–12 hours before ceremony. Drink 1.5–2 liters of water the morning of ceremony. Avoid blood thinners, NSAIDs, and anti-inflammatory medications for 48+ hours prior. Full guidelines are on our Preparation page." },
  { q: "How long does a Kambo session last?", a: "The active purging phase typically lasts 20–40 minutes. The entire ceremony, including preparation, intention setting, and post-ceremony rest, is approximately 2–3 hours." },
  { q: "Who should NOT do Kambo?", a: "Kambo is contraindicated for those with serious heart conditions, those who are pregnant or breastfeeding, those on blood thinners or psychiatric medications, and those who have had a stroke or aneurysm. Our intake form screens for all contraindications." },
  { q: "Will I hallucinate or lose control?", a: "No. Kambo does not alter your state of mind. You maintain full consciousness and mental clarity throughout the entire process. This is a physical purification, not a psychedelic experience." },
  { q: "Is Kambo legal?", a: "Kambo is not a controlled substance. Temple Mother Earth operates as a 508(c)(1)(A) temple under the Religious Freedom Restoration Act (RFRA), and our ceremonies are conducted as bona fide religious practices." },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

const KamboRedirect = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Kambo Ceremony Washington DC"
        description="Experience authentic Kambo purification ceremonies with King James in Washington DC. Safe, sacred, and transformational. Free consultation included."
        path="/kambo"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Navigation />
      <PageBreadcrumb items={[{ label: "Experiences" }, { label: "Kambo Ceremony" }]} />

      {/* Animal Kingdom Header */}
      <div className="bg-foreground border-b border-primary/20 py-3 px-6">
        <div className="mx-auto max-w-4xl flex items-center gap-3">
          <span className="font-body text-[7px] tracking-[3px] uppercase bg-primary/80 text-primary-foreground px-4 py-1.5 rounded-sm font-bold">Animal Kingdom</span>
          <span className="font-display italic text-sm text-muted-foreground">Phyllomedusa bicolor -- The Giant Monkey Frog</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden px-4 pt-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${offeringCeremony})` }} />
        <div className="absolute inset-0 bg-foreground/75" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-primary/80 mb-4">
            Sacred Frog Medicine
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl leading-tight">
            Kambo Ceremony in Washington DC
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Experience the ancient purification medicine of the Giant Monkey Tree Frog.
            A sacred cleansing of body, mind, and spirit — held in ceremony with reverence and care.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/ceremony-intake"
              className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
            >
              Begin Your Journey
            </Link>
            <a
              href={KAMBO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Visit Kambo Portal
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* What is Kambo */}
      <section className="px-4 py-16 md:py-20">
        <motion.div className="mx-auto max-w-4xl" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-4xl">
            What is Kambo?
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Kambo is the sacred secretion of the <em>Phyllomedusa bicolor</em> — the Giant Monkey Tree Frog
                found deep in the Amazon rainforest. For thousands of years, indigenous peoples have used Kambo
                for physical detoxification, emotional clearing, and spiritual purification.
              </p>
              <p>
                The secretion contains a complex cocktail of bioactive peptides that work directly with the body's
                immune, endocrine, and nervous systems. Unlike psychedelics, Kambo does not alter your state of mind —
                you remain fully conscious and aware throughout the entire process.
              </p>
              <p>
                At Temple Mother Earth, Kambo ceremonies are facilitated by <strong className="text-foreground">King James</strong>,
                our co-founder and experienced Kambo practitioner, in a safe, sacred, and medically-screened environment.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={offeringCeremony}
                alt="Sacred Kambo ceremony circle at Temple Mother Earth with participants in white clothing seated in a circle"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits */}
      <section className="bg-card px-4 py-16 md:py-20">
        <motion.div className="mx-auto max-w-5xl" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-card-foreground md:text-4xl">
            Benefits of Kambo Ceremony
          </motion.h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {benefits.map((b) => (
              <motion.div key={b.title} variants={fadeUp} className="rounded-2xl border border-border bg-background p-6">
                <b.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-display text-lg font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* What to Expect */}
      <section className="px-4 py-16 md:py-20">
        <motion.div className="mx-auto max-w-3xl" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-4xl">
            What to Expect
          </motion.h2>
          <div className="mt-12 space-y-6">
            {whatToExpect.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} className="flex gap-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20 font-display text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Facilitator Bio */}
      <section className="bg-card px-4 py-16 md:py-20">
        <motion.div className="mx-auto max-w-4xl" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-card-foreground md:text-4xl mb-10">
            Your Kambo Facilitator
          </motion.h2>
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-8 items-center">
            <img
              src={founderJames}
              alt="King James, co-founder and Kambo facilitator at Temple Mother Earth"
              className="w-48 h-48 rounded-2xl object-cover shadow-xl"
              loading="lazy"
            />
            <div>
              <h3 className="font-display text-xl font-bold text-foreground">King James</h3>
              <p className="text-sm text-primary font-semibold mb-3">Co-Founder · Sacred Earth Medicine Keeper</p>
              <p className="text-muted-foreground leading-relaxed">
                King James is the co-founder of Temple Mother Earth and an experienced Kambo practitioner
                who has facilitated hundreds of sacred Kambo ceremonies. His approach combines deep reverence
                for the sacrament with rigorous safety protocols, ensuring every participant is held in a
                container of care, prayer, and intention. James's journey with Kambo began through his own
                path of transformation, and he now dedicates his life to sharing this sacred sacrament with warriors,
                seekers, and those called to purification.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16 md:py-20">
        <motion.div className="mx-auto max-w-3xl" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
          <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-4xl mb-10">
            Kambo FAQ
          </motion.h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} variants={fadeUp} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-sm font-semibold text-foreground md:text-base">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA to Portal */}
      <section className="bg-foreground px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-[10px] font-bold uppercase tracking-[0.35em] text-primary/80 mb-4">
            A Sacred Threshold
          </p>
          <h2 className="font-display text-3xl font-bold text-primary-foreground md:text-4xl leading-tight">
            The Frog Nation Awaits
          </h2>
          <p className="mt-5 max-w-md mx-auto font-body text-sm leading-relaxed text-primary-foreground/60">
            When you are ready, step through the threshold into our dedicated Kambo sacred space.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={KAMBO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
            >
              Enter Sacred Space
            </a>
            <Link
              to="/ceremony-intake"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Complete Sacred Intake
            </Link>
          </div>
          <Link
            to="/"
            className="mt-10 inline-block font-body text-xs text-primary-foreground/30 underline underline-offset-2 hover:text-primary-foreground/50"
          >
            ← Return to Temple Mother Earth
          </Link>
        </div>
      </section>

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default KamboRedirect;
