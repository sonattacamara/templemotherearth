import { motion, type Easing } from "framer-motion";
import { BookOpen, Sparkles, Clock, Video } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const readings = [
  {
    icon: BookOpen,
    name: "Foundational Reading",
    price: "$222",
    duration: "90 min via Zoom",
    description:
      "For those brand new to Human Design. Covers: Energy Type, Strategy, Authority, defined/undefined centers, innate gifts, conditioning patterns. Connects their design to their healing path and ceremony readiness.",
    bookingUrl: "https://link.convertandflow.com/widget/booking/uWDZdZasRYtT05b9PobB",
  },
  {
    icon: Sparkles,
    name: "Integration Reading",
    price: "$333",
    duration: "90 min via Zoom",
    description:
      "For those who have already explored their chart. Weaves together self-study with intuitive insights, Gene Keys contemplations, Venus Sequence, and ceremony alignment. Moves from information to embodiment.",
    bookingUrl: "https://link.convertandflow.com/widget/booking/tLjqigCpxx9zf0Krjj4y",
  },
];

const BlueprintReadings = () => (
  <section className="bg-card px-4 py-20">
    <motion.div
      className="mx-auto max-w-4xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
    >
      <motion.h2 variants={fadeUp} className="text-center font-display text-2xl font-bold text-foreground md:text-3xl">
        Book a Sacred Blueprint Reading
      </motion.h2>
      <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
        Your chart is just the beginning. A Sacred Blueprint Reading with Sonatta Camara, PhD goes deep — connecting your Human Design to your healing journey, your medicine path, and your next sacred step. All sessions are 90 minutes via Zoom.
      </motion.p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {readings.map((r) => (
          <motion.div key={r.name} variants={fadeUp} className="flex flex-col rounded-2xl border border-border bg-background p-8 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <r.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">{r.name}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="font-display text-2xl font-bold text-primary">{r.price}</span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> {r.duration}
              </span>
            </div>
            <p className="mt-4 flex-1 text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground/70">
              <Video className="h-3.5 w-3.5" /> Session recorded &amp; sent within 24 hours
            </div>
            <a
              href={r.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-xl bg-primary py-3.5 text-center font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
            >
              Book Your Reading →
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default BlueprintReadings;
