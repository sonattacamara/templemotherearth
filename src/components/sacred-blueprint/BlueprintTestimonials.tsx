import { motion, type Easing } from "framer-motion";
import { Star } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const testimonials = [
  {
    quote: "My Sacred Blueprint reading completely shifted how I see my healing journey. The facilitator connected my Human Design to my ceremony experience in a way that finally made everything make sense.",
    name: "Maya R., Washington DC",
  },
  {
    quote: "I came in curious about Human Design and left with a deep understanding of why I've always felt called to this kind of sacred work. This reading is unlike anything else out there.",
    name: "Marcus T., Temple Member since 2024",
  },
  {
    quote: "I had no idea Human Design could explain so much about why plant medicine hit me the way it did. The reading connected everything · my type, my authority, my ceremony experience. Life-changing.",
    name: "Denise W., Kambo + Ayahuasca Graduate",
  },
];

const BlueprintTestimonials = () => (
  <section className="px-4 py-20">
    <motion.div
      className="mx-auto max-w-3xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">
        Transformations
      </motion.h2>
      <div className="mt-12 space-y-8">
        {testimonials.map((t, i) => (
          <motion.div key={i} variants={fadeUp} className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-base text-foreground leading-relaxed italic">"{t.quote}"</p>
            <p className="mt-4 text-sm font-semibold text-muted-foreground">· {t.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default BlueprintTestimonials;
