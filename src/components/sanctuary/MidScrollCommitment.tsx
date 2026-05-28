import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface MidScrollCommitmentProps {
  /** Eyebrow above the headline */
  eyebrow?: string;
  /** Bold mirror headline · this is the avatar's recognition moment */
  headline: React.ReactNode;
  /** One or two short paragraphs of mirror prose */
  body: React.ReactNode;
  /** Primary CTA */
  ctaLabel: string;
  /** Internal route or external href */
  ctaHref: string;
  /** Whether the CTA is an external link */
  external?: boolean;
  /** Optional secondary CTA */
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  /** Small reassurance line below the CTAs */
  reassurance?: string;
}

/**
 * MidScrollCommitment
 *
 * A quiet mirror block dropped mid-page · after the avatar has read enough
 * to feel seen, and before they scroll past the moment of recognition.
 * The copy is always spiritual, never transactional, and always written so
 * the avatar feels addressed by name.
 */
const MidScrollCommitment = ({
  eyebrow = "A Quiet Pause",
  headline,
  body,
  ctaLabel,
  ctaHref,
  external = false,
  secondaryCtaLabel,
  secondaryCtaHref,
  reassurance,
}: MidScrollCommitmentProps) => {
  const PrimaryCta = external ? (
    <a
      href={ctaHref}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition hover:bg-primary/90 hover:gap-3"
    >
      {ctaLabel} <ArrowRight className="h-4 w-4" />
    </a>
  ) : (
    <Link
      to={ctaHref}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-lg transition hover:bg-primary/90 hover:gap-3"
    >
      {ctaLabel} <ArrowRight className="h-4 w-4" />
    </Link>
  );

  return (
    <section className="relative px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto max-w-[760px]">
        <div className="rounded-2xl border border-primary/30 bg-primary/[0.06] p-8 text-center backdrop-blur md:p-12">
          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.35em] text-primary">{eyebrow}</p>
          <h2 className="mt-4 font-display text-2xl font-light leading-tight text-foreground md:text-4xl">
            {headline}
          </h2>
          <div className="mx-auto mt-5 max-w-[620px] space-y-4 font-serif text-base leading-relaxed text-foreground/85 md:text-lg">
            {body}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {PrimaryCta}
            {secondaryCtaLabel && secondaryCtaHref && (
              <Link
                to={secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/50 px-7 py-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary/10"
              >
                {secondaryCtaLabel}
              </Link>
            )}
          </div>

          {reassurance && (
            <p className="mt-5 font-serif text-xs italic text-foreground/60">{reassurance}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MidScrollCommitment;