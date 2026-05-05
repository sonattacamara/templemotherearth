import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

const EVENTBRITE_YIN = "https://www.eventbrite.com/e/yin-yoga-the-art-of-surrender-virtual-restorative-experience-with-chaka-tickets-1830988739609";

const SacredYinYoga = () => (
  <SacredSeriesLayout
    title="Sacred Yin Yoga · Temple Mother Earth"
    description="Ceremonial yin yoga with sound healing and breathwork. Surrender and restore. Temple Mother Earth, Washington DC."
  >
    <SanctuaryHero
      dateBadge="Recurring Offering"
      eyebrow="Sacred Yin Yoga"
      title={<>You Already Know<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">How to Surrender</em></>}
      subtitle=""
      lead="Your body has been asking you to stop. Not forever. Not dramatically. Just long enough to feel what's been accumulating in the tissue, in the fascia, in the places where you have been carrying tension so long it has started to feel like you."
      primaryCTA={{ label: "Secure Your Place", href: EVENTBRITE_YIN, external: true }}
      secondaryCTA={{ label: "What to Expect ↓", href: "#about" }}
      backgroundImage="https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    />

    <SanctuarySection id="about" eyebrow="What Sacred Yin Is" title={<>Not Exercise.<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Ceremony in the Body.</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>Yin yoga asks you to stay. That is the entire practice. Postures are held for three to five minutes, long enough to move past the surface layer of muscle and reach the deep connective tissue, the fascia, the ligaments, the energetic meridians.</p>
        <p>Most of us have been trained to push through. Yin asks for the opposite: <strong className="text-[hsl(45,70%,49%)]">to arrive, to feel, and to let the body open in its own time.</strong></p>
        <p>Sacred Yin at Temple Mother Earth is ceremony. Sound healing woven throughout. Breathwork at the opening and close. The facilitator holds the space as a sacred container, not just a fitness class.</p>
      </div>
    </SanctuarySection>

    <SanctuarySection eyebrow="The 90-Minute Journey" title={<>Meditation<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">in Motion</em></>}>
      <SanctuaryColCards cards={[
        { title: "Sacred Opening", description: "Prayer, intention, and breathwork to transition out of ordinary time and into ceremonial space. Your nervous system begins to shift from the moment the space is opened." },
        { title: "The Yin Sequence", description: "A carefully sequenced series of postures held long enough to reach the deep tissue. Sound healing woven throughout. Your body opens in layers." },
        { title: "Integration & Close", description: "Extended savasana with sound bath. A closing sharing circle for those who feel called to speak. You leave feeling like you have been returned to yourself." },
      ]} />
    </SanctuarySection>

    <SanctuaryCTA
      eyebrow="Recurring Offering · Washington, DC"
      title={<>Your Body<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Is Ready to Rest</em></>}
      description="You don't need experience. You don't need flexibility. You need ninety minutes and a willingness to arrive. That's all."
      ctaLabel="Secure Your Place"
      ctaHref={EVENTBRITE_YIN}
      note="All levels welcome · Community Care Model · Registration confirms your place"
    />
  </SacredSeriesLayout>
);

export default SacredYinYoga;
