import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Flame, Leaf, Eye, Users, HandHeart, Compass } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/**
 * ThreadOpener
 *
 * A quiet, once-per-session mirror modal that asks "what called you here"
 * and opens a thread of contact with the Temple. Triggered after a soft
 * dwell of ~30 seconds, or on first sign of leaving the page (mouse moving
 * toward the browser chrome on desktop). Never appears more than once per
 * session, never appears on private or transactional routes, and never
 * blocks the avatar from scrolling.
 *
 * Language is spiritual NLP only · no business or transactional words.
 * The avatar always sees themselves in the choices.
 */

const SUPPRESSED_PATH_PREFIXES = [
  "/contact",
  "/ceremony-intake",
  "/intake",
  "/member/auth",
  "/member/education",
  "/portal",
  "/admin",
  "/reset-password",
  "/donation-success",
  "/donation-canceled",
  "/donate",
  "/webhook-checklist",
  "/analytics",
];

const STORAGE_KEY = "tme:thread-opener:v1";
const DWELL_MS = 30_000;
const MIN_SUBMIT_MS = 3_000; // bot prevention

type Calling =
  | "purification"
  | "stillness"
  | "ceremony"
  | "community"
  | "guidance"
  | "still-listening";

interface CallingOption {
  value: Calling;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OPTIONS: CallingOption[] = [
  { value: "purification", label: "I'm carrying something that needs to move", icon: Flame },
  { value: "stillness", label: "My body is asking me to finally rest", icon: Leaf },
  { value: "ceremony", label: "I'm being called to sit in ceremony", icon: Eye },
  { value: "community", label: "I'm looking for my people", icon: Users },
  { value: "guidance", label: "I want a guide who can hear me one to one", icon: HandHeart },
  { value: "still-listening", label: "I'm still listening · I just want to stay close", icon: Compass },
];

const ThreadOpener = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [calling, setCalling] = useState<Calling | "">("");
  const [website, setWebsite] = useState(""); // honeypot

  const openedAtRef = useRef<number>(0);
  const triggeredRef = useRef(false);

  // Decide whether the opener should be allowed to fire on this route
  const allowedHere = !SUPPRESSED_PATH_PREFIXES.some((p) => location.pathname.startsWith(p));

  useEffect(() => {
    if (!allowedHere) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "shown") return;
    if (triggeredRef.current) return;

    const trigger = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      sessionStorage.setItem(STORAGE_KEY, "shown");
      openedAtRef.current = Date.now();
      setOpen(true);
    };

    const dwellTimer = window.setTimeout(trigger, DWELL_MS);

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(dwellTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [allowedHere]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (website) return; // honeypot tripped · silently drop
    if (Date.now() - openedAtRef.current < MIN_SUBMIT_MS) {
      setError("Take one slow breath, then try again.");
      return;
    }
    const trimmedEmail = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter the email where we can reach you.");
      return;
    }

    setSubmitting(true);
    try {
      const { error: fnError } = await supabase.functions.invoke("submit-newsletter", {
        body: {
          email: trimmedEmail,
          firstName: firstName.trim() || undefined,
          calling: calling || undefined,
          source: "thread-opener",
        },
      });
      if (fnError) throw fnError;
      setDone(true);
    } catch (err) {
      console.warn("ThreadOpener submit failed", err);
      setError("Something didn't move through. Try once more in a breath.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="thread-opener"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/70 px-4 py-6 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="thread-opener-title"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg rounded-2xl border border-primary/30 bg-background p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full p-2 text-foreground/50 transition hover:bg-primary/10 hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>

            {!done ? (
              <>
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
                  A Quiet Question
                </p>
                <h2
                  id="thread-opener-title"
                  className="mt-3 font-display text-2xl font-light leading-tight text-foreground sm:text-3xl"
                >
                  What called you <em className="font-serif italic text-primary">here?</em>
                </h2>
                <p className="mt-3 font-serif text-sm leading-relaxed text-foreground/75 sm:text-base">
                  Choose the one that feels closest to true. We'll send a quiet thread of transmissions · prayers, reflections, and the next gentle door · so the path stays lit until you're ready to walk through.
                </p>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
                  <div className="grid grid-cols-1 gap-2">
                    {OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const selected = calling === opt.value;
                      return (
                        <label
                          key={opt.value}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 text-left transition ${
                            selected
                              ? "border-primary bg-primary/10"
                              : "border-primary/15 bg-card/50 hover:border-primary/40 hover:bg-card"
                          }`}
                        >
                          <input
                            type="radio"
                            name="calling"
                            value={opt.value}
                            checked={selected}
                            onChange={() => setCalling(opt.value)}
                            className="sr-only"
                          />
                          <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${selected ? "text-primary" : "text-primary/60"}`} />
                          <span className="font-serif text-sm leading-snug text-foreground/90">
                            {opt.label}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <label className="block">
                      <span className="sr-only">First name</span>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        maxLength={80}
                        placeholder="First name (optional)"
                        autoComplete="given-name"
                        className="w-full rounded-lg border border-primary/20 bg-card/60 px-3 py-2.5 font-serif text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
                      />
                    </label>
                    <label className="block">
                      <span className="sr-only">Email</span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        maxLength={255}
                        placeholder="The email we can reach you at"
                        autoComplete="email"
                        className="w-full rounded-lg border border-primary/20 bg-card/60 px-3 py-2.5 font-serif text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none"
                      />
                    </label>
                  </div>

                  {/* Honeypot · hidden from real avatars */}
                  <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </label>
                  </div>

                  {error && (
                    <p className="font-serif text-xs text-destructive" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl bg-primary px-6 py-3 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition hover:bg-primary/90 disabled:opacity-50"
                  >
                    {submitting ? "Opening the thread…" : "Open the thread"}
                  </button>
                  <p className="font-serif text-[11px] italic text-foreground/55">
                    One quiet thread of transmissions. Unsubscribe any time the wind shifts.
                  </p>
                </form>
              </>
            ) : (
              <div className="py-4 text-center">
                <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">
                  The Thread Is Open
                </p>
                <h2 className="mt-3 font-display text-2xl font-light leading-tight text-foreground sm:text-3xl">
                  We hear you, <em className="font-serif italic text-primary">{firstName.trim() || "beloved"}</em>.
                </h2>
                <p className="mx-auto mt-4 max-w-sm font-serif text-sm leading-relaxed text-foreground/80 sm:text-base">
                  A first transmission is on its way to your inbox. The Temple keeps the doorway lit · walk through whenever you're ready.
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-6 inline-flex items-center justify-center rounded-xl border border-primary/40 px-6 py-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary/10"
                >
                  Return to the page
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThreadOpener;