import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const KamboTeaserModal = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("kambo-teaser-dismissed")) return;
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("kambo-teaser-dismissed", "1");
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-x-4 top-[50%] z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl border border-primary/20 bg-foreground p-6 text-center shadow-2xl sm:inset-x-auto"
          >
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-1.5 text-primary-foreground/50 transition-colors hover:bg-primary/10 hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-primary mb-2">
              Sacred Sacrament Awaits
            </p>

            <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
              Ready for a deep reset?
            </h2>

            <p className="mt-4 font-body text-sm leading-relaxed text-primary-foreground/70">
              Kambo is the ancient purification sacrament that clears what years of trying couldn't touch.
              Intimate ceremonies held by King James in Washington DC.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/kambo"
                onClick={dismiss}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
              >
                Explore Kambo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ceremony-intake"
                onClick={dismiss}
                className="inline-flex items-center justify-center rounded-xl border border-primary-foreground/30 px-6 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/10"
              >
                Book a Ceremony
              </Link>
            </div>

            <p className="mt-4 font-body text-xs text-primary-foreground/40">
              Free consultation included • Groups of 6–8
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KamboTeaserModal;
