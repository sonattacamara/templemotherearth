import { Check, Package, Clock } from "lucide-react";
import details from "@/data/eventbrite-details.json";

type EventKey = keyof typeof details;

interface EventbriteDetailsProps {
  /** Key into eventbrite-details.json */
  eventKey: EventKey;
  /** Heading shown above the details strip */
  title?: string;
  /** Optional eyebrow */
  eyebrow?: string;
}

/**
 * EventbriteDetails
 * Renders the structured "What's Included · What to Bring · When"
 * block sourced from Eventbrite for the matching event.
 * Uses sanctuary palette (no red boxes). Drop-in above any ceremony's booking CTA.
 */
const EventbriteDetails = ({ eventKey, title = "Sacred Logistics", eyebrow = "What to Expect" }: EventbriteDetailsProps) => {
  const data = details[eventKey];
  if (!data) return null;
  const { included = [], bring = [], when = "" } = data;
  if (!included.length && !bring.length && !when) return null;

  return (
    <section className="bg-[hsl(105,30%,11%)] border-t border-b border-[hsla(45,70%,49%,0.12)] py-16 md:py-20 px-6 md:px-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)] mb-3">{eyebrow}</p>
          <h2 className="font-sans text-[clamp(22px,3.2vw,38px)] font-extralight text-[hsl(40,30%,92%)] leading-tight">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {included.length > 0 && (
            <div className="bg-[hsl(105,30%,13%)] border border-[hsla(45,70%,49%,0.15)] p-7">
              <div className="flex items-center gap-2 mb-5">
                <Check className="h-4 w-4 text-[hsl(45,70%,55%)]" />
                <h3 className="font-sans text-[11px] tracking-[2.5px] uppercase text-[hsl(45,70%,55%)]">What's Included</h3>
              </div>
              <ul className="space-y-2.5">
                {included.map((item) => (
                  <li key={item} className="font-serif text-[15px] text-[hsl(35,30%,78%)] leading-relaxed flex gap-2">
                    <span className="text-[hsl(45,70%,49%)] mt-1.5 text-[8px]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {bring.length > 0 && (
            <div className="bg-[hsl(105,30%,13%)] border border-[hsla(45,70%,49%,0.15)] p-7">
              <div className="flex items-center gap-2 mb-5">
                <Package className="h-4 w-4 text-[hsl(45,70%,55%)]" />
                <h3 className="font-sans text-[11px] tracking-[2.5px] uppercase text-[hsl(45,70%,55%)]">What to Bring</h3>
              </div>
              <ul className="space-y-2.5">
                {bring.map((item) => (
                  <li key={item} className="font-serif text-[15px] text-[hsl(35,30%,78%)] leading-relaxed flex gap-2">
                    <span className="text-[hsl(45,70%,49%)] mt-1.5 text-[8px]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {when && (
            <div className="bg-[hsl(105,30%,13%)] border border-[hsla(45,70%,49%,0.15)] p-7">
              <div className="flex items-center gap-2 mb-5">
                <Clock className="h-4 w-4 text-[hsl(45,70%,55%)]" />
                <h3 className="font-sans text-[11px] tracking-[2.5px] uppercase text-[hsl(45,70%,55%)]">When We Gather</h3>
              </div>
              <p className="font-serif text-[15px] text-[hsl(35,30%,78%)] leading-[1.7]">{when}</p>
              <p className="font-sans text-[10px] tracking-[2px] uppercase text-[hsl(35,20%,55%)] mt-4">
                Washington, DC · arrival details shared after registration
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventbriteDetails;