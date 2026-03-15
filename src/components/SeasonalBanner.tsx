import { useState } from "react";
import { X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CACAO_EVENTBRITE = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

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
          <span className="text-lg" aria-hidden="true">🌿</span>
          <p className="font-body text-sm md:text-base text-primary-foreground/90">
            <span className="font-semibold text-primary-foreground">Our First Cacao Ceremony of 2026 is this Wednesday!</span>
            <span className="hidden sm:inline"> We would love to see our community back in the circle.</span>
          </p>
          <a
            href={CACAO_EVENTBRITE}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/80 flex items-center gap-1.5"
          >
            <Heart className="h-3 w-3" />
            Register Now
          </a>

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
