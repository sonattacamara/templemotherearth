import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import logo from "@/assets/logo.png";

interface ImmersionPlaceholderProps {
  name: string;
  region: string;
  futureSubdomain: string;
  description: string;
  path: string;
  poetic: string;
  dates?: string;
  ctaHref?: string;
  ctaLabel?: string;
  ctaExternal?: boolean;
}

const ImmersionPlaceholder = ({
  name,
  region,
  futureSubdomain,
  description,
  path,
  poetic,
  dates = "Dates opening soon",
  ctaHref = "/retreats-inquiry",
  ctaLabel = "Join the Waitlist",
  ctaExternal = false,
}: ImmersionPlaceholderProps) => {
  const eventJsonLd =
    dates && dates !== "Dates opening soon"
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: `${name} Sacred Immersion · Temple Mother Earth`,
          description,
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          location: { "@type": "Place", name: region, address: region },
          organizer: {
            "@type": "Organization",
            name: "Temple Mother Earth",
            url: "https://templemotherearth.org",
          },
          url: `https://templemotherearth.org${path}`,
          image: "https://templemotherearth.org/og-logo.png",
        }
      : null;
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${name} Sacred Immersion | Temple Mother Earth`}
        description={`${description} Sacred earth-medicine immersion in ${region}.`}
        path={path}
      />
      {eventJsonLd && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(eventJsonLd)}</script>
        </Helmet>
      )}
      <Navigation />
      <section className="relative px-4 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <img
            src={logo}
            alt="Temple Mother Earth"
            className="mx-auto mb-6 h-20 w-20 rounded-full object-cover shadow-lg ring-2 ring-primary/30"
          />
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs uppercase tracking-widest text-primary">
            <MapPin className="h-3.5 w-3.5" /> {region}
          </div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">{dates}</p>
          <h1 className="font-display text-4xl font-bold text-foreground md:text-6xl">
            {name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg italic text-muted-foreground">
            {poetic}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/80">
            {description}
          </p>

          <div className="mt-10 rounded-2xl border border-primary/20 bg-card p-8">
            <Sparkles className="mx-auto h-8 w-8 text-primary" />
            <h2 className="mt-4 font-display text-2xl font-semibold text-card-foreground">
              Sacred Doors Are Opening
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              This immersion is being prepared with deep intention. Join the waitlist
              and you will be the first to know when the doors open.
            </p>
            <p className="mt-3 text-xs text-muted-foreground/70">
              Future home: <span className="font-mono text-primary/80">{futureSubdomain}</span>
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {ctaExternal ? (
                <a
                  href={ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
                >
                  {ctaLabel} <ArrowRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  to={ctaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
                >
                  {ctaLabel} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-input px-7 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
              >
                Ask Us a Question
              </Link>
            </div>
          </div>

          <div className="mt-10 text-sm text-muted-foreground">
            Explore other sacred journeys:
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {[
                { label: "Costa Rica", href: "/immersions/costa-rica" },
                { label: "Panama", href: "/immersions/panama" },
                { label: "Sayulita, Mexico", href: "/immersions/sayulita" },
                { label: "Ecuador", href: "/immersions/ecuador" },
                { label: "Egypt", href: "/immersions/egypt" },
                { label: "Peru", href: "/immersions/peru" },
              ]
                .filter((l) => l.href !== path)
                .map((l) => (
                  <Link
                    key={l.href}
                    to={l.href}
                    className="rounded-full border border-primary/30 px-4 py-1.5 text-xs text-foreground transition hover:bg-primary/10"
                  >
                    {l.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ImmersionPlaceholder;