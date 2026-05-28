import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/**
 * Eventbrite Embedded Checkout
 * Loads Eventbrite's official widget script and renders the ticket
 * selector + checkout flow inside a modal on our own site.
 *
 * Usage:
 *   <EventbriteCheckout
 *     eventId="946929721287"
 *     label="Secure Your Place"
 *     // (default label is now "Reserve Your Seat in the Circle")
 *   />
 */

const SCRIPT_SRC = "https://www.eventbrite.com/static/widgets/eb_widgets.js";
let scriptPromise: Promise<void> | null = null;

function loadEventbriteScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if ((window as any).EBWidgets) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Eventbrite script failed")));
      return;
    }
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Eventbrite script failed"));
    document.body.appendChild(s);
  });
  return scriptPromise;
}

export interface EventbriteCheckoutProps {
  /** The numeric Eventbrite event ID (the trailing digits in the event URL). */
  eventId: string;
  /** Button label. */
  label?: string;
  /** Fallback URL if the widget cannot load. */
  fallbackUrl?: string;
  /** Tailwind classes for the trigger button. */
  className?: string;
  /** Called after a successful order. */
  onOrderComplete?: () => void;
}

export default function EventbriteCheckout({
  eventId,
  label = "Reserve Your Seat in the Circle",
  fallbackUrl,
  className,
  onOrderComplete,
}: EventbriteCheckoutProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerId = `eb-widget-${eventId}`;
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!open) return;
    setError(null);
    mountedRef.current = false;
    loadEventbriteScript()
      .then(() => {
        const EB = (window as any).EBWidgets;
        if (!EB || mountedRef.current) return;
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = "";
        EB.createWidget({
          widgetType: "checkout",
          eventId,
          iframeContainerId: containerId,
          iframeContainerHeight: 700,
          onOrderComplete: () => {
            onOrderComplete?.();
          },
        });
        mountedRef.current = true;
      })
      .catch(() => setError("Could not load checkout. Please try the direct link."));

    // Lock background scroll while modal is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, eventId, containerId, onOrderComplete]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ??
          "inline-block bg-[hsl(45,70%,49%)] text-[hsl(150,30%,8%)] px-8 py-4 font-sans text-[11px] tracking-[3px] uppercase hover:bg-[hsl(45,70%,55%)] transition"
        }
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative bg-background border border-[hsla(45,70%,49%,0.25)] rounded-lg w-full max-w-3xl max-h-[92vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-[hsla(45,70%,49%,0.15)]">
              <p className="font-sans text-[10px] tracking-[3px] uppercase text-[hsl(45,70%,49%)]">
                Reserve Your Seat
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="text-foreground/70 hover:text-foreground transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="bg-white">
              <div id={containerId} style={{ minHeight: 700 }} />
              {error && (
                <div className="p-6 text-center">
                  <p className="text-sm text-foreground mb-3">{error}</p>
                  {fallbackUrl && (
                    <a
                      href={fallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[hsl(45,70%,49%)] text-[hsl(150,30%,8%)] px-6 py-3 font-sans text-[11px] tracking-[3px] uppercase"
                    >
                      Open on Eventbrite
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/** Helper: extract the numeric event ID from a full Eventbrite URL. */
export function extractEventbriteId(url: string): string | null {
  const m = url.match(/-(\d{10,})(?:[/?#]|$)/);
  return m ? m[1] : null;
}