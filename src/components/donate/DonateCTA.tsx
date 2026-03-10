import { motion } from "framer-motion";
import { HandHeart, ArrowRight, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DonateCTAProps {
  tagline: string;
  heading: string;
  body: string;
  donateUrl: string;
  buttonLabel: string;
  buttonIcon?: LucideIcon;
  onDisclosure?: () => void;
}

const DonateCTA = ({
  tagline,
  heading,
  body,
  donateUrl,
  buttonLabel,
  buttonIcon: ButtonIcon = HandHeart,
  onDisclosure,
}: DonateCTAProps) => {
  return (
    <section className="bg-card px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">{tagline}</p>
        <h2 className="mt-4 font-display text-2xl font-bold text-card-foreground md:text-4xl">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={donateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
          >
            <ButtonIcon className="h-4 w-4" />
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </a>

          {onDisclosure && (
            <button
              onClick={onDisclosure}
              className="inline-flex items-center gap-1.5 font-body text-xs text-muted-foreground/60 transition hover:text-muted-foreground"
              aria-label="View donation transparency disclosure"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              How your offering is used
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default DonateCTA;
