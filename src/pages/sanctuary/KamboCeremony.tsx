import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Users, Flower2 } from "lucide-react";
import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";
import FAQSchema, { FAQItem } from "@/components/FAQSchema";
import kamboVideoUrl from "@/assets/video-kambo-hero-v2.mp4?url";
import takeASeatVideoUrl from "@/assets/video-kambo-takeaseat.mp4?url";

const kamboFaqs: FAQItem[] = [
  {
    question: "What is Kambo?",
    answer:
      "Kambo is the sacred secretion of the Phyllomedusa bicolor (giant monkey frog) of the Amazon rainforest. It has been used for centuries by indigenous Amazonian peoples · the Matsés, Mayoruna, Yawanawá and others · as a sacramental purification. At Temple Mother Earth we hold Kambo as a First Amendment protected sacrament inside a sacred container.",
  },
  {
    question: "Is the frog harmed when Kambo is collected?",
    answer:
      "No. Kambo is collected ethically and traditionally. The frog is gently and briefly held, the secretion is collected from its back, and the frog is returned unharmed to the same tree. The frog is treated as a sacred relative, not a resource.",
  },
  {
    question: "What happens during a Kambo ceremony?",
    answer:
      "After intake, hydration, and prayer, small superficial points are opened on the skin and the Kambo sacrament is applied. The body responds with a brief but intense purification cycle, typically 20 to 40 minutes. A trained facilitator holds space throughout. Rest, integration, and grounding follow the active phase.",
  },
  {
    question: "Who should not sit with Kambo?",
    answer:
      "Kambo is not held for those who are pregnant or nursing, those with serious heart conditions, recent stroke or surgery, severe mental health crisis, or who are taking certain medications. A thorough intake screening determines eligibility for every seeker.",
  },
  {
    question: "How do I prepare for Kambo at Temple Mother Earth?",
    answer:
      "Members complete the ceremony intake form, follow the 7-day preparation protocol (clean eating, hydration, prayer, abstinence from alcohol and recreational substances), and arrive fasted the morning of ceremony with at least 1.5 liters of water.",
  },
  {
    question: "Where are Kambo ceremonies held?",
    answer:
      "Temple Mother Earth holds Kambo ceremonies at the sanctuary in Washington, DC, serving the DMV (Washington DC, Maryland, Virginia) congregation. We also hold Kambo sittings on international immersions in Costa Rica, Panama, Mexico, Egypt, and Peru.",
  },
  {
    question: "Is Kambo legal in the United States?",
    answer:
      "Kambo itself is not a federally scheduled substance. Temple Mother Earth holds all sacramental work as a 508(c)(1)(A) church under the First Amendment and the Religious Freedom Restoration Act (RFRA), which protect sincere religious exercise.",
  },
  {
    question: "Do you offer women-only Kambo ceremonies?",
    answer:
      "Yes. We hold both co-ed Kambo sittings (with King James) and dedicated Women's Only Kambo sittings to honor the distinct sacred container many women need.",
  },
];
const kamboVideo = { url: kamboVideoUrl };

const COED_URL = "https://www.eventbrite.com/e/kambo-a-sacred-cleansing-ceremony-registration-822085920117?aff=ebdsoporgprofile";
const WOMENS_URL = "https://www.eventbrite.com/e/kambo-for-women-the-sacred-release-tickets-1989115971416?aff=ebdsoporgprofile";

const kamboJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Kambo Purification Fire Ceremony",
  name: "Kambo · The Purification Fire at Temple Mother Earth",
  description:
    "Kambo · the Purification Fire. A traditional Amazonian ceremony held at Temple Mother Earth in Washington, DC, where the body's natural intelligence is invited to reset, clear, and return to baseline.",
  url: "https://templemotherearth.org/kambo",
  areaServed: { "@type": "City", name: "Washington, DC" },
  provider: {
    "@type": "ReligiousOrganization",
    name: "Temple Mother Earth",
    url: "https://templemotherearth.org",
  },
};

