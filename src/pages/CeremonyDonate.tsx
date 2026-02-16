import { motion, type Easing } from "framer-motion";
import { HandHeart, ArrowRight, Heart, Leaf, ShieldCheck, X, Users, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import Navigation from "@/components/Navigation";
import EventbriteCTA from "@/components/EventbriteCTA";
import ceremonyImg from "@/assets/offering-ceremony.jpg";

const CEREMONY_PAYPAL_URL = "https://www.paypal.com/donate?campaign_id=733MK2T3UK5LS";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const CeremonyDonate = () => {
  const [showDisclosure, setShowDisclosure] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Gift a Ceremony — Donate to the Ceremony Fund"
        description="Sponsor a sacred ceremony for someone who may not have the financial means. Your tax-deductible gift funds healing experiences through Temple Mother Earth's 501(c)(3) Ceremony Fund."
        path="/donate/ceremony"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden px-4 pt-20">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${ceremonyImg})` }} />
        <div className="absolute inset-0 bg-foreground/70" />
        <motion.div className="relative z-10 max-w-3xl text-center" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Heart className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Gift the Journey to Someone Else
          </motion.h1>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75">
            Your generous contribution makes it possible for someone who may not have the financial means to experience the transformative power of sacred ceremony.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8">
            <a
              href={CEREMONY_PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 font-body text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80 hover:shadow-xl"
            >
              <HandHeart className="h-5 w-5" />
              Gift a Journey
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Impact Cards */}
      <section className="px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">
            How Your Gift Creates Healing
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground">
            Every dollar donated to the Ceremony Fund directly supports someone's path to transformation.
          </motion.p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { icon: Leaf, title: "Ceremony Access", desc: "Covers the full cost of a sacred ceremony experience for a community member in financial need." },
              { icon: Users, title: "Community Healing", desc: "Supports group ceremonies, creating shared healing spaces where transformation happens collectively." },
              { icon: Sparkles, title: "Aftercare & Integration", desc: "Funds follow-up support and integration resources so the healing journey continues beyond ceremony." },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="rounded-xl border border-border bg-card p-6 text-center">
                <item.icon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Main CTA */}
      <section className="bg-card px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">Sow Into Healing</p>
          <h2 className="mt-4 font-display text-2xl font-bold text-card-foreground md:text-4xl">
            Plant a Seed of Transformation
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-body text-sm leading-relaxed text-muted-foreground">
            Temple Mother Earth is a 501(c)(3) nonprofit organization. Your tax-deductible gift helps fund ceremony
            scholarships for those who cannot afford the journey on their own. You are planting seeds of transformation.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={CEREMONY_PAYPAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
              aria-label="Gift a Journey — donate to the Ceremony Fund via PayPal"
            >
              <HandHeart className="h-4 w-4" />
              Gift a Journey
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => setShowDisclosure(true)}
              className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground/60 transition hover:text-muted-foreground"
              aria-label="View donation transparency disclosure"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              How your donation is used
            </button>
          </div>
        </motion.div>
      </section>

      {/* Back Link */}
      <section className="px-4 py-10 text-center">
        <Link
          to="/ceremony-intake"
          className="inline-flex items-center gap-2 font-body text-sm text-primary transition hover:text-primary/80"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          Return to Sacred Intake Form
        </Link>
      </section>

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Disclosure Modal */}
      {showDisclosure && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm px-4"
          onClick={() => setShowDisclosure(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl p-8"
          >
            <button
              onClick={() => setShowDisclosure(false)}
              className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close disclosure"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>

            <h3 className="text-center font-display text-lg font-bold text-foreground">
              Transparency & Trust
            </h3>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground">Temple Mother Earth</strong> is a registered 501(c)(3) nonprofit organization (EIN available upon request).
                All donations are tax-deductible to the extent allowed by law.
              </p>
              <p>Ceremony Fund contributions directly support:</p>
              <ul className="ml-4 list-disc space-y-1.5">
                <li>Full ceremony scholarships for community members in need</li>
                <li>Facilitator preparation and sacred space setup</li>
                <li>Post-ceremony integration and aftercare resources</li>
                <li>Earth Medicine education and safety protocols</li>
              </ul>
              <p className="text-xs opacity-60">
                Detailed financial reports are available upon request by contacting our team.
              </p>
            </div>

            <button
              onClick={() => setShowDisclosure(false)}
              className="mt-6 w-full rounded-lg bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
            >
              Got it
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CeremonyDonate;
