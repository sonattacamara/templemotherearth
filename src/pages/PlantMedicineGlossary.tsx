import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { Link } from "react-router-dom";

const glossaryData = [
  {
    category: "Entheogenic & Psychoactive Plant Medicines",
    description: "Sacred visionary sacraments used in ceremonial traditions worldwide for spiritual awakening, deep transformation, and consciousness expansion.",
    entries: [
      { name: "Ayahuasca (Sacred Vine)", botanical: "Banisteriopsis caapi + Psychotria viridis", origin: "Amazon Basin — Peru, Colombia, Brazil, Ecuador", description: "DMT-containing sacred brew used in Amazonian shamanic traditions for deep spiritual transformation, visionary experience, and consciousness expansion. Also known as Sacred Vine, Yagé, and La Medicina.", link: "/retreats-inquiry", linkLabel: "Explore Sacred Vine Retreats" },
      { name: "Peyote (Hikuri)", botanical: "Lophophora williamsii", origin: "Mexico, Southwestern United States", description: "Mescaline-containing cactus sacred to Native American traditions and Huichol (Wixárika) ceremonies. Used for prayer, sacred practice, and divine communion." },
      { name: "San Pedro (Huachuma)", botanical: "Echinopsis pachanoi", origin: "Andes — Peru, Ecuador, Bolivia", description: "Mescaline-containing cactus from the Andes used for thousands of years in sacred ceremonies. Known as the 'Cactus of the Four Winds.'" },
      { name: "Psilocybin Mushrooms", botanical: "Psilocybe cubensis, P. semilanceata, P. azurescens", origin: "Worldwide — Mesoamerica (Mazatec tradition)", description: "Sacred fungi containing psilocybin and psilocin, used in Mazatec ceremonial traditions and increasingly studied for applications in depression, PTSD, and end-of-life anxiety." },
      { name: "Iboga / Ibogaine", botanical: "Tabernanthe iboga", origin: "Central Africa — Gabon, Cameroon", description: "Root bark used in Bwiti spiritual tradition for initiation, transformation, and addiction interruption. Contains ibogaine, a powerful psychoactive alkaloid." },
      { name: "Salvia Divinorum", botanical: "Salvia divinorum", origin: "Oaxaca, Mexico", description: "Used by Mazatec practitioners (curanderos) for divination and spiritual practice. Contains salvinorin A, a potent kappa-opioid agonist." },
      { name: "Cannabis / Hemp", botanical: "Cannabis sativa / indica", origin: "Central Asia — used globally", description: "Ceremonial plant used across Rastafari, Hindu (Shiva worship), and Sufi traditions for meditation, prayer, and spiritual connection." },
      { name: "Morning Glory (Ololiuqui)", botanical: "Turbina corymbosa, Ipomoea tricolor", origin: "Mexico — Aztec and Mazatec traditions", description: "LSA-containing seeds used by Aztec and Mazatec peoples for divination and spiritual healing ceremonies." },
      { name: "Hawaiian Baby Woodrose", botanical: "Argyreia nervosa", origin: "Indian subcontinent, Hawaii", description: "Seeds containing LSA (d-lysergic acid amide), used for visionary and meditative experiences." },
      { name: "Jurema (Mimosa Hostilis)", botanical: "Mimosa tenuiflora", origin: "Brazil — Northeastern traditions", description: "DMT-containing root bark used in Brazilian Jurema Sagrada ceremonies. Also known as Mimosa Hostilis or Tepescohuite." },
      { name: "Syrian Rue (Harmal)", botanical: "Peganum harmala", origin: "Middle East, North Africa, Central Asia", description: "MAO-inhibitor seeds used in Middle Eastern and North African spiritual traditions. Also used as an ayahuasca analog (pharmahuasca) in combination with DMT-containing plants." },
      { name: "Yopo / Cohoba", botanical: "Anadenanthera peregrina", origin: "Caribbean, South America", description: "DMT and bufotenin-containing seeds traditionally snuffed by indigenous Caribbean and South American peoples for visionary healing." },
      { name: "Cebil / Vilca", botanical: "Anadenanthera colubrina", origin: "Andes — Argentina, Bolivia, Peru", description: "Related to Yopo, used in Andean spiritual traditions. Seeds are prepared as snuff for ceremonial use." },
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
      { name: "Kambo", botanical: "Phyllomedusa bicolor (Giant Monkey Tree Frog)", origin: "Amazon Basin — Brazil, Peru, Colombia", description: "Sacred frog medicine used for physical detoxification, immune system strengthening, emotional clearing, and spiritual purification. Applied through small burns on the skin.", link: "/ceremony-intake", linkLabel: "Begin Your Kambo Journey" },
      { name: "Rapé / Hapé", botanical: "Nicotiana rustica + medicinal plant ashes", origin: "Amazon Basin — Brazil, Peru", description: "Sacred tobacco snuff blended with tree ashes and medicinal plants. Used for grounding, mental clarity, energetic clearing, and opening the third eye.", link: "/ceremony-intake", linkLabel: "Experience Hapé Ceremony" },
      { name: "Sananga", botanical: "Tabernaemontana undulata", origin: "Amazon Basin — Brazil", description: "Medicinal eye drops used for sharpening spiritual vision (both physical and energetic), clearing panema (negative energy), and enhancing focus." },
      { name: "Cacao (Ceremonial Grade)", botanical: "Theobroma cacao", origin: "Mesoamerica — Mexico, Guatemala, Peru", description: "Heart-opening ceremonial drink used for emotional release, creative inspiration, and community connection. 'Theobroma' translates to 'Food of the Gods.'", link: "/ceremony-intake", linkLabel: "Join a Cacao Ceremony" },
      { name: "Guayusa", botanical: "Ilex guayusa", origin: "Ecuador — Kichwa tradition", description: "Caffeinated Amazonian tea used for dream enhancement, morning alertness, and community gathering. Known as the 'Night Watchman's Plant.'" },
      { name: "Sassafras", botanical: "Sassafras albidum", origin: "Eastern North America", description: "Traditional cleansing herb used as a blood purifier and spring tonic in Native American and folk medicine traditions." },
    ],
  },
  {
    category: "Traditional Sacred & Ceremonial Plant Allies",
    description: "Time-honored botanical allies used across global ceremonial traditions for emotional balance, dream work, and holistic wellness.",
    entries: [
      { name: "Blue Lotus", botanical: "Nymphaea caerulea", origin: "Egypt, East Africa", description: "Sacred flower of ancient Egyptian ceremony. Used for relaxation, mild euphoria, enhanced meditation, and dream work. Deeply connected to African ancestral ceremonial lineages." },
      { name: "Mugwort", botanical: "Artemisia vulgaris", origin: "Europe, Asia, North America", description: "Dream-enhancing herb and feminine medicine. Used for lucid dreaming, menstrual support, and spiritual protection." },
      { name: "Damiana", botanical: "Turnera diffusa", origin: "Mexico, Central America", description: "Heart and sensual medicine traditionally used as an aphrodisiac and mood enhancer. Also used in ceremonial settings for opening the heart." },
      { name: "Passionflower", botanical: "Passiflora incarnata", origin: "Americas", description: "Contains mild MAOIs. Used for calming anxiety, supporting sleep, and as a gentle nervine. Also used in some ayahuasca analog preparations." },
      { name: "Kava", botanical: "Piper methysticum", origin: "Pacific Islands — Fiji, Vanuatu, Tonga", description: "Ceremonial relaxant used in Pacific Island traditions for peace-making, community gathering, and spiritual communion. Promotes calm and social connection." },
      { name: "Kratom", botanical: "Mitragyna speciosa", origin: "Southeast Asia — Thailand, Malaysia, Indonesia", description: "Used traditionally for pain management, mood enhancement, and energy. Contains mitragynine and 7-hydroxymitragynine alkaloids." },
      { name: "Wormwood / Artemisia", botanical: "Artemisia absinthium", origin: "Europe, Asia, North Africa", description: "Bitter cleansing herb used for parasitic support, digestive health, and spiritual purification. The primary ingredient in absinthe." },
      { name: "Calamus Root (Sweet Flag)", botanical: "Acorus calamus", origin: "Northern Hemisphere — pan-indigenous", description: "Used in many indigenous traditions for mental clarity, purification, and as a voice-strengthening medicine." },
      { name: "Coca Leaf", botanical: "Erythroxylum coca", origin: "Andes — Peru, Bolivia, Colombia", description: "Sacred plant of the Andes used for altitude sickness, energy, and ceremonial offerings (kintu). Chewed or brewed as mate de coca." },
      { name: "Khat", botanical: "Catha edulis", origin: "East Africa, Arabian Peninsula", description: "Stimulant plant used in East African and Yemeni social and spiritual traditions. Contains cathinone." },
      { name: "Betel Nut", botanical: "Areca catechu", origin: "Southeast Asia, Pacific Islands", description: "Ceremonial stimulant chewed across Southeast Asian traditions. Often combined with betel leaf and lime." },
    ],
  },
  {
    category: "Sacred Fungi & Medicinal Mushrooms",
    description: "The Fungi Kingdom offers both visionary sacraments and powerful functional medicines for immune support, cognitive enhancement, and spiritual growth.",
    entries: [
      { name: "Amanita Muscaria (Fly Agaric)", botanical: "Amanita muscaria", origin: "Siberia, Northern Europe, North America", description: "Iconic red-and-white mushroom used in Siberian shamanic traditions. Contains muscimol and ibotenic acid. Associated with Norse, Slavic, and proto-Indo-European spiritual practices." },
      { name: "Lion's Mane", botanical: "Hericium erinaceus", origin: "North America, Europe, Asia", description: "Powerful nootropic mushroom supporting nerve growth factor (NGF) production, cognitive function, and neuroplasticity. Used alongside microdosing protocols." },
      { name: "Reishi (Lingzhi)", botanical: "Ganoderma lucidum", origin: "East Asia — China, Japan", description: "The 'Mushroom of Immortality.' Used for immune modulation, stress adaptation, spiritual cultivation, and longevity in Traditional Chinese Medicine." },
      { name: "Chaga", botanical: "Inonotus obliquus", origin: "Northern Hemisphere — Siberia, Scandinavia", description: "Powerful antioxidant mushroom used for immune support, inflammation reduction, and as a traditional folk remedy for cancer prevention." },
      { name: "Turkey Tail", botanical: "Trametes versicolor", origin: "Worldwide", description: "Immune-boosting mushroom containing PSK and PSP polysaccharides. Extensively studied for cancer support and gut microbiome health." },
      { name: "Cordyceps", botanical: "Cordyceps militaris / sinensis", origin: "Tibetan Plateau, Himalayas", description: "Energy and performance-enhancing mushroom used in Tibetan and Chinese medicine. Supports oxygen utilization, stamina, and respiratory health." },
    ],
  },
];

