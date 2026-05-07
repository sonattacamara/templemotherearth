import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

const InnerAlchemySpa = () => (
  <SacredSeriesLayout
    title="Inner Alchemy Wellness Spa Day · Temple Mother Earth"
    description="A full day of sacred rest and restoration. Body practices, sound ceremony, nourishment, and ceremony. Held at Spa World."
  >
    <SanctuaryHero
      dateBadge="Recurring Offering"
      eyebrow="Inner Alchemy Wellness Spa Day"
      title={<>Your Body Has Been<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">Waiting for This Day</em></>}
      subtitle=""
      lead="Not a massage appointment. Not a wellness class. A full day inside a sacred container, where the only thing asked of you is to receive. Rest. Be tended to. Remember what it feels like when the body is honored rather than used."
      primaryCTA={{ label: "Secure Your Place", href: "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477", external: true }}
      secondaryCTA={{ label: "What's Included ↓", href: "#about" }}
      backgroundImage="https://images.pexels.com/photos/3757952/pexels-photo-3757952.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    />

    <SanctuarySection id="about" eyebrow="The Day" title={<>From Sunrise to Sunset.<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Every Moment Held.</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>Inner Alchemy is a full Spa Day held at Spa World. You arrive and you do not have to manage anything. The day is designed. The treatments are sequenced. The nourishment is prepared.</p>
        <p>The seven wellness pillars · juicing, detox, water, microdose, nervous system, sun, and DNA upgrade · are woven through every aspect of the day. <strong className="text-[hsl(45,70%,49%)]">This is not pampering. This is restoration.</strong></p>
      </div>
    </SanctuarySection>

    <SanctuarySection eyebrow="What's Included" title={<>A Full Day of<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Sacred Restoration</em></>}>
      <SanctuaryColCards cards={[
        { title: "Body Practices", description: "Therapeutic touch, energy work, and body-based practices that release what the nervous system has been holding." },
        { title: "Sound & Vibrational Ceremony", description: "Bowls, instruments, and vibrational sacrament sessions to recalibrate the nervous system." },
        { title: "Sacred Nourishment", description: "Plant-based, ceremonially prepared food and juice throughout the day. Our 7 Pillars approach treats food as information." },
        { title: "Yoga & Breathwork", description: "Ceremonial yoga and breathwork sessions integrated into the day's flow. Not exercise, ceremony." },
        { title: "Sacred Ceremony", description: "A closing ceremony to seal the restoration and carry you into the evening changed." },
        { title: "Community & Rest", description: "Space to simply be. With others who have chosen to rest. To restore. Just breathing." },
      ]} />
    </SanctuarySection>

    <SanctuaryCTA
      eyebrow="Recurring Offering · Full Day Experience"
      title={<>You Have Earned<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">This Day</em></>}
      description="Not as a reward. As a necessity. Your body knows the difference. Secure your place and let the day begin with that decision."
      ctaLabel="Secure Your Place"
      ctaHref="https://www.eventbrite.com/o/temple-of-mother-earth-29347213477"
      note="Community Care Model · Full day · Registration required to confirm your place"
    />
  </SacredSeriesLayout>
);

export default InnerAlchemySpa;
