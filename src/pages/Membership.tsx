import { motion, type Easing } from "framer-motion";
import { Check, Crown, Flame, Heart, Leaf, Shield, Sparkles, Star, Users } from "lucide-react";
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

const tiers = [
  {
    name: "Seeker",
    price: "Free",
    period: "",
    icon: Leaf,
    highlight: false,
    description: "Begin your journey with our community. Access foundational resources and connect with fellow seekers.",
    benefits: [
      "Access to community newsletter",
      "Introductory Earth Medicine resources",
      "Community forum access",
      "Event announcements & early notifications",
      "Digital welcome guide",
    ],
  },
  {
    name: "Devotee",
    price: "$49",
    period: "/month",
    icon: Flame,
    highlight: false,
    description: "Deepen your practice with regular ceremony access, integration support, and exclusive community gatherings.",
    benefits: [
      "Everything in Seeker",
      "Priority ceremony registration",
      "Monthly integration circle (virtual)",
      "Access to Integration & Wellness platform",
      "Members-only content library",
      "Access to members-only store",
    ],
  },
  {
    name: "Guardian",
    price: "$197",
    period: "/month",
    icon: Crown,
    highlight: true,
    description: "Walk deeper into the sacred path. Your monthly commitment secures one Earth Medicine ceremony each quarter — your seat at the altar is reserved.",
    benefits: [
      "Everything in Devotee",
      "1 Earth Medicine ceremony per quarter included",
      "Quarterly 1-on-1 spiritual consultation",
      "Private community circle access",
      "Exclusive merchandise & sacred tools",
      "Priority access to traveling ceremonies",
    ],
  },
  {
    name: "Elder",
    price: "$333",
    period: "/month",
    icon: Star,
    highlight: false,
    description: "The highest level of sacred commitment. Your monthly contribution secures one local immersion weekend each quarter, plus elder stewardship within the community.",
    benefits: [
      "Everything in Guardian",
      "1 local immersion weekend per quarter included",
      "Sacred elder recognition & advisory role",
      "Exclusive elder gatherings & dinners",
      "Full access to members-only store",
      "Priority booking for all events",
    ],
  },
];

const values = [
  {
    icon: Shield,
    title: "Sacred Protection",
    desc: "Your membership supports our 501(c)(3) mission and ensures Earth Medicine traditions are preserved with integrity and respect.",
  },
  {
    icon: Heart,
    title: "Healing Community",
    desc: "Join a circle of sovereign beings walking the path together — sharing wisdom, supporting growth, and holding space for transformation.",
  },
  {
    icon: Sparkles,
    title: "Integration Support",
    desc: "Access our Integration & Wellness platform with AI guidance, daily rituals, personalized plans, and a companion for expanded consciousness.",
  },
  {
    icon: Users,
    title: "Lifelong Connection",
    desc: "Build deep, lasting bonds with fellow seekers through ceremonies, retreats, community circles, and shared sacred experiences.",
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
            Join the Sacred Circle
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-bold text-primary-foreground md:text-6xl"
          >
            Membership
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/75"
          >
            Walk the sacred path alongside a community of seekers devoted to healing, growth, 
            and spiritual awakening. Choose the level that resonates with your journey.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── VALUE PROPOSITIONS ───── */}
      <section className="px-4 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-center font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Why Become a Member?
          </motion.h2>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ───── PRICING TIERS ───── */}
      <section className="bg-card px-4 py-20 md:py-28">
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
            Choose Your Path
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-center font-display text-3xl font-bold text-card-foreground md:text-5xl"
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
                  <h3 className="font-display text-xl font-bold text-foreground">{tier.name}</h3>
                </div>

                <div className="mt-5">
                  <span className="font-display text-4xl font-bold text-foreground">{tier.price}</span>
                  {tier.period && (
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  )}
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://integration.templemotherearth.org/auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-8 block rounded-xl py-3.5 text-center font-body text-sm font-semibold transition ${
                    tier.highlight
                      ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/80"
                      : "border border-border text-foreground hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {tier.price === "Free" ? "Join for Free" : `Get Started — ${tier.price}/mo`}
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-10 text-center text-sm text-muted-foreground"
          >
            All memberships support Temple Mother Earth's 501(c)(3) nonprofit mission. Cancel anytime.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── FAQ ───── */}
      <section className="px-4 py-20 md:py-28">
        <motion.div
          className="mx-auto max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="text-center font-display text-3xl font-bold text-foreground md:text-4xl"
          >
            Frequently Asked Questions
          </motion.h2>

          <div className="mt-12 space-y-6">
            {[
              {
                q: "Can I switch tiers at any time?",
                a: "Yes. You can upgrade or downgrade your membership at any time. Changes take effect at the start of your next billing cycle.",
              },
              {
                q: "Is the free membership really free?",
                a: "Absolutely. The Seeker tier gives you access to community resources, our newsletter, and event announcements at no cost.",
              },
              {
                q: "Are membership payments tax-deductible?",
                a: "Temple Mother Earth is a 501(c)(3) nonprofit organization. Portions of your membership that exceed the fair market value of benefits received may be tax-deductible. Consult your tax advisor.",
              },
              {
                q: "What Earth Medicine ceremonies are included?",
                a: "Ceremonies include Kambo, Hapé, and other sacred Earth Medicine traditions. Specific offerings vary by tier and availability. All participants must complete a medical intake form before attending.",
              },
              {
                q: "How do I access the Integration & Wellness platform?",
                a: "Devotee, Guardian, and Elder members receive login credentials to our Integration & Wellness platform at integration.templemotherearth.org upon sign-up.",
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
            Ready to Walk the Sacred Path?
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-lg text-primary-foreground/75"
          >
            Join Temple Mother Earth today and become part of a community devoted to healing, 
            sovereignty, and spiritual awakening.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://integration.templemotherearth.org/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              Become a Member
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
              <a href="/#events" className="hover:text-primary transition-colors">Events</a>
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
