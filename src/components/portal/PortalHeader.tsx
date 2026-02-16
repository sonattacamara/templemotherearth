import { Link } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const PortalHeader = () => {
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.full_name || "Sacred One";

  return (
    <section className="bg-card border-b border-border pt-20">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="Temple Mother Earth"
              className="h-16 w-16 rounded-full object-cover shadow-lg ring-2 ring-primary/20"
            />
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Integration Portal
              </p>
              <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Welcome Home, {displayName}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Your sacred companion for life's expanded experiences
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
            <button
              onClick={() => signOut()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="h-3 w-3" /> Sign Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalHeader;
