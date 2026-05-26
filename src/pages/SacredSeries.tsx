import { motion, useInView, useScroll, useTransform } from "framer-motion";
import InternalLinkingFooter from "@/components/InternalLinkingFooter";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart, Leaf, Sun, Moon, Sparkles, Shield, Star, Users,
  Calendar, Clock, Music, Palette, Mountain, Coffee, Flame,
  ChevronDown, ArrowRight, Gem, Crown, FileText
} from "lucide-react";
import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import { Helmet } from "react-helmet-async";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import MonthlyThemeCard from "@/components/sanctuary/MonthlyThemeCard";
import sanctuaryDay1CacaoPods from "@/assets/sanctuary-day1-cacao-pods.png";
import sanctuaryDay2HapeCeremony from "@/assets/sanctuary-day2-hape-ceremony.png";
import sanctuaryDay3SacredTea from "@/assets/sanctuary-day3-sacred-tea.png";
import level5Initiation from "@/assets/level5-initiation.png";
import sanctuaryDay5Spa from "@/assets/sanctuary-day5-spa.png";
import kamboFrogArt from "@/assets/kambo-frog-art.png";
import sacredSeriesHeroVideo from "@/assets/video-sacred-series-hero.mp4?url";

const SACRED_SERIES_EVENTBRITE = "https://www.eventbrite.com/e/sacred-series-week-vol-5-new-earth-rising-registration-1985533292527?aff=ebdsoporgprofile";

const sacredSeriesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "The Sacred Series · 7 Days of Ceremony",
  description:
    "A recurring 7-day arc of sacramental ceremonies, community gatherings, and body practices at Temple Mother Earth, Washington DC. Cacao, Hapé, Sacred Tea, Sacred Fungi, Kambo, and more.",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventSchedule: {
    "@type": "Schedule",
    repeatFrequency: "P1M",
    byMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  },
  location: {
    "@type": "Place",
    name: "Temple Mother Earth",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2415 32nd St SE",
      addressLocality: "Washington",
      addressRegion: "DC",
      addressCountry: "US",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Temple Mother Earth",
    url: "https://templemotherearth.org",
  },
  url: "https://templemotherearth.org/sacred-series",
  offers: {
    "@type": "Offer",
    url: SACRED_SERIES_EVENTBRITE,
    availability: "https://schema.org/InStock",
    category: "Donation / Sacred Reciprocity",
  },
  image: "https://templemotherearth.org/og-logo.png",
};

/* ─── Timeline Day Data ─── */
interface TimelineDay {
  day: number;
  date: string;
  weekday: string;
  name: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaReady: boolean;
  slug: string;
  image: string;
  imagePosition?: string;
  phase: string;
}

