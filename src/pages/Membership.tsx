import { motion, type Easing } from "framer-motion";
import { Check, ArrowRight, Flame, Heart, Leaf, Shield, Sparkles, Star, Users, Lock } from "lucide-react";
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

const tiers = [
  {
    name: "Community Rhythm",
    identity: "Belong",
    price: "$50",
    period: "/month",
    icon: Leaf,
    highlight: false,
    commitment: "",
    description: "Begin your pathway. Access the member portal, community announcements, monthly live teachings, and the ability to purchase experiences à la carte.",
    benefits: [
      "Member portal access",
      "Community announcements & event calendar",
      "Monthly live teaching",
      "Introductory resource library",
      "À la carte experience access",
    ],
    stripeKey: "community_rhythm" as const,
  },
  {
    name: "Environment Collective",
    identity: "Train",
    price: "$150",
    period: "/month",
    icon: Flame,
    highlight: true,
    commitment: "",
    description: "Regulate and train your nervous system. Weekly virtual Qi Gong, embodiment workshops, practice tracking, and nervous system check-ins.",
    benefits: [
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
    name: "Preparation Path",
    identity: "Prepare",
    price: "$275",
    period: "/month",
    icon: Shield,
    highlight: false,
    commitment: "3-month minimum",
    description: "Cross the threshold. After 3 consecutive months, become eligible for one full-day ceremony (capacity-based, intake required). This is structured preparation — not casual access.",
    benefits: [
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
    name: "Temple Immersion Path",
    identity: "Embody",
    price: "$500",
    period: "/month",
    icon: Star,
    highlight: false,
    commitment: "3-month minimum",
    description: "The inner temple. After 3 consecutive months, become eligible for one quarterly Thursday–Monday immersion. Limited seats. Full integration support and Inner Circle access.",
    benefits: [
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

const pathwaySteps = [
  { label: "Belong", tier: "Community Rhythm", icon: Leaf },
  { label: "Train", tier: "Environment Collective", icon: Flame },
  { label: "Prepare", tier: "Preparation Path", icon: Shield },
  { label: "Embody", tier: "Temple Immersion Path", icon: Star },
];

const values = [
  {
    icon: Shield,
    title: "Nervous System Sovereignty",
    desc: "Build the capacity to hold expanded states through structured regulation and embodiment practices — before intensity.",
  },
  {
    icon: Heart,
    title: "Integration Over Intensity",
    desc: "Every experience is held in a container. Preparation before, integration after. No casual access. No spiritual bypassing.",
  },
  {
    icon: Sparkles,
    title: "Threshold-Based Progression",
    desc: "Each tier is earned through commitment and time. You don't buy access — you build readiness.",
  },
  {
    icon: Users,
    title: "Depth Over Volume",
    desc: "We are not building a large audience. We are building a deep, intentional community of sovereign beings walking the path together.",
  },
];

const Membership = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ───── HERO ───── */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${communityImg})` }}
        />
        <div className="absolute inset-0 bg-foreground/75" />

        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary"
          >
            We Built Community. Now We Build Sovereignty.
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-6xl"
          >
            Your Pathway
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75"
          >
            Temple Mother Earth is evolving into a structured, threshold-based sanctuary.
            This is not monetization — this is an invitation to depth, regulation, and embodied transformation.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── PATHWAY MAP ───── */}
      <section className="px-4 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-center font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            The Pathway
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Each step is intentional. You don't skip ahead — you build the capacity to hold what's next.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-14 flex flex-col items-center gap-0 sm:flex-row sm:justify-center sm:gap-0">
            {pathwaySteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center text-center w-32">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/30">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-3 font-display text-sm font-bold text-foreground">{step.label}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground">{step.tier}</p>
                </div>
                {i < pathwaySteps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-primary/40 mx-2 hidden sm:block" />
                )}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ───── VALUE PROPOSITIONS ───── */}
      <section className="bg-card px-4 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-center font-display text-3xl font-bold text-card-foreground md:text-4xl"
          >
            Why This Model?
          </motion.h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-card-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── PRICING TIERS ───── */}
      <section className="px-4 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary"
          >
            Choose Your Threshold
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-center font-display text-3xl font-bold text-foreground md:text-5xl"
          >
            Membership Tiers
          </motion.h2>

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                className={`relative flex flex-col rounded-2xl border p-8 transition-shadow hover:shadow-xl ${
                  tier.highlight
                    ? "border-primary bg-background shadow-lg ring-2 ring-primary/20"
                    : "border-border bg-background"
                }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 font-body text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      tier.highlight ? "bg-primary/15" : "bg-primary/10"
                    }`}
                  >
                    <tier.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">{tier.identity}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <span className="font-display text-4xl font-bold text-foreground">{tier.price}</span>
                  <span className="text-sm text-muted-foreground">{tier.period}</span>
                </div>

                {tier.commitment && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold text-primary">{tier.commitment}</span>
                  </div>
                )}

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/portal?tier=${encodeURIComponent(tier.stripeKey)}`}
                  className={`mt-8 block rounded-xl py-3.5 text-center font-body text-sm font-semibold transition ${
                    tier.highlight
                      ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/80"
                      : "border border-border text-foreground hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  Begin — {tier.price}/mo
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-10 text-center text-sm text-muted-foreground"
          >
            All memberships support Temple Mother Earth's 501(c)(3) nonprofit mission. Tiers 3 & 4 require a 3-month minimum commitment.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="bg-card px-4 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-center font-display text-3xl font-bold text-card-foreground md:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="mt-12 space-y-6">
            {[
              {
                q: "Why the shift from free access?",
                a: "For five years we built community. Now we're building sovereignty. Structured containers, intentional progression, and depth-over-volume — this evolution ensures that every individual who walks this path is truly supported.",
              },
              {
                q: "Can I access ceremonies without a membership?",
                a: "No. All Earth Medicine ceremonies require active membership at the Preparation Path tier or above, plus completion of the Sacred Intake form. This ensures every participant is properly prepared and held in a safe container.",
              },
              {
                q: "What is the 3-month minimum commitment?",
                a: "Tiers 3 and 4 require three consecutive months of membership before ceremony or immersion eligibility. This is intentional — preparation is not optional, it's the foundation of safe and transformative work.",
              },
              {
                q: "Can I switch tiers?",
                a: "You can upgrade at any time. If you upgrade to Tier 3 or 4, the 3-month preparation clock begins at that point. Downgrades take effect at the start of your next billing cycle.",
              },
              {
                q: "Are membership payments tax-deductible?",
                a: "Temple Mother Earth is a 501(c)(3) nonprofit. Portions of your membership that exceed the fair market value of benefits received may be tax-deductible. Consult your tax advisor.",
              },
              {
                q: "What is the Integration & Wellness platform?",
                a: "All members gain access to our Integration & Wellness platform with AI guidance, daily rituals, personalized plans, and structured integration containers.",
              },
            ].map((item) => (
              <motion.div
                key={item.q}
                variants={fadeUp}
                className="rounded-xl border border-border bg-background p-6"
              >
                <h3 className="font-display text-base font-semibold text-card-foreground">{item.q}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── BOTTOM CTA ───── */}
      <section className="relative overflow-hidden px-4 py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${ctaFooterImg})` }}
        />
        <div className="absolute inset-0 bg-foreground/80" />

        <motion.div
          className="relative z-10 mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-3xl font-bold text-primary-foreground md:text-5xl"
          >
            Ready to Cross the Threshold?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-primary-foreground/75"
          >
            This is not about access. This is about readiness.
            Begin your pathway and build the capacity to hold what's next.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
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
              Have Questions? Contact Us
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
