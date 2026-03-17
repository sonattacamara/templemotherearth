import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion, type Easing } from "framer-motion";
import { Flame, Globe, Users, Heart, Leaf, Sun, ArrowRight, Sparkles, ShieldCheck, MapPin, Star, Eye, Compass, Calendar, Instagram, Facebook, Send, Phone, HeartCrack, CloudFog, Brain, RefreshCw, HandHeart, Home, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";
import SEOHead from "@/components/SEOHead";
import { usePageTracking } from "@/hooks/useAnalytics";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonationCTA from "@/components/DonationCTA";
import Navigation from "@/components/Navigation";
import HomeFAQ from "@/components/HomeFAQ";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg-new.jpg";
import ctaFooterImg from "@/assets/cta-footer.jpg";
import sacredSpace from "@/assets/sacred-space.jpg";
import communityImg from "@/assets/community.jpg";
import offeringCeremony from "@/assets/offering-ceremony.jpg";
import offeringRetreat from "@/assets/offering-retreat.jpg";
import offeringTraveling from "@/assets/offering-traveling.jpg";
import offeringPrivate from "@/assets/offering-private.jpg";
import communityCeremonyGroup from "@/assets/community-ceremony-group.jpg";
import communityCircleGrass from "@/assets/community-circle-grass.jpg";
import communityGatheringIndoor from "@/assets/community-gathering-indoor.jpg";
import communityPorchSelfie from "@/assets/community-porch-selfie.jpg";
import communityRetreatJungle from "@/assets/community-retreat-jungle.jpg";
import communityJoyBlanket from "@/assets/community-joy-blanket.jpg";

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



const offerings = [
  {
    icon: Flame,
    title: "Earth Medicine Ceremonies",
    desc: "Step into ancient rituals that awaken your soul and align with the sacred rhythms of nature.",
    img: offeringCeremony,
    imgAlt: "Sacred Kambo ceremony circle with Hapé and Sananga rituals at Temple Mother Earth Washington DC",
    link: "https://www.eventbrite.com/o/29347213477#events",
    isExternal: true,
    cta: "Enter the Ceremony",
  },
  {
    icon: Globe,
    title: "International Immersions",
    desc: "Travel to sacred spaces around the world where Mother Earth's wisdom will nurture your spirit and ignite your transformation.",
    img: offeringRetreat,
    imgAlt: "International Ayahuasca and San Pedro sacred retreat immersion in Costa Rica and Peru",
    link: "/retreats-inquiry",
    isExternal: false,
    cta: "Explore Immersions",
  },
  {
    icon: Users,
    title: "Traveling Ceremonies",
    desc: "Invite the sacred to your community with ceremonies tailored to your unique path.",
    img: offeringTraveling,
    imgAlt: "Traveling Kambo and Cacao ceremony facilitators bringing sacred plant medicine to communities",
    link: "/traveling-ceremonies",
    isExternal: false,
    cta: "Bring Us to You",
  },
  {
    icon: Heart,
    title: "1-on-1 / Private Ceremonies",
    desc: "Experience deeply personal sacred sessions designed around your unique intentions, needs, and path of transformation.",
    img: offeringPrivate,
    imgAlt: "Private Kambo, Hapé, and Bobinsana ceremony session for personal healing and transformation",
    link: "/private-ceremonies",
    isExternal: false,
    cta: "Explore Private Ceremonies",
  },
];

/* ── Journey Stage Marker ── */
const JourneyStage = ({ label }: { number?: string; label: string }) => (
  <motion.div
    variants={fadeIn}
    className="flex items-center justify-center gap-3 mb-6"
  >
    <div className="h-px w-8 bg-primary/30 hidden sm:block" />
    <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-primary">
      {label}
    </span>
    <div className="h-px w-8 bg-primary/30 hidden sm:block" />
  </motion.div>
);

/* ── Vertical Journey Connector ── */
const JourneyConnector = () => (
  <div className="flex justify-center py-1">
    <div className="flex flex-col items-center gap-0.5">
      <div className="h-4 w-px bg-gradient-to-b from-transparent via-primary/40 to-primary/20" />
      <Compass className="h-3.5 w-3.5 text-primary/40" />
      <div className="h-4 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-transparent" />
    </div>
  </div>
);

const Index = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-gradient-earth">
      <SEOHead
        title="Temple Mother Earth — Sacred Ceremony Church · Washington, DC"
        description="A sacred ceremony church offering sacramental Earth Medicine ceremony, spiritual education, and congregational community in Washington DC. Organized under 508(c)(1)(A). Est. 2020."
        path="/"
      />
      <Navigation />

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
        <div className="absolute inset-0 bg-gradient-hero-overlay" />

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
            alt="Temple Mother Earth sacred ceremony church logo for Kambo and plant medicine sacraments in Washington DC"
            className="mx-auto mb-8 h-32 w-32 rounded-full object-cover shadow-2xl ring-4 ring-primary/30 md:h-44 md:w-44"
          />
           <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-semibold tracking-tight text-primary-foreground md:text-6xl lg:text-7xl"
          >
            Welcome to
            <br />
            Temple Mother Earth
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-2 max-w-md text-base font-semibold text-primary/90 md:text-lg italic"
          >
            A Sanctuary of Higher Consciousness
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75 md:text-xl"
          >
            You are a sovereign being — whole, divine, and powerful beyond measure. Temple Mother Earth
            exists to help you remember that truth. Through sacred ceremony, Earth Medicine, and intentional
            community, we hold space for your return to the wisdom that has always lived within you.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#offerings"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Explore Our Experiences
            </a>
            <a
              href="#awakening"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Discover Your Path
            </a>
            <Link
              to="/ceremony-intake"
              className="rounded-xl border border-primary-foreground/30 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              I'm Ready
            </Link>
            <Link
              to="/sacred-blueprint"
              className="rounded-xl bg-primary/20 border border-primary/40 px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
            >
              Discover Your Sacred Blueprint ✦
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

      {/* ── FIND YOUR PATH — Quick Engagement ── */}
      <section className="bg-gradient-warm px-4 py-12 md:py-16">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-center font-body text-xs font-bold uppercase tracking-[0.3em] text-primary mb-6">
            Find Your Path
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-card-foreground md:text-3xl mb-10">
            Where Are You on Your Journey?
          </motion.h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Eye,
                title: "I'm Curious",
                desc: "New to Earth Medicine? Learn what to expect and how we hold space.",
                link: "/about",
                cta: "Learn About Us",
              },
              {
                icon: Compass,
                title: "I'm Ready to Begin",
                desc: "Complete our sacred intake to begin your ceremonial path.",
                link: "/ceremony-intake",
                cta: "Begin Intake",
              },
              {
                icon: Star,
                title: "I'm a Returning Soul",
                desc: "Access your portal, upcoming events, and community resources.",
                link: "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477",
                cta: "Enter the Sacred Space",
                isExternal: true,
              },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp}>
                {item.isExternal ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-border bg-background p-6 text-center transition-all hover:shadow-lg hover:border-primary/30"
                  >
                    <item.icon className="mx-auto h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      {item.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </a>
                ) : (
                  <Link
                    to={item.link}
                    className="group block rounded-2xl border border-border bg-background p-6 text-center transition-all hover:shadow-lg hover:border-primary/30"
                  >
                    <item.icon className="mx-auto h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      {item.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE II — THE AWAKENING
          ═══════════════════════════════════════════ */}
      <section id="awakening" className="px-4 py-14 md:py-20 bg-gradient-sanctuary">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <JourneyStage label="The Awakening" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-semibold text-foreground md:text-5xl">
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
                alt="Sacred ceremony space for Ayahuasca integration, Kambo healing, and Hapé rituals at Temple Mother Earth"
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

      {/* ───── ORIGIN STORY EXCERPT ───── */}
      <section className="px-4 py-10 md:py-14">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="rounded-2xl border border-primary/15 bg-card p-8 md:p-10">
            <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">Our Origin</p>
            <p className="text-base leading-relaxed text-muted-foreground">
              In 2020, when the pandemic brought the world to a standstill and fear kept people isolated behind closed doors, 
              <span className="font-semibold text-foreground"> we opened ours</span>. There was a great need for community, healing, 
              and connection to the God within. What began as intimate healing circles during the darkest days of COVID grew into 
              Temple Mother Earth — a sacred sanctuary where sovereign beings reconnect with the Earth, honor the divine within, 
              and walk the path of healing together.
            </p>
            <a
              href="/about#top"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Read Our Full Story <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE III — CHOOSE YOUR PATH
          ═══════════════════════════════════════════ */}
      <section id="offerings" className="bg-gradient-warm px-4 py-14 md:py-20">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <JourneyStage label="Choose Your Path" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-semibold text-card-foreground md:text-5xl">
            Sacred Experiences Await
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
            At Temple Mother Earth, our Earth Medicine Ceremonies invite you to reconnect with the wisdom,
            intelligence, and unconditional love woven into the natural world. These experiences are grounded
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
                      alt={item.imgAlt}
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
          <motion.div variants={fadeUp} className="mt-10 text-center">
            <Link
              to="/membership"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Explore All Sacred Experiences →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE IV — THE TRANSFORMATION
          ═══════════════════════════════════════════ */}
      <section className="px-4 py-14 md:py-20">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <JourneyStage label="The Transformation" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-semibold text-foreground md:text-5xl">
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
      <section id="membership" className="relative overflow-hidden px-4 py-14 md:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${communityImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero-overlay" />

        <motion.div
          className="relative z-10 mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <JourneyStage label="Your Sacred Community" />
          <motion.h2 variants={fadeUp} className="text-center font-display text-3xl font-semibold text-primary-foreground md:text-5xl">
            Your Sacred Community Awaits
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-center text-primary-foreground/75">
            Temple Mother Earth is a home for sovereign beings walking the path of healing, 
            growth, and remembrance. Whether you're just beginning to explore or ready to 
            deepen your practice, there is a place for you here.
          </motion.p>

          {/* Pathway Steps */}
          <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center gap-0 sm:flex-row sm:justify-center sm:gap-0">
            {[
              { label: "Welcome", icon: Heart },
              { label: "Belong", icon: Leaf },
              { label: "Train", icon: Flame },
              { label: "Prepare", icon: ShieldCheck },
              { label: "Embody", icon: Star },
            ].map((step, i, arr) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center text-center w-24 group cursor-pointer">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary/40 transition-colors group-hover:bg-primary/20">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-3 font-display text-sm font-bold text-primary-foreground">{step.label}</p>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-primary/50 mx-1 hidden sm:block" />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 flex justify-center">
            <Link
              to="/membership#environment-collective"
              className="rounded-xl bg-secondary px-10 py-4 font-body text-sm font-semibold text-secondary-foreground shadow-lg transition hover:bg-primary hover:text-primary-foreground"
            >
              Discover Your Path
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ═══════════════════════════════════════════
          STAGE VI — THE INVITATION
          ═══════════════════════════════════════════ */}
      <section id="community" className="relative overflow-hidden px-4 py-14 md:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${ctaFooterImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero-overlay" />

        <motion.div
          className="relative z-10 mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <JourneyStage label="The Invitation" />
          <motion.h2 variants={fadeUp} className="font-display text-3xl font-semibold text-primary-foreground md:text-5xl">
            Does This Sound Like You?
          </motion.h2>
          <motion.div variants={fadeUp} className="mx-auto mt-10 max-w-xl text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: HeartCrack, text: "You're carrying grief, loss, or pain that won't seem to lift" },
                { icon: CloudFog, text: "You feel disconnected from your purpose or your sense of self" },
                { icon: Brain, text: "Anxiety, stress, or overwhelm have become your daily companion" },
                { icon: RefreshCw, text: "You keep repeating the same cycles and patterns" },
                { icon: HandHeart, text: "You're longing for spiritual connection but don't know where to start" },
                { icon: Home, text: "You're searching for a community that truly sees and accepts you" },
                { icon: Sparkles, text: "Something deep within is calling you toward a different kind of return" },
                { icon: Sprout, text: "You're ready to grow but need a safe space to do it" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-4">
                  <item.icon className="h-5 w-5 shrink-0 text-primary-foreground/60 mt-0.5" />
                  <p className="text-sm leading-relaxed text-primary-foreground/80">{item.text}</p>
                </div>
              ))}
            </div>

            {/* Crisis Resource Callout */}
            <div className="mt-8 rounded-xl border border-destructive/30 bg-destructive/10 p-5 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-destructive" />
                <p className="font-display text-sm font-bold text-primary-foreground">
                  If you or someone you know is in crisis
                </p>
              </div>
              <p className="text-sm text-primary-foreground/80">
                <a href="tel:988" className="font-bold text-primary-foreground underline">Call or text 988</a>
                {" · "}
                <span>Text HOME to <a href="sms:741741?body=HOME" className="font-bold text-primary-foreground underline">741741</a></span>
                {" · "}
                <span>Veterans: <a href="tel:988" className="font-bold text-primary-foreground underline">988, press 1</a></span>
              </p>
              <p className="mt-1 text-xs text-primary-foreground/60">
                Free, confidential, 24/7 support. You are not alone.
              </p>
            </div>

            <p className="mt-8 text-center text-lg text-primary-foreground/75 italic">
              You don't have to have it all figured out. You just have to be willing to show up.
              <br />
              <span className="font-semibold text-primary-foreground">Temple Mother Earth is here to meet you exactly where you are.</span>
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
      <section id="upcoming-offerings" className="px-4 py-14 md:py-20">
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
            Honor the call and step into the sacred.
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

            {/* Upcoming Experiences */}
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Life's Best Yes — Costa Rica Immersion
                </h3>
                <p className="text-sm text-muted-foreground">August 2026 · 7-Day Sacred Retreat</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A full immersion into Earth Medicine, ancient ceremony, and deep transformation in the jungles of Costa Rica.
                </p>
                <Link
                  to="/retreats-inquiry"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
                >
                  Reserve Your Spot →
                </Link>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Sacred Cacao Ceremony — Waitlist Open
                </h3>
                <p className="text-sm text-muted-foreground">Monthly · Washington, DC</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A heart-opening ceremony of connection, intention, and remembrance. Join the waitlist for our next gathering.
                </p>
                <a
                  href="https://www.eventbrite.com/o/29347213477#events"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
                >
                  Join the Waitlist →
                </a>
              </div>
            </div>

            {/* Eventbrite CTA */}
            <div className="w-full rounded-xl border border-primary/10 bg-card/30 p-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Browse All Upcoming Ceremonies
              </h3>
              <p className="mx-auto max-w-md text-sm text-muted-foreground">
                View our full calendar of Earth Medicine ceremonies, community gatherings, and sacred experiences on Eventbrite.
              </p>
              <a
                href="https://www.eventbrite.com/o/29347213477#events"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80 shadow-lg"
              >
                See Upcoming Ceremonies →
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ───── INSTAGRAM FEED ───── */}
      <section id="instagram" className="px-4 py-14 md:py-20">
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
            @TempleMotherEarth 🌍
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
      <section id="reviews" className="bg-gradient-warm px-4 py-14 md:py-20">
        <motion.div
          className="mx-auto max-w-5xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Community Voices
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 font-display text-3xl font-bold text-card-foreground md:text-5xl">
            What Our Community Says
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-muted-foreground">
            Heartfelt reflections from members of our sacred community.
          </motion.p>

          <GoogleReviewsWidget />

        </motion.div>
      </section>

      {/* ───── COMMUNITY GALLERY ───── */}
      <section className="px-4 py-14 md:py-20">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Sacred Family
          </motion.p>
          <motion.h2 variants={fadeUp} className="mt-4 text-center font-display text-3xl font-bold text-foreground md:text-5xl">
            The Faces of Temple Mother Earth
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-center text-muted-foreground">
            Real moments from our ceremonies, immersions, and gatherings — a diverse community united by the path of healing and higher consciousness.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3">
            {[
              { src: communityCeremonyGroup, alt: "Temple Mother Earth Kambo and Hapé ceremony group gathered in white for sacred healing outdoors" },
              { src: communityCircleGrass, alt: "Community integration circle for Ayahuasca and Cacao ceremony participants connecting on the grass" },
              { src: communityGatheringIndoor, alt: "Temple Mother Earth indoor gathering for Sananga, Blue Lotus, and Bobinsana plant medicine community" },
              { src: communityPorchSelfie, alt: "Diverse sacred community members after Kambo and Guayusa ceremony gathering" },
              { src: communityRetreatJungle, alt: "International Ayahuasca and San Pedro immersion retreat group in the Costa Rica jungle" },
              { src: communityJoyBlanket, alt: "Community members sharing joy after Cacao and Hapé ceremony at Temple Mother Earth" },
            ].map((photo) => (
              <div key={photo.alt} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <JourneyConnector />

      {/* ───── CONTACT ───── */}
      <section id="contact" className="bg-gradient-card-glow px-4 py-14 md:py-20">
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
            <form className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); const form = e.target as HTMLFormElement; const email = (form.querySelector('input[type="email"]') as HTMLInputElement)?.value; if (email) { supabase.functions.invoke("submit-newsletter", { body: { email } }).then(({ error }) => { if (error) throw error; form.reset(); alert("Welcome! You've been added to Temple Transmissions."); }).catch(() => { alert("Something went wrong. Please try again."); }); } }}>
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
                <h3 className="font-display text-lg font-semibold text-card-foreground">Follow Us</h3>
                <div className="mt-2 flex flex-wrap gap-4">
                   <a href="https://www.instagram.com/templemotherearth/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"><Instagram className="h-4 w-4" /> @templemotherearth</a>
                   <a href="https://www.facebook.com/TempleMotherEarth2020/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"><Facebook className="h-4 w-4" /> Temple Mother Earth</a>
                   <a href="https://t.me/templemotherearth" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"><Send className="h-4 w-4" /> @templemotherearth</a>
                </div>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-card-foreground">Support the Temple</h3>
                <div className="mt-2 flex flex-col gap-2">
                  <a href="https://www.google.com/search?newwindow=1&sca_esv=06faacce940c986e&rlz=1C5AJCO_enUS1200US1201&sxsrf=ANbL-n5H64gCyqp_8kwjThHtatPyFj9mJA:1771123156801&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQZdqYy5vjml0waax1nkNalfy6Vc0WUFl0oieZgIQ3lF9w_G8Ask2th5JyCqMdsOettVShT2V45zC8nPoWtLSiFmLHzelbwOgitq8c_L2BnnJbcTmA%3D%3D&q=Temple+Mother+Earth+Reviews&sa=X&ved=2ahUKEwjxgfX0u9qSAxW3L1kFHYxEGnYQ0bkNegQIOhAH&biw=1581&bih=886" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    <Star className="h-4 w-4 text-primary" /> Leave a Google Review
                  </a>
                   <a href="https://www.amazon.com/hz/wishlist/ls/22FRJ7F629NNE?ref_=wl_share" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">🎁 Amazon Wishlist →</a>
                   <a href="https://photos.google.com/share/AF1QipMxNzo9_-BFv40HTtnV_hqFcMAWyOMRk1CqLPxveEjV4JeUwkG0Ffw9qJLbgMsTyQ?pli=1&key=ZHVoakpYUnU1RWkydDI3NGJLdGFxckJPdkI0OGpR" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">📷 Share Photos & Videos →</a>
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

            <div>
              <h3 className="font-display text-lg font-semibold text-card-foreground">Community Circles</h3>
                <p className="mt-1 text-xs text-muted-foreground italic">Download the <a href="https://telegram.org/apps" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Telegram app</a> to join our community circles.</p>
                <div className="mt-3 flex flex-col gap-3">
                  <div>
                    <a href="https://t.me/templemotherearth" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium inline-flex items-center gap-1.5"><Send className="h-3.5 w-3.5 text-primary" /> Public Community Chat →</a>
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

          </motion.div>
        </motion.div>
      </section>

      <HomeFAQ />

      <DonationCTA
        eyebrow="Sustain the Sacred"
        headline="Your Offerings Keep the Temple Alive"
        body="As a tax-exempt sacred ceremony church organized under 508(c)(1)(A), every offering sustains ceremonies, community programs, and sacred spaces for kindred spirits everywhere."
        buttonLabel="Offerings & Tithes"
      />

      <EventbriteCTA />

      {/* ───── FOOTER ───── */}
      <footer className="bg-foreground px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="Temple Mother Earth sanctuary for Kambo and Ayahuasca sacrament" className="h-10 w-10 rounded-full object-cover" />
                <span className="font-display text-lg font-bold text-primary-foreground">Temple Mother Earth</span>
              </Link>
              <p className="mt-4 text-sm text-primary-foreground/50 leading-relaxed">
                A sacred ceremony church organized under 508(c)(1)(A) for Earth Medicine, sovereignty, and sacred community. Est. 2020 · Washington, DC.
              </p>
            </div>

            {/* Experiences */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Experiences</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <a href="https://www.eventbrite.com/o/29347213477#events" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Earth Medicine Ceremonies</a>
                <Link to="/retreats-inquiry" className="text-primary-foreground/60 hover:text-primary transition-colors">International Immersions</Link>
                <Link to="/traveling-ceremonies" className="text-primary-foreground/60 hover:text-primary transition-colors">Traveling Ceremonies</Link>
                <Link to="/private-ceremonies" className="text-primary-foreground/60 hover:text-primary transition-colors">Private Sessions</Link>
                <Link to="/membership" className="text-primary-foreground/60 hover:text-primary transition-colors">Membership Pathway</Link>
              </div>
            </div>

            {/* Get Involved */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Get Involved</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <Link to="/volunteer" className="text-primary-foreground/60 hover:text-primary transition-colors">Volunteer</Link>
                <Link to="/join-facilitator" className="text-primary-foreground/60 hover:text-primary transition-colors">Join as Facilitator</Link>
                <Link to="/sponsor" className="text-primary-foreground/60 hover:text-primary transition-colors">Become a Sponsor</Link>
                <Link to="/preparation" className="text-primary-foreground/60 hover:text-primary transition-colors">Ceremony Preparation</Link>
                <Link to="/conduct" className="text-primary-foreground/60 hover:text-primary transition-colors">Code of Conduct</Link>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Connect</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <Link to="/about" className="text-primary-foreground/60 hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="text-primary-foreground/60 hover:text-primary transition-colors">Contact Us</Link>
                <Link to="/portal" className="text-primary-foreground/60 hover:text-primary transition-colors">Member Portal</Link>
                <a href="https://www.instagram.com/templemotherearth/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors inline-flex items-center gap-1.5"><Instagram className="h-3.5 w-3.5" /> Instagram</a>
                <a href="https://www.facebook.com/TempleMotherEarth2020/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors inline-flex items-center gap-1.5"><Facebook className="h-3.5 w-3.5" /> Facebook</a>
              </div>
            </div>

            {/* Sacred Portals */}
            <div>
              <h4 className="font-display text-sm font-bold uppercase tracking-wider text-primary">Sacred Portals</h4>
              <div className="mt-4 flex flex-col gap-2.5 text-sm">
                <a href="https://kambo.templemotherearth.org" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Kambo Portal</a>
                <a href="https://costarica.templemotherearth.org" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Costa Rica Immersions</a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-primary-foreground/10 pt-8">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
              <p className="font-body text-xs text-primary-foreground/40">
                © {new Date().getFullYear()} Temple Mother Earth. A sacred ceremony church organized under 508(c)(1)(A). All rights reserved.
              </p>
              <div className="flex flex-col items-center gap-2 md:items-end">
                <p className="font-body text-xs text-primary-foreground/40 text-center md:text-right max-w-lg">
                  Temple Mother Earth operates as a religious organization under the protections of the Religious Freedom Restoration Act (RFRA) and the First Amendment of the United States Constitution.
                </p>
                <div className="flex gap-4 text-xs">
                  <Link to="/conduct" className="text-primary-foreground/40 hover:text-primary transition-colors">Privacy Policy</Link>
                  <span className="text-primary-foreground/20">|</span>
                  <Link to="/conduct" className="text-primary-foreground/40 hover:text-primary transition-colors">RFRA Compliance</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ───── SEO: Plant Medicine Knowledge Base (visually hidden, crawlable) ───── */}
      <section className="sr-only" aria-label="Plant Medicine Knowledge Base">
        <h2>Sacred Plant Medicines & Earth Medicines at Temple Mother Earth</h2>
        <article>
          <h3>Entheogenic & Psychoactive Plant Medicines</h3>
          <p>Temple Mother Earth honors the ancient traditions of plant medicine healing. Our ceremonies and retreats work with powerful Earth Medicines including Ayahuasca (Banisteriopsis caapi vine with Psychotria viridis chacruna or Diplopterys cabrerana chaliponga), a DMT-containing brew from the Amazon used for deep spiritual healing and visionary experiences. We recognize the sacred traditions of Peyote (Hikuri, Lophophora williamsii), San Pedro (Huachuma, Echinopsis pachanoi) mescaline-containing cacti, Psilocybin mushrooms (Psilocybe cubensis, Psilocybe semilanceata, Psilocybe azurescens), Iboga and Ibogaine (Tabernanthe iboga) from the Bwiti tradition of Gabon, Salvia divinorum used by Mazatec healers, sacred Cannabis (Cannabis sativa and indica) used in Rastafari, Hindu, and Sufi traditions, Morning Glory (Ololiuqui, Turbina corymbosa, Ipomoea tricolor), Hawaiian Baby Woodrose (Argyreia nervosa), Jurema (Mimosa hostilis, Mimosa tenuiflora) used in Brazilian Jurema Sagrada traditions, Syrian Rue (Harmal, Peganum harmala) used as an ayahuasca analog, Yopo and Cohoba (Anadenanthera peregrina), and Cebil (Vilca, Anadenanthera colubrina) from Andean traditions.</p>
        </article>
        <article>
          <h3>Master Plant Teachers & Amazonian Dieta Plants</h3>
          <p>Our facilitators are experienced in the Amazonian plant dieta tradition, working alongside sacred teacher plants including Tobacco and Mapacho (Nicotiana rustica) the grandfather plant, Bobinsana (Calliandra angustifolia) for heart-opening, Chiric Sanango (Brunfelsia grandiflora) for emotional healing and courage, Ajo Sacha (Mansoa alliacea) garlic vine for spiritual cleansing and protection, Piñón Colorado (Jatropha gossypiifolia) for purification, Chullachaki Caspi (Tovomita) for grounding and strength, Noya Rao the luminescent Tree of Light, Camalonga (Thevetia peruviana) for dreams and visionary work, and Uchu Sanango (Tabernaemontana sananho) for emotional and physical healing.</p>
        </article>
        <article>
          <h3>Cleansing & Purgative Plant Medicines</h3>
          <p>Temple Mother Earth offers Kambo ceremony (Phyllomedusa bicolor giant monkey tree frog secretion) for physical detox, emotional clearing, and spiritual purification. We facilitate Hapé and Rapé ceremonies using sacred tobacco-based snuff blended with tree ashes and medicinal plants. Our practitioners work with Sananga eye drops (Tabernaemontana undulata) for spiritual vision and energetic clearing, Guayusa (Ilex guayusa) Amazonian tea for dream work and alertness, ceremonial grade Cacao (Theobroma cacao) for heart-opening ceremonies, and Sassafras (Sassafras albidum) for traditional cleansing.</p>
        </article>
        <article>
          <h3>Traditional Healing & Medicinal Plant Allies</h3>
          <p>Our healing practices honor Blue Lotus (Nymphaea caerulea) used in ancient Egyptian ceremony, Mugwort (Artemisia vulgaris) for dream enhancement and feminine medicine, Damiana (Turnera diffusa) for heart and sensual medicine, Passionflower (Passiflora incarnata) for calming, Kava (Piper methysticum) Pacific Island ceremonial relaxant, Kratom (Mitragyna speciosa) Southeast Asian medicine, Wormwood (Artemisia absinthium) for cleansing, Calamus Root (Sweet Flag, Acorus calamus) for clarity and purification, Coca Leaf (Erythroxylum coca) sacred plant of the Andes, Khat (Catha edulis) East African tradition, and Betel Nut (Areca catechu) Southeast Asian ceremonial stimulant.</p>
        </article>
        <article>
          <h3>Sacred Fungi & Medicinal Mushrooms</h3>
          <p>We honor the Fungi Kingdom including Psilocybin species, Amanita Muscaria (fly agaric) used in Siberian shamanic traditions, and functional medicinal mushrooms Reishi, Lion's Mane, Chaga, Cordyceps, and Turkey Tail for holistic healing support and consciousness expansion.</p>
        </article>
        <article>
          <h3>Find Plant Medicine Ceremonies Near You</h3>
          <p>Temple Mother Earth offers plant medicine ceremonies, ayahuasca retreats, Kambo healing, shamanic ceremonies, and spiritual retreats in Washington DC, the DMV area, and at international retreat locations. Whether you are searching for ayahuasca ceremony near me, Kambo ceremony near me, plant medicine retreat, healing ceremony, spiritual retreat, psychedelic ceremony, shamanic healing, holistic healing, alternative medicine, energy healing, or a sacred healing sanctuary, Temple Mother Earth welcomes you home. We serve communities across the United States, Mexico, Costa Rica, Peru, Colombia, and Brazil with transformational plant medicine experiences, integration circles, and community wellness programs.</p>
        </article>
      </section>
    </div>
  );
};

export default Index;
