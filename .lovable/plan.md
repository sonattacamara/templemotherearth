# Three-Page Update Plan

## 1. Frequency, Fungi & Flow · Clickable "Ways to Move" Cards

The "Ways to Move" section currently uses static `SanctuaryColCards`. Convert each card into a clickable tile that opens a Dialog (shadcn) with a richer description and a "What to Expect" panel.

**New component:** `src/components/sanctuary/SanctuaryClickableCards.tsx`
- Accepts cards with: `title`, `shortDescription`, `longDescription`, `whatToExpect[]` (bullets).
- Tile reuses the existing card visual (border, gold accent, hover lift) and adds a subtle "Tap to learn more →" affordance.
- On click opens a shadcn `Dialog` styled in the dark sanctuary palette (Dark Jungle Green bg, gold accent border, cream text, serif headline) with two stacked blocks: "The Practice" (paragraph) and "What to Expect" (icon-led list using Lucide).

**Content for 4 cards** (Static Stand, Contact Dance, Free Flow, Stillness as Movement) — short copy stays as today; long copy adds preparation, posture/safety guidance, and 3·5 "what to expect" bullets each (e.g., for Contact Dance: opt-in only, eye-contact pause, right to leave the contact at any moment).

Only this one section changes. Other FFF copy untouched.

## 2. Sacred Tea Ceremony · Rewrite in Seeker Language + New Footer Video

Goal: the avatar (a tired, curious newcomer) sees themselves on the page, understands what "sacrament" means in their own words, and feels "this is exactly what I need."

**New video asset:** copy `user-uploads://sacred_tea_house-3.mp4` → `src/assets/video-teahouse-seeker.mp4`. Use it as a new closing `FooterVideoBanner` titled **"A Seat Has Been Saved For You"** (replacing the current `SanctuaryCTA` text-only block). The existing `video-sacred-tea-ceremony.mp4` remains the hero background.

**Copy rewrites (RFRA-safe · no chemical names · no em dashes):**

- **Hero**
  - Eyebrow: `The Fruit of the Gods · A Sacred Tea Ceremony`
  - Title: `You've Been Carrying / Something Heavy / For Too Long`
  - Lead: "You don't need another book, another podcast, another weekend of trying to think your way out. Sacred Tea is an ancient practice · a cup poured in ceremony · that helps the part of you that already knows finally be heard."

- **New "Is This For You?" section** (above "What the Ancients Called…") with a 6-bullet "You may be here because…" list written in plain language:
  - You feel tired in a way sleep does not fix.
  - You've done the therapy, the journaling, the breathwork · and something is still stuck.
  - You're curious about ceremony but the words feel foreign.
  - You want to feel something real again.
  - You're ready to listen to your body instead of override it.
  - You don't want a high. You want the truth.

- **"What Is a Sacrament?" plain-language explainer** (replaces dense paragraph):
  - One sentence: "A sacrament is a sacred substance taken in ceremony · with intention, with reverence, with people who know how to hold space · so that what you drink becomes a doorway, not a drug."
  - Followed by a 3-card row (reuse `SanctuaryColCards`): **The Cup** · **The Circle** · **The Container** explaining each in human terms.

- **"What a Night Looks Like" timeline** (4 cards): Arrival & Grounding · The Pour · The Journey Inward · Return & Integration. Concrete, hour-by-hour language so a first-timer can picture it.

- **Three Levels section**: keep the structure but rename to seeker-friendly subtitles · "Community · Your First Cup" · "Sacred Circle · Going Deeper" · "Fruit of the Gods · The Full Journey" · and rewrite descriptions in "you" voice.

- **Pull quote**: keep existing.

- **New Footer Video Banner** (replaces `SanctuaryCTA`):
  - eyebrow: `Recurring Offering · Washington, DC`
  - headline: `A Seat Has Been / Saved For You`
  - body: "The kettle is on. The circle is forming. When you're ready, the door opens from your side."
  - cta: `Reserve Your Seat`

