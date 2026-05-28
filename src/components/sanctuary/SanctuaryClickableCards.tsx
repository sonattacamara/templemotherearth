import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check } from "lucide-react";

export interface ClickableCard {
  title: string;
  shortDescription: string;
  longDescription: string;
  whatToExpect: string[];
}

interface Props {
  cards: ClickableCard[];
}

const SanctuaryClickableCards = ({ cards }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex !== null ? cards[openIndex] : null;

  return (
    <>
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        {cards.map((card, i) => (
          <motion.button
            key={card.title}
            type="button"
            onClick={() => setOpenIndex(i)}
            aria-label={`Learn more about ${card.title}`}
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="group text-left p-8 md:p-10 border border-[hsl(100,25%,18%)] bg-[hsl(105,30%,12%)] hover:border-[hsl(45,50%,35%)] hover:bg-[hsl(110,25%,14%)] transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[hsl(45,70%,49%)] focus:ring-offset-2 focus:ring-offset-background"
          >
            <h3 className="font-sans text-[13px] tracking-[2px] text-[hsl(45,70%,49%)] mb-4 font-normal uppercase">
              {card.title}
            </h3>
            <p className="text-[17px] text-[hsl(90,15%,65%)] leading-relaxed font-serif">
              {card.shortDescription}
            </p>
            <p className="mt-6 font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,49%)] opacity-70 group-hover:opacity-100 transition-opacity">
              Tap to learn more →
            </p>
          </motion.button>
        ))}
      </div>

      <Dialog open={openIndex !== null} onOpenChange={(o) => !o && setOpenIndex(null)}>
        <DialogContent className="max-w-2xl bg-[hsl(105,30%,12%)] border border-[hsl(45,50%,35%)] text-[hsl(40,30%,90%)]">
          {active && (
            <>
              <DialogHeader>
                <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-2">
                  Ways to Move
                </p>
                <DialogTitle className="font-serif italic text-3xl md:text-4xl text-[hsl(40,30%,90%)] leading-tight">
                  {active.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Description and what to expect for {active.title}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-8">
                <div>
                  <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-3">
                    The Practice
                  </p>
                  <p className="font-serif text-[17px] leading-[1.8] text-[hsl(90,15%,72%)]">
                    {active.longDescription}
                  </p>
                </div>
                <div>
                  <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-4">
                    What to Expect
                  </p>
                  <ul className="space-y-3">
                    {active.whatToExpect.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-4 w-4 mt-1.5 flex-shrink-0 text-[hsl(45,70%,49%)]" />
                        <span className="font-serif text-[16px] leading-[1.7] text-[hsl(90,15%,72%)]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SanctuaryClickableCards;