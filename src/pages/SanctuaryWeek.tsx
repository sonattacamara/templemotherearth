import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heart, Leaf, Sun, Moon, Sparkles, Shield, Star, Users,
  Calendar, Clock, Music, Palette, Mountain, Coffee, Flame,
  ChevronDown, ArrowRight, Gem, Crown
} from "lucide-react";
import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import sanctuaryDay1CacaoPods from "@/assets/sanctuary-day1-cacao-pods.png";
import sanctuaryDay2HapeCeremony from "@/assets/sanctuary-day2-hape-ceremony.png";
import sanctuaryDay3SacredTea from "@/assets/sanctuary-day3-sacred-tea.png";
import level5Initiation from "@/assets/level5-initiation.png";
import sanctuaryDay5Spa from "@/assets/sanctuary-day5-spa.png";
import kamboFrogArt from "@/assets/kambo-frog-art.png";

const EVENTBRITE_ORG = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

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
  pricing: { label: string; price: string }[];
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
    pricing: [{ label: "Sustainer", price: "$44" }, { label: "Community", price: "$33" }, { label: "Scholarship", price: "Available" }],
    ctaLabel: "Register Now", ctaHref: "https://www.eventbrite.com/e/cacao-sacred-ceremony-registration-822085920117", ctaReady: true,
    slug: "/cacao", image: sanctuaryDay1CacaoPods, imagePosition: "center 56%",
    phase: "The Opening",
  },
  {
    day: 2, date: "", weekday: "", name: "Hapé Community Ceremony",
    subtitle: "The Noise Stops. You Remember.",
    description: "Sacred Amazonian snuff ceremony for grounding, mental clarity, and purification. The forest has been waiting for you.",
    icon: <Leaf className="h-5 w-5" />, tags: ["Grounding", "Clarity", "Forest"],
    pricing: [{ label: "Sustainer", price: "$44" }, { label: "Community", price: "$33" }, { label: "Scholarship", price: "Available" }],
    ctaLabel: "Register Now", ctaHref: "https://bit.ly/HapeCircle", ctaReady: true,
    slug: "/hape", image: sanctuaryDay2HapeCeremony, imagePosition: "center 38%",
    phase: "The Opening",
  },
  {
    day: 3, date: "", weekday: "", name: "Sacred Tea Ceremony",
    subtitle: "The Door Has Always Been There",
    description: "Three levels: Community, Sacred Circle, and Fruit of the Gods. Choose the depth you are ready for. The sacrament meets you exactly where you are.",
    icon: <Coffee className="h-5 w-5" />, tags: ["Signature", "Tiered", "Pre-Screening"],
    pricing: [{ label: "Fruit of the Gods", price: "$111" }, { label: "Sacred Circle", price: "$66" }, { label: "Community", price: "$33" }],
    ctaLabel: "Coming Soon", ctaHref: "#", ctaReady: false,
    slug: "/sacred-tea", image: sanctuaryDay3SacredTea, imagePosition: "center 58%",
    phase: "The Opening",
  },
  {
    day: 4, date: "", weekday: "", name: "Level 5 — The Complete Initiation",
    subtitle: "You Have Not Come This Far to Stop Here",
    description: "Every sacrament. One full-day container. Kambo included. For those who are genuinely ready to go all the way. By application only.",
    icon: <Flame className="h-5 w-5" />, tags: ["Advanced", "Kambo", "Application Required"],
    pricing: [{ label: "Sustainer", price: "$777" }, { label: "Community", price: "$555" }, { label: "Scholarship", price: "Available" }],
    ctaLabel: "Coming Soon", ctaHref: "#", ctaReady: false,
    slug: "/level5", image: level5Initiation, imagePosition: "center 50%",
    phase: "The Initiation",
  },
  {
    day: 5, date: "", weekday: "", name: "Inner Alchemy Wellness Spa Day",
    subtitle: "Your Body Has Been Waiting for This Day",
    description: "A full day of body practices, sound ceremony, sacred nourishment, yoga, and ceremonial closing. From sunrise to sunset, every moment held.",
    icon: <Sun className="h-5 w-5" />, tags: ["Full Day", "Restoration", "Body"],
    pricing: [{ label: "Sustainer", price: "$111" }, { label: "Community", price: "$88" }, { label: "All Welcome", price: "Free" }],
    ctaLabel: "Coming Soon", ctaHref: "#", ctaReady: false,
    slug: "/spa", image: sanctuaryDay5Spa, imagePosition: "center 62%",
    phase: "The Rest",
  },
  {
    day: 6, date: "", weekday: "", name: "Community Integration Potluck",
    subtitle: "You Are Already Part of This Family",
    description: "Integration circle, Sacred Tea House open all evening, and a potluck table where the conversation goes somewhere real. Bring a dish. Come as you are.",
    icon: <Users className="h-5 w-5" />, tags: ["Free", "Everyone Welcome", "Community"],
    pricing: [{ label: "All Welcome", price: "Free" }],
    ctaLabel: "Register Free", ctaHref: "https://www.eventbrite.com/e/soulful-connections-a-community-potluck-for-growth-and-transformation-registration-1119491141139", ctaReady: true,
    slug: "/potluck", image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    phase: "The Belonging",
  },
  {
    day: 7, date: "", weekday: "", name: "Sacred Yin Yoga",
    subtitle: "You Already Know How to Surrender",
    description: "90 minutes of ceremonial yin yoga with sound ceremony and breathwork. Not exercise, ceremony in the body. All levels welcome.",
    icon: <Mountain className="h-5 w-5" />, tags: ["All Levels", "Sound", "Nervous System"],
    pricing: [{ label: "Sustainer", price: "$33" }, { label: "Community", price: "$22" }],
    ctaLabel: "Register Now", ctaHref: "https://www.eventbrite.com/e/yin-yoga-the-art-of-surrender-virtual-restorative-experience-with-chaka-tickets-1830988739609", ctaReady: true,
    slug: "/yin-yoga", image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    phase: "The Integration",
  },
  {
    day: 8, date: "", weekday: "", name: "Art Expo",
    subtitle: "Art Born From the Other Side",
    description: "Visionary art exhibition, artist marketplace, live sound performances, and Sacred Tea House open all evening. An evening where ceremony becomes culture.",
    icon: <Palette className="h-5 w-5" />, tags: ["Art", "Music", "Evening"],
    pricing: [{ label: "Sustainer", price: "$22" }, { label: "Community", price: "$11" }, { label: "Members", price: "Free" }],
    ctaLabel: "Reserve Your Evening", ctaHref: "https://www.eventbrite.com/e/art-expo-registration-539756675747", ctaReady: true,
    slug: "/art-expo", image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
    phase: "The Integration",
  },
  {
    day: 9, date: "", weekday: "", name: "Kambo Ceremony",
    subtitle: "Some Things Cannot Be Talked Through",
    description: "The Great Purifier. The ancient Amazonian purification sacrament. For those who have been called. Sacred screening required. By application only.",
    icon: <Shield className="h-5 w-5" />, tags: ["Purification", "Application Required", "Sacred Screening"],
    pricing: [{ label: "Sustainer", price: "$222" }, { label: "Community", price: "$155" }, { label: "Scholarship", price: "Available" }],
    ctaLabel: "Apply for Your Place", ctaHref: "https://www.eventbrite.com/e/kambo-sacred-ceremony-registration-822085920117", ctaReady: true,
    slug: "/kambo", image: kamboFrogArt,
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
      <div className="flex gap-3 flex-wrap mb-4">
        {day.pricing.map((tier) => (
          <span key={tier.label} className="font-sans text-[8px] tracking-[1.5px] uppercase text-[hsl(35,20%,50%)]">
            <span className="text-[hsl(45,70%,49%)]">{tier.price}</span> {tier.label}
          </span>
        ))}
      </div>
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
const SanctuaryWeek = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <SanctuaryWeekLayout
      title="Sanctuary Week · Temple Mother Earth"
      description="A recurring series of sacred ceremonies, community gatherings, and body practices. Temple Mother Earth, Washington DC."
      showBackLink={false}
    >
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 py-16 md:py-20 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Sacred ceremony sanctuary space at Temple Mother Earth"
          className="absolute inset-0 w-full h-full object-cover saturate-50 brightness-[0.35] -z-10"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsla(114,36%,10%,0.97)] via-[hsla(114,36%,10%,0.7)] to-[hsla(114,36%,10%,0.3)] -z-10" />
        <motion.div className="relative z-10 max-w-[860px]" style={{ opacity: heroOpacity, y: heroY }}>
          <span className="inline-block bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] font-sans text-[8px] tracking-[4px] uppercase px-5 py-2 mb-8">
            Recurring Sacred Offerings · Year Six
          </span>
          <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,55%)] mb-4">
            Temple Mother Earth · Washington, DC
          </p>
          <h1 className="font-sans text-[clamp(40px,7vw,88px)] font-extralight leading-none text-[hsl(40,30%,92%)] mb-6 tracking-tight">
            Sanctuary<br />
            <em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Week</em>
          </h1>
          <p className="font-serif italic text-[clamp(18px,2vw,24px)] text-[hsl(35,30%,72%)] max-w-[580px] leading-relaxed mb-6">
            A recurring series of sacred ceremonies, community gatherings, and body practices held throughout the month. Each offering stands on its own. Choose what calls you.
          </p>
          <p className="font-serif text-[16px] text-[hsl(35,20%,55%)] max-w-[520px] leading-relaxed mb-12">
            In 2020, when the world closed its doors, we opened ours. Six years later, the temple has only grown deeper. The sacred container is open. Come home.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#timeline" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all">
              Explore the Journey
            </a>
            <a href="#package" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-transparent border border-[hsla(45,70%,49%,0.5)] text-[hsl(45,70%,55%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all">
              Full Package $2,222
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
            The Arc of<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Ten Days</em>
          </h2>
          <p className="font-serif italic text-[19px] text-[hsl(35,30%,68%)] max-w-[600px] mx-auto mt-6 leading-relaxed">
            Scroll through each day. Each ceremony builds on the last. The sequence is sacred.
          </p>
        </div>

        <PhaseMarker title="The Opening" days="Days 1–3" />
        {timelineDays.slice(0, 3).map((day, i) => (
          <TimelineNode key={day.day} day={day} index={i} />
        ))}

        <PhaseMarker title="The Initiation" days="Day 4" />
        <TimelineNode day={timelineDays[3]} index={3} />

        <PhaseMarker title="The Rest" days="Day 5" />
        <TimelineNode day={timelineDays[4]} index={4} />

        <PhaseMarker title="The Belonging" days="Day 6" />
        <TimelineNode day={timelineDays[5]} index={5} />

        <PhaseMarker title="The Integration" days="Days 7–9" />
        {timelineDays.slice(6).map((day, i) => (
          <TimelineNode key={day.day} day={day} index={i + 6} />
        ))}
      </section>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ FIVE PILLARS ═══ */}
      <SanctuarySection eyebrow="Our Sacred Approach" title={<>Five Pillars of<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">The Sanctuary Experience</em></>}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0.5">
          {[
            { num: "01", title: "10-Ceremony Arc", desc: "A rhythmic, continuous journey designed to honor your natural process of becoming.", icon: <Calendar className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
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



      {/* ═══ ENERGY OF SIX — FEATURED CALLOUT ═══ */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-[hsl(114,36%,10%)] to-[hsl(105,30%,8%)]">
        <motion.div
          className="max-w-[900px] mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">Year Six · The Lovers</p>
            <h2 className="font-sans text-[clamp(48px,8vw,96px)] font-extralight leading-none text-[hsl(45,70%,55%)] mb-4">
              6
            </h2>
            <p className="font-serif italic text-[clamp(20px,3vw,32px)] text-[hsl(40,30%,90%)] leading-tight">
              The Energy of Home
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            <div className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-8 md:p-9">
              <Gem className="h-6 w-6 text-[hsl(45,70%,49%)] mb-4" />
              <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3 font-normal">Numerology</h3>
              <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">
                In numerology, 6 is the number of home, community, and unconditional nurturing. The hearth. The gathering place. The love that asks nothing in return.
              </p>
            </div>
            <div className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-8 md:p-9">
              <Crown className="h-6 w-6 text-[hsl(45,70%,49%)] mb-4" />
              <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3 font-normal">The Lovers · Tarot VI</h3>
              <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">
                Card VI in the Tarot, sacred union, conscious alignment, the moment of choosing who you truly are. Year Six is the year we choose with intention.
              </p>
            </div>
            <div className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-8 md:p-9">
              <Star className="h-6 w-6 text-[hsl(45,70%,49%)] mb-4" />
              <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3 font-normal">What This Means</h3>
              <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">
                Six years of building home. Six years of holding the hearth. Sanctuary Week is the celebration of what we built, and the opening of what comes next.
              </p>
            </div>
          </div>

          <blockquote className="mt-12 border-l-[3px] border-[hsl(45,70%,49%)] p-8 bg-[hsla(45,70%,49%,0.05)]">
            <p className="font-serif italic text-[22px] text-[hsl(40,30%,90%)] leading-[1.7]">
              We only knew people needed somewhere to land. During the pandemic, when isolation became policy, when people lost their bodies, their community, their sense of what was real, Temple Mother Earth opened. Not despite the moment. Because of it.
            </p>
            <cite className="block mt-4 font-sans text-[9px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] not-italic">
              Temple Mother Earth · Founded 2020
            </cite>
          </blockquote>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 mt-12">
            {[
              { stat: "330+", label: "Alumni" },
              { stat: "95%", label: "Life Changes" },
              { stat: "6+", label: "Months Integration" },
              { stat: "0", label: "Safety Incidents" },
            ].map((item) => (
              <div key={item.label} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-6 text-center">
                <p className="font-sans text-3xl font-extralight text-[hsl(45,70%,49%)] mb-1">{item.stat}</p>
                <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(40,30%,90%)]">{item.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ DAILY RHYTHM ═══ */}
      <SanctuarySection eyebrow="The Daily Rhythm" title={<>A Day in<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Sanctuary Week</em></>}>
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

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ SACRED REST ═══ */}
      <SanctuarySection eyebrow="The Rhythm of the Temple" title={<>Why We Close<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">After the Winter Solstice</em></>}>
        <div className="text-xl leading-[1.85] text-[hsl(35,30%,68%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
          <p>Every year after the Winter Solstice, Temple Mother Earth enters a period of <strong className="text-[hsl(40,30%,90%)]">Sacred Rest</strong>. We close our doors to the public. Ceremonies pause. The outward work stops.</p>
          <p>This is not a break. This is the work. The land rests. The facilitators restore. The founders recalibrate the vision, refine the protocols, study, pray, and prepare.</p>
          <p>Between the Winter Solstice and the Spring Equinox, the Temple does what the Earth does: it goes inward. And then, when the light returns, <strong className="text-[hsl(40,30%,90%)]">we open the doors again.</strong></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mt-16">
          {[
            { icon: <Moon className="h-8 w-8 text-[hsl(45,70%,49%)]" />, title: "Winter Solstice · The Closing", desc: "The shortest day. The deepest night. We honor this by closing public ceremonies and turning inward. Facilitator training, sacred study, land stewardship, and internal ceremony take place during this time." },
            { icon: <Sun className="h-8 w-8 text-[hsl(45,70%,49%)]" />, title: "Spring Equinox · The Reopening", desc: "When day and night are equal, the Temple reopens. Sanctuary Week is our Grand Reopening, a declaration that the light has returned and the Temple is ready to hold space once more. Year Six begins here." },
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
          <p>Many seekers find that their fears soften into peace once they are held within our circle. You are deeply welcomed here, exactly as you are.</p>
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
          Sanctuary Week is a recurring series of sacred ceremonies, body practices, and community gatherings. Each offering is its own doorway. Choose the path your spirit is ready to walk.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
          {[
            { title: "Spring Equinox", subtitle: "10 Days of Immersion", price: "$2,222" },
            { title: "Monthly Intensive", subtitle: "7 Days of Deepening", price: "$2,222" },
            { title: "Weekend Immersion", subtitle: "3 Days of Presence", price: "$1,333" },
            { title: "Day Experience", subtitle: "A Sacred Entry Point", price: "$333" },
          ].map((path) => (
            <div key={path.title} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] p-8 text-center">
              <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-2">{path.title}</p>
              <p className="font-sans text-3xl font-extralight text-[hsl(40,30%,92%)] mb-2">{path.price}</p>
              <p className="font-serif text-[14px] text-[hsl(35,30%,60%)]">{path.subtitle}</p>
            </div>
          ))}
        </div>
        <p className="text-center font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mt-8">
          <Link to="/community-care" className="text-[hsl(45,70%,49%)] hover:underline">Community Care Model applies</Link> · Scholarship available for genuine hardship
        </p>
      </SanctuarySection>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ $2,222 PACKAGE (moved to bottom) ═══ */}
      <section
        id="package"
        className="bg-gradient-to-br from-[hsl(105,30%,13%)] via-[hsl(110,25%,11%)] to-[hsl(114,36%,10%)] border-t border-b border-[hsla(45,70%,49%,0.15)] py-20 md:py-24 px-6 md:px-12 text-center"
      >
        <div className="max-w-[860px] mx-auto">
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">The Full Initiation</p>
          <p className="font-sans text-4xl font-extralight text-[hsl(45,70%,55%)] mb-6 tracking-tight">$2,222</p>
          <h2 className="font-sans text-[clamp(24px,4vw,52px)] font-extralight leading-[1.05] mb-6 text-[hsl(40,30%,92%)]">
            The Sanctuary Week<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Initiation Package</em>
          </h2>
          <p className="text-xl text-[hsl(35,30%,68%)] leading-relaxed max-w-[640px] mx-auto mb-12 font-serif">
            All 9 ceremonies. One sacred arc. Held from beginning to end. The arc is intentional. The sequence is sacred.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mb-12 text-left">
            {[
              { title: "All 9 Ceremonies", desc: "Full access to every sacred gathering across both weeks of Sanctuary Week.", icon: <Calendar className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
              { title: "1:1 Preparation Call", desc: "A personal conversation with Sonatta or James before March 18.", icon: <Heart className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
              { title: "Community Container", desc: "Curated materials, ceremonial guide, sacred journal, and preparation instructions.", icon: <Star className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
              { title: "Integration Session", desc: "A 1:1 integration session with your facilitator within 14 days after March 29.", icon: <Sparkles className="h-5 w-5 text-[hsl(45,70%,49%)]" /> },
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
          <a href={EVENTBRITE_ORG} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all">
            Secure the Full Package
          </a>
          <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mt-6">
            Limited to 8 participants · <Link to="/community-care" className="text-[hsl(45,70%,49%)] hover:underline">Community Care Model</Link> applies · Scholarship available
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
            <a href={EVENTBRITE_ORG} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all">
              Reserve Your Place
            </a>
            <Link to="/contact" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all">
              Speak With a Guide
            </Link>
          </div>
        </div>
      </section>
    </SanctuaryWeekLayout>
  );
};

export default SanctuaryWeek;
