import { motion, type Easing } from "framer-motion";
import { Check, ArrowDown, Flame, Heart, Leaf, Shield, Sparkles, Star, Users, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import logo from "@/assets/logo.png";
import communityImg from "@/assets/community.jpg";
import ctaFooterImg from "@/assets/cta-footer.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

/* ── Stripe product/price mapping ── */
export const MEMBERSHIP_TIERS = {
  community_rhythm: {
    product_id: "prod_Ty12PHchgvx4em",
    price_id: "price_1T050aIsbHRagMNSiz4udrdB",
  },
  environment_collective: {
    product_id: "prod_Ty1231nKNV8HSC",
    price_id: "price_1T050cIsbHRagMNSBTyAojHz",
  },
  preparation_path: {
    product_id: "prod_Ty12EIXGqFK50S",
    price_id: "price_1T050eIsbHRagMNSnIWAtIby",
  },
  temple_immersion: {
    product_id: "prod_Ty12l2Ecs9syyV",
    price_id: "price_1T050gIsbHRagMNSb6oS6Xzl",
  },
} as const;

/* ── Threshold Divider ── */
const ThresholdDivider = ({ label }: { label?: string }) => (
  <div className="flex items-center justify-center py-10">
    <div className="flex flex-col items-center gap-2">
      <div className="h-12 w-px bg-gradient-to-b from-transparent via-primary/30 to-primary/20" />
      {label && (
        <span className="font-body text-[10px] font-semibold uppercase tracking-[0.3em] text-primary/60">
          {label}
        </span>
      )}
      <ArrowDown className="h-4 w-4 text-primary/30" />
      <div className="h-12 w-px bg-gradient-to-b from-primary/20 via-primary/30 to-transparent" />
    </div>
  </div>
);

const tiers = [
  {
    identity: "Belong",
    name: "Community Rhythm",
    price: "$50",
    period: "/month",
    icon: Leaf,
    commitment: "",
    philosophy: "Safety and community. This is where you feel the tone, understand the philosophy, and discern your alignment with the Temple.",
    includes: [
      "Member portal access",
      "Community announcements & event calendar",
      "Monthly live teaching",
      "Introductory resource library",
      "Ability to purchase experiences à la carte",
    ],
    stripeKey: "community_rhythm" as const,
  },
  {
    identity: "Train",
    name: "Environment Collective",
    price: "$150",
    period: "/month",
    icon: Flame,
    commitment: "",
    philosophy: "Embodiment and nervous system strengthening. Without regulation, intensity becomes addiction. This tier builds the capacity required for deeper work.",
    includes: [
      "Everything in Community Rhythm",
      "Weekly live virtual Qi Gong",
      "Replay library access",
      "Monthly embodiment workshop",
      "Practice tracker & streak counter",
      "Nervous system check-ins & journal prompts",
    ],
    stripeKey: "environment_collective" as const,
  },
  {
    identity: "Prepare",
    name: "Preparation Path",
    price: "$275",
    period: "/month",
    icon: Shield,
    commitment: "3-month minimum commitment",
    philosophy: "Psychological readiness and responsibility. After three consecutive months, you become eligible for one full-day ceremony — capacity-based, intake required. This is structured preparation, not casual access.",
    includes: [
      "Everything in Environment Collective",
      "Structured 3-month preparation container",
      "Readiness assessment",
      "Monthly integration call",
      "Priority ceremony registration",
      "30-day post-experience integration container",
    ],
    stripeKey: "preparation_path" as const,
  },
  {
    identity: "Embody",
    name: "Temple Immersion Path",
    price: "$500",
    period: "/month",
    icon: Star,
    commitment: "3-month minimum commitment",
    philosophy: "Leadership and integration into life. After three consecutive months, you become eligible for one quarterly immersion. Limited seats. Full integration support and Inner Circle access.",
    includes: [
      "Everything in Preparation Path",
      "Quarterly immersion eligibility",
      "Pre-immersion readiness review",
      "Post-immersion 30-day integration",
      "Quarterly 1:1 call",
      "Early access to all experiences",
      "Inner Circle access",
    ],
    stripeKey: "temple_immersion" as const,
  },
];

const Membership = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ───── HERO ───── */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${communityImg})` }}
        />
        <div className="absolute inset-0 bg-foreground/80" />

        <motion.div
          className="relative z-10 max-w-2xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary/80"
          >
            A New Season
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-bold text-primary-foreground md:text-6xl leading-tight"
          >
            We Built Community.
            <br />
            Now We Build Sovereignty.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/70"
          >
            For five years, the Temple held space generously. That season cultivated community, 
            tested what works, and taught us what lasts. Growth requires structure. 
            This is not monetization — this is maturation.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── PHILOSOPHY ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-2xl font-bold text-foreground md:text-3xl"
          >
            Why Readiness, Not Access
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-10 space-y-8 text-base leading-relaxed text-muted-foreground">
            <p>
              Intensity without integration does not create lasting change. Community without container leads to diffusion. 
              Altered states without regulation create dependency.
            </p>
            <p>
              The Temple is evolving from open circle to structured sanctuary — 
              from access-first to readiness-first, from event-centered to integration-centered.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              { icon: Shield, title: "Nervous System Sovereignty", desc: "Without regulation, intensity becomes addiction. Without containment, insight becomes confusion." },
              { icon: Heart, title: "Integration Over Intensity", desc: "Without integration, peak experiences fade. Every experience is held in a container — preparation before, integration after." },
              { icon: Sparkles, title: "Threshold Over Transaction", desc: "When someone crosses a threshold, they choose consciously, commit, and take responsibility." },
              { icon: Users, title: "Depth Over Volume", desc: "We are not building a large audience. We are cultivating a deep, intentional community of sovereign beings." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6 text-left">
                <v.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-3 font-display text-sm font-bold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ───── THE PATHWAY (Sequential, not grid) ───── */}
      <section className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-center font-body text-xs font-semibold uppercase tracking-[0.3em] text-primary/80"
          >
            The Pathway
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-center font-display text-3xl font-bold text-card-foreground md:text-4xl"
          >
            Belong → Train → Prepare → Embody
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-lg text-center text-muted-foreground"
          >
            Each stage is intentional. This is not hierarchical — it is sequential. 
            You don't skip ahead. You build the capacity to hold what's next.
          </motion.p>

          {/* Sequential Tier Stages */}
          <div className="mt-16">
            {tiers.map((tier, i) => (
              <div key={tier.name}>
                {i > 0 && <ThresholdDivider label="Next Threshold" />}
                <motion.div
                  variants={fadeUp}
                  className="rounded-2xl border border-border bg-background p-8 md:p-10"
                >
                  {/* Identity + Name */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                      <tier.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-primary">
                        {tier.identity}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold text-foreground md:text-2xl">
                        {tier.name}
                      </h3>
                    </div>
                  </div>

                  {/* Price + Commitment */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-3">
                    <span className="font-display text-3xl font-bold text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                    {tier.commitment && (
                      <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        <Lock className="h-3 w-3" />
                        {tier.commitment}
                      </span>
                    )}
                  </div>

                  {/* Philosophy */}
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground italic">
                    {tier.philosophy}
                  </p>

                  {/* What's Included */}
                  <ul className="mt-6 space-y-2.5">
                    {tier.includes.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    to={`/portal?tier=${encodeURIComponent(tier.stripeKey)}`}
                    className="mt-8 block rounded-xl border border-primary/30 bg-primary/5 py-3.5 text-center font-body text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary/10"
                  >
                    Begin — {tier.price}/mo
                  </Link>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-12 text-center text-sm text-muted-foreground"
          >
            All memberships support Temple Mother Earth's 501(c)(3) nonprofit mission.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-center font-display text-2xl font-bold text-foreground md:text-3xl"
          >
            Questions
          </motion.h2>

          <div className="mt-12 space-y-6">
            {[
              {
                q: "Why the shift from free access?",
                a: "For five years we built community generously. That season taught us that intensity without integration does not create lasting change. Structure creates sovereignty. This evolution ensures every individual who walks this path is truly supported.",
              },
              {
                q: "Can I access ceremonies without preparation?",
                a: "No. All Earth Medicine ceremonies require active membership at the Preparation Path tier or above, plus completion of the Sacred Intake form. Readiness is not optional — it is the foundation of safe and transformative work.",
              },
              {
                q: "What is the 3-month commitment?",
                a: "Tiers 3 and 4 require three consecutive months before ceremony or immersion eligibility. This threshold is intentional — crossing it means you chose consciously, committed, and took responsibility.",
              },
              {
                q: "Can I move between tiers?",
                a: "You can step forward at any time. If you step into Preparation Path or Temple Immersion Path, the 3-month preparation clock begins at that point. Stepping back takes effect at the start of your next billing cycle.",
              },
              {
                q: "Are payments tax-deductible?",
                a: "Temple Mother Earth is a 501(c)(3) nonprofit. Portions of your membership that exceed the fair market value of benefits received may be tax-deductible. Consult your tax advisor.",
              },
              {
                q: "What about altered states?",
                a: "Altered states are not removed. They are repositioned — not as the center, but as tools accessed through readiness, preparation, and integration. They are not marketed as escape. They are held as rites.",
              },
            ].map((item) => (
              <motion.div
                key={item.q}
                variants={fadeUp}
                className="rounded-xl border border-border bg-card p-6"
              >
                <h3 className="font-display text-base font-semibold text-foreground">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── BOTTOM CTA ───── */}
      <section className="relative overflow-hidden px-4 py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${ctaFooterImg})` }}
        />
        <div className="absolute inset-0 bg-foreground/85" />

        <motion.div
          className="relative z-10 mx-auto max-w-xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold text-primary-foreground md:text-4xl leading-tight"
          >
            Ready to Cross the Threshold?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-base text-primary-foreground/70 leading-relaxed"
          >
            This is not about access. This is about readiness.
            <br />
            Begin your pathway. Build the capacity to hold what's next.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              Choose Your Pathway
            </a>
            <a
              href="/#contact"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              Questions? Reach Out
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-foreground px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Temple Mother Earth" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-display text-lg font-bold text-primary-foreground">Temple Mother Earth</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 font-body text-sm text-primary-foreground/60">
              <a href="/" className="hover:text-primary transition-colors">Home</a>
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="/membership" className="hover:text-primary transition-colors">Membership</a>
              <a href="/#offerings" className="hover:text-primary transition-colors">Experiences</a>
              <a href="/#contact" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
          <div className="mt-8 border-t border-primary-foreground/10 pt-8 text-center">
            <p className="font-body text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Membership;
