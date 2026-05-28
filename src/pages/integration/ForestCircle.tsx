import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";
import forestVideo from "@/assets/video-hape-forest.mp4?url";

const ForestCircle = () => (
  <SacredSeriesLayout
    title="Forest Circle · A Sacred Integration Day · Temple Mother Earth"
    description="The Forest Circle is a recurring integration day at Temple Mother Earth. A gathered community day for grounding, witnessing, sharing, and returning to the body."
    path="/forest-circle"
  >
    <SanctuaryHero
      dateBadge="Recurring Integration Gathering"
      eyebrow="Forest Circle"
      title={
        <>
          A Day to Return<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">
            To the Forest Within
          </em>
        </>
      }
      subtitle=""
      lead="Forest Circle is a slow, gathered day of integration. A sanctuary to land what ceremony has stirred, to be witnessed without performance, and to remember the trees, the breath, and the company of those walking the same path."
      primaryCTA={{ label: "Inquire About the Next Circle", href: "/contact" }}
      secondaryCTA={{ label: "What to Expect \u2193", href: "#about" }}
      backgroundVideo={forestVideo}
    />

    <SanctuarySection
      id="about"
      eyebrow="What It Is"
      title={
        <>
          Not a Class.<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">
            A Sanctuary Day.
          </em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          Forest Circle is a community integration day for those who have sat in ceremony, those carrying something heavy, and those simply tired of the noise. We gather slowly. We sit on the earth. We share when we are moved to. We rest when we are not.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">There is no agenda beyond presence.</strong> No teaching to keep up with. No outcome to perform. The forest itself is the curriculum, and the circle is the container.
        </p>
        <p>
          What you carry into the circle, the circle helps you put down. What needs to be witnessed gets witnessed. What needs to be quiet stays quiet.
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
            title: "The Integrator",
            description:
              "You have sat in ceremony recently. Something opened. You need a sanctuary to land what moved through you without rushing back into ordinary life.",
          },
          {
            title: "The Quiet One",
            description:
              "You don't want to talk much. You just want to be among people who understand stillness, who don't fill the silence, who let the trees do most of the speaking.",
          },
          {
            title: "The Seeker",
            description:
              "You haven't done ceremony yet. You feel the pull. Forest Circle is a gentle first step, a way to meet the community and the land before anything more.",
          },
        ]}
      />
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I came home from the Forest Circle quieter than I had been in years. Nothing was fixed. Everything had moved."
      attribution="Forest Circle participant"
    />

    <SanctuarySection
      eyebrow="The Rhythm of the Day"
      title={
        <>
          A Day With<br />
          <em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">
            Room to Breathe
          </em>
        </>
      }
    >
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Arrival and grounding.</strong> We gather slowly. Tea is poured. The earth is greeted. There is no rush to begin because the day has already begun.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Opening circle.</strong> We sit together. Each person speaks only what is true and only as much as they wish. The circle holds it.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Quiet practice.</strong> Walking among the trees. Breath. Stillness. Whatever your body asks for in that moment.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Shared meal.</strong> Food prepared with intention, eaten in the company of people genuinely present.
        </p>
        <p>
          <strong className="text-[hsl(45,70%,49%)]">Closing circle.</strong> We close what we opened. You leave knowing you were seen.
        </p>
      </div>
    </SanctuarySection>

    <SanctuaryCTA
      title="A Place Has Been Kept"
      body="Forest Circle is offered on a sliding sacred reciprocity model so the day is reachable for those whose path requires it. Write to us to learn the next gathering date and reserve your place."
      buttonLabel="Begin the Conversation"
      buttonHref="/contact"
    />

    <div className="bg-[hsl(140,28%,4%)] border-t border-[hsla(45,70%,49%,0.1)] py-8 px-6 md:px-12">
      <p className="max-w-[760px] mx-auto text-center font-serif italic text-[13px] text-[hsl(35,30%,55%)] leading-relaxed">
        Forest Circle is an integration practice of Temple Mother Earth, a 508(c)(1)(A) sacred church. All gatherings are protected religious practice under RFRA and the First Amendment.
      </p>
    </div>

    <CeremonyExploreNav variant="light" />
  </SacredSeriesLayout>
);

export default ForestCircle;