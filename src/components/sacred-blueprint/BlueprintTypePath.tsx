import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const types = [
  {
    type: "Generator",
    path: "Environment Collective ($150/mo)",
    why: "Your energy is built for consistent, satisfying practice. The daily Qi Gong and body-mind work in Environment Collective is designed for your natural rhythm.",
  },
  {
    type: "Projector",
    path: "Community Rhythm ($50/mo)",
    why: "Projectors thrive when seen, guided, and not over-committed. Community Rhythm gives you rich teachings and community without draining your energy.",
  },
  {
    type: "Manifestor",
    path: "Preparation Path ($275/mo)",
    why: "Manifestors move fast and go deep. The Preparation Path channels your initiating energy into a grounded ceremonial journey on your own timeline.",
  },
  {
    type: "Reflector",
    path: "Welcome Circle (Free)",
    why: "Reflectors need time to truly sense a community before committing. Take the full 30 days in Welcome Circle to feel the Temple before you decide.",
  },
];

const BlueprintTypePath = () => (
  <section className="px-4 py-20">
    <motion.div
      className="mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">
        Your Type → Your Path Into the Temple
      </motion.h2>
      <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
        Your Human Design type reveals the ideal membership path for your unique energy and healing journey.
      </motion.p>

      <div className="mt-12 space-y-4">
        {types.map((t) => (
          <motion.div key={t.type} variants={fadeUp} className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              <div className="shrink-0 mb-3 md:mb-0">
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 font-display text-sm font-bold text-primary">
                  {t.type}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-foreground">{t.path}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.why}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUp} className="mt-8 text-center">
        <Link
          to="/membership"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          View All Membership Tiers <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

export default BlueprintTypePath;
