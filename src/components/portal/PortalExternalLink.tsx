import { ExternalLink } from "lucide-react";

const PortalExternalLink = () => (
  <section className="px-4 py-12">
    <div className="mx-auto max-w-2xl text-center">
      <h3 className="font-display text-xl font-bold text-foreground">Full Integration & Wellness Portal</h3>
      <p className="mt-3 text-sm text-muted-foreground">
        Access the complete Integration & Wellness portal for expanded tools, resources, and community features available to paid members.
      </p>
      <a
        href="https://integration.templemotherearth.org/auth"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/80"
      >
        Open Integration Portal <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  </section>
);

export default PortalExternalLink;
