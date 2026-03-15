import SanctuaryWeekLayout from "@/components/sanctuary/SanctuaryWeekLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const EVENTBRITE_L5 = "#";

const includes = [
  { icon: "📋", name: "Pre-Ceremony Consultation", desc: "Private 45-minute call with your facilitator. Health review, intention setting, and full preparation guidance." },
  { icon: "🐸", name: "Kambo Ceremony", desc: "The anchor sacrament. Sacred Amazonian frog secretion applied ceremonially by trained facilitators." },
  { icon: "🌿", name: "Supporting Plant Sacraments", desc: "Hapé and cacao woven into the ceremony arc to open, ground, and integrate." },
  { icon: "🍃", name: "Ceremonial Meal", desc: "Post-ceremony sacred nourishment — whole foods, medicinal teas, and mineral-rich restoration." },
  { icon: "🔄", name: "Full Integration Session + Follow-up", desc: "Same-day integration circle plus 1:1 follow-up call within 7 days." },
  { icon: "📖", name: "30-Day Integration Guide", desc: "Personal integration framework, journal prompts, and practices for embedding the initiation." },
];

const sacraments = [
  { icon: "💧", name: "Water Preparation", origin: "Purification Foundation", effect: "1–2 liters of clean water primes the body for the purge." },
  { icon: "🌿", name: "Hapé", origin: "Amazonia · Sacred Snuff", effect: "Opens ceremony with grounding and mental clarity." },
  { icon: "🐸", name: "Kambo", origin: "Phyllomedusa bicolor", effect: "The anchor sacrament. Purges the body. Removes panema." },
  { icon: "🍫", name: "Cacao", origin: "Theobroma cacao · Heart", effect: "Post-Kambo heart sacrament. Opens and softens the heart center." },
  { icon: "🍃", name: "Sacred Nourishment", origin: "Mineral · Plant Kingdom", effect: "Mineral broths, medicinal teas, and whole foods rebuild and restore." },
];

const ritualSteps = [
  { time: "7:00 AM", title: "The Threshold", body: "You arrive having fasted. Facilitators greet each participant. A brief orienting circle where each person names what they are arriving with." },
  { time: "7:30 AM", title: "Sacred Space & Hapé", body: "Ceremony opened with prayer and invocation. Hapé is administered — a grounding, clearing sacrament that prepares body and mind." },
  { time: "8:00–10:00 AM", title: "Kambo Ceremony", body: "The anchor sacrament. Small burns made on skin. The secretion applied. Within minutes, heat, intensity, purging. Facilitators present throughout." },
  { time: "10:00 AM–12:00 PM", title: "Rest, Cacao & Heart Opening", body: "Ceremonial cacao offered — the heart sacrament that meets the openness the purge creates. Sound healing begins." },
  { time: "12:00–2:00 PM", title: "Sacred Nourishment", body: "Mineral broth, whole foods, medicinal teas. What fills the emptied vessel now matters." },
  { time: "2:00–4:00 PM", title: "Integration Circle & Departure", body: "Each participant names what they experienced. Being witnessed seals the initiation. You leave carrying your 30-Day Integration Guide." },
];

const whoCards = [
  { num: "01", type: "The One Who Has Done the Work", tag: "Ready for the Threshold", body: "You have sat in ceremony before. You have done the inner work. Something in you knows: the next level of your healing requires a deeper purification than what you have accessed so far." },
  { num: "02", type: "The One Carrying What Words Cannot Reach", tag: "Beyond Talk · Into the Body", body: "Therapy helped. Meditation helped. But something remains lodged in the body, beneath language, beneath understanding. Kambo reaches what the mind cannot." },
  { num: "03", type: "The One Being Called", tag: "Trust the Knowing", body: "No logic. No explanation. Just a persistent knowing that this is next. If you have been circling this ceremony, that is not curiosity. That is preparation completing itself." },
];

