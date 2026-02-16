import { motion, type Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const steps = [
  {
    num: "1",
    title: "Explore & Learn",
    desc: "Browse the Sacred Learning Library, read preparation guides, and understand our ceremonies.",
  },
  {
    num: "2",
    title: "Prepare & Apply",
    desc: "Complete your Sacred Intake form, follow the preparation guide, and book your experience.",
  },
  {
    num: "3",
    title: "Integrate & Grow",
    desc: "After ceremony, use integration resources, connect with community, and continue your evolution.",
  },
];

const PortalHowItWorks = () => (
  <section className="px-4 py-12 bg-card/50 border-b border-border">
    <motion.div
      className="mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="text-center mb-8">
        <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          How the Integration Portal Works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          The Integration Portal is your free resource hub for navigating every step of your journey at Temple Mother Earth.
          Whether you're preparing for your first ceremony or deepening your ongoing practice, everything you need is here.
        </p>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="font-display text-lg font-bold text-primary">{s.num}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-foreground">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default PortalHowItWorks;
