import { useState } from "react";
import { motion, type Easing } from "framer-motion";
import { Check, ArrowDown, Flame, Heart, Leaf, Shield, Sparkles, Star, Users, Lock, Loader2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import SEOHead from "@/components/SEOHead";
import PageBreadcrumb from "@/components/PageBreadcrumb";
import { toast } from "@/hooks/use-toast";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonationCTA from "@/components/DonationCTA";
import Navigation from "@/components/Navigation";
import InternalLinkingFooter from "@/components/InternalLinkingFooter";
import MidImageBanner from "@/components/story/MidImageBanner";
import midMembershipImg from "@/assets/image-mid-membership.jpg";
import logo from "@/assets/logo.png";
import communityImg from "@/assets/community.jpg";
import ctaFooterImg from "@/assets/cta-footer.jpg";
import membershipVideo from "@/assets/video-membership-hero.mp4";
import walkingVideoAsset from "@/assets/video-membership-walking.mp4.asset.json";

const walkingVideo = walkingVideoAsset.url;

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
    identity: "Welcome",
    name: "Welcome Circle",
    price: "Free",
    period: "",
    icon: Heart,
    commitment: "30-day introduction",
    philosophy: "This is where it all begins. Experience the warmth of our community, get to know our philosophy, and feel if this space resonates with your spirit. No commitment · just an open door.",
    includes: [
      "Limited integration portal access for 30 days",
      "Community announcements & event calendar",
      "Introductory resource library",
      "Access to one live community gathering",
      "Temple Transmissions email series",
    ],
    stripeKey: null,
    isFree: true,
  },
  {
    identity: "Belong",
    name: "Community Rhythm",
    price: "$50",
    period: "/month",
    icon: Leaf,
    commitment: "",
    philosophy: "You've felt the resonance. Now stay connected. This is your ongoing home within the Temple · where you deepen your understanding, stay informed, and grow at your own pace.",
    includes: [
      "Full member portal access",
      "Community announcements & event calendar",
      "Monthly live teaching",
      "Introductory resource library",
      "Ability to attend individual experiences",
    ],
    stripeKey: "community_rhythm" as const,
    isFree: false,
  },
  {
    identity: "Train",
    name: "Environment Collective",
    price: "$150",
    period: "/month",
    icon: Flame,
    commitment: "",
    philosophy: "For those ready to build a daily practice. This container supports your nervous system, strengthens your body-mind connection, and helps you cultivate the inner resilience that lasting transformation requires.",
    includes: [
      "Everything in Community Rhythm",
      "Live virtual Qi Gong (Monday·Friday)",
      "Replay library access",
      "Monthly embodiment workshop",
      "Practice tracker & streak counter",
      "Nervous system check-ins & journal prompts",
    ],
    stripeKey: "environment_collective" as const,
    isFree: false,
  },
  {
    identity: "Prepare",
    name: "Preparation Path",
    price: "$275",
    period: "/month",
    icon: Shield,
    commitment: "3-month journey",
    philosophy: "A guided container of preparation for those who feel called to deeper ceremonial work. After three months of practice, you become eligible for a full-day ceremony · when you feel ready and your facilitators agree.",
    includes: [
      "Everything in Environment Collective",
      "Guided 3-month preparation container",
      "Readiness conversation with facilitator",
      "Monthly integration call",
      "Priority ceremony registration",
      "30-day post-experience integration support",
    ],
    stripeKey: "preparation_path" as const,
    isFree: false,
  },
  {
    identity: "Embody",
    name: "Temple Immersion Path",
    price: "$500",
    period: "/month",
    icon: Star,
    commitment: "3-month journey",
    philosophy: "For those walking the path of deep integration and service. After three months of practice and preparation, you become eligible for quarterly immersions. This is where transformation becomes a way of life.",
    includes: [
      "Everything in Preparation Path",
      "Quarterly immersion eligibility",
      "Pre-immersion readiness conversation",
      "Post-immersion 30-day integration",
      "Quarterly 1:1 call with facilitator",
      "Early access to all experiences",
      "Inner Circle community access",
    ],
    stripeKey: "temple_immersion" as const,
    isFree: false,
  },
];

