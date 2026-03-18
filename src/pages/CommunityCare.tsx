import { Link } from "react-router-dom";
import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";

const EVENTBRITE_ORG = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

const CommunityCare = () => (
  <SanctuaryWeekLayout
    title="Community Care Model · Temple Mother Earth"
    description="Sacred reciprocity in action. Three tiers so ceremony is accessible to all who are genuinely called. No one is turned away."
    showBackLink={true}
  >
    {/* ═══════ HERO ═══════ */}
    <section className="relative py-28 md:py-36 px-6 md:px-12 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(114,36%,10%)] via-[hsl(105,30%,5%)] to-[hsl(100,20%,3%)] -z-10" />
      <div className="max-w-[800px] mx-auto">
        <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-6">
          Everything Is Energy
        </p>
        <h1 className="font-sans text-[clamp(36px,6vw,72px)] font-extralight leading-[1.05] text-[hsl(40,30%,90%)] mb-6 tracking-tight">
          Community<br />
          <em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Care Model</em>
        </h1>
        <p className="font-serif italic text-[clamp(18px,2vw,24px)] text-[hsl(35,30%,68%)] max-w-[600px] mx-auto leading-relaxed mb-4">
          This is not a pricing page. This is a philosophy of sacred reciprocity, lived out loud.
        </p>
      </div>
    </section>

    {/* ═══════ SECTION 1: THE INVISIBLE WORK ═══════ */}
    <SanctuarySection
      eyebrow="Before You Arrive"
      title={<>The Invisible<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Work</em></>}
    >
      <div className="max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p className="text-[19px] text-[hsl(35,30%,68%)] leading-[1.85]">
          Before you ever step foot in ceremony, an enormous amount of unseen labor has already taken place. The space has been cleansed, prayed over, and prepared. The medicines have been ethically sourced, tested, and consecrated. The facilitators have trained for years, sat in their own ceremonies, and done deep personal work to hold space for yours.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          There is firewood to split, altars to build, food to prepare, linens to wash, floors to sweep, and prayers to speak before the first participant arrives. There are safety protocols, medical screenings, emergency plans, and legal protections that are maintained year-round.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          None of this is visible when you arrive. But all of it is what makes the space safe enough for your spirit to open.
        </p>
        <p className="text-[16px] text-[hsl(40,30%,90%)] italic mt-8">
          What you experience as "one ceremony" is actually weeks of preparation, years of training, and lifetimes of ancestral wisdom converging in a single sacred container.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 2: SACRED RECIPROCITY ═══════ */}
    <SanctuarySection
      eyebrow="The Philosophy"
      title={<>Sacred<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Reciprocity</em></>}
    >
      <div className="max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p className="text-[19px] text-[hsl(35,30%,68%)] leading-[1.85]">
          In Indigenous traditions around the world, when you receive something sacred, you give something in return. Not because you owe it. Because the exchange itself is part of the ceremony. It completes the circle.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          When you offer energy back to the space that held you, you are honoring the lineage, the land, the facilitators, the medicines, and the unseen hands that made your experience possible. This is sacred reciprocity in its purest form.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          This is relational. This is spiritual. This is how sacred communities have sustained themselves since the beginning of human ceremony.
        </p>
        <div className="mt-10 p-8 border border-[hsla(45,70%,49%,0.15)] bg-[hsl(105,30%,5%)]">
          <p className="text-[16px] text-[hsl(40,30%,90%)] italic leading-relaxed">
            "When the circle is fed, the circle feeds you back. This is not economics. This is ecology. This is how sacred community breathes."
          </p>
        </div>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 3: GUARDIAN OF THE CIRCLE ═══════ */}
    <SanctuarySection
      eyebrow="Why This Exists"
      title={<>Guardian of<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">The Circle</em></>}
    >
      <div className="max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p className="text-[19px] text-[hsl(35,30%,68%)] leading-[1.85]">
          Temple Mother Earth does not operate like a corporation. We operate like a village. And every village needs guardians who ensure that what is sacred remains protected, accessible, and sustained.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          Your contribution does not buy you access to ceremony. It sustains the infrastructure that makes ceremony possible for everyone. When you give at the Sustainer level, you are holding the door open for someone behind you. When you receive at the Scholarship level, someone before you held that door for you.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          This is the Guardian energy. Not charity. Not sympathy. Sacred responsibility passed from one soul to the next.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 4: THREE WAYS OF BEING ═══════ */}
    <SanctuarySection
      eyebrow="The Three Tiers"
      title={<>Three Ways<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Of Being</em></>}
    >
      <p className="text-center text-[17px] text-[hsl(35,30%,68%)] font-serif max-w-[600px] mx-auto mb-12 leading-relaxed">
        These are not price tiers. These are expressions of where you are right now in your journey, and how you want to participate in the circle.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        <div className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.1)] p-10">
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,49%)] mb-2">Sustainer</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mb-5">The One Who Holds the Door</p>
          <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-6">
            You are in a position to give fully. Your contribution at this level does two things: it covers the true cost of your experience, and it directly funds someone who cannot pay at all. You are not overpaying. You are sustaining the village.
          </p>
          <p className="text-[14px] text-[hsl(40,30%,90%)] font-serif italic">
            Your abundance is someone else's access.
          </p>
        </div>
        <div className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.3)] p-10">
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,49%)] mb-2">Community</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mb-5">The One Who Shows Up Anyway</p>
          <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-6">
            You are working. You are committed. But finances are genuinely strained right now. No proof is required. No explanation is needed. You simply choose this tier and you are welcome. Your presence is your contribution.
          </p>
          <p className="text-[14px] text-[hsl(40,30%,90%)] font-serif italic">
            Your calling is enough qualification.
          </p>
        </div>
        <div className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.1)] p-10">
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,49%)] mb-2">Scholarship</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mb-5">The One Who Is Called</p>
          <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-6">
            You are in genuine hardship and you are being called to this work. A brief written reflection is all we ask. We do not verify income. We do not require proof. We trust the sincerity of your heart. This tier is funded by those at the Sustainer level and by our TOME 508(c)(1)(A) fund.
          </p>
          <p className="text-[14px] text-[hsl(40,30%,90%)] font-serif italic">
            The medicine does not check your bank account.
          </p>
        </div>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 5: HOW THE ENERGY FLOWS ═══════ */}
    <SanctuarySection
      eyebrow="Transparency"
      title={<>How the Energy<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Flows</em></>}
    >
      <div className="max-w-[720px] mx-auto font-serif space-y-6">
        <p className="text-center text-[19px] text-[hsl(35,30%,68%)] leading-[1.85]">
          Here is exactly where your offering goes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5 mt-8">
          {[
            { label: "Facilitator Care", desc: "Compensation for facilitators who have dedicated years of training and personal ceremony to hold space for your transformation." },
            { label: "Medicine Sourcing", desc: "Ethical acquisition of sacred earth medicines from trusted lineage holders, with fair trade and sustainable harvesting practices." },
            { label: "Sanctuary Upkeep", desc: "Rent, utilities, cleaning, sacred objects, altar maintenance, firewood, linens, ceremony supplies, and emergency equipment." },
            { label: "Community Fund", desc: "The surplus from Sustainer-level contributions directly funds Community and Scholarship seats so no one is turned away." },
            { label: "Integration Support", desc: "Post-ceremony circles, 1-on-1 sessions, preparation materials, and educational content for participants." },
            { label: "Legal Protection", desc: "Maintaining our 508(c)(1)(A) standing, RFRA compliance, insurance, medical protocols, and safety infrastructure." },
          ].map((item) => (
            <div key={item.label} className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.08)] p-8">
              <p className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3">{item.label}</p>
              <p className="text-[15px] text-[hsl(35,30%,68%)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[16px] text-[hsl(40,30%,90%)] italic mt-10">
          There is no profit margin. There is no surplus hoarding. Every offering circulates back into the community that generated it.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 6: SACRED PREPARATION ═══════ */}
    <SanctuarySection
      eyebrow="Before You Choose"
      title={<>Sacred<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Preparation</em></>}
    >
      <div className="max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p className="text-[19px] text-[hsl(35,30%,68%)] leading-[1.85]">
          Before choosing your tier, sit with this question:
        </p>
        <p className="text-[24px] text-[hsl(40,30%,90%)] italic leading-relaxed my-8">
          "What is the most generous expression of my current reality?"
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          If you can give more, give more. Not because we ask you to, but because your generosity is part of your ceremony. It is an act of trust, of faith, and of love for the person behind you who may not be able to give at all.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          If you cannot give more, come anyway. Do not let money be the reason you miss your calling. That is not what this space is for.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-[1.85]">
          There is no judgment in any direction. Only honesty. Only reciprocity. Only love.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 7: CLOSING CTA ═══════ */}
    <section className="py-24 md:py-32 px-6 md:px-12 text-center bg-gradient-to-t from-[hsl(105,30%,5%)] to-[hsl(100,20%,3%)]">
      <div className="max-w-[640px] mx-auto">
        <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-6">
          Your Presence Completes the Circle
        </p>
        <h2 className="font-sans text-[clamp(28px,4.5vw,56px)] font-extralight leading-[1.05] text-[hsl(40,30%,90%)] mb-6">
          The Circle Is<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Waiting for You</em>
        </h2>
        <p className="text-[19px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-6">
          You do not need to have it all figured out. You do not need to have your finances perfectly aligned. You need only to listen to the part of you that knows it is time.
        </p>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-12">
          If finances are a genuine barrier, reach out. We will find a way. No one is turned away from their own awakening.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={EVENTBRITE_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(100,20%,3%)] hover:bg-[hsl(45,70%,60%)] transition-all"
          >
            Reserve Your Place
          </a>
          <Link
            to="/contact"
            className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.08)] transition-all"
          >
            Inquire About Scholarship
          </Link>
          <Link
            to="/sanctuary-week"
            className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.08)] transition-all"
          >
            View All Ceremonies
          </Link>
        </div>

        {/* Pull Quote */}
        <div className="mt-16 p-8 border border-[hsla(45,70%,49%,0.15)] bg-[hsl(105,30%,5%)]">
          <p className="text-[18px] text-[hsl(40,30%,90%)] italic leading-relaxed font-serif">
            "The most sacred thing you can do is show up, exactly as you are, with whatever you have. The circle does the rest."
          </p>
          <p className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mt-4 opacity-70">
            Temple Mother Earth · 508(c)(1)(A) Sacred Ceremony Church
          </p>
        </div>
      </div>
    </section>
  </SanctuaryWeekLayout>
);

export default CommunityCare;
