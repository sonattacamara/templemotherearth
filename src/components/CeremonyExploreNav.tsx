import { motion, type Easing } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Heart, Leaf, Flame, Globe, Users, Sun, Sparkles, Coffee, Crown } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const ceremonies = [
  { path: "/cacao", label: "Cacao Ceremony", icon: Heart, kingdom: "Plant Kingdom" },
  { path: "/hape", label: "Hapé Ceremony", icon: Leaf, kingdom: "Plant Kingdom" },
  { path: "/kambo", label: "Kambo Ceremony", icon: Flame, kingdom: "Animal Kingdom" },
  { path: "/sacred-tea", label: "Sacred Tea Ceremony", icon: Coffee, kingdom: "Plant Kingdom" },
  { path: "/level5", label: "Level 5 Ceremony", icon: Crown, kingdom: "Sacred Practice" },
  { path: "/private-ceremonies", label: "Private Ceremonies", icon: Sparkles, kingdom: "1-on-1" },
  { path: "/traveling-ceremonies", label: "Traveling Ceremonies", icon: Users, kingdom: "Community" },
  { path: "/retreats-inquiry", label: "International Immersions", icon: Globe, kingdom: "Global" },
  { path: "/preparation", label: "Preparation Guide", icon: Sun, kingdom: "Resource" },
];

interface CeremonyExploreNavProps {
  /** "light" for light-bg pages, "dark" for dark sanctuary pages */
  variant?: "light" | "dark";
}

const CeremonyExploreNav = ({ variant = "light" }: CeremonyExploreNavProps) => {
  const { pathname } = useLocation();
  const others = ceremonies.filter((c) => c.path !== pathname);

  const isDark = variant === "dark";

  return (
    <section className={`px-4 py-14 md:py-20 ${isDark ? "bg-[hsl(105,30%,8%)]" : "bg-card"}`}>
      <motion.div
        className="mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-10">
          <p className={`font-body text-xs font-bold uppercase tracking-[0.3em] mb-3 ${isDark ? "text-[hsl(45,70%,49%)]" : "text-primary"}`}>
            Continue Your Journey
          </p>
          <h2 className={`font-display text-2xl font-semibold md:text-3xl ${isDark ? "text-[hsl(40,30%,90%)]" : "text-foreground"}`}>
            Explore More Sacred Experiences
          </h2>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c) => (
            <motion.div key={c.path} variants={fadeUp}>
              <Link
                to={c.path}
                className={`group flex items-start gap-3 rounded-xl border p-4 transition-all hover:shadow-lg ${
                  isDark
                    ? "border-[hsl(100,25%,18%)] bg-[hsl(105,30%,12%)] hover:border-[hsl(45,50%,35%)]"
                    : "border-border bg-background hover:border-primary/30"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isDark
                    ? "bg-[hsla(45,70%,49%,0.1)] group-hover:bg-[hsla(45,70%,49%,0.2)]"
                    : "bg-primary/10 group-hover:bg-primary/20"
                }`}>
                  <c.icon className={`h-4.5 w-4.5 ${isDark ? "text-[hsl(45,70%,49%)]" : "text-primary"}`} />
                </div>
                <div className="min-w-0">
                  <p className={`font-display text-sm font-semibold leading-tight ${isDark ? "text-[hsl(40,30%,90%)]" : "text-foreground"}`}>
                    {c.label}
                  </p>
                  <p className={`mt-0.5 text-xs ${isDark ? "text-[hsl(35,20%,42%)]" : "text-muted-foreground"}`}>
                    {c.kingdom}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CeremonyExploreNav;