const Membership = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = async (stripeKey: keyof typeof MEMBERSHIP_TIERS) => {
    if (!user) {
      window.location.href = "/member/auth?redirect=/membership";
      return;
    }
    setLoadingTier(stripeKey);
    try {
      const priceId = MEMBERSHIP_TIERS[stripeKey].price_id;
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { priceId },
      });
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, "_blank");
      }
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Could not start checkout", variant: "destructive" });
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-earth">
      <SEOHead title="Membership | Join Temple Mother Earth Community" description="Become a member of Temple Mother Earth. Access ceremonies, integration circles, retreats, and a sovereign community of souls and practitioners." path="/membership" />
      <Navigation />
      <PageBreadcrumb items={[{ label: "Membership" }]} />

      {/* ───── HERO ───── */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center">
        <video
          src={membershipVideo}
          poster={communityImg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero-overlay" />

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
            A Sacred Invitation
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-4xl font-semibold text-primary-foreground md:text-6xl leading-tight"
          >
            You Belong Here.
            <br />
            Come As You Are.
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/70"
          >
            Temple Mother Earth was born from a simple truth: transformation happens in community.
            Whether you're taking your first step or deepening a lifelong practice, 
            there is a home for you here.
          </motion.p>
        </motion.div>
      </section>

      {/* ───── PHILOSOPHY ───── */}
      <section className="px-4 py-24 md:py-32 bg-gradient-sanctuary">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            className="font-display text-2xl font-semibold text-foreground md:text-3xl"
          >
            Why We Hold Space This Way
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-10 space-y-8 text-base leading-relaxed text-muted-foreground">
            <p>
              Real transformation isn't something you can rush. It asks for presence, practice, and 
              a safe container to hold what arises. That's why we've created a pathway · not to limit access, 
              but to honor the depth of this sacred work and ensure everyone who walks it is truly supported.
            </p>
            <p>
              Every stage of this journey is designed with love, intention, and deep care for your 
              nervous system, your spirit, and your unique path of transformation.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-14 grid gap-6 sm:grid-cols-2">
            {[
              { icon: Shield, title: "Safety & Nervous System Care", desc: "Your body knows what it needs. We create spaces where your nervous system can feel safe enough to release, restore, and integrate at your own pace." },
              { icon: Heart, title: "Integration & Wholeness", desc: "Every experience is held in a container of care · preparation before, integration after · so insights become lasting transformation, not fleeting moments." },
              { icon: Sparkles, title: "Intentional & Sacred", desc: "Each step on this path is a conscious choice. We honor that by ensuring you feel informed, supported, and never rushed." },
              { icon: Users, title: "Community & Connection", desc: "Transformation doesn't happen in isolation. You are surrounded by kindred spirits who see you, hold space for you, and walk alongside you." },
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

      {/* ───── AVATAR MIRROR · Where Are You on the Path? ───── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-card to-background px-4 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-body text-[10px] uppercase tracking-[0.4em] text-primary mb-6">A Mirror, Not a Menu</p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-foreground leading-tight mb-8">
            Where Are You<br /><em className="font-serif italic text-primary">on the Path?</em>
          </h2>
          <div className="space-y-5 text-left md:text-center mb-4">
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed">
              Maybe you're the one who has been quietly searching, reading, listening, and waiting for a space that finally feels like home.
            </p>
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed">
              Maybe you're the one who has already done deep work and is ready for a circle that can hold the weight of who you're becoming.
            </p>
            <p className="font-serif text-lg md:text-xl text-foreground/85 leading-relaxed">
              Maybe you're the one being called to train, to serve, to embody what you've learned in the world.
            </p>
            <p className="font-serif text-lg md:text-xl text-primary leading-relaxed font-semibold pt-2">
              Wherever you are, there is a seat for you. Read the descriptions below and trust the one that says <em className="not-italic">"this is me."</em>
            </p>
          </div>
        </div>
      </section>

      {/* ───── THE PATHWAY (Sequential, not grid) ───── */}
      <section className="bg-gradient-warm px-4 py-24 md:py-32">
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
            Your Journey
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-center font-display text-3xl font-semibold text-card-foreground md:text-4xl"
          >
            Welcome → Belong → Train → Prepare → Embody
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-lg text-center text-muted-foreground"
          >
            There's no rush, no pressure, and no wrong place to start. 
            Each stage unfolds naturally as you grow. Move at your own pace · 
            we're here every step of the way.
          </motion.p>

          {/* ── Walking video · Your Journey Starts with a Single Step ── */}
          <motion.div
            variants={fadeUp}
            className="relative mt-12 overflow-hidden rounded-2xl border border-primary/20 shadow-2xl aspect-[16/9]"
          >
            <video
              src={walkingVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/40 to-foreground/30" />
            <div className="absolute inset-0 flex items-end justify-center p-6 md:p-10">
              <div className="text-center max-w-xl">
                <p className="font-body text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">
                  One Step at a Time
                </p>
                <h3 className="font-display text-2xl md:text-4xl font-semibold text-primary-foreground leading-tight">
                  Your Journey Starts with a Single Step
                </h3>
                <p className="mt-3 text-sm md:text-base text-primary-foreground/85 italic">
                  Every great journey begins right here. Walk with us.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sequential Tier Stages */}
          <div className="mt-16">
            {tiers.map((tier, i) => (
              <div key={tier.name} id={tier.name.toLowerCase().replace(/\s+/g, '-')}>
                {i > 0 && <ThresholdDivider label="Next Threshold" />}
                <motion.div
                  variants={fadeUp}
                  className="rounded-2xl border border-border bg-gradient-card-glow p-8 md:p-10"
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

                  {/* Commitment */}
                  <div className="mt-6 flex flex-wrap items-baseline gap-3">
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
                  {tier.isFree ? (
                    <Link
                      to="/member/auth"
                      className="mt-8 w-full rounded-xl border border-primary/30 bg-primary/5 py-3.5 text-center font-body text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary/10 flex items-center justify-center gap-2"
                    >
                      Join for Free
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleCheckout(tier.stripeKey!)}
                      disabled={loadingTier === tier.stripeKey}
                      className="mt-8 w-full rounded-xl border border-primary/30 bg-primary/5 py-3.5 text-center font-body text-sm font-semibold text-foreground transition hover:border-primary hover:bg-primary/10 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loadingTier === tier.stripeKey ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                      ) : (
                        <>Begin {tier.name}</>
                      )}
                    </button>
                  )}
                </motion.div>
              </div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-12 text-center text-sm text-muted-foreground"
          >
            Your membership supports Temple Mother Earth's 508(c)(1)(A) sacred mission · keeping sacred space alive for all.
          </motion.p>
        </motion.div>
      </section>

      <DonationCTA
        eyebrow="Beyond Membership"
        headline="Plant a Seed of Abundance"
        body="Not ready for membership? A one-time gift still makes a powerful difference · funding scholarships, community days, and sacred gatherings."
        buttonLabel="Plant a Seed"
      />

      <MidImageBanner
        image={midMembershipImg}
        eyebrow="Belonging"
        headline={<>Belonging Is Built <em className="font-serif italic text-primary">One Circle at a Time</em></>}
        body="This is not a subscription. It is a vow to show up for yourself and for the people who are becoming your people."
        ctaLabel="Sit With Us"
        ctaHref="/membership#tiers"
      />

      <EventbriteCTA />

      <InternalLinkingFooter
        links={[
          { label: "Sacred Intake", href: "/ceremony-intake" },
          { label: "Preparation Guide", href: "/preparation" },
          { label: "Sacred Series", href: "/sacred-series" },
          { label: "Community Care", href: "/community-care" },
          { label: "About Us", href: "/about" },
        ]}
      />

      <footer className="bg-foreground px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="Temple Mother Earth" className="h-10 w-10 rounded-full object-cover" />
                <span className="font-display text-lg font-bold text-primary-foreground">Temple Mother Earth</span>
              </Link>
              <p className="mt-4 text-sm text-primary-foreground/50 leading-relaxed">
                A 508(c)(1)(A) sacred ceremony church for Earth Medicine, sovereignty, and sacred community. Est. 2020 · Washington, DC.
              </p>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Experiences</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <a href="https://www.eventbrite.com/o/29347213477#events" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Earth Medicine Ceremonies</a>
                <Link to="/retreats-inquiry" className="text-primary-foreground/60 hover:text-primary transition-colors">International Immersions</Link>
                <Link to="/traveling-ceremonies" className="text-primary-foreground/60 hover:text-primary transition-colors">Traveling Ceremonies</Link>
                <Link to="/private-ceremonies" className="text-primary-foreground/60 hover:text-primary transition-colors">Private Sessions</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Get Involved</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <Link to="/volunteer" className="text-primary-foreground/60 hover:text-primary transition-colors">Volunteer</Link>
                <Link to="/sponsor" className="text-primary-foreground/60 hover:text-primary transition-colors">Become a Sponsor</Link>
                <Link to="/preparation" className="text-primary-foreground/60 hover:text-primary transition-colors">Ceremony Preparation</Link>
                <Link to="/conduct" className="text-primary-foreground/60 hover:text-primary transition-colors">Code of Conduct</Link>
              </div>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Connect</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                
                <Link to="/about" className="text-primary-foreground/60 hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="text-primary-foreground/60 hover:text-primary transition-colors">Contact Us</Link>
                <Link to="/portal" className="text-primary-foreground/60 hover:text-primary transition-colors">Member Portal</Link>
                <a href="https://www.instagram.com/templemotherearth/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-primary-foreground/10 pt-8">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <p className="font-body text-xs text-primary-foreground/40">
                © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
              </p>
              <p className="font-body text-xs text-primary-foreground/40 text-center md:text-right max-w-lg">
                Temple Mother Earth operates as a religious organization under the protections of the Religious Freedom Restoration Act (RFRA) and the First Amendment of the United States Constitution.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Membership;
