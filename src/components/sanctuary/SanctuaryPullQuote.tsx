import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface SanctuaryPullQuoteProps {
  quote: string;
  attribution?: string;
}

const SanctuaryPullQuote = ({ quote, attribution }: SanctuaryPullQuoteProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.blockquote
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="font-serif italic text-[clamp(22px,3vw,32px)] text-[hsl(45,70%,60%)] leading-relaxed px-6 md:px-12 py-12 border-l-2 border-[hsl(45,70%,49%)] mx-6 md:mx-12 my-16"
    >
      {quote}
      {attribution && (
        <span className="block mt-4 not-italic font-sans text-[10px] tracking-[2px] text-[hsl(35,20%,42%)] uppercase">
          {attribution}
        </span>
      )}
    </motion.blockquote>
  );
};

export default SanctuaryPullQuote;
