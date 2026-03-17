import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";

const EVENTBRITE_ORG = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

interface PricingTier {
  label: string;
  price: string;
  note?: string;
}

interface CeremonyCardData {
  slug: string;
  date: string;
  name: string;
  subtitle: string;
  description: string;
  tags: { label: string; type?: "free" | "app" | "default" }[];
  pricing: PricingTier[];
  ctaLabel: string;
  ctaHref: string;
  ctaReady: boolean;
  image: string;
}

const weekOne: CeremonyCardData[] = [
  {
    slug: "/cacao",
    date: "Wednesday · March 18",
    name: "Cacao Community Ceremony",
    subtitle: "Your Heart Already Knows the Way",
    description: "Sacred ceremonial cacao, live sound, and community circle. The gentlest entry point, and for many, the most unexpectedly profound. All welcome.",
    tags: [{ label: "Community" }, { label: "All Welcome" }, { label: "Heart" }],
    pricing: [
      { label: "Sustainer", price: "$44" },
      { label: "Community", price: "$33" },
      { label: "Scholarship", price: "Available" },
    ],
    ctaLabel: "Register Now →",
    ctaHref: "https://www.eventbrite.com/e/cacao-healing-ceremony-registration-822085920117",
    ctaReady: true,
    image: "https://images.pexels.com/photos/3776163/pexels-photo-3776163.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
  {
    slug: "/hape",
    date: "Thursday · March 19",
    name: "Hapé Community Ceremony",
    subtitle: "The Noise Stops. You Remember.",
    description: "Sacred Amazonian snuff ceremony for grounding, mental clarity, and purification. The forest has been waiting for you.",
    tags: [{ label: "Grounding" }, { label: "Clarity" }, { label: "Forest" }],
    pricing: [
      { label: "Sustainer", price: "$44" },
      { label: "Community", price: "$33" },
      { label: "Scholarship", price: "Available" },
    ],
    ctaLabel: "Register Now →",
    ctaHref: "https://bit.ly/HapeCircle",
    ctaReady: true,
    image: "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
  {
    slug: "/sacred-tea",
    date: "Friday · March 20",
    name: "Sacred Tea Ceremony",
    subtitle: "The Door Has Always Been There",
    description: "Three levels: Community, Sacred Circle, and Fruit of the Gods. Choose the depth you are ready for. The sacrament meets you exactly where you are.",
    tags: [{ label: "Signature" }, { label: "Tiered" }, { label: "Pre-Screening", type: "app" }],
    pricing: [
      { label: "Fruit of the Gods", price: "$111" },
      { label: "Sacred Circle", price: "$66" },
      { label: "Community", price: "$33" },
    ],
    ctaLabel: "Coming Soon",
    ctaHref: "#",
    ctaReady: false,
    image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
  {
    slug: "/level5",
    date: "Saturday · March 21",
    name: "Level 5 — The Complete Initiation",
    subtitle: "You Have Not Come This Far to Stop Here",
    description: "Every sacrament. One full-day container. Kambo included. For those who are genuinely ready to go all the way. By application only.",
    tags: [{ label: "Advanced" }, { label: "Kambo" }, { label: "Application Required", type: "app" }],
    pricing: [
      { label: "Sustainer", price: "$777" },
      { label: "Community", price: "$555" },
      { label: "Scholarship", price: "Available" },
    ],
    ctaLabel: "Coming Soon",
    ctaHref: "#",
    ctaReady: false,
    image: "https://images.pexels.com/photos/1510901/pexels-photo-1510901.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
  {
    slug: "/spa",
    date: "Sunday · March 22",
    name: "Inner Alchemy Wellness Spa Day",
    subtitle: "Your Body Has Been Waiting for This Day",
    description: "A full day of body treatments, sound healing, sacred nourishment, yoga, and ceremonial closing. From sunrise to sunset, every moment held.",
    tags: [{ label: "Full Day" }, { label: "Restoration" }, { label: "Body" }],
    pricing: [
      { label: "Sustainer", price: "$111" },
      { label: "Community", price: "$88" },
      { label: "All Welcome", price: "Free" },
    ],
    ctaLabel: "Coming Soon",
    ctaHref: "#",
    ctaReady: false,
    image: "https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
  {
    slug: "/potluck",
    date: "Monday · March 23",
    name: "Community Integration Potluck",
    subtitle: "You Are Already Part of This Family",
    description: "Integration circle, Sacred Tea House open all evening, and a potluck table where the conversation goes somewhere real. Bring a dish. Come as you are.",
    tags: [{ label: "Free", type: "free" }, { label: "Everyone Welcome" }, { label: "Community" }],
    pricing: [
      { label: "All Welcome", price: "Free" },
    ],
    ctaLabel: "Register Free →",
    ctaHref: "https://www.eventbrite.com/e/soulful-connections-a-community-potluck-for-growth-and-healing-registration-1119491141139",
    ctaReady: true,
    image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
];

const weekTwo: CeremonyCardData[] = [
  {
    slug: "/yin-yoga",
    date: "Tuesday · March 25",
    name: "Sacred Yin Yoga",
    subtitle: "You Already Know How to Surrender",
    description: "90 minutes of ceremonial yin yoga with sound healing and breathwork. Not exercise, ceremony in the body. All levels welcome.",
    tags: [{ label: "All Levels" }, { label: "Sound" }, { label: "Nervous System" }],
    pricing: [
      { label: "Sustainer", price: "$33" },
      { label: "Community", price: "$22" },
    ],
    ctaLabel: "Register Now →",
    ctaHref: "https://www.eventbrite.com/e/yin-yoga-the-art-of-surrender-virtual-restorative-experience-with-chaka-tickets-1830988739609",
    ctaReady: true,
    image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
  {
    slug: "/art-expo",
    date: "Friday · March 28",
    name: "Sacred Art Expo",
    subtitle: "Art Born From the Other Side",
    description: "Visionary art exhibition, artist marketplace, live sound performances, and Sacred Tea House open all evening. An evening where ceremony becomes culture.",
    tags: [{ label: "Art" }, { label: "Music" }, { label: "Evening" }],
    pricing: [
      { label: "Sustainer", price: "$22" },
      { label: "Community", price: "$11" },
      { label: "Members", price: "Free" },
    ],
    ctaLabel: "Reserve Your Evening →",
    ctaHref: "https://www.eventbrite.com/e/art-expo-registration-539756675747",
    ctaReady: true,
    image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
  {
    slug: "/kambo",
    date: "Saturday · March 29",
    name: "Kambo Ceremony",
    subtitle: "Some Things Cannot Be Talked Through",
    description: "The Great Purifier. The ancient Amazonian purification sacrament. For those who have been called. Health screening required. By application only.",
    tags: [{ label: "Purification" }, { label: "Application Required", type: "app" }, { label: "Health Screening" }],
    pricing: [
      { label: "Sustainer", price: "$222" },
      { label: "Community", price: "$155" },
      { label: "Scholarship", price: "Available" },
    ],
    ctaLabel: "Apply for Your Place →",
    ctaHref: "https://www.eventbrite.com/e/kambo-healing-ceremony-registration-822085920117",
    ctaReady: true,
    image: "https://images.pexels.com/photos/975354/pexels-photo-975354.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
  },
];

const CeremonyCard = ({ card }: { card: CeremonyCardData }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
    >
      <Link
        to={card.slug}
        className="group flex flex-col bg-[hsl(90,15%,95%)] border border-[hsl(90,15%,88%)] hover:border-[hsl(90,25%,72%)] transition-colors overflow-hidden"
      >
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-[220px] object-cover saturate-[0.8] brightness-[0.9] group-hover:saturate-100 group-hover:brightness-100 transition-[filter] duration-400"
          loading="lazy"
        />
        <div className="p-6 md:p-7 flex-1 flex flex-col">
          <p className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(90,40%,30%)] mb-3">
            {card.date}
          </p>
          <h3 className="font-sans text-[13px] font-light text-[hsl(100,20%,15%)] mb-2 leading-tight">
            {card.name}
          </h3>
          <p className="font-serif italic text-[15px] text-[hsl(35,55%,42%)] mb-3.5">
            {card.subtitle}
          </p>
          <p className="text-[15px] text-[hsl(90,10%,35%)] leading-relaxed flex-1 mb-4 font-serif">
            {card.description}
          </p>

          {/* Pricing Tiers */}
          <div className="flex gap-3 flex-wrap mb-4">
            {card.pricing.map((tier) => (
              <span
                key={tier.label}
                className="font-sans text-[8px] tracking-[1.5px] uppercase text-[hsl(90,10%,35%)]"
              >
                <span className="text-[hsl(90,40%,30%)]">{tier.price}</span>
                {" "}
                {tier.label}
              </span>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap mb-5">
            {card.tags.map((tag) => (
              <span
                key={tag.label}
                className={`font-sans text-[7px] tracking-[2px] uppercase border px-2.5 py-1 ${
                  tag.type === "free"
                    ? "text-[hsl(110,40%,30%)] border-[hsl(110,30%,70%)]"
                    : tag.type === "app"
                    ? "text-[hsl(35,55%,42%)] border-[hsl(35,40%,70%)]"
                    : "text-[hsl(90,10%,50%)] border-[hsl(90,15%,80%)]"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
          {card.ctaReady ? (
            <a
              href={card.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="block text-center font-sans text-[8px] tracking-[2px] uppercase py-3 px-5 border border-[hsl(90,20%,70%)] text-[hsl(90,40%,30%)] hover:bg-[hsl(90,40%,30%)] hover:text-[hsl(90,20%,97%)] transition-all mt-auto"
            >
              {card.ctaLabel}
            </a>
          ) : (
            <span className="block text-center font-sans text-[8px] tracking-[2px] uppercase py-3 px-5 border border-[hsl(90,15%,85%)] text-[hsl(90,10%,60%)] mt-auto">
              Eventbrite Coming Soon
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

const SanctuaryWeek = () => (
  <SanctuaryWeekLayout
    title="Sanctuary Week · March 18–29 · Temple Mother Earth"
    description="Ten days of sacred ceremony, community, and transformation. Spring Equinox Grand Reopening, Year Six. Temple Mother Earth, Washington DC."
    showBackLink={false}
  >
    {/* HERO */}
    <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 py-16 md:py-20 overflow-hidden">
      <img
        src="https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        alt="Sacred ceremony sanctuary space for Kambo, Cacao, and Hapé sacred practices at Temple Mother Earth"
        className="absolute inset-0 w-full h-full object-cover saturate-50 brightness-50 -z-10"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsla(90,20%,97%,0.95)] via-[hsla(90,20%,97%,0.6)] to-[hsla(90,20%,97%,0.2)] -z-10" />
      <motion.div
        className="relative z-10 max-w-[860px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="inline-block bg-[hsl(90,40%,30%)] text-[hsl(90,20%,97%)] font-sans text-[8px] tracking-[4px] uppercase px-5 py-2 mb-8">
          Grand Reopening · Year Six · Spring Equinox 2026
        </span>
        <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(90,40%,30%)] mb-4">
          Temple Mother Earth · Washington, DC
        </p>
        <h1 className="font-sans text-[clamp(40px,7vw,88px)] font-extralight leading-none text-[hsl(100,20%,15%)] mb-6 tracking-tight">
          Sanctuary<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Week</em>
        </h1>
        <p className="font-serif italic text-[clamp(18px,2vw,24px)] text-[hsl(90,10%,35%)] max-w-[580px] leading-relaxed mb-6">
          Your journey toward transformation and deep inner resonance begins here. We recognize the courage it takes to heed the quiet stirrings of the heart, and we welcome you, exactly as you are, in this very moment.
        </p>
        <p className="font-serif text-[16px] text-[hsl(90,10%,45%)] max-w-[520px] leading-relaxed mb-12">
          In 2020, when the world closed its doors, we opened ours. Six years later, the temple has only grown deeper. This March, we gather again. Ten days. Ten ceremonies. One sacred container. Come home.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="#ceremonies" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(90,40%,30%)] text-[hsl(90,20%,97%)] hover:bg-[hsl(90,40%,38%)] transition-all">
            See All Ceremonies
          </a>
          <a href="#package" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-transparent border border-[hsl(90,20%,70%)] text-[hsl(90,40%,30%)] hover:bg-[hsl(90,20%,93%)] transition-all">
            Full Package $2,222
          </a>
          <Link to="/community-care" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-transparent border border-[hsl(90,20%,70%)] text-[hsl(90,40%,30%)] hover:bg-[hsl(90,20%,93%)] transition-all">
            Community Care Model
          </Link>
        </div>
      </motion.div>
    </section>

    {/* MONTHLY THEME BANNER */}
    {(() => {
      const MONTHLY_THEMES = [
        { month: 3, year: 2026, theme: "Spring Equinox · Year Six · The Grand Reopening", desc: "Six years of building home. This is the celebration of what we built and the opening of what comes next." },
        { month: 4, year: 2026, theme: "April Theme — Coming Soon", desc: "Stay tuned for our April sacred theme." },
        { month: 5, year: 2026, theme: "May Theme — Coming Soon", desc: "Stay tuned for our May sacred theme." },
        { month: 6, year: 2026, theme: "June Theme — Coming Soon", desc: "Stay tuned for our June sacred theme." },
        { month: 7, year: 2026, theme: "July Theme — Coming Soon", desc: "Stay tuned for our July sacred theme." },
        { month: 8, year: 2026, theme: "August Theme — Coming Soon", desc: "Stay tuned for our August sacred theme." },
        { month: 9, year: 2026, theme: "September Theme — Coming Soon", desc: "Stay tuned for our September sacred theme." },
        { month: 10, year: 2026, theme: "October Theme — Coming Soon", desc: "Stay tuned for our October sacred theme." },
        { month: 11, year: 2026, theme: "November Theme — Coming Soon", desc: "Stay tuned for our November sacred theme." },
        { month: 12, year: 2026, theme: "December Theme — Coming Soon", desc: "Stay tuned for our December sacred theme." },
      ];
      const now = new Date();
      const current = MONTHLY_THEMES.find(t => t.month === now.getMonth() + 1 && t.year === now.getFullYear()) || MONTHLY_THEMES[0];
      return (
        <div className="bg-[hsl(90,40%,30%)] py-6 px-6 md:px-12 text-center">
          <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,70%)] mb-2">Monthly Theme</p>
          <p className="font-sans text-[clamp(16px,2vw,22px)] font-light text-[hsl(90,20%,97%)] mb-1">{current.theme}</p>
          <p className="font-serif italic text-[14px] text-[hsl(90,30%,80%)]">{current.desc}</p>
        </div>
      );
    })()}

    {/* SACRED PATHWAYS PRICING OVERVIEW */}
    <SanctuarySection eyebrow="Sacred Pathways" title={<>Find Your<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Pathway of Participation</em></>}>
      <p className="text-center text-[19px] text-[hsl(90,10%,35%)] leading-relaxed font-serif max-w-[640px] mx-auto mb-12">
        These are not packages. They are invitations into a living sacred practice. Each pathway is a doorway — chosen not by what you can afford, but by what your spirit is ready to receive. We meet you exactly where you are.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
        {[
          { title: "Spring Equinox", subtitle: "10 Days of Immersion", price: "$2,222" },
          { title: "Monthly Intensive", subtitle: "7 Days of Deepening", price: "$2,222" },
          { title: "Weekend Immersion", subtitle: "3 Days of Presence", price: "$1,333" },
          { title: "Day Experience", subtitle: "A Sacred Entry Point", price: "$333" },
        ].map((path) => (
          <div key={path.title} className="bg-[hsl(90,15%,94%)] border border-[hsl(90,15%,85%)] p-8 text-center">
            <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(90,40%,30%)] mb-2">{path.title}</p>
            <p className="font-sans text-3xl font-extralight text-[hsl(100,20%,15%)] mb-2">{path.price}</p>
            <p className="font-serif text-[14px] text-[hsl(90,10%,50%)]">{path.subtitle}</p>
          </div>
        ))}
      </div>
      <p className="text-center font-sans text-[9px] tracking-[2px] uppercase text-[hsl(90,10%,50%)] mt-8">
        <Link to="/community-care" className="text-[hsl(90,40%,30%)] hover:underline">Community Care Model applies</Link> · Scholarship available for genuine hardship
      </p>
    </SanctuarySection>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

    {/* ORIGIN STORY */}
    <SanctuarySection eyebrow="Year Six · Spring Equinox 2026" title={<>Six Years Ago<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">We Didn't Know What We Were Building</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(90,10%,35%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p>We only knew people needed somewhere to land. During the pandemic, when isolation became policy, when people lost their bodies, their community, their sense of what was real, Temple Mother Earth opened. Not despite the moment. Because of it.</p>
        <p>That somewhere has grown into a 508(c)(1)(A) sacred church, a 501(c)(3) nonprofit, a sacred ecosystem, and a family. This March is our Grand Reopening, and the beginning of our most powerful chapter yet.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-0.5 mt-16">
        {[
          { stat: "330+", label: "Alumni", desc: "Beautiful souls who have found profound transformation and deep community connection." },
          { stat: "95%", label: "Life Changes", desc: "Reporting significant, lasting awakenings that ripple through their daily lives." },
          { stat: "6+", label: "Months Integration", desc: "Ongoing, loving support as you integrate the wisdom of your experience." },
          { stat: "0", label: "Safety Incidents", desc: "A testament to our unwavering dedication to your sacred care and emotional safety." },
        ].map((item) => (
          <div key={item.label} className="bg-[hsl(90,15%,94%)] p-8 border border-[hsl(90,15%,85%)] text-center">
            <p className="font-sans text-3xl font-extralight text-[hsl(90,40%,30%)] mb-2">{item.stat}</p>
            <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(100,20%,15%)] mb-2">{item.label}</p>
            <p className="text-[14px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-0.5">
        {[
          { title: "The Energy of 6", desc: "In numerology, 6 is the number of home, community, and unconditional nurturing. The hearth. The gathering place. The love that asks nothing in return." },
          { title: "The Lovers · Tarot", desc: "Card VI in the Tarot, sacred union, conscious alignment, the moment of choosing who you truly are. Year Six is the year we choose with intention." },
          { title: "What This Means", desc: "Six years of building home. Six years of holding the hearth. Sanctuary Week is the celebration of what we built, and the opening of what comes next." },
        ].map((card) => (
          <div key={card.title} className="bg-[hsl(90,15%,94%)] p-8 md:p-9 border border-[hsl(90,15%,85%)]">
            <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(90,40%,30%)] mb-3 font-normal">{card.title}</h3>
            <p className="text-[16px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">{card.desc}</p>
          </div>
        ))}
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

    {/* SACRED APPROACH */}
    <SanctuarySection eyebrow="Our Sacred Approach" title={<>Five Pillars of<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">The Sanctuary Experience</em></>}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-0.5">
        {[
          { num: "01", title: "10-Ceremony Arc", desc: "A rhythmic, continuous journey designed to honor your natural process of becoming." },
          { num: "02", title: "Expert Facilitation", desc: "A collaborative, heart-led team holding a steady space for your unfolding growth." },
          { num: "03", title: "Extended Integration", desc: "Guidance that walks beside you for 6+ months as you ground your transformation." },
          { num: "04", title: "Intimate Cohorts", desc: "Small circles of 12 to 20, fostering true community, belonging, and shared wisdom." },
          { num: "05", title: "Trauma-Informed", desc: "A compassionate, tailored approach that honors exactly where you are today." },
        ].map((pillar) => (
          <div key={pillar.num} className="bg-[hsl(90,15%,94%)] border border-[hsl(90,15%,85%)] p-7">
            <p className="font-sans text-2xl font-extralight text-[hsl(90,40%,30%)] mb-3">{pillar.num}</p>
            <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(100,20%,15%)] mb-2">{pillar.title}</h3>
            <p className="text-[14px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">{pillar.desc}</p>
          </div>
        ))}
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

    {/* SACRED REST */}
    <SanctuarySection eyebrow="The Rhythm of the Temple" title={<>Why We Close<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">After the Winter Solstice</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(90,10%,35%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p>Every year after the Winter Solstice, Temple Mother Earth enters a period of <strong className="text-[hsl(100,20%,15%)]">Sacred Rest</strong>. We close our doors to the public. Ceremonies pause. The outward work stops.</p>
        <p>This is not a break. This is the work. The land rests. The facilitators restore. The founders recalibrate the vision, refine the protocols, study, pray, and prepare. The sacraments themselves require seasonal alignment. You cannot pour from a vessel that has not been refilled.</p>
        <p>Between the Winter Solstice and the Spring Equinox, the Temple does what the Earth does: it goes inward. We review the year. We grieve what needs grieving. We release what has completed its cycle. We vision what is emerging. And then, when the light returns, <strong className="text-[hsl(100,20%,15%)]">we open the doors again.</strong></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mt-16">
        {[
          { icon: "🌑", title: "Winter Solstice · The Closing", desc: "The shortest day. The deepest night. We honor this by closing public ceremonies and turning inward. Facilitator training, sacred study, land stewardship, and internal ceremony take place during this time." },
          { icon: "🌿", title: "Spring Equinox · The Reopening", desc: "When day and night are equal, the Temple reopens. Sanctuary Week is our Grand Reopening, a declaration that the light has returned and the Temple is ready to hold space once more. Year Six begins here." },
        ].map((card) => (
          <div key={card.title} className="bg-[hsl(90,15%,94%)] p-10 border border-[hsl(90,15%,85%)]">
            <span className="text-3xl block mb-4">{card.icon}</span>
            <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(90,40%,30%)] mb-3 font-normal">{card.title}</h3>
            <p className="text-[16px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">{card.desc}</p>
          </div>
        ))}
      </div>
      <blockquote className="mt-16 border-l-[3px] border-[hsl(90,40%,30%)] p-8 bg-[hsl(90,18%,93%)] max-w-[720px] mx-auto">
        <p className="font-serif italic text-[22px] text-[hsl(100,20%,15%)] leading-[1.7]">
          A temple that never rests cannot hold what arrives. We close so that when we open, every ceremony carries the full weight of preparation, intention, and seasonal alignment.
        </p>
        <cite className="block mt-4 font-sans text-[9px] tracking-[3px] uppercase text-[hsl(90,40%,30%)] not-italic">Temple Mother Earth · Seasonal Covenant</cite>
      </blockquote>
    </SanctuarySection>

    {/* A DAY IN SANCTUARY WEEK */}
    <SanctuarySection eyebrow="The Daily Rhythm" title={<>A Day in<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Sanctuary Week</em></>}>
      <p className="text-center text-[19px] text-[hsl(90,10%,35%)] leading-relaxed font-serif max-w-[640px] mx-auto mb-12">
        Every moment here is a gentle invitation to deepen. True awakening is a sacred surrender to your soul's unfolding, and we hold space for the courage it takes to step onto this path.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
        {[
          { time: "6:00 AM", title: "Rise & Grounding", desc: "Greet the dawn with intentionality. Sip herbal tea as you settle into stillness, meditation, and the quiet beauty of your own inner alignment." },
          { time: "7:30 AM", title: "Nourishment", desc: "Gather for a wholesome, plant-based breakfast. Honor your vessel with food prepared with love, recognizing that your body is the temple for your transformation." },
          { time: "9:00 AM", title: "Opening the Space", desc: "We come together to share our truth and receive guided wisdom, honoring both your voice and the wisdom held within the collective." },
          { time: "12:00 PM", title: "Communal Lunch", desc: "A time to reconnect, rest, and allow the morning's insights to settle, cradled by the supportive energy of our sanctuary." },
          { time: "2:00 PM", title: "Integration & Flow", desc: "Enjoy nature, reflection, or gentle bodywork as you integrate these new energies at your own pace." },
          { time: "5:00 PM", title: "Evening Preparation", desc: "Intentional grounding practices help prepare your spirit for the evening's work, honoring any nervousness or excitement you may feel." },
          { time: "7:00 PM", title: "Sacred Gathering", desc: "We converge for ceremony or heart-centered connection, the heartbeat of our time together, where every soul is held in non-judgmental love." },
          { time: "9:30 PM", title: "Gentle Wind Down", desc: "Soft reflection and journaling to honor the day. Rest deeply, knowing that your vulnerability is your strength and you are held in love." },
        ].map((slot) => (
          <div key={slot.time} className="bg-[hsl(90,15%,94%)] border border-[hsl(90,15%,85%)] p-7 flex gap-5">
            <p className="font-sans text-[10px] tracking-[2px] text-[hsl(90,40%,30%)] whitespace-nowrap pt-1">{slot.time}</p>
            <div>
              <h3 className="font-sans text-[11px] tracking-[1px] uppercase text-[hsl(100,20%,15%)] mb-2">{slot.title}</h3>
              <p className="text-[15px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">{slot.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

    {/* THE ARC OF TEN DAYS */}
    <SanctuarySection eyebrow="The Journey" title={<>The Arc of<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Ten Days</em></>}>
      <p className="text-center text-[19px] text-[hsl(90,10%,35%)] leading-relaxed font-serif max-w-[640px] mx-auto mb-12">
        Ten days. One arc. One soul, held in love from beginning to end. Each ceremony builds on the last. The sequence is sacred.
      </p>
      <div className="space-y-0.5">
        {[
          { phase: "Days 1–3", title: "The Opening", desc: "Cacao softens the heart. Hapé clears the field. We begin our descent together. By Friday night, you may find your relationship with your own spirit has shifted, a quiet, sacred deepening has begun." },
          { phase: "Day 4", title: "The Initiation", desc: "Level 5, the Complete Initiation. Every sacrament. One full-day container. This is often a pivotal threshold in one's journey, an honoring of all you are ready to release so your true light can shine." },
          { phase: "Day 5", title: "The Rest", desc: "Inner Alchemy Wellness Spa Day. Your body is a temple, we honor it. A full day of deep restoration, gentle treatments, and sacred, quiet rest to integrate the wisdom you have already gathered." },
          { phase: "Day 6", title: "The Belonging", desc: "Community Potluck and Integration Circle. You are among companions who truly understand the depth of this work. Here, you are not just a participant, you are part of a soul-family finding belonging in shared vulnerability." },
          { phase: "Days 7–10", title: "The Integration", desc: "Sacred Yin Yoga, Art Expo, and our final ceremony. As we close this circle, you carry forward the profound knowing that you have honored your own evolution. You are whole, and you are ready." },
        ].map((phase) => (
          <div key={phase.phase} className="bg-[hsl(90,15%,94%)] border border-[hsl(90,15%,85%)] p-8 md:p-10 flex flex-col md:flex-row gap-5 md:gap-10">
            <div className="md:w-[140px] flex-shrink-0">
              <p className="font-sans text-[9px] tracking-[3px] uppercase text-[hsl(90,40%,30%)]">{phase.phase}</p>
              <p className="font-sans text-[12px] text-[hsl(100,20%,15%)] mt-1">{phase.title}</p>
            </div>
            <p className="text-[16px] text-[hsl(90,10%,35%)] leading-relaxed font-serif flex-1">{phase.desc}</p>
          </div>
        ))}
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

    {/* WEEK ONE */}
    <section className="px-6 md:px-12 py-16 md:py-20 max-w-[1160px] mx-auto" id="ceremonies">
      <div className="flex items-baseline gap-6 mb-12 pb-6 border-b border-[hsl(90,15%,85%)]">
        <span className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(90,45%,35%)]">Week One</span>
        <h2 className="font-sans text-[clamp(18px,2.5vw,28px)] font-extralight text-[hsl(100,20%,15%)]">
          March 18–23 · <em className="font-serif italic text-[hsl(35,55%,42%)]">The Core Ceremonies</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
        {weekOne.map((card) => (
          <CeremonyCard key={card.slug} card={card} />
        ))}
      </div>
    </section>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

    {/* WEEK TWO */}
    <section className="px-6 md:px-12 py-16 md:py-20 max-w-[1160px] mx-auto">
      <div className="flex items-baseline gap-6 mb-12 pb-6 border-b border-[hsl(90,15%,85%)]">
        <span className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(90,45%,35%)]">Week Two</span>
        <h2 className="font-sans text-[clamp(18px,2.5vw,28px)] font-extralight text-[hsl(100,20%,15%)]">
          March 25–29 · <em className="font-serif italic text-[hsl(35,55%,42%)]">Extended Offerings</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
        {weekTwo.map((card) => (
          <CeremonyCard key={card.slug} card={card} />
        ))}
      </div>
    </section>

    {/* $2,222 PACKAGE */}
    <section
      id="package"
      className="bg-gradient-to-br from-[hsl(90,25%,92%)] via-[hsl(85,20%,94%)] to-[hsl(90,20%,97%)] border-t border-b border-[hsl(90,15%,85%)] py-20 md:py-24 px-6 md:px-12 text-center"
    >
      <div className="max-w-[860px] mx-auto">
        <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(90,40%,30%)] mb-4">The Full Initiation</p>
        <p className="font-sans text-4xl font-extralight text-[hsl(35,55%,42%)] mb-6 tracking-tight">$2,222</p>
        <h2 className="font-sans text-[clamp(24px,4vw,52px)] font-extralight leading-[1.05] mb-6 text-[hsl(100,20%,15%)]">
          The Sanctuary Week<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Initiation Package</em>
        </h2>
        <p className="text-xl text-[hsl(90,10%,35%)] leading-relaxed max-w-[640px] mx-auto mb-12 font-serif">
          All 10 ceremonies. One sacred arc. Held from beginning to end. This is not ten separate experiences, it is a single continuous initiation designed to compound. What opens in Cacao creates the foundation for what Hapé clears. What Hapé clears prepares the vessel for the Sacred Tea. The arc is intentional. The sequence is sacred.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mb-12 text-left">
          {[
            { title: "All 10 Ceremonies", desc: "Full access to every sacred gathering across both weeks of Sanctuary Week, from the gentlest Cacao circle to the final Kambo purification." },
            { title: "1:1 Preparation Call", desc: "A personal conversation with Sonatta or James before March 18. What you are carrying. What you are asking the sacraments to support." },
            { title: "Sacred Welcome Kit", desc: "Curated materials mailed to you: ceremonial guide, sacred journal, tea blend, sacred object, preparation instructions, and a welcome letter from the founders." },
            { title: "Integration Session", desc: "A 1:1 integration session with your facilitator within 14 days after March 29. What opened. What is integrating. How to carry this into daily life." },
          ].map((item) => (
            <div key={item.title} className="bg-[hsl(90,15%,95%)] border border-[hsl(90,15%,85%)] p-7">
              <h4 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(90,40%,30%)] mb-2.5 font-normal">{item.title}</h4>
              <p className="text-[16px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">{item.desc}</p>
            </div>
          ))}
        </div>
        <a href={EVENTBRITE_ORG} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(90,40%,30%)] text-[hsl(90,20%,97%)] hover:bg-[hsl(90,40%,38%)] transition-all">
          Secure the Full Package
        </a>
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(90,10%,50%)] mt-6">
          Limited to 8 participants · <Link to="/community-care" className="text-[hsl(90,40%,30%)] hover:underline">Community Care Model</Link> applies · Scholarship available
        </p>
      </div>
    </section>

    {/* FIRST CEREMONY */}
    <SanctuarySection eyebrow="Your First Ceremony" title={<>A Gentle<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Opening</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(90,10%,35%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p>We understand that the call to sacred practice can bring both excitement and hesitation. Your first experience, particularly with the heart-centered wisdom of Cacao, is designed to be a gentle, nourishing invitation to connect with your inner truth. This is not a journey of intensity, but one of profound, supported reconnection.</p>
        <p>Many seekers find that their fears soften into peace once they are held within our circle. You are deeply welcomed here, exactly as you are.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-12">
        {[
          { num: "01", title: "Before Ceremony", items: ["Arrive as you are, 30 minutes early to settle in", "A dedicated facilitator holds the container for your entire journey", "Your agency is sacred. You remain the sovereign of your experience"] },
          { num: "02", title: "During Ceremony", items: ["We hold space for your questions with patience and care", "Rest in the embrace of a compassionate circle", "You are free to move, rest, or step away whenever you feel called"] },
          { num: "03", title: "After Ceremony", items: ["Join us in a circle of shared presence and soft integration", "Time is held for you to rest, journal, and honor your inner blossoming", "We prepare you with care for your return to daily life"] },
        ].map((step) => (
          <div key={step.num} className="bg-[hsl(90,15%,94%)] border border-[hsl(90,15%,85%)] p-8">
            <p className="font-sans text-2xl font-extralight text-[hsl(90,40%,30%)] mb-3">{step.num}</p>
            <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(100,20%,15%)] mb-4">{step.title}</h3>
            <ul className="space-y-3">
              {step.items.map((item) => (
                <li key={item} className="text-[14px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

    {/* TESTIMONIALS */}
    <SanctuarySection eyebrow="Echoes of Others Who Walked This Path" title={<>In Their<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Own Words</em></>}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {[
          "I arrived with so much fear, but I was met with such warmth that I realized I could finally exhale.",
          "I thought I had to be perfect. Instead, I found permission to be human, and that was the true release.",
          "The safety of the group helped me touch parts of myself I had long kept hidden.",
        ].map((quote) => (
          <blockquote key={quote} className="bg-[hsl(90,15%,94%)] border border-[hsl(90,15%,85%)] p-8">
            <p className="font-serif italic text-[17px] text-[hsl(100,20%,15%)] leading-[1.7]">"{quote}"</p>
          </blockquote>
        ))}
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

    {/* COMMUNITY CARE SUMMARY + LINK */}
    <SanctuarySection id="care" eyebrow="Everything is Energy" title={<>Community<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Care Model</em></>}>
      <div className="text-center max-w-[600px] mx-auto">
        <p className="text-[19px] text-[hsl(90,10%,35%)] leading-relaxed font-serif mb-10">
          Three tiers so ceremony is accessible to all who are genuinely called. No one is turned away for lack of funds. We never ask you to prove your need. Trust is the foundation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-4">
        {[
          { title: "Sustainer", desc: "Full suggested contribution. Your full payment supports someone who cannot. This is the foundation of the community." },
          { title: "Community", desc: "Reduced contribution. For those who are working but genuinely strained. No explanation required. You belong.", featured: true },
          { title: "Scholarship", desc: "For genuine hardship. Funded by our TOME 501(c)(3) scholarship fund. A brief reflection is all that is required. We never ask you to prove your need." },
        ].map((tier) => (
          <div key={tier.title} className={`p-8 bg-[hsl(90,15%,94%)] border ${tier.featured ? "border-[hsl(90,25%,72%)]" : "border-[hsl(90,15%,85%)]"}`}>
            <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(90,40%,30%)] mb-3">{tier.title}</h3>
            <p className="text-[15px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">{tier.desc}</p>
          </div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to="/community-care"
          className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsl(90,20%,70%)] text-[hsl(90,40%,30%)] hover:bg-[hsl(90,40%,30%)] hover:text-[hsl(90,20%,97%)] transition-all"
        >
          Learn More About Community Care
        </Link>
      </div>
    </SanctuarySection>

    {/* FINAL CTA */}
    <section className="py-20 md:py-28 px-6 md:px-12 text-center bg-gradient-to-t from-[hsl(90,25%,92%)] to-[hsl(90,20%,97%)]">
      <div className="max-w-[640px] mx-auto">
        <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(90,40%,30%)] mb-6">Your Soul Knows</p>
        <h2 className="font-sans text-[clamp(28px,4.5vw,56px)] font-extralight leading-[1.05] text-[hsl(100,20%,15%)] mb-6">
          Will You Answer<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">the Call?</em>
        </h2>
        <p className="text-[19px] text-[hsl(90,10%,35%)] leading-relaxed font-serif mb-12">
          When you feel ready, a space of compassion is waiting for you. We are here to help you discern your next steps with kindness.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={EVENTBRITE_ORG} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(90,40%,30%)] text-[hsl(90,20%,97%)] hover:bg-[hsl(90,40%,38%)] transition-all">
            Reserve Your Place
          </a>
          <Link to="/contact" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsl(90,20%,70%)] text-[hsl(90,40%,30%)] hover:bg-[hsl(90,20%,93%)] transition-all">
            Speak With a Guide
          </Link>
        </div>
      </div>
    </section>
  </SanctuaryWeekLayout>
);

export default SanctuaryWeek;
