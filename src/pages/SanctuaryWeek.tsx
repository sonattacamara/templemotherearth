import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

const EVENTBRITE_ORG = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

interface CeremonyCardData {
  slug: string;
  date: string;
  name: string;
  subtitle: string;
  description: string;
  tags: { label: string; type?: "free" | "app" | "default" }[];
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
    ctaLabel: "Secure Your Place →",
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
    ctaLabel: "Secure Your Place →",
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
    ctaLabel: "Secure Your Place →",
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
        className="group flex flex-col bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.07)] hover:border-[hsla(45,70%,49%,0.3)] transition-colors overflow-hidden"
      >
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-[220px] object-cover saturate-[0.6] brightness-[0.7] group-hover:saturate-[0.8] group-hover:brightness-[0.8] transition-[filter] duration-400"
          loading="lazy"
        />
        <div className="p-6 md:p-7 flex-1 flex flex-col">
          <p className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-3">
            {card.date}
          </p>
          <h3 className="font-sans text-[13px] font-light text-[hsl(40,30%,90%)] mb-2 leading-tight">
            {card.name}
          </h3>
          <p className="font-serif italic text-[15px] text-[hsl(45,70%,60%)] mb-3.5">
            {card.subtitle}
          </p>
          <p className="text-[15px] text-[hsl(35,30%,68%)] leading-relaxed flex-1 mb-5 font-serif">
            {card.description}
          </p>
          <div className="flex gap-2 flex-wrap mb-5">
            {card.tags.map((tag) => (
              <span
                key={tag.label}
                className={`font-sans text-[7px] tracking-[2px] uppercase border px-2.5 py-1 ${
                  tag.type === "free"
                    ? "text-[hsl(110,40%,46%)] border-[hsla(110,40%,46%,0.3)]"
                    : tag.type === "app"
                    ? "text-[hsl(45,70%,49%)] border-[hsla(45,70%,49%,0.4)]"
                    : "text-[hsl(35,20%,42%)] border-[hsla(45,70%,49%,0.2)]"
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
              className="block text-center font-sans text-[8px] tracking-[2px] uppercase py-3 px-5 border border-[hsla(45,70%,49%,0.3)] text-[hsl(45,70%,49%)] hover:bg-[hsl(45,70%,49%)] hover:text-[hsl(100,20%,3%)] transition-all mt-auto"
            >
              {card.ctaLabel}
            </a>
          ) : (
            <span className="block text-center font-sans text-[8px] tracking-[2px] uppercase py-3 px-5 border border-[hsla(45,70%,49%,0.15)] text-[hsl(35,20%,42%)] mt-auto">
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
        alt="Sacred ceremony space"
        className="absolute inset-0 w-full h-full object-cover saturate-50 brightness-50 -z-10"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(100,20%,3%)] via-[hsla(100,20%,3%,0.7)] to-[hsla(100,20%,3%,0.3)] -z-10" />
      <motion.div
        className="relative z-10 max-w-[860px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="inline-block bg-[hsl(45,70%,49%)] text-[hsl(100,20%,3%)] font-sans text-[8px] tracking-[4px] uppercase px-5 py-2 mb-8">
          Grand Reopening · Year Six · Spring Equinox 2026
        </span>
        <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">
          Temple Mother Earth · Washington, DC
        </p>
        <h1 className="font-sans text-[clamp(40px,7vw,88px)] font-extralight leading-none text-[hsl(40,30%,90%)] mb-6 tracking-tight">
          Sanctuary<br />
          <em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Week</em>
        </h1>
        <p className="font-serif italic text-[clamp(18px,2vw,24px)] text-[hsl(35,30%,68%)] max-w-[580px] leading-relaxed mb-12">
          In 2020, when the world closed its doors, we opened ours. Six years later, we're still here. And this March, we're celebrating. Ten days. Ten ceremonies. One sacred container. Come home.
        </p>
        <div className="flex gap-4 flex-wrap">
          <a href="#ceremonies" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(100,20%,3%)] hover:bg-[hsl(45,70%,60%)] transition-all">
            See All Ceremonies
          </a>
          <a href="#package" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-transparent border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.08)] transition-all">
            Full Package $2,222
          </a>
        </div>
      </motion.div>
    </section>

    {/* ORIGIN STORY */}
    <SanctuarySection eyebrow="Year Six · Spring Equinox 2026" title={<>Six Years Ago<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">We Didn't Know What We Were Building</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(35,30%,68%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p>We only knew people needed somewhere to land. During the pandemic, when isolation became policy, when people lost their bodies, their community, their sense of what was real, Temple Mother Earth opened. Not despite the moment. Because of it.</p>
        <p>Six years later, that somewhere has grown into a 508(c)(1)(A) sacred church, a 501(c)(3) nonprofit, a healing ecosystem, and a family. This March is our Grand Reopening, and the beginning of Year Six's most powerful chapter yet.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-16">
        {[
          { title: "The Energy of 6", desc: "In numerology, 6 is the number of home, community, and unconditional nurturing. The hearth. The gathering place. The love that asks nothing in return." },
          { title: "The Lovers · Tarot", desc: "Card VI in the Tarot, sacred union, conscious alignment, the moment of choosing who you truly are. Year Six is the year we choose with intention." },
          { title: "What This Means", desc: "Six years of building home. Six years of holding the hearth. Sanctuary Week is the celebration of what we built, and the opening of what comes next." },
        ].map((card) => (
          <div key={card.title} className="bg-[hsl(105,30%,5%)] p-8 md:p-9 border border-[hsla(45,70%,49%,0.1)]">
            <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3 font-normal">{card.title}</h3>
            <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{card.desc}</p>
          </div>
        ))}
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* SACRED REST */}
    <SanctuarySection eyebrow="The Rhythm of the Temple" title={<>Why We Close<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">After the Winter Solstice</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(35,30%,68%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p>Every year after the Winter Solstice, Temple Mother Earth enters a period of <strong className="text-[hsl(40,30%,90%)]">Sacred Rest</strong>. We close our doors to the public. Ceremonies pause. The outward work stops.</p>
        <p>This is not a break. This is the work. The land rests. The facilitators restore. The founders recalibrate the vision, refine the protocols, study, pray, and prepare. The sacraments themselves require seasonal alignment. You cannot pour from a vessel that has not been refilled.</p>
        <p>Between the Winter Solstice and the Spring Equinox, the Temple does what the Earth does: it goes inward. We review the year. We grieve what needs grieving. We release what has completed its cycle. We vision what is emerging. And then, when the light returns, <strong className="text-[hsl(40,30%,90%)]">we open the doors again.</strong></p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mt-16">
        {[
          { icon: "🌑", title: "Winter Solstice · The Closing", desc: "The shortest day. The deepest night. We honor this by closing public ceremonies and turning inward. Facilitator training, sacred study, land stewardship, and internal ceremony take place during this time." },
          { icon: "🌿", title: "Spring Equinox · The Reopening", desc: "When day and night are equal, the Temple reopens. Sanctuary Week is our Grand Reopening, a declaration that the light has returned and the Temple is ready to hold space once more. Year Six begins here." },
        ].map((card) => (
          <div key={card.title} className="bg-[hsl(105,30%,5%)] p-10 border border-[hsla(45,70%,49%,0.1)]">
            <span className="text-3xl block mb-4">{card.icon}</span>
            <h3 className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3 font-normal">{card.title}</h3>
            <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{card.desc}</p>
          </div>
        ))}
      </div>
      <blockquote className="mt-16 border-l-[3px] border-[hsl(45,70%,49%)] p-8 bg-[hsla(45,70%,49%,0.03)] max-w-[720px] mx-auto">
        <p className="font-serif italic text-[22px] text-[hsl(40,30%,90%)] leading-[1.7]">
          A temple that never rests cannot hold what arrives. We close so that when we open, every ceremony carries the full weight of preparation, intention, and seasonal alignment.
        </p>
        <cite className="block mt-4 font-sans text-[9px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] not-italic">Temple Mother Earth · Seasonal Covenant</cite>
      </blockquote>
    </SanctuarySection>

    {/* WEEK ONE */}
    <section className="px-6 md:px-12 py-16 md:py-20 max-w-[1160px] mx-auto" id="ceremonies">
      <div className="flex items-baseline gap-6 mb-12 pb-6 border-b border-[hsla(45,70%,49%,0.1)]">
        <span className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(110,40%,46%)]">Week One</span>
        <h2 className="font-sans text-[clamp(18px,2.5vw,28px)] font-extralight text-[hsl(40,30%,90%)]">
          March 18–23 · <em className="font-serif italic text-[hsl(45,70%,49%)]">The Core Ceremonies</em>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0.5">
        {weekOne.map((card) => (
          <CeremonyCard key={card.slug} card={card} />
        ))}
      </div>
    </section>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* WEEK TWO */}
    <section className="px-6 md:px-12 py-16 md:py-20 max-w-[1160px] mx-auto">
      <div className="flex items-baseline gap-6 mb-12 pb-6 border-b border-[hsla(45,70%,49%,0.1)]">
        <span className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(110,40%,46%)]">Week Two</span>
        <h2 className="font-sans text-[clamp(18px,2.5vw,28px)] font-extralight text-[hsl(40,30%,90%)]">
          March 25–29 · <em className="font-serif italic text-[hsl(45,70%,49%)]">Extended Offerings</em>
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
      className="bg-gradient-to-br from-[hsl(114,36%,13%)] via-[hsl(105,30%,5%)] to-[hsl(100,20%,3%)] border-t border-b border-[hsla(45,70%,49%,0.15)] py-20 md:py-24 px-6 md:px-12 text-center"
    >
      <div className="max-w-[860px] mx-auto">
        <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">The Full Initiation</p>
        <p className="font-sans text-4xl font-extralight text-[hsl(45,70%,49%)] mb-6 tracking-tight">$2,222</p>
        <h2 className="font-sans text-[clamp(24px,4vw,52px)] font-extralight leading-[1.05] mb-6 text-[hsl(40,30%,90%)]">
          The Sanctuary Week<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Initiation Package</em>
        </h2>
        <p className="text-xl text-[hsl(35,30%,68%)] leading-relaxed max-w-[640px] mx-auto mb-12 font-serif">
          All 10 ceremonies. One sacred arc. Held from beginning to end. This is not ten separate experiences, it is a single continuous initiation designed to compound.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mb-12 text-left">
          {[
            { title: "All 10 Ceremonies", desc: "Every offering across Sanctuary Week, from the gentlest Cacao circle to the full arc of Level 5 and the final Kambo purification on March 29." },
            { title: "1:1 Preparation Call", desc: "A personal conversation with Sonatta or James before March 18. What you are carrying. What you are asking the sacraments to support." },
            { title: "Sacred Welcome Kit", desc: "Mailed to you or held for pickup. Ceremonial items, preparation guidance, and sacred objects chosen for your specific journey." },
            { title: "Integration Session", desc: "A 1:1 integration session with your facilitator within 14 days after March 29. What opened. What is integrating. How to carry this into daily life." },
          ].map((item) => (
            <div key={item.title} className="bg-[hsla(100,20%,3%,0.5)] border border-[hsla(45,70%,49%,0.1)] p-7">
              <h4 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-2.5 font-normal">{item.title}</h4>
              <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{item.desc}</p>
            </div>
          ))}
        </div>
        <a href={EVENTBRITE_ORG} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(100,20%,3%)] hover:bg-[hsl(45,70%,60%)] transition-all">
          Secure the Full Package
        </a>
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mt-6">
          Limited to 8 participants · Community Care Model applies · Scholarship available
        </p>
      </div>
    </section>

    {/* COMMUNITY CARE MODEL */}
    <SanctuarySection id="care" eyebrow="Our Financial Model" title={<>Community<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Care Model</em></>}>
      <div className="text-center max-w-[600px] mx-auto">
        <p className="font-sans text-[9px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-5">Everything is energy.</p>
        <p className="text-[19px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-10">
          Three tiers so ceremony is accessible to all who are genuinely called. We never ask you to prove your need. Trust is the foundation.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-10">
        {[
          { title: "Sustainer", desc: "Full suggested contribution. For those who can give at this level, you are also supporting someone who cannot. This is the foundation of the community." },
          { title: "Community", desc: "Reduced contribution. For those who are working, committed, and genuinely strained by full price. No explanation required.", featured: true },
          { title: "Scholarship", desc: "For genuine hardship. Funded by our TOME 501(c)(3) scholarship fund. A brief reflection application is all that's required." },
        ].map((tier) => (
          <div key={tier.title} className={`p-8 bg-[hsl(105,30%,5%)] border ${tier.featured ? "border-[hsla(45,70%,49%,0.3)]" : "border-[hsla(45,70%,49%,0.1)]"}`}>
            <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3">{tier.title}</h3>
            <p className="text-[15px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{tier.desc}</p>
          </div>
        ))}
      </div>
    </SanctuarySection>
  </SanctuaryWeekLayout>
);

export default SanctuaryWeek;
