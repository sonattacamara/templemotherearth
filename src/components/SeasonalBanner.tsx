import { useState } from "react";
import { X, Snowflake, Sprout } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SeasonalBanner = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-[57px] left-0 right-0 z-40 bg-foreground border-b border-primary/20 shadow-lg"
      >
        <div className="mx-auto max-w-7xl flex items-center justify-center gap-3 px-4 py-3 text-center relative">
          <Snowflake className="h-4 w-4 text-accent shrink-0 animate-pulse" />
          <p className="font-body text-sm md:text-base text-primary-foreground/80">
            <span className="font-semibold text-primary-foreground">Honoring the Winter Solstice</span>
            <span className="hidden sm:inline"> — We are in sacred rest, honoring the cycle of Mother Earth.</span>
            <span className="sm:hidden"> — Sacred rest until Spring.</span>
            {" "}
            <span className="inline-flex items-center gap-1">
              <Sprout className="inline h-4 w-4 text-secondary" />
              <span className="font-semibold text-secondary">Ceremonies resume at the Spring Equinox.</span>
            </span>
          </p>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SeasonalBanner;
