import { Link } from "react-router-dom";
import { BookOpen, FileText, Compass, Users, ExternalLink, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const EXTERNAL_PORTAL = "https://integration.templemotherearth.org/auth";

const quickLinks = [
  { label: "Learning Library", href: "/member/education", icon: BookOpen, isExternal: false },
  { label: "Sacred Intake", href: "/ceremony-intake", icon: FileText, isExternal: false },
  { label: "Preparation Guide", href: "/preparation", icon: Compass, isExternal: false },
  { label: "Wellness Portal", href: EXTERNAL_PORTAL, icon: ExternalLink, isExternal: true },
];

const PortalQuickAccess = () => {
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.full_name || "Sacred One";

  return (
    <section className="bg-card border-b border-border pt-20">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="font-display text-sm font-semibold text-foreground">
            Welcome back, <span className="text-primary">{displayName}</span>
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {quickLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <link.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{link.label}</span>
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <link.icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              )
            )}

            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalQuickAccess;
