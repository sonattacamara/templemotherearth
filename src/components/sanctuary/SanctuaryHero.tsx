import { motion, type Easing } from "framer-motion";

interface SanctuaryHeroProps {
  dateBadge?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  lead: string;
  primaryCTA: { label: string; href: string; external?: boolean };
  secondaryCTA?: { label: string; href: string };
  backgroundImage?: string;
}

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const SanctuaryHero = ({
  dateBadge,
  eyebrow,
  title,
  subtitle,
  lead,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
}: SanctuaryHeroProps) => (
  <section className="relative min-h-[92vh] flex flex-col justify-end px-6 md:px-12 py-16 md:py-20 overflow-hidden">
    {backgroundImage && (
      <>
        <img
          src={backgroundImage}
          alt="Sacred ceremony sanctuary for Kambo, Cacao, and Hapé healing rituals at Temple Mother Earth"
          className="absolute inset-0 w-full h-full object-cover saturate-[0.7] -z-10"
          loading="eager"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[hsla(100,20%,3%,0.3)] via-[hsla(105,30%,5%,0.6)] to-[hsla(100,20%,3%,0.88)]" />
      </>
    )}

    {dateBadge && (
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="inline-block self-start mb-8"
      >
        <span className="bg-[hsl(45,70%,49%)] text-[hsl(100,20%,3%)] font-sans text-[9px] tracking-[3px] uppercase px-5 py-2">
          {dateBadge}
        </span>
      </motion.div>
    )}

    <motion.p
      custom={1}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-5"
    >
      {eyebrow}
    </motion.p>

    <motion.h1
      custom={2}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="font-sans text-[clamp(36px,6vw,80px)] font-light leading-[1.05] text-[hsl(40,30%,90%)] mb-7 max-w-[800px]"
    >
      {title}
    </motion.h1>

    <motion.p
      custom={3}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-[clamp(18px,2vw,22px)] text-[hsl(35,30%,68%)] max-w-[620px] mb-12 leading-relaxed font-serif"
    >
      {lead}
    </motion.p>

    <motion.div
      custom={4}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex gap-4 flex-wrap"
    >
      <a
        href={primaryCTA.href}
        target={primaryCTA.external ? "_blank" : undefined}
        rel={primaryCTA.external ? "noopener noreferrer" : undefined}
        className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(100,20%,3%)] hover:bg-[hsl(45,70%,60%)] transition-all duration-300"
      >
        {primaryCTA.label}
      </a>
      {secondaryCTA && (
        <a
          href={secondaryCTA.href}
          className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-transparent border border-[hsla(45,70%,49%,0.4)] text-[hsl(45,70%,49%)] hover:bg-[hsla(45,70%,49%,0.08)] hover:border-[hsl(45,70%,49%)] transition-all duration-300"
        >
          {secondaryCTA.label}
        </a>
      )}
    </motion.div>
  </section>
);

export default SanctuaryHero;