const internationalLocations = [
  { region: "Washington, DC & DMV Area", description: "Our home sanctuary offering regular Kambo ceremonies, Hapé circles, cacao ceremonies, and integration support in the Washington DC metropolitan area.", link: "/ceremony-intake" },
  { region: "Mexico (Sayulita, Riviera Nayarit)", description: "International sacred immersions on the Pacific coast of Mexico featuring multi-day retreats with Kambo, sacred vine ceremonies, and traditional Amazonian plant sacrament.", link: "/retreats-inquiry" },
  { region: "Costa Rica", description: "Tropical retreat immersions in Costa Rica's biodiversity-rich landscape, offering plant sacrament ceremonies surrounded by pristine rainforest.", link: "/retreats-inquiry" },
  { region: "Peru (Amazon & Sacred Valley)", description: "Deep Amazonian immersions in the birthplace of ayahuasca, Kambo, and master plant dieta traditions. Pilgrimages to the Sacred Valley of the Incas.", link: "/retreats-inquiry" },
  { region: "Colombia", description: "Ceremonies and retreats in Colombia connecting with Muisca, Kogi, and Amazonian ceremonial lineages.", link: "/retreats-inquiry" },
  { region: "Brazil (Amazon)", description: "Journeys to the Brazilian Amazon, home of Jurema Sagrada, Rapé traditions, and rich Amazonian curanderismo.", link: "/retreats-inquiry" },
  { region: "Traveling Ceremonies (Nationwide)", description: "Temple Mother Earth brings sacred ceremonies to communities across the United States. Request a traveling ceremony for your area.", link: "/traveling-ceremonies" },
  { region: "Private Ceremonies (Anywhere)", description: "Personalized one-on-one or small group ceremonies with our experienced facilitators, available at your location or ours.", link: "/private-ceremonies" },
];

