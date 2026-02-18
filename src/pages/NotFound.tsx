import EventbriteCTA from "@/components/EventbriteCTA";
import Navigation from "@/components/Navigation";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEOHead title="Page Not Found" description="The page you are looking for does not exist. Return to Temple Mother Earth's homepage." />
      <Navigation />

      <div className="flex flex-1 items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="mb-4 font-display text-6xl font-bold text-foreground">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">This path has not yet been revealed.</p>
          <a
            href="/"
            className="inline-block rounded-xl bg-primary px-8 py-3 font-body text-sm font-semibold text-primary-foreground transition hover:bg-primary/80"
          >
            Return Home
          </a>
        </div>
      </div>

      <EventbriteCTA />

      <footer className="bg-foreground px-4 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Temple Mother Earth. A 501(c)(3) nonprofit organization. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
