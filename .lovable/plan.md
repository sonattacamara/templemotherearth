# Add Men's & Women's Integration Circle Pages

Two new sanctuary pages with Eventbrite CTAs, added to the Experiences dropdown.

## New Pages

**1. `/mens-circle` — The Cove: A Men's Healing Reflection Circle**
- Hero: brotherhood, reflection, sacred masculine
- Sections: What it is · Who it's for · What to expect · Sacred reciprocity
- CTA button → `https://www.eventbrite.com/e/the-cove-a-mens-healing-reflection-circle-tickets-1982328123781?aff=ebdsoporgprofile`
- Secondary CTA → `/ceremony-intake`

**2. `/womens-circle` — Women's Wellness Wednesdays**
- Hero: sisterhood, weekly rhythm, feminine wisdom
- Sections: What it is · Who it's for · What to expect · Sacred reciprocity
- CTA button → `https://www.eventbrite.com/e/womens-wellness-wednesdays-tickets-1513680431919?aff=oddtdtcreator&keep_tld=true`
- Secondary CTA → `/ceremony-intake`

Both built with existing `SanctuaryHero`, `SanctuarySection`, `SanctuaryCTA`, `SanctuaryColCards`, `SanctuaryPullQuote` components for visual consistency with other ceremony pages. RFRA-safe language throughout (sacred reflection, integration, community — no clinical/therapy terms).

## Navigation

Add two entries to the **Experiences** dropdown in `src/components/Navigation.tsx` (alphabetical-ish, grouped naturally):
- Men's Circle (The Cove)
- Women's Wellness Wednesdays

## Routing

Register both routes in `src/App.tsx`:
- `/mens-circle` → `MensCircle`
- `/womens-circle` → `WomensCircle`

## SEO

Each page gets `<SEOHead>` with unique title/description and is added to `public/sitemap.xml`.

## Files

- **Create**: `src/pages/sanctuary/MensCircle.tsx`, `src/pages/sanctuary/WomensCircle.tsx`
- **Edit**: `src/App.tsx` (routes), `src/components/Navigation.tsx` (Experiences dropdown), `public/sitemap.xml`

## Open question

Do you want hero imagery for these pages? If yes, I can generate two on-brand watercolor images (one circle of men, one circle of women) — otherwise I'll use a clean typographic hero matching the Sacred Tea / Hapé pages.
