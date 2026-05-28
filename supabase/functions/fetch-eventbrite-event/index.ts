import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

interface CacheEntry {
  expires: number;
  payload: unknown;
}
const cache = new Map<string, CacheEntry>();
const TTL_MS = 5 * 60 * 1000; // 5 minutes

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    let eventId = url.searchParams.get('eventId');
    if (!eventId && req.method === 'POST') {
      try {
        const body = await req.json();
        eventId = body?.eventId;
      } catch (_) {
        // ignore
      }
    }

    if (!eventId || !/^\d{10,}$/.test(eventId)) {
      return new Response(JSON.stringify({ error: 'eventId required (numeric)' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const cached = cache.get(eventId);
    if (cached && cached.expires > Date.now()) {
      return new Response(JSON.stringify(cached.payload), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
      });
    }

    const token = Deno.env.get('EVENTBRITE_PRIVATE_TOKEN');
    if (!token) {
      return new Response(JSON.stringify({ error: 'EVENTBRITE_PRIVATE_TOKEN not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const apiUrl = `https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_classes,venue`;
    const resp = await fetch(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!resp.ok) {
      const text = await resp.text();
      return new Response(
        JSON.stringify({ error: `Eventbrite API ${resp.status}`, details: text }),
        { status: resp.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const data = await resp.json();

    const tickets = Array.isArray(data.ticket_classes)
      ? data.ticket_classes.map((t: any) => ({
          id: t.id,
          name: t.name,
          cost_display: t.cost?.display ?? (t.free ? 'Free' : null),
          cost_value: t.cost?.value ?? null,
          currency: t.cost?.currency ?? null,
          on_sale_status: t.on_sale_status,
          quantity_total: t.quantity_total ?? null,
          quantity_sold: t.quantity_sold ?? null,
          free: !!t.free,
        }))
      : [];

    const payload = {
      id: data.id,
      name: data.name?.text ?? null,
      summary: data.summary ?? null,
      start: data.start ?? null,
      end: data.end ?? null,
      status: data.status ?? null,
      url: data.url ?? null,
      logo_url: data.logo?.url ?? null,
      venue: data.venue
        ? {
            name: data.venue.name,
            address: data.venue.address?.localized_address_display ?? null,
          }
        : null,
      ticket_classes: tickets,
      fetched_at: new Date().toISOString(),
    };

    cache.set(eventId, { expires: Date.now() + TTL_MS, payload });

    return new Response(JSON.stringify(payload), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json', 'X-Cache': 'MISS' },
    });
  } catch (err) {
    console.error('fetch-eventbrite-event error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});