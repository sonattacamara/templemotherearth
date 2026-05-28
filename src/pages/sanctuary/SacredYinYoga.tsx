import { Link } from "react-router-dom";
import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import yogaVideoUrl from "@/assets/video-yoga-hero-v2.mp4?url";
const yogaVideo = { url: yogaVideoUrl };
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import FooterVideoBanner from "@/components/story/FooterVideoBanner";
import MidScrollCommitment from "@/components/sanctuary/MidScrollCommitment";
import yinFooterVideo from "@/assets/video-yin-footer.mp4?url";

const EVENTBRITE_WEDNESDAY = "https://www.eventbrite.com/e/yin-yoga-the-art-of-surrender-virtual-restorative-experience-with-chaka-tickets-1830988739609";
// The Softening · Tuesday women's sacrament yin (Eventbrite draft live)
const EVENTBRITE_SOFTENING = "https://www.eventbrite.com/e/the-softening-tickets-1989036537828";

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
      primaryCTA={{ label: "View Offerings ↓", href: "#offerings" }}
      secondaryCTA={{ label: "What Yin Is ↓", href: "#about" }}
      backgroundVideo={yogaVideo.url}
    />

    <SanctuarySection id="about" eyebrow="What Sacred Yin Is" title={<>Not Exercise.<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Ceremony in the Body.</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>Yin yoga asks you to stay. That is the entire practice. Postures are held for three to five minutes, long enough to move past the surface layer of muscle and reach the deep connective tissue, the fascia, the ligaments, the energetic meridians.</p>
        <p>Most of us have been trained to push through. Yin asks for the opposite: <strong className="text-[hsl(45,70%,49%)]">to arrive, to feel, and to let the body open in its own time.</strong></p>
        <p>Sacred Yin at Temple Mother Earth is ceremony. Sound healing woven throughout. Breathwork at the opening and close. Camara holds the space as a sacred container · this is devotional practice, not a fitness class.</p>
      </div>
    </SanctuarySection>

    <SanctuarySection id="offerings" eyebrow="Two Sacred Offerings" title={<>Choose Your<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Container</em></>}>
      <div className="grid md:grid-cols-2 gap-6 max-w-[1100px]">
        {/* The Softening · Tuesday Women's Ceremony */}
        <div className="border border-[hsl(45,70%,49%)]/30 bg-[hsl(150,30%,8%)]/60 p-8 rounded-sm flex flex-col">
          <div className="text-xs uppercase tracking-[0.2em] text-[hsl(45,70%,49%)] mb-3">In Person · Women Only</div>
          <h3 className="font-serif text-3xl text-[hsl(40,30%,95%)] mb-2 leading-tight">The Softening</h3>
          <p className="text-sm uppercase tracking-wider text-[hsl(40,30%,75%)] mb-5">A Restorative Evening of Yin, Sacred Tea &amp; Nervous System Renewal</p>
          <div className="text-[hsl(40,30%,85%)] font-serif space-y-3 mb-6 flex-1">
            <p>Held the fourth Tuesday of each month, this is a sacramental yin gathering for women only. Camara holds the container as a sacred tea ceremony opens the circle, then flows into yin yoga and closes with integration · the body softens, the nervous system unwinds, and the feminine returns home to herself. (<Link to="/tea-house" className="text-[hsl(45,70%,49%)] underline hover:text-[hsl(45,70%,58%)] transition-colors">Sacred Tea House</Link> gathers separately on Mondays.)</p>
            <p>This is not yoga as fitness. It is yoga as prayer · a slow, devotional return to the body, the breath, and the feminine knowing that lives in the womb space.</p>
          </div>
          <ul className="text-sm text-[hsl(40,30%,75%)] space-y-1.5 mb-6 border-t border-[hsl(45,70%,49%)]/20 pt-5">
            <li><span className="text-[hsl(45,70%,49%)]">Held by</span> Camara</li>
            <li><span className="text-[hsl(45,70%,49%)]">Rhythm</span> 4th Tuesday monthly</li>
            <li><span className="text-[hsl(45,70%,49%)]">Arc</span> Sacred Tea · Yin · Integration</li>
            <li><span className="text-[hsl(45,70%,49%)]">Location</span> Temple Mother Earth, Washington DC</li>
            <li><span className="text-[hsl(45,70%,49%)]">Sacred Reciprocity</span> $44</li>
          </ul>
          <a href={EVENTBRITE_SOFTENING} target={EVENTBRITE_SOFTENING.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-block text-center bg-[hsl(45,70%,49%)] text-[hsl(150,30%,8%)] px-6 py-3 font-medium uppercase tracking-wider text-sm hover:bg-[hsl(45,70%,55%)] transition">Fourth Tuesday · In Person</a>
        </div>

        {/* Art of Surrender · Wednesday Virtual */}
        <div className="border border-[hsl(45,70%,49%)]/30 bg-[hsl(150,30%,8%)]/60 p-8 rounded-sm flex flex-col">
          <div className="text-xs uppercase tracking-[0.2em] text-[hsl(45,70%,49%)] mb-3">Virtual · All Welcome</div>
          <h3 className="font-serif text-3xl text-[hsl(40,30%,95%)] mb-2 leading-tight">The Art of Surrender</h3>
          <p className="text-sm uppercase tracking-wider text-[hsl(40,30%,75%)] mb-5">A Weekly Virtual Yin &amp; Restorative Practice</p>
          <div className="text-[hsl(40,30%,85%)] font-serif space-y-3 mb-6 flex-1">
            <p>Every Wednesday evening, Chaka opens a virtual yin container from wherever you are. Long, ground holds. Soft music. Guided breath. A weekly ritual of returning to the body before the week carries you somewhere else.</p>
            <p>Open to all bodies, all levels, all genders. Donation based, so no one is turned away. Roll out your mat at home and join the circle.</p>
          </div>
          <ul className="text-sm text-[hsl(40,30%,75%)] space-y-1.5 mb-6 border-t border-[hsl(45,70%,49%)]/20 pt-5">
            <li><span className="text-[hsl(45,70%,49%)]">Held by</span> Chaka</li>
            <li><span className="text-[hsl(45,70%,49%)]">Rhythm</span> Every Wednesday, 6:00 PM</li>
            <li><span className="text-[hsl(45,70%,49%)]">Location</span> Virtual · Join from anywhere</li>
            <li><span className="text-[hsl(45,70%,49%)]">Sacred Reciprocity</span> Donation based</li>
          </ul>
          <a href={EVENTBRITE_WEDNESDAY} target="_blank" rel="noopener noreferrer" className="inline-block text-center bg-[hsl(45,70%,49%)] text-[hsl(150,30%,8%)] px-6 py-3 font-medium uppercase tracking-wider text-sm hover:bg-[hsl(45,70%,55%)] transition">Wednesday · Virtual</a>
        </div>
      </div>
    </SanctuarySection>

    <SanctuarySection eyebrow="The 90-Minute Arc" title={<>Meditation<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">in Motion</em></>}>
      <SanctuaryColCards cards={[
        { title: "Sacred Opening", description: "Prayer, intention, and breathwork to transition out of ordinary time and into ceremonial space. Your nervous system begins to shift from the moment the space is opened." },
        { title: "The Yin Sequence", description: "A carefully sequenced series of postures held long enough to reach the deep tissue. Sound healing woven throughout. Your body opens in layers." },
        { title: "Integration & Close", description: "Extended savasana with sound bath. A closing sharing circle for those who feel called to speak. You leave feeling like you have been returned to yourself." },
      ]} />
    </SanctuarySection>

    <FooterVideoBanner
      video={yinFooterVideo}
      eyebrow="Two Containers · One Practice"
      headline={<>Your Body<br /><em className="font-serif italic text-primary">Is Ready to Rest</em></>}
      body="You don't need experience. You don't need flexibility. You need ninety minutes and a willingness to arrive. That's all."
      ctaLabel="Fourth Tuesday · In Person"
      ctaHref={EVENTBRITE_SOFTENING}
    />
  </SacredSeriesLayout>
);

export default SacredYinYoga;
