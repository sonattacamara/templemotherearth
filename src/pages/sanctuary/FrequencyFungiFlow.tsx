import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

import fffVideo from "@/assets/video-fff-hero.mp4.asset.json";

const EVENTBRITE_FFF = "https://www.eventbrite.com/e/frequency-fungi-flow-a-sacred-ecstatic-dance-temple-gathering-registration-1097503254779?aff=ebdsoporgprofile";

const FrequencyFungiFlow = () => (
  <SacredSeriesLayout
    title="Frequency, Fungi & Flow · Temple Mother Earth"
    description="A sacred journey of sound, movement, and connection. Third Saturday of every month, 7·11 PM. Temple Mother Earth, Washington DC."
  >
    <SanctuaryHero
      dateBadge="3rd Saturday Monthly · 7·11 PM"
      eyebrow="Frequency · Fungi · Flow"
      title={<>Come Dance With Us<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">Soul, Body & Spirit</em></>}
      subtitle=""
      lead="There is a frequency your body remembers. A rhythm that lives beneath the noise of the week, beneath the words you have been carrying, beneath the version of yourself you wear in the world. When the music begins to move through you, that frequency rises, and you remember who you are."
      primaryCTA={{ label: "Come Move With Us", href: EVENTBRITE_FFF, external: true }}
      secondaryCTA={{ label: "What Awaits You ↓", href: "#about" }}
      backgroundVideo={fffVideo.url}
    />

    <SanctuarySection id="about" eyebrow="What This Journey Is" title={<>Not a Class.<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">A Sacred Frequency.</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>Frequency, Fungi & Flow is a four-hour ceremonial gathering held on the <strong className="text-[hsl(45,70%,49%)]">third Saturday of every month</strong> as part of our Sacred Series Week. Sound becomes prayer. Movement becomes medicine. Community becomes the container.</p>
        <p>This is what ecstatic dance becomes when it is held inside a temple. No talking on the floor. No alcohol. No performance. Just you, the frequency, and the freedom to move the way your soul has been asking you to move.</p>
        <p>Whether you arrive carrying a question, a grief, or simply the curiosity of <em>what would it feel like to let go</em>, the answer rises through the soles of your feet the moment the bass drops.</p>
      </div>
    </SanctuarySection>

    <SanctuarySection eyebrow="The Four-Hour Arc" title={<>A Journey of<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Sound, Movement & Connection</em></>}>
      <SanctuaryColCards cards={[
        { title: "Sacred Opening · 7 PM", description: "Arrival, grounding, and ceremonial intention. Breathwork to transition out of ordinary time and into the temple's frequency. Your nervous system begins to soften the moment the circle is opened." },
        { title: "The Wave Rises · 8 PM", description: "Curated soundscapes carry you from gentle awakening to ecstatic release. Move how your body asks. Close your eyes. Let the rhythm rearrange what the week stacked on top of you." },
        { title: "Flow & Communion · 9 PM", description: "Peak frequency. The room becomes one breathing organism. This is where the medicine lives · in the unspoken connection that arises when strangers move together in sacred space." },
        { title: "Integration & Close · 10 PM", description: "The wave gently descends into stillness. Sound bath. Quiet pulse. A closing circle for those who feel called to share. You leave feeling alive, returned, and a little more yourself." },
      ]} />
    </SanctuarySection>

    <SanctuarySection eyebrow="Why Your Soul Is Calling You Here" title={<>Move What<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Words Cannot Reach</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>Your body has been holding what your mind has not had time to process. Frequency reaches places talk therapy cannot. Movement releases what stillness alone cannot.</p>
        <p>You do not need rhythm. You do not need experience. You do not need to arrive as anyone other than exactly who you are tonight. <strong className="text-[hsl(45,70%,49%)]">The dance floor is a sanctuary, and your body already knows the way.</strong></p>
        <p>Come alone. Come with friends. Come tired. Come tender. Come ready to remember that joy is your birthright and the body is the temple where it lives.</p>
      </div>
    </SanctuarySection>

    <SanctuaryCTA
      eyebrow="3rd Saturday · 7·11 PM · Washington, DC"
      title={<>Your Soul Is<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Already on the Floor</em></>}
      description="The frequency is rising. The circle is forming. Your spot is waiting. Come connect with your soul, your body, your spirit · and a community that moves as one."
      ctaLabel="Come Dance With Us"
      ctaHref={EVENTBRITE_FFF}
      note="All bodies welcome · Substance-free sacred space · Community Care Model"
    />
  </SacredSeriesLayout>
);

export default FrequencyFungiFlow;