const painPoints = [
  {
    title: "Heavy & Stagnant",
    description:
      "You wake up tired. Your body feels weighted by something you cannot name. Food, sleep, rest · nothing returns the lightness you once knew.",
  },
  {
    title: "Anxious & Wired",
    description:
      "Your nervous system has not rested in years. The mind loops. The chest is tight. Calm has become a word, not a state you actually live in.",
  },
  {
    title: "Stuck in the Same Pattern",
    description:
      "You see the cycle. The cravings, the moods, the relationships that repeat. You have done the work, and still the pattern grips.",
  },
  {
    title: "Disconnected from Spirit",
    description:
      "Prayer feels like a script. Ceremony feels distant. You know there is something deeper, but the channel feels closed.",
  },
];

const benefits = [
  {
    title: "Deep Purification",
    description:
      "The body releases what does not belong. Heaviness lifts. The lymphatic, digestive, and energetic channels are scoured clean.",
    note: "Body",
  },
  {
    title: "Mental Clarity",
    description:
      "The fog lifts. Focus returns. Decisions arrive with quiet certainty instead of looping doubt.",
    note: "Mind",
    featured: true,
  },
  {
    title: "Spiritual Reset",
    description:
      "Old contracts loosen. The connection to source, to land, to your own knowing comes back online.",
    note: "Spirit",
  },
];

const PathCard = ({
  eyebrow,
  title,
  description,
  url,
  icon: Icon,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  description: string;
  url: string;
  icon: typeof Users;
  delay?: number;
}) => (
  <motion.a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    whileHover={{ y: -4 }}
    className="group block p-10 md:p-12 border border-[hsl(100,25%,18%)] bg-[hsl(105,30%,12%)] hover:border-[hsl(45,70%,49%)] hover:bg-[hsl(110,25%,14%)] transition-all duration-500"
  >
    <Icon className="h-8 w-8 text-[hsl(45,70%,49%)] mb-6" strokeWidth={1.25} />
    <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-3">
      {eyebrow}
    </p>
    <h3 className="font-sans text-[clamp(22px,2.4vw,32px)] font-light text-[hsl(40,30%,92%)] mb-5 leading-[1.15]">
      {title}
    </h3>
    <p className="text-[17px] text-[hsl(90,15%,68%)] leading-relaxed font-serif mb-8">
      {description}
    </p>
    <span className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,55%)] group-hover:text-[hsl(45,80%,65%)]">
      Reserve via Eventbrite <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
    </span>
  </motion.a>
);

