import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const EVENTBRITE_URL = "https://www.eventbrite.com/o/temple-of-mother-earth-29347213477";

const EventbriteCTA = () => (
  <section className="bg-primary px-4 py-10">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
        Welcome Home
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-primary-foreground/75">
        Come and join us — browse upcoming ceremonies, immersions, and community gatherings.
      </p>
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a
          href={EVENTBRITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-background px-8 py-3.5 font-body text-sm font-semibold text-foreground shadow-lg transition hover:bg-background/90"
        >
          Enter the Sacred Space <ArrowRight className="h-4 w-4" />
        </a>
        <Link
          to="/ceremony-intake"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-foreground/30 bg-transparent px-8 py-3.5 font-body text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary-foreground/10"
        >
          Begin Your Journey <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default EventbriteCTA;
