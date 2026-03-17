import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { usePageTracking } from "@/hooks/useAnalytics";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";

const EVENTBRITE_CACAO = "https://www.eventbrite.com/e/cacao-sacred-ceremony-registration-822085920117";

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`px-6 md:px-[60px] py-20 md:py-[120px] ${className}`}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-[1100px] mx-auto">{children}</div>
    </motion.section>
  );
};

const Eyebrow = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`font-sans text-[10px] tracking-[5px] uppercase text-[#C9963A] mb-4 ${className}`}>{children}</p>
);

const STitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-display text-[clamp(32px,4vw,54px)] font-bold leading-[1.1] mb-6 tracking-tight">{children}</h2>
);

const faqItems = [
  { q: "Is this ceremony psychedelic?", a: "No. Ceremonial cacao is non-psychedelic. It does not produce hallucinations or altered states in the psychedelic sense. The experience is one of heightened emotional sensitivity, heart-opening, and presence — all while remaining completely conscious and functional." },
  { q: "I'm on antidepressants. Can I come?", a: "If you are on SSRIs, MAOIs, or other antidepressants, please contact us before registering. Cacao can increase serotonin levels and combining it with serotonergic medications requires careful consideration." },
  { q: "I've never done any kind of ceremony before. Is this for me?", a: "Absolutely yes. The Cacao Community Ceremony is specifically designed to be the perfect entry point into sacred ceremony culture. You will be held by experienced facilitators, supported by a loving community, and guided through every step." },
  { q: "What does my contribution cover?", a: "Your contribution covers: ceremonial grade cacao (40–60g dose), full facilitation by trained ceremony leaders, sacred space preparation, sound journey, integration circle, and your place in our ongoing community." },
  { q: "How is Temple Mother Earth's cacao sourced?", a: "We source exclusively from small-scale indigenous and traditional farming communities who cultivate cacao using ancestral methods — no pesticides, no industrial processing. Our primary sourcing is ceremonial grade Guatemalan Criollo cacao." },
  { q: "Can I bring a friend?", a: "Yes — and we encourage it. Ceremony is always more powerful when shared with someone you trust. Both guests will need to register individually and complete their own health intake forms." },
  { q: "Is this a religious ceremony?", a: "Yes. Temple Mother Earth is a 508(c)(1)(A) recognized sacred church. All ceremonies are held as sincere religious and spiritual practice, protected under the Religious Freedom Restoration Act (RFRA)." },
];

