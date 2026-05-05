import SacredSeriesLayout from "@/components/sanctuary/SacredSeriesLayout";
import SanctuarySection from "@/components/sanctuary/SanctuarySection";
import SanctuaryCTA from "@/components/sanctuary/SanctuaryCTA";
import { motion } from "framer-motion";
import { Leaf, Flower2, Moon, Sun, Sprout, Sparkles, Coffee } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const teaMenu: { icon: LucideIcon; name: string; properties: string; desc: string }[] = [
  { icon: Leaf, name: "Ceremonial Cacao", properties: "Heart Opening · Entheogenic", desc: "High-ceremony grade cacao, prepared with intention. The original heart sacrament of the Americas." },
  { icon: Flower2, name: "Adaptogenic Blend", properties: "Stress Relief · Nervous System", desc: "Ashwagandha, reishi, lion's mane, and holy basil, a deeply nourishing blend for the modern nervous system." },
  { icon: Moon, name: "Dream Tea", properties: "Intuition · Relaxation", desc: "Mugwort, passionflower, and blue lotus, a lunar blend for deep relaxation and inner vision." },
  { icon: Sun, name: "Solar Vitality", properties: "Energy · Clarity", desc: "Nettle, rosehips, and golden herbs, a warming, mineral-rich blend that activates and brightens." },
  { icon: Sprout, name: "Detox & Cleanse", properties: "Purification · Renewal", desc: "Dandelion, burdock, and cleansing herbs aligned with Sonatta's 7 Wellness Pillars detox protocols." },
  { icon: Sparkles, name: "Sacred Ceremony Blend", properties: "Ceremonial Grade · House Special", desc: "Our signature house blend, seasonal, medicinal, and prepared fresh for each gathering." },
];

const steps = [
  { num: "一", title: "Enter & Arrive", desc: "Leave the outer world at the door. Step into sacred space with intention and presence." },
  { num: "二", title: "Sit & Still", desc: "Guided silence and breathwork. Allow your nervous system to downregulate and your presence to deepen." },
  { num: "三", title: "Pour & Receive", desc: "Teas are poured in ceremonial rounds. Each cup is an offering. Receive with gratitude." },
  { num: "四", title: "Speak & Share", desc: "Optional sharing circle. What arose for you? What shifted? Community witnessing as sacrament." },
];

const benefits = [
  { title: "Accessible Entry Point", desc: "Sacred Tea House is an ideal introduction to sacred ceremony, approachable, gentle, and deeply nourishing." },
  { title: "Nervous System Reset", desc: "Medicinal teas and ceremonial space help regulate the nervous system and shift out of chronic stress states." },
  { title: "Community Sacrament", desc: "There is restoration in gathering. Being witnessed, seen, and held in community is its own powerful sacrament." },
  { title: "Ritual & Rhythm", desc: "A monthly anchor point of slowness, sacredness, and self-renewal in the rhythm of your life." },
];

