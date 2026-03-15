import { motion, type Easing } from "framer-motion";
import { HandHeart, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ease: Easing = [0.25, 0.1, 0.25, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

interface DonateHeroSplitProps {
  heroImage: string;
  tagline: string;
  heading: string;
  description: string;
  taxNote: string;
  donateUrl: string;
  buttonLabel: string;
  buttonIcon?: LucideIcon;
}

const DonateHeroSplit = ({
  heroImage,
  tagline,
  heading,
  description,
  taxNote,
  donateUrl,
  buttonLabel,
  buttonIcon: ButtonIcon = HandHeart,
}: DonateHeroSplitProps) => {
  return (
    <section className="relative min-h-screen pt-20">
      <div className="flex min-h-[calc(100vh-5rem)] flex-col lg:flex-row">
        {/* Left: Content */}
        <motion.div
          className="flex flex-1 flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 xl:px-24"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs uppercase tracking-[0.3em] text-primary"
          >
            {tagline}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {heading}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-lg font-body text-base leading-relaxed text-muted-foreground"
          >
            {description}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-lg font-body text-sm leading-relaxed text-muted-foreground/80"
          >
            {taxNote}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10">
            <a
              href={donateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-10 py-4 font-body text-base font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80 hover:shadow-xl"
            >
              <ButtonIcon className="h-5 w-5" />
              {buttonLabel}
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Image */}
        <div className="relative flex-1 min-h-[40vh] lg:min-h-0">
          <img
            src={heroImage}
            alt="Sacred ceremony church for Kambo, Ayahuasca, and Cacao ceremonies at Temple Mother Earth"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-foreground/20" />
        </div>
      </div>
    </section>
  );
};

export default DonateHeroSplit;
