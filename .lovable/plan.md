## Goal
Three problems to solve, in order of effort:
1. Immediate cleanup (small edits)
2. Standardize every ceremony "ticket" CTA to go straight to its Eventbrite checkout (the Forest Circle pattern)
3. Pull the language/details from each Eventbrite event page into the matching sanctuary page so the site is a richer mirror of Eventbrite

---

## 1. Immediate cleanup edits

**`src/pages/sanctuary/HapeCeremony.tsx`** — replace "Enter the Forest Circle" (2 places: hero `primaryCTA` line 47 and `EventbriteCheckout` label line 109) with "Enter the Hapé Circle." The Eventbrite URL stays the same (Hapé · The Silencer).

**`src/pages/SacredSeries.tsx`** — remove the `MidScrollCommitment` block (lines 655–670, "You Are Not Reading By Accident" red card). The Step 1–4 application flow further down already covers intent.

**`src/pages/Membership.tsx`** — remove the `MidImageBanner` "Belonging Is Built One Circle at a Time" block (lines 464–471) and its `midMembershipImg` import if it becomes unused.

---

## 2. Ticket CTAs · route directly to Eventbrite

Audit shows most hero CTAs already link to Eventbrite. The gaps to fix:

- **KamboCeremony.tsx** — hero anchors to `#choose`, which is fine (two different Eventbrite tickets below). Keep. But the mid-page "Begin the Sacred Intake" CTA (`ctaHref="/ceremony-intake"`, line 257) should become two Eventbrite buttons (Co-ed + Women's Only) so the path to checkout is always one click.
- **HapeCeremony.tsx** — already routes to Eventbrite, no further change beyond #1.
- **SacredTeaCeremony.tsx** — mid-page intake CTA (line 114) → swap for "Take Your Seat at the Table" linking to the Sacred Tea Eventbrite URL already defined at top of file.
- **SacredYinYoga.tsx** — mid-page intake CTA (line 99) → swap for the two existing Eventbrite URLs (The Softening + Art of Surrender) as side-by-side buttons.
- **SacredSeries.tsx** — Sacred Series is *application-only* (no single Eventbrite ticket). Confirm below whether you want to keep the application flow or break it into individual Eventbrite events.

All other sanctuary pages (Cacao, Women's Circle, Men's Circle, Sacred Tea House, Frequency Fungi Flow, Inner Alchemy Spa, Community Potluck, Level 5, Sacred Art Expo) already point primary CTAs straight to Eventbrite — no changes needed.

---

## 3. Eventbrite content sync (the bigger lift)

For each ceremony page, fetch the live Eventbrite event page and merge anything richer than what we have today into the site copy:
- "About this event" body
- Schedule / what to expect
- What to bring
- Refund / policy notes
- Date+time pattern (kept evergreen · no hardcoded specific dates per the memory rule)

Pages to enrich (one Eventbrite source each, except Kambo and Yin which have two):
- Kambo (co-ed + women's)
- Hapé
- Cacao
- Sacred Tea Ceremony
- Sacred Tea House
- Sacred Yin (The Softening + Art of Surrender)
- Frequency, Fungi & Flow
- Inner Alchemy Spa
- Community Potluck
- Women's Wellness Wednesdays
- The Cove (Men's Circle)
- Level 5
- Sacred Art Expo

The merge is content-only · no layout changes. Existing sanctuary section structure is preserved.

---

## Technical notes
- Eventbrite fetching during build is read-only and uses `EVENTBRITE_PRIVATE_TOKEN` (already configured and just refreshed). I'll pull each event via the API in one batched script, then hand-edit the corresponding TSX file with the merged copy. No new runtime calls are added · the site stays static.
- All replaced CTAs use the same `external: true` pattern that Forest Circle uses, so behavior is identical to what already works.
- Removed components: `MidScrollCommitment` block on SacredSeries, `MidImageBanner` block on Membership. Imports cleaned up if unused.

---

## One clarification before I build

For the **Sacred Series page**, you said remove the red "You Are Not Reading By Accident" box (done) and route every ticket directly to Eventbrite. Sacred Series is currently an *application-only* path (Step 1–4 with Sacred Intake → discernment call). Two options:

- **A.** Keep the application flow exactly as-is · Sacred Series remains by-application, and the page just links *out* to each Eventbrite event for any individual day-experience tickets that exist.
- **B.** Replace the application flow entirely with direct Eventbrite ticket buttons (would need URLs for each Sacred Series ticket on Eventbrite).

I'll proceed with **A** unless you say otherwise.
