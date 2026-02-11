import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "About", href: "/about", isRoute: true },
  { label: "Offerings", href: "/#offerings", isRoute: false },
  { label: "Membership", href: "/#membership", isRoute: false },
  { label: "Events", href: "/#events", isRoute: false },
  { label: "Community", href: "/#community", isRoute: false },
  { label: "Contact", href: "/#contact", isRoute: false },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
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
    // For hash links on same page
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
          <a
            href="https://integration.templemotherearth.org/auth"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-primary-foreground/30 px-4 py-2 font-body text-sm text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            Member Login
          </a>
          <a
            href="https://www.eventbrite.com/cc/temple-mother-earth-ceremonies-3992189"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-primary px-5 py-2 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Book a Ceremony
          </a>
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
          <a
            href="https://integration.templemotherearth.org/auth"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block font-body text-base text-primary-foreground/80 hover:text-primary transition-colors"
          >
            Member Login
          </a>
          <a
            href="https://www.eventbrite.com/cc/temple-mother-earth-ceremonies-3992189"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block mt-4 rounded-lg bg-primary px-5 py-3 text-center font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Book a Ceremony
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
