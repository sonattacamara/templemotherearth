import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";
import forestVideo from "@/assets/video-hape-forest.mp4?url";

// Community Day :: Service & Connection — recurring sanctuary gathering on Eventbrite
const EVENTBRITE_COMMUNITY_DAY =
  "https://www.eventbrite.com/e/community-day-service-connection-registration-1125787734419?aff=ebdsoporgprofile";

const ForestCircle = () => (
  <SacredSeriesLayout
    title="Forest Circle · Community Day at Temple Mother Earth"
    description="Forest Circle is our Community Day · a recurring sanctuary gathering for service, land care, shared purpose, and meaningful community connection. Reserve your seat on Eventbrite."
    path="/forest-circle"
  >
    <SanctuaryHero
      dateBadge="Twice a Month · Community Day"
      eyebrow="Forest Circle · Community Day"
      title={
        <>
          A Day to Belong<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">
            Service &amp; Connection
          </em>
        </>
      }
      subtitle=""
      lead="Forest Circle is our Community Day at Temple Mother Earth · a heart-centered gathering for service, land care, shared purpose, and meaningful community connection. Not to perform. Not to be perfect. Just to show up."
      primaryCTA={{ label: "Reserve Your Seat on Eventbrite", href: EVENTBRITE_COMMUNITY_DAY, external: true }}
      secondaryCTA={{ label: "What to Expect \u2193", href: "#about" }}
      backgroundVideo={forestVideo}
    />

    <SanctuarySection
      id="about"
      eyebrow="What It Is"
      title={
        <>
          A Day to<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">
            Belong
          </em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          There is a special kind of belonging that happens when people come together with willing hands and open hearts. Not to perform. Not to be perfect. Not to have all the answers. Just to show up.
        </p>
        <p>
          Community Day at Temple Mother Earth was created for the person who has been craving community, the person who wants to give back, the person who feels nourished by meaningful work, and the person who knows that service can be its own form of grounding.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Twice a month, we gather to care for the land</strong> · to support the sanctuary, prepare shared spaces, and uplift one another through simple, intentional acts. Sometimes that looks like sweeping. Sometimes sorting, planting, organizing, painting, preparing, sharing a meal, or having a conversation that reminds you that you are not alone.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsl(100,25%,18%)] mx-6 md:mx-12" />

    <SanctuarySection
      eyebrow="Who This Is For"
      title={
        <>
          You Already Know<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">
            If This Is Calling You
          </em>
        </>
      }
    >
      <SanctuaryColCards
        cards={[
          {
            title: "The One Who Wants to Give",
            description:
              "You have been craving meaningful work. You want your hands to be useful, your presence to matter, your day to count for something beyond yourself.",
          },
          {
            title: "The One Who Wants to Belong",
            description:
              "You don't need a stage. You just want to be among people who show up the same way you do · willing, present, and quietly devoted to something larger than themselves.",
          },
          {
            title: "The One New to the Sanctuary",
            description:
              "You have not sat in ceremony yet. Community Day is a gentle first step · a way to meet the land, the people, and the rhythm of Temple Mother Earth before anything more.",
          },
        ]}
      />
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I came for the work. I left knowing I had a community."
      attribution="Community Day participant"
    />

    <SanctuarySection
      eyebrow="The Rhythm of the Day"
      title={
        <>
          Hands at Work<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">
            Hearts at Rest
          </em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Arrival.</strong> Come as you are. No experience required. You will be greeted, oriented, and folded into the day.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Hands-on care.</strong> Tending to the land, beautifying shared areas, preparing for upcoming gatherings, light organizing · simple, intentional acts in service of the sanctuary.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Shared meal.</strong> Food eaten in the company of people genuinely present. Conversation that reminds you that you are not alone.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Closing.</strong> A moment of acknowledgment for what was given, what was received, and what was tended together.
        </p>
      </div>
    </SanctuarySection>

    <SanctuaryCTA
      title="A Place Has Been Kept"
      description="Community Day is offered freely. Reserve your seat on Eventbrite so we know to expect you and can prepare the day around the hands that are coming."
      ctaLabel="Reserve Your Seat on Eventbrite"
      ctaHref={EVENTBRITE_COMMUNITY_DAY}
      external={true}
    />

    <div className="bg-[hsl(140,28%,4%)] border-t border-[hsla(45,70%,49%,0.1)] py-8 px-6 md:px-12">
      <p className="max-w-[760px] mx-auto text-center font-serif italic text-[13px] text-[hsl(35,30%,55%)] leading-relaxed">
        Forest Circle · Community Day is a community practice of Temple Mother Earth, a 508(c)(1)(A) sacred church. All gatherings are protected religious practice under RFRA and the First Amendment.
      </p>
    </div>

    <CeremonyExploreNav variant="light" />
  </SacredSeriesLayout>
);

export default ForestCircle;