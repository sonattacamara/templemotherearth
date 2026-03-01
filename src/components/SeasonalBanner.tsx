import { useState } from "react";
import { X, Sprout, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const SeasonalBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      await supabase.functions.invoke("submit-newsletter", {
        body: { email, source: "seasonal-banner" },
      });
      setSubscribed(true);
      toast.success("Welcome! You'll be the first to know when ceremonies resume.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
        <div className="mx-auto max-w-7xl flex flex-col items-center gap-2 px-4 py-3 text-center relative">
          <div className="flex items-center gap-3">
            <Sprout className="h-4 w-4 text-secondary shrink-0 animate-pulse" />
            <p className="font-body text-sm md:text-base text-primary-foreground/80">
              <span className="font-semibold text-primary-foreground">The Spring Equinox Has Arrived</span>
              <span className="hidden sm:inline"> — Ceremonies are returning. Welcome home.</span>
              <span className="sm:hidden"> — We're back.</span>
              {" "}
              🌿
            </p>
          </div>

          {subscribed ? (
            <p className="font-body text-xs text-secondary font-semibold">
              ✓ You're on the list — we'll share upcoming Spring ceremonies soon.
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-1">
              <input
                type="email"
                required
                placeholder="Enter your email for Spring ceremonies"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 px-3 py-1.5 text-xs text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary w-56 sm:w-64"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:bg-primary/80 disabled:opacity-50 flex items-center gap-1"
              >
                <Send className="h-3 w-3" />
                <span className="hidden sm:inline">Notify Me</span>
              </button>
            </form>
          )}

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute right-3 top-3 p-1.5 rounded-full text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SeasonalBanner;
