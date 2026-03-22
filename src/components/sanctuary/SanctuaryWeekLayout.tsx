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
    <div className="sanctuary-spring min-h-screen bg-[hsl(114,36%,10%)] text-[hsl(40,30%,92%)]">
      <SEOHead title={title} description={description} />
      <Navigation />

      {/* Sanctuary Week Announce Bar */}
      <div className="bg-[hsl(105,30%,13%)] border-b border-[hsl(100,25%,18%)] py-2.5 px-6 text-center">
        <span className="font-sans text-[9px] tracking-[3px] uppercase text-[hsl(45,70%,55%)]">
          Temple Mother Earth · Sacred Series · Washington, DC
        </span>
      </div>

      {showBackLink && (
        <div className="px-6 md:px-12 py-3 border-b border-[hsl(100,25%,18%)]">
          <Link
            to="/sanctuary-week"
            className="font-sans text-[9px] tracking-[2px] uppercase text-[hsl(90,20%,45%)] hover:text-[hsl(45,70%,55%)] transition-colors"
          >
            &larr; Sacred Series
          </Link>
        </div>
      )}

      {children}

      {/* RFRA Footer */}
      <footer className="bg-[hsl(105,30%,8%)] border-t border-[hsl(100,25%,18%)] py-8 px-6 md:px-12 text-center">
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(90,15%,40%)] leading-loose">
          &copy; 2026 Temple Mother Earth · 508(c)(1)(A) Sacred Church · Washington, DC
        </p>
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(90,15%,40%)] leading-loose mt-2">
          All ceremonies held in sincere religious practice under protection of the Religious Freedom Restoration Act (RFRA) · Not a substitute for medical or psychological treatment
        </p>
        <p className="font-sans text-[8px] tracking-[2px] uppercase text-[hsl(90,15%,40%)] leading-loose mt-2">
          Ceremony space is held for those who register in advance. Secure your place to begin your preparation.
        </p>
      </footer>
    </div>
  );
};

export default SanctuaryWeekLayout;
