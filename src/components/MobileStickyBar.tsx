import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MobileStickyBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden bg-foreground/95 backdrop-blur-md border-t border-primary/20 px-4 py-3 safe-area-pb"
        >
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            <Link
              to="/ceremony-intake"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 shadow-lg"
            >
              Begin Your Journey <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://www.eventbrite.com/o/temple-of-mother-earth-29347213477"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl border border-primary-foreground/30 px-4 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/20"
            >
              Offerings
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyBar;
