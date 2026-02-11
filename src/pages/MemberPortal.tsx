import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const MemberPortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        {/* Header bar */}
        <div className="bg-card border-b border-border px-4 py-3">
          <div className="mx-auto max-w-7xl flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Temple Mother Earth
            </Link>
            <a
              href="https://integration.templemotherearth.org/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Open in new window <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Embedded portal */}
        <iframe
          src="https://integration.templemotherearth.org/auth"
          title="Temple Mother Earth Integration & Wellness Portal"
          className="w-full border-0"
          style={{ height: "calc(100vh - 7rem)" }}
          allow="clipboard-write; clipboard-read"
        />
      </div>
    </div>
  );
};

export default MemberPortal;
