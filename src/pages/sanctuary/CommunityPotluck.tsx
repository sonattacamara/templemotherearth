import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuaryHero from "@/components/sanctuary/SanctuaryHero";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryColCards from "@/components/sanctuary/SanctuaryColCards";
import SanctuaryPullQuote from "@/components/sanctuary/SanctuaryPullQuote";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";

const EVENTBRITE_POTLUCK = "https://www.eventbrite.com/e/soulful-connections-a-community-potluck-for-growth-and-healing-registration-1119491141139";

const CommunityPotluck = () => (
  <SanctuaryWeekLayout
    title="Community Integration Potluck · Temple Mother Earth"
    description="Free community gathering, integration circle, and Sacred Tea House. Temple Mother Earth, Washington DC."
  >
    <SanctuaryHero
      dateBadge="Recurring · Free & Open"
      eyebrow="Community Integration Potluck"
      title={<>You Are Already<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.15em]">Part of This Family</em></>}
      subtitle=""
      lead="You don't need to have done ceremony here. You don't need to know anyone. You don't need to bring anything except something to share at the table and whoever you are right now. The door is open. The table is set. Come."
      primaryCTA={{ label: "Register Free", href: EVENTBRITE_POTLUCK, external: true }}
      secondaryCTA={{ label: "What to Expect ↓", href: "#about" }}
      backgroundImage="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
    />

    <SanctuarySection id="about" eyebrow="What This Is" title={<>Not a Networking Event.<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">A Home.</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(40,30%,90%)] max-w-[720px] font-serif space-y-6">
        <p>There is a particular kind of loneliness that comes from doing deep work alone. You have experiences that can't be explained to most people. You are looking for people who understand without explanation.</p>
        <p><strong className="text-[hsl(45,70%,49%)]">People who have sat in ceremony and are integrating. People who are curious and drawn but haven't stepped in yet. People who are just looking for a table where the conversation goes somewhere real.</strong></p>
        <p>The Sacred Tea House will be open throughout the evening. The integration circle creates space for what you are carrying. And the potluck — food made with intention, shared with people who are genuinely present — is its own form of ceremony.</p>
      </div>
    </SanctuarySection>

    <SanctuarySection eyebrow="The Evening" title={<>Three Spaces.<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">One Family.</em></>}>
      <SanctuaryColCards cards={[
        { title: "The Table", description: "Bring a dish to share. Plant-based, made with love. Food prepared with intention and shared in community has been a sacred act in every culture on earth." },
        { title: "The Integration Circle", description: "A facilitated sharing circle for those processing experiences from Sanctuary Week or from their own practice. You speak. You are witnessed." },
        { title: "The Sacred Tea House", description: "Open all evening. Ceremonial teas, plant elixirs, and the quiet that comes from drinking something sacred in the company of people you trust." },
      ]} />
    </SanctuarySection>

    <SanctuaryPullQuote
      quote="I came not knowing anyone. I left with people I will know for the rest of my life. That's not an exaggeration. This community is different. The conversations are different."
      attribution="Community member · Alexandria, VA"
    />

    <SanctuaryCTA
      eyebrow="Recurring · Free & Open to All"
      title={<>The Table<br /><em className="font-serif italic text-[hsl(35,55%,42%)] text-[1.1em]">Is Already Set For You</em></>}
      description="Register so we know you're coming. Bring something to share. Come as you are. The family is already gathering."
      ctaLabel="Register Free"
      ctaHref={EVENTBRITE_POTLUCK}
      note="Free & open to all · Registration helps us prepare the space · Bring a dish to share"
    />
  </SanctuaryWeekLayout>
);

export default CommunityPotluck;
