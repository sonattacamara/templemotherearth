import { useState } from "react";
import { X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BANNER = {
  text: "Sacred Series · 7 Days of Sacred Offerings · Year Six",
  subtext: "Washington DC · Space limited · Reserve your place now",
  ctaLabel: "Reserve Your Place →",
  ctaHref: "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477",
};

const SeasonalBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-[57px] left-0 right-0 z-40 bg-foreground border-b border-primary/20 shadow-lg"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2.5 text-center sm:gap-4">
          <Heart className="h-4 w-4 shrink-0 text-primary" />
          <div className="flex flex-col items-center gap-0.5 sm:flex-row sm:gap-3">
            <span className="font-body text-xs font-semibold text-primary-foreground sm:text-sm">
              {BANNER.text}
            </span>
            <span className="hidden text-primary-foreground/40 sm:inline">·</span>
            <span className="font-body text-[10px] text-primary-foreground/60 sm:text-xs">
              {BANNER.subtext}
            </span>
          </div>
          <a
            href={BANNER.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 rounded-lg bg-primary px-4 py-1.5 font-body text-xs font-semibold text-primary-foreground transition hover:bg-primary/80 sm:inline-block"
          >
            {BANNER.ctaLabel}
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-primary-foreground/50 transition-colors hover:bg-primary/10 hover:text-primary-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SeasonalBanner;
