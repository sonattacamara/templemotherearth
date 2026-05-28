import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import InternalLinkingFooter from "@/components/InternalLinkingFooter";
import { motion, type Easing } from "framer-motion";
import { Flame, Globe, Users, Heart, Leaf, Sun, ArrowRight, Sparkles, ShieldCheck, MapPin, Star, Eye, Compass, Calendar, Instagram, Facebook, Send, Phone, HeartCrack, CloudFog, Brain, RefreshCw, HandHeart, Home, Sprout, Gift, Camera, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";
import SEOHead from "@/components/SEOHead";
import { usePageTracking } from "@/hooks/useAnalytics";
import EventbriteCTA from "@/components/EventbriteCTA";
import DonationCTA from "@/components/DonationCTA";
import Navigation from "@/components/Navigation";
import MonthlyThemeBanner from "@/components/MonthlyThemeBanner";
import MidImageBanner from "@/components/story/MidImageBanner";
import midHomeImg from "@/assets/image-mid-home.jpg";

import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg-new.jpg";
import homeHeroVideo from "@/assets/video-home-hero.mp4?url";
import ctaFooterImg from "@/assets/cta-footer.jpg";
import sacredSpace from "@/assets/sacred-space.jpg";
import communityImg from "@/assets/community.jpg";
import offeringCeremony from "@/assets/offering-ceremony.jpg";
import offeringRetreat from "@/assets/offering-retreat.jpg";
import offeringTraveling from "@/assets/offering-traveling.jpg";
import offeringPrivate from "@/assets/offering-private.jpg";
import communityCeremonyGroup from "@/assets/upload-community-ceremony.png";
import communityCircleGrass from "@/assets/upload-community-circle.png";
import communityGatheringIndoor from "@/assets/upload-community-group.png";
import communityPorchSelfie from "@/assets/upload-community-selfie.png";
import communityRetreatJungle from "@/assets/upload-community-outdoor-group.png";
import communityJoyBlanket from "@/assets/upload-community-smiles.png";

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
    desc: "Journey with us to Sayulita, Mexico (Oct 31·Nov 7, 2026) and the sacred shores of Costa Rica (Aug 2·8, 2026). Immersive Earth Medicine experiences in breathtaking sacred landscapes.",
    img: offeringRetreat,
    imgAlt: "Life's Best Yes Immersion in Sayulita Mexico and Costa Rica sacred retreat",
    link: "/retreats-inquiry",
    isExternal: false,
    cta: "Explore Immersions",
  },
  {
    icon: Users,
    title: "Traveling Ceremonies",
    desc: "Invite the sacred to your community with ceremonies tailored to your unique path.",
    img: offeringTraveling,
    imgAlt: "Traveling Kambo and Cacao ceremony facilitators bringing sacred Earth Medicine to communities",
    link: "/traveling-ceremonies",
    isExternal: false,
    cta: "Bring Us to You",
  },
  {
    icon: Heart,
    title: "1-on-1 / Private Ceremonies",
    desc: "Experience deeply personal sacred sessions designed around your unique intentions, needs, and path of transformation.",
    img: offeringPrivate,
    imgAlt: "Private Kambo, Hapé, and Bobinsana ceremony session for personal transformation and sacred practice",
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
        title="Temple Mother Earth · Sacred Ceremony · Washington, DC"
        description="508(c)(1)(A) sacred ceremony church in Washington, DC. Earth Medicine ceremony, spiritual education, and congregational community. Est. 2020."
        path="/"
      />
      <Navigation />

      {/* ═══════════════════════════════════════════
          STAGE I · THE CALL
          ═══════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-12 text-center md:min-h-[82vh]"
      >
        <video
          src={homeHeroVideo}
          poster={heroBg}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Lighter overlay so the video reads through the words */}
        <div className="absolute inset-0 bg-foreground/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-foreground/20 pointer-events-none" />

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
            alt="Temple Mother Earth sacred ceremony church logo for Kambo and Earth Medicine sacraments in Washington DC"
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
            You are a sovereign being · whole, divine, and powerful beyond measure. Temple Mother Earth
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
              Discover Your Sacred Blueprint
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

      {/* ───── THREE DOORS · SELF-SELECT ───── */}
      <section aria-labelledby="three-doors-heading" className="relative bg-gradient-warm px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center md:mb-10">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">A Mirror at the Door</p>
            <h2 id="three-doors-heading" className="mt-3 font-display text-2xl font-light leading-tight text-foreground md:text-4xl">
              Which door<br className="md:hidden" /> <em className="font-serif italic text-primary">are you standing at?</em>
            </h2>
            <p className="mx-auto mt-3 max-w-xl font-serif text-sm text-foreground/75 md:text-base">
              Pause. Breathe. Choose the one that feels closest to true · the rest of the path will open from there.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {/* Door 1 · Discerning */}
            <Link
              to="/ceremony-intake"
              className="group relative flex flex-col rounded-2xl border border-primary/20 bg-card/70 p-6 backdrop-blur transition hover:border-primary/60 hover:bg-card md:p-7"
            >
              <Eye className="h-6 w-6 text-primary" />
              <p className="mt-4 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-primary/80">Door One</p>
              <h3 className="mt-2 font-display text-xl font-light text-foreground md:text-2xl">
                <em className="font-serif italic">I'm Listening</em>
              </h3>
              <p className="mt-2 flex-1 font-serif text-sm leading-relaxed text-foreground/80">
                Something has been calling you and you haven't said it out loud yet. Begin with the sacred intake · a quiet way to be heard before you ever walk through our doors.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary transition group-hover:gap-3">
                Begin the sacred intake <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Door 2 · Ready */}
            <Link
              to="/#offerings"
              className="group relative flex flex-col rounded-2xl border border-primary/40 bg-primary/10 p-6 backdrop-blur transition hover:border-primary hover:bg-primary/15 md:p-7"
            >
              <Flame className="h-6 w-6 text-primary" />
              <p className="mt-4 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-primary">Door Two</p>
              <h3 className="mt-2 font-display text-xl font-light text-foreground md:text-2xl">
                <em className="font-serif italic">I'm Ready to Sit</em>
              </h3>
              <p className="mt-2 flex-1 font-serif text-sm leading-relaxed text-foreground/80">
                You already know what is asking to move through you. Find the ceremony that matches the season you are in · Kambo, Hapé, Cacao, Sacred Tea, Yin, or the Sacred Series.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary transition group-hover:gap-3">
                See the sacred calendar <ArrowRight className="h-4 w-4" />
              </span>
            </Link>

            {/* Door 3 · Belonging */}
            <Link
              to="/membership"
              className="group relative flex flex-col rounded-2xl border border-primary/20 bg-card/70 p-6 backdrop-blur transition hover:border-primary/60 hover:bg-card md:p-7"
            >
              <HandHeart className="h-6 w-6 text-primary" />
              <p className="mt-4 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-primary/80">Door Three</p>
              <h3 className="mt-2 font-display text-xl font-light text-foreground md:text-2xl">
                <em className="font-serif italic">I'm Looking for My People</em>
              </h3>
              <p className="mt-2 flex-1 font-serif text-sm leading-relaxed text-foreground/80">
                The work is not meant to be carried alone. Step into the village · a path of belonging, practice, and the souls who are walking this with you.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary transition group-hover:gap-3">
                Walk the membership path <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
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
            Real moments from our ceremonies, immersions, and gatherings · a diverse community united by the path of transformation and higher consciousness.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3">
            {[
              { src: communityCeremonyGroup, alt: "King James in outdoor sacred ceremony with community support at Temple Mother Earth" },
              { src: communityCircleGrass, alt: "Community dialogue circle on the lawn during sacred ceremony integration" },
              { src: communityGatheringIndoor, alt: "Temple Mother Earth group community photo during outdoor gathering" },
              { src: communityPorchSelfie, alt: "Temple Mother Earth community selfie from sacred gathering" },
              { src: communityRetreatJungle, alt: "Community teaching moment outdoors in nature" },
              { src: communityJoyBlanket, alt: "Temple Mother Earth smiling community members in close group portrait" },
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


      {/* ── FIND YOUR PATH · Quick Engagement ── */}
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
          STAGE II · THE AWAKENING
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
            You Are a Sovereign Being
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-10 grid gap-10 md:grid-cols-2 items-center">
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                The Divine resides within you. Whether you call it God, Source, Universe, Spirit, 
                the Most High, the Creator, the Ancestors, the Great Mystery, Jah, Allah, Yahweh, 
                Brahman, the Sacred, or simply Love, that infinite intelligence lives within your 
                very being. You have always had the power to connect to it.
              </p>
              <p>
                At Temple Mother Earth, we hold sacred space for you to remember 
                your own wholeness. Through Earth Medicine, ceremony, and community, 
                we help you reconnect with the divine wisdom that has always been yours.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-[hsl(105,30%,10%)] via-[hsl(105,25%,14%)] to-[hsl(120,20%,8%)] min-h-[20rem] flex items-center justify-center p-10">
              {/* Abstract sacred geometry */}
              <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
                <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden="true">
                  <defs>
                    <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="hsl(45, 70%, 60%)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="hsl(45, 70%, 49%)" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <circle cx="200" cy="200" r="180" fill="url(#goldGlow)" />
                  <g stroke="hsl(45, 70%, 55%)" strokeWidth="0.8" fill="none">
                    <circle cx="200" cy="200" r="60" />
                    <circle cx="200" cy="140" r="60" />
                    <circle cx="200" cy="260" r="60" />
                    <circle cx="148" cy="170" r="60" />
                    <circle cx="252" cy="170" r="60" />
                    <circle cx="148" cy="230" r="60" />
                    <circle cx="252" cy="230" r="60" />
                    <circle cx="200" cy="200" r="120" />
                    <circle cx="200" cy="200" r="160" />
                  </g>
                </svg>
              </div>
              {/* Centered quote */}
              <div className="relative z-10 text-center max-w-md">
                <div className="mx-auto mb-6 h-px w-12 bg-[hsl(45,70%,55%)]" />
                <p className="font-display text-xl md:text-2xl font-light italic text-[hsl(40,30%,92%)] leading-relaxed">
                  "Find your way back home to the wisdom and divine intelligence that exists within your entire being."
                </p>
                <p className="mt-6 font-body text-[10px] font-semibold tracking-[0.3em] uppercase text-[hsl(45,70%,55%)]">
                  You Are a Sovereign Being
                </p>
                <div className="mx-auto mt-6 h-px w-12 bg-[hsl(45,70%,55%)]" />
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
              <span className="font-semibold text-foreground"> we opened ours</span>. There was a great need for community, restoration, 
              and connection to the God within. What began as intimate sacred circles during the darkest days of COVID grew into 
              Temple Mother Earth · a sacred sanctuary where sovereign beings reconnect with the Earth, honor the divine within, 
              and walk the path of transformation together.
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
          STAGE III · CHOOSE YOUR PATH
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
             Whether you are seeking restoration, renewal, grounding, or expansion, Earth Medicine opens a path
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
          STAGE IV · THE TRANSFORMATION
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
              { icon: Heart, title: "Transformation & Growth", desc: "Feel the weight of the past dissolve as you step into your power, guided by the rhythms of the Earth and the sacred within." },
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
          STAGE V · JOIN THE CIRCLE
          ═══════════════════════════════════════════ */}
      <section id="membership" className="relative overflow-hidden px-4 py-14 md:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
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
            Temple Mother Earth is a home for sovereign beings walking the path of transformation, 
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
          STAGE VI · THE INVITATION
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
             Explore our upcoming Earth Medicine ceremonies and community gatherings here in Washington, DC.
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

            {/* Eventbrite CTA */}
            <div className="w-full rounded-xl border border-primary/10 bg-card/30 p-8 text-center space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Browse This Week's Sacred Gatherings
              </h3>
              <p className="mx-auto max-w-md text-sm text-muted-foreground">
                View our full calendar of Earth Medicine ceremonies and community gatherings.
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
            @TempleMotherEarth
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

      {/* ───── VOICES FROM THE CONGREGATION ───── */}
      <section className="bg-background px-4 py-16 md:py-24">
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-center font-body text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Voices from the Congregation
          </motion.p>
          <motion.h2 variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-center font-display text-3xl font-bold text-foreground md:text-5xl">
            Transformation Stories from Our Sacred Community
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-center text-muted-foreground">
            Real reflections from sovereign beings who answered the call. First names only, shared with permission.
          </motion.p>

          <motion.div variants={stagger} className="mt-12 grid gap-6 md:grid-cols-2">
            {[
              {
                quote: "After my first Kambo ceremony, I released grief I had been carrying since childhood. I walked in heavy. I walked out lighter than I have felt in twenty years. The container Temple Mother Earth holds is unlike anything I have experienced.",
                name: "Maya",
                ceremony: "Kambo Ceremony",
                year: "2024",
              },
              {
                quote: "Cacao opened my heart in a way I did not know was possible. I came in skeptical, expecting nothing. I left in tears, finally understanding what it means to feel held by community. I now attend every month.",
                name: "Marcus",
                ceremony: "Cacao Ceremony",
                year: "2023",
              },
              {
                quote: "As a veteran, I had tried everything. Talk therapy, medication, meditation. The Sacred Series gave me back something I did not know I had lost · my sense of belonging on this earth. Dr. Sonatta and King James saved my life.",
                name: "David",
                ceremony: "Veterans Sacred Series",
                year: "2024",
              },
              {
                quote: "The Sacred Tea Ceremony taught me how to slow down. Six years of burnout dissolved over the course of one afternoon. I left with a stillness I now carry into every part of my life.",
                name: "Aisha",
                ceremony: "Sacred Tea Ceremony",
                year: "2025",
              },
            ].map((story) => (
              <motion.div
                key={story.name}
                variants={fadeUp}
                className="rounded-2xl border border-primary/15 bg-card p-7 shadow-sm transition-all hover:border-primary/40 hover:shadow-md"
              >
                <Sparkles className="h-5 w-5 text-primary" aria-hidden />
                <p className="mt-4 font-display italic text-lg text-card-foreground leading-relaxed">
                  &ldquo;{story.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-baseline justify-between border-t border-primary/10 pt-4">
                  <p className="font-body text-sm font-semibold text-foreground">· {story.name}</p>
                  <p className="font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {story.ceremony} · {story.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.p variants={fadeUp} className="mt-10 text-center text-sm text-muted-foreground italic">
            Names changed where requested. Stories shared with the consent of each congregation member.
          </motion.p>
        </motion.div>
      </section>

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
              Philosophy, preparation guidance, pathway maps, and invitations · delivered with intention to your inbox.
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
                   <a href="https://www.amazon.com/hz/wishlist/ls/22FRJ7F629NNE?ref_=wl_share" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"><Gift className="h-4 w-4 text-primary" /> Amazon Wishlist</a>
                   <a href="https://photos.google.com/share/AF1QipMxNzo9_-BFv40HTtnV_hqFcMAWyOMRk1CqLPxveEjV4JeUwkG0Ffw9qJLbgMsTyQ?pli=1&key=ZHVoakpYUnU1RWkydDI3NGJLdGFxckJPdkI0OGpR" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"><Camera className="h-4 w-4 text-primary" /> Share Photos & Videos</a>
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
                    <a href="https://t.me/MensFellowship" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium inline-flex items-center gap-1.5"><Flame className="h-3.5 w-3.5 text-primary" /> Men's Integration Circle</a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 pl-6">A private brotherhood space for reflection, accountability, and sacred practice through "The Cove."</p>
                  </div>
                  <div>
                    <a href="https://t.me/+12lOyLI8QH01NzYx" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium inline-flex items-center gap-1.5"><Moon className="h-3.5 w-3.5 text-primary" /> Wombmen's Integration Circle</a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 pl-6">A sacred sisterhood space for emotional processing, embodiment practices, and mutual support.</p>
                  </div>
                  <div>
                    <a href="https://t.me/+WaG5DTz0HJYzNGNh" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors font-medium inline-flex items-center gap-1.5"><Leaf className="h-3.5 w-3.5 text-primary" /> The Forest Team</a>
                    <p className="text-xs text-muted-foreground/70 mt-0.5 pl-6">Our volunteer and support crew, land stewardship, event setup, and hands-on service to the Temple.</p>
                  </div>
                  <p className="text-xs text-muted-foreground/60 italic mt-1">Private circles are for members only</p>
                </div>
            </div>

          </motion.div>
        </motion.div>
      </section>

      

      <MonthlyThemeBanner />

      <DonationCTA
        eyebrow="Sustain the Sacred"
        headline="Your Offerings Keep the Temple Alive"
        body="As a tax-exempt sacred ceremony church organized under 508(c)(1)(A), every offering sustains ceremonies, community programs, and sacred spaces for kindred spirits everywhere."
        buttonLabel="Offerings & Tithes"
      />

      <MidImageBanner
        image={midHomeImg}
        eyebrow="The Threshold"
        headline={<>The Door Is Open · <em className="font-serif italic text-primary">Walk In</em></>}
        body="You did not arrive here by accident. Something in you has been listening for this. Cross the threshold when you are ready."
        ctaLabel="Begin Your Journey"
        ctaHref="/ceremony-intake"
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
                <a href="https://integration.templemotherearth.org" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary transition-colors">Integration Portal</a>
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

      <InternalLinkingFooter links={[
        { label: "About Us", href: "/about" },
        { label: "Sacred Series", href: "/sacred-series" },
        { label: "Earth Kingdoms", href: "/earth-kingdoms" },
        { label: "Kemetic Teachings", href: "/kemetic-teachings" },
      ]} />

      {/* ───── SEO: Sacred Sacrament Knowledge Base (visually hidden, crawlable) ───── */}
      <section className="sr-only" aria-label="Sacred Earth Medicine Knowledge Base">
        <h2>Sacred Earth Medicines & Sacramental Traditions at Temple Mother Earth</h2>
        <article>
          <h3>Entheogenic Sacred Sacraments</h3>
          <p>Temple Mother Earth honors the ancient traditions of sacred ceremony. Our ceremonies and retreats work with powerful Earth Medicine sacraments including the Vine of the Soul, a sacred ceremonial brew held as sacrament by Amazonian Indigenous congregations for centuries, honored within our legally protected religious practice under RFRA. We recognize the sacred traditions of Peyote (Hikuri), San Pedro (Huachuma), sacred fungi revered across cultures and honored within the Fungi Kingdom of our Five Kingdoms of Medicine theology, Iboga from the Bwiti tradition of Gabon, Salvia Divinorum used by Mazatec ceremonial practitioners, sacred Cannabis used in Rastafari, Hindu, and Sufi traditions, Morning Glory (Ololiuqui), Hawaiian Baby Woodrose, Jurema used in Brazilian Jurema Sagrada traditions, Syrian Rue (Harmal), Yopo and Cohoba, and Cebil (Vilca) from Andean traditions.</p>
        </article>
        <article>
          <h3>Master Plant Teachers & Amazonian Dieta Plants</h3>
          <p>Our facilitators are experienced in the Amazonian plant dieta tradition, working alongside sacred teacher plants including Tobacco and Mapacho the grandfather plant, Bobinsana for heart-opening, Chiric Sanango for emotional restoration and courage, Ajo Sacha garlic vine for spiritual cleansing and protection, Piñón Colorado for purification, Chullachaki Caspi for grounding and strength, Noya Rao the luminescent Tree of Light, Camalonga for dreams and visionary work, and Uchu Sanango for emotional and physical restoration.</p>
        </article>
        <article>
          <h3>Cleansing & Purgative Sacred Sacraments</h3>
          <p>Temple Mother Earth offers Kambo ceremony, sacred frog sacrament for physical purification, emotional clearing, and spiritual transformation. We facilitate Hapé and Rapé ceremonies using sacred tobacco-based snuff blended with tree ashes and ceremonial plants. Our practitioners work with Sananga eye drops for spiritual vision and energetic clearing, Guayusa Amazonian tea for dream work and alertness, ceremonial grade Cacao for heart-opening ceremonies, and Sassafras for traditional cleansing.</p>
        </article>
        <article>
          <h3>Traditional Sacred & Ceremonial Plant Allies</h3>
          <p>Our sacred practices honor Blue Lotus used in ancient Egyptian ceremony, Mugwort for dream enhancement and feminine sacrament, Damiana for heart and sensual sacrament, Passionflower for calming, Kava Pacific Island ceremonial relaxant, Kratom Southeast Asian traditional sacrament, Wormwood for cleansing, Calamus Root for clarity and purification, Coca Leaf sacred plant of the Andes, Khat East African tradition, and Betel Nut Southeast Asian ceremonial sacrament.</p>
        </article>
        <article>
          <h3>Sacred Fungi & Ceremonial Mushrooms</h3>
          <p>We honor the Fungi Kingdom including sacred ceremonial fungi revered across cultures, Amanita Muscaria used in Siberian shamanic traditions, and functional ceremonial mushrooms Reishi, Lion's Mane, Chaga, Cordyceps, and Turkey Tail for holistic wellness support and consciousness expansion.</p>
        </article>
        <article>
          <h3>Find Sacred Ceremonies Near You</h3>
          <p>Temple Mother Earth offers sacred ceremonies, earth medicine retreats, Kambo purification, sacred ceremony gatherings, and spiritual retreats in Washington DC, the DMV area, and at international retreat locations. Whether you are searching for sacred ceremony near you, Kambo ceremony, earth medicine retreat, sacred gathering, spiritual retreat, shamanic ceremony, holistic wellness, alternative sacred practice, energy work, or a sacred sanctuary, Temple Mother Earth welcomes you home. We serve communities across the United States, Mexico, Costa Rica, Peru, Colombia, and Brazil with transformational earth medicine experiences, integration circles, and community wellness programs.</p>
        </article>
      </section>
    </div>
  );
};

export default Index;
