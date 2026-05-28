import { useEventbriteEvent } from "@/hooks/useEventbriteEvent";

interface Props {
  eventId: string;
  className?: string;
}

const formatDate = (iso: string | undefined) => {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  } catch {
    return null;
  }
};

const formatTime = (iso: string | undefined) => {
  if (!iso) return null;
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return null;
  }
};

/**
 * Renders live event metadata (date, time, price, seats remaining) for an
 * Eventbrite event. Falls back to nothing if the API call fails.
 */
const EventbriteLiveMeta = ({ eventId, className }: Props) => {
  const { data, isLoading, isError } = useEventbriteEvent(eventId);

  if (isLoading || isError || !data) return null;

  // Never display a past event's date — protects against stale Eventbrite data
  // for events that aren't part of a series (where the edge function can't
  // auto-resolve a future occurrence).
  const startMs = data.start?.utc ? new Date(data.start.utc).getTime() : null;
  if (startMs !== null && startMs < Date.now()) return null;

  const date = formatDate(data.start?.local);
  const time = formatTime(data.start?.local);
  const prices = (data.ticket_classes ?? [])
    .filter((t) => t.on_sale_status === "AVAILABLE" || t.on_sale_status === null)
    .map((t) => t.cost_display)
    .filter((v): v is string => !!v);
  const priceLabel =
    prices.length === 0
      ? null
      : prices.length === 1
      ? prices[0]
      : `${prices[0]} · ${prices[prices.length - 1]}`;

  const totalAvail = (data.ticket_classes ?? []).reduce((sum, t) => {
    if (t.quantity_total != null && t.quantity_sold != null) {
      return sum + Math.max(0, t.quantity_total - t.quantity_sold);
    }
    return sum;
  }, 0);
  const seatsLabel = totalAvail > 0 && totalAvail <= 10 ? `${totalAvail} seats left` : null;

  const items = [date, time, priceLabel, seatsLabel].filter(Boolean) as string[];
  if (items.length === 0) return null;

  return (
    <div
      className={
        className ??
        "inline-flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] tracking-[2px] uppercase text-[hsl(45,70%,55%)]"
      }
    >
      {items.map((label, i) => (
        <span key={i} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="opacity-50">·</span>}
          <span>{label}</span>
        </span>
      ))}
    </div>
  );
};

export default EventbriteLiveMeta;