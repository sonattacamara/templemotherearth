import { useState, useMemo, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, Sparkles, Leaf, Shield, Flower2, TreePine, X,
  ChevronDown, MapPin, ArrowRight, Flame, Moon, Star, Globe
} from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";

/* ─── Category Icons & Colors ─── */
const categoryMeta: Record<string, { icon: React.ReactNode; accent: string }> = {
  "Entheogenic & Psychoactive Plant Medicines": { icon: <Sparkles className="h-6 w-6" />, accent: "hsl(280,40%,55%)" },
  "Master Plant Teachers & Dieta Plants": { icon: <TreePine className="h-6 w-6" />, accent: "hsl(140,45%,45%)" },
  "Cleansing & Purgative Medicines": { icon: <Shield className="h-6 w-6" />, accent: "hsl(30,70%,50%)" },
  "Traditional Sacred & Ceremonial Plant Allies": { icon: <Flower2 className="h-6 w-6" />, accent: "hsl(350,50%,55%)" },
  "Sacred Fungi & Medicinal Mushrooms": { icon: <Moon className="h-6 w-6" />, accent: "hsl(200,50%,50%)" },
};

const categoryShortNames: Record<string, string> = {
  "Entheogenic & Psychoactive Plant Medicines": "Entheogenic",
  "Master Plant Teachers & Dieta Plants": "Master Plants",
  "Cleansing & Purgative Medicines": "Cleansing",
  "Traditional Sacred & Ceremonial Plant Allies": "Sacred Allies",
  "Sacred Fungi & Medicinal Mushrooms": "Sacred Fungi",
};

/* ─── Origin Region Mapping ─── */
const regionMap: Record<string, string[]> = {
  "Amazon Basin": ["Ayahuasca (Sacred Vine)", "Kambo", "Rapé / Hapé", "Sananga", "Bobinsana", "Chiric Sanango", "Ajo Sacha", "Piñón Colorado", "Chullachaki Caspi", "Noya Rao", "Camalonga", "Uchu Sanango", "Jurema (Mimosa Hostilis)", "Tobacco / Mapacho", "Yopo / Cohoba"],
  "Mesoamerica": ["Psilocybin Mushrooms", "Salvia Divinorum", "Morning Glory (Ololiuqui)", "Cacao (Ceremonial Grade)", "Damiana"],
  "Andes": ["San Pedro (Huachuma)", "Coca Leaf", "Cebil / Vilca", "Cordyceps"],
  "Africa": ["Iboga / Ibogaine", "Blue Lotus", "Khat"],
  "Asia & Pacific": ["Cannabis / Hemp", "Kava", "Kratom", "Betel Nut", "Hawaiian Baby Woodrose", "Calamus Root (Sweet Flag)"],
  "Europe & Siberia": ["Amanita Muscaria (Fly Agaric)", "Mugwort", "Wormwood / Artemisia", "Chaga"],
  "Middle East": ["Syrian Rue (Harmal)"],
  "Worldwide": ["Lion's Mane", "Reishi (Lingzhi)", "Turkey Tail", "Passionflower", "Guayusa", "Sassafras"],
};

/* ─── Glossary Data ─── */
interface GlossaryEntry {
  name: string;
  botanical: string;
  origin: string;
  description: string;
  link?: string;
  linkLabel?: string;
}

interface GlossaryCategory {
  category: string;
  description: string;
  entries: GlossaryEntry[];
}

