import { motion, type Easing } from "framer-motion";
import type { LucideIcon } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export interface ImpactCard {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface DonateImpactCardsProps {
  heading: string;
  subheading: string;
  cards: ImpactCard[];
}

const DonateImpactCards = ({ heading, subheading, cards }: DonateImpactCardsProps) => {
  return (
    <section className="px-4 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="mx-auto max-w-5xl"
      >
        <motion.p
          variants={fadeUp}
          className="text-center font-body text-xs uppercase tracking-[0.3em] text-primary"
        >
          Why Your Offering Matters
        </motion.p>
        <motion.h2
          variants={fadeUp}
          className="mt-3 text-center font-display text-2xl font-bold text-foreground md:text-3xl"
        >
          {heading}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground"
        >
          {subheading}
        </motion.p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              className="rounded-xl border border-border bg-card p-8 text-center transition hover:shadow-md"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default DonateImpactCards;
