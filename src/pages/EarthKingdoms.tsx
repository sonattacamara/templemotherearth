import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { usePageTracking } from "@/hooks/useAnalytics";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Droplets, Mountain, Droplet, Magnet, Leaf, Dna, Sun, Pill, Candy, Flower2, Globe, Brain, ShieldCheck, Zap, Cat, Snail, Bug, Sparkles, HeartPulse, Gem, Eye } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const RevealSection = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.section ref={ref} id={id} className={className} initial={{ opacity: 0, y: 36 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
      {children}
    </motion.section>
  );
};

interface KingdomData {
  id: string;
  num: string;
  name: string;
  subtitle: string;
  lead: string;
  titleColor: string;
  eyebrowColor: string;
  factBg: string;
  factLabelColor: string;
  cardBg: string;
  cardNameColor: string;
  statNumColor: string;
  quoteColor: string;
  quoteCite: string;
  sections: { title: string; content: string }[];
  facts: { icon: LucideIcon; label: string; val: string }[];
  cards: { icon: LucideIcon; name: string; body: string }[];
  stats: { num: string; label: string }[];
  quote: { text: string; cite: string };
  ceremonyLink: { tag: string; name: string; href: string };
}

const kingdoms: KingdomData[] = [
  {
    id: "mineral", num: "One", name: "MINERAL", subtitle: "you are the temple",
    lead: "You are not separate from the Earth. You are made of it. The calcium in your bones is the same calcium in limestone. The iron in your blood is the same iron in the Earth's core.",
    titleColor: "#C4B8E8", eyebrowColor: "#7B6FA0", factBg: "#1A1625", factLabelColor: "#9B8FCC",
    cardBg: "#1A1625", cardNameColor: "#C4B8E8", statNumColor: "#C4B8E8", quoteColor: "#C4B8E8", quoteCite: "#7B6FA0",
    sections: [
      { title: "The Body Is a Mineral Vessel", content: "Your body requires over 60 minerals to function. Minerals regulate every enzymatic reaction, every nerve signal, every heartbeat. Honoring the body means feeding it what it was built from — sea moss, shilajit, structured water, trace elements." },
      { title: "Why We're Running on Empty", content: "Industrial agriculture has stripped topsoil of mineral content. Magnesium deficiency alone drives anxiety, insomnia, muscle tension — and over 80% of Americans are deficient." },
    ],
    facts: [
      { icon: Droplets, label: "Sea Moss", val: "Contains 92 of the 102 minerals the human body is made of." },
      { icon: Mountain, label: "Shilajit", val: "Ancient mineral resin with 85+ minerals and fulvic acid." },
      { icon: Droplet, label: "Structured Water", val: "Water in its fourth phase — H3O2 — hydrates at the cellular level." },
      { icon: Magnet, label: "Magnesium", val: "Involved in over 300 enzymatic reactions. 80%+ Americans deficient." },
    ],
    cards: [
      { icon: Droplets, name: "Sea Moss", body: "92 minerals. Bioavailable iodine, iron, calcium, magnesium, zinc." },
      { icon: Mountain, name: "Shilajit", body: "The 'destroyer of weakness.' Fulvic acid carries minerals into cells." },
      { icon: Magnet, name: "Magnesium", body: "Master mineral of the nervous system. Governs 300+ reactions." },
    ],
    stats: [
      { num: "60+", label: "Minerals the body requires" },
      { num: "92", label: "Minerals in sea moss" },
      { num: "80%", label: "Americans magnesium deficient" },
      { num: "70%", label: "Of your body is water" },
    ],
    quote: { text: "The body does not lie. Give it back what the Earth made it from — and watch what it remembers how to do.", cite: "Temple Mother Earth · 7 Pillars" },
    ceremonyLink: { tag: "Mineral Kingdom in the 7 Pillars", name: "Juicing · Detox · Water · DNA Upgrade · Sun", href: "/#offerings" },
  },
  {
    id: "plant", num: "Two", name: "PLANT", subtitle: "the oldest pharmacy on earth",
    lead: "The Plant Kingdom is the bridge between the mineral world and the animal world — rooted in Earth, reaching toward light. Plants are alchemists.",
    titleColor: "#8FD67A", eyebrowColor: "#3D7835", factBg: "#0A140A", factLabelColor: "#5BA84A",
    cardBg: "#0A140A", cardNameColor: "#8FD67A", statNumColor: "#8FD67A", quoteColor: "#8FD67A", quoteCite: "#3D7835",
    sections: [
      { title: "Plants as Sacrament", content: "75% of the world's population still relies primarily on plant sacrament for healthcare. Of 25,000+ plant species, approximately 80,000 have medicinal properties." },
      { title: "Ceremonial Plants at TME", content: "Cacao (Theobroma cacao) — the heart opener. Hapé — sacred Amazonian snuff. Blue Lotus — the sacred flower of ancient Egypt. Kava — the peace plant of the Pacific." },
    ],
    facts: [
      { icon: Leaf, label: "Species", val: "Over 390,000 plant species known. 80,000+ medicinal." },
      { icon: Dna, label: "Phytochemistry", val: "Plants produce 200,000+ secondary metabolites — alkaloids, terpenes, flavonoids." },
      { icon: Sun, label: "Photosynthesis", val: "Plants convert light into matter — when we eat plants, we ingest sunlight." },
      { icon: Pill, label: "Pharmaceutical Debt", val: "Over 50% of all pharmaceutical drugs derived from plant compounds." },
    ],
    cards: [
      { icon: Candy, name: "Ceremonial Cacao", body: "4,000 years of ceremony. Heart-opening, bliss-inducing." },
      { icon: Leaf, name: "Hapé", body: "Sacred tobacco blend. Grounds, clarifies, purifies." },
      { icon: Flower2, name: "Blue Lotus", body: "Sacred flower of Egypt. Mild psychoactive, profoundly calming." },
    ],
    stats: [
      { num: "390K", label: "Known plant species" },
      { num: "4,000+", label: "Years cacao in ceremony" },
      { num: "75%", label: "World uses plant sacrament" },
      { num: "92", label: "Minerals in sea moss" },
    ],
    quote: { text: "Plants are not passive. They are ancient intelligences who chose to become sacrament.", cite: "Ethnobotanist tradition · Amazon" },
    ceremonyLink: { tag: "Kingdom in Ceremony", name: "Cacao · Hapé · Sacred Tea House · Level 5", href: "/cacao" },
  },
  {
    id: "fungi", num: "Three", name: "FUNGI", subtitle: "the internet of the forest floor",
    lead: "Fungi are neither plant nor animal. They are their own kingdom — and arguably the most intelligent one.",
    titleColor: "#D4A060", eyebrowColor: "#9B6B3A", factBg: "#120D08", factLabelColor: "#C8883A",
    cardBg: "#120D08", cardNameColor: "#D4A060", statNumColor: "#D4A060", quoteColor: "#D4A060", quoteCite: "#9B6B3A",
    sections: [
      { title: "The Wood Wide Web", content: "Mycorrhizal fungi connect 90% of land plants. Trees share carbon, nitrogen, and water through mycelial highways. The forest has a nervous system. Fungi are the neurons." },
      { title: "Medicinal Mushrooms", content: "Reishi has been used for 2,000+ years. Lion's Mane stimulates nerve growth factor. Cordyceps increases cellular ATP by up to 28%." },
    ],
    facts: [
      { icon: Globe, label: "Mycelial Network", val: "A single teaspoon of soil contains miles of mycelial threads." },
      { icon: Brain, label: "Lion's Mane", val: "The only food known to stimulate NGF and BDNF — grows new neurons." },
      { icon: ShieldCheck, label: "Beta-Glucans", val: "Used as approved pharmaceutical drugs in Japan, China, South Korea." },
      { icon: Zap, label: "Cordyceps", val: "Increases cellular ATP production by up to 28%." },
    ],
    cards: [
      { icon: Brain, name: "Lion's Mane", body: "The brain mushroom. Grows new neurons." },
      { icon: Sparkles, name: "Reishi", body: "Mushroom of Immortality. Immune modulation, deep sleep." },
      { icon: Zap, name: "Cordyceps", body: "The warrior mushroom. Increases ATP and endurance." },
    ],
    stats: [
      { num: "3.8B", label: "Years fungi existed" },
      { num: "1.5M", label: "Estimated species" },
      { num: "60%", label: "Psilocybin remission rate" },
      { num: "28%", label: "ATP increase with Cordyceps" },
    ],
    quote: { text: "When you eat a medicinal mushroom, you are ingesting a piece of the planet's own intelligence.", cite: "Paul Stamets, Mycologist" },
    ceremonyLink: { tag: "Kingdom in Our Work", name: "Medicinal Mushroom Protocols · Microdose Education", href: "/level5" },
  },
  {
    id: "animal", num: "Four", name: "ANIMAL", subtitle: "sacred messengers & sacrament carriers",
    lead: "The Animal Kingdom is not a source of exploitation, it is a community of teachers. The frog, toad, snake, scorpion, ancient sacred intelligences.",
    titleColor: "#8FD67A", eyebrowColor: "#3D7A3D", factBg: "#060D06", factLabelColor: "#5BA84A",
    cardBg: "#060D06", cardNameColor: "#8FD67A", statNumColor: "#8FD67A", quoteColor: "#8FD67A", quoteCite: "#3D7A3D",
    sections: [
      { title: "The Frog · Kambo", content: "Phyllomedusa bicolor — over 70 bioactive peptides found nowhere else in nature. The frog is never harmed. The relationship is symbiotic, not extractive." },
      { title: "Sacred Animal Covenant", content: "These animals produce the most pharmacologically complex secretions in the biological world. Science is only beginning to map what indigenous wisdom keepers have known for millennia." },
    ],
    facts: [
      { icon: Cat, label: "Kambo Peptides", val: "70+ bioactive peptides including Dermorphin (30-40x more potent than morphine)." },
      { icon: Snail, label: "Bufo · 5-MeO-DMT", val: "The most intense non-ordinary state of consciousness accessible." },
      { icon: Sparkles, label: "Snake · Kundalini", val: "Universal symbol of transformation. Shedding the skin that no longer fits." },
      { icon: Bug, label: "Scorpion · Sacred Protocols", val: "Over 130,000 species. Ziconotide — 1,000x more potent than morphine." },
    ],
    cards: [
      { icon: Cat, name: "The Frog", body: "Kambo. 70+ peptides. The Great Purifier." },
      { icon: Snail, name: "The Toad", body: "5-MeO-DMT. Direct encounter with pure being." },
      { icon: Sparkles, name: "The Snake", body: "Kundalini energy. Shedding. Transformation." },
    ],
    stats: [
      { num: "70+", label: "Kambo bioactive peptides" },
      { num: "50+", label: "Amazonian tribes use Kambo" },
      { num: "80%", label: "5-MeO-DMT response rate" },
      { num: "4,000+", label: "Years of sacred use" },
    ],
    quote: { text: "The frog does not give you power. It removes everything in the way of the power that was always yours.", cite: "Matsés Elder Tradition" },
    ceremonyLink: { tag: "Kingdom in Ceremony", name: "Kambo Ceremony · Level 5 Initiation", href: "/kambo" },
  },
  {
    id: "human", num: "Five", name: "KINGDOM OF MAN", subtitle: "the conscious steward",
    lead: "You are not separate from the five kingdoms. You are the fifth one. The one with the capacity to be conscious of its place in the web.",
    titleColor: "#E8C868", eyebrowColor: "#8A4A3A", factBg: "#100808", factLabelColor: "#C8783A",
    cardBg: "#100808", cardNameColor: "#E8C868", statNumColor: "#E8C868", quoteColor: "#E8C868", quoteCite: "#8A4A3A",
    sections: [
      { title: "The Human as Temple", content: "The human body is the most complex living system known to science. It contains every mineral, every element, every frequency. When properly restored and ceremonially activated, the body becomes what it was designed to be: a living temple." },
      { title: "TME's Role", content: "Temple Mother Earth exists to restore the human being to its rightful place in the web of kingdoms — not above, not below, but woven in. Conscious. Humble. Powerful." },
    ],
    facts: [
      { icon: Dna, label: "DNA", val: "3.2 billion base pairs. Contains the blueprint of the universe in miniature." },
      { icon: Brain, label: "Neuroplasticity", val: "The brain can grow new neurons and rewire at any age. Ceremony accelerates this." },
      { icon: HeartPulse, label: "Heart Field", val: "The heart's electromagnetic field extends 3+ feet. Measurable by instruments." },
      { icon: Sparkles, label: "Consciousness", val: "The one kingdom that can choose to evolve. That choice is ceremony." },
    ],
    cards: [
      { icon: Dna, name: "DNA Upgrade", body: "Epigenetic activation through ceremony, nutrition, and practice." },
      { icon: Brain, name: "Neurogenesis", body: "Growing new neurons through sacrament and contemplative practice." },
      { icon: HeartPulse, name: "Heart Coherence", body: "Aligning heart, mind, and body into a single coherent field." },
    ],
    stats: [
      { num: "3.2B", label: "DNA base pairs" },
      { num: "37T", label: "Cells in the human body" },
      { num: "100B", label: "Neurons in the brain" },
      { num: "∞", label: "Capacity for conscious evolution" },
    ],
    quote: { text: "You are not here to transcend the body. You are here to inhabit it so fully that every kingdom recognizes you as kin.", cite: "Temple Mother Earth" },
    ceremonyLink: { tag: "Your Place in the Web", name: "Begin Your Journey · Sacred Intake", href: "/ceremony-intake" },
  },
];