const glossaryData: GlossaryCategory[] = [
  {
    category: "Entheogenic & Psychoactive Plant Medicines",
    description: "Sacred visionary sacraments used in ceremonial traditions worldwide for spiritual awakening, deep transformation, and consciousness expansion.",
    entries: [
      { name: "Ayahuasca (Sacred Vine)", botanical: "Sacred Amazonian Vine Brew", origin: "Amazon Basin — Peru, Colombia, Brazil, Ecuador", description: "The Vine of the Soul — a sacred ceremonial brew held as sacrament by Amazonian Indigenous congregations for centuries, honored within our legally protected religious practice under RFRA. Also known as Sacred Vine, Yagé, and La Medicina.", link: "/retreats-inquiry", linkLabel: "Explore Sacred Vine Retreats" },
      { name: "Peyote (Hikuri)", botanical: "Sacred Cactus", origin: "Mexico, Southwestern United States", description: "Sacred cactus central to Native American traditions and Huichol (Wixárika) ceremonies. Used for prayer, sacred practice, and divine communion for thousands of years." },
      { name: "San Pedro (Huachuma)", botanical: "Sacred Andean Cactus", origin: "Andes — Peru, Ecuador, Bolivia", description: "Sacred cactus from the Andes used for thousands of years in sacred ceremonies. Known as the 'Cactus of the Four Winds.'" },
      { name: "Sacred Fungi", botanical: "Ceremonial Mushroom Species", origin: "Worldwide — Mesoamerica (Mazatec tradition)", description: "Sacred fungi revered across cultures and honored within the Fungi Kingdom of our Five Kingdoms of Medicine theology. Used in Mazatec ceremonial traditions for deep spiritual transformation and consciousness expansion." },
      { name: "Iboga", botanical: "Sacred African Root Bark", origin: "Central Africa — Gabon, Cameroon", description: "Root bark used in Bwiti spiritual tradition for initiation, transformation, and deep spiritual work. One of Africa's most powerful sacred sacraments." },
      { name: "Salvia Divinorum", botanical: "Diviner's Sage", origin: "Oaxaca, Mexico", description: "Used by Mazatec practitioners (curanderos) for divination and spiritual practice. A sacred visionary sacrament of Mesoamerican ceremonial tradition." },
      { name: "Cannabis / Hemp", botanical: "Sacred Ceremonial Plant", origin: "Central Asia — used globally", description: "Ceremonial plant used across Rastafari, Hindu (Shiva worship), and Sufi traditions for meditation, prayer, and spiritual connection." },
      { name: "Morning Glory (Ololiuqui)", botanical: "Sacred Seed", origin: "Mexico — Aztec and Mazatec traditions", description: "Sacred seeds used by Aztec and Mazatec peoples for divination and spiritual ceremonies for centuries." },
      { name: "Hawaiian Baby Woodrose", botanical: "Sacred Seed", origin: "Indian subcontinent, Hawaii", description: "Seeds used in traditional visionary and meditative sacred practices." },
      { name: "Jurema (Mimosa Hostilis)", botanical: "Sacred Root Bark", origin: "Brazil — Northeastern traditions", description: "Sacred root bark used in Brazilian Jurema Sagrada ceremonies. A deeply revered sacrament of Northeastern Brazilian spiritual traditions." },
      { name: "Syrian Rue (Harmal)", botanical: "Sacred Seed", origin: "Middle East, North Africa, Central Asia", description: "Sacred seeds used in Middle Eastern and North African spiritual traditions for ceremony, purification, and spiritual communion." },
      { name: "Yopo / Cohoba", botanical: "Sacred Ceremonial Seed", origin: "Caribbean, South America", description: "Sacred seeds traditionally used by indigenous Caribbean and South American peoples for visionary ceremonial practice." },
      { name: "Cebil / Vilca", botanical: "Sacred Andean Seed", origin: "Andes — Argentina, Bolivia, Peru", description: "Related to Yopo, used in Andean spiritual traditions. Seeds are prepared as sacred snuff for ceremonial use." },
    ],
  },
  {
    category: "Master Plant Teachers & Dieta Plants",
    description: "Plants used in Amazonian plant dieta traditions, often alongside ayahuasca, to deepen transformation, build spiritual relationships, and strengthen the body and mind.",
    entries: [
      { name: "Tobacco / Mapacho", botanical: "Nicotiana rustica", origin: "Americas — pan-indigenous", description: "Considered the 'Grandfather' plant in many indigenous traditions. Used for prayer, protection, purification, and energetic clearing. Mapacho is the ceremonial jungle tobacco distinct from commercial varieties." },
      { name: "Bobinsana", botanical: "Calliandra angustifolia", origin: "Amazon Basin — Peru", description: "Heart-opening plant teacher used in traditional dieta. Known for cultivating compassion, emotional sensitivity, and dream enhancement." },
      { name: "Chiric Sanango", botanical: "Brunfelsia grandiflora", origin: "Amazon Basin — Peru", description: "Master plant used for emotional restoration, building courage, and clearing fear. Often used in plant dietas to strengthen resolve." },
      { name: "Ajo Sacha", botanical: "Mansoa alliacea", origin: "Amazon Basin", description: "'Garlic vine' used for spiritual cleansing, protection against negative energies, and strengthening the immune system." },
      { name: "Piñón Colorado", botanical: "Jatropha gossypiifolia", origin: "Amazon Basin", description: "Used for purification, spiritual protection, and energetic cleansing in Amazonian curanderismo." },
      { name: "Chullachaki Caspi", botanical: "Tovomita sp.", origin: "Amazon Basin — Peru", description: "Grounding and strengthening tree medicine. Used in plant dietas for stability, focus, and physical resilience." },
      { name: "Noya Rao", botanical: "Tree of Light", origin: "Amazon Basin — Shipibo tradition", description: "Extremely rare luminescent tree considered one of the most powerful dieta plants. Known for spiritual illumination and deep visionary work." },
      { name: "Camalonga", botanical: "Thevetia peruviana", origin: "Amazon Basin", description: "Seeds used in plant dietas for enhancing dreams, developing visionary capacity, and spiritual protection." },
      { name: "Uchu Sanango", botanical: "Tabernaemontana sananho", origin: "Amazon Basin — Peru", description: "Used for emotional and physical restoration, particularly joint pain and inflammation. Known for generating intense heat during dieta." },
    ],
  },
  {
    category: "Cleansing & Purgative Medicines",
    description: "Powerful cleansing allies used in ceremony for physical detoxification, spiritual purification, and energetic clearing.",
    entries: [
      { name: "Kambo", botanical: "Phyllomedusa bicolor (Giant Monkey Tree Frog)", origin: "Amazon Basin — Brazil, Peru, Colombia", description: "Sacred frog sacrament used for physical detoxification, immune system strengthening, emotional clearing, and spiritual purification. Applied through small burns on the skin.", link: "/ceremony-intake", linkLabel: "Begin Your Kambo Journey" },
      { name: "Rapé / Hapé", botanical: "Nicotiana rustica + medicinal plant ashes", origin: "Amazon Basin — Brazil, Peru", description: "Sacred tobacco snuff blended with tree ashes and medicinal plants. Used for grounding, mental clarity, energetic clearing, and opening the third eye.", link: "/ceremony-intake", linkLabel: "Experience Hapé Ceremony" },
      { name: "Sananga", botanical: "Tabernaemontana undulata", origin: "Amazon Basin — Brazil", description: "Sacred eye drops used for sharpening spiritual vision (both physical and energetic), clearing panema (negative energy), and enhancing focus." },
      { name: "Cacao (Ceremonial Grade)", botanical: "Theobroma cacao", origin: "Mesoamerica — Mexico, Guatemala, Peru", description: "Heart-opening ceremonial drink used for emotional release, creative inspiration, and community connection. 'Theobroma' translates to 'Food of the Gods.'", link: "/ceremony-intake", linkLabel: "Join a Cacao Ceremony" },
      { name: "Guayusa", botanical: "Ilex guayusa", origin: "Ecuador — Kichwa tradition", description: "Caffeinated Amazonian tea used for dream enhancement, morning alertness, and community gathering. Known as the 'Night Watchman's Plant.'" },
      { name: "Sassafras", botanical: "Sassafras albidum", origin: "Eastern North America", description: "Traditional cleansing herb used as a blood purifier and spring tonic in Native American and folk traditions." },
    ],
  },
  {
    category: "Traditional Sacred & Ceremonial Plant Allies",
    description: "Time-honored botanical allies used across global ceremonial traditions for emotional balance, dream work, and holistic wellness.",
    entries: [
      { name: "Blue Lotus", botanical: "Nymphaea caerulea", origin: "Egypt, East Africa", description: "Sacred flower of ancient Egyptian ceremony. Used for relaxation, enhanced meditation, and dream work. Deeply connected to African ancestral ceremonial lineages." },
      { name: "Mugwort", botanical: "Artemisia vulgaris", origin: "Europe, Asia, North America", description: "Dream-enhancing herb and feminine sacrament. Used for lucid dreaming, menstrual support, and spiritual protection." },
      { name: "Damiana", botanical: "Turnera diffusa", origin: "Mexico, Central America", description: "Heart and sensual sacrament traditionally used for mood support and heart-opening. Also used in ceremonial settings." },
      { name: "Passionflower", botanical: "Passiflora incarnata", origin: "Americas", description: "Sacred calming herb used for soothing anxiety, supporting sleep, and as a gentle nervine in traditional ceremony." },
      { name: "Kava", botanical: "Piper methysticum", origin: "Pacific Islands — Fiji, Vanuatu, Tonga", description: "Ceremonial relaxant used in Pacific Island traditions for peace-making, community gathering, and spiritual communion. Promotes calm and social connection." },
      { name: "Kratom", botanical: "Mitragyna speciosa", origin: "Southeast Asia — Thailand, Malaysia, Indonesia", description: "Used traditionally in Southeast Asian sacred practice for physical support, mood enhancement, and energy." },
      { name: "Wormwood / Artemisia", botanical: "Artemisia absinthium", origin: "Europe, Asia, North Africa", description: "Bitter cleansing herb used for parasitic support, digestive health, and spiritual purification." },
      { name: "Calamus Root (Sweet Flag)", botanical: "Acorus calamus", origin: "Northern Hemisphere — pan-indigenous", description: "Used in many indigenous traditions for mental clarity, purification, and as a voice-strengthening sacrament." },
      { name: "Coca Leaf", botanical: "Erythroxylum coca", origin: "Andes — Peru, Bolivia, Colombia", description: "Sacred plant of the Andes used for altitude sickness, energy, and ceremonial offerings (kintu). Chewed or brewed as mate de coca." },
      { name: "Khat", botanical: "Catha edulis", origin: "East Africa, Arabian Peninsula", description: "Sacred stimulant plant used in East African and Yemeni social and spiritual traditions." },
      { name: "Betel Nut", botanical: "Areca catechu", origin: "Southeast Asia, Pacific Islands", description: "Ceremonial stimulant chewed across Southeast Asian traditions. Often combined with betel leaf and lime." },
    ],
  },
  {
    category: "Sacred Fungi & Medicinal Mushrooms",
    description: "The Fungi Kingdom offers both visionary sacraments and powerful functional allies for immune support, cognitive enhancement, and spiritual growth.",
    entries: [
      { name: "Amanita Muscaria (Fly Agaric)", botanical: "Amanita muscaria", origin: "Siberia, Northern Europe, North America", description: "Iconic red-and-white mushroom used in Siberian shamanic traditions. Associated with Norse, Slavic, and proto-Indo-European spiritual practices." },
      { name: "Lion's Mane", botanical: "Hericium erinaceus", origin: "North America, Europe, Asia", description: "Powerful nootropic mushroom supporting cognitive function and neuroplasticity. Used in traditional wellness protocols." },
      { name: "Reishi (Lingzhi)", botanical: "Ganoderma lucidum", origin: "East Asia — China, Japan", description: "The 'Mushroom of Immortality.' Used for immune modulation, stress adaptation, spiritual cultivation, and longevity in Traditional Chinese practices." },
      { name: "Chaga", botanical: "Inonotus obliquus", origin: "Northern Hemisphere — Siberia, Scandinavia", description: "Powerful antioxidant mushroom used for immune support, inflammation reduction, and as a traditional folk remedy." },
      { name: "Turkey Tail", botanical: "Trametes versicolor", origin: "Worldwide", description: "Immune-boosting mushroom used for gut microbiome health and holistic wellness support." },
      { name: "Cordyceps", botanical: "Cordyceps militaris / sinensis", origin: "Tibetan Plateau, Himalayas", description: "Energy and performance-enhancing mushroom used in Tibetan and Chinese traditions. Supports oxygen utilization, stamina, and respiratory health." },
    ],
  },
];

