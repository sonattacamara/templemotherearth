import { Link } from "react-router-dom";
import EventbriteCheckout from "@/components/EventbriteCheckout";
import EventbriteLiveMeta from "@/components/EventbriteLiveMeta";
import { extractEventbriteId } from "@/hooks/useEventbriteEvent";

interface FooterVideoBannerProps {
  video: string;
  poster?: string;
  eyebrow?: string;
  headline: React.ReactNode;
  body?: string;
  ctaLabel: string;
  ctaHref: string;
  /** CSS object-position for the background video (e.g. "center 75%"). */
  videoObjectPosition?: string;
}

const FooterVideoBanner = ({
  video,
  poster,
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  videoObjectPosition,
}: FooterVideoBannerProps) => {
  const ebId = extractEventbriteId(ctaHref);
  const isExternal = ctaHref.startsWith("http");

  return (
    <section className="relative w-full overflow-hidden bg-foreground">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        style={videoObjectPosition ? { objectPosition: videoObjectPosition } : undefined}
        src={video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
      <div className="absolute inset-0 bg-foreground/65" />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-28 text-center" style={{ minHeight: "clamp(420px, 70vh, 720px)" }}>
        {eyebrow && (
          <p className="font-body text-[11px] uppercase tracking-[0.35em] text-primary mb-5">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
          {headline}
        </h2>
        {body && (
          <p className="mt-6 max-w-2xl font-body text-base md:text-lg text-primary-foreground/85 leading-relaxed">
            {body}
          </p>
        )}
        {ebId && (
          <div className="mt-8">
            <EventbriteLiveMeta
              eventId={ebId}
              className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-body text-[11px] uppercase tracking-[0.3em] text-primary-foreground/70"
            />
          </div>
        )}
        <div className="mt-10">
          {ebId ? (
            <EventbriteCheckout
              eventId={ebId}
              label={ctaLabel}
              fallbackUrl={ctaHref}
              className="inline-block rounded-xl bg-primary px-10 py-4 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/80"
            />
          ) : isExternal ? (
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-primary px-10 py-4 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/80"
            >
              {ctaLabel}
            </a>
          ) : (
            <Link
              to={ctaHref}
              className="inline-block rounded-xl bg-primary px-10 py-4 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/80"
            >
              {ctaLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FooterVideoBanner;