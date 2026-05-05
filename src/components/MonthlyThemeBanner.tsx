import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout, Flame, Sun, Crown, Users, Wheat, Moon, Sparkles, Heart, Snowflake } from "lucide-react";

const THEMES = [
  { month: 3, label: "March", theme: "The Planting", icon: Sprout },
  { month: 4, label: "April", theme: "The Awakening", icon: Flame },
  { month: 5, label: "May", theme: "The Remembrance", icon: Heart },
  { month: 6, label: "June", theme: "The Sovereignty", icon: Crown },
  { month: 7, label: "July", theme: "The Belonging", icon: Users },
  { month: 8, label: "August", theme: "The Harvest", icon: Wheat },
  { month: 9, label: "September", theme: "The Threshold", icon: Moon },
  { month: 10, label: "October", theme: "The Ancestors", icon: Sparkles },
  { month: 11, label: "November", theme: "The Gratitude", icon: Sun },
  { month: 12, label: "December", theme: "The Surrender", icon: Snowflake },
];

const MonthlyThemeBanner = () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const theme = THEMES.find((t) => t.month === currentMonth) || THEMES[0];
  const Icon = theme.icon;

  return (
    <section className="px-4 py-8">
      <motion.div
        className="mx-auto max-w-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/sacred-series"
          className="group block rounded-2xl border border-primary/20 bg-card p-6 md:p-8 text-center transition-all hover:border-primary/40 hover:shadow-lg"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Icon className="h-5 w-5 text-primary" />
            <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-primary">
              {theme.label} · Sacred Theme
            </span>
          </div>
          <h3 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            {theme.theme}
          </h3>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
            Each month carries an intention that weaves through every ceremony, gathering, and practice.
            Explore this month's sacred offerings.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
            View Sacred Series →
          </span>
        </Link>
      </motion.div>
    </section>
  );
};

export default MonthlyThemeBanner;
