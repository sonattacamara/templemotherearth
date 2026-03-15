import { Link } from "react-router-dom";
import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";

const EVENTBRITE_ORG = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

const CommunityCare = () => (
  <SanctuaryWeekLayout
    title="Community Care Model · Temple Mother Earth"
    description="Three tiers so ceremony is accessible to all who are genuinely called. No one is turned away for lack of funds. Everything is energy."
    showBackLink={true}
  >
    {/* HERO */}
    <section className="relative py-24 md:py-32 px-6 md:px-12 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(114,36%,10%)] via-[hsl(105,30%,5%)] to-[hsl(100,20%,3%)] -z-10" />
      <div className="max-w-[800px] mx-auto">
        <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-6">
          Everything Is Energy
        </p>
        <h1 className="font-sans text-[clamp(36px,6vw,72px)] font-extralight leading-[1.05] text-[hsl(40,30%,90%)] mb-6 tracking-tight">
          Community<br />
          <em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Care Model</em>
        </h1>
        <p className="font-serif italic text-[clamp(18px,2vw,24px)] text-[hsl(35,30%,68%)] max-w-[580px] mx-auto leading-relaxed mb-4">
          Three tiers so ceremony is accessible to all who are genuinely called. No one is turned away for lack of funds.
        </p>
        <p className="font-serif text-[16px] text-[hsl(35,20%,50%)] max-w-[520px] mx-auto leading-relaxed">
          We believe your presence is the true gift. Your awakening is the intention we hold for you.
        </p>
      </div>
    </section>

    {/* THE THREE TIERS */}
    <SanctuarySection eyebrow="The Three Tiers" title={<>Ceremony Belongs<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">To Everyone</em></>}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        <div className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.1)] p-10">
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,49%)] mb-3">Sustainer</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mb-5">Full Suggested Contribution</p>
          <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-6">
            For those who can give at this level, your full payment supports someone who cannot pay full price. You are not just attending ceremony. You are sustaining the community fund and ensuring someone else can sit beside you.
          </p>
          <p className="text-[14px] text-[hsl(40,30%,90%)] font-serif italic">
            This is the foundation of the community.
          </p>
        </div>
        <div className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.3)] p-10">
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,49%)] mb-3">Community</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mb-5">Reduced Contribution</p>
          <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-6">
            For those who are working but genuinely financially strained. No explanation required. No proof required. You belong here. This tier exists because we know that financial strain does not diminish the soul's calling.
          </p>
          <p className="text-[14px] text-[hsl(40,30%,90%)] font-serif italic">
            You belong.
          </p>
        </div>
        <div className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.1)] p-10">
          <p className="font-sans text-2xl font-extralight text-[hsl(45,70%,49%)] mb-3">Scholarship</p>
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mb-5">For Genuine Hardship</p>
          <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-6">
            Funded by our TOME 501(c)(3) scholarship fund and sustained by those paying at the Sustainer tier. A brief reflection is all that is required. We never ask you to prove your need. Trust is the foundation.
          </p>
          <p className="text-[14px] text-[hsl(40,30%,90%)] font-serif italic">
            We never ask you to prove your need.
          </p>
        </div>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* CEREMONY PRICING */}
    <SanctuarySection eyebrow="Ceremony Pricing" title={<>Sacred Offerings<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">By Ceremony</em></>}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[hsla(45,70%,49%,0.2)]">
              <th className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] py-4 pr-6">Ceremony</th>
              <th className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] py-4 px-4 text-center">Sustainer</th>
              <th className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] py-4 px-4 text-center">Community</th>
              <th className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] py-4 pl-4 text-center">Scholarship</th>
            </tr>
          </thead>
          <tbody className="font-serif text-[15px]">
            {[
              { name: "Cacao Community Ceremony", sustainer: "$44", community: "$33", scholarship: "Available" },
              { name: "Hapé Community Ceremony", sustainer: "$44", community: "$33", scholarship: "Available" },
              { name: "Sacred Tea Ceremony", sustainer: "$111", community: "$66 / $33", scholarship: "Available" },
              { name: "Level 5 — Complete Initiation", sustainer: "$777", community: "$555", scholarship: "Available" },
              { name: "Inner Alchemy Spa Day", sustainer: "$111", community: "$88", scholarship: "Free tier" },
              { name: "Community Potluck", sustainer: "Free", community: "Free", scholarship: "Free" },
              { name: "Sacred Yin Yoga", sustainer: "$33", community: "$22", scholarship: "—" },
              { name: "Sacred Art Expo", sustainer: "$22", community: "$11", scholarship: "Free / Members" },
              { name: "Kambo Ceremony", sustainer: "$222", community: "$155", scholarship: "Available" },
            ].map((row) => (
              <tr key={row.name} className="border-b border-[hsla(45,70%,49%,0.07)]">
                <td className="py-4 pr-6 text-[hsl(40,30%,90%)]">{row.name}</td>
                <td className="py-4 px-4 text-center text-[hsl(35,30%,68%)]">{row.sustainer}</td>
                <td className="py-4 px-4 text-center text-[hsl(35,30%,68%)]">{row.community}</td>
                <td className="py-4 pl-4 text-center text-[hsl(35,30%,68%)]">{row.scholarship}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* PACKAGE PRICING */}
    <SanctuarySection eyebrow="Extended Pathways" title={<>Sacred Pathways<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Of Participation</em></>}>
      <p className="text-center text-[19px] text-[hsl(35,30%,68%)] leading-relaxed font-serif max-w-[640px] mx-auto mb-12">
        We offer these pathways as invitations. Please reach out if you require flexible support for your journey.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0.5">
        {[
          { title: "Spring Equinox", subtitle: "10 Days · All 10 Ceremonies", price: "$2,222", desc: "The complete Sanctuary Week experience. One sacred arc, held from beginning to end." },
          { title: "Monthly Intensive", subtitle: "7 Days of Deepening", price: "$1,555", desc: "A focused immersion for those who wish to go deep within a single week." },
          { title: "Weekend Immersion", subtitle: "3 Days of Presence", price: "$1,332", desc: "A powerful weekend container for those new to the work or returning." },
          { title: "Day Experience", subtitle: "A Gentle Offering", price: "$444", desc: "Pay-as-you-go, $444 per day. Step in when you feel called." },
        ].map((path) => (
          <div key={path.title} className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.1)] p-8">
            <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-2">{path.title}</p>
            <p className="font-sans text-3xl font-extralight text-[hsl(40,30%,90%)] mb-2">{path.price}</p>
            <p className="font-sans text-[10px] tracking-[1px] text-[hsl(35,20%,42%)] mb-4">{path.subtitle}</p>
            <p className="text-[14px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{path.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-center font-sans text-[9px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mt-8">
        Community Care Model applies to all pathways · Scholarship available for genuine hardship
      </p>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* HOW IT WORKS */}
    <SanctuarySection eyebrow="How It Works" title={<>The Energy<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Flows Both Ways</em></>}>
      <div className="text-xl leading-[1.85] text-[hsl(35,30%,68%)] max-w-[720px] mx-auto text-center font-serif space-y-6">
        <p>When a Sustainer pays at the full level, a portion of that offering goes directly into the community fund. That fund supports the Community and Scholarship tiers for those who are called but constrained.</p>
        <p>There is no application committee. There is no means testing. If you say you need the reduced rate, we believe you. If you say you are in genuine hardship, we trust you. This model works because the community holds it together. Your presence is the primary value.</p>
        <p>Temple Mother Earth is a 508(c)(1)(A) sacred church. Our scholarship program is funded through our TOME 501(c)(3) nonprofit arm. Every dollar given at the Sustainer level directly funds someone else's seat in ceremony.</p>
      </div>
    </SanctuarySection>

    <hr className="border-t border-[hsla(45,70%,49%,0.1)] mx-6 md:mx-12" />

    {/* FULL PACKAGE DETAILS */}
    <SanctuarySection eyebrow="The Full Initiation" title={<>$2,222 Package<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">What Is Included</em></>}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        {[
          { title: "All 10 Ceremonies", desc: "Full access to every sacred gathering across both weeks. From the gentlest Cacao circle to the final Kambo purification on March 29." },
          { title: "1:1 Preparation Call", desc: "A personal conversation with Sonatta or James before March 18 to orient your intentions and prepare your spirit." },
          { title: "Sacred Welcome Kit", desc: "Ceremonial guide, sacred journal, curated tea blend, sacred object, preparation instructions, retreat map, welcome letter, comfort items, and integration practices." },
          { title: "Integration Session", desc: "A 1:1 integration session with your facilitator within 14 days of completion. What opened. What is integrating. How to carry this forward." },
          { title: "Limited to 8", desc: "The full package is limited to 8 participants to ensure intimate, deeply held space for every soul in the container." },
          { title: "Community Care Applies", desc: "The Community Care Model applies to the full package. Community rate and scholarship available for those genuinely called." },
        ].map((item) => (
          <div key={item.title} className="bg-[hsl(105,30%,5%)] border border-[hsla(45,70%,49%,0.1)] p-8">
            <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3">{item.title}</h3>
            <p className="text-[15px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{item.desc}</p>
          </div>
        ))}
      </div>
    </SanctuarySection>

    {/* CTA */}
    <section className="py-20 md:py-28 px-6 md:px-12 text-center bg-gradient-to-t from-[hsl(105,30%,5%)] to-[hsl(100,20%,3%)]">
      <div className="max-w-[640px] mx-auto">
        <p className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-6">Your Presence Is the Gift</p>
        <h2 className="font-sans text-[clamp(28px,4.5vw,56px)] font-extralight leading-[1.05] text-[hsl(40,30%,90%)] mb-6">
          Step Into<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Your Sacred Space</em>
        </h2>
        <p className="text-[19px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-12">
          Stepping into this transformation is a sacred commitment to your own growth. If finances are a point of hesitation, please reach out. We are here to ensure this path remains open to you.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={EVENTBRITE_ORG} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(100,20%,3%)] hover:bg-[hsl(45,70%,60%)] transition-all">
            Reserve Your Place
          </a>
          <Link to="/contact" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.08)] transition-all">
            Inquire About Community Care
          </Link>
          <Link to="/sanctuary-week" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.08)] transition-all">
            View All Ceremonies
          </Link>
        </div>
      </div>
    </section>
  </SanctuaryWeekLayout>
);

export default CommunityCare;