## 3. Veterans Transformation Program · Rewrite for King James Avatar

King James, 22-year retired veteran. The page should read like it was written by someone who has been where he is: tired of the VA loop, tired of being passed doctor-to-doctor, ready to stop managing symptoms and start healing the root · the pain, the suffering, the war still living in the body.

**Scope:** rewrite copy in `src/pages/VeteransTransformation.tsx`. Keep all routing, form structure (firstName/lastName split, GHL webhook, honeypot, 3s timer), images, video, and CTA buttons. Only text content and section ordering change. No business logic touched.

**New voice & through-line:**
- Speak directly to the veteran in second person. No clinical, no chemical, no "treatment" language (RFRA).
- Acknowledge the specific touch points: the VA waiting room, the pill bottles on the counter, the 3 AM ceiling, the family that doesn't recognize you anymore, the brothers and sisters who didn't come home, the silence after the uniform comes off.

**New section flow:**

1. **Hero** · "You Came Home. / But Something Stayed Over There." · subline: "For the veteran who is done with the waiting room, the pill bottle, and the question · is this all that's left for me?"

2. **"If You're Reading This"** · short paragraph block naming the avatar's reality without flinching: VA appointments that don't move the needle, doctors who don't ask the right questions, nights that don't end, a body that won't stand down.

3. **"What the VA Was Never Built to Reach"** · 4 cards: The War Still In Your Body · The Brothers You Carry · The Silence At Home · The Self You Left Behind. Each card names the wound in veteran language and points to how ceremony meets it.

4. **"This Is Not Another Program"** · plain-language explainer of what Temple Mother Earth offers veterans: a sanctuary, not a clinic; a circle, not a clipboard; Mother Earth, not another prescription. Name King James as a 22-year retired veteran who walks this path with you (founder-led credibility).

5. **"What the Path Looks Like"** · timeline cards: Apply · Sit With Us · Ceremony · Integration · Brotherhood / Sisterhood. Concrete, no jargon.

6. **"What Other Veterans Found"** · keep existing testimonial structure, rewrite intros in seeker voice.

7. **"Energy Exchange & Scholarship"** · keep current Sacred Reciprocity language, restated for veterans: no veteran turned away for cost.

8. **Application Form** · unchanged structurally; rewrite the section intro: "The form below goes to King James directly. He reads every one."

9. **Closing CTA / footer banner** · keep existing video and CTA component, rewrite headline to: `You Survived the War. / Now Come Home to Yourself.`

**Compliance guardrails (re-confirmed in every rewrite):**
- No: medicine, treatment, cure, heal (as verb in clinical sense), poison, toxin, venom, PTSD-as-diagnosis claims, no promises of outcomes.
- Yes: sacred ceremony, earth medicine, sacred practice, sanctuary, return, remember, reconnect.
- No em dashes · no en dashes · middle dot or comma.
- No mailto/tel links · route any contact to `/contact`.
- Founder name: **Sonatta**. King James referenced as 22-year retired veteran and ceremony brother.

## Technical Notes

- New component: `SanctuaryClickableCards.tsx` (shadcn Dialog · Tailwind semantic tokens only · keyboard accessible · `aria-label` on each trigger).
- New asset: `src/assets/video-teahouse-seeker.mp4` copied from upload.
- `SacredTeaCeremony.tsx` swaps `SanctuaryCTA` → `FooterVideoBanner` and adds 2 new `SanctuarySection`s.
- `VeteransTransformation.tsx`: copy-only edits across existing sections plus reordering. No new routes, no schema changes, no edge function changes.
- All forms untouched. All GHL/Stripe/Eventbrite integrations untouched.

## Open Question

For the Sacred Tea hero, do you want me to also generate or source a still image of "the lady drinking tea" as a secondary hero visual (e.g., poster frame for the video, or a side image in the "What Is a Sacrament?" section)? If yes, upload the photo or confirm and I'll generate one matching the BIPOC sanctuary direction.
