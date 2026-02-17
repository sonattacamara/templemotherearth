import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X, MessageCircle, Heart } from "lucide-react";

const resources = [
  {
    label: "988 Suicide & Crisis Lifeline",
    action: "Call or Text 988",
    href: "tel:988",
    icon: Phone,
    description: "24/7 free & confidential support",
  },
  {
    label: "Crisis Text Line",
    action: "Text HOME to 741741",
    href: "sms:741741?body=HOME",
    icon: MessageCircle,
    description: "Free 24/7 text-based support",
  },
  {
    label: "Veterans Crisis Line",
    action: "Dial 988, Press 1",
    href: "tel:988",
    icon: Heart,
    description: "Or text 838255 · Chat at VeteransCrisisLine.net",
  },
];

const CrisisFloatingButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-40 right-6 z-50 flex flex-col items-end gap-3 lg:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-80 rounded-2xl border border-destructive/30 bg-card shadow-2xl overflow-hidden"
          >
            <div className="bg-destructive/10 border-b border-destructive/20 px-5 py-4">
              <h3 className="font-display text-base font-bold text-foreground">
                Need Immediate Support?
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                You are not alone. Free, confidential help is available 24/7.
              </p>
            </div>
            <div className="divide-y divide-border">
              {resources.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-accent/50"
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <r.icon className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">{r.label}</p>
                    <p className="text-sm font-bold text-destructive">{r.action}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{r.description}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="bg-muted/50 px-5 py-3">
              <a
                href="https://988lifeline.org/chat/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-primary hover:underline"
              >
                Chat online at 988lifeline.org →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close crisis resources" : "Crisis support resources"}
        className={`flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          open
            ? "bg-muted text-muted-foreground hover:bg-muted/80"
            : "bg-destructive text-destructive-foreground hover:bg-destructive/90 animate-pulse hover:animate-none"
        }`}
      >
        {open ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default CrisisFloatingButton;