const SacredTeaHouse = () => (
  <SacredSeriesLayout
    title="Sacred Tea House | Temple Mother Earth"
    description="A slow, sacred, sensory experience. Ceremonial tea space where plant sacrament, community, and contemplative practice meet."
  >
    {/* Hero - dark theme for readability */}
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-10 py-20 text-center overflow-hidden bg-[hsl(108,28%,8%)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,hsla(110,25%,20%,0.2),transparent_60%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-[600px]"
      >
        <p className="font-display text-[10px] tracking-[5px] uppercase text-[hsl(45,70%,49%)] mb-6">Ongoing · Monthly Offering</p>
        <Coffee className="mx-auto h-16 w-16 text-[hsl(45,70%,49%)] mb-5" />
        <h1 className="font-display text-[clamp(32px,5vw,68px)] font-semibold text-[hsl(40,30%,90%)] leading-[1.1] mb-2">
          Sacred Tea House
        </h1>
        <p className="font-serif italic text-[hsl(45,70%,49%)] text-[0.65em] tracking-[3px] text-2xl mt-2 mb-6">Sacred Sacrament Sanctuary</p>
        <p className="font-serif italic text-xl leading-relaxed text-[hsl(40,24%,78%)] max-w-[560px] mx-auto mb-10">
          Step into the stillness. The Sacred Tea House is a slow, sacred, sensory experience — a ceremonial tea space where plant sacrament, community, and contemplative practice meet.
        </p>
        <a
          href="https://www.eventbrite.com/o/temple-of-mother-earth-29347213477"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[hsl(45,70%,49%)] text-[hsl(108,28%,8%)] px-12 py-4.5 font-display text-[13px] tracking-[3px] uppercase font-bold border-2 border-[hsl(45,70%,49%)] hover:bg-transparent hover:text-[hsl(45,70%,49%)] transition-all"
        >
          Reserve Your Seat
        </a>
      </motion.div>
    </section>

    {/* Event Bar */}
    <div className="bg-[hsl(120,26%,12%)] px-6 md:px-10 py-5 flex justify-center gap-12 flex-wrap border-y border-[hsla(45,70%,49%,0.15)]">
      {[
        { label: "Frequency", val: "Monthly" },
        { label: "Capacity", val: "Intimate / Limited" },
        { label: "Location", val: "Temple Mother Earth, DC" },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1">
          <span className="font-display text-[9px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] opacity-70">{item.label}</span>
          <span className="font-display text-[14px] font-semibold text-[hsl(40,30%,90%)]">{item.val}</span>
        </div>
      ))}
    </div>

    {/* Tea Menu */}
    <section className="px-6 md:px-10 py-20 max-w-[900px] mx-auto bg-[hsl(108,28%,6%)]">
      <p className="font-display text-[10px] tracking-[5px] uppercase text-[hsl(45,70%,49%)] text-center mb-4">The Tea Menu</p>
      <h2 className="font-display text-[clamp(22px,3vw,34px)] text-[hsl(40,30%,90%)] text-center mb-12 font-normal">Sacred Plant Offerings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[hsla(45,70%,49%,0.1)]">
        {teaMenu.map((tea) => (
          <div key={tea.name} className="bg-[hsl(108,28%,8%)] p-8 border-b-[3px] border-transparent hover:border-[hsl(45,70%,49%)] transition-colors">
            <tea.icon className="h-7 w-7 text-[hsl(45,70%,49%)] mb-3" />
            <h4 className="font-display text-[12px] tracking-[2px] text-[hsl(40,30%,90%)] mb-2 font-normal">{tea.name}</h4>
            <p className="font-display text-[9px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] mb-2.5">{tea.properties}</p>
            <p className="text-[14px] leading-relaxed text-[hsl(40,24%,78%)] font-serif">{tea.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Tea Ceremony */}
    <section className="bg-[hsl(108,28%,5%)] text-[hsl(40,30%,90%)] px-6 md:px-10 py-20 border-t border-[hsla(45,70%,49%,0.1)]">
      <div className="max-w-[900px] mx-auto">
        <p className="font-display text-[10px] tracking-[5px] uppercase text-[hsl(45,70%,49%)] text-center mb-4">The Practice</p>
        <h2 className="font-display text-[clamp(22px,3vw,34px)] text-center mb-6 font-normal text-[hsl(40,30%,90%)]">The Tea Ceremony</h2>
        <p className="font-serif italic text-[19px] leading-relaxed max-w-[700px] mx-auto text-center text-[hsl(40,24%,78%)] mb-16">
          We are reclaiming tea as ceremony. Each gathering at the Sacred Tea House moves through the ancient structure of sitting, slowing, receiving, and sharing.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <div key={step.num} className="text-center">
              <p className="font-display text-5xl text-[hsla(45,70%,49%,0.25)] leading-none mb-3">{step.num}</p>
              <h4 className="font-display text-[12px] tracking-[2px] text-[hsl(45,70%,49%)] mb-2.5 font-normal">{step.title}</h4>
              <p className="text-[15px] leading-relaxed text-[hsl(40,24%,78%)] font-serif">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Benefits */}
    <section className="bg-[hsl(108,28%,8%)] px-6 md:px-10 py-20 border-t border-[hsla(45,70%,49%,0.1)]">
      <div className="max-w-[900px] mx-auto">
        <p className="font-display text-[10px] tracking-[5px] uppercase text-[hsl(45,70%,49%)] text-center mb-4">Sacred Sacrament</p>
        <h2 className="font-display text-[clamp(22px,3vw,34px)] text-[hsl(40,30%,90%)] text-center mb-12 font-normal">Why Sacred Tea?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="p-7 border border-[hsla(45,70%,49%,0.15)] bg-[hsl(108,28%,6%)]">
              <h4 className="font-display text-[12px] tracking-[2px] text-[hsl(45,70%,49%)] mb-2 font-normal">{b.title}</h4>
              <p className="text-[15px] leading-relaxed text-[hsl(40,24%,78%)] font-serif">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-gradient-to-br from-[hsl(120,26%,12%)] to-[hsl(108,28%,8%)] py-24 px-6 md:px-10 text-center border-t border-[hsla(45,70%,49%,0.1)]">
      <h2 className="font-display text-[clamp(22px,3vw,40px)] text-[hsl(40,30%,90%)] mb-4 font-normal">The Tea House Awaits</h2>
      <p className="text-[hsl(40,24%,78%)] font-serif italic text-xl mb-10">A monthly sanctuary of slowness and sacred sacrament</p>
      <a
        href="https://www.eventbrite.com/o/temple-of-mother-earth-29347213477"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[hsl(45,70%,49%)] text-[hsl(108,28%,8%)] px-12 py-4.5 font-display text-[13px] tracking-[3px] uppercase font-bold border-2 border-[hsl(45,70%,49%)] hover:bg-transparent hover:text-[hsl(45,70%,49%)] transition-all"
      >
        Reserve Your Seat
      </a>
      <p className="mt-6 text-[12px] font-display tracking-[2px] text-[hsl(40,30%,90%)] opacity-40">Temple Mother Earth · Monthly Offering</p>
    </section>
  </SacredSeriesLayout>
);

export default SacredTeaHouse;
