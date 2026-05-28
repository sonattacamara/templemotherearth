import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import hapeVideo from "@/assets/video-hape-hero.mp4?url";
import forestVideoUrl from "@/assets/video-hape-forest.mp4?url";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";
import EventbriteCheckout from "@/components/EventbriteCheckout";
import EventbriteDetails from "@/components/sanctuary/EventbriteDetails";
import { Helmet } from "react-helmet-async";

const hapeJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Hapé Ceremony",
  name: "Hapé Community Ceremony at Temple Mother Earth",
  description: "Sacramental Amazonian Hapé ceremony held within a 508(c)(1)(A) sacred church in Washington, DC. Offered as a religious practice protected under RFRA.",
  url: "https://templemotherearth.org/hape",
  areaServed: { "@type": "City", name: "Washington, DC" },
  provider: {
    "@type": "ReligiousOrganization",
    name: "Temple Mother Earth",
    url: "https://templemotherearth.org",
  },
  offers: {
    "@type": "Offer",
    url: "https://www.eventbrite.com/e/hape-the-silencer-registration-946929721287?aff=oddtdtcreator&keep_tld=true",
    availability: "https://schema.org/InStock",
  },
};

const HapeCeremony = () => (
  <SacredSeriesLayout
    title="Hapé Community Ceremony · Temple Mother Earth"
    description="Sacred Amazonian snuff ceremony. Ground, clear, and return to yourself. Temple Mother Earth, Washington DC."
  >
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(hapeJsonLd)}</script>
    </Helmet>
    <SanctuaryHero
      dateBadge="Recurring Offering"
      eyebrow="Hapé Community Ceremony"
      title={<>The Noise Stops.<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">You Remember.</em></>}
      subtitle=""
      lead="Not the thought of yourself. Not the story you've been running. The actual you, underneath all of it, quiet, present, grounded in your body on this earth. Hapé has been clearing this path for thousands of years. It knows exactly where to go."
      primaryCTA={{ label: "Enter the Hapé Circle", href: "https://www.eventbrite.com/e/hape-the-silencer-registration-946929721287?aff=oddtdtcreator&keep_tld=true", external: true }}
      secondaryCTA={{ label: "Learn More ↓", href: "#about" }}
      backgroundVideo={hapeVideo}
    />

    <SanctuarySection id="about" eyebrow="What Hapé Is" title={<>The Forest's Most<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Direct Transmission</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>Hapé, pronounced <em>ha-PAY</em>, is a sacred snuff prepared by Amazonian peoples from ceremonially harvested tobacco and plant ashes. It is administered through the nostrils using a pipe called a <em>tepi</em> or <em>kuripe</em>. The experience is immediate, specific, and unlike anything else.</p>
        <p>Within moments, <strong className="text-[hsl(45,70%,49%)]">the mind goes quiet.</strong> Not suppressed, cleared. The third eye opens. The body drops into the earth. The frantic noise of ordinary life falls away and what remains is you, unadorned, present, exactly here.</p>
        <p>This is not a gentle sacrament. It is a direct one. It will take you somewhere real. And where it takes you, you will recognize.</p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    <SanctuarySection eyebrow="Who This Is For" title={<>You Know When<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Something Is Calling You</em></>}>
      <SanctuaryColCards cards={[
        { title: "The One Who Can't Stop Thinking", description: "The mind runs. You've tried meditation, breathwork, exercise. They help. But the volume never fully drops. Hapé does not ask your mind to quiet itself. It quiets it." },
        { title: "The One Who's Lost the Thread", description: "You know what you want but somehow can't access it. The gut that used to know has gone fuzzy. Hapé cuts through the accumulation. Direction returns." },
        { title: "The One Carrying Too Much", description: "You take on the energy of rooms, of people, of situations. You absorb what isn't yours and carry it long after. Hapé clears the field. Participants consistently describe feeling lighter." },
      ]} />
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I thought I knew what being grounded felt like. I didn't. After Hapé I understood the difference between thinking about being present and actually being present. My whole body was here."
      attribution="First ceremony · Washington, DC"
    />

    <SanctuarySection eyebrow="What to Expect" title={<>A Ceremony With<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Ancient Structure</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p><strong className="text-[hsl(45,70%,49%)]">Opening circle.</strong> We sit together, set intentions, open sacred space. You speak what you are bringing to the ceremony and what you are asking to release.</p>
        <p><strong className="text-[hsl(45,70%,49%)]">Hapé administration.</strong> Our facilitator administers the sacrament through the nose using the tepi pipe. The experience peaks quickly, intense, complete, specific.</p>
        <p><strong className="text-[hsl(45,70%,49%)]">Sitting with what arrives.</strong> After administration, you rest in the ceremony container. Sound, silence, and space support the integration happening in real time.</p>
        <p><strong className="text-[hsl(45,70%,49%)]">Closing and sharing.</strong> We close sacred space together. Participants share what moved through them. You leave knowing you were witnessed.</p>
        <p className="text-[hsl(35,55%,42%)] italic">Expect intensity. Expect clarity. Expect to feel more like yourself than you have in a long time.</p>
      </div>
    </SanctuarySection>

    <EventbriteDetails eventKey="hape" title="The Hapé Circle · Sacred Logistics" />

    <section className="relative overflow-hidden border-t border-[hsla(45,70%,49%,0.1)]">
      <video
        src={forestVideoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[hsl(140,28%,4%)]/75" />
      <div className="relative z-10 px-6 md:px-12 py-24 md:py-32 text-center">
        <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,55%)] mb-3">
          Recurring Offering · Washington, DC
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-[hsl(40,30%,95%)] mb-5 leading-tight">
          The Forest<br />
          <em className="font-serif italic text-[hsl(35,65%,55%)] text-[1.1em]">Has Been Waiting</em>
        </h2>
        <p className="max-w-[640px] mx-auto text-[hsl(40,25%,85%)] font-serif text-lg leading-relaxed mb-8">
          You already know if this is for you. Take your place beneath the canopy and let your preparation begin. The forest holds what arrives.
        </p>
        <EventbriteCheckout
          eventId="946929721287"
          label="Enter the Hapé Circle"
          fallbackUrl="https://www.eventbrite.com/e/hape-the-silencer-registration-946929721287"
        />
        <p className="mt-6 font-sans text-[10px] tracking-[2px] uppercase text-[hsl(40,25%,72%)]">
          Community Care Model · Suggested sacred contribution · Scholarship available · Ask us
        </p>
      </div>
    </section>

    {/* RFRA Statement */}
    <div className="bg-[hsl(140,28%,4%)] border-t border-[hsla(45,70%,49%,0.1)] py-8 px-6 md:px-12">
      <div className="max-w-[760px] mx-auto mb-6 p-6 border border-[hsla(45,70%,49%,0.2)] rounded-lg bg-[hsla(45,70%,49%,0.04)] text-center">
        <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-2">Sacred Access</p>
        <p className="font-serif italic text-[15px] text-[hsl(35,30%,82%)] leading-relaxed">
          We believe healing is a birthright, not a privilege. Sliding scale and scholarship offerings are available for those called to ceremony. Write to <a href="mailto:askus@templemotherearth.org" className="text-[hsl(45,70%,49%)] underline">askus@templemotherearth.org</a> to begin the conversation.
        </p>
      </div>
      <p className="max-w-[760px] mx-auto text-center font-serif italic text-[13px] text-[hsl(35,30%,55%)] leading-relaxed">
        This sacred ceremony is a protected religious practice of Temple Mother Earth under RFRA and the First Amendment.
      </p>
    </div>

    <CeremonyExploreNav variant="light" />
  </SacredSeriesLayout>
);

export default HapeCeremony;
