import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import teaVideoUrl from "@/assets/video-sacred-tea-ceremony.mp4?url";
const teaVideo = { url: teaVideoUrl };
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import FooterVideoBanner from "@/components/story/FooterVideoBanner";
import EventbriteDetails from "@/components/sanctuary/EventbriteDetails";
import teaSeekerVideoUrl from "@/assets/video-teahouse-seeker.mp4?url";
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
      eyebrow="The Fruit of the Gods · A Sacred Tea Ceremony"
      title={<>You've Been Carrying<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">Something Heavy</em><br />For Too Long</>}
      subtitle=""
      lead="You don't need another book, another podcast, another weekend of trying to think your way out. Sacred Tea is an ancient practice · a cup poured in ceremony · that helps the part of you that already knows finally be heard."
      primaryCTA={{ label: "Take Your Seat at the Table", href: EVENTBRITE_PLACEHOLDER, external: true }}
      secondaryCTA={{ label: "Is This For Me? ↓", href: "#for-you" }}
      backgroundVideo={teaVideo.url}
    />

    <SanctuarySection id="for-you" eyebrow="Is This For You?" title={<>You May Be<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Here Because</em></>}>
      <ul className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[760px] font-serif space-y-4 list-none">
        <li>· You feel tired in a way sleep does not fix.</li>
        <li>· You've done the therapy, the journaling, the breathwork · and something is still stuck.</li>
        <li>· You're curious about ceremony, but the words feel foreign and you don't want to look lost.</li>
        <li>· You want to feel something real again.</li>
        <li>· You're ready to listen to your body instead of override it.</li>
        <li>· You don't want a high. You want the truth.</li>
      </ul>
      <p className="mt-10 text-lg leading-[1.85] text-[hsl(90,15%,72%)] max-w-[760px] font-serif italic">
        If any of that lives in you, you're not in the wrong place. Keep reading.
      </p>
    </SanctuarySection>

    <SanctuarySection id="about" eyebrow="In Plain Language" title={<>What Is<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">A Sacrament?</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>A sacrament is a sacred substance taken in ceremony · with intention, with reverence, with people who know how to hold space · so that what you drink becomes a <strong className="text-[hsl(45,70%,49%)]">doorway, not a drug</strong>.</p>
        <p>Ancient cultures called this particular tea "the Fruit of the Gods" because of what it returns to the person who drinks it: clarity, honesty, and a quiet kind of knowing that doesn't need to be argued with. It is not a shortcut. It is not a high. It is the oldest conversation your body has ever had.</p>
      </div>
      <SanctuaryColCards cards={[
        { title: "The Cup", description: "What you drink · poured by hands that have done this thousands of times. Pure, prepared with prayer, dosed with care for exactly where you are." },
        { title: "The Circle", description: "Who you sit with · a small group of seekers held inside a guarded room. No performance, no audience. Just people brave enough to show up." },
        { title: "The Container", description: "How you are held · elders, guardians, music, fire, silence. From the moment you arrive to the moment you leave, nothing here is improvised." },
      ]} />
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    <SanctuarySection eyebrow="What A Night Looks Like" title={<>So You Know<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">What You're Walking Into</em></>}>
      <SanctuaryColCards cards={[
        { title: "Arrival & Grounding", description: "You walk in. Shoes off. Phone goes in a basket. You're greeted, hugged, given tea (not the sacrament yet) and a cushion. The circle opens with prayer. Your body starts to soften before you realize it has." },
        { title: "The Pour", description: "The sacrament is offered cup by cup, person by person. You are asked your intention. You drink. You return to your cushion. The lights lower. The music begins." },
        { title: "The Journey Inward", description: "For the next few hours, your only job is to lie back, breathe, and let it work. Most people cry. Most people laugh. Most people meet something they have been avoiding · and find it was waiting to hold them." },
        { title: "Return & Integration", description: "The room comes back. Soft food, warm tea, a closing circle for whoever wants to share. You are not sent home alone · you leave with notes, support, and a community that just witnessed something sacred in you." },
      ]} />
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    <SanctuarySection id="levels" eyebrow="Three Levels of Entry" title={<>Choose the Depth<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">You Are Ready For</em></>}>
      <SanctuaryColCards cards={[
        { title: "Community · Your First Cup", description: "If you've never done this before, start here. A gentle, community-held ceremony. Smaller pour, brighter container, more guidance throughout. You'll leave knowing what ceremony actually feels like.", note: "NO APPLICATION REQUIRED" },
        { title: "Sacred Circle · Going Deeper", description: "For those who've sat in ceremony before and are ready to go further. A longer container, a fuller pour, a more intimate circle. The work that begins here often surprises people.", note: "PRE-SCREENING REQUIRED", featured: true },
        { title: "Fruit of the Gods · The Full Journey", description: "The full ceremonial arc. By application only, for those who've done Sacred Circle or equivalent work. Health screening required. This is the deep end of the pool · and you'll be held the whole way.", note: "APPLICATION REQUIRED" },
      ]} />
      <p className="mt-12 text-[hsl(90,15%,65%)] text-[16px] font-sans tracking-[2px] uppercase">
        Community Care Model applies to all levels · Scholarship fund available · Ask us
      </p>
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I came thinking I'd have an interesting experience. What I had was a reckoning. Something I'd been carrying for fifteen years was gone. Not processed, gone. I walked out into the morning and everything looked different."
      attribution="Sacred Circle level · Baltimore, MD"
    />

    <EventbriteDetails eventKey="sacred-tea-ceremony" title="Sacred Tea Ceremony · Sacred Logistics" />

    <FooterVideoBanner
      video={teaSeekerVideoUrl}
      eyebrow="Recurring Offering · Washington, DC"
      headline={<>A Seat Has Been<br /><em className="font-serif italic text-primary">Saved For You</em></>}
      body="The kettle is on. The circle is forming. When you're ready, the door opens from your side."
      ctaLabel="Take Your Seat at the Table"
      ctaHref={EVENTBRITE_PLACEHOLDER}
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
