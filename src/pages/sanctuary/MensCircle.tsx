import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

import mensVideo from "@/assets/video-mens-circle-hero.mp4.asset.json";

const EVENTBRITE_URL =
  "https://www.eventbrite.com/e/the-cove-a-mens-healing-reflection-circle-tickets-1982328123781?aff=ebdsoporgprofile";

const MensCircle = () => (
  <SacredSeriesLayout
    title="The Cove · Men's Reflection Circle · Temple Mother Earth"
    description="The Cove · a sacred men's reflection and integration circle held at Temple Mother Earth, Washington DC. Brotherhood, presence, and the embodied masculine."
    path="/mens-circle"
  >
    <SanctuaryHero
      dateBadge="Recurring Brotherhood Circle"
      eyebrow="The Cove · Men's Circle"
      title={
        <>
          A Sacred Space for<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">
            The Embodied Masculine
          </em>
        </>
      }
      subtitle=""
      lead="The Cove is a men's reflection and integration circle · a sanctuary where brothers gather in honesty, in stillness, and in the courage it takes to be fully seen."
      primaryCTA={{ label: "Reserve Your Seat", href: EVENTBRITE_URL, external: true }}
      secondaryCTA={{ label: "What to Expect ↓", href: "#about" }}
      backgroundVideo={mensVideo.url}
    />

    <SanctuarySection
      id="about"
      eyebrow="The Circle"
      title={
        <>
          Brotherhood Held in<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">
            Reverence and Truth
          </em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          The Cove is a sacred container for men who are tired of carrying everything alone · and who are ready to remember that the embodied masculine is built in circle, not in isolation.
        </p>
        <p>
          Each gathering opens with grounding practice and moves into guided reflection, council-style sharing, and integration. What is spoken in The Cove stays in The Cove.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">This is not therapy. It is sanctuary.</strong> A place to set the armor down for an evening and meet your brothers as you actually are.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    <SanctuarySection
      id="who"
      eyebrow="Who This Is For"
      title={
        <>
          If You've Been Called<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">You Already Know</em>
        </>
      }
    >
      <SanctuaryColCards
        cards={[
          {
            title: "The Soul",
            description:
              "Men in transition · career, fatherhood, partnership, loss · who feel the call to gather with others walking the same threshold.",
            note: "ALL ARE WELCOME",
          },
          {
            title: "The Returning Warrior",
            description:
              "Veterans, first responders, and men carrying weight that does not get named in everyday conversation. A circle that can hold it.",
            note: "HONORED HERE",
            featured: true,
          },
          {
            title: "The Builder",
            description:
              "Fathers, husbands, providers, and leaders who want to source from something deeper than performance. Brotherhood as practice.",
            note: "ROOM FOR YOU",
          },
        ]}
      />
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I came in expecting to listen. I left having said the thing I'd been holding in my chest for two years. No one fixed me. They just witnessed me. That was the medicine."
      attribution="The Cove · Washington, DC"
    />

    <SanctuaryCTA
      eyebrow="Recurring Offering · Washington, DC"
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

export default MensCircle;