const timelineDays: TimelineDay[] = [
  {
    day: 1, date: "", weekday: "", name: "Cacao Community Ceremony",
    subtitle: "Your Heart Already Knows the Way",
    description: "Sacred ceremonial cacao, live sound, and community circle. The gentlest entry point, and for many, the most unexpectedly profound. All welcome.",
    icon: <Heart className="h-5 w-5" />, tags: ["Community", "All Welcome", "Heart"],
    ctaLabel: "Reserve Your Place", ctaHref: SACRED_SERIES_EVENTBRITE, ctaReady: true,
    slug: "/cacao", image: sanctuaryDay1CacaoPods, imagePosition: "center 56%",
    phase: "The Opening",
  },
  {
    day: 2, date: "", weekday: "", name: "Hapé Community Ceremony",
    subtitle: "The Noise Stops. You Remember.",
    description: "Sacred Amazonian snuff ceremony for grounding, mental clarity, and purification. The forest has been waiting for you.",
    icon: <Leaf className="h-5 w-5" />, tags: ["Grounding", "Clarity", "Forest"],
    ctaLabel: "Reserve Your Place", ctaHref: SACRED_SERIES_EVENTBRITE, ctaReady: true,
    slug: "/hape", image: sanctuaryDay2HapeCeremony, imagePosition: "center 38%",
    phase: "The Opening",
  },
  {
    day: 3, date: "", weekday: "", name: "Sacred Tea Ceremony",
    subtitle: "The Door Has Always Been There",
    description: "A sacred doorway for remembrance. Come exactly as you are, and let the sacrament meet the part of you that is ready to listen.",
    icon: <Coffee className="h-5 w-5" />, tags: ["Signature", "Tiered", "Pre-Screening"],
    ctaLabel: "Reserve Your Place", ctaHref: SACRED_SERIES_EVENTBRITE, ctaReady: true,
    slug: "/sacred-tea", image: sanctuaryDay3SacredTea, imagePosition: "center 58%",
    phase: "The Opening",
  },
  {
    day: 4, date: "", weekday: "", name: "Level 5 · The Complete Initiation",
    subtitle: "You Have Not Come This Far to Stop Here",
    description: "Every sacrament. One full-day container. Kambo included. For those who are genuinely ready to go all the way. By application only.",
    icon: <Flame className="h-5 w-5" />, tags: ["Advanced", "Kambo", "Application Required"],
    ctaLabel: "Apply Through Eventbrite", ctaHref: SACRED_SERIES_EVENTBRITE, ctaReady: true,
    slug: "/level5", image: level5Initiation, imagePosition: "center 50%",
    phase: "The Initiation",
  },
  {
    day: 5, date: "", weekday: "", name: "Inner Alchemy Wellness Spa Day",
    subtitle: "Your Body Has Been Waiting for This Day",
    description: "A full day of body practices, sound ceremony, sacred nourishment, yoga, and ceremonial closing. From sunrise to sunset, every moment held.",
    icon: <Sun className="h-5 w-5" />, tags: ["Full Day", "Restoration", "Body"],
    ctaLabel: "Reserve Your Place", ctaHref: SACRED_SERIES_EVENTBRITE, ctaReady: true,
    slug: "/spa", image: sanctuaryDay5Spa, imagePosition: "center 62%",
    phase: "The Rest",
  },
  {
    day: 6, date: "", weekday: "", name: "Community Integration Potluck",
    subtitle: "You Are Already Part of This Family",
    description: "Integration circle, Sacred Tea House open all evening, and a potluck table where the conversation goes somewhere real. Bring a dish. Come as you are.",
    icon: <Users className="h-5 w-5" />, tags: ["Free", "Everyone Welcome", "Community"],
    ctaLabel: "Reserve Your Place", ctaHref: SACRED_SERIES_EVENTBRITE, ctaReady: true,
    slug: "/potluck", image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    phase: "The Belonging",
  },
  {
    day: 7, date: "", weekday: "", name: "Sacred Yin Yoga",
    subtitle: "You Already Know How to Surrender",
    description: "90 minutes of ceremonial yin yoga with sound ceremony and breathwork. Not exercise, ceremony in the body. All levels welcome.",
    icon: <Mountain className="h-5 w-5" />, tags: ["All Levels", "Sound", "Nervous System"],
    ctaLabel: "Reserve Your Place", ctaHref: SACRED_SERIES_EVENTBRITE, ctaReady: true,
    slug: "/yin-yoga", image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    phase: "The Integration",
  },
];

/* ─── Timeline Node Component ─── */
const TimelineNode = ({ day, index }: { day: TimelineDay; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-0 md:gap-8">
      {/* Left content (desktop) */}
      <div className={`hidden md:block w-[calc(50%-40px)] ${isLeft ? "" : "order-3"}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TimelineCard day={day} />
          </motion.div>
        )}
      </div>

      {/* Center line + dot */}
      <div className="hidden md:flex flex-col items-center w-[80px] shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, type: "spring" }}
          className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[hsl(45,70%,49%)] bg-[hsl(114,36%,10%)]"
        >
          <span className="text-[hsl(45,70%,49%)]">{day.icon}</span>
        </motion.div>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-[2px] flex-1 bg-gradient-to-b from-[hsl(45,70%,49%)] to-[hsla(45,70%,49%,0.1)] origin-top"
        />
      </div>

      {/* Right content (desktop) */}
      <div className={`hidden md:block w-[calc(50%-40px)] ${isLeft ? "order-3" : ""}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <TimelineCard day={day} />
          </motion.div>
        )}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex gap-4 w-full">
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, type: "spring" }}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[hsl(45,70%,49%)] bg-[hsl(114,36%,10%)]"
          >
            <span className="text-[hsl(45,70%,49%)]">{day.icon}</span>
          </motion.div>
          <div className="w-[2px] flex-1 bg-gradient-to-b from-[hsl(45,70%,49%)] to-[hsla(45,70%,49%,0.1)]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex-1 pb-10"
        >
          <TimelineCard day={day} />
        </motion.div>
      </div>
    </div>
  );
};