const KamboCeremony = () => (
  <SacredSeriesLayout
    title="Kambo · The Purification Fire · Temple Mother Earth"
    description="Kambo · the Purification Fire. Traditional Amazonian ceremony in Washington, DC. Deep purification of body, mind, and spirit. Co-ed and Women's Only sittings."
    showBackLink={false}
    path="/kambo"
  >
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(kamboJsonLd)}</script>
    </Helmet>
    <FAQSchema faqs={kamboFaqs} />

    <SanctuaryHero
      dateBadge="Recurring Sacrament"
      eyebrow="Kambo · The Purification Fire"
      title={
        <>
          The Body Remembers.<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">The Frog Reminds.</em>
        </>
      }
      subtitle=""
      lead="Kambo is one of the most direct purification rites known to the Amazon · the Purification Fire. Held here in our Washington, DC temple, it clears the body, quiets the mind, and returns you to the version of yourself you forgot was waiting underneath."
      primaryCTA={{ label: "Choose Your Ceremony ↓", href: "#choose" }}
      secondaryCTA={{ label: "Learn More ↓", href: "#signals" }}
      backgroundVideo={kamboVideo.url}
    />

    {/* PAIN POINTS · TOP */}
    <SanctuarySection
      id="signals"
      eyebrow="If This Is You"
      title={
        <>
          The Signals Your Body<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Has Been Whispering</em>
        </>
      }
    >
      <p className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[760px] font-serif">
        Most people who arrive at Sacred Kambo did not stumble in. Something has been calling. A weight that will not lift. A loop that will not break. A quiet knowing that the ordinary tools are no longer enough.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        {painPoints.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="p-8 border border-[hsl(100,25%,18%)] bg-[hsl(105,30%,11%)]"
          >
            <h3 className="font-sans text-[13px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3">
              {p.title}
            </h3>
            <p className="text-[16px] text-[hsl(90,15%,68%)] leading-relaxed font-serif">
              {p.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    {/* BENEFITS · TOP */}
    <SanctuarySection
      id="benefits"
      eyebrow="What Sacred Kambo Returns"
      title={
        <>
          A Reset for Body,<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Mind, and Spirit</em>
        </>
      }
    >
      <p className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[760px] font-serif">
        Kambo does not negotiate. It moves through you with intelligence the mind cannot direct. What it leaves behind is space · clean, clear, alive.
      </p>
      <SanctuaryColCards cards={benefits} />
    </SanctuarySection>

    {/* WHAT SCIENCE OBSERVES · PEPTIDE EDUCATION */}
    <SanctuarySection
      id="science"
      eyebrow="What Science Observes"
      title={
        <>
          The Peptide Intelligence<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">of the Frog</em>
        </>
      }
    >
      <p className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[760px] font-serif">
        Modern research has identified more than seventy bioactive peptides in the Kambo offering · molecular messengers the body recognizes immediately. These peptides have been studied for their unique interaction with the immune, lymphatic, cardiovascular, and central nervous systems. We share the science not as a promise, but as context for what the body intelligently does on its own.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          {
            title: "Phyllomedusin · Lymphatic Movement",
            description:
              "Researchers observe rapid stimulation of the smooth muscle and lymphatic system · which is what the traditional ceremony has always called the purge. The body moves what it has been storing.",
          },
          {
            title: "Dermorphin & Deltorphin · Receptor Affinity",
            description:
              "These peptides have been studied for their remarkable affinity with the body's own opioid and pain-modulation receptors · among the strongest naturally occurring binding profiles documented in science.",
          },
          {
            title: "Phyllocaerulein · Nervous System Reset",
            description:
              "Observed to engage the gastrointestinal tract and stress-response axis. The body downshifts. The nervous system is invited to recalibrate after the brief ceremonial intensity passes.",
          },
          {
            title: "Adenoregulin · Cellular Communication",
            description:
              "Studied for its interaction with adenosine receptors involved in energy regulation and cellular signaling. The body re-establishes baseline conversation between its own systems.",
          },
          {
            title: "Bradykinins · Vascular Response",
            description:
              "Researchers observe brief vasodilation and circulatory engagement. This is the warmth and flush participants describe · the body's own circulatory reset, not an external chemical effect.",
          },
          {
            title: "Tryptophyllins · Antimicrobial Profile",
            description:
              "Studied for natural antimicrobial properties at the cellular level. The frog evolved these peptides as part of its own defense intelligence · the body simply recognizes the language.",
          },
        ].map((p) => (
          <div
            key={p.title}
            className="p-8 border border-[hsl(100,25%,18%)] bg-[hsl(105,30%,11%)]"
          >
            <h3 className="font-sans text-[12px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3">
              {p.title}
            </h3>
            <p className="text-[15px] text-[hsl(90,15%,68%)] leading-relaxed font-serif">
              {p.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-12 max-w-[760px] p-6 border border-[hsla(45,70%,49%,0.2)] bg-[hsla(45,70%,49%,0.04)]">
        <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-2">
          Important Note
        </p>
        <p className="font-serif italic text-[15px] text-[hsl(40,30%,90%)] leading-relaxed">
          Temple Mother Earth offers Kambo as a ceremonial and spiritual practice, not as a medical treatment. The above describes observations from published peptide research and does not constitute medical advice or any claim to diagnose, treat, cure, or prevent any condition. Please consult your physician before participating.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    {/* CHOOSE YOUR CEREMONY · DUAL CTA */}
    <section id="choose" className="bg-gradient-to-br from-[hsl(105,30%,13%)] to-[hsl(110,25%,15%)] border-t border-[hsl(100,25%,18%)] py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4 text-center">
          Two Sacred Containers
        </p>
        <h2 className="font-sans text-[clamp(26px,4vw,48px)] font-light leading-[1.1] mb-4 text-[hsl(40,30%,92%)] text-center">
          Choose Your <em className="font-serif italic text-[hsl(35,55%,42%)]">Ceremony</em>
        </h2>
        <p className="text-[17px] text-[hsl(90,15%,68%)] max-w-[620px] mx-auto mb-14 font-serif italic text-center">
          Both circles are held in full sacred container. Pick the one your spirit is asking for.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <PathCard
            eyebrow="Co-ed Circle"
            title="Co-ed Kambo with King James"
            description="Sundays · 8:00 AM. A mixed-gender circle held by King James, our High Priest. For seekers of any path who are ready to meet the frog in shared sacred space."
            url={COED_URL}
            icon={Users}
          />
          <PathCard
            eyebrow="Women's Only"
            title="Women's Only · The Sacred Release"
            description="Saturdays · 8:00 AM. A women-only container. Tender, fierce, and held for the body that carries lineage. Space for what only sisters can witness."
            url={WOMENS_URL}
            icon={Flower2}
            delay={0.1}
          />
        </div>
        <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(90,15%,45%)] mt-12 text-center">
          Held in our sacred DC sanctuary · Registration confirms your seat · Intake form follows your reservation
        </p>
      </div>
    </section>

    <SanctuaryPullQuote quote="What the frog gives, it does not take back. You leave lighter than you arrived." />

    {/* SACRAMENT INFO */}
    <SanctuarySection
      id="about"
      eyebrow="The Tradition"
      title={
        <>
          The Frog's<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Sacred Gift</em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[760px] font-serif space-y-6">
        <p>
          Kambo is the ceremonial offering of the giant monkey frog, gathered with prayer and consent by the indigenous peoples of the Amazon. It has been received as a purification rite for generations · long before the modern world had language for what it does.
        </p>
        <p>
          The offering is applied through small openings on the surface of the skin. Within minutes, the body begins its ancient work · moving, releasing, returning. The ceremony is brief but complete. What follows is days of clarity, weeks of altered baseline, and a body that knows it has been visited.
        </p>
        <p>
          Here it is held as a <strong className="text-[hsl(45,70%,49%)]">ceremonial practice</strong> within a 508(c)(1)(A) sacred church, in sincere spiritual tradition protected under the Religious Freedom Restoration Act. Kambo is not a medical treatment and no medical claims are made.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    {/* WHAT TO EXPECT */}
    <SanctuarySection
      eyebrow="What to Expect"
      title={
        <>
          The Arc of<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">a Sitting</em>
        </>
      }
    >
      <SanctuaryColCards
        cards={[
          {
            title: "Before",
            description:
              "A water fast the morning of. A quiet mind. An intention you can hold in one breath. Preparation guidance arrives with your registration.",
            note: "Arrive Clean",
          },
          {
            title: "During",
            description:
              "Held in song, prayer, and the steady presence of trained facilitators. The frog moves quickly. You move with it. Twenty to forty minutes of active ceremony.",
            note: "Be Held",
            featured: true,
          },
          {
            title: "After",
            description:
              "Rest, water, and a light return meal. Integration practices follow in the days ahead. Most leave with a quiet, almost forgotten sense of being themselves again.",
            note: "Return Whole",
          },
        ]}
      />
    </SanctuarySection>

    {/* FINAL CTA · The Frog Is Calling · video background */}
    <section className="relative overflow-hidden border-t border-[hsl(100,25%,18%)]">
      <video
        src={takeASeatVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[hsl(105,30%,5%)]/70" />
      <div className="relative z-10 py-24 md:py-32 px-6 md:px-12 text-center">
        <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,55%)] mb-4">
          The Frog Is Calling
        </p>
        <h2 className="font-sans text-[clamp(28px,5vw,56px)] font-light leading-[1.1] mb-6 text-[hsl(40,30%,95%)]">
          Take Your <em className="font-serif italic text-[hsl(35,65%,55%)]">Seat</em>
        </h2>
        <p className="text-[hsl(40,25%,82%)] text-xl max-w-[560px] mx-auto mb-12 font-serif italic">
          You read this far for a reason. The body already knows.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={COED_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-[10px] tracking-[3px] uppercase px-8 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all duration-300"
          >
            Co-ed with King James · Sundays 8 AM
          </a>
          <a
            href={WOMENS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-[10px] tracking-[3px] uppercase px-8 py-4 border border-[hsl(45,70%,55%)] text-[hsl(40,30%,95%)] hover:bg-[hsl(45,70%,49%)] hover:text-[hsl(105,30%,5%)] transition-all duration-300"
          >
            Women's Only · Saturdays 8 AM
          </a>
        </div>
      </div>
    </section>

    <CeremonyExploreNav variant="dark" />
  </SacredSeriesLayout>
);

export default KamboCeremony;