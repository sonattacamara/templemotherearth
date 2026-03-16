import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SanctuarySectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}

const SanctuarySection = ({ eyebrow, title, children, className = "", dark = false, id }: SanctuarySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      id={id}
      className={`px-6 md:px-12 py-20 md:py-24 ${dark ? "bg-[hsl(90,20%,95%)]" : ""} ${className}`}
    >
      <motion.div
        className="max-w-[1100px] mx-auto"
        initial={{ opacity: 0, y: 22 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {eyebrow && (
          <p className="font-sans text-[8px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-4">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="font-sans text-[clamp(24px,3.5vw,44px)] font-light leading-[1.1] mb-8 text-[hsl(40,30%,90%)]">
            {title}
          </h2>
        )}
        {children}
      </motion.div>
    </section>
  );
};

export default SanctuarySection;
