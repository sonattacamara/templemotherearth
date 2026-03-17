import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";
import { usePageTracking } from "@/hooks/useAnalytics";
import { Link } from "react-router-dom";

interface SanctuaryWeekLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  showBackLink?: boolean;
}

const SanctuaryWeekLayout = ({ children, title, description, showBackLink = true }: SanctuaryWeekLayoutProps) => {
  usePageTracking();

  return (
    <div className="sanctuary-spring min-h-screen bg-[hsl(25,28%,14%)] text-[hsl(40,30%,92%)]">
      <SEOHead title={title} description={description} />
      <Navigation />

      {/* Sanctuary Week Announce Bar */}
      <div className="bg-[hsl(25,25%,18%)] border-b border-[hsl(25,20%,24%)] py-2.5 px-6 text-center">
        <span className="font-sans text-[9px] tracking-[3px] uppercase text-[hsl(40,30%,72%)]">
          Temple Mother Earth -- Sanctuary Week -- March 18-29, 2026 -- Washington, DC
        </span>
      </div>

      {showBackLink && (
        <div className="px-6 md:px-12 py-3 border-b border-[hsl(25,20%,18%)]">
          <Link
            to="/sanctuary-week"
            className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(40,30%,55%)] hover:text-[hsl(40,40%,70%)] transition-colors"
          >
            &larr; Sanctuary Week
          </Link>
        </div>
      )}

      {children}

      {/* RFRA Footer */}
      <footer className="bg-[hsl(25,25%,12%)] border-t border-[hsl(25,20%,18%)] py-8 px-6 md:px-12 text-center">
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(40,20%,50%)] leading-loose">
          &copy; 2026 Temple Mother Earth -- 508(c)(1)(A) Sacred Church -- Washington, DC
        </p>
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(40,20%,50%)] leading-loose mt-2">
          All ceremonies held in sincere religious practice under protection of the Religious Freedom Restoration Act (RFRA) -- Not a substitute for medical or psychological treatment
        </p>
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(40,20%,50%)] leading-loose mt-2">
          Ceremony space is held for those who register in advance. Secure your place to begin your preparation.
        </p>
      </footer>
    </div>
  );
};

export default SanctuaryWeekLayout;
