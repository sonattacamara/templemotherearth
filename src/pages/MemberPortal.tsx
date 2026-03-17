import Navigation from "@/components/Navigation";
import EventbriteCTA from "@/components/EventbriteCTA";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import PortalAuthForm from "@/components/portal/PortalAuthForm";
import PortalQuickAccess from "@/components/portal/PortalQuickAccess";
import PortalHowItWorks from "@/components/portal/PortalHowItWorks";
import PortalToolsGrid from "@/components/portal/PortalToolsGrid";
import PortalPathway from "@/components/portal/PortalPathway";
import PortalExternalLink from "@/components/portal/PortalExternalLink";

const MemberPortal = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <SEOHead title="Member Portal" description="Access your Temple Mother Earth member portal for ceremony bookings, community resources, and spiritual tools." path="/portal" />
        <Navigation />
        <div className="flex min-h-screen items-center justify-center pt-20">
          <p className="text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <SEOHead title="Member Portal" description="Access your Temple Mother Earth member portal for ceremony bookings, community resources, and spiritual tools." path="/portal" />
        <Navigation />
        <PortalQuickAccess />
        <PortalHowItWorks />
        <PortalToolsGrid />
        <PortalPathway />
        <PortalExternalLink />
        <EventbriteCTA />
        <footer className="bg-foreground px-4 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-body text-xs text-primary-foreground/40">
              © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Member Portal" description="Access your Temple Mother Earth member portal for ceremony bookings, community resources, and spiritual tools." path="/portal" />
      <Navigation />
      <PortalAuthForm />
      <EventbriteCTA />
      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 508(c)(1)(A) sacred ceremony church. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MemberPortal;
