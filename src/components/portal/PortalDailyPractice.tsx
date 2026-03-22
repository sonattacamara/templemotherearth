import { motion } from "framer-motion";
import { Sun, Moon, Flame, Wind, Droplets, Heart } from "lucide-react";

const practices = [
  {
    time: "Morning",
    icon: Sun,
    title: "Grounding Breath",
    desc: "Begin your day with 5 minutes of intentional breathwork. Place your feet on the earth if possible. Inhale for 4, hold for 4, exhale for 6.",
  },
  {
    time: "Midday",
    icon: Flame,
    title: "Sacred Pause",
    desc: "Stop, close your eyes, and place one hand on your heart. Whisper: 'I am sovereign. I am whole. I am home.' Feel the vibration of those words in your chest.",
  },
  {
    time: "Evening",
    icon: Moon,
    title: "Gratitude Offering",
    desc: "Before sleep, name 3 things you're grateful for aloud. Light a candle or burn sacred herbs. Release the day with love.",
  },
];

const weeklyFocus = [
  { day: "Monday", focus: "Intention Setting", icon: Wind },
  { day: "Wednesday", focus: "Heart Opening", icon: Heart },
  { day: "Friday", focus: "Purification", icon: Droplets },
];

const PortalDailyPractice = () => {
  return (
    <section className="bg-card border-y border-border px-4 py-14">
      <motion.div
        className="mx-auto max-w-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center font-body text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">
          Daily Practice
        </p>
        <h2 className="text-center font-display text-2xl font-semibold text-foreground md:text-3xl mb-2">
          Your Sacred Rhythm
        </h2>
        <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto mb-10">
          Integration happens between ceremonies. These simple daily practices keep you connected to your inner wisdom.
        </p>

        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {practices.map((p) => (
            <div
              key={p.time}
              className="rounded-xl border border-border bg-background p-6 text-center"
            >
              <p.icon className="mx-auto h-8 w-8 text-primary mb-3" />
              <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                {p.time}
              </p>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-primary/15 bg-background p-6">
          <p className="text-center font-body text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
            Weekly Focus Days
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {weeklyFocus.map((w) => (
              <div
                key={w.day}
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2"
              >
                <w.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">{w.day}</span>
                <span className="text-xs text-muted-foreground">· {w.focus}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PortalDailyPractice;