/* ─── Timeline Card ─── */
const TimelineCard = ({ day }: { day: TimelineDay }) => (
  <Link
    to={day.slug}
    className="group block bg-[hsl(105,30%,12%)] border border-[hsl(100,25%,18%)] hover:border-[hsl(45,50%,40%)] transition-all overflow-hidden"
  >
    <img
      src={day.image}
      alt={day.name}
      className="w-full h-[180px] object-cover saturate-[0.7] brightness-[0.8] group-hover:saturate-[0.9] group-hover:brightness-[0.9] transition-[filter] duration-400"
      style={day.imagePosition ? { objectPosition: day.imagePosition } : undefined}
      loading="lazy"
    />
    <div className="p-5 md:p-6">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(45,70%,49%)]">
          {day.phase}
        </span>
      </div>
      <span className="inline-block font-sans text-[7px] tracking-[2px] uppercase px-2 py-0.5 mb-3 border border-[hsla(45,70%,49%,0.25)] text-[hsl(45,60%,55%)]">
        {day.phase}
      </span>
      <h3 className="font-sans text-[13px] font-light text-[hsl(40,30%,90%)] mb-1.5 leading-tight">
        {day.name}
      </h3>
      <p className="font-serif italic text-[14px] text-[hsl(45,60%,55%)] mb-3">
        {day.subtitle}
      </p>
      <p className="text-[14px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-4">
        {day.description}
      </p>
      <div className="flex gap-2 flex-wrap mb-4">
        {day.tags.map((tag) => (
          <span key={tag} className="font-sans text-[7px] tracking-[2px] uppercase border border-[hsl(100,20%,22%)] text-[hsl(35,20%,50%)] px-2.5 py-1">
            {tag}
          </span>
        ))}
      </div>
      {day.ctaReady ? (
        <a
          href={day.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block text-center font-sans text-[8px] tracking-[2px] uppercase py-3 px-5 border border-[hsl(45,50%,35%)] text-[hsl(45,70%,49%)] hover:bg-[hsl(45,70%,49%)] hover:text-[hsl(105,30%,5%)] transition-all"
        >
          {day.ctaLabel} <ArrowRight className="inline h-3 w-3 ml-1" />
        </a>
      ) : (
        <span className="block text-center font-sans text-[8px] tracking-[2px] uppercase py-3 px-5 border border-[hsl(100,20%,22%)] text-[hsl(35,20%,42%)]">
          Eventbrite Coming Soon
        </span>
      )}
    </div>
  </Link>
);

/* ─── Phase Marker ─── */
const PhaseMarker = ({ title, days }: { title: string; days: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 py-8 md:justify-center"
    >
      <div className="h-px flex-1 md:max-w-[120px] bg-[hsla(45,70%,49%,0.2)]" />
      <div className="text-center">
        <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)]">{days}</p>
        <p className="font-serif italic text-xl text-[hsl(45,70%,55%)] mt-1">{title}</p>
      </div>
      <div className="h-px flex-1 md:max-w-[120px] bg-[hsla(45,70%,49%,0.2)]" />
    </motion.div>
  );
};

