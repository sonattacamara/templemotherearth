import { useState } from "react";
import { motion, type Easing, AnimatePresence } from "framer-motion";
import { Flame, Globe, Users, Heart, Leaf, Sun, ArrowRight, X, Sparkles, HandHeart, ShieldCheck, MapPin, Star, Eye, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg-new.jpg";
import ctaFooterImg from "@/assets/cta-footer.jpg";
import sacredSpace from "@/assets/sacred-space.jpg";
import communityImg from "@/assets/community.jpg";
import offeringCeremony from "@/assets/offering-ceremony.jpg";
import offeringRetreat from "@/assets/offering-retreat.jpg";
import offeringTraveling from "@/assets/offering-traveling.jpg";
import offeringPrivate from "@/assets/offering-private.jpg";

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const PAYPAL_DONATE_URL = "https://www.paypal.com/donate?token=NXLlyiujSJagIrl9uk8qrPC1eutuXlYi84XbzMEIMVb1EasE5b-TxfSz6XcEwmtr_Bk0lXZ-X6ph23t-qhv_9x_2VK8&useraction=commit%2Fdonate%2F&sdkMeta=eyJ1cmwiOiJodHRwczovL3d3dy5wYXlwYWxvYmplY3RzLmNvbS9kb25hdGUvc2RrL2RvbmF0ZS1zZGsuanMiLCJhdHRycyI6eyJkYXRhLXVpZCI6InVpZF9wb2t1aW9tbmJnc293cGhpc2F1Z2VianVpb21iamsifX0&targetMeta=eyJ6b2lkVmVyc2lvbiI6IjlfMF81OCIsInRhcmdldCI6IkRPTkFURSIsInNka1ZlcnNpb24iOiIwLjkuMCJ9";

const offerings = [
  {
    icon: Flame,
    title: "Earth Medicine Ceremonies",
    desc: "Step into ancient rituals that awaken your soul and align with the sacred rhythms of nature.",
    img: offeringCeremony,
    link: "https://www.eventbrite.com/o/29347213477#events",
    isExternal: true,
    cta: "Enter the Ceremony",
  },
  {
    icon: Globe,
    title: "International Immersions",
    desc: "Travel to sacred spaces around the world where Mother Earth's wisdom will nurture your spirit and ignite your transformation.",
    img: offeringRetreat,
    link: "/retreats-inquiry",
    isExternal: false,
    cta: "Explore Immersions",
  },
  {
    icon: Users,
    title: "Traveling Ceremonies",
    desc: "Invite the sacred to your community with ceremonies tailored to your unique path.",
    img: offeringTraveling,
    link: "/traveling-ceremonies",
    isExternal: false,
    cta: "Bring Us to You",
  },
  {
    icon: Heart,
    title: "1-on-1 / Private Ceremonies",
    desc: "Experience deeply personal sacred sessions designed around your unique intentions, needs, and path of transformation.",
    img: offeringPrivate,
    link: "/private-ceremonies",
    isExternal: false,
    cta: "Book a Private Session",
  },
];

/* ── Journey Stage Marker ── */
const JourneyStage = ({ number, label }: { number: string; label: string }) => (
  <motion.div
    variants={fadeIn}
    className="flex flex-col items-center gap-2 mb-6"
  >
    <div className="flex items-center gap-3">
      <div className="h-px w-8 bg-primary/30 hidden sm:block" />
      <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-primary">
        {number}
      </span>
      <div className="h-px w-8 bg-primary/30 hidden sm:block" />
    </div>
    <span className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
      {label}
    </span>
  </motion.div>
);

/* ── Vertical Journey Connector ── */
const JourneyConnector = () => (
  <div className="flex justify-center py-4">
    <div className="flex flex-col items-center gap-1">
      <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/40 to-primary/20" />
      <Compass className="h-4 w-4 text-primary/40 animate-pulse" />
      <div className="h-8 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-transparent" />
    </div>
  </div>
);

const Index = () => {
  const [showDonation, setShowDonation] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* ───── DONATION POPUP ───── */}
      <AnimatePresence>
        {showDonation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm px-4"
            onClick={() => setShowDonation(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl p-8 text-center"
            >
              <button
                onClick={() => setShowDonation(false)}
                className="absolute right-3 top-3 rounded-full bg-background/80 p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <HandHeart className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Keep the Temple Sustainable</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Temple Mother Earth is a 501(c)(3) nonprofit organization. Your tax-deductible offerings & tithes
                help us continue to serve our community, preserve Earth Medicine traditions, and grow our sacred family.
              </p>
              <a
                href={PAYPAL_DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
              >
                Offerings & Tithes
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                You'll be redirected to PayPal's secure donation page.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───── FLOATING DONATE BUTTON ───── */}
      <button
        onClick={() => setShowDonation(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80 hover:shadow-xl"
      >
        <Leaf className="h-4 w-4" />
        Donation
      </button>

      {/* ═══════════════════════════════════════════
          STAGE I — THE CALL
          ═══════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-foreground/70" />

        <motion.div
          className="relative z-10 max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-block font-body text-[10px] font-bold uppercase tracking-[0.4em] text-primary/80 border border-primary/30 rounded-full px-4 py-1.5">
              Your Journey Begins Here
            </span>
          </motion.div>
          <motion.img
            variants={fadeUp}
            src={logo}
            alt="Temple Mother Earth"
            className="mx-auto mb-8 h-32 w-32 rounded-full object-cover shadow-2xl ring-4 ring-primary/30 md:h-44 md:w-44"
          />
           <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl"
          >
            Welcome to Temple Mother Earth
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-2 max-w-md text-base font-semibold text-primary/90 md:text-lg italic"
          >
            A Temple of Higher Consciousness
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl"
          >
            Your soul has led you here in this now moment. Whether you are here to remember, reconnect,
            or rise into your highest purpose, you are home.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#awakening"
              className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80 hover:shadow-xl"
            >
              Begin the Journey
            </a>
            <Link
              to="/ceremony-intake"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              I'm Ready — Start Intake
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 z-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowRight className="h-6 w-6 rotate-90 text-primary-foreground/40" />
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE II — THE AWAKENING
          ═══════════════════════════════════════════ */}
      <section id="awakening" className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <JourneyStage number="Stage I" label="The Awakening" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-bold text-foreground md:text-5xl">
            You Are Your Own Healer
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-10 grid gap-10 md:grid-cols-2 items-center">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                The Divine resides within you. Whether you call it God, Source, Universe, Spirit, 
                the Most High, the Creator, the Ancestors, the Great Mystery, Jah, Allah, Yahweh, 
                Brahman, the Sacred, or simply Love — that infinite intelligence lives within your 
                very being. You have always had the power to connect to it.
              </p>
              <p>
                At Temple Mother Earth, we don't heal you — we hold sacred space for you to remember 
                that you are your own healer. Through Earth Medicine, ceremony, and community, 
                we help you reconnect with the divine wisdom that has always been yours.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={sacredSpace}
                alt="Sacred space at Temple Mother Earth"
                className="w-full h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-display text-sm font-semibold text-primary-foreground italic">
                  "Find your way back home to the wisdom and divine intelligence that exists within your entire being. You are your own healer and savior."
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE III — CHOOSE YOUR PATH
          ═══════════════════════════════════════════ */}
      <section id="offerings" className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <JourneyStage number="Stage II" label="Choose Your Path" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-bold text-card-foreground md:text-5xl">
            Sacred Offerings Await
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
            At Temple Mother Earth, our Earth Medicine Ceremonies invite you to reconnect with the wisdom,
            intelligence, and unconditional love woven into the natural world. These ceremonies are grounded
            in respect, prayer, reciprocity, and the remembrance that every human being carries the divine within.
          </motion.p>
          <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
             Whether you are seeking healing, renewal, grounding, or expansion, Earth Medicine opens a path
            of transformation that is both ancient and deeply personal. This sacred work honors the timeless
            relationship between humans and the Earth, offering safe containers for those ready to step
            into a deeper level of their journey.
          </motion.p>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {offerings.map((item) => {
              const CardContent = (
                <>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <item.icon className="absolute bottom-4 left-4 h-8 w-8 text-primary" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      {item.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </>
              );

              return item.isExternal ? (
                <motion.a
                  key={item.title}
                  variants={fadeUp}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:shadow-xl cursor-pointer"
                >
                  {CardContent}
                </motion.a>
              ) : (
                <motion.div key={item.title} variants={fadeUp}>
                  <Link
                    to={item.link}
                    className="group block overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all hover:shadow-xl"
                  >
                    {CardContent}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE IV — THE TRANSFORMATION
          ═══════════════════════════════════════════ */}
      <section className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <JourneyStage number="Stage III" label="The Transformation" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-bold text-foreground md:text-5xl">
            What You Will Experience
          </motion.h2>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Heart, title: "Healing & Growth", desc: "Feel the weight of the past dissolve as you step into your power, guided by the rhythms of the Earth and the sacred within." },
              { icon: Users, title: "Connection to Spirit & Earth", desc: "Rediscover the sacred within yourself and the divine rhythms of nature." },
              { icon: Leaf, title: "A Global Circle of Support", desc: "Be uplifted by like-minded souls in ceremonies and gatherings designed for your awakening." },
              { icon: Sun, title: "A Thriving Community", desc: "Find your circle of kindred spirits, practitioners, and visionaries who share your passion for transformation." },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} className="relative text-center group">
                <div className="absolute -top-3 -right-3 font-display text-5xl font-bold text-primary/10 select-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE V — JOIN THE CIRCLE
          ═══════════════════════════════════════════ */}
      <section id="membership" className="relative overflow-hidden px-4 py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${communityImg})` }}
        />
        <div className="absolute inset-0 bg-foreground/85" />

        <motion.div
          className="relative z-10 mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <JourneyStage number="Stage IV" label="Your Pathway" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            We Built Community. Now We Build Sovereignty.
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-center text-primary-foreground/75">
            Temple Mother Earth is evolving into a structured, threshold-based sanctuary.
            Nervous system sovereignty, embodied practice, and intentional progression — 
            each step earned, not purchased. This is depth over volume.
          </motion.p>

          {/* Pathway Steps */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center gap-0 sm:flex-row sm:justify-center sm:gap-0">
            {[
              { label: "Belong", price: "$50/mo", icon: Leaf },
              { label: "Train", price: "$150/mo", icon: Flame },
              { label: "Prepare", price: "$275/mo", icon: ShieldCheck },
              { label: "Embody", price: "$500/mo", icon: Star },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center text-center w-28">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20 border-2 border-primary/40">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-3 font-display text-sm font-bold text-primary-foreground">{step.label}</p>
                  <p className="mt-1 text-[11px] text-primary-foreground/60">{step.price}</p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-primary/50 mx-1 hidden sm:block" />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/membership"
              className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              Explore Your Pathway
            </Link>
            <Link
              to="/portal"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              Member Login
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE VI — THE INVITATION
          ═══════════════════════════════════════════ */}
      <section id="community" className="relative overflow-hidden px-4 py-24 md:py-32">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${ctaFooterImg})` }}
        />
        <div className="absolute inset-0 bg-foreground/80" />

        <motion.div
          className="relative z-10 mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <JourneyStage number="Stage V" label="The Invitation" />
          <motion.h2 variants={fadeUp} className="font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            What Are You Seeking?
          </motion.h2>
          <motion.div variants={fadeUp} className="mx-auto mt-8 max-w-xl space-y-4 text-lg text-primary-foreground/75">
            <p>
              Maybe you're carrying something heavy — grief, trauma, unanswered questions about who you truly are.
              Maybe you feel disconnected from your purpose, your body, your spirit. Maybe you've tried everything
              else and something deep within is calling you toward a different kind of healing.
            </p>
            <p>
              You don't have to have it figured out. You just have to be willing to show up.
              Temple Mother Earth is here to meet you exactly where you are.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/ceremony-intake"
              className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              Begin Your Journey
            </Link>
            <Link
              to="/portal"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              Member Login
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ───── UPCOMING OFFERINGS (Eventbrite) ───── */}
      <section id="upcoming-offerings" className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Sacred Gatherings
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            Upcoming Ceremonies & Offerings
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-muted-foreground">
             Explore our upcoming Earth Medicine ceremonies, community gatherings, and international immersions.
            Reserve your space and step into the sacred.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 rounded-2xl border border-border bg-card p-8 md:p-12">
            <div className="mx-auto max-w-xl rounded-xl border border-primary/20 bg-primary/5 p-5 mb-8">
              <p className="font-display text-base font-semibold text-foreground text-center">Important Information</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>All Earth Medicine ceremonies are for individuals <strong className="text-foreground">aged 21 and older</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Membership in Temple Mother Earth is required to attend ceremonies. <Link to="/membership" className="text-primary hover:underline">Learn more about membership →</Link></span>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>All participants must complete a <Link to="/ceremony-intake" className="text-primary hover:underline">sacred intake form</Link> prior to attending.</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-muted-foreground text-center italic">
                Family-friendly exceptions: Soulful Sundays, Community Day, and Cacao Ceremony are open to all ages.
              </p>
            </div>

            {/* Eventbrite Embedded Widget */}
            <div className="w-full overflow-hidden rounded-xl bg-card/50 border border-primary/10 p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <Flame className="h-10 w-10 text-primary" />
                <h3 className="font-display text-xl font-semibold text-foreground">Browse Our Upcoming Ceremonies</h3>
                <p className="text-muted-foreground max-w-md">
                  View our full calendar of Earth Medicine ceremonies, community gatherings, and sacred events on Eventbrite.
                </p>
                <a
                  href="https://www.eventbrite.com/o/29347213477#events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
                >
                  View Ceremonies Calendar
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-4">
              <p className="text-xs text-muted-foreground">
                Questions? Email us at{" "}
                <a href="mailto:AskUs@TempleMotherEarth.org" className="text-primary hover:underline">AskUs@TempleMotherEarth.org</a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── INSTAGRAM FEED ───── */}
      <section id="instagram" className="px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Follow Our Journey
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-foreground md:text-5xl">
            @templemotherearth
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Stay connected with our community through sacred moments, ceremonies, and gatherings shared on Instagram.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10">
            <div className="elfsight-app-e589de6f-7e8e-4fa2-80f2-553e2635ade9" data-elfsight-app-lazy></div>
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ───── GOOGLE REVIEWS ───── */}
      <section id="reviews" className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Community Voices
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
            What Our Community Says
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Read heartfelt testimonials from members of our sacred community.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.google.com/search?q=Temple+of+Mother+Earth&ludocid=4773705032292068357&lsig=AB86z5WhQt6Le_XFK7QZfBYgfHkw#lkt=LocalPoiReviews&lpg=cid:CgIgAQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              <Star className="h-4 w-4" />
              Read & Leave a Google Review
            </a>
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ───── CONTACT ───── */}
      <section id="contact" className="bg-card px-4 py-24 md:py-32">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Reach Out
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
              Connect With Us
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              You don't have to walk this path alone. Reach out to learn more about our offerings
              or discuss how we can bring the sacred into your life.
            </p>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div variants={fadeUp} className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
            <h3 className="font-display text-xl font-bold text-card-foreground">Receive Temple Transmissions</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              Philosophy, preparation guidance, pathway maps, and invitations — delivered with intention to your inbox.
            </p>
            <form className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); }}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 whitespace-nowrap"
              >
                Receive Transmissions
              </button>
            </form>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Visit Our Temple</h3>
                <p className="mt-2 text-muted-foreground">2415 32nd St SE<br />Washington, DC</p>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Email</h3>
                <a href="mailto:AskUs@TempleMotherEarth.org" className="mt-2 block text-primary hover:underline">
                  AskUs@TempleMotherEarth.org
                </a>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Follow Us</h3>
                <div className="mt-2 flex flex-wrap gap-4">
                  <a href="https://www.instagram.com/templemotherearth/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a>
                  <a href="https://www.facebook.com/TempleMotherEarth2020/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Facebook</a>
                  <a href="https://t.me/templemotherearth" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">@TempleMotherEarth 🌍</a>
                </div>
              </div>
              <div>
               <h3 className="font-display text-lg font-semibold text-card-foreground">Community Circles</h3>
                <p className="mt-1 text-xs text-muted-foreground italic">Download the <a href="https://telegram.org/apps" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram app</a> to join our community circles.</p>
                <div className="mt-3 flex flex-col gap-3">
                  <div>
                    <a href="https://t.me/templemotherearth" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium">🌍 Public Community Chat →</a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 pl-6">Open community announcements, event updates, and general Temple conversation.</p>
                  </div>
                  <div>
                    <a href="https://t.me/MensFellowship" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium">🔥 Men's Integration Circle →</a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 pl-6">A private brotherhood space for reflection, accountability, and healing through "The Cove."</p>
                  </div>
                  <div>
                    <a href="https://t.me/+12lOyLI8QH01NzYx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium">🌙 Wombmen's Integration Circle →</a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 pl-6">A sacred sisterhood space for emotional processing, embodiment practices, and mutual support.</p>
                  </div>
                  <div>
                    <a href="https://t.me/+WaG5DTz0HJYzNGNh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium">🌿 The Forest Team →</a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 pl-6">Our volunteer and support crew — land stewardship, event setup, and hands-on service to the Temple.</p>
                  </div>
                  <p className="text-xs text-muted-foreground/60 italic mt-1">Private circles are for members only</p>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Support the Temple</h3>
                <div className="mt-2 flex flex-col gap-2">
                  <a href="https://www.google.com/search?q=Temple+of+Mother+Earth&ludocid=4773705032292068357&lsig=AB86z5WhQt6Le_XFK7QZfBYgfHkw#lkt=LocalPoiReviews&lpg=cid:CgIgAQ==" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary" /> Leave a Google Review
                  </a>
                  <a href="https://www.amazon.com/hz/wishlist/ls/22FRJ7F629NNE?ref_=wl_share" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Amazon Wishlist →</a>
                  <a href="https://photos.google.com/share/AF1QipMxNzo9_-BFv40HTtnV_hqFcMAWyOMRk1CqLPxveEjV4JeUwkG0Ffw9qJLbgMsTyQ?pli=1&key=ZHVoakpYUnU1RWkydDI3NGJLdGFxckJPdkI0OGpR" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Share Photos & Videos →</a>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Members Portal</h3>
                <Link
                  to="/portal"
                  className="mt-2 block text-primary hover:underline"
                >
                  Integration & Wellness Platform →
                </Link>
              </div>
            </div>

            <form
              className="space-y-4 rounded-2xl border border-border bg-background p-6"
              onSubmit={(e) => {
                e.preventDefault();
                window.open("mailto:AskUs@TempleMotherEarth.org", "_blank");
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <textarea
                placeholder="How can we support your journey?"
                rows={4}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="bg-foreground px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Temple Mother Earth" className="h-10 w-10 rounded-full object-cover" />
              <span className="font-display text-lg font-bold text-primary-foreground">Temple Mother Earth</span>
            </Link>
            <div className="flex flex-wrap justify-center gap-6 font-body text-sm text-primary-foreground/60">
              <a href="#awakening" className="hover:text-primary transition-colors">About</a>
              <a href="#offerings" className="hover:text-primary transition-colors">Offerings</a>
              <a href="#membership" className="hover:text-primary transition-colors">Membership</a>
              <a href="#upcoming-offerings" className="hover:text-primary transition-colors">Upcoming</a>
              <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
              <Link to="/volunteer" className="hover:text-primary transition-colors">Volunteer</Link>
              <Link to="/join-facilitator" className="hover:text-primary transition-colors">Join as Facilitator</Link>
              <Link to="/preparation" className="hover:text-primary transition-colors">Preparation</Link>
              <Link to="/conduct" className="hover:text-primary transition-colors">Conduct</Link>
              <Link to="/portal" className="hover:text-primary transition-colors">
                Members Portal
              </Link>
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

export default Index;
