import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface CardData {
  title: string;
  description: string;
  note?: string;
  featured?: boolean;
}

interface SanctuaryColCardsProps {
  cards: CardData[];
}

const SanctuaryColCards = ({ cards }: SanctuaryColCardsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
    >
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className={`p-8 md:p-10 border ${
            card.featured
              ? "border-[hsl(90,25%,72%)] bg-[hsl(90,20%,93%)]"
              : "border-[hsl(90,15%,85%)] bg-[hsl(90,15%,95%)]"
          }`}
        >
          <h3 className="font-sans text-[13px] tracking-[2px] text-[hsl(90,40%,30%)] mb-4 font-normal uppercase">
            {card.title}
          </h3>
          <p className="text-[17px] text-[hsl(90,10%,35%)] leading-relaxed font-serif">
            {card.description}
          </p>
          {card.note && (
            <p className="mt-6 font-sans text-[9px] tracking-[2px] uppercase text-[hsl(90,40%,30%)]">
              {card.note}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default SanctuaryColCards;
