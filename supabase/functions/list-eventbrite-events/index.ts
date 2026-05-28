import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  const token = Deno.env.get('EVENTBRITE_PRIVATE_TOKEN');
  if (!token) return new Response(JSON.stringify({ error: 'no token' }), { status: 500, headers: corsHeaders });
  try {
    const me = await fetch('https://www.eventbriteapi.com/v3/users/me/organizations/', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json());
    const orgs = me.organizations || [];
    const results: any[] = [];
    for (const o of orgs) {
      const events = await fetch(
        `https://www.eventbriteapi.com/v3/organizations/${o.id}/events/?status=live,started,ended,draft&order_by=start_desc&page_size=200`,
        { headers: { Authorization: `Bearer ${token}` } },
      ).then((r) => r.json());
      for (const e of events.events || []) {
        results.push({ id: e.id, name: e.name?.text, status: e.status, start: e.start?.local, url: e.url });
      }
    }
    return new Response(JSON.stringify({ orgs, events: results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: corsHeaders });
  }
});