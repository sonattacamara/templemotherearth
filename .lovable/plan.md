## What's wrong right now

1. **Stale Eventbrite snippet** (your screenshot: "MON, APR 14 · 7:00 PM · FREE · $22.00") — the live widget pulls a single hardcoded `eventId`. When that event passes, it keeps showing the old date. This is the "putt look" / potluck page snippet you flagged.
2. **Hapé page** still says "The Forest Has Been Waiting" at the bottom (belongs on the Forest Circle page only).
3. **Hapé page** body copy uses "Rapé administration" once — inconsistent with the rest of the page.
4. **Hapé date** shows July in the snippet but the next Hapé is in June.
5. **Level 5** has two cinematic videos sitting as separate bands above/below "Who This Initiation Is For" instead of living behind the typography as a watermark.
6. No sitewide rule guaranteeing consistency (terminology, CTA naming, "next event" accuracy, NLP voice).

---

## The plan

### 1. Replace stale snippets with a live "Next Upcoming" event component

Upgrade the Eventbrite integration so snippets always show the **next future occurrence** (or hide themselves if none):

- Extend `supabase/functions/fetch-eventbrite-event` to accept either:
  - a numeric `eventId` (current behavior), OR
  - a `seriesId` / `organizerId` + `eventSlug` — and return the **soonest `start.utc` > now** from `/series/{id}/events/` or `/organizations/{org}/events/?status=live&order_by=start_asc`.
- Add a new shared component `src/components/sanctuary/NextEventStrip.tsx` that:
  - Calls the function on mount, shows `WEEKDAY, MON DD · TIME · PRICE` once data lands.
  - Renders **nothing** (returns `null`) if no upcoming event exists — no stale dates ever.
  - Uses sanctuary tokens (cream text, gold dot separators) — matches the dark Hapé hero, not red.
- Swap the existing stale strip on the **Potluck** page (and every page using the old single-event fetch) for `<NextEventStrip />`.

### 2. Hapé page fixes (`src/pages/sanctuary/HapeCeremony.tsx`)

- Remove the entire bottom "The Forest Has Been Waiting" section (lines ~92–119). Replace with a Hapé-native closing band:
  > **The Breath Is Waiting** / *for the silence it already knows.*
  > "Take your place. Bring your breath. Let the forest's most direct transmission meet you where you are."
  > CTA stays: **Enter the Hapé Circle** → same Eventbrite URL.
- Line 79: change "**Rapé** administration" → "**Hapé** administration". Lock in: Hapé everywhere on this page, no exceptions.
- Drop in `<NextEventStrip eventId="946929721287" />` under the hero so the June date appears automatically (and updates itself going forward).

### 3. Level 5 watermark layering (`src/pages/sanctuary/Level5Ceremony.tsx`)

- Merge "Cinematic Band A" (video, lines 163–176) **into** the "Who This Initiation Is For" section (line 179):
  - Wrap `SanctuarySection` in a `relative` container.
  - Video becomes `absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-screen` behind the section.
  - Add a dark gradient overlay (`bg-gradient-to-b from-[#0B140A]/85 via-[#0B140A]/70 to-[#0B140A]/90`) so the rainbow tones read as a watermark, not a feature.
  - Typography sits in front with `relative z-10`.
- Apply the same pattern to Cinematic Band B → wrap it behind the "Ritual Map" section so both videos become watermarks under typography.

### 4. Sitewide consistency standard (the doc you've been asking for)

Create `mem://style/page-consistency-standard` and add to the memory index. Rules every ceremony page must follow:

- **Terminology lock**: each ceremony has ONE canonical spelling (Hapé, Kambo, Cacao, Sacred Tea, Sacred Series, Level 5). No alternates anywhere — no "Rapé", no "Rape", no "Level Five".
- **CTA naming**: "Enter the [Ceremony] Circle" — the noun always matches the page. No "Forest Circle" on a Hapé page.
- **Closing band**: each page gets its OWN closing band copy keyed to that ceremony's metaphor (Hapé = breath, Kambo = burn, Cacao = heart, Forest = forest, Tea = stillness, Level 5 = initiation). Forest metaphor lives only on `/forest-circle`.
- **Dates**: never hardcoded — always via `<NextEventStrip />` so a past event hides itself.
- **NLP voice**: every section opens with the avatar's felt state ("You already know…", "The one who…", "If you are reading this…") before any logistics.
- **Visual rhythm**: hero → felt-sense paragraph → "Who this is for" cards → what happens → logistics → closing band → RFRA footer. No exceptions.

### 5. QA pass after changes

- Load `/hape`, `/level-5`, `/potluck`, `/forest-circle` in preview and confirm: correct ceremony name in every CTA, no past dates, videos behind typography on Level 5, "forest" metaphor only on Forest page.

---

## Technical summary

- **Edge fn**: extend `fetch-eventbrite-event` with `?next=true&seriesId=…` branch returning soonest future occurrence.
- **New component**: `NextEventStrip.tsx` (replaces hardcoded date strips, returns `null` when empty).
- **Edited files**: `src/pages/sanctuary/HapeCeremony.tsx`, `src/pages/sanctuary/Level5Ceremony.tsx`, the Potluck page, `supabase/functions/fetch-eventbrite-event/index.ts`.
- **New memory**: `mem://style/page-consistency-standard` + index update.
- **No layout regressions**: existing `EventbriteDetails` component stays as-is (it's static content, not dated).