const Level5Ceremony = () => (
  <SanctuaryWeekLayout
    title="Level 5 — The Complete Initiation | Temple Mother Earth"
    description="The most powerful ceremonial offering at Temple Mother Earth. Multi-sacrament initiation including Kambo. March 21, 2026. By application only."
  >
    {/* Warning Announce */}
    <div className="bg-[hsl(45,70%,49%)] text-[hsl(100,20%,3%)] text-center py-2.5 px-5 font-sans text-[9px] tracking-[4px] uppercase font-bold">
      ⚠ Health screening required · Application only · Spring Equinox 2026
    </div>

    {/* HERO */}
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050804]">
      <img
        src="https://images.pexels.com/photos/4534200/pexels-photo-4534200.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        alt="Sacred ceremony space with candlelight for Kambo, Hapé, and Sananga purification rituals"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.3) brightness(0.25) hue-rotate(-10deg)" }}
        loading="eager"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_60%,rgba(45,74,40,0.4)_0%,transparent_60%),radial-gradient(ellipse_100%_50%_at_50%_100%,rgba(91,168,74,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050804] via-[rgba(5,8,4,0.6)] to-[rgba(5,8,4,0.3)]" />

      <motion.div
        className="relative z-10 text-center px-10 max-w-[1000px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="font-sans text-[9px] tracking-[6px] uppercase text-[#5BA84A] mb-8">
          Sanctuary Week · Saturday, March 21, 2026 · Washington DC
        </p>
        <div className="font-sans text-[clamp(120px,22vw,260px)] font-black leading-[0.85] text-transparent bg-gradient-to-b from-[rgba(200,160,48,0.6)] to-[rgba(200,160,48,0.05)] bg-clip-text mb-[-20px] tracking-[-8px]" style={{ WebkitTextStroke: "1px rgba(200,160,48,0.3)", WebkitBackgroundClip: "text" }}>
          5
        </div>
        <h1 className="font-sans text-[clamp(28px,5vw,56px)] font-bold text-[#F0EAD6] tracking-[4px] uppercase leading-[1.1]">
          The Complete<br />Initiation
        </h1>
        <p className="font-serif italic text-[clamp(16px,2vw,22px)] text-[#8A9E84] tracking-[3px] mt-2">
          Multi-Sacrament · Kambo Included · By Application Only
        </p>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C8A030] to-transparent mx-auto my-8" />
        <p className="font-serif italic text-[clamp(18px,2vw,22px)] text-[#F0EAD6] max-w-[680px] mx-auto mb-12 leading-[1.7]">
          You have been in preparation for this whether you knew it or not. The jungle does not call everyone. It called you.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href={EVENTBRITE_L5} className="inline-block bg-[#C8A030] text-[#050804] px-[52px] py-[18px] font-sans text-[10px] tracking-[3px] uppercase font-bold border-2 border-[#C8A030] hover:bg-transparent hover:text-[#C8A030] transition-all">
            Apply for Your Seat
          </a>
          <a href="#kambo" className="inline-block bg-transparent text-[#F0EAD6] px-10 py-[18px] font-sans text-[10px] tracking-[3px] uppercase border border-[rgba(240,234,214,0.2)] hover:border-[#C8A030] hover:text-[#C8A030] transition-all">
            What is Kambo? ↓
          </a>
        </div>
        <p className="font-sans text-[8px] tracking-[3px] uppercase text-[#8A9E84] mt-12 opacity-60">
          By application only · Health screening required
        </p>
      </motion.div>
    </section>

    {/* Warning Banner */}
    <div className="bg-[rgba(200,160,48,0.06)] border-y border-[rgba(200,160,48,0.15)] py-5 px-6 md:px-[60px] text-center font-sans text-[9px] tracking-[3px] uppercase text-[#C8A030]">
      ⚠ This ceremony includes Kambo — mandatory health screening required · Not suitable for all individuals
    </div>

    {/* Event Strip */}
    <div className="bg-[#0B140A] flex justify-center border-b border-[rgba(200,160,48,0.08)] flex-wrap">
      {[
        { label: "Date", val: "Saturday, March 21" },
        { label: "Duration", val: "Full Day (8–10 hrs)" },
        { label: "Access", val: "By Application Only" },
        { label: "Seats", val: "Strictly Limited" },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1.5 py-7 px-12 border-r border-[rgba(200,160,48,0.08)] last:border-r-0 max-md:border-r-0 max-md:border-b max-md:w-full max-md:py-4">
          <span className="font-sans text-[8px] tracking-[4px] uppercase text-[#8A9E84]">{item.label}</span>
          <span className="font-serif italic text-base text-[#C8A030]">{item.val}</span>
        </div>
      ))}
    </div>

    {/* WHAT IS LEVEL 5 */}
    <SanctuarySection eyebrow="The Offering" title={<><span className="text-[hsl(40,30%,90%)]">This Is Not a Workshop.</span><br /><em className="font-serif italic text-[#C8A030] text-[1.1em]">It Is an Initiation.</em></>}>
      <p className="font-serif italic text-xl text-[#8A9E84] max-w-[680px] leading-[1.8] mb-16">
        Level 5 is the most comprehensive ceremonial offering at Temple Mother Earth. A full-day sacred container weaving multiple plant sacraments into one complete arc.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
        <div className="text-[17px] leading-[1.9] text-[#F0EAD6] opacity-80 space-y-6">
          <p>There is a reason that every indigenous culture on Earth developed initiation rites. The human psyche requires <strong className="text-[#C8A030] opacity-100">threshold experiences</strong> — moments where the old self is formally dissolved and a new self emerges.</p>
          <p>Level 5 is a <strong className="text-[#C8A030] opacity-100">full initiation</strong>. Kambo purifies what you cannot purify through discipline alone. You come in one person. You leave another. Not better — truer.</p>
          <p>This is for those who have done the preliminary work and are ready for the next threshold. It is not a beginner ceremony. It is a <strong className="text-[#C8A030] opacity-100">graduation.</strong></p>
        </div>
        <div className="flex flex-col gap-0.5">
          {includes.map((item) => (
            <div key={item.name} className="bg-[#0B140A] border-l-[3px] border-[#C8A030] p-7 grid grid-cols-[40px_1fr] gap-5 items-start hover:bg-[#1A2E17] hover:border-[#8FD67A] transition-colors">
              <span className="text-[22px] mt-0.5">{item.icon}</span>
              <div>
                <h4 className="font-sans text-[11px] tracking-[1px] uppercase text-[#C8A030] font-bold mb-1.5">{item.name}</h4>
                <p className="text-[15px] text-[#8A9E84] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SanctuarySection>

    {/* ALL SACRAMENTS */}
    <SanctuarySection eyebrow="The Full Sacrament Cabinet" title={<><span className="text-[hsl(40,30%,90%)]">Every Sacrament</span><br /><em className="font-serif italic text-[#C8A030] text-[1.1em]">in Level 5</em></>}>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-0.5 bg-[rgba(200,160,48,0.08)] mt-16">
        {sacraments.map((s) => (
          <div key={s.name} className="bg-[#050804] p-9 text-center border-t-[3px] border-transparent hover:bg-[#0B140A] hover:border-[#C8A030] transition-all">
            <span className="text-4xl block mb-4">{s.icon}</span>
            <h4 className="font-sans text-[11px] font-bold text-[#C8A030] mb-2">{s.name}</h4>
            <p className="font-sans text-[8px] tracking-[2px] uppercase text-[#8A9E84] mb-3.5">{s.origin}</p>
            <p className="text-sm text-[#F0EAD6] leading-relaxed opacity-70">{s.effect}</p>
          </div>
        ))}
      </div>
    </SanctuarySection>

    {/* WHO THIS IS FOR */}
    <SanctuarySection className="bg-[#111D0F]" eyebrow="Who This Initiation Is For" title={<>See Yourself<br /><em className="font-serif italic text-[#5BA84A] text-[1.1em]">In This Initiation</em></>}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-[rgba(91,168,74,0.06)] mt-16">
        {whoCards.map((card) => (
          <div key={card.num} className="bg-[#050804] p-12 border-b-[3px] border-transparent hover:bg-[rgba(11,20,10,0.9)] hover:border-[#5BA84A] transition-all">
            <span className="font-sans text-[60px] font-black text-[rgba(91,168,74,0.08)] leading-none block mb-[-10px]">{card.num}</span>
            <h3 className="font-serif text-2xl italic text-[#C8A030] mb-1.5">{card.type}</h3>
            <span className="font-sans text-[8px] tracking-[2px] uppercase text-[#8A9E84] block mb-6">{card.tag}</span>
            <p className="text-base text-[#F0EAD6] leading-[1.85] opacity-82">{card.body}</p>
          </div>
        ))}
      </div>
    </SanctuarySection>

    {/* RITUAL MAP */}
    <SanctuarySection className="bg-[#0B140A]" eyebrow="The Arc of the Day" title={<><span className="text-[hsl(40,30%,90%)]">The Ritual</span> <em className="font-serif italic text-[#C8A030]">Map</em></>}>
      <div className="mt-16 relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#C8A030] via-[#5BA84A] to-transparent" />
        {ritualSteps.map((step, i) => (
          <div key={step.time} className="grid grid-cols-[60px_1fr] gap-10 mb-14 last:mb-0 relative">
            <div className="flex flex-col items-center relative">
              <div className={`w-4 h-4 rounded-full mt-1.5 shrink-0 relative z-10 ${i >= 2 && i <= 3 ? "bg-[#5BA84A] shadow-[0_0_0_4px_rgba(91,168,74,0.2)]" : "bg-[#C8A030] shadow-[0_0_0_4px_rgba(200,160,48,0.2)]"}`} />
            </div>
            <div>
              <p className="font-sans text-[8px] tracking-[3px] uppercase text-[#C8A030] mb-2">{step.time}</p>
              <h3 className="font-serif text-2xl italic text-[#F0EAD6] mb-3">{step.title}</h3>
              <p className="text-base text-[#8A9E84] leading-[1.8] max-w-[680px]">{step.body}</p>
            </div>
          </div>
        ))}
      </div>
    </SanctuarySection>

    {/* FINAL CTA */}
    <section className="text-center py-44 px-6 md:px-[60px] relative overflow-hidden bg-[#050804]">
      <img
        src="https://images.pexels.com/photos/1179229/pexels-photo-1179229.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
        alt="Misty jungle canopy at dawn"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: "saturate(0.3) brightness(0.18) hue-rotate(-10deg)" }}
      />
      <div className="absolute inset-0 bg-[rgba(5,8,4,0.75)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(45,74,40,0.3)_0%,transparent_60%)]" />
      <div className="relative z-10">
        <p className="font-sans text-[8px] tracking-[6px] uppercase text-[#5BA84A] mb-8">By Application Only</p>
        <h2 className="font-sans text-[clamp(40px,7vw,100px)] font-black text-[#F0EAD6] leading-[0.95] mb-10 tracking-[-3px]">
          Level 5<br /><span className="text-[#C8A030]">Awaits</span>
        </h2>
        <p className="font-serif italic text-[22px] text-[#8A9E84] max-w-[600px] mx-auto mb-14 leading-[1.7]">
          Not everyone is called to initiation. If you have read this far and something in you is still saying yes — that is not curiosity. That is preparation.
        </p>
        <a href={EVENTBRITE_L5} className="inline-block bg-[#C8A030] text-[#050804] px-[52px] py-[18px] font-sans text-[10px] tracking-[3px] uppercase font-bold border-2 border-[#C8A030] hover:bg-transparent hover:text-[#C8A030] transition-all">
          Apply for Your Seat
        </a>
        <p className="font-sans text-[9px] tracking-[3px] uppercase text-[#8A9E84] mt-7">
          Application → Health Screening → Confirmation · Community Care Model applies
        </p>
      </div>
    </section>
  </SanctuaryWeekLayout>
);

export default Level5Ceremony;