/* ─── Main Page ─── */
const SacredSeries = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <SacredSeriesLayout
      title="The Sacred Series · 7 Days of Ceremony"
      description="The Sacred Series: a recurring 7-day arc of sacramental ceremonies, community gatherings, and body practices at Temple Mother Earth, Washington DC. Cacao, Hapé, Sacred Tea, Sacred Fungi, and more."
      path="/sacred-series"
      showBackLink={false}
    >
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(sacredSeriesJsonLd)}</script>
      </Helmet>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative isolate min-h-screen flex flex-col justify-end px-6 md:px-12 py-16 md:py-20 overflow-hidden bg-[hsl(114,36%,5%)]">
        <video
          src={sacredSeriesHeroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover saturate-50 brightness-[0.45] z-0"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[hsla(114,36%,10%,0.97)] via-[hsla(114,36%,10%,0.7)] to-[hsla(114,36%,10%,0.3)] pointer-events-none" />
        <motion.div className="relative z-10 max-w-[860px]" style={{ opacity: heroOpacity, y: heroY }}>
          <span className="inline-block bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] font-sans text-[8px] tracking-[4px] uppercase px-5 py-2 mb-8">
            Sacred Series · Seven Days
          </span>
          <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,55%)] mb-4">
            Temple Mother Earth · Washington, DC
          </p>
          <h1 className="font-sans text-[clamp(40px,7vw,88px)] font-extralight leading-none text-[hsl(40,30%,92%)] mb-6 tracking-tight">
            Sacred<br />
            <em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Series</em>
          </h1>
          <p className="font-serif italic text-[clamp(18px,2vw,24px)] text-[hsl(35,30%,72%)] max-w-[580px] leading-relaxed mb-6">
            A living 7-day sanctuary rhythm for the soul who is ready to be witnessed, held, and reminded that they already belong. Each doorway stands on its own. Choose what calls your body, soul, and spirit.
          </p>
          <p className="font-serif text-[16px] text-[hsl(35,20%,55%)] max-w-[520px] leading-relaxed mb-12">
            This month’s circle is New Earth Rising · a call for those who can feel something changing within them and want to rise in community, not isolation.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#timeline" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all">
              Explore the Seven Days
            </a>
            <a href="#monthly-themes" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-transparent border border-[hsla(45,70%,49%,0.5)] text-[hsl(45,70%,55%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all">
              See What's Happening This Month
            </a>
          </div>
        </motion.div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="h-6 w-6 text-[hsl(45,70%,49%)] opacity-50" />
        </motion.div>
      </section>



      {/* ═══ INTERACTIVE TIMELINE ═══ */}
      <section id="timeline" className="px-6 md:px-12 py-16 md:py-24 max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">The Journey</p>
          <h2 className="font-sans text-[clamp(28px,4vw,48px)] font-extralight text-[hsl(40,30%,92%)] leading-tight">
            The Arc of<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Seven Days</em>
          </h2>
          <p className="font-serif italic text-[19px] text-[hsl(35,30%,68%)] max-w-[640px] mx-auto mt-6 leading-relaxed">
            The arc is intentional. Like the seasons, each ceremony opens what the next one deepens. Your nervous system needs time between thresholds, your spirit needs community to land in, and your body needs rest before it can rise again. This is a living container, held by the people who walked it before you, designed to honor exactly where you are in your becoming.
          </p>
        </div>

        <PhaseMarker title="The Opening" days="Days 1·3" />
        {timelineDays.slice(0, 3).map((day, i) => (
          <TimelineNode key={day.day} day={day} index={i} />
        ))}

        <PhaseMarker title="The Initiation" days="Day 4" />
        <TimelineNode day={timelineDays[3]} index={3} />

        <PhaseMarker title="The Rest" days="Day 5" />
        <TimelineNode day={timelineDays[4]} index={4} />

        <PhaseMarker title="The Belonging" days="Day 6" />
        <TimelineNode day={timelineDays[5]} index={5} />

        <PhaseMarker title="The Integration" days="Day 7" />
        <TimelineNode day={timelineDays[6]} index={6} />
      </section>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ FIVE PILLARS ═══ */}
      <SanctuarySection eyebrow="Our Sacred Approach" title={<>Five Pillars of<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">The Sanctuary Experience</em></>}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0.5">
          {[
            { num: "01", title: "7-Ceremony Arc", desc: "A rhythmic, continuous journey designed to honor your natural process of becoming.", icon: <Calendar className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            { num: "02", title: "Expert Facilitation", desc: "A collaborative, heart-led team holding a steady space for your unfolding growth.", icon: <Shield className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            { num: "03", title: "Extended Integration", desc: "Guidance that walks beside you for 6+ months as you ground your transformation.", icon: <Heart className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            { num: "04", title: "Intimate Cohorts", desc: "Small circles of 12 to 20, fostering true community, belonging, and shared wisdom.", icon: <Users className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            { num: "05", title: "Trauma-Informed", desc: "A compassionate, tailored approach that honors exactly where you are today.", icon: <Sparkles className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
          ].map((pillar) => (
            <div key={pillar.num} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-7">
              <div className="mb-3">{pillar.icon}</div>
              <p className="font-sans text-2xl font-extralight text-[hsla(45,70%,49%,0.3)] mb-2">{pillar.num}</p>
              <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(40,30%,90%)] mb-2">{pillar.title}</h3>
              <p className="text-[14px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </SanctuarySection>



      {/* ═══ DAILY RHYTHM ═══ */}
      <SanctuarySection eyebrow="The Daily Rhythm" title={<>A Day in<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">the Sacred Series</em></>}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
          {[
            { time: "6:00 AM", title: "Rise & Grounding", desc: "Greet the dawn with intentionality. Sip herbal tea as you settle into stillness, meditation, and the quiet beauty of your own inner alignment.", icon: <Sun className="h-4 w-4" /> },
            { time: "7:30 AM", title: "Nourishment", desc: "Gather for a wholesome, plant-based breakfast. Honor your vessel with food prepared with love.", icon: <Leaf className="h-4 w-4" /> },
            { time: "9:00 AM", title: "Opening the Space", desc: "We come together to share our truth and receive guided wisdom, honoring both your voice and the collective.", icon: <Users className="h-4 w-4" /> },
            { time: "12:00 PM", title: "Communal Lunch", desc: "A time to reconnect, rest, and allow the morning's insights to settle.", icon: <Coffee className="h-4 w-4" /> },
            { time: "2:00 PM", title: "Integration & Flow", desc: "Enjoy nature, reflection, or gentle bodywork as you integrate these new energies at your own pace.", icon: <Mountain className="h-4 w-4" /> },
            { time: "5:00 PM", title: "Evening Preparation", desc: "Intentional grounding practices help prepare your spirit for the evening's work.", icon: <Moon className="h-4 w-4" /> },
            { time: "7:00 PM", title: "Sacred Gathering", desc: "We converge for ceremony or heart-centered connection, the heartbeat of our time together.", icon: <Sparkles className="h-4 w-4" /> },
            { time: "9:30 PM", title: "Gentle Wind Down", desc: "Soft reflection and journaling to honor the day. Rest deeply, knowing you are held.", icon: <Star className="h-4 w-4" /> },
          ].map((slot) => (
            <div key={slot.time} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-7 flex gap-5">
              <div className="flex flex-col items-center gap-2 pt-1">
                <span className="text-[hsl(45,70%,49%)]">{slot.icon}</span>
                <p className="font-sans text-[10px] tracking-[2px] text-[hsl(45,70%,49%)] whitespace-nowrap">{slot.time}</p>
              </div>
              <div>
                <h3 className="font-sans text-[11px] tracking-[1px] uppercase text-[hsl(40,30%,90%)] mb-2">{slot.title}</h3>
                <p className="text-[15px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{slot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SanctuarySection>

      {/* ═══ MONTHLY THEMES / SACRED CALENDAR ═══ */}
      <section id="monthly-themes" className="px-6 md:px-12 py-20 md:py-28 bg-[hsl(105,30%,8%)] scroll-mt-20">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">Sacred Series · Monthly Themes</p>
            <h2 className="font-sans text-[clamp(28px,4vw,48px)] font-extralight text-[hsl(40,30%,92%)] leading-tight">
              The Sacred<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Calendar</em>
            </h2>
            <p className="font-serif italic text-[19px] text-[hsl(35,30%,68%)] max-w-[580px] mx-auto mt-6 leading-relaxed">
              Each month carries its own spiritual theme · a lens through which every ceremony, gathering, and practice is held.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {[
              {
                month: "April 2026", theme: "The Awakening", icon: <Sun className="h-6 w-6" />,
                desc: "The doors swing open after the long winter rest. Your body has been waiting. Your spirit has been waiting. This is your reentry into yourself.",
                backContent: [
                  "April is the Grand Reopening · the first Sacred Series of the year. The energy in the temple is electric. New beginnings are sacred here.",
                  "Cacao opens the heart you closed during the cold months. Hapé clears the static so you can hear your own voice again. Sacred Tea invites you deeper than thought.",
                  "If you missed last year · this is the month to come home. The souls who arrive in April set the tone for everything that follows.",
                ],
              },
              {
                month: "May 2026", theme: "The Remembrance", icon: <Moon className="h-6 w-6" />,
                desc: "We return to what the body already knows. Ancestral wisdom rises. This month we honor lineage, memory, and the prayers that carried us here.",
                backContent: [
                  "May invites us to look backward before moving forward · to honor the ancestors, the lineages, and the unseen hands that guide this work.",
                  "Ceremonies deepen into ancestral connection, grief tending, and the remembrance of who you were before the world told you to forget.",
                  "The Sacred Tea Ceremony becomes the month's anchor · a doorway into the deeper layers of memory held in your body and spirit.",
                ],
              },
              {
                month: "June 2026", theme: "The Sovereignty", icon: <Crown className="h-6 w-6" />,
                desc: "You are the authority of your own becoming. This month we honor the sacred autonomy of every soul who walks through the temple doors.",
                backContent: [
                  "June is the month of standing fully in your own power. No guru. No intermediary. The divine speaks directly through you.",
                  "This month's ceremonies focus on boundaries, self-trust, and the courage to claim your own spiritual authority.",
                  "Level 5 · The Complete Initiation · finds its deepest expression here, as souls step fully into their sovereignty.",
                ],
              },
              {
                month: "July 2026", theme: "The Belonging", icon: <Users className="h-6 w-6" />,
                desc: "You were never meant to do this alone. This is the month the circle widens, the table lengthens, and the family you didn't know you were missing finds you.",
                backContent: [
                  "July is when the temple breathes its fullest. The Community Potluck, the Sacred Art Expo, the extended Tea House evenings · the whole family comes home.",
                  "Alumni return to break bread with new souls. Stories are exchanged. Phone numbers are exchanged. Lifelong friendships begin around our long wooden table.",
                  "If you have ever felt spiritually homeless · July is the month you stop looking. Your people are already here, saving you a seat.",
                ],
              },
              {
                month: "August 2026", theme: "The Harvest", icon: <Leaf className="h-6 w-6" />,
                desc: "The seeds planted in spring bear fruit. This month we honor the abundance that arrives when you stay on the path long enough to receive it.",
                backContent: [
                  "August is the month of receiving · of allowing the work you have done to show itself in your body, your relationships, and your clarity.",
                  "Ceremonies focus on gratitude, embodiment, and the sacred art of allowing blessings to land without deflecting them.",
                  "Alumni share their harvest stories. The circle witnesses each person's growth as a sacrament in itself.",
                ],
              },
              {
                month: "September 2026", theme: "The Threshold", icon: <Flame className="h-6 w-6" />,
                desc: "The light begins to shift. This month we honor the courage it takes to stand at the doorway between who you have been and who you are becoming.",
                backContent: [
                  "September marks the Autumn Equinox · the balance point. Equal light, equal dark. A time to assess what must be released before winter.",
                  "Kambo and Level 5 carry particular power this month as souls are invited to burn away what no longer serves their becoming.",
                  "The temple holds a special equinox ceremony to honor the turning of the wheel and the sacred act of letting go.",
                ],
              },
              {
                month: "October 2026", theme: "The Ancestors", icon: <Star className="h-6 w-6" />,
                desc: "The veil thins. The ones who walked before you draw close. This is the month they speak · and the month you finally have the stillness to listen.",
                backContent: [
                  "October is the most mystical month in the temple year. Sacred Tea and Hapé carry prayers across the veil. The grandmothers and grandfathers come close.",
                  "Souls consistently report October ceremonies as the most spiritually profound of the year. Lineages are honored. Names are spoken. Burdens long carried are finally laid down.",
                  "The Sacred Art Expo turns visionary · paintings, songs, and prayers born from dreams and ancestral communion. This is not a month to miss.",
                ],
              },
              {
                month: "November 2026", theme: "The Gratitude", icon: <Heart className="h-6 w-6" />,
                desc: "Before the temple closes, we give thanks. This month we honor every breath, every tear, every breakthrough, and every soul who walked through the doors.",
                backContent: [
                  "November is the temple's season of thanksgiving · not a holiday, but a living practice of radical gratitude for the year's journey.",
                  "Community Potluck becomes the centerpiece, expanding into a full day of shared nourishment, story, and celebration.",
                  "Integration circles deepen as the year's participants reflect on the distance traveled from their first ceremony to now.",
                ],
              },
              {
                month: "December 2026", theme: "The Surrender", icon: <Sparkles className="h-6 w-6" />,
                desc: "The longest night approaches. This month we honor the sacred act of release · trusting that what dies in the dark will be reborn in the light.",
                backContent: [
                  "December holds the final ceremonies before the Winter Solstice closing. Every offering carries the weight of completion and the tenderness of farewell.",
                  "The closing ceremony marks the moment the temple turns inward. Candles are lit. Prayers are spoken. The doors close gently.",
                  "What was planted in April's Awakening finds its resting place here. The cycle is complete. The Earth exhales. And so do we.",
                ],
              },
            ].map((item, i) => (
              <MonthlyThemeCard key={item.month} {...item} index={i} />
            ))}
          </div>
          <p className="text-center font-sans text-[8px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mt-8">
            Each month revealed as the previous one closes · The arc is sacred
          </p>
        </div>
      </section>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ SACRED REST ═══ */}
      <SanctuarySection eyebrow="The Rhythm of the Temple" title={<>Why We Close<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">After the Winter Solstice</em></>}>
        <div className="text-xl leading-[1.85] text-[hsl(35,30%,68%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
          <p>Every year after the Winter Solstice, Temple Mother Earth enters a period of <strong className="text-[hsl(40,30%,90%)]">Sacred Rest</strong>. We close our doors to the public. Ceremonies pause. The outward work stops.</p>
          <p>This is not a break. This is the work. The land rests. The facilitators restore. The founders recalibrate the vision, refine the protocols, study, pray, and prepare.</p>
          <p>Between the Winter Solstice and the return of spring light, the Temple does what the Earth does: it goes inward. And then, when the community is called forward again, <strong className="text-[hsl(40,30%,90%)]">we open the doors with intention.</strong></p>
        </div>
        <div className="max-w-[760px] mx-auto mt-12 border border-[hsla(45,70%,49%,0.35)] bg-[hsla(45,70%,49%,0.06)] p-8 md:p-10 text-center">
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,55%)] mb-3">Important · Mark Your Calendar</p>
          <h3 className="font-serif italic text-[22px] md:text-[26px] text-[hsl(40,30%,92%)] leading-snug mb-4">
            The Temple honors sacred rest after Winter Solstice and reopens with the spring season
          </h3>
          <p className="text-[16px] text-[hsl(35,30%,72%)] leading-relaxed font-serif mb-6">
            Beginning November, we begin gently preparing our community for the three sacred months of rest. Plan your final ceremonies of the year by November. Use the winter for inward integration. Then return to us in the spring, restored.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#monthly-themes"
              className="inline-block font-sans text-[8px] tracking-[3px] uppercase px-7 py-3 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all"
            >
              View the Sacred Calendar
            </a>
            <Link
              to="/contact"
              className="inline-block font-sans text-[8px] tracking-[3px] uppercase px-7 py-3 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,55%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all"
            >
              Get Reopening Notification
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mt-16">
          {[
            { icon: <Moon className="h-8 w-8 text-[hsl(45,70%,49%)]" />, title: "Winter Solstice · The Closing", desc: "The shortest day. The deepest night. We honor this by closing public ceremonies and turning inward. Facilitator training, sacred study, land stewardship, and internal ceremony take place during this time." },
            { icon: <Sun className="h-8 w-8 text-[hsl(45,70%,49%)]" />, title: "Spring Season · The Reopening", desc: "When the light returns, the Temple opens its public circle again. The Sacred Series becomes a declaration that the community is ready to gather, remember, and rise together." },
          ].map((card) => (
            <div key={card.title} className="bg-[hsl(105,30%,12%)] p-10 border border-[hsla(45,70%,49%,0.12)]">
              <div className="mb-4">{card.icon}</div>
              <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3 font-normal">{card.title}</h3>
              <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{card.desc}</p>
            </div>
          ))}
        </div>
      </SanctuarySection>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ FIRST CEREMONY ═══ */}
      <SanctuarySection eyebrow="Your First Ceremony" title={<>A Gentle<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Opening</em></>}>
        <div className="text-xl leading-[1.85] text-[hsl(35,30%,68%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
          <p>We understand that the call to sacred practice can bring both excitement and hesitation. Your first experience is designed to be a gentle, nourishing invitation to connect with your inner truth.</p>
          <p>Many souls find that their fears soften into peace once they are held within our circle. You are deeply welcomed here, exactly as you are.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-12">
          {[
            { num: "01", title: "Before Ceremony", items: ["Arrive as you are, 30 minutes early to settle in", "A dedicated facilitator holds the container for your entire journey", "Your agency is sacred. You remain the sovereign of your experience"], icon: <Clock className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            { num: "02", title: "During Ceremony", items: ["We hold space for your questions with patience and care", "Rest in the embrace of a compassionate circle", "You are free to move, rest, or step away whenever you feel called"], icon: <Heart className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            { num: "03", title: "After Ceremony", items: ["Join us in a circle of shared presence and soft integration", "Time is held for you to rest, journal, and honor your inner blossoming", "We prepare you with care for your return to daily life"], icon: <Sparkles className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
          ].map((step) => (
            <div key={step.num} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-8">
              <div className="mb-3">{step.icon}</div>
              <p className="font-sans text-2xl font-extralight text-[hsla(45,70%,49%,0.3)] mb-2">{step.num}</p>
              <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(40,30%,90%)] mb-4">{step.title}</h3>
              <ul className="space-y-3">
                {step.items.map((item) => (
                  <li key={item} className="text-[14px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SanctuarySection>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ TESTIMONIALS ═══ */}
      <SanctuarySection eyebrow="Echoes of Others Who Walked This Path" title={<>In Their<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Own Words</em></>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {[
            "I arrived with so much fear, but I was met with such warmth that I realized I could finally exhale.",
            "I thought I had to be perfect. Instead, I found permission to be human, and that was the true release.",
            "The safety of the group helped me touch parts of myself I had long kept hidden.",
          ].map((quote) => (
            <blockquote key={quote} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-8">
              <p className="font-serif italic text-[17px] text-[hsl(40,30%,85%)] leading-[1.7]">"{quote}"</p>
            </blockquote>
          ))}
        </div>
      </SanctuarySection>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ SACRED PATHWAYS PRICING (moved to bottom) ═══ */}
      <SanctuarySection eyebrow="Sacred Pathways" title={<>Find Your<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Pathway of Participation</em></>}>
        <p className="text-center text-[19px] text-[hsl(35,30%,68%)] leading-relaxed font-serif max-w-[640px] mx-auto mb-12">
          The Sacred Series is a recurring 7-day series of sacred ceremonies, body practices, and community gatherings. Each offering is its own doorway. Choose the path your spirit is ready to walk.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
          {[
            { title: "New Earth Rising", subtitle: "Current monthly theme" },
            { title: "Seven-Day Arc", subtitle: "A complete rhythm of deepening" },
            { title: "Weekend Immersion", subtitle: "3 Days of Presence" },
            { title: "Day Experience", subtitle: "A Sacred Entry Point" },
          ].map((path) => (
            <div key={path.title} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-8 text-center">
              <p className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3">{path.title}</p>
              <p className="font-serif text-[15px] text-[hsl(35,30%,68%)]">{path.subtitle}</p>
            </div>
          ))}
        </div>
        <p className="text-center font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mt-8">
          <Link to="/community-care" className="text-[hsl(45,70%,49%)] hover:underline">Community Care Model applies</Link> · Scholarship available for genuine hardship
        </p>
      </SanctuarySection>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ SACRED SERIES INVITATION · APPLY ONLY ═══ */}
      <section
        id="apply"
        className="bg-gradient-to-br from-[hsl(105,30%,13%)] via-[hsl(110,25%,11%)] to-[hsl(114,36%,10%)] border-t border-b border-[hsla(45,70%,49%,0.15)] py-20 md:py-24 px-6 md:px-12 text-center"
      >
        <div className="max-w-[860px] mx-auto">
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-6">By Application Only</p>
          <h2 className="font-sans text-[clamp(24px,4vw,52px)] font-extralight leading-[1.05] mb-6 text-[hsl(40,30%,92%)]">
            The Sacred Series<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Invitation</em>
          </h2>
          <p className="text-xl text-[hsl(35,30%,68%)] leading-relaxed max-w-[640px] mx-auto mb-12 font-serif">
            The Sacred Series is held in sacred trust with each soul. Before we discuss anything practical, we want to meet you, understand your readiness, and ensure this container is the right fit for your spirit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mb-12 text-left">
            {[
              { title: "Step 1 · Sacred Intake", desc: "Complete the medical and spiritual intake form so our facilitators can understand who you are and how to hold you.", icon: <FileText className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
              { title: "Step 2 · 1:1 Discernment Call", desc: "A heart-to-heart conversation with Sonatta or James to feel into mutual readiness.", icon: <Heart className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
              { title: "Step 3 · Sacred Reciprocity", desc: "Once accepted, we share the energy exchange privately and walk you through the Community Care tiers · including scholarship.", icon: <Star className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
              { title: "Step 4 · Begin Preparation", desc: "Receive the preparation guide, dietary protocols, and 1:1 integration support · held from beginning to end.", icon: <Sparkles className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            ].map((item) => (
              <div key={item.title} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-7 flex gap-4">
                <div className="mt-1 shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-2.5 font-normal">{item.title}</h4>
                  <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ceremony-intake" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all">
              Begin Your Application
            </Link>
            <Link to="/contact" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,55%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all">
              Speak With Us First
            </Link>
          </div>
          <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mt-6">
            Limited to 8 souls · <Link to="/community-care" className="text-[hsl(45,70%,49%)] hover:underline">Sacred Reciprocity</Link> · Scholarships available
          </p>
        </div>
      </section>

      {/* ═══ COMMUNITY CARE SUMMARY (moved to bottom) ═══ */}
      <SanctuarySection id="care" eyebrow="Everything is Energy" title={<>Community<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Care Model</em></>}>
        <div className="text-center max-w-[600px] mx-auto">
          <p className="text-[19px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-10">
            Three tiers so ceremony is accessible to all who are genuinely called. No one is turned away for lack of funds.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-4">
          {[
            { title: "Sustainer", desc: "Full suggested contribution. Your full payment supports someone who cannot.", icon: <Shield className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            { title: "Community", desc: "Reduced contribution. For those who are working but genuinely strained. No explanation required.", featured: true, icon: <Users className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
            { title: "Scholarship", desc: "For genuine hardship. Funded by our TOME 508(c)(1)(A) scholarship fund.", icon: <Heart className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
          ].map((tier) => (
            <div key={tier.title} className={`p-8 bg-[hsl(105,30%,12%)] border ${tier.featured ? "border-[hsla(45,70%,49%,0.35)]" : "border-[hsla(45,70%,49%,0.12)]"}`}>
              <div className="mb-3">{tier.icon}</div>
              <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3">{tier.title}</h3>
              <p className="text-[15px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{tier.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/community-care"
            className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all"
          >
            Learn More About Community Care
          </Link>
        </div>
      </SanctuarySection>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-20 md:py-28 px-6 md:px-12 text-center bg-gradient-to-t from-[hsl(105,30%,8%)] to-[hsl(114,36%,10%)]">
        <div className="max-w-[640px] mx-auto">
          <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-6">Your Soul Knows</p>
          <h2 className="font-sans text-[clamp(28px,4.5vw,56px)] font-extralight leading-[1.05] text-[hsl(40,30%,92%)] mb-6">
            Will You Answer<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">the Call?</em>
          </h2>
          <p className="text-[19px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-12">
            When you feel ready, a space of compassion is waiting for you. We are here to help you discern your next steps with kindness.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={SACRED_SERIES_EVENTBRITE} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all">
              Reserve Your Place
            </a>
            <Link to="/contact" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all">
              Speak With a Guide
            </Link>
          </div>
        </div>
      </section>
      <InternalLinkingFooter links={[
        { label: "Community Care", href: "/community-care" },
        { label: "Preparation Guide", href: "/preparation" },
        { label: "Sacred Intake Form", href: "/ceremony-intake" },
      ]} />
    </SacredSeriesLayout>
  );
};

export default SacredSeries;
