import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const EXTERNAL_PORTAL = "https://integration.templemotherearth.org/auth";

/* ─── Navigation structure ─── */
interface NavItem {
  label: string;
  href: string;
  isRoute: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

type NavEntry = NavItem | NavGroup;

const isGroup = (entry: NavEntry): entry is NavGroup => "items" in entry;

const navStructure: NavEntry[] = [
  { label: "About", href: "/about", isRoute: true },
  {
    label: "Ceremonies",
    items: [
      { label: "Sacred Series", href: "/sacred-series", isRoute: true },
      { label: "Kambo Purification", href: "/kambo", isRoute: true },
      { label: "Cacao Ceremony", href: "/cacao", isRoute: true },
      { label: "Hapé Ceremony", href: "/hape", isRoute: true },
      { label: "Sacred Tea Ceremony", href: "/sacred-tea", isRoute: true },
      { label: "Level 5 Initiation", href: "/level5", isRoute: true },
    ],
  },
  {
    label: "Experiences",
    items: [
      { label: "Sacred Yin Yoga", href: "/yin-yoga", isRoute: true },
      { label: "Frequency, Fungi & Flow", href: "/frequencyfungiflow", isRoute: true },
      { label: "Inner Alchemy Spa Day", href: "/spa", isRoute: true },
      { label: "Art Expo", href: "/art-expo", isRoute: true },
      { label: "Sacred Tea House", href: "/tea-house", isRoute: true },
      { label: "Community Potluck", href: "/potluck", isRoute: true },
      { label: "The Cove · Men's Circle", href: "/mens-circle", isRoute: true },
      { label: "Women's Wellness Wednesdays", href: "/womens-circle", isRoute: true },
      { label: "Veterans Program", href: "/veterans-transformation-program", isRoute: true },
    ],
  },
  {
    label: "Immersions",
    items: [
      { label: "Sayulita, Nayarit · Oct 31–Nov 5, 2026", href: "/immersions/sayulita", isRoute: true },
      { label: "Panama · Dates Opening Soon", href: "/immersions/panama", isRoute: true },
      { label: "Egypt · Dates Opening Soon", href: "/immersions/egypt", isRoute: true },
      { label: "Peru · Dates Opening Soon", href: "/immersions/peru", isRoute: true },
      { label: "Costa Rica · Aug 2–8, 2026", href: "/immersions/costa-rica", isRoute: true },
      { label: "All Retreats", href: "/retreats-inquiry", isRoute: true },
    ],
  },
  {
    label: "Learn",
    items: [
      { label: "Kemetic Teachings", href: "/kemetic-teachings", isRoute: true },
      { label: "Earth Kingdoms", href: "/earth-kingdoms", isRoute: true },
      { label: "Sacred Blueprint", href: "/sacred-blueprint", isRoute: true },
      { label: "Journal", href: "/journal", isRoute: true },
      { label: "Preparation", href: "/preparation", isRoute: true },
      { label: "Plant Sacrament Glossary", href: "/plant-medicine-glossary", isRoute: true },
    ],
  },
  { label: "Membership", href: "/membership", isRoute: true },
];

/* ─── Desktop Dropdown ─── */
const DesktopDropdown = ({ group }: { group: NavGroup }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const enter = () => {
    clearTimeout(timeout.current);
    setOpen(true);
  };
  const leave = () => {
    timeout.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => () => clearTimeout(timeout.current), []);

  return (
    <div ref={ref} className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        className="flex items-center gap-1 font-body text-sm text-primary-foreground/70 hover:text-primary transition-colors duration-200"
        onClick={() => setOpen((o) => !o)}
      >
        {group.label}
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[220px] z-50">
          <div className="bg-[hsl(var(--foreground))] border border-primary/15 rounded-lg shadow-xl py-2">
            {group.items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-2.5 font-body text-sm text-primary-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Mobile Accordion Group ─── */
const MobileGroup = ({ group, onClose }: { group: NavGroup; onClose: () => void }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center justify-between w-full font-body text-base text-primary-foreground/80 hover:text-primary transition-colors py-1"
      >
        {group.label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="pl-4 mt-1 mb-2 space-y-2 border-l border-primary/15">
          {group.items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className="block font-body text-sm text-primary-foreground/60 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main Navigation ─── */
const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const portalHref = user ? "/portal" : EXTERNAL_PORTAL;
  const portalIsExternal = !user;

  const PortalLink = ({ className, onClick }: { className: string; onClick?: () => void }) => {
    if (portalIsExternal) {
      return (
        <a href={EXTERNAL_PORTAL} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className}>
          Integration Portal
        </a>
      );
    }
    return (
      <Link to="/portal" onClick={onClick} className={className}>
        Integration Portal
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/95 backdrop-blur-md border-b border-primary/20">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Temple Mother Earth" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display text-lg font-bold text-primary-foreground tracking-wide hidden sm:inline">
            Temple Mother Earth
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {navStructure.map((entry) =>
            isGroup(entry) ? (
              <DesktopDropdown key={entry.label} group={entry} />
            ) : (
              <Link
                key={entry.label}
                to={entry.href}
                className="font-body text-sm text-primary-foreground/70 hover:text-primary transition-colors duration-200"
              >
                {entry.label}
              </Link>
            )
          )}

          <PortalLink className="rounded-lg bg-secondary px-4 py-2 font-body text-sm font-semibold text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground" />
          <Link
            to="/ceremony-intake"
            className="rounded-lg bg-primary px-4 py-2 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Begin Your Journey
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-primary-foreground/80 hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-foreground/98 backdrop-blur-md border-t border-primary/10 px-6 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {navStructure.map((entry) =>
            isGroup(entry) ? (
              <MobileGroup key={entry.label} group={entry} onClose={() => setOpen(false)} />
            ) : (
              <Link
                key={entry.label}
                to={entry.href}
                onClick={() => setOpen(false)}
                className="block font-body text-base text-primary-foreground/80 hover:text-primary transition-colors"
              >
                {entry.label}
              </Link>
            )
          )}

          <PortalLink
            className="block font-body text-base text-primary-foreground/80 hover:text-primary transition-colors"
            onClick={() => setOpen(false)}
          />
          <Link
            to="/ceremony-intake"
            onClick={() => setOpen(false)}
            className="block font-body text-base text-primary-foreground/80 hover:text-primary transition-colors"
          >
            Begin Your Journey
          </Link>
          <a
            href="https://www.eventbrite.com/o/temple-of-mother-earth-29347213477"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block mt-4 rounded-lg bg-secondary px-5 py-3 text-center font-body text-sm font-semibold text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
          >
            Enter the Sacred Space
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
