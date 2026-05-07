import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

const EVENTBRITE_URL =
  "https://www.eventbrite.com/e/womens-wellness-wednesdays-tickets-1513680431919?aff=oddtdtcreator&keep_tld=true";

const WomensCircle = () => (
  <SacredSeriesLayout
    title="Women's Wellness Wednesdays · Temple Mother Earth"
    description="Women's Wellness Wednesdays · a weekly sisterhood circle for reflection, restoration, and the embodied feminine, held at Temple Mother Earth, Washington DC."
    path="/womens-circle"
  >
    <SanctuaryHero
      dateBadge="Weekly · Wednesdays"
      eyebrow="Women's Wellness Wednesdays"
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
      primaryCTA={{ label: "Reserve Your Seat", href: EVENTBRITE_URL, external: true }}
      secondaryCTA={{ label: "What to Expect ↓", href: "#about" }}
      backgroundImage="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
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
          Women's Wellness Wednesdays is a weekly gathering for women who want to step out of the noise of the week and into a sanctuary of presence, breath, and shared wisdom.
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
            title: "The Seeker",
            description:
              "Women in transition or remembering · returning to body, to cycle, to sisterhood, to the wisdom that has always lived in you.",
            note: "ROOM FOR YOU",
          },
        ]}
      />
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="Wednesdays used to be the day I survived. Now it's the day I come home. I didn't realize how starved I was for sisterhood until I sat in this circle."
      attribution="Women's Wellness Wednesdays · Washington, DC"
    />

    <SanctuaryCTA
      eyebrow="Weekly Offering · Washington, DC"
      title={
        <>
          The Circle Is<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Waiting For You</em>
        </>
      }
      description="Reserve your seat through Eventbrite. Sacred reciprocity offered for those whose path requires it · write to us."
      ctaLabel="Reserve Your Seat"
      ctaHref={EVENTBRITE_URL}
      note="21+ · Pre-registration required · Confidentiality honored"
    />
  </SacredSeriesLayout>
);

export default WomensCircle;