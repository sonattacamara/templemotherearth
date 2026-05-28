import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { usePageTracking } from "@/hooks/useAnalytics";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import CeremonyExploreNav from "@/components/CeremonyExploreNav";
import { Heart, Users, Music, Moon, Flame, Sparkles, Coffee } from "lucide-react";
import cacaoVideo from "@/assets/video-cacao-hero.mp4.asset.json";

const EVENTBRITE_CACAO = "https://www.eventbrite.com/e/cacao-the-heart-opener-registration-890335636857?aff=ebdsoporgprofile";

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
  { q: "I've never done anything like this. Is that okay?", a: "More than okay. This is the softest doorway into our sanctuary. You'll be welcomed, held, and shown every step. Many in the circle are arriving for the very first time." },
  { q: "Will I feel anything?", a: "You will feel warmth in your chest, an easier breath, a quiet softening. Cacao is a heart-opener, not an altered state. You stay fully you, just more open." },
  { q: "Can I bring a friend?", a: "Yes. Ceremony is sweeter when shared. Each guest reserves their own seat so we hold the right amount of cacao and space." },
  { q: "What does my contribution cover?", a: "Ceremonial grade cacao, candlelight, live sound, the facilitators holding the room, and your seat in this community for the evening." },
  { q: "Where is it held?", a: "Our sanctuary in Washington DC. Full address is shared with your registration confirmation." },
];

const CacaoCeremony = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-[#0E0A06] text-[#F5EDD8]" style={{ fontFamily: "'EB Garamond', serif" }}>
      <SEOHead
        title="Cacao · The Heart Opener · Temple Mother Earth"
        description="Your softest doorway into our sanctuary. Cacao, candlelight, music, and a community that finally feels like home. Washington DC."
      />
      <Navigation />

      {/* Announce Bar */}
      <div className="bg-[#2C1810] text-[#E8BF72] text-center py-2.5 px-5 font-sans text-[11px] tracking-[3px] uppercase">
        The Softest Doorway In · Temple Mother Earth · Washington DC
      </div>

      {/* HERO */}
      <section className="relative min-h-screen grid place-items-center overflow-hidden bg-[#2C1810]">
        <video
          src={cacaoVideo.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.6) brightness(0.45)" }}
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
            A Gentle Beginning · Washington DC
          </p>
          <p className="font-serif italic text-[22px] text-[#C4B49A] mb-4">The room you didn't know you were missing</p>
          <h1 className="font-display text-[clamp(52px,9vw,108px)] font-black text-[#F5EDD8] leading-[0.95] mb-2 tracking-tight">
            CACAO
            <span className="block italic font-normal text-[0.5em] tracking-[6px] text-[#E8BF72] mt-3">The Heart Opener</span>
          </h1>
          <div className="w-[60px] h-px bg-gradient-to-r from-transparent via-[#C9963A] to-transparent mx-auto my-8" />
          <p className="text-[22px] italic text-[#F5EDD8] max-w-[600px] mx-auto mb-12 leading-relaxed">
            Your softest doorway into our sanctuary. No fasting. No intensity. Just cacao, candlelight, music, and a community that finally feels like home.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href={EVENTBRITE_CACAO} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#C9963A] text-[#0E0A06] px-[52px] py-[18px] font-sans text-[12px] tracking-[3px] uppercase border-2 border-[#C9963A] hover:bg-transparent hover:text-[#C9963A] transition-all">
              Pull Up a Cushion
            </a>
            <a href="#mirror" className="inline-block bg-transparent text-[#F5EDD8] px-10 py-[18px] font-sans text-[12px] tracking-[3px] uppercase border border-[rgba(245,237,216,0.25)] hover:border-[#C9963A] hover:text-[#C9963A] transition-all">
              Learn More ↓
            </a>
          </div>
        </motion.div>
      </section>

      {/* Event Strip */}
      <div className="bg-[#0E0A06] flex justify-center items-center flex-wrap border-b border-[rgba(201,150,58,0.2)]">
        {[
          { label: "Format", value: "Soft Evening · 3 Hours" },
          { label: "Sanctuary", value: "Temple Mother Earth · DC" },
          { label: "Who", value: "Beginners Welcome" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 py-7 px-12 border-r border-[rgba(201,150,58,0.15)] last:border-r-0 max-md:border-r-0 max-md:border-b max-md:w-full max-md:px-6 max-md:py-4">
            <span className="font-sans text-[9px] tracking-[4px] uppercase text-[#9A7B5A]">{item.label}</span>
            <span className="font-display text-[17px] text-[#E8BF72]">{item.value}</span>
          </div>
        ))}
      </div>

      {/* MIRROR · Avatar key-points */}
      <Section id="mirror" className="bg-[#0E0A06]">
        <Eyebrow>If Any of This Sounds Like You</Eyebrow>
        <STitle>You Are <em className="text-[#C9963A]">Already Welcome Here</em></STitle>
        <p className="text-xl leading-[1.8] text-[#C4B49A] max-w-[720px] italic mb-16">
          Cacao circles are where most of our community first walked in. No fasting, no intake forms, no intensity. Just a room that finally feels like the one you've been looking for.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {[
            { icon: <Heart className="h-6 w-6 text-[#C9963A]" />, line: "You've been craving real connection that doesn't feel forced." },
            { icon: <Flame className="h-6 w-6 text-[#C9963A]" />, line: "You want something sacred without anything scary." },
            { icon: <Moon className="h-6 w-6 text-[#C9963A]" />, line: "You want to feel something again without having to push." },
            { icon: <Users className="h-6 w-6 text-[#C9963A]" />, line: "You've been the strong one for everybody. You want to be held for one night." },
            { icon: <Music className="h-6 w-6 text-[#C9963A]" />, line: "You miss music that moves you somewhere instead of away from yourself." },
            { icon: <Sparkles className="h-6 w-6 text-[#C9963A]" />, line: "You're curious about our sanctuary, and this feels like the softest place to begin." },
          ].map((item) => (
            <div key={item.line} className="p-8 bg-[#1A1208] border border-[rgba(201,150,58,0.15)] hover:border-[rgba(201,150,58,0.4)] transition-colors">
              <div className="mb-4">{item.icon}</div>
              <p className="text-[16px] leading-[1.7] text-[#F5EDD8]">{item.line}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHAT THE NIGHT GIVES BACK */}
      <Section className="bg-[#1A1208]">
        <Eyebrow>What the Night Gives Back</Eyebrow>
        <STitle>Three Soft <em className="text-[#C9963A]">Returns</em></STitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mt-12 bg-[#C9963A]">
          {[
            { icon: <Heart className="h-7 w-7 text-[#C9963A]" />, title: "Your Heart Opens", body: "The chest softens, the breath drops in, the day's armor quietly falls off your shoulders." },
            { icon: <Moon className="h-7 w-7 text-[#C9963A]" />, title: "Your Nervous System Lets Go", body: "Candlelight, slow music, warm cacao in your hands. Your body remembers how to rest." },
            { icon: <Users className="h-7 w-7 text-[#C9963A]" />, title: "Strangers Become Family", body: "By the end of the night, the people in this room are not strangers anymore. This is how our community begins." },
          ].map((card) => (
            <div key={card.title} className="bg-[#0E0A06] p-10">
              <div className="mb-4">{card.icon}</div>
              <h4 className="font-display text-xl text-[#E8BF72] mb-3">{card.title}</h4>
              <p className="text-[15px] leading-[1.75] text-[#C4B49A]">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* JOURNEY / WHAT TO EXPECT */}
      <Section className="bg-[#0E0A06]">
        <Eyebrow>How the Evening Unfolds</Eyebrow>
        <STitle>A Soft <em className="text-[#C9963A]">Three Hours</em></STitle>
        <div className="relative pl-12 mt-12">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9963A] to-transparent" />
          {[
            { time: "Arrival", title: "Step Across the Threshold", body: "Slip off your shoes. Drop your bag. The candles are already lit, the cacao is already warming. Take the cushion that calls you." },
            { time: "Opening", title: "A Quiet Welcome", body: "We open the room together with breath, a simple prayer, and a single intention. Nothing complicated. Everyone is gentle." },
            { time: "The Cup", title: "Cacao in Your Hands", body: "Warm. Rich. Blessed. You sip slowly while the music begins. This is the heart-opener at work, soft as a sigh." },
            { time: "Music & Stillness", title: "Let the Night Carry You", body: "Live and curated sound. Some people sway. Some lay back. Some cry a little. All of it is welcome." },
            { time: "Closing Circle", title: "Share or Just Listen", body: "We close in circle. Speak if you want to. Stay quiet if you don't. Either is a complete offering." },
          ].map((step) => (
            <div key={step.time} className="relative pb-14 last:pb-0">
              <div className="absolute -left-[52px] top-2 w-2.5 h-2.5 rounded-full bg-[#C9963A] shadow-[0_0_0_4px_rgba(201,150,58,0.15)]" />
              <p className="font-sans text-[10px] tracking-[3px] uppercase text-[#C9963A] mb-2">{step.time}</p>
              <h3 className="font-display text-[24px] italic text-[#F5EDD8] mb-3">{step.title}</h3>
              <p className="text-[17px] text-[#C4B49A] leading-[1.8] max-w-[620px]">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* PREPARATION */}
      <Section className="bg-[#1A1208]">
        <Eyebrow>Arrive Ready</Eyebrow>
        <STitle>How to Arrive <em className="text-[#C9963A]">Ready</em></STitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
          <div>
            <h3 className="font-display text-[22px] italic text-[#F5EDD8] mb-7 pb-4 border-b border-[rgba(201,150,58,0.3)]">A Gentle Set-Up</h3>
            <ul className="space-y-0">
              {["Eat lightly through the day. Nothing heavy in the hour before.", "Wear something soft that you can sit, breathe, and sway in.", "Bring an open heart and one quiet intention.", "Plan a gentle morning after. Let the softness linger."].map((item) => (
                <li key={item} className="flex items-start gap-4 py-3.5 border-b border-[rgba(201,150,58,0.08)] text-base text-[#C4B49A]">
                  <span className="text-[#C9963A] text-[8px] mt-1.5 shrink-0">◆</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-[22px] italic text-[#F5EDD8] mb-7 pb-4 border-b border-[rgba(201,150,58,0.3)]">What to Bring</h3>
            <ul className="space-y-0">
              {["A journal, if you like to write things down", "Warm socks or a wrap for the cushion", "Your water bottle", "Anything small and sacred to set on the altar", "An open, curious heart"].map((item) => (
                <li key={item} className="flex items-start gap-4 py-3.5 border-b border-[rgba(201,150,58,0.08)] text-base text-[#C4B49A]">
                  <span className="text-[#C9963A] text-[8px] mt-1.5 shrink-0">◆</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <Section className="bg-[#0E0A06]">
        <Eyebrow className="text-center">Voices from the Circle</Eyebrow>
        <STitle><span className="block text-center">What Our Community <em className="text-[#C9963A]">Says</em></span></STitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {[
            { text: "I walked in nervous and walked out with five new friends and the softest chest I've had in years. This is exactly what I didn't know I was looking for.", author: "Mariana V.", loc: "Washington, DC" },
            { text: "It felt like a really beautiful dinner party with people I'd known forever. Nothing scary, nothing weird. Just so warm.", author: "David K.", loc: "Alexandria, VA" },
            { text: "My first time inside a sanctuary like this. I'll be back next month, and I'm bringing my sister.", author: "Renée M.", loc: "Silver Spring, MD" },
          ].map((t) => (
            <div key={t.author} className="p-10 border border-[rgba(201,150,58,0.2)] bg-[#1A1208] relative">
              <span className="absolute top-4 left-6 font-display text-[80px] text-[rgba(201,150,58,0.1)] leading-none">"</span>
              <p className="italic text-base leading-[1.8] text-[#C4B49A] mb-6 relative z-10">{t.text}</p>
              <p className="font-sans text-[10px] tracking-[2px] uppercase text-[#C9963A]">{t.author}</p>
              <p className="text-xs text-[#9A7B5A] italic mt-1">{t.loc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-[#0E0A06]">
        <Eyebrow className="text-center">A Few Soft Questions</Eyebrow>
        <STitle><span className="block text-center">Before You <em className="text-[#C9963A]">Walk In</em></span></STitle>
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
          <h2 className="font-display text-[clamp(36px,5vw,72px)] font-bold text-[#F5EDD8] leading-[1.1] mb-6">Pull Up<br />a Cushion</h2>
          <p className="text-xl italic text-[#C4B49A] max-w-[560px] mx-auto mb-12 leading-[1.7]">
            The cacao is already warm. The candles are already lit. We saved you a seat.
          </p>
          <a
            href={EVENTBRITE_CACAO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#C9963A] text-[#0E0A06] px-16 py-5 font-sans text-[13px] tracking-[4px] uppercase border-2 border-[#C9963A] hover:bg-transparent hover:text-[#C9963A] transition-all"
          >
            Reserve Your Cushion
          </a>
          <p className="font-sans text-[11px] tracking-[2px] text-[#9A7B5A] uppercase mt-7">
            Community Care Model · Scholarship available · Registration required
          </p>
        </div>
      </section>

      {/* RFRA Statement */}
      <div className="bg-[#0A0806] border-t border-[rgba(201,150,58,0.1)] py-8 px-6 md:px-12">
        <div className="max-w-[760px] mx-auto mb-6 p-6 border border-[rgba(201,150,58,0.2)] rounded-lg bg-[rgba(201,150,58,0.04)] text-center">
          <p className="font-sans text-[10px] tracking-[3px] uppercase text-[#C9963A] mb-2">Sacred Access</p>
          <p className="font-serif italic text-[15px] text-[#F5EDD8] leading-relaxed">
            We believe healing is a birthright, not a privilege. Sliding scale and scholarship offerings are available for those called to ceremony. Write to <a href="mailto:askus@templemotherearth.org" className="text-[#C9963A] underline">askus@templemotherearth.org</a> to begin the conversation.
          </p>
        </div>
        <p className="max-w-[760px] mx-auto text-center font-serif italic text-[13px] text-[#8A7A5A] leading-relaxed">
          This sacred ceremony is a protected religious practice of Temple Mother Earth under RFRA and the First Amendment.
        </p>
      </div>

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
    <div className="py-7 border-b border-[rgba(201,150,58,0.15)] cursor-pointer" onClick={() => setOpen(!open)}>
      <div className="font-display text-lg text-[#F5EDD8] flex justify-between items-start gap-4">
        {q}
        <span className={`text-[#C9963A] text-[22px] shrink-0 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </div>
      {open && <p className="text-base text-[#C4B49A] leading-[1.8] mt-4">{a}</p>}
    </div>
  );
};

export default CacaoCeremony;
