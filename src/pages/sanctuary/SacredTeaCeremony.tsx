import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import teaVideoUrl from "@/assets/video-teahouse-hero-v2.mp4?url";
const teaVideo = { url: teaVideoUrl };
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";
import { Helmet } from "react-helmet-async";

const EVENTBRITE_PLACEHOLDER = "https://www.eventbrite.com/e/sacred-tea-ceremony-the-fruit-of-the-gods-tickets-1989026406525?aff=ebdsoporgprofile";

const sacredTeaJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Sacred Tea Ceremony",
  name: "Sacred Tea Ceremony at Temple Mother Earth",
  description: "A multi-tiered sacramental tea ceremony held within a 508(c)(1)(A) sacred church in Washington, DC. Offered as a religious practice protected under RFRA.",
  url: "https://templemotherearth.org/sacred-tea",
  areaServed: { "@type": "City", name: "Washington, DC" },
  provider: {
    "@type": "ReligiousOrganization",
    name: "Temple Mother Earth",
    url: "https://templemotherearth.org",
  },
  offers: {
    "@type": "Offer",
    url: EVENTBRITE_PLACEHOLDER,
    availability: "https://schema.org/InStock",
  },
};

const SacredTeaCeremony = () => (
  <SacredSeriesLayout
    title="Sacred Tea Ceremony · Temple Mother Earth"
    description="The Fruit of the Gods. A multi-tiered sacred ceremony at Temple Mother Earth, Washington DC."
  >
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(sacredTeaJsonLd)}</script>
    </Helmet>
    <SanctuaryHero
      dateBadge="Recurring Offering"
      eyebrow="Sacred Tea Ceremony"
      title={<>The Door Has<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">Always Been There</em></>}
      subtitle=""
      lead="You've been standing in front of it for longer than you know. This ceremony doesn't take you somewhere new. It returns you to the part of yourself that has always known."
      primaryCTA={{ label: "Answer the Call", href: EVENTBRITE_PLACEHOLDER, external: true }}
      secondaryCTA={{ label: "Choose Your Level ↓", href: "#levels" }}
      backgroundVideo={teaVideo.url}
    />

    <SanctuarySection id="about" eyebrow="The Sacrament" title={<>What the Ancients Called<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">The Fruit of the Gods</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>Sacred Tea has been carried through thousands of years of ceremonial tradition as the most profound conversation a human being can have with the intelligence of the plant kingdom. It is not a drug. It is not a shortcut. It is a sacrament.</p>
        <p>What arrives in ceremony is specific to what you are carrying. <strong className="text-[hsl(45,70%,49%)]">It gives each person exactly what they are ready to receive.</strong></p>
        <p>You are held. From the moment you arrive, you are met by elders and guardians who have walked this path for years. The room is prepared with prayer. The fire is tended. The medicine is poured by hands that know what they are doing. Nothing here is improvised. Everything here is sacred.</p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    <SanctuarySection id="levels" eyebrow="Three Levels of Entry" title={<>Choose the Depth<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">You Are Ready For</em></>}>
      <SanctuaryColCards cards={[
        { title: "Community · The Beginning", description: "A gentle, community-held ceremony for those entering sacred space for the first time or returning after a long absence. Guided throughout. Sacred container.", note: "APPLICATION NOT REQUIRED" },
        { title: "Sacred Circle · The Deepening", description: "For those who have sat in ceremony before and are ready to go further. A longer container, a deeper dose, a more intimate circle.", note: "PRE-SCREENING REQUIRED", featured: true },
        { title: "Fruit of the Gods · The Full Journey", description: "A full ceremonial journey. Available only to those who have been through Sacred Circle or equivalent ceremony experience. By application. Health screening mandatory.", note: "APPLICATION REQUIRED" },
      ]} />
      <p className="mt-12 text-[hsl(90,15%,65%)] text-[16px] font-sans tracking-[2px] uppercase">
        Community Care Model applies to all levels · Scholarship fund available · Ask us
      </p>
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I came thinking I'd have an interesting experience. What I had was a reckoning. Something I'd been carrying for fifteen years was gone. Not processed, gone. I walked out into the morning and everything looked different."
      attribution="Sacred Circle level · Baltimore, MD"
    />

    <SanctuaryCTA
      eyebrow="Recurring Offering · Washington, DC"
      title={<>The Sacrament<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Is Ready For You</em></>}
      description="Choose your level. Secure your place. Your preparation begins the moment you register."
      ctaLabel="Take Your Sacred Seat"
      ctaHref={EVENTBRITE_PLACEHOLDER}
      note="Health screening required for Sacred Circle & Fruit of the Gods levels · Registration required for all levels"
    />

    {/* RFRA Statement */}
    <div className="bg-background border-t border-[hsla(45,70%,49%,0.1)] py-8 px-6 md:px-12">
      <div className="max-w-[760px] mx-auto mb-6 p-6 border border-[hsla(45,70%,49%,0.2)] rounded-lg bg-[hsla(45,70%,49%,0.04)] text-center">
        <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-2">Sacred Access</p>
        <p className="font-serif italic text-[15px] text-foreground leading-relaxed">
          We believe healing is a birthright, not a privilege. Sliding scale and scholarship offerings are available for those called to ceremony. Write to <a href="mailto:askus@templemotherearth.org" className="text-[hsl(45,70%,49%)] underline">askus@templemotherearth.org</a> to begin the conversation.
        </p>
      </div>
      <p className="max-w-[760px] mx-auto text-center font-serif italic text-[13px] text-muted-foreground leading-relaxed">
        A sacred religious practice of Temple Mother Earth · Held in reverence, protected in spirit.
      </p>
    </div>
  </SacredSeriesLayout>
);

export default SacredTeaCeremony;
