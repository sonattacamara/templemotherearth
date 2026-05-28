import { Link } from "react-router-dom";

interface MidImageBannerProps {
  image: string;
  eyebrow?: string;
  headline: React.ReactNode;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  align?: "left" | "center";
}

const MidImageBanner = ({
  image,
  eyebrow,
  headline,
  body,
  ctaLabel,
  ctaHref,
  align = "center",
}: MidImageBannerProps) => {
  const isExternal = ctaHref?.startsWith("http");
  const alignCls = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="relative w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${image})`, minHeight: "clamp(380px, 60vh, 640px)" }}
      >
        <div className="absolute inset-0 bg-foreground/55" />
        <div className={`relative z-10 mx-auto flex max-w-4xl flex-col justify-center px-6 py-24 ${alignCls}`} style={{ minHeight: "clamp(380px, 60vh, 640px)" }}>
          {eyebrow && (
            <p className="font-body text-[11px] uppercase tracking-[0.3em] text-primary mb-4">
              {eyebrow}
            </p>
          )}
          <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground leading-tight">
            {headline}
          </h2>
          {body && (
            <p className="mt-6 max-w-2xl font-body text-base md:text-lg text-primary-foreground/85 leading-relaxed">
              {body}
            </p>
          )}
          {ctaLabel && ctaHref && (
            <div className="mt-8">
              {isExternal ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/80"
                >
                  {ctaLabel}
                </a>
              ) : (
                <Link
                  to={ctaHref}
                  className="inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-primary/80"
                >
                  {ctaLabel}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MidImageBanner;