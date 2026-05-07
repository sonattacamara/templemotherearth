# Kambo for Women Only — Dedicated Sanctuary Page

A standalone page honoring Sonatta Camara's monthly women-only Kambo Purification circle — a sacred container free of masculine energy where women can fully release.

## What we'll build

**Route:** `/kambo-women` (with `/kambo-for-women` as alias)

**Page structure** (matches existing sanctuary pages — Hapé, Sacred Tea, Men's Circle):

1. **Hero** — "Kambo · For Women Only" with eyebrow "A Sonatta Camara Offering" and a soft poetic line about sacred feminine release
2. **About the Circle** — what makes a women-only container different: safety, surrender, sisterhood, no performance
3. **The Rhythm** — held the **third Saturday of every month at 8:00 AM** (evergreen — no specific dates, per project rules)
4. **Who It's For** — three-column cards (women carrying stored grief · mothers needing reset · sisters seeking deep release)
5. **Sonatta Camara** — short honoring of her as the holder of this offering
6. **Sacred Reciprocity / Preparation** — link to `/preparation`
7. **Pull quote** — feminine wisdom line
8. **CTA** — Eventbrite button (placeholder URL until you provide it) + secondary CTA to `/ceremony-intake`

**RFRA-safe language throughout** — sacred ceremony, purification, release, sisterhood. No clinical/medical terms.

## Navigation placement

Add under the **Ceremonies** dropdown (not Experiences) since Kambo is a ceremony — placed directly under "Kambo Purification":
- Kambo Purification
- **Kambo · Women Only** ← new
- Cacao Ceremony
- ...

## SEO

Unique `<SEOHead>` title/description, added to `public/sitemap.xml`.

## Files

- **Create:** `src/pages/sanctuary/KamboWomen.tsx`
- **Edit:** `src/App.tsx` (route), `src/components/Navigation.tsx` (Ceremonies dropdown), `public/sitemap.xml`

## Two things I need from you

1. **The Eventbrite URL** — once you have it I'll wire the CTA button. Until then I'll use a placeholder linking to `/ceremony-intake` so the page is fully functional on launch.
2. **Hero imagery?** — Options: (a) clean typographic hero matching Men's/Women's Circle pages, (b) generate an on-brand watercolor of a women's circle, or (c) reuse an existing Kambo image with a feminine treatment.

## Recommendation

Yes — absolutely build this its own page. Here's why:
- A women-only container is a **distinct offering** with a different energy and audience than mixed Kambo
- Sonatta deserves attribution as the holder
- Monthly recurring rhythm = an evergreen page that compounds SEO over time
- Gives you a clean URL to share in Women's Wellness Wednesdays, the Women's Circle Telegram, and Instagram
