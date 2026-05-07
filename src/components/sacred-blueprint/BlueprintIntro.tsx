import { motion, type Easing } from "framer-motion";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const BlueprintIntro = () => (
  <section className="px-4 py-20">
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="font-display text-2xl font-bold text-foreground md:text-3xl">
        What Is Sacred Blueprint?
      </motion.h2>
      <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-muted-foreground">
        Human Design is a synthesis of ancient wisdom and modern science · combining astrology, the I Ching, Kabbalah, and the Chakra system. Your Sacred Blueprint is the unique map created at the exact moment of your birth. It reveals your energy type, your decision-making authority, and the sacred design of how you are meant to live, heal, and transform.
      </motion.p>
      <motion.p variants={fadeUp} className="mt-4 text-base leading-relaxed text-muted-foreground">
        At Temple Mother Earth, we read your Blueprint through a sacred lens · connecting your design to your healing path, your ceremony journey, and the transformation that is already calling you home.
      </motion.p>
    </motion.div>
  </section>
);

export default BlueprintIntro;
