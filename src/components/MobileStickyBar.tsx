import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Page-aware sticky mobile action bar.
 * One primary action per page type · the avatar always sees the next door.
 */

interface BarAction {
  label: string;
  href: string;
  external?: boolean;
}

interface BarConfig {
  primary: BarAction;
  secondary?: BarAction;
}

const SUPPRESSED = [
  "/contact",
  "/ceremony-intake",
  "/intake",
  "/member/auth",
  "/reset-password",
  "/donation-success",
  "/donation-canceled",
  "/admin",
  "/portal",
  "/webhook-checklist",
];

const getConfig = (pathname: string): BarConfig | null => {
  if (SUPPRESSED.some((p) => pathname.startsWith(p))) return null;

  // Kambo
  if (pathname.startsWith("/kambo")) {
    return {
      primary: { label: "Reserve Your Seat", href: "https://www.eventbrite.com/e/co-ed-kambo-with-king-james-tickets-1989036537828", external: true },
      secondary: { label: "Begin Intake", href: "/ceremony-intake" },
    };
  }
  // Sacred Tea
  if (pathname.startsWith("/sacred-tea") || pathname.startsWith("/tea-house")) {
    return {
      primary: { label: "Take Your Seat", href: "https://www.eventbrite.com/e/sacred-tea-ceremony-the-fruit-of-the-gods-tickets-1989026406525?aff=ebdsoporgprofile", external: true },
      secondary: { label: "Begin Intake", href: "/ceremony-intake" },
    };
  }
  // Yin
  if (pathname.startsWith("/yin") || pathname.startsWith("/sacred-yin")) {
    return {
      primary: { label: "Roll Out The Mat", href: "https://www.eventbrite.com/e/the-softening-tickets-1989036537828", external: true },
      secondary: { label: "Speak With A Guide", href: "/contact" },
    };
  }
  // Sacred Series
  if (pathname.startsWith("/sacred-series") || pathname.startsWith("/level")) {
    return {
      primary: { label: "Walk The Series", href: "/membership" },
      secondary: { label: "Begin Intake", href: "/ceremony-intake" },
    };
  }
  // Membership
  if (pathname.startsWith("/membership")) {
    return {
      primary: { label: "Join The Path", href: "/membership#tiers" },
      secondary: { label: "Speak With A Guide", href: "/contact" },
    };
  }
  // Volunteer / Sponsor / Scholarship
  if (pathname.startsWith("/volunteer")) {
    return {
      primary: { label: "Step Into Service", href: "/volunteer#apply" },
      secondary: { label: "Speak With A Guide", href: "/contact" },
    };
  }
  if (pathname.startsWith("/sponsor") || pathname.startsWith("/scholarship")) {
    return {
      primary: { label: "Hold The Door Open", href: "/sponsor" },
      secondary: { label: "Speak With A Guide", href: "/contact" },
    };
  }
  // Veterans
  if (pathname.startsWith("/veterans")) {
    return {
      primary: { label: "Begin Your Path", href: "/veterans-transformation-program#apply" },
      secondary: { label: "Speak With A Guide", href: "/contact" },
    };
  }
  // About / journal / glossary / kemetic / sacred-blueprint / community-care
  if (
    pathname.startsWith("/about") ||
    pathname.startsWith("/journal") ||
    pathname.startsWith("/plant-medicine-glossary") ||
    pathname.startsWith("/kemetic") ||
    pathname.startsWith("/sacred-blueprint") ||
    pathname.startsWith("/community-care") ||
    pathname.startsWith("/preparation") ||
    pathname.startsWith("/conduct")
  ) {
    return {
      primary: { label: "Begin Sacred Intake", href: "/ceremony-intake" },
      secondary: { label: "Speak With A Guide", href: "/contact" },
    };
  }
  // Default · homepage and everything else
  return {
    primary: { label: "Begin Sacred Intake", href: "/ceremony-intake" },
    secondary: { label: "Speak With A Guide", href: "/contact" },
  };
};

const Action = ({ action, primary }: { action: BarAction; primary: boolean }) => {
  const className = primary
    ? "flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 shadow-lg"
    : "flex items-center justify-center rounded-xl border border-primary-foreground/30 px-4 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/20";
  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        {action.label}
        {primary && <ArrowRight className="h-4 w-4" />}
      </a>
    );
  }
  return (
    <Link to={action.href} className={className}>
      {action.label}
      {primary && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
};

const MobileStickyBar = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const config = getConfig(location.pathname);
  if (!config) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden bg-foreground/95 backdrop-blur-md border-t border-primary/20 px-4 py-3 safe-area-pb"
        >
          <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
            <Action action={config.primary} primary />
            {config.secondary && <Action action={config.secondary} primary={false} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileStickyBar;