const KingdomSection = ({ k, even }: { k: KingdomData; even: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      id={k.id}
      className={`py-[140px] px-6 md:px-[60px] relative overflow-hidden ${even ? "bg-[#0D0B08]" : "bg-[#050604]"}`}
      initial={{ opacity: 0, y: 36 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9 }}
    >
      <div className="max-w-[1100px] mx-auto">
        <p className="font-sans text-[9px] tracking-[5px] uppercase mb-4 font-normal" style={{ color: k.eyebrowColor }}>
          Kingdom {k.num}
        </p>
        <h2 className="font-serif text-[clamp(48px,8vw,100px)] font-bold leading-[0.92] mb-2 tracking-[-2px]" style={{ color: k.titleColor }}>
          {k.name}
          <em className="block italic font-light text-[0.5em] tracking-[5px] mt-2" style={{ color: `${k.titleColor}88` }}>{k.subtitle}</em>
        </h2>
        <p className="font-serif italic text-[22px] max-w-[700px] leading-[1.8] my-6 text-[#8A9A84]">{k.lead}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start mt-16">
          <div className="space-y-6">
            {k.sections.map((s) => (
              <div key={s.title}>
                <h3 className="font-serif text-[26px] italic text-[#F0EAD6] mb-4 mt-8 first:mt-0">{s.title}</h3>
                <p className="text-[17px] leading-[1.9] text-[#C4B49A]">{s.content}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col" style={{ background: k.factBg }}>
            {k.facts.map((f) => (
              <div key={f.label} className="py-[22px] px-7 border-b border-[rgba(200,160,48,0.06)] last:border-b-0 grid grid-cols-[36px_1fr] gap-4">
                <f.icon className="h-5 w-5 mt-0.5" style={{ color: k.factLabelColor }} />
                <div>
                  <div className="font-sans text-[8px] tracking-[3px] uppercase mb-1 font-normal" style={{ color: k.factLabelColor }}>{f.label}</div>
                  <div className="text-[15px] text-[#F0EAD6] leading-relaxed opacity-80">{f.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-16 bg-[rgba(200,160,48,0.06)]">
          {k.cards.map((c) => (
            <div key={c.name} className="p-9 hover:-translate-y-1 transition-transform" style={{ background: k.cardBg }}>
              <c.icon className="h-7 w-7 mb-3.5" style={{ color: k.cardNameColor }} />
              <h4 className="font-serif text-xl italic mb-2.5" style={{ color: k.cardNameColor }}>{c.name}</h4>
              <p className="text-sm leading-[1.75] opacity-75 text-[#F0EAD6]">{c.body}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 mt-16 bg-[rgba(200,160,48,0.06)]">
          {k.stats.map((s) => (
            <div key={s.label} className="p-8 text-center" style={{ background: k.cardBg }}>
              <div className="font-serif text-[48px] font-bold leading-none mb-2" style={{ color: k.statNumColor }}>{s.num}</div>
              <div className="font-sans text-[8px] tracking-[2px] uppercase text-[#8A9A84]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="border-l-[3px] p-8 md:p-10 my-16 bg-[rgba(255,255,255,0.02)]" style={{ borderColor: k.quoteCite }}>
          <p className="font-serif italic text-[22px] leading-[1.7] mb-3" style={{ color: k.quoteColor }}>{k.quote.text}</p>
          <cite className="font-sans text-[9px] tracking-[3px] uppercase not-italic" style={{ color: k.quoteCite }}>— {k.quote.cite}</cite>
        </blockquote>

        {/* Ceremony Link */}
        <Link to={k.ceremonyLink.href} className="flex items-center justify-between p-7 border border-[rgba(200,160,48,0.15)] hover:bg-[rgba(200,160,48,0.08)] hover:border-[rgba(200,160,48,0.4)] transition-all gap-5 flex-wrap">
          <div>
            <div className="font-sans text-[8px] tracking-[3px] uppercase text-[#C8A030] mb-1.5">{k.ceremonyLink.tag}</div>
            <div className="font-serif text-[22px] text-[#F0EAD6]">{k.ceremonyLink.name}</div>
          </div>
          <span className="font-sans text-[9px] tracking-[3px] uppercase text-[#C8A030]">Explore →</span>
        </Link>
      </div>
    </motion.section>
  );
};

const EarthKingdoms = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-[#050604] text-[#F0EAD6]" style={{ fontFamily: "'EB Garamond', serif" }}>
      <SEOHead
        title="The Earth Kingdoms | Temple Mother Earth"
        description="Discover the five Earth Kingdoms — Mineral, Plant, Fungi, Animal, and Kingdom of Man — the living intelligence behind every ceremony."
      />
      <Navigation />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Ancient forest canopy for Ayahuasca, Psilocybin, and sacred plant medicine journeys"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.4) brightness(0.22) hue-rotate(-15deg)" }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050604] via-[rgba(5,6,4,0.6)] to-[rgba(5,6,4,0.3)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(45,120,35,0.15)_0%,transparent_60%)]" />

        <motion.div className="relative z-10 text-center px-10 max-w-[1000px]" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="font-sans text-[9px] tracking-[6px] uppercase text-[#C8A030] mb-7">Temple Mother Earth · The Living Foundation</p>
          <p className="font-serif italic text-[26px] text-[#8A9A84] mb-4">Before there was ceremony, there was creation.</p>
          <h1 className="font-serif text-[clamp(64px,12vw,148px)] font-bold leading-[0.9] text-[#F0EAD6] tracking-[-3px] mb-3">
            The Earth<br />Kingdoms
            <em className="block italic font-light text-[0.55em] tracking-[4px] text-[#E8C868]">the living intelligence of all things</em>
          </h1>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C8A030] to-transparent mx-auto my-8" />
          <p className="font-serif italic text-[22px] text-[#F0EAD6] max-w-[700px] mx-auto mb-12 leading-[1.7]">
            Every sacrament we offer, every ceremony we hold, every transformation that happens at Temple Mother Earth flows from the intelligence of the living Earth, organized into five great Kingdoms.
          </p>
          <div className="flex gap-2 flex-wrap justify-center">
            {[
              { icon: Gem, label: "Mineral", href: "#mineral" },
              { icon: Leaf, label: "Plant", href: "#plant" },
              { icon: Sparkles, label: "Fungi", href: "#fungi" },
              { icon: Cat, label: "Animal", href: "#animal" },
              { icon: Eye, label: "Kingdom of Man", href: "#human" },
            ].map((pill) => (
              <a key={pill.label} href={pill.href} className="flex items-center gap-2 px-5 py-2.5 font-sans text-[9px] tracking-[2px] uppercase border border-[rgba(200,160,48,0.25)] text-[#8A9A84] hover:text-[#C8A030] hover:border-[#C8A030] hover:bg-[rgba(200,160,48,0.06)] transition-all">
                <pill.icon className="h-4 w-4" /> {pill.label}
              </a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Intro */}
      <RevealSection className="bg-[#0D0B08] py-24 px-6 md:px-[60px] border-b border-[rgba(200,160,48,0.08)]">
        <div className="max-w-[900px] mx-auto text-center">
          <p className="font-sans text-[9px] tracking-[5px] uppercase text-[#C8A030] mb-6">The Philosophy</p>
          <h2 className="font-serif text-[clamp(32px,5vw,58px)] font-semibold text-[#F0EAD6] mb-8 leading-[1.15]">
            We Are Not Separate<br /><em className="italic text-[#E8C868]">from Nature. We Are Nature.</em>
          </h2>
          <p className="text-[19px] leading-[1.9] text-[#C4B49A] italic mb-5">
            The crisis of modern life is a crisis of <strong className="text-[#F0EAD6] not-italic">separation</strong>. The Earth Kingdoms are a map of re-connection.
          </p>
          <p className="text-[19px] leading-[1.9] text-[#C4B49A] italic">
            At Temple Mother Earth, we don't just study this intellectually. <strong className="text-[#F0EAD6] not-italic">We work with it ceremonially.</strong>
          </p>
        </div>
      </RevealSection>

      {/* KINGDOM SECTIONS */}
      {kingdoms.map((k, i) => (
        <KingdomSection key={k.id} k={k} even={i % 2 === 1} />
      ))}

      {/* CONVERGENCE CTA */}
      <section className="bg-[#0D0B08] py-24 px-6 md:px-[60px] text-center border-t border-[rgba(200,160,48,0.08)]">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif text-[clamp(32px,5vw,64px)] font-semibold text-[#F0EAD6] mb-5 leading-[1.15]">
            The Kingdoms Are<br /><em className="italic text-[#E8C868]">Waiting for You</em>
          </h2>
          <p className="font-serif italic text-[19px] text-[#8A9A84] max-w-[600px] mx-auto mb-12 leading-[1.8]">
            Every ceremony is a conversation with one or more of the five kingdoms. Choose your entry point and begin.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/sanctuary-week" className="inline-block bg-[#C8A030] text-[#050604] px-[52px] py-[18px] font-sans text-[10px] tracking-[3px] uppercase font-bold border-2 border-[#C8A030] hover:bg-transparent hover:text-[#C8A030] transition-all">
              Explore Sanctuary Week
            </Link>
            <Link to="/ceremony-intake" className="inline-block bg-transparent text-[#F0EAD6] px-10 py-[18px] font-sans text-[10px] tracking-[3px] uppercase border border-[rgba(240,234,214,0.2)] hover:border-[#C8A030] hover:text-[#C8A030] transition-all">
              Begin Your Journey
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050604] border-t border-[rgba(200,160,48,0.08)] py-8 px-6 text-center">
        <p className="font-sans text-[9px] tracking-[2px] uppercase text-[#6A6050]">
          © 2026 Temple Mother Earth · 508(c)(1)(A) Sacred Church · Washington, DC
        </p>
      </footer>
    </div>
  );
};

export default EarthKingdoms;
