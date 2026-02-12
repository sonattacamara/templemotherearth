import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "About", href: "/about", isRoute: true },
  { label: "Experiences", href: "/#offerings", isRoute: false },
  { label: "Membership", href: "/membership", isRoute: true },
  { label: "Community", href: "/#community", isRoute: false },
];

const getInvolvedLinks = [
  { label: "Volunteer", href: "/volunteer" },
  { label: "Join as Facilitator", href: "/join-facilitator" },
  { label: "Become a Sponsor", href: "/sponsor" },
  { label: "Ceremony Preparation", href: "/preparation" },
  { label: "Code of Conduct", href: "/conduct" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const renderNavLink = (link: typeof navLinks[0], className: string, onClick?: () => void) => {
    if (link.isRoute) {
      return (
        <Link
          key={link.label}
          to={link.href}
          onClick={onClick}
          className={className}
        >
          {link.label}
        </Link>
      );
    }
    const isHome = location.pathname === "/";
    const href = isHome ? link.href.replace("/", "") : link.href;
    return (
      <a
        key={link.label}
        href={href}
        onClick={onClick}
        className={className}
      >
        {link.label}
      </a>
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
          {navLinks.map((link) =>
            renderNavLink(link, "font-body text-sm text-primary-foreground/70 hover:text-primary transition-colors duration-200")
          )}
          
          {/* Get Involved Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="font-body text-sm text-primary-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-1">
              Get Involved <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 rounded-lg border border-primary/20 bg-foreground/98 backdrop-blur-md shadow-xl py-2">
                {getInvolvedLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="block px-4 py-2.5 text-sm text-primary-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/portal"
            className="rounded-lg border border-primary-foreground/30 px-4 py-2 font-body text-sm text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            Member Login
          </Link>
          <Link
            to="/ceremony-intake"
            className="rounded-lg bg-primary px-5 py-2 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
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
        <div className="lg:hidden bg-foreground/98 backdrop-blur-md border-t border-primary/10 px-6 py-6 space-y-4">
          {navLinks.map((link) =>
            renderNavLink(
              link,
              "block font-body text-base text-primary-foreground/80 hover:text-primary transition-colors",
              () => setOpen(false)
            )
          )}
          
          {/* Get Involved section in mobile */}
          <div className="border-t border-primary/10 pt-4 mt-4">
            <p className="font-body text-xs font-bold uppercase tracking-wider text-primary mb-3">Get Involved</p>
            {getInvolvedLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block font-body text-base text-primary-foreground/80 hover:text-primary transition-colors py-1.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            to="/portal"
            onClick={() => setOpen(false)}
            className="block font-body text-base text-primary-foreground/80 hover:text-primary transition-colors"
          >
            Member Login
          </Link>
          <Link
            to="/ceremony-intake"
            onClick={() => setOpen(false)}
            className="block mt-4 rounded-lg bg-primary px-5 py-3 text-center font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Begin Your Journey
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
