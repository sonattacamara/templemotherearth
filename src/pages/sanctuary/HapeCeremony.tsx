import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";

const HapeCeremony = () => (
  <SanctuaryWeekLayout
    title="Hapé Community Ceremony · March 19 · Temple Mother Earth"
    description="Sacred Amazonian snuff ceremony. Ground, clear, and return to yourself. Temple Mother Earth, Washington DC."
  >
    <SanctuaryHero
      dateBadge="Thursday · March 19 · 2026"
      eyebrow="Hapé Community Ceremony"
      title={<>The Noise Stops.<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">You Remember.</em></>}
      subtitle=""
      lead="Not the thought of yourself. Not the story you've been running. The actual you, underneath all of it, quiet, present, grounded in your body on this earth. Hapé has been clearing this path for thousands of years. It knows exactly where to go."
      primaryCTA={{ label: "Secure Your Place", href: "https://bit.ly/HapeCircle", external: true }}
      secondaryCTA={{ label: "Learn More ↓", href: "#about" }}
      backgroundImage="https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    />

    <SanctuarySection id="about" eyebrow="What Hapé Is" title={<>The Forest's Most<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Direct Transmission</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(90,10%,35%)] max-w-[720px] font-serif space-y-6">
        <p>Hapé, pronounced <em>ha-PAY</em>, is a sacred snuff prepared by Amazonian peoples from ceremonially harvested tobacco and plant ashes. It is administered through the nostrils using a pipe called a <em>tepi</em> or <em>kuripe</em>. The experience is immediate, specific, and unlike anything else.</p>
        <p>Within moments, <strong className="text-[hsl(100,20%,15%)]">the mind goes quiet.</strong> Not suppressed, cleared. The third eye opens. The body drops into the earth. The frantic noise of ordinary life falls away and what remains is you, unadorned, present, exactly here.</p>
        <p>This is not a gentle sacrament. It is a direct one. It will take you somewhere real. And where it takes you, you will recognize.</p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(90,15%,85%)] mx-6 md:mx-12" />

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
      <div className="text-xl leading-[1.85] text-[hsl(90,10%,35%)] max-w-[720px] font-serif space-y-6">
        <p><strong className="text-[hsl(100,20%,15%)]">Opening circle.</strong> We sit together, set intentions, open sacred space. You speak what you are bringing to the ceremony and what you are asking to release.</p>
        <p><strong className="text-[hsl(100,20%,15%)]">Rapé administration.</strong> Our facilitator administers the sacrament through the nose using the tepi pipe. The experience peaks quickly, intense, complete, specific.</p>
        <p><strong className="text-[hsl(100,20%,15%)]">Sitting with what arrives.</strong> After administration, you rest in the ceremony container. Sound, silence, and space support the integration happening in real time.</p>
        <p><strong className="text-[hsl(100,20%,15%)]">Closing and sharing.</strong> We close sacred space together. Participants share what moved through them. You leave knowing you were witnessed.</p>
        <p className="text-[hsl(35,55%,42%)] italic">Expect intensity. Expect clarity. Expect to feel more like yourself than you have in a long time.</p>
      </div>
    </SanctuarySection>

    <SanctuaryCTA
      eyebrow="Thursday · March 19 · 2026"
      title={<>The Forest<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Has Been Waiting</em></>}
      description="You already know if this is for you. Secure your place and begin your preparation. The circle holds what arrives."
      ctaLabel="Secure Your Place"
      ctaHref="https://bit.ly/HapeCircle"
      note="Community Care Model · Suggested sacred contribution · Scholarship available · Ask us"
    />
  </SanctuaryWeekLayout>
);

export default HapeCeremony;
