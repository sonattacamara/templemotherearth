import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SanctuaryCTAProps {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  external?: boolean;
  note?: string;
}

const SanctuaryCTA = ({ eyebrow, title, description, ctaLabel, ctaHref, external = true, note }: SanctuaryCTAProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-br from-[hsl(90,25%,92%)] to-[hsl(85,20%,95%)] py-20 md:py-24 px-6 md:px-12 text-center border-t border-[hsl(90,15%,85%)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {eyebrow && (
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(90,40%,30%)] mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="font-sans text-[clamp(24px,4vw,52px)] font-light leading-[1.1] mb-6 text-[hsl(100,20%,15%)]">
          {title}
        </h2>
        <p className="text-[hsl(90,10%,35%)] text-xl max-w-[560px] mx-auto mb-12 font-serif italic">
          {description}
        </p>
        <a
          href={ctaHref}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(90,40%,30%)] text-[hsl(90,20%,97%)] hover:bg-[hsl(90,40%,38%)] transition-all duration-300"
        >
          {ctaLabel}
        </a>
        {note && (
          <p className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(90,10%,50%)] mt-8">
            {note}
          </p>
        )}
      </motion.div>
    </section>
  );
};

export default SanctuaryCTA;
