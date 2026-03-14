import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

const EVENTBRITE_PLACEHOLDER = "#";

const SacredTeaCeremony = () => (
  <SanctuaryWeekLayout
    title="Sacred Tea Ceremony · March 20 · Temple Mother Earth"
    description="The Fruit of the Gods. A multi-tiered sacred ceremony at Temple Mother Earth, Washington DC."
  >
    <SanctuaryHero
      dateBadge="Friday · March 20 · 2026"
      eyebrow="Sacred Tea Ceremony"
      title={<>The Door Has<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.15em]">Always Been There</em></>}
      subtitle=""
      lead="You've been standing in front of it for longer than you know. This ceremony doesn't take you somewhere new. It returns you to the part of yourself that has always known."
      primaryCTA={{ label: "Secure Your Place", href: EVENTBRITE_PLACEHOLDER }}
      secondaryCTA={{ label: "Choose Your Level ↓", href: "#levels" }}
      backgroundImage="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    />

    <SanctuarySection id="about" eyebrow="The Sacrament" title={<>What the Ancients Called<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">The Fruit of the Gods</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(35,30%,68%)] max-w-[720px] font-serif space-y-6">
        <p>Sacred Tea has been carried through thousands of years of ceremonial tradition as the most profound conversation a human being can have with the intelligence of the plant kingdom. It is not a drug. It is not a shortcut. It is a sacrament.</p>
        <p>What arrives in ceremony is specific to what you are carrying. <strong className="text-[hsl(40,30%,90%)]">It gives each person exactly what they are ready to receive.</strong></p>
        <p>We hold this sacrament within our 508(c)(1)(A) sacred church, with trained facilitators, full RFRA compliance documentation, emergency protocols, and a ceremonial container built over six years of practice.</p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.15)] mx-6 md:mx-12" />

    <SanctuarySection id="levels" eyebrow="Three Levels of Entry" title={<>Choose the Depth<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">You Are Ready For</em></>}>
      <SanctuaryColCards cards={[
        { title: "Community · The Beginning", description: "A gentle, community-held ceremony for those entering sacred space for the first time or returning after a long absence. Guided throughout. Sacred container.", note: "APPLICATION NOT REQUIRED" },
        { title: "Sacred Circle · The Deepening", description: "For those who have sat in ceremony before and are ready to go further. A longer container, a deeper dose, a more intimate circle.", note: "PRE-SCREENING REQUIRED", featured: true },
        { title: "Fruit of the Gods · The Full Journey", description: "A full ceremonial journey. Available only to those who have been through Sacred Circle or equivalent ceremony experience. By application. Health screening mandatory.", note: "APPLICATION REQUIRED" },
      ]} />
      <p className="mt-12 text-[hsl(35,20%,42%)] text-[16px] font-sans tracking-[2px] uppercase">
        Community Care Model applies to all levels · Scholarship fund available · Ask us
      </p>
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I came thinking I'd have an interesting experience. What I had was a reckoning. Something I'd been carrying for fifteen years was gone. Not processed, gone. I walked out into the morning and everything looked different."
      attribution="Sacred Circle level · Baltimore, MD"
    />

    <SanctuaryCTA
      eyebrow="Friday · March 20 · 2026"
      title={<>The Sacrament<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Is Ready For You</em></>}
      description="Choose your level. Secure your place. Your preparation begins the moment you register."
      ctaLabel="Secure Your Place"
      ctaHref={EVENTBRITE_PLACEHOLDER}
      note="Health screening required for Sacred Circle & Fruit of the Gods levels · Registration required for all levels"
    />
  </SanctuaryWeekLayout>
);

export default SacredTeaCeremony;