const internationalLocations = [
  { region: "Washington, DC & DMV Area", description: "Our home sanctuary offering regular Kambo ceremonies, Hapé circles, cacao ceremonies, and integration support.", link: "/ceremony-intake", icon: <MapPin className="h-5 w-5" /> },
  { region: "Mexico (Sayulita, Riviera Nayarit)", description: "International sacred immersions on the Pacific coast featuring multi-day retreats with sacred vine ceremonies.", link: "/retreats-inquiry", icon: <Globe className="h-5 w-5" /> },
  { region: "Costa Rica", description: "Tropical retreat immersions in Costa Rica's biodiversity-rich landscape, surrounded by pristine rainforest.", link: "/retreats-inquiry", icon: <Globe className="h-5 w-5" /> },
  { region: "Peru (Amazon & Sacred Valley)", description: "Deep Amazonian immersions in the birthplace of ayahuasca, Kambo, and master plant dieta traditions.", link: "/retreats-inquiry", icon: <Globe className="h-5 w-5" /> },
  { region: "Traveling Ceremonies (Nationwide)", description: "Temple Mother Earth brings sacred ceremonies to communities across the United States.", link: "/traveling-ceremonies", icon: <MapPin className="h-5 w-5" /> },
  { region: "Private Ceremonies (Anywhere)", description: "Personalized one-on-one or small group ceremonies with our experienced facilitators.", link: "/private-ceremonies", icon: <Star className="h-5 w-5" /> },
];

/* ─── Accordion Entry ─── */
const GlossaryAccordionEntry = ({ entry }: { entry: GlossaryEntry }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className={`border border-[hsla(45,70%,49%,${isOpen ? "0.25" : "0.08"})] bg-[hsl(105,30%,${isOpen ? "14" : "12"}%)] transition-colors`}
      layout
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left group"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-sans text-[14px] font-light text-[hsl(40,30%,90%)] group-hover:text-[hsl(45,70%,55%)] transition-colors">
            {entry.name}
          </h4>
          <p className="font-serif italic text-[12px] text-[hsl(35,20%,50%)] mt-0.5 truncate">{entry.botanical}</p>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-3 shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-[hsl(45,70%,49%)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-[hsla(45,70%,49%,0.08)] pt-4">
              <p className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-3">{entry.origin}</p>
              <p className="text-[15px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{entry.description}</p>
              {entry.link && (
                <Link
                  to={entry.link}
                  className="inline-flex items-center gap-2 mt-4 font-sans text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] hover:text-[hsl(45,70%,60%)] transition-colors"
                >
                  {entry.linkLabel} <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Category Section ─── */
const GlossaryCategorySection = ({ category, filteredEntries }: { category: GlossaryCategory; filteredEntries: GlossaryEntry[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const meta = categoryMeta[category.category];

  if (filteredEntries.length === 0) return null;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-14"
      id={categoryShortNames[category.category]?.toLowerCase().replace(/\s/g, "-")}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2.5 rounded-full border border-[hsla(45,70%,49%,0.2)]" style={{ color: meta?.accent }}>
          {meta?.icon}
        </div>
        <div>
          <h2 className="font-sans text-[clamp(18px,2.5vw,28px)] font-light text-[hsl(40,30%,90%)]">{category.category}</h2>
          <p className="font-serif italic text-[14px] text-[hsl(35,30%,60%)] mt-1">{category.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 mt-6">
        {filteredEntries.map((entry) => (
          <GlossaryAccordionEntry key={entry.name} entry={entry} />
        ))}
      </div>
    </motion.section>
  );
};

/* ─── Interactive Origin Map ─── */
const OriginMap = ({ onRegionClick, activeRegion }: { onRegionClick: (region: string | null) => void; activeRegion: string | null }) => {
  const regions = Object.keys(regionMap);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-0.5">
      {regions.map((region) => {
        const count = regionMap[region].length;
        const isActive = activeRegion === region;
        return (
          <button
            key={region}
            onClick={() => onRegionClick(isActive ? null : region)}
            className={`p-4 border text-left transition-all ${
              isActive
                ? "bg-[hsl(105,30%,16%)] border-[hsl(45,70%,49%)]"
                : "bg-[hsl(105,30%,12%)] border-[hsla(45,70%,49%,0.08)] hover:border-[hsla(45,70%,49%,0.25)]"
            }`}
          >
            <MapPin className={`h-4 w-4 mb-2 ${isActive ? "text-[hsl(45,70%,49%)]" : "text-[hsl(35,20%,45%)]"}`} />
            <p className={`font-sans text-[10px] tracking-[1px] uppercase ${isActive ? "text-[hsl(45,70%,49%)]" : "text-[hsl(40,30%,85%)]"}`}>
              {region}
            </p>
            <p className="font-sans text-[9px] text-[hsl(35,20%,45%)] mt-1">{count} sacred {count === 1 ? "plant" : "plants"}</p>
          </button>
        );
      })}
    </div>
  );
};

/* ─── Main Page ─── */
const PlantMedicineGlossary = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const totalPlants = useMemo(() => glossaryData.reduce((sum, cat) => sum + cat.entries.length, 0), []);

  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const regionPlants = activeRegion ? regionMap[activeRegion] : null;

    return glossaryData
      .filter((cat) => !activeCategory || cat.category === activeCategory)
      .map((cat) => ({
        ...cat,
        filteredEntries: cat.entries.filter((entry) => {
          const matchesSearch = !q || entry.name.toLowerCase().includes(q) || entry.botanical.toLowerCase().includes(q) || entry.origin.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q);
          const matchesRegion = !regionPlants || regionPlants.includes(entry.name);
          return matchesSearch && matchesRegion;
        }),
      }));
  }, [searchQuery, activeCategory, activeRegion]);

  const resultCount = filteredData.reduce((sum, cat) => sum + cat.filteredEntries.length, 0);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
    setActiveRegion(null);
  };

  const hasFilters = searchQuery || activeCategory || activeRegion;

  return (
    <div className="min-h-screen bg-[hsl(114,36%,10%)] text-[hsl(40,30%,92%)]">
      <SEOHead
        title="Sacred Plant Medicine Glossary | Temple Mother Earth"
        description="Comprehensive guide to sacred plant sacraments including Kambo, ayahuasca, psilocybin, San Pedro, cacao, and traditional ceremonial practices worldwide."
        path="/plant-medicine-glossary"
      />
      <Navigation />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[hsla(114,36%,6%,0.9)] via-[hsla(114,36%,10%,0.5)] to-[hsl(114,36%,10%)] -z-10" />
        <div className="absolute inset-0 opacity-[0.03] -z-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, hsl(45,70%,49%) 1px, transparent 1px), radial-gradient(circle at 75% 30%, hsl(45,70%,49%) 1px, transparent 1px)`,
            backgroundSize: "120px 120px, 80px 80px",
          }}
        />
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Leaf className="h-10 w-10 text-[hsl(45,70%,49%)] mx-auto mb-6" />
            <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">
              Temple Mother Earth · Sacred Reference
            </p>
            <h1 className="font-sans text-[clamp(36px,6vw,72px)] font-extralight leading-none text-[hsl(40,30%,92%)] mb-6 tracking-tight">
              Sacred Plant<br />
              <em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Medicine Glossary</em>
            </h1>
            <p className="font-serif italic text-[clamp(16px,2vw,22px)] text-[hsl(35,30%,68%)] max-w-[600px] mx-auto leading-relaxed mb-4">
              {totalPlants} sacred earth sacraments, entheogenic plant teachers, and ceremonial traditions honored across living indigenous lineages worldwide.
            </p>
          </motion.div>

          {/* Entheogen Etymology Block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-[720px] mx-auto mt-10 bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.15)] p-8 md:p-10"
          >
            <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4 text-center">
              Entheogen · From the Greek
            </p>
            <p className="font-serif text-[18px] text-[hsl(40,30%,88%)] leading-[1.85] text-center mb-4">
              <em className="text-[hsl(45,70%,55%)]">En</em> (within) · <em className="text-[hsl(45,70%,55%)]">Theos</em> (God, the Divine) · <em className="text-[hsl(45,70%,55%)]">Gen</em> (to generate, to bring forth)
            </p>
            <p className="font-serif text-[16px] text-[hsl(35,30%,68%)] leading-relaxed text-center">
              An <em>entheogen</em> is a substance that generates the experience of the divine within. The word was created to honor the sacred, ceremonial context in which these plants and fungi have been used for millennia, distinct from recreational or clinical language. Entheogens are not taken. They are received, in prayer, in ceremony, in community, with the understanding that what opens inside you was already there, waiting to be remembered. Every tradition listed here, from the Amazon to the Andes, from ancient Egypt to the forests of Siberia, shares this same root truth: the divine is not somewhere else. It is within you, and these sacred allies have always been the key.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(35,20%,45%)]">
              Search · Filter by Category · Explore by Origin
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ SEARCH & FILTER ═══ */}
      <section className="sticky top-0 z-30 bg-[hsl(105,30%,8%)] border-b border-[hsla(45,70%,49%,0.1)] py-4 px-6 md:px-12">
        <div className="max-w-[1100px] mx-auto">
          {/* Search bar */}
          <div className="relative mb-3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[hsl(35,20%,45%)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, botanical, origin, or tradition…"
              className="w-full bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.12)] text-[hsl(40,30%,90%)] placeholder-[hsl(35,20%,40%)] pl-11 pr-10 py-3 font-sans text-[13px] focus:outline-none focus:border-[hsl(45,70%,49%)] transition-colors"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-[hsl(35,20%,50%)] hover:text-[hsl(45,70%,49%)]" />
              </button>
            )}
          </div>
          {/* Category filter tabs */}
          <div className="flex gap-1.5 flex-wrap items-center">
            <button
              onClick={() => setActiveCategory(null)}
              className={`font-sans text-[8px] tracking-[2px] uppercase px-3 py-1.5 border transition-all ${
                !activeCategory ? "border-[hsl(45,70%,49%)] text-[hsl(45,70%,49%)] bg-[hsla(45,70%,49%,0.1)]" : "border-[hsla(45,70%,49%,0.12)] text-[hsl(35,20%,50%)] hover:border-[hsla(45,70%,49%,0.3)]"
              }`}
            >
              All
            </button>
            {glossaryData.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(activeCategory === cat.category ? null : cat.category)}
                className={`font-sans text-[8px] tracking-[2px] uppercase px-3 py-1.5 border transition-all ${
                  activeCategory === cat.category ? "border-[hsl(45,70%,49%)] text-[hsl(45,70%,49%)] bg-[hsla(45,70%,49%,0.1)]" : "border-[hsla(45,70%,49%,0.12)] text-[hsl(35,20%,50%)] hover:border-[hsla(45,70%,49%,0.3)]"
                }`}
              >
                {categoryShortNames[cat.category]}
              </button>
            ))}
            {hasFilters && (
              <button onClick={clearFilters} className="ml-2 font-sans text-[8px] tracking-[2px] uppercase text-[hsl(35,20%,50%)] hover:text-[hsl(45,70%,49%)] transition-colors flex items-center gap-1">
                <X className="h-3 w-3" /> Clear All
              </button>
            )}
            <span className="ml-auto font-sans text-[8px] tracking-[2px] uppercase text-[hsl(35,20%,45%)]">
              {resultCount} of {totalPlants} shown
            </span>
          </div>
        </div>
      </section>

      {/* ═══ INTERACTIVE ORIGIN MAP ═══ */}
      <section className="px-6 md:px-12 py-14 bg-[hsl(105,30%,8%)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-5 w-5 text-[hsl(45,70%,49%)]" />
            <h2 className="font-sans text-[11px] tracking-[3px] uppercase text-[hsl(45,70%,49%)]">Explore by Origin</h2>
            {activeRegion && (
              <button onClick={() => setActiveRegion(null)} className="ml-auto font-sans text-[8px] tracking-[2px] uppercase text-[hsl(35,20%,50%)] hover:text-[hsl(45,70%,49%)] flex items-center gap-1">
                <X className="h-3 w-3" /> Clear region
              </button>
            )}
          </div>
          <OriginMap onRegionClick={setActiveRegion} activeRegion={activeRegion} />
        </div>
      </section>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ GLOSSARY ENTRIES ═══ */}
      <main className="px-6 md:px-12 py-16 max-w-[1100px] mx-auto">
        {filteredData.map((cat) => (
          <GlossaryCategorySection key={cat.category} category={cat} filteredEntries={cat.filteredEntries} />
        ))}

        {resultCount === 0 && (
          <div className="text-center py-20">
            <Leaf className="h-10 w-10 text-[hsl(35,20%,35%)] mx-auto mb-4" />
            <p className="font-serif italic text-[20px] text-[hsl(35,30%,60%)] mb-2">No sacred plants found</p>
            <p className="font-sans text-[12px] text-[hsl(35,20%,45%)]">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="mt-4 font-sans text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </main>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ INTERNATIONAL LOCATIONS ═══ */}
      <section className="px-6 md:px-12 py-16 bg-[hsl(105,30%,8%)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">Where We Hold Space</p>
            <h2 className="font-sans text-[clamp(24px,3.5vw,40px)] font-extralight text-[hsl(40,30%,90%)] leading-tight">
              Ceremony &<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">Retreat Locations</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0.5">
            {internationalLocations.map((loc) => (
              <Link
                key={loc.region}
                to={loc.link}
                className="group bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.08)] hover:border-[hsla(45,70%,49%,0.3)] p-6 transition-all"
              >
                <span className="text-[hsl(45,70%,49%)] mb-3 block">{loc.icon}</span>
                <h3 className="font-sans text-[11px] tracking-[1px] uppercase text-[hsl(40,30%,90%)] group-hover:text-[hsl(45,70%,55%)] transition-colors mb-2">{loc.region}</h3>
                <p className="text-[13px] text-[hsl(35,30%,60%)] leading-relaxed font-serif">{loc.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

      {/* ═══ CTA ═══ */}
      <section className="py-20 md:py-28 px-6 md:px-12 text-center bg-gradient-to-t from-[hsl(105,30%,8%)] to-[hsl(114,36%,10%)]">
        <div className="max-w-[600px] mx-auto">
          <Flame className="h-8 w-8 text-[hsl(45,70%,49%)] mx-auto mb-6" />
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">Your Sacred Journey Begins Here</p>
          <h2 className="font-sans text-[clamp(28px,4.5vw,52px)] font-extralight leading-[1.05] text-[hsl(40,30%,92%)] mb-6">
            Answer<br /><em className="font-serif italic text-[hsl(45,70%,55%)] text-[1.1em]">the Call</em>
          </h2>
          <p className="text-[18px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-10">
            Whether you are called to Kambo, Hapé, sacred vine, cacao, or another earth sacrament, the first step is completing our Sacred Intake Form.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/ceremony-intake"
              className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all"
            >
              Begin Your Journey
            </Link>
            <Link
              to="/contact"
              className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all"
            >
              Speak With a Guide
            </Link>
          </div>
        </div>
      </section>

      {/* ─── RFRA Footer ─── */}
      <footer className="bg-[hsl(105,30%,8%)] border-t border-[hsl(100,25%,18%)] py-8 px-6 md:px-12 text-center">
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(90,15%,40%)] leading-loose">
          &copy; 2026 Temple Mother Earth · 508(c)(1)(A) Sacred Church · Washington, DC
        </p>
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(90,15%,40%)] leading-loose mt-2">
          All ceremonies held in sincere religious practice under protection of the Religious Freedom Restoration Act (RFRA) · Not a substitute for medical or psychological guidance
        </p>
      </footer>
    </div>
  );
};

export default PlantMedicineGlossary;
