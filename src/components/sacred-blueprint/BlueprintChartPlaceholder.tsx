import { motion, type Easing } from "framer-motion";
import { Sparkles } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const BlueprintChartPlaceholder = () => (
  <section className="px-4 py-20">
    <motion.div
      className="mx-auto max-w-3xl text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-card/60 p-12 md:p-20">
        <Sparkles className="mx-auto h-12 w-12 text-primary/40 mb-4" />
        <h3 className="font-display text-xl font-bold text-foreground">Your Chart Will Appear Here</h3>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          After submitting your birth data above, your personalized Human Design chart will be displayed in this space via the MyBodyGraph widget.
        </p>
      </div>
    </motion.div>
  </section>
);

export default BlueprintChartPlaceholder;
