import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryClickableCards from "@/components/sanctuary/SanctuaryClickableCards";
import FooterVideoBanner from "@/components/story/FooterVideoBanner";
import EventbriteDetails from "@/components/sanctuary/EventbriteDetails";
import fffFooterVideo from "@/assets/video-fff-footer.mp4?url";

import fffVideoUrl from "@/assets/video-fff-hero-v5.mp4?url";
const fffVideo = { url: fffVideoUrl };

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

    <SanctuarySection eyebrow="Ways to Move" title={<>However Your<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Body Calls You</em></>}>
      <p className="font-sans text-[12px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mt-4 mb-2">
        Tap any practice to learn more
      </p>
      <SanctuaryClickableCards cards={[
        {
          title: "Static Stand",
          shortDescription: "Feet rooted, eyes closed, let the frequency move you from the inside. No choreography. No floor travel. Just presence in the body.",
          longDescription: "The simplest doorway in. Plant your feet shoulder-width apart, soften your knees, let your eyes close. Your only job is to feel the bass arrive in your bones and let it pass through. No one is watching. No one is waiting for you to do something. The frequency is the practice; your stillness is the prayer.",
          whatToExpect: [
            "Standing in one spot for as long as you want · the floor is yours",
            "Subtle sway, breath dropping deeper, shoulders releasing on their own",
            "Emotion may rise · tears, laughter, a long exhale you have been holding for years",
            "No pressure to move bigger · the frequency is doing the work",
            "You can shift to another practice at any moment without explanation",
          ],
        },
        {
          title: "Contact Dance",
          shortDescription: "Slow, consensual partner-led movement. Shoulder, palm, back · the points where two bodies meet become the conversation.",
          longDescription: "An invitation, never a demand. You meet another body in slow, listening movement · a palm finds a palm, a back leans against a back. The skin becomes the language. There is no leader, no follower, no performance. Either person can pause, soften, or step away at any moment with a simple hand on the heart. This is consent practiced in the body.",
          whatToExpect: [
            "Every contact is opt-in · a nod, a soft eye-meet, an open palm",
            "A hand on your own heart is the universal signal to pause or close",
            "No talking on the floor · the listening happens through breath and touch",
            "You are free to decline any invitation without explanation, ever",
            "Sanctuary guardians are present and watching · you are held",
          ],
        },
        {
          title: "Free Flow",
          shortDescription: "Your own rhythm, full floor, no rules. Spin if you need to spin. Drop low if you need to drop low. The body leads, the mind follows.",
          longDescription: "This is where the cage door opens. There is no right way to move. No choreography to learn. No mirror to check yourself against. If your hips want to circle, let them. If your arms want to reach for the ceiling, let them. If you need to drop to the floor and crawl, the floor is sacred and it will hold you. The body has been waiting a long time to be allowed.",
          whatToExpect: [
            "Full floor permission · travel, spin, jump, crawl, whatever rises",
            "No skill required · awkward is welcome, weird is welcome, wild is welcome",
            "Sweat, breath, sound (no words) all encouraged",
            "Energy waves come and go · you can rest in stillness mid-dance",
            "You may leave the floor changed in ways you did not expect",
          ],
        },
        {
          title: "Stillness as Movement",
          shortDescription: "Sit, lie down, breathe. The frequency does the work. Stillness is sacred on this floor and held with the same reverence as the dance.",
          longDescription: "Some of the deepest movement happens when the body finally gets to be still. Find a corner, a wall, a cushion at the edge of the floor. Lie down and let the bass become a lullaby. Let the frequency move through you while your body rests. This is not opting out · this is opting all the way in. The nervous system is allowed to soften here.",
          whatToExpect: [
            "Cushions, blankets, and rest space available along the edges of the floor",
            "Permission to lie down at any point in the four-hour arc",
            "Sanctuary guardians will gently check on you, never disturb you",
            "Sound bath frequencies will reach you wherever you are",
            "Returning to movement when ready · or staying in stillness the whole night",
          ],
        },
      ]} />
    </SanctuarySection>

    <EventbriteDetails eventKey="fff" title="Frequency Fungi Flow · Sacred Logistics" />

    <FooterVideoBanner
      video={fffFooterVideo}
      eyebrow="3rd Saturday · 7·11 PM · Washington, DC"
      headline={<>Your Soul Is<br /><em className="font-serif italic text-primary">Already on the Floor</em></>}
      body="The frequency is rising. The circle is forming. Your spot is waiting. Come connect with your soul, your body, your spirit, and a community that moves as one."
      ctaLabel="Come Dance With Us"
      ctaHref={EVENTBRITE_FFF}
    />
  </SacredSeriesLayout>
);

export default FrequencyFungiFlow;