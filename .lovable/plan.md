# Page Story Sections — Visual Rhythm Rollout

## The Pattern

Every page gets the same 3-beat visual rhythm:

```text
┌─────────────────────────────┐
│  HERO VIDEO  +  title       │  ← already exists on most pages
├─────────────────────────────┤
│  ...page content...         │
├─────────────────────────────┤
│  MID IMAGE  +  overlay text │  ← NEW (parallax still + headline)
├─────────────────────────────┤
│  ...more content...         │
├─────────────────────────────┤
│  FOOTER VIDEO + closing     │  ← NEW (full-bleed video + page-specific blessing/CTA)
└─────────────────────────────┘
```

## Build Once, Reuse Everywhere

Create two reusable components so we don't rewrite this 15 times:

- `src/components/story/MidImageBanner.tsx` — full-bleed image with overlay headline + sub
- `src/components/story/FooterVideoBanner.tsx` — full-bleed video, blessing + CTA, autoplay/muted/loop

Both take `image`/`video`, `eyebrow`, `headline`, `body`, `ctaLabel`, `ctaHref` as props.
Both follow brand tokens (Dark Jungle Green, gold, cream) and our no-em-dash rule.

## Phased Rollout (so we don't generate 30 videos in one go)

### Phase 1 — this turn (5 pages, the conversion core)
1. Home (`/`)
2. Membership (`/membership`)
3. Veterans (`/veterans-transformation`)
4. Volunteer (`/volunteer`)
5. Facilitator (`/join-facilitator`)

Assets: 5 footer videos + 5 mid-images, page-specific copy.

### Phase 2 — next turn (ceremony pages)
Kambo, Hapé, Cacao, Sacred Tea, Sacred Series / Level 5.

### Phase 3 — next turn (deep-content pages)
Kemetic, Earth Kingdoms, Plant Glossary.

## Copy Direction (page-specific blessings)

Each footer closes with a 3-line beat: **eyebrow · headline · CTA**, page-themed.
Examples:
- **Home** → "The door is open · Walk in · Begin Your Journey"
- **Veterans** → "You came home for a reason · Stand Down, Soldier · Reserve Your Seat"
- **Volunteer** → "Service is the shortest path · Lend Your Hands · Step In"
- **Membership** → "Belonging is built one circle at a time · Sit With Us · Become a Member"
- **Facilitator** → "Hold space, become space · Join the Stewards · Begin the Path"

## Technical Notes

- Videos: 1080p, 5s loops, generated via `videogen` with theme-matched prompts
- Mid-images: 1920×1080 generated via `imagegen` (fast tier)
- Brightness filter ~0.55 on overlays for legibility
- All CTAs route to existing pages — no new business logic
- Mobile: components stack, text scales down with `clamp()`

## Out of Scope (for this rollout)
- No new business logic, no new routes
- No new analytics events beyond what existing CTAs already track
- Hero videos that already exist stay as-is

Ready to ship **Phase 1** (5 pages, ~10 generated assets) on approval.
