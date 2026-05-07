import { motion, type Easing } from "framer-motion";
import { Flame, Shield, Star } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const reveals = [
  {
    icon: Flame,
    title: "Energy Type",
    desc: "Discover whether you're a Generator, Projector, Manifestor, or Reflector · and what that means for how you engage with the world.",
  },
  {
    icon: Shield,
    title: "Authority",
    desc: "Learn your unique decision-making compass · the inner guidance system your body was designed to follow.",
  },
  {
    icon: Star,
    title: "Profile",
    desc: "Understand the role you're here to play and the life themes woven into your soul's journey.",
  },
];

const BlueprintReveals = () => (
  <section className="bg-card px-4 py-20">
    <motion.div
      className="mx-auto max-w-5xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">
        What Your Blueprint Reveals
      </motion.h2>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {reveals.map((r) => (
          <motion.div key={r.title} variants={fadeUp} className="rounded-2xl border border-border bg-background p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <r.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground">{r.title}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default BlueprintReveals;
