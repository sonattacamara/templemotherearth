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
    desc: "Sacred rituals guided by experienced practitioners honoring Kambo, Hapé, and ancient Earth Medicine traditions. Held locally in Washington, DC.",
    img: offeringCeremony,
    link: "https://www.eventbrite.com/o/29347213477#events",
    isExternal: true,
    cta: "Enter the Ceremony",
  },
  {
    icon: Globe,
    title: "International Retreats",
    desc: "Journey with us to breathtaking locations worldwide for immersive experiences that blend cultural richness with deep spiritual practice.",
    img: offeringRetreat,
    link: "/retreats-inquiry",
    isExternal: false,
    cta: "Explore Retreats",
  },
  {
    icon: Users,
    title: "Traveling Ceremonies",
    desc: "We come to you. Invite Temple Mother Earth to hold personalized ceremonies in your community, tailored to your unique path and intentions.",
    img: offeringTraveling,
    link: "/traveling-ceremonies",
    isExternal: false,
    cta: "Bring Us to You",
  },
  {
    icon: Heart,
    title: "1-on-1 / Private Ceremonies",
    desc: "Personalized, intimate Earth Medicine sessions tailored specifically to your individual healing journey, held in a private and sacred setting.",
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
                help us continue to serve seekers, preserve Earth Medicine traditions, and grow our sacred community.
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
        Offerings & Tithes
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
            Temple Mother Earth
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl"
          >
            You have arrived. A sacred sanctuary where seekers unite to awaken, heal, and transform
            through the divine wisdom of Earth Medicine and the God within.
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
            Every seeker's journey is unique. From our Washington, DC sanctuary to sacred destinations
            across the globe — choose the path that calls to your spirit.
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
              { icon: Heart, title: "Healing & Release", desc: "Release old wounds, rediscover your inner power, and step into clarity and purpose." },
              { icon: Users, title: "Sacred Connection", desc: "Join a circle of kindred spirits who honor your journey and support your growth." },
              { icon: Leaf, title: "Earth Medicine Alignment", desc: "Immerse in practices that harmonize body, mind, and spirit with the sacred rhythms of the Earth." },
              { icon: Sun, title: "Spiritual Awakening", desc: "Reconnect with the God within and live in harmony with your soul's calling." },
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
          <JourneyStage number="Stage IV" label="Join the Circle" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-bold text-primary-foreground md:text-5xl">
            Become a Member
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-center text-primary-foreground/75">
            Membership in Temple Mother Earth is an invitation to walk a sacred path alongside a community
            of seekers devoted to healing, growth, and spiritual awakening.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Sacred Access", desc: "Exclusive access to Earth Medicine ceremonies, private gatherings, and members-only events." },
              { icon: Sparkles, title: "Integration & Wellness", desc: "Your companion for expanded consciousness with AI guidance, daily rituals, and personalized plans." },
              { icon: Heart, title: "Community Circle", desc: "A circle of sovereign beings walking the path together — peer support and lifelong connections." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-primary-foreground/10 bg-foreground/40 backdrop-blur-sm p-8 text-center">
                <item.icon className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold text-primary-foreground">{item.title}</h3>
                <p className="mt-3 text-sm text-primary-foreground/60">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/membership"
              className="rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
            >
              Explore Membership Tiers
            </Link>
            <a
              href="https://integration.templemotherearth.org/auth?mode=signin"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              Member Login
            </a>
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
            <a
              href="https://integration.templemotherearth.org/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              Member Login
            </a>
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
            Explore our upcoming Earth Medicine ceremonies, community gatherings, and international retreats.
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
              <a
                href="https://www.eventbrite.com/o/29347213477#events"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
              >
                View All of Our Offerings
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="text-xs text-muted-foreground">
                Questions? Email us at{" "}
                <a href="mailto:AskUs@TempleMotherEarth.org" className="text-primary hover:underline">AskUs@TempleMotherEarth.org</a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

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
                  <a href="https://t.me/templemotherearth" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Telegram</a>
                </div>
              </div>
              <div>
              <h3 className="font-display text-lg font-semibold text-card-foreground">Community Circles</h3>
                <p className="mt-1 text-xs text-muted-foreground italic">Download the <a href="https://telegram.org/apps" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram app</a> to join our community circles.</p>
                <div className="mt-2 flex flex-col gap-2">
                  <a href="https://t.me/MensFellowship" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Men's Integration Circle →</a>
                  <a href="https://t.me/+12lOyLI8QH01NzYx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Wombmen's Integration Circle →</a>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Support the Temple</h3>
                <div className="mt-2 flex flex-col gap-2">
                  <a href="https://www.google.com/search?sca_esv=b1aa0ebf47929ca9&rlz=1CDGOYI_enUS1105US1105&hl=en-US&sxsrf=ANbL-n7Zuzk2-DFNhAsOfo8ugT-wYJ_Wow:1770826746416&q=temple+of+mother+earth+reviews&uds=ALYpb_kMVwOwDZyOU_-hei8qutnOLtqji1D_QYa-uv2_cGtwJ_yq-vEdM0_pBa4ftxanMQTEw8pqG5P1j6vjs4wuV-EizInVTlAHBvhbJX_gwNa5WMuWrA9JS-OnXpWuJCawFgpFoq1HscB59EuBX5pv_sdg3cW-3_e2EjSPSjxUJ-nCWWP-D6-Pd0OumXpM87onxplSGrLvPk37WVwBXHMJUYc1wt-t-MpND4kfFlAC-YiVdikuLieNrJwwiG4QrTSzCVCsLT8ckzpOJOcjcn9PnjgPIqO2RowfnVHhgK_BlO3c8dB7Cwa4kWB1RYHEa9FqJWMNlV9HNRWyyISBy69iKvs23FPyxU3remaY_fPXsnvOPNGa-MUIl5M55krZffobrRDn20BMVgQkHcKKlbrhpjvJFduaVBux3KlcWpgNc7Zlmxb2HwYJEsr0AmXDyBudQy34tAE_7BrCUyxkXvJuXaRHggQHw9DNr3H6fV1RVykGMyG91nvcZzC-R8DDVm437-lgZZFpytmNj-XuAcm5HB9TxOXVKPr5IioXI2Ek4C98CCCQ0fw5Nu-IVAKXydZS0esu1_KITPaeKvq4-4Uc3Gdh7H9H4oVI7BJp9XRcQbIzq2foQJ4&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQZdqYy5vjml0waax1nkNammOw8Wx_tiuUspNReZ4g7mGGqsMx_MYNc5FlKrZU1gcLCcuh9HLDyE9bkuO-it9RAAQyGdlZCHd_inE4ryoBOXagaw8g%3D%3D&sa=X&ved=2ahUKEwjK6rbZ69GSAxWDGFkFHXBxCpEQk8gLegQIHRAB&ictx=1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary" /> Leave a Google Review
                  </a>
                  <a href="http://bit.ly/TempleAmazonWishList" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Amazon Wishlist →</a>
                  <a href="https://bit.ly/TemplePhotosVideos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">Share Photos & Videos →</a>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Members Portal</h3>
                <a
                  href="https://integration.templemotherearth.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-primary hover:underline"
                >
                  Integration & Wellness Platform →
                </a>
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
              <Link to="/preparation" className="hover:text-primary transition-colors">Preparation</Link>
              <Link to="/conduct" className="hover:text-primary transition-colors">Conduct</Link>
              <a
                href="https://integration.templemotherearth.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Members Portal
              </a>
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
