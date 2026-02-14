import { ArrowRight } from "lucide-react";

const EVENTBRITE_URL = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

const EventbriteCTA = () => (
  <section className="bg-primary px-4 py-10">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
        Join the Portal
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/75">
        Browse upcoming ceremonies, immersions, and community gatherings — and reserve your seat.
      </p>
      <a
        href={EVENTBRITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-background px-8 py-3.5 font-body text-sm font-semibold text-foreground shadow-lg transition hover:bg-background/90"
      >
        Explore Experiences on Eventbrite <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  </section>
);

export default EventbriteCTA;