const CacaoCeremony = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-[#0E0A06] text-[#F5EDD8]" style={{ fontFamily: "'EB Garamond', serif" }}>
      <SEOHead
        title="Cacao Community Ceremony · Temple Mother Earth"
        description="Open your heart with sacred ceremonial cacao. A ceremony held in sacred space at Temple Mother Earth, Washington DC."
      />
      <Navigation />

      {/* Announce Bar */}
      <div className="bg-[#2C1810] text-[#E8BF72] text-center py-2.5 px-5 font-sans text-[11px] tracking-[3px] uppercase">
        Recurring Offering · Temple Mother Earth · Washington, DC
      </div>

      {/* HERO */}
      <section className="relative min-h-screen grid place-items-center overflow-hidden bg-[#2C1810]">
        <img
          src="https://images.pexels.com/photos/6542704/pexels-photo-6542704.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Ceremonial cacao in sacred space"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.5) brightness(0.3)" }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-[rgba(44,24,16,0.7)] to-[rgba(44,24,16,0.3)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,rgba(201,150,58,0.18)_0%,transparent_55%)]" />
        <motion.div
          className="relative z-10 text-center px-10 max-w-[900px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="font-sans text-[10px] tracking-[6px] uppercase text-[#C9963A] mb-8">
            Recurring Offering · Washington DC
          </p>
          </p>
          <p className="font-serif italic text-[22px] text-[#C4B49A] mb-4">An invitation to open what has been waiting</p>
          <h1 className="font-display text-[clamp(52px,9vw,108px)] font-black text-[#F5EDD8] leading-[0.95] mb-2 tracking-tight">
            CACAO
            <span className="block italic font-normal text-[0.5em] tracking-[6px] text-[#E8BF72] mt-3">Community Ceremony</span>
          </h1>
          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#C9963A] to-transparent mx-auto my-8" />
          <p className="text-[22px] italic text-[#F5EDD8] max-w-[600px] mx-auto mb-12 leading-relaxed">
            The Aztecs called it <em>Theobroma</em> — "Food of the Gods." Tonight, you will remember why.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={EVENTBRITE_CACAO} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#C9963A] text-[#0E0A06] px-[52px] py-[18px] font-sans text-[12px] tracking-[3px] uppercase border-2 border-[#C9963A] hover:bg-transparent hover:text-[#C9963A] transition-all">
              Reserve Your Seat
            </a>
            <a href="#about" className="inline-block bg-transparent text-[#F5EDD8] px-10 py-[18px] font-sans text-[12px] tracking-[3px] uppercase border border-[rgba(245,237,216,0.25)] hover:border-[#C9963A] hover:text-[#C9963A] transition-all">
              Learn More ↓
            </a>
          </div>
        </motion.div>
      </section>

      {/* Event Strip */}
      <div className="bg-[#0E0A06] flex justify-center items-center flex-wrap border-b border-[rgba(201,150,58,0.2)]">
        {[
          { label: "Format", value: "3 Hours" },
          { label: "Location", value: "Temple Mother Earth, DC" },
          { label: "Level", value: "All Experience Levels" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 py-7 px-12 border-r border-[rgba(201,150,58,0.15)] last:border-r-0 max-md:border-r-0 max-md:border-b max-md:w-full max-md:px-6 max-md:py-4">
            <span className="font-sans text-[9px] tracking-[4px] uppercase text-[#9A7B5A]">{item.label}</span>
            <span className="font-display text-[17px] text-[#E8BF72]">{item.value}</span>
          </div>
        ))}
      </div>

      {/* MEDICINE SECTION */}
      <Section id="about" className="bg-[#0E0A06]">
        <Eyebrow>The Sacred Sacrament</Eyebrow>
        <STitle>Everything You Need to Know<br /><em className="text-[#C9963A]">About Ceremonial Cacao</em></STitle>
        <p className="text-xl leading-[1.8] text-[#C4B49A] max-w-[720px] italic mb-16">
          This isn't hot chocolate. This is one of the oldest sacred plant sacraments in human history — and you are about to experience why civilizations revered it as a gift from the gods.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <div className="space-y-5 text-[17px] leading-[1.85] text-[#C4B49A]">
            <h3 className="font-display text-[28px] italic text-[#F5EDD8] mb-5">What Is Cacao?</h3>
            <p>Theobroma cacao is a small tropical tree native to the deep forests of Central and South America. Its fruit pods contain seeds that have been harvested, fermented, and used in ceremony for over 4,000 years by the Olmec, Maya, and Aztec civilizations.</p>
            <p>Ceremonial grade cacao is entirely different from commercial chocolate. It is raw, minimally processed, and prepared at a dose (40–60g) that activates its full pharmacological and spiritual profile.</p>
            <p>At Temple Mother Earth, we source only the highest-quality ceremonial grade cacao from indigenous farming communities who grow it the traditional way.</p>
            <h3 className="font-display text-[28px] italic text-[#F5EDD8] mt-10 mb-5">How Does It Work in Your Body?</h3>
            <p>The primary compound, <strong className="text-[#C9963A]">Theobromine</strong>, is a gentle stimulant that increases blood flow to the brain and heart. Unlike caffeine, theobromine does not spike adrenaline or crash the nervous system.</p>
            <p>Cacao also contains <strong className="text-[#C9963A]">Anandamide</strong> — the "bliss molecule" — and PEA (phenylethylamine), which triggers dopamine and serotonin release, creating feelings of joy, love, and connection.</p>
          </div>

          <div className="bg-[#2C1810] p-12 relative overflow-hidden">
            <span className="absolute -top-5 right-5 text-[120px] text-[rgba(201,150,58,0.05)]">☽</span>
            {[
              { icon: "🌱", label: "Origin", desc: "Theobroma cacao — native to Central & South America. Cultivated for over 4,000 years." },
              { icon: "🔬", label: "Key Compounds", desc: "Theobromine (heart stimulant), Anandamide (bliss molecule), PEA (mood elevator), Magnesium" },
              { icon: "💓", label: "Primary Effect", desc: "Increases blood flow to heart and brain by up to 40%. Activates the endocannabinoid system." },
              { icon: "⏱", label: "Onset & Duration", desc: "Effects begin in 20–30 minutes and build over 1–2 hours. The ceremony window is typically 3 hours." },
              { icon: "🔒", label: "Safety Profile", desc: "Non-psychedelic. Gentle and beginner-friendly. Contraindicated with SSRIs and antidepressants." },
            ].map((fact) => (
              <div key={fact.label} className="py-5 border-b border-[rgba(201,150,58,0.15)] last:border-b-0 grid grid-cols-[32px_1fr] gap-4 items-start">
                <span className="text-[#C9963A] text-base mt-0.5">{fact.icon}</span>
                <div>
                  <div className="font-sans text-[9px] tracking-[3px] uppercase text-[#C9963A] mb-1">{fact.label}</div>
                  <p className="text-[15px] text-[#F5EDD8] leading-relaxed">{fact.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Effects Grid */}
        <div className="mt-20">
          <Eyebrow>What Cacao Does</Eyebrow>
          <h3 className="font-display text-[28px] text-[#2C1810] mb-2">Effects Across Body, Mind & Spirit</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-4 bg-[#C9963A]">
          {[
            { icon: "💓", title: "Cardiovascular", body: "Theobromine dilates blood vessels, increasing circulation to the heart. You'll feel warmth in your chest — the literal heart-opening." },
            { icon: "🧠", title: "Neurological", body: "Increased cerebral blood flow enhances focus, creativity, and sensory perception. Thoughts become more organized." },
            { icon: "😌", title: "Emotional", body: "PEA and anandamide create a gentle bliss state. Emotional blocks soften. Buried feelings surface safely." },
            { icon: "⚡", title: "Energetic", body: "Unlike caffeine, theobromine provides sustained energy without the crash. Deeply energized yet completely calm." },
            { icon: "🌀", title: "Spiritual", body: "In ceremonial context, cacao acts as a bridge between ordinary consciousness and deeper states of presence." },
            { icon: "🦴", title: "Physical", body: "Rich in magnesium — the most deficient mineral in modern bodies. Relaxes muscles and supports nervous system." },
          ].map((card) => (
            <div key={card.title} className="bg-[#FDFAF4] p-10 hover:bg-[#F5EDD8] transition-colors">
              <span className="text-[28px] block mb-4">{card.icon}</span>
              <h4 className="font-display text-lg font-bold text-[#2C1810] mb-2.5">{card.title}</h4>
              <p className="text-[15px] leading-[1.7] text-[#4A2C1A]">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHO THIS IS FOR */}
      <Section className="bg-[#2C1810] relative overflow-hidden">
        <div className="max-w-[680px] mx-auto text-center mb-16">
          <Eyebrow>Who This Ceremony Is For</Eyebrow>
          <STitle><span className="text-[#F5EDD8]">See Yourself <em className="text-[#C9963A]">in This Sacrament</em></span></STitle>
          <p className="text-lg italic text-[#C4B49A] leading-[1.8]">Three kinds of people arrive at a Cacao ceremony. You will recognize yourself.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[rgba(201,150,58,0.15)]">
          {[
            { type: "The One Who Leads With Fire", body: "You carry enormous creative power — and often a quiet isolation. Cacao's heart-opening works specifically on this. It softens the armor without diminishing the power." },
            { type: "The One Whose Body Used to Know", body: "There was a time when you knew — not intellectually, but in your body. Cacao opens the heart center and reconnects you to what genuinely lights you up." },
            { type: "The One Who Feels Everything", body: "You feel the emotional temperature of every room. Cacao is one of the gentlest sacraments for someone like you. It nourishes rather than overwhelms." },
          ].map((card) => (
            <div key={card.type} className="bg-[rgba(14,10,6,0.8)] p-11 border-t-[3px] border-transparent hover:border-[#C9963A] transition-colors">
              <h3 className="font-display text-[22px] italic text-[#C9963A] mb-5">{card.type}</h3>
              <p className="text-base leading-[1.8] text-[#F5EDD8] opacity-85">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* JOURNEY / WHAT TO EXPECT */}
      <Section className="bg-[#FDFAF4]">
        <Eyebrow>The Experience</Eyebrow>
        <STitle>What Happens <em className="text-[#8B5E3C]">at Ceremony</em></STitle>
        <p className="text-xl leading-[1.8] text-[#4A2C1A] max-w-[720px] italic mb-16">
          Every ceremony at Temple Mother Earth follows a sacred structure refined across hundreds of ceremonies.
        </p>
        <div className="relative pl-12 border-l border-gradient-to-b">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9963A] to-transparent" />
          {[
            { time: "Arrival · 30 minutes before", title: "Arrival, Grounding & Sacred Space", body: "Arrive early to settle your nervous system. The space is prepared with altar, sacred objects, candles, and incense." },
            { time: "Opening · First 30 minutes", title: "Ceremony Opening & Intention", body: "The facilitator opens sacred space through prayer, invocation, and land acknowledgment. The circle is cast." },
            { time: "Sacrament · The Heart of It", title: "Receiving the Cacao", body: "The cacao is prepared ceremonially — ground, warmed, and infused with prayer. Each cup is blessed individually." },
            { time: "Peak · Hours 1–2", title: "Movement, Sound & Inner Journey", body: "Live or curated music carries the ceremony. Movement is invited — let your body lead." },
            { time: "Landing · Final Hour", title: "Integration & Sharing Circle", body: "A sharing circle allows participants to voice what they experienced — witnessed by the group." },
            { time: "After", title: "The Days That Follow", body: "Cacao integration continues for 24–72 hours. Journal. Sleep well. Drink water. The sacrament continues working." },
          ].map((step) => (
            <div key={step.time} className="relative pb-14 last:pb-0">
              <div className="absolute -left-[52px] top-2 w-2.5 h-2.5 rounded-full bg-[#C9963A] shadow-[0_0_0_4px_rgba(201,150,58,0.15)]" />
              <p className="font-sans text-[10px] tracking-[3px] uppercase text-[#C9963A] mb-2">{step.time}</p>
              <h3 className="font-display text-[24px] italic text-[#2C1810] mb-3">{step.title}</h3>
              <p className="text-[17px] text-[#4A2C1A] leading-[1.8] max-w-[620px]">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PREPARATION */}
      <Section className="bg-[#F5EDD8]">
        <Eyebrow>Prepare Yourself</Eyebrow>
        <STitle>How to Arrive <em className="text-[#8B5E3C]">Ready</em></STitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
          <div>
            <h3 className="font-display text-[22px] italic text-[#2C1810] mb-7 pb-4 border-b border-[rgba(201,150,58,0.3)]">The Day Before</h3>
            <ul className="space-y-0">
              {["Eat clean. Whole foods, fruits, vegetables.", "No alcohol — 24 hours minimum.", "Limit caffeine to prevent overstimulation.", "Set your intention quietly.", "Rest well. Sleep is the foundation."].map((item) => (
                <li key={item} className="flex items-start gap-4 py-3.5 border-b border-[rgba(74,44,26,0.08)] text-base text-[#4A2C1A]">
                  <span className="text-[#C9963A] text-[8px] mt-1.5 shrink-0">◆</span>{item}
                </li>
              ))}
            </ul>
            <h3 className="font-display text-[22px] italic text-[#2C1810] mb-7 pb-4 border-b border-[rgba(201,150,58,0.3)] mt-10">Day of Ceremony</h3>
            <ul className="space-y-0">
              {["Eat lightly. No heavy meals 3–4 hours before.", "Hydrate throughout the day.", "Arrive 15 min early.", "Wear comfortable, natural fabrics.", "Bring a journal for insights."].map((item) => (
                <li key={item} className="flex items-start gap-4 py-3.5 border-b border-[rgba(74,44,26,0.08)] text-base text-[#4A2C1A]">
                  <span className="text-[#C9963A] text-[8px] mt-1.5 shrink-0">◆</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-[22px] italic text-[#2C1810] mb-7 pb-4 border-b border-[rgba(201,150,58,0.3)]">What to Bring</h3>
            <ul className="space-y-0">
              {["Journal and pen", "Personal sacred objects or crystals", "Warm socks or blanket", "An open heart and a genuine intention", "Water bottle"].map((item) => (
                <li key={item} className="flex items-start gap-4 py-3.5 border-b border-[rgba(74,44,26,0.08)] text-base text-[#4A2C1A]">
                  <span className="text-[#C9963A] text-[8px] mt-1.5 shrink-0">◆</span>{item}
                </li>
              ))}
            </ul>
            <div className="bg-[#2C1810] p-10 mt-12 border-l-4 border-[#C9963A]">
              <h4 className="font-display text-lg text-[#C9963A] mb-3">⚠ Important Health Disclosures</h4>
              <p className="text-[15px] text-[#F5EDD8] leading-[1.7] opacity-85">
                Ceremonial cacao is contraindicated with <strong>SSRIs, MAOIs, and other antidepressants</strong>. Also not recommended for serious heart conditions or pregnancy. Disclose all medications on your intake form.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="bg-[#FDFAF4]">
        <Eyebrow className="text-center">Voices from the Circle</Eyebrow>
        <STitle><span className="block text-center">What Our Community <em className="text-[#8B5E3C]">Says</em></span></STitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {[
            { text: "I've been in talk sessions for three years working on my heart. One cacao ceremony did what three years of conventional approaches couldn't. I cried for an hour and felt completely free afterward.", author: "Mariana V.", loc: "Washington, DC" },
            { text: "The facilitators hold the space with such mastery. You feel completely safe to fall apart and put yourself back together, better.", author: "David K.", loc: "Alexandria, VA" },
            { text: "As someone who's never done any kind of sacred sacrament, I was nervous. The ceremony was gentle, profound, and exactly what I needed.", author: "Renée M.", loc: "Silver Spring, MD" },
          ].map((t) => (
            <div key={t.author} className="p-10 border border-[rgba(201,150,58,0.2)] relative">
              <span className="absolute top-4 left-6 font-display text-[80px] text-[rgba(201,150,58,0.1)] leading-none">"</span>
              <p className="italic text-base leading-[1.8] text-[#4A2C1A] mb-6 relative z-10">{t.text}</p>
              <p className="font-sans text-[10px] tracking-[2px] uppercase text-[#C9963A]">{t.author}</p>
              <p className="text-xs text-[#9A7B5A] italic mt-1">{t.loc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-[#FFFEF9]">
        <Eyebrow className="text-center">Questions & Answers</Eyebrow>
        <STitle><span className="block text-center">Frequently Asked <em className="text-[#8B5E3C]">Questions</em></span></STitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 mt-16">
          {faqItems.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section className="bg-[#2C1810] py-40 px-6 md:px-[60px] text-center relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/5946081/pexels-photo-5946081.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
          alt="Sacred ceremonial fire"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.4) brightness(0.2)" }}
        />
        <div className="absolute inset-0 bg-[rgba(44,24,16,0.85)]" />
        <div className="relative z-10">
          <Eyebrow>Your Heart Is Ready</Eyebrow>
          <h2 className="font-display text-[clamp(36px,5vw,72px)] font-bold text-[#F5EDD8] leading-[1.1] mb-6">This Is Your<br />Invitation</h2>
          <p className="text-xl italic text-[#C4B49A] max-w-[560px] mx-auto mb-12 leading-[1.7]">
            Three hours. One decision that could change the entire trajectory of your emotional and spiritual life.
          </p>
          <a
            href={EVENTBRITE_CACAO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C9963A] text-[#0E0A06] px-16 py-5 font-sans text-[13px] tracking-[4px] uppercase border-2 border-[#C9963A] hover:bg-transparent hover:text-[#C9963A] transition-all"
          >
            Secure Your Seat Now
          </a>
          <p className="font-sans text-[11px] tracking-[2px] text-[#9A7B5A] uppercase mt-7">
            Community Care Model · Scholarship available · Registration required
          </p>
        </div>
      </section>

      <CeremonyExploreNav variant="dark" />

      {/* Footer */}
      <footer className="bg-[#0E0A06] border-t border-[rgba(201,150,58,0.1)] py-8 px-6 text-center">
        <p className="font-sans text-[10px] tracking-[2px] text-[#4A2C1A] uppercase">
          © 2026 Temple Mother Earth · 508(c)(1)(A) Sacred Church · Washington, DC · All ceremonies held under RFRA protection
        </p>
      </footer>
    </div>
  );
};

const FaqItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-7 border-b border-[rgba(74,44,26,0.1)] cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="font-display text-lg text-[#2C1810] flex justify-between items-start gap-4">
        {q}
        <span className={`text-[#C9963A] text-[22px] shrink-0 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </div>
      {open && <p className="text-base text-[#4A2C1A] leading-[1.8] mt-4">{a}</p>}
    </div>
  );
};

export default CacaoCeremony;
