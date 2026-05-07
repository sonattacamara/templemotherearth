import { motion, type Easing } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const BlueprintFooterCTA = () => (
  <section className="bg-card px-4 py-20">
    <motion.div
      className="mx-auto max-w-2xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
    >
      <motion.h3 variants={fadeUp} className="font-display text-2xl font-bold text-foreground md:text-3xl">
        Not Sure Where to Begin?
      </motion.h3>
      <motion.p variants={fadeUp} className="mt-4 text-muted-foreground leading-relaxed">
        Start with a free Welcome Circle membership. Explore the Temple, get to know our community, and feel if this space resonates with your spirit · no commitment required.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-8">
        <Link
          to="/membership"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
        >
          Join the Welcome Circle <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </motion.div>
  </section>
);

export default BlueprintFooterCTA;