const PlantMedicineGlossary = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Plant Medicine Glossary | Sacred Earth Medicines"
        description="Comprehensive guide to sacred plant sacraments including Kambo, ayahuasca, psilocybin, San Pedro, and traditional ceremonial practices."
        path="/plant-medicine-glossary"
      />
      <Navigation />

      <main className="pt-24 pb-20 px-4 md:px-8 max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-4">
            Sacred Plant Medicine Glossary
          </h1>
          <p className="font-body text-muted-foreground text-lg max-w-3xl">
            A comprehensive guide to the sacred earth sacraments, entheogenic plant teachers, and ceremonial traditions honored by Temple Mother Earth. Our sanctuary in Washington, DC and our{" "}
            <Link to="/retreats-inquiry" className="text-primary underline">international retreat locations</Link>{" "}
            offer ceremonial experiences rooted in indigenous wisdom and reverence for the natural world.
          </p>
        </header>

        {/* Glossary Sections */}
        {glossaryData.map((section) => (
          <section key={section.category} className="mb-14">
            <h2 className="font-display text-2xl text-foreground mb-2">{section.category}</h2>
            <p className="font-body text-muted-foreground mb-6">{section.description}</p>
            <dl className="space-y-6">
              {section.entries.map((entry) => (
                <div key={entry.name} className="border-b border-border pb-5">
                  <dt className="font-display text-lg text-foreground">
                    {entry.name}
                    <span className="ml-2 text-sm font-body text-muted-foreground italic">({entry.botanical})</span>
                  </dt>
                  <dd className="font-body text-muted-foreground mt-1">
                    <span className="text-xs uppercase tracking-wider text-primary/70">{entry.origin}</span>
                    <p className="mt-1">{entry.description}</p>
                    {entry.link && (
                      <Link to={entry.link} className="inline-block mt-2 text-sm text-primary underline hover:text-primary/80 transition-colors">
                        {entry.linkLabel} →
                      </Link>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}

        {/* International Locations */}
        <section className="mb-14">
          <h2 className="font-display text-2xl text-foreground mb-2">
            International Ceremony & Retreat Locations
          </h2>
          <p className="font-body text-muted-foreground mb-6">
            Temple Mother Earth offers sacred plant medicine ceremonies and healing immersions in Washington DC and at retreat centers across the Americas.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {internationalLocations.map((loc) => (
              <Link
                key={loc.region}
                to={loc.link}
                className="block border border-border rounded-xl p-5 hover:border-primary/40 transition-colors"
              >
                <h3 className="font-display text-lg text-foreground mb-1">{loc.region}</h3>
                <p className="font-body text-sm text-muted-foreground">{loc.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-border">
          <h2 className="font-display text-2xl text-foreground mb-3">Begin Your Healing Journey</h2>
          <p className="font-body text-muted-foreground mb-6 max-w-xl mx-auto">
            Whether you are called to Kambo, Hapé, sacred vine, cacao, or another earth medicine, the first step is completing our Sacred Intake Form.
          </p>
          <Link
            to="/ceremony-intake"
            className="inline-block rounded-lg bg-primary px-6 py-3 font-body font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Begin Your Journey
          </Link>
        </section>
      </main>
    </div>
  );
};

export default PlantMedicineGlossary;
