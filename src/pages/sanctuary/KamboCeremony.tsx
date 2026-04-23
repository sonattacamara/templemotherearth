import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const EVENTBRITE_KAMBO = "https://www.eventbrite.com/e/kambo-sacred-ceremony-registration-822085920117";

const avatars = [
  { num: "One", title: "The One Who Has Tried Everything", desc: "Talk sessions. Retreats. Plant sacrament. The gym. The diet. The meditation practice. Something is still there, a weight in the body that doesn't shift no matter what the mind understands." },
  { num: "Two", title: "The One Who Knows They're Being Called", desc: "No explanation. No logic. Just a knowing, Kambo, and now. If you've been circling this ceremony for months or years, that is not curiosity. That is preparation." },
  { num: "Three", title: "The One Ready to Reset", desc: "A chapter is ending. Something needs to be released before what comes next can begin. Kambo is the great reset, not of who you are, but of what you've been carrying." },
];

const panels = [
  {
    title: "What Kambo Is",
    content: (
      <div className="space-y-4 text-[17px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">
        <p>Kambo is the secretion of the Phyllomedusa bicolor, the Giant Monkey Frog of the Amazon. The frog is not harmed. The secretion is collected from the skin, dried, and stored.</p>
        <p>The secretion contains a complex sequence of bioactive peptides. The effect is immediate and physical, an intense purge of the body that typically lasts 20-40 minutes.</p>
        <p>In the Matses tradition, this sacrament is called "the hunting sacrament." At Temple Mother Earth, it is held as a sacrament of purification within our 508(c)(1)(A) sacred church.</p>
      </div>
    ),
  },
  {
    title: "The Ceremony Structure",
    content: (
      <div className="space-y-0">
        {[
          { time: "Opening", title: "Sacred Circle & Intention", desc: "The group gathers. Your facilitator holds the container. Each participant sets and states their intention." },
          { time: "Sacrament", title: "Kambo Administration", desc: "Small points are made on the skin. The sacrament is applied. The effect begins within minutes." },
          { time: "The Purge", title: "Release", desc: "The body releases. This is the ceremony. You will not be alone. Duration: 20-40 minutes typically." },
          { time: "After", title: "Rest & Integration", desc: "The storm passes. A stillness arrives. You rest. Fruit and water are offered." },
        ].map((item) => (
          <div key={item.time} className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-4 md:gap-8 py-5 border-b border-[hsla(255,255,255,0.05)]">
            <span className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(110,40%,46%)] pt-1">{item.time}</span>
            <div>
              <h4 className="font-sans text-[12px] font-light text-[hsl(40,30%,90%)] mb-2">{item.title}</h4>
              <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "Who Cannot Participate (Contraindications)",
    content: (
      <div>
        <p className="text-[hsla(0,70%,85%,0.8)] mb-5 text-[15px] font-serif">Please review carefully. Your honest disclosure on the intake form protects you.</p>
        <ul className="space-y-0">
          {["Heart conditions, cardiovascular disease, or high blood pressure", "Current use of SSRIs, MAOIs, or immunosuppressants", "Blood pressure medications (consult your physician)", "History of seizures, stroke, or epilepsy", "Pregnancy or breastfeeding", "Active psychosis or severe untreated mental illness", "Liver or kidney disease", "Eating disorders involving purging"].map((item) => (
            <li key={item} className="py-2.5 border-b border-[hsla(255,255,255,0.06)] text-[16px] text-[hsl(35,30%,68%)] flex gap-3.5 items-start font-serif">
              <span className="text-[hsl(110,40%,46%)] shrink-0 mt-0.5">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    title: "How to Prepare",
    content: (
      <ul className="space-y-0">
        {["Fast 8 hours minimum, water only until ceremony", "Disclose ALL medications on your intake form, no exceptions", "Arrive hydrated (the day before), no excess water morning of", "Wear comfortable clothing you don't mind getting on the floor", "Tell someone trusted where you are going and who to contact", "Set your intention the night before, write it down, don't share it yet", "Do not schedule anything demanding for the 24 hours after ceremony"].map((item) => (
          <li key={item} className="py-2.5 border-b border-[hsla(255,255,255,0.06)] text-[16px] text-[hsl(35,30%,68%)] flex gap-3.5 items-start font-serif">
            <span className="text-[hsl(110,40%,46%)] shrink-0 mt-0.5">—</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Integration — The 7 Days After",
    content: (
      <div>
        <p className="text-[17px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-5">What happens in the week after Kambo matters as much as the ceremony itself.</p>
        <ul className="space-y-0">
          {["Rest for 24 hours minimum, cancel what you can", "Eat lightly, warm broth, fruit, simple nourishing foods", "Journal before talking to others about your experience", "Expect vivid dreams for 3-7 days, they are part of the process", "No major decisions for 72 hours", "Contact your facilitator if anything feels unresolved", "Integration support is available, you are held after as well as during"].map((item) => (
            <li key={item} className="py-2.5 border-b border-[hsla(255,255,255,0.06)] text-[16px] text-[hsl(35,30%,68%)] flex gap-3.5 items-start font-serif">
              <span className="text-[hsl(110,40%,46%)] shrink-0 mt-0.5">—</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

const AccordionPanel = ({ title, content }: { title: string; content: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[hsla(45,70%,49%,0.12)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-7 gap-5 text-left"
      >
        <span className="font-sans text-[13px] font-light text-[hsl(40,30%,90%)] tracking-wide">{title}</span>
        <span className="font-sans text-lg text-[hsl(45,70%,49%)] shrink-0 transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {isOpen && <div className="pb-8">{content}</div>}
    </div>
  );
};

const KamboCeremony = () => {
  const heroRef = useRef(null);

  return (
    <SanctuaryWeekLayout
      title="Kambo Ceremony — The Great Purifier | Temple Mother Earth"
      description="Kambo sacred purification ceremony at Temple Mother Earth, Washington DC. 508(c)(1)(A) sacred church. By application only."
    >
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 md:px-12 py-16 md:py-20 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/975354/pexels-photo-975354.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Dense Amazon rainforest for Kambo, Ayahuasca, and Bobinsana sacred Earth Medicine ceremonies"
          className="absolute inset-0 w-full h-full object-cover saturate-[0.35] brightness-[0.4] -z-10"
          style={{ filter: "saturate(0.35) brightness(0.4) hue-rotate(-20deg)" }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsla(150,25%,3%,1)] via-[hsla(150,25%,3%,0.75)] to-[hsla(150,25%,3%,0.2)] -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,hsla(150,25%,3%,0.8)_100%)] -z-10" />

        <motion.div
          className="relative z-10 max-w-[820px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-3 mb-7">
            <span className="font-sans text-[7px] tracking-[3px] uppercase bg-[hsl(110,40%,46%)] text-[hsl(150,25%,3%)] px-4 py-1.5">Animal Kingdom</span>
            <span className="font-serif italic text-[15px] text-[hsl(35,30%,68%)]">Phyllomedusa bicolor · The Giant Monkey Frog</span>
          </div>
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(110,40%,46%)] mb-3.5 opacity-90">Sacred Purification Ceremony · Washington, DC</p>
          <h1 className="font-sans text-[clamp(44px,8vw,96px)] font-extralight leading-[0.95] tracking-tight text-[hsl(40,30%,90%)] mb-4">
            The Great<br />
            <em className="block font-serif italic text-[hsl(110,40%,46%)] text-[0.55em] font-normal tracking-[2px] mt-2">Purifier</em>
          </h1>
          <p className="font-serif italic text-[clamp(17px,2vw,22px)] text-[hsl(35,30%,68%)] max-w-[540px] leading-relaxed mb-12">
            Some things cannot be talked through. Some things cannot be processed, journaled, or meditated away. Some things live in the body, and only the body can release them.
          </p>
          <div className="flex gap-4 flex-wrap items-center">
            <a href={EVENTBRITE_KAMBO} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(150,25%,3%)] hover:bg-[hsl(45,70%,60%)] transition-all">
              Apply for Your Place
            </a>
            <a href="#what-is-kambo" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-transparent border border-[hsla(45,70%,49%,0.35)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.08)] transition-all">
              What Is Kambo
            </a>
          </div>
          <p className="font-sans text-[7px] tracking-[3px] uppercase text-[hsl(35,20%,42%)] mt-12 opacity-60">By application only · Health screening required</p>
        </motion.div>
      </section>

      {/* Warning Bar */}
      <div className="bg-[hsla(0,50%,25%,0.15)] border-y border-[hsla(0,50%,25%,0.4)] py-4 px-6 md:px-12 text-center">
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsla(0,70%,85%,0.8)]">
          Kambo is a powerful purification sacrament · Application required · Full health screening mandatory · Not suitable for all participants
        </p>
      </div>

      {/* Soul Truth */}
      <SanctuarySection eyebrow="The Soul Truth">
        <div className="bg-[hsl(140,28%,4%)] border-l-[3px] border-[hsl(110,40%,46%)] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_0%_50%,hsla(120,28%,22%,0.12),transparent_70%)]" />
          <p className="font-serif italic text-[clamp(20px,2.5vw,28px)] text-[hsl(40,30%,90%)] leading-relaxed relative z-10">
            Kambo does not ask you what you are ready for. It asks you what you have been carrying that was never yours to carry. The purge is not the ceremony, it is the release. What remains after is not a new you. It is an unobstructed you.
          </p>
          <p className="font-sans text-[8px] tracking-[3px] uppercase text-[hsl(110,40%,46%)] mt-5 opacity-70 relative z-10">Temple Mother Earth · 508(c)(1)(A) Sacred Church</p>
        </div>
      </SanctuarySection>

      {/* Who This Is For */}
      <SanctuarySection id="what-is-kambo" eyebrow="Who Comes to Kambo" title={<>The Frog Knows<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">Exactly Who to Call</em></>}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-12">
          {avatars.map((a) => (
            <div key={a.num} className="bg-[hsl(140,28%,4%)] border border-[hsla(120,28%,22%,0.2)] p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(110,40%,46%)] to-transparent" />
              <p className="font-sans text-[9px] tracking-[3px] uppercase text-[hsl(110,40%,46%)] mb-4 opacity-70">{a.num}</p>
              <h3 className="font-sans text-[13px] font-light text-[hsl(40,30%,90%)] mb-3 leading-tight">{a.title}</h3>
              <p className="text-[16px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{a.desc}</p>
            </div>
          ))}
        </div>
      </SanctuarySection>

      {/* Accordion */}
      <SanctuarySection eyebrow="Everything You Need to Know" title={<>The Ceremony,<br /><em className="font-serif italic text-[hsl(45,70%,49%)] text-[1.1em]">In Full</em></>}>
        <div className="mt-12">
          {panels.map((panel) => (
            <AccordionPanel key={panel.title} title={panel.title} content={panel.content} />
          ))}
        </div>
      </SanctuarySection>

      {/* Sacred Intention */}
      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="bg-gradient-to-br from-[hsl(140,28%,6%)] to-[hsl(100,20%,3%)] border border-[hsla(45,70%,49%,0.15)] p-12 md:p-16 text-center">
            <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-5 opacity-80">The Sacred Intention</p>
            <p className="font-serif italic text-[clamp(20px,2.5vw,30px)] text-[hsl(40,30%,90%)] leading-relaxed">
              I come to the frog with willingness.<br />
              I release what has been protecting me from my own clarity.<br />
              I am ready to be lighter.
            </p>
          </div>
        </div>
      </section>

      {/* Community Care */}
      <div className="bg-[hsl(140,28%,4%)] border-y border-[hsla(45,70%,49%,0.1)] py-16 px-6 md:px-12">
        <div className="max-w-[760px] mx-auto text-center">
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(110,40%,46%)] mb-4">Our Financial Model</p>
          <h2 className="font-sans text-[clamp(24px,3.5vw,44px)] font-extralight text-[hsl(40,30%,90%)] mb-3">Community Care Model</h2>
          <p className="font-sans text-[9px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-5">Everything is energy.</p>
          <p className="text-[18px] text-[hsl(35,30%,68%)] leading-relaxed font-serif mb-10">
            Ceremony is not a luxury. Three tiers so those who are genuinely called can come regardless of financial circumstance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            {[
              { title: "Sustainer", desc: "Full contribution. For those who can, you also support someone who cannot." },
              { title: "Community", desc: "Reduced contribution. For those working and committed but genuinely strained.", featured: true },
              { title: "Scholarship", desc: "Funded through TOME 508(c)(1)(A). A brief reflection is all that's required. Ask us." },
            ].map((tier) => (
              <div key={tier.title} className={`p-8 bg-[hsl(140,28%,6%)] border ${tier.featured ? "border-[hsla(45,70%,49%,0.3)]" : "border-[hsla(45,70%,49%,0.08)]"}`}>
                <h3 className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-3">{tier.title}</h3>
                <p className="text-[15px] text-[hsl(35,30%,68%)] leading-relaxed font-serif">{tier.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply CTA */}
      <section className="text-center py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,hsla(120,28%,22%,0.12),transparent_70%)]" />
        <div className="relative z-10">
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(110,40%,46%)] mb-5 opacity-80">By Application Only</p>
          <h2 className="font-sans text-[clamp(28px,5vw,64px)] font-extralight leading-[1.05] text-[hsl(40,30%,90%)] mb-4">
            The Frog Is<br /><em className="font-serif italic text-[hsl(45,70%,49%)]">Ready When You Are</em>
          </h2>
          <p className="font-serif italic text-[19px] text-[hsl(35,30%,68%)] max-w-[500px] mx-auto mb-12 leading-relaxed">
            Not everyone is called to Kambo. If you've read this far and something in you is still saying yes, that is not coincidence.
          </p>
          <a href={EVENTBRITE_KAMBO} target="_blank" rel="noopener noreferrer" className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(150,25%,3%)] hover:bg-[hsl(45,70%,60%)] transition-all">
            Apply for Your Place
          </a>
          <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(35,20%,42%)] mt-5">
            Application → Health Screening → Confirmation · All conducted before ceremony day
          </p>
        </div>
      </section>

      {/* RFRA Statement */}
      <div className="bg-[hsl(140,28%,4%)] border-t border-[hsla(45,70%,49%,0.1)] py-8 px-6 md:px-12">
        <div className="max-w-[760px] mx-auto mb-6 p-6 border border-[hsla(45,70%,49%,0.2)] rounded-lg bg-[hsla(45,70%,49%,0.04)] text-center">
          <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-2">Sacred Access</p>
          <p className="font-serif italic text-[15px] text-[hsl(35,30%,82%)] leading-relaxed">
            We believe healing is a birthright, not a privilege. Sliding scale and scholarship offerings are available for those called to ceremony. Write to <a href="mailto:askus@templemotherearth.org" className="text-[hsl(45,70%,49%)] underline">askus@templemotherearth.org</a> to begin the conversation.
          </p>
        </div>
        <p className="max-w-[760px] mx-auto text-center font-serif italic text-[13px] text-[hsl(35,30%,55%)] leading-relaxed">
          This sacred ceremony is a protected religious practice of Temple Mother Earth under RFRA and the First Amendment.
        </p>
      </div>

      <CeremonyExploreNav variant="dark" />
    </SanctuaryWeekLayout>
  );
};

export default KamboCeremony;
