import { motion } from "framer-motion";
import { Heart, X } from "lucide-react";

interface DonateDisclosureModalProps {
  open: boolean;
  onClose: () => void;
  items: string[];
}

const DonateDisclosureModal = ({ open, onClose, items }: DonateDisclosureModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-border bg-background shadow-2xl p-8"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close disclosure"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Heart className="h-6 w-6 text-primary" />
        </div>

        <h3 className="text-center font-display text-lg font-bold text-foreground">
          Transparency & Trust
        </h3>

        <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            <strong className="text-foreground">Temple Mother Earth</strong> is a registered
            501(c)(3) nonprofit organization (EIN available upon request). All offerings are
            tax-deductible to the extent allowed by law.
          </p>
          <p>Your contributions directly support:</p>
          <ul className="ml-4 list-disc space-y-1.5">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-xs opacity-60">
            Detailed financial reports are available upon request by contacting our team.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-primary px-6 py-2.5 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
        >
          Got it
        </button>
      </motion.div>
    </div>
  );
};

export default DonateDisclosureModal;
