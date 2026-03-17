import { motion, type Easing } from "framer-motion";
import { Sparkles } from "lucide-react";
import sacredArtGoddess from "@/assets/upload-art-goddess-snake.png";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const BlueprintHero = () => (
  <section className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden px-4 pt-20 text-center bg-foreground">
    <div className="absolute inset-0 bg-foreground/90" />
    <motion.div
      className="relative z-10 max-w-3xl"
      initial="hidden"
      animate="visible"
      variants={stagger}
    >
      <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
        <Sparkles className="h-7 w-7 text-primary" />
      </motion.div>
      <motion.p variants={fadeUp} className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        Human Design × Sacred Wisdom
      </motion.p>
      <motion.h1 variants={fadeUp} className="font-display mt-3 text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
        Discover Your Sacred Blueprint
      </motion.h1>
      <motion.p variants={fadeUp} className="font-body mx-auto mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
        Your Human Design chart is more than data — it's a sacred map of your soul's design. Discover how you're built to move, heal, and transform.
      </motion.p>
      <motion.a
        variants={fadeUp}
        href="#birth-form"
        className="mt-8 inline-block rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
      >
        Get My Free Blueprint →
      </motion.a>
    </motion.div>
  </section>
);

export default BlueprintHero;
