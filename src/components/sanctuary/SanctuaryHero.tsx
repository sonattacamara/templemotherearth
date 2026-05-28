import { motion, type Easing } from "framer-motion";
import { Helmet } from "react-helmet-async";
import EventbriteCheckout from "@/components/EventbriteCheckout";
import EventbriteLiveMeta from "@/components/EventbriteLiveMeta";
import { extractEventbriteId } from "@/hooks/useEventbriteEvent";

interface SanctuaryHeroProps {
  dateBadge?: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  lead: string;
  primaryCTA: { label: string; href: string; external?: boolean };
  secondaryCTA?: { label: string; href: string };
  backgroundImage?: string;
  backgroundVideo?: string;
  videoPoster?: string;
}

const ease: Easing = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const SanctuaryHero = ({
  dateBadge,
  eyebrow,
  title,
  subtitle,
  lead,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  backgroundVideo,
  videoPoster,
}: SanctuaryHeroProps) => (
  <section className="relative isolate min-h-[92vh] flex flex-col justify-end px-6 md:px-12 py-16 md:py-20 overflow-hidden bg-[hsl(100,20%,5%)]">
    {backgroundVideo && (
      <>
        <Helmet>
          <link rel="preload" as="video" href={backgroundVideo} type="video/mp4" />
        </Helmet>
        <video
          src={backgroundVideo}
          poster={videoPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover saturate-[0.9] -z-10"
          onError={(e) => console.error("Hero video failed to load", e)}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[hsla(100,20%,5%,0.25)] via-[hsla(100,20%,5%,0.45)] to-[hsla(100,20%,5%,0.9)]" />
      </>
    )}
    {backgroundImage && (
      <>
        <img
          src={backgroundImage}
          alt="Sacred ceremony sanctuary for Kambo, Cacao, and Hapé healing rituals at Temple Mother Earth"
          className="absolute inset-0 w-full h-full object-cover saturate-[0.7] -z-10"
          loading="eager"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[hsla(100,20%,5%,0.3)] via-[hsla(100,20%,5%,0.6)] to-[hsla(100,20%,5%,0.92)]" />
      </>
    )}

    {dateBadge && (
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="inline-block self-start mb-8"
      >
        <span className="bg-[hsl(45,70%,49%)] text-[hsl(100,20%,5%)] font-sans text-[9px] tracking-[3px] uppercase px-5 py-2 font-bold">
          {dateBadge}
        </span>
      </motion.div>
    )}

    <motion.p
      custom={1}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="font-sans text-[9px] tracking-[4px] uppercase text-[hsl(45,70%,49%)] mb-5"
    >
      {eyebrow}
    </motion.p>

    <motion.h1
      custom={2}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="font-sans text-[clamp(36px,6vw,80px)] font-light leading-[1.05] text-[hsl(40,30%,90%)] mb-7 max-w-[800px]"
    >
      {title}
    </motion.h1>

    <motion.p
      custom={3}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-[clamp(18px,2vw,22px)] text-[hsl(40,24%,78%)] max-w-[620px] mb-12 leading-relaxed font-serif"
    >
      {lead}
    </motion.p>

    {(() => {
      const ebId = extractEventbriteId(primaryCTA.href);
      return (
        <>
          {ebId && (
            <motion.div
              custom={3.5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <EventbriteLiveMeta eventId={ebId} />
            </motion.div>
          )}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex gap-4 flex-wrap items-center"
          >
            {ebId ? (
              <EventbriteCheckout
                eventId={ebId}
                label={primaryCTA.label}
                fallbackUrl={primaryCTA.href}
                className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(100,20%,5%)] font-bold hover:bg-[hsl(45,70%,58%)] transition-all duration-300"
              />
            ) : (
              <a
                href={primaryCTA.href}
                target={primaryCTA.external ? "_blank" : undefined}
                rel={primaryCTA.external ? "noopener noreferrer" : undefined}
                className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-[hsl(45,70%,49%)] text-[hsl(100,20%,5%)] font-bold hover:bg-[hsl(45,70%,58%)] transition-all duration-300"
              >
                {primaryCTA.label}
              </a>
            )}
            {secondaryCTA && (
              <a
                href={secondaryCTA.href}
                className="inline-block font-sans text-[9px] tracking-[3px] uppercase px-10 py-4 bg-transparent border border-[hsl(40,30%,70%)] text-[hsl(40,30%,90%)] hover:bg-[hsla(40,30%,90%,0.1)] hover:border-[hsl(45,70%,49%)] transition-all duration-300"
              >
                {secondaryCTA.label}
              </a>
            )}
          </motion.div>
        </>
      );
    })()}
  </section>
);

export default SanctuaryHero;
