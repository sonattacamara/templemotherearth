import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const token = Deno.env.get('EVENTBRITE_PRIVATE_TOKEN');
  if (!token) return new Response(JSON.stringify({ error: 'no token' }), { status: 500, headers: corsHeaders });
  try {
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').toLowerCase();
    const owned = await fetch('https://www.eventbriteapi.com/v3/users/me/owned_events/?status=all&order_by=start_desc&page_size=200', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json());
    let events = (owned.events || []).map((e: any) => ({
      id: e.id, name: e.name?.text, status: e.status, start: e.start?.local, url: e.url,
    }));
    if (q) events = events.filter((e: any) => (e.name || '').toLowerCase().includes(q));
    return new Response(JSON.stringify({ events, raw_error: owned.error || null }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});