import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface InternalLinkingFooterProps {
  heading?: string;
  links: RelatedLink[];
}

const InternalLinkingFooter = ({
  heading = "Continue Your Journey",
  links,
}: InternalLinkingFooterProps) => {
  if (!links.length) return null;

  return (
    <section className="bg-card border-t border-border px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <p className="font-body text-xs font-bold uppercase tracking-[0.3em] text-primary mb-4 text-center">
          {heading}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {links.map((link) =>
            link.isExternal ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                {link.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                {link.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default InternalLinkingFooter;
