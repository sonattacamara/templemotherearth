## Goal

Bring every Eventbrite ticketing flow inside the website, pull live event data (date, price, seats, description) from the Eventbrite API into our ceremony pages, add a standalone Forest Circle integration page, move Veterans into the Ceremonies nav, and reposition the cushion video so more of the cushion shows.

---

## 1. Embed every Eventbrite link (no more leaving the site)

Replace every external `https://www.eventbrite.com/...` anchor with the existing `EventbriteCheckout` modal so the checkout opens in an in-site overlay.

Pages to convert (hero + footer CTAs both):
- Hapé (hero CTA is the one still leaking out)
- Women's Circle
- Men's Circle
- Sacred Tea Ceremony
- Sacred Tea House
- Sacred Series (and Level 5 alias)
- Kambo (both Co-ed and Women's Only)
- FFF
- Community Potluck

Mechanism: pass the numeric event ID into `<EventbriteCheckout eventId="..." label="..." fallbackUrl="..." />`. Hero `SanctuaryHero` will get a small new prop `primaryCTAComponent` so the hero button can render the embedded checkout instead of a plain `<a>`.

## 2. Live Eventbrite content sync (so our page mirrors the Eventbrite page)

Build a thin server-side bridge so our ceremony pages always show the current date, price, capacity remaining, and Eventbrite description without anyone editing code.

- Add secret `EVENTBRITE_PRIVATE_TOKEN` (user provides a private OAuth token from eventbrite.com → Account → Developer Links → API Keys).
- New edge function `fetch-eventbrite-event` (verify_jwt = false, CORS enabled):
  - Input: `{ eventId }`
  - Calls `GET https://www.eventbriteapi.com/v3/events/{id}/?expand=ticket_classes,venue`
  - Returns `{ name, start, end, timezone, status, url, ticket_classes: [{ name, cost, on_sale_status, quantity_total, quantity_sold }], description_html, logo_url }`
  - 5-minute in-memory cache per event id to stay under rate limits.
- New hook `useEventbriteEvent(eventId)` (React Query, 5 min stale time).
- New shared components:
  - `<EventbriteLiveMeta eventId>` — shows next date, time, price range, "X seats remaining" badge. Drop-in under each ceremony hero.
  - `EventbriteCheckout` gets an optional `eventId`-driven label like `Take Your Seat · Mar 14 · $44`.

Our hand-written ceremony storytelling stays. Only the live data (date, price, seats) is pulled from Eventbrite. The raw Eventbrite description is NOT rendered (keeps RFRA voice consistent).

## 3. New `/forest-circle` integration page

Standalone integration page. Not linked to Hapé.

- Route: `/forest-circle`
- Nav placement: under **Integration** menu.
- Page sections: Hero (forest video bg, "The Forest Circle"), What It Is (a recurring community integration day), Who It's For, What to Expect (arrival, sitting, sharing, food, closing), Sacred Reciprocity, Contact/RSVP via `/contact` (no Eventbrite tie-in for now).

## 4. Move Veterans Transformation Program under Ceremonies

- Navigation: move the Veterans link from its current placement into the Ceremonies dropdown alongside Hapé, Kambo, Sacred Tea, etc.
- `InternalLinkingFooter` and `CeremonyExploreNav` get a Veterans card.
- Page route `/veterans` stays the same — only nav grouping changes.

## 5. Cushion video reposition

`FooterVideoBanner` on Women's Circle currently centers the video. Add `object-position` prop (default `center`) and pass `center 75%` on Women's Circle so the cushion is visible instead of being cropped off the bottom.

---

## Technical notes

- **Files touched** (edits): `SanctuaryHero.tsx`, `HapeCeremony.tsx`, `WomensCircle.tsx`, `MensCircle.tsx`, `SacredTeaCeremony.tsx`, `SacredTeaHouse.tsx`, `SacredSeriesLayout.tsx`, `KamboCeremony.tsx`, `FrequencyFungiFlow.tsx`, `CommunityPotluck.tsx`, `Navigation.tsx`, `InternalLinkingFooter.tsx`, `CeremonyExploreNav.tsx`, `FooterVideoBanner.tsx`, `App.tsx` (route).
- **New files**: `supabase/functions/fetch-eventbrite-event/index.ts`, `src/hooks/useEventbriteEvent.ts`, `src/components/EventbriteLiveMeta.tsx`, `src/pages/integration/ForestCircle.tsx`.
- **New secret**: `EVENTBRITE_PRIVATE_TOKEN` (requested after plan approval).
- **No DB changes.**
- **RFRA**: Eventbrite description is NOT auto-rendered, only metadata; our copy stays untouched.

## Out of scope (flag, ask later)

- Auto-syncing Eventbrite description text into our pages (intentionally skipped — keeps voice control).
- Scraping Eventbrite via Firecrawl (rejected in favor of API).
- Linking Forest Circle to Hapé (explicitly out).
