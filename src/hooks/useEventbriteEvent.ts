import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface EventbriteTicketClass {
  id: string;
  name: string;
  cost_display: string | null;
  cost_value: number | null;
  currency: string | null;
  on_sale_status: string | null;
  quantity_total: number | null;
  quantity_sold: number | null;
  free: boolean;
}

export interface EventbriteEvent {
  id: string;
  name: string | null;
  summary: string | null;
  start: { utc: string; local: string; timezone: string } | null;
  end: { utc: string; local: string; timezone: string } | null;
  status: string | null;
  url: string | null;
  logo_url: string | null;
  venue: { name: string; address: string | null } | null;
  ticket_classes: EventbriteTicketClass[];
  fetched_at: string;
}

export function useEventbriteEvent(eventId: string | null | undefined) {
  return useQuery<EventbriteEvent>({
    queryKey: ["eventbrite-event", eventId],
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-eventbrite-event", {
        body: { eventId },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      return data as EventbriteEvent;
    },
  });
}

/** Extract numeric Eventbrite event ID from a full URL. */
export function extractEventbriteId(url: string | null | undefined): string | null {
  if (!url) return null;
  const m = url.match(/-(\d{10,})(?:[/?#]|$)/) || url.match(/\/e\/(\d{10,})/);
  return m ? m[1] : null;
}