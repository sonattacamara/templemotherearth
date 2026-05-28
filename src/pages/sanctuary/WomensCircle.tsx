import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import FooterVideoBanner from "@/components/story/FooterVideoBanner";
import EventbriteDetails from "@/components/sanctuary/EventbriteDetails";

import womensVideo from "@/assets/video-womens-circle-hero-v4.mp4?url";
import womensFooterVideoUrl from "@/assets/video-womens-circle-cushion.mp4?url";

const EVENTBRITE_URL =
  "https://www.eventbrite.com/e/womens-wellness-wednesdays-tickets-1513680431919?aff=oddtdtcreator&keep_tld=true";

const WomensCircle = () => (
  <SacredSeriesLayout
    title="The Circle · A Wombman Sanctuary · Temple Mother Earth"
    description="The Circle · A Wombman Sanctuary · a weekly sisterhood gathering for reflection, restoration, and the embodied feminine, held at Temple Mother Earth, Washington DC."
    path="/womens-circle"
  >
    <SanctuaryHero
      dateBadge="Weekly · Wednesdays"
      eyebrow="The Circle · A Wombman Sanctuary"
      title={
        <>
          A Weekly Sanctuary for<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">
            The Embodied Feminine
          </em>
        </>
      }
      subtitle=""
      lead="A mid-week return to yourself. Sisterhood, breath, reflection, and the practices that restore the nervous system and open the heart."
      primaryCTA={{ label: "Take Your Seat in the Circle", href: EVENTBRITE_URL, external: true }}
      secondaryCTA={{ label: "What to Expect ↓", href: "#about" }}
      backgroundVideo={womensVideo}
    />

    <SanctuarySection
      id="about"
      eyebrow="The Circle"
      title={
        <>
          Sisterhood Held in<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">
            Reverence and Rhythm
          </em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          The Circle · A Wombman Sanctuary is a weekly gathering for women who want to step out of the noise of the week and into a sanctuary of presence, breath, and shared wisdom.
        </p>
        <p>
          Each circle weaves together grounding practice, somatic restoration, intentional reflection, and the kind of conversation that only happens when women hold space for one another.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">This is not a workshop. It is a practice.</strong> A standing appointment with yourself, your sisters, and the part of you that has been waiting to be heard.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    <SanctuarySection
      id="who"
      eyebrow="Who This Is For"
      title={
        <>
          If Wednesday Has Become<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">A Survival Day</em>
        </>
      }
    >
      <SanctuaryColCards
        cards={[
          {
            title: "The Caregiver",
            description:
              "Mothers, partners, and women who pour endlessly into others. A weekly hour where you are the one being held.",
            note: "ALL ARE WELCOME",
          },
          {
            title: "The Practitioner",
            description:
              "Healers, facilitators, and women in service who need a circle of their own · somewhere to lay the work down and simply be.",
            note: "SANCTUARY",
            featured: true,
          },
          {
            title: "The Soul",
            description:
              "Women in transition or remembering · returning to body, to cycle, to sisterhood, to the wisdom that has always lived in you.",
            note: "ROOM FOR YOU",
          },
        ]}
      />
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="Wednesdays used to be the day I survived. Now it's the day I come home. I didn't realize how starved I was for sisterhood until I sat in this circle."
      attribution="The Circle · A Wombman Sanctuary · Washington, DC"
    />

    <EventbriteDetails eventKey="womens-circle" title="The Circle · Sacred Logistics" />

    <FooterVideoBanner
      video={womensFooterVideoUrl}
      eyebrow="Weekly Offering · Washington, DC"
      headline={<>The Circle Is<br /><em className="font-serif italic">Waiting For You</em></>}
      body="A soft place to land mid-week. Come breathe with your sisters and remember what it is to be held. Sacred reciprocity offered for those whose path requires it · write to us."
      ctaLabel="Take Your Seat in the Circle"
      ctaHref={EVENTBRITE_URL}
      videoObjectPosition="center 75%"
    />
  </SacredSeriesLayout>
);

export default WomensCircle;