import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

const EVENTBRITE_ART = "https://www.eventbrite.com/e/art-expo-registration-539756675747";

const SacredArtExpo = () => (
  <SanctuaryWeekLayout
    title="Sacred Art Expo · March 28 · Temple Mother Earth"
    description="Visionary art, live music, artist marketplace, and Sacred Tea House. An evening where ceremony becomes culture. March 28, 2026."
  >
    <SanctuaryHero
      dateBadge="Friday · March 28 · 2026 · Evening"
      eyebrow="Sacred Art Expo"
      title={<>Art Born From<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.15em]">The Other Side</em></>}
      subtitle=""
      lead="These artists did not imagine this work. They brought it back. From ceremony, from vision, from the places that open when the ordinary mind goes quiet. The art on these walls is a transmission. You will know when it reaches you."
      primaryCTA={{ label: "Reserve Your Evening", href: EVENTBRITE_ART, external: true }}
      secondaryCTA={{ label: "Learn More ↓", href: "#about" }}
      backgroundImage="https://images.pexels.com/photos/1472334/pexels-photo-1472334.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    />

    <SanctuarySection id="about" eyebrow="What This Evening Is" title={<>Where Ceremony<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Becomes Culture</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(35,30%,68%)] max-w-[720px] font-serif space-y-6">
        <p>The Sacred Art Expo is an evening at the intersection of visionary art, sacred community, and living culture. Artists whose work has been shaped by ceremony and contemplative practice gather to share what they have brought back.</p>
        <p>The Sacred Tea House will be open throughout the evening. <strong className="text-[hsl(40,30%,90%)]">This is not a gallery opening. It is a gathering of people for whom beauty is a spiritual practice.</strong></p>
      </div>
    </SanctuarySection>

    <SanctuarySection eyebrow="The Evening" title="Art · Music · Tea · Community">
      <SanctuaryColCards cards={[
        { title: "Visionary Art Exhibition", description: "A curated collection of works born from ceremony, contemplative practice, and the depths of the artists' own transformational journeys. Each piece carries its origin story." },
        { title: "Artist Marketplace", description: "Original works, prints, and sacred objects available for purchase. When you bring a piece of this art into your home, you bring a transmission." },
        { title: "Live Sound Performances", description: "Sound artists and musicians whose work is rooted in the same ceremonial practice as the visual artists. The evening breathes. Music, silence, conversation." },
      ]} />
    </SanctuarySection>

    <SanctuaryCTA
      eyebrow="Friday · March 28 · 2026"
      title={<>The Art Is<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Already Waiting For You</em></>}
      description="An evening where beauty is not decoration but transmission. Reserve your place and bring someone who is ready to see."
      ctaLabel="Reserve Your Evening"
      ctaHref={EVENTBRITE_ART}
      note="Open to all · Sacred Tea House open throughout · Artist meet & greet included"
    />
  </SanctuaryWeekLayout>
);

export default SacredArtExpo;
