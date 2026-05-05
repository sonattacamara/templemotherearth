import { Link } from "react-router-dom";
import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import { Sparkles, Heart, Users, Shield, Star, Flame, Leaf, Sun } from "lucide-react";

const EVENTBRITE_ORG = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

/* ─── Shared readable text classes (high contrast on dark green bg) ─── */
const BODY = "text-[18px] md:text-[19px] text-[hsl(40,30%,90%)] leading-[1.85] font-serif";
const BODY_SOFT = "text-[17px] md:text-[18px] text-[hsl(40,25%,82%)] leading-[1.85] font-serif";
const PULL = "text-[20px] md:text-[22px] text-[hsl(45,70%,72%)] italic font-serif leading-[1.7]";

const CommunityCare = () => (
  <SanctuaryWeekLayout
    title="Sacred Reciprocity · A Philosophy of Energy · Temple Mother Earth"
    description="Everything is energy. Time, money, prayer, presence. Discover how sacred reciprocity holds the temple — and how you are invited to participate."
    showBackLink={true}
  >
    {/* ═══════ HERO ═══════ */}
    <section className="relative py-28 md:py-36 px-6 md:px-12 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(114,36%,10%)] via-[hsl(110,28%,12%)] to-[hsl(114,36%,10%)] -z-10" />
      <div className="max-w-[860px] mx-auto">
        <p className="font-sans text-[10px] tracking-[4px] uppercase text-[hsl(45,70%,60%)] mb-6">
          Everything Is Energy
        </p>
        <h1 className="font-sans text-[clamp(36px,6vw,72px)] font-extralight leading-[1.05] text-[hsl(40,30%,95%)] mb-6 tracking-tight">
          Sacred<br />
          <em className="font-serif italic text-[hsl(45,70%,62%)] text-[1.1em]">Reciprocity</em>
        </h1>
        <p className="font-serif italic text-[clamp(19px,2vw,24px)] text-[hsl(40,30%,88%)] max-w-[640px] mx-auto leading-relaxed mb-6">
          This is not a pricing page. This is a philosophy of energy — yours, ours, and the unseen current that flows between us.
        </p>
        <p className="text-[16px] text-[hsl(40,25%,80%)] max-w-[600px] mx-auto leading-relaxed font-serif">
          Time is energy. Money is energy. Prayer is energy. Presence is energy. The temple is held by the careful, sacred circulation of all of it.
        </p>
      </div>
    </section>

    {/* ═══════ SECTION 1: THE INVISIBLE WORK ═══════ */}
    <SanctuarySection
      eyebrow="Before You Arrive"
      title={<>The Energy You<br /><em className="font-serif italic text-[hsl(45,70%,62%)] text-[1.1em]">Cannot See</em></>}
    >
      <div className="max-w-[760px] mx-auto text-center space-y-6">
        <p className={BODY}>
          When you arrive, the doors open. The candles are lit. The space feels held. What you may not feel — what you cannot see — is the river of energy that flowed for weeks before you walked in.
        </p>
        <p className={BODY_SOFT}>
          The Sanctuary buildings and grounds were tended. The altars were rebuilt. The sacred earth offerings were prayed over by lineage holders before they ever reached our hands. Facilitators sat in their own ceremonies, completed their own integration work, and dedicated years to becoming a vessel safe enough to hold yours.
        </p>
        <p className={BODY_SOFT}>
          Firewood was split. Linens were washed. Food was prepared with intention. Safety protocols, medical screenings, and sacred protections were renewed. Prayers were spoken into every corner of the room — long before your name was on the list.
        </p>
        <p className={`${PULL} mt-8`}>
          What you experience as "one ceremony" is months of energy converging in a single sacred container. Your offering honors the unseen current that made your seat possible.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.15)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 2: SACRED RECIPROCITY ═══════ */}
    <SanctuarySection
      eyebrow="The Philosophy"
      title={<>Everything<br /><em className="font-serif italic text-[hsl(45,70%,62%)] text-[1.1em]">Is Energy</em></>}
    >
      <div className="max-w-[760px] mx-auto text-center space-y-6">
        <p className={BODY}>
          In every Indigenous tradition we have studied, the principle is the same: when you receive something sacred, you give something back. Not as payment. As participation. The exchange itself is part of the medicine.
        </p>
        <p className={BODY_SOFT}>
          Your time is energy. Your money is energy. Your prayers are energy. Your presence in the circle is energy. When any of these flow toward the temple, they ripple back out to the next seeker who needs what you needed.
        </p>
        <p className={BODY_SOFT}>
          This is not transactional. This is ceremonial. The same way a river only stays alive because water keeps moving — sacred community only stays alive because energy keeps moving through it.
        </p>
        <div className="mt-10 p-8 md:p-10 border border-[hsla(45,70%,49%,0.3)] rounded-2xl bg-[hsla(45,70%,49%,0.06)]">
          <p className="text-[20px] text-[hsl(45,70%,72%)] italic leading-relaxed font-serif">
            "When the circle is fed, the circle feeds you back. This is not economics. This is ecology. This is how sacred community breathes."
          </p>
        </div>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.15)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 3: GUARDIAN OF THE CIRCLE ═══════ */}
    <SanctuarySection
      eyebrow="Where You Stand In The Circle"
      title={<>Guardian of<br /><em className="font-serif italic text-[hsl(45,70%,62%)] text-[1.1em]">The Circle</em></>}
    >
      <div className="max-w-[760px] mx-auto text-center space-y-6">
        <p className={BODY}>
          Temple Mother Earth is not a business. We are a village. And every village needs guardians — people whose energy keeps the fire lit, the doors open, and the table set.
        </p>
        <p className={BODY_SOFT}>
          Your offering does not buy you a seat. It sustains the energy that made your seat possible. When you give as a Sustainer, you are holding the door open for the seeker who comes behind you. When you receive a scholarship, someone before you held that door open for you.
        </p>
        <p className={BODY_SOFT}>
          This is the Guardian energy. Not charity. Not sympathy. Sacred responsibility, passed from one soul to the next, like a torch around the fire circle.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.15)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 4: FOUR WAYS OF BEING ═══════ */}
    <SanctuarySection
      eyebrow="Four Ways To Participate"
      title={<>Choose How<br /><em className="font-serif italic text-[hsl(45,70%,62%)] text-[1.1em]">Your Energy Flows</em></>}
    >
      <p className="text-center text-[18px] text-[hsl(40,30%,88%)] font-serif max-w-[640px] mx-auto mb-4 leading-relaxed">
        These are not price tiers. They are four ways your energy is invited to flow into the circle. Take a breath. Feel where you are right now. Then choose with honesty.
      </p>
      <p className="text-center text-[15px] text-[hsl(45,60%,65%)] font-serif italic max-w-[600px] mx-auto mb-12">
        Example shown using our Cacao Ceremony, so you can feel the rhythm.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Supporter */}
        <div className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.2)] rounded-2xl p-8 flex flex-col">
          <Sun className="h-6 w-6 text-[hsl(45,70%,60%)] mb-4" />
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,68%)] mb-2">Supporter</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(40,25%,75%)] mb-2">The One Who Holds The Whole Village</p>
          <p className="text-[12px] text-[hsl(45,60%,60%)] mb-5 italic font-serif">e.g. Cacao at $55</p>
          <p className="text-[15px] text-[hsl(40,30%,88%)] leading-relaxed font-serif mb-6 flex-1">
            You give beyond your own seat. Your energy directly funds a scholarship for someone who cannot give right now. You are the one who keeps the lights on for the whole circle.
          </p>
          <p className="text-[14px] text-[hsl(45,70%,72%)] font-serif italic">
            Your overflow is someone else's doorway.
          </p>
        </div>

        {/* Sustainer */}
        <div className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.4)] rounded-2xl p-8 flex flex-col relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] font-sans text-[8px] tracking-[2px] uppercase px-3 py-1">Sacred Anchor</span>
          <Shield className="h-6 w-6 text-[hsl(45,70%,60%)] mb-4" />
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,68%)] mb-2">Sustainer</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(40,25%,75%)] mb-2">The True Cost Of The Ceremony</p>
          <p className="text-[12px] text-[hsl(45,60%,60%)] mb-5 italic font-serif">e.g. Cacao at $44</p>
          <p className="text-[15px] text-[hsl(40,30%,88%)] leading-relaxed font-serif mb-6 flex-1">
            This is the actual energy required to hold one seat — the buildings and grounds, the facilitators, the sacred earth offerings, the integration support. When you give here, you cover yourself fully and honor the sacred infrastructure.
          </p>
          <p className="text-[14px] text-[hsl(45,70%,72%)] font-serif italic">
            Sustaining the temple. Honoring the work.
          </p>
        </div>

        {/* Community */}
        <div className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.2)] rounded-2xl p-8 flex flex-col">
          <Users className="h-6 w-6 text-[hsl(45,70%,60%)] mb-4" />
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,68%)] mb-2">Community</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(40,25%,75%)] mb-2">The One Who Shows Up Anyway</p>
          <p className="text-[12px] text-[hsl(45,60%,60%)] mb-5 italic font-serif">e.g. Cacao at $33</p>
          <p className="text-[15px] text-[hsl(40,30%,88%)] leading-relaxed font-serif mb-6 flex-1">
            You are working. You are committed. But finances are genuinely tight right now. No proof is required. No explanation needed. Choose this tier with dignity. Your presence is part of your offering.
          </p>
          <p className="text-[14px] text-[hsl(45,70%,72%)] font-serif italic">
            Your calling is enough qualification.
          </p>
        </div>

        {/* Scholarship */}
        <div className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.2)] rounded-2xl p-8 flex flex-col">
          <Heart className="h-6 w-6 text-[hsl(45,70%,60%)] mb-4" />
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,68%)] mb-2">Scholarship</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(40,25%,75%)] mb-2">Energy Exchange · Two Per Ceremony</p>
          <p className="text-[12px] text-[hsl(45,60%,60%)] mb-5 italic font-serif">No financial offering required</p>
          <p className="text-[15px] text-[hsl(40,30%,88%)] leading-relaxed font-serif mb-6 flex-1">
            Two scholarship seats are held in every ceremony. You contribute your energy in exchange — setting up the sanctuary, washing linens, helping with food, holding the door for the next seeker. The exchange honors the circle.
          </p>
          <p className="text-[14px] text-[hsl(45,70%,72%)] font-serif italic">
            The medicine does not check your bank account.
          </p>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link
          to="/contact"
          className="inline-block font-sans text-[10px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] hover:bg-[hsl(45,70%,58%)] transition-all"
        >
          Apply For A Scholarship Seat
        </Link>
        <p className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(40,25%,72%)] mt-4">
          Brief written reflection · No income verification · Trust-based
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.15)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 4B: ENERGY EXCHANGE — TELLING THE STORY ═══════ */}
    <SanctuarySection
      eyebrow="The Story Of The Scholarship Seat"
      title={<>Energy For<br /><em className="font-serif italic text-[hsl(45,70%,62%)] text-[1.1em]">Energy</em></>}
    >
      <div className="max-w-[760px] mx-auto space-y-6 text-center">
        <p className={BODY}>
          Imagine a seeker who feels the call. Their heart is open. Their intention is sincere. But this season, money is not flowing for them. In another temple, the door would close. In ours, the door opens differently.
        </p>
        <p className={BODY_SOFT}>
          We hold two scholarship seats in every ceremony. They are not free — they are paid in a different currency. The seeker offers their hands, their time, their presence in service of the circle. They might arrive early to set up the sanctuary. Stay late to break it down. Wash the ceremonial linens. Help prepare nourishment. Greet the next seeker at the door.
        </p>
        <p className={BODY_SOFT}>
          By the end, they have not received charity. They have participated in the sacred infrastructure that holds everyone else. They leave knowing they belong, because they helped build the circle that held them.
        </p>
        <p className={`${PULL} mt-10`}>
          This is how the village has always worked. No one hungry. No one excluded. Everyone giving what they have, in the form they have it.
        </p>
        <div className="mt-8">
          <Link
            to="/contact"
            className="inline-block font-sans text-[10px] tracking-[3px] uppercase px-8 py-3 border border-[hsla(45,70%,49%,0.5)] text-[hsl(45,70%,68%)] hover:bg-[hsla(45,70%,49%,0.1)] transition-all"
          >
            Inquire About Energy Exchange
          </Link>
        </div>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.15)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 5: HOW THE ENERGY FLOWS ═══════ */}
    <SanctuarySection
      eyebrow="Transparency"
      title={<>How The Energy<br /><em className="font-serif italic text-[hsl(45,70%,62%)] text-[1.1em]">Flows</em></>}
    >
      <div className="max-w-[760px] mx-auto space-y-6">
        <p className={`text-center ${BODY}`}>
          Your energy moves through the temple in many forms. Here is exactly where it goes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {[
            { label: "Facilitator Care", desc: "Honoring the facilitators who have given years of training, personal ceremony, and inner work to become a vessel safe enough to hold yours." },
            { label: "Sacred Earth Offerings", desc: "Ethically sourced from trusted lineage holders, with fair exchange and sustainable harvesting practices that honor the original keepers." },
            { label: "Sanctuary Buildings & Grounds", desc: "Tending the sacred space itself — the buildings that house ceremony, the grounds that hold us, utilities, altars, sacred objects, firewood, ceremonial supplies, and the quiet care that keeps the doors open." },
            { label: "The Community Fund", desc: "Energy flowing from Supporter and Sustainer offerings directly funds the scholarship seats and community-tier seats so no called soul is turned away." },
            { label: "Integration & Support", desc: "Integration circles, 1-on-1 sessions, preparation guides, and the long-arc support that holds you long after the ceremony closes." },
            { label: "Sacred Protections", desc: "Maintaining our 508(c)(1)(A) standing, RFRA protections, sacred safety protocols, and the legal infrastructure that keeps the temple sovereign and safe." },
          ].map((item) => (
            <div key={item.label} className="bg-[hsl(105,30%,12%)] border border-[hsla(45,70%,49%,0.2)] rounded-2xl p-8">
              <p className="font-sans text-[11px] tracking-[2px] uppercase text-[hsl(45,70%,62%)] mb-3">{item.label}</p>
              <p className="text-[16px] text-[hsl(40,30%,88%)] leading-relaxed font-serif">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className={`text-center ${PULL} mt-10`}>
          There is no profit margin. There is no surplus hoarding. Every offering circulates back into the village that generated it.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.15)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 6: SACRED PREPARATION ═══════ */}
    <SanctuarySection
      eyebrow="Before You Choose"
      title={<>Sit With<br /><em className="font-serif italic text-[hsl(45,70%,62%)] text-[1.1em]">This Question</em></>}
    >
      <div className="max-w-[760px] mx-auto text-center space-y-6">
        <p className={BODY}>
          Before you choose your tier, take a slow breath and ask yourself:
        </p>
        <p className="text-[26px] md:text-[30px] text-[hsl(45,70%,72%)] italic leading-relaxed my-10 font-serif">
          "What is the most generous expression of my current reality?"
        </p>
        <p className={BODY_SOFT}>
          If you can give more, give more. Not because we ask you to. Because your generosity is part of your ceremony — an act of trust, of faith, and of love for the seeker behind you who may not be able to give a dollar.
        </p>
        <p className={BODY_SOFT}>
          If you cannot give more, come anyway. Do not let money be the reason you miss your calling. That is not what this temple is for.
        </p>
        <p className={BODY_SOFT}>
          There is no judgment in any direction. Only honesty. Only reciprocity. Only love.
        </p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.15)] mx-6 md:mx-12" />

    {/* ═══════ SECTION 7: CLOSING CTA ═══════ */}
    <section className="py-24 md:py-32 px-6 md:px-12 text-center bg-gradient-to-b from-[hsl(105,30%,8%)] to-[hsl(114,36%,10%)]">
      <div className="max-w-[640px] mx-auto">
        <p className="font-sans text-[10px] tracking-[4px] uppercase text-[hsl(45,70%,62%)] mb-6">
          Your Presence Completes the Circle
        </p>
        <h2 className="font-sans text-[clamp(28px,4.5vw,56px)] font-extralight leading-[1.05] text-[hsl(40,30%,95%)] mb-6">
          The Circle Is<br /><em className="font-serif italic text-[hsl(45,70%,68%)] text-[1.1em]">Waiting For You</em>
        </h2>
        <p className="text-[19px] text-[hsl(40,30%,88%)] leading-relaxed font-serif mb-6">
          You do not need to have it all figured out. You do not need to have your finances perfectly aligned. You need only to listen to the part of you that knows it is time.
        </p>
        <p className="text-[17px] text-[hsl(40,25%,80%)] leading-relaxed font-serif mb-12">
          If finances are a genuine barrier, reach out. We will find a way. No one is turned away from their own awakening.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={EVENTBRITE_ORG}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-xl bg-[hsl(45,70%,49%)] text-[hsl(105,30%,5%)] px-10 py-4 font-sans text-[10px] tracking-[3px] uppercase font-semibold transition hover:bg-[hsl(45,70%,58%)]"
          >
            Reserve Your Place
          </a>
          <Link
            to="/contact"
            className="inline-block rounded-xl border border-[hsla(45,70%,49%,0.5)] px-10 py-4 font-sans text-[10px] tracking-[3px] uppercase font-semibold text-[hsl(45,70%,68%)] transition hover:bg-[hsla(45,70%,49%,0.1)]"
          >
            Apply For Scholarship
          </Link>
          <Link
            to="/sanctuary-week"
            className="inline-block rounded-xl border border-[hsla(45,70%,49%,0.5)] px-10 py-4 font-sans text-[10px] tracking-[3px] uppercase font-semibold text-[hsl(45,70%,68%)] transition hover:bg-[hsla(45,70%,49%,0.1)]"
          >
            View Ceremonies
          </Link>
        </div>

        {/* Pull Quote */}
        <div className="mt-16 p-8 md:p-10 border border-[hsla(45,70%,49%,0.3)] rounded-2xl bg-[hsla(45,70%,49%,0.06)]">
          <p className="text-[20px] text-[hsl(45,70%,72%)] italic leading-relaxed font-serif">
            "The most sacred thing you can do is show up, exactly as you are, with whatever you have. The circle does the rest."
          </p>
          <p className="font-sans text-[9px] tracking-[3px] uppercase text-[hsl(45,70%,60%)] mt-4 opacity-80">
            Temple Mother Earth · 508(c)(1)(A) Sacred Ceremony Church
          </p>
        </div>
      </div>
    </section>
  </SanctuaryWeekLayout>
);

export default CommunityCare;
