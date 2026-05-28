# Plan: Avatar-Centered Copy + Video Flow Cleanup

## 1. Token / cost estimate for glossary background video
You asked first about token cost. Two options:

- **Reuse uploaded clips (free)** — Use the three videos you just attached (`call2.mp4`, `call3.mp4`, `hug2.mp4`) plus existing plant/forest clips already in `src/assets/`. Stitched into a soft cross-fading loop behind the glossary header. **Zero generation cost, zero tokens beyond this planning loop.**
- **Generate new plant-focused loop** with `videogen` (8-second 1080p clip of drifting sacred plants, leaves, mushrooms, cacao pods): ~1 generation call. Roughly equivalent to a single premium image gen in credit terms — small, but not free.

**Recommendation:** Start with Option A (reuse uploads + existing forest footage). Zero cost, and the hug/call clips match the "Answer the Call" emotional beat better than abstract plant b-roll.

## 2. Plant Medicine Glossary — "Answer the Call" section
- Add a looping background video behind the bottom "Answer the Call" CTA block on `/plant-medicine-glossary`.
- Source: `call2.mp4` + `call3.mp4` + `hug2.mp4` cross-fading (use existing `FooterVideoBanner` pattern or a new lightweight `<video autoplay muted loop playsinline>` with a dark overlay).
- Rewrite the CTA copy so the seeker sees themselves. Draft:
  > **"You didn't land on this page by accident."**
  > You've been carrying something the world doesn't have language for — a quiet knowing that there's more, a body that's been holding too much for too long, a soul that's ready to come home. The plants have been waiting. The Sanctuary has been waiting. **The only question left is whether you're ready to answer.**
  > → *Speak with a Guide* (routes to `/contact`)

## 3. Volunteer page
- **Remove** the existing footer video.
- Rewrite the closing copy so a prospective volunteer sees themselves. Draft direction:
  > **"You've always been the one who shows up."**
  > You're the friend people call when they're falling apart. You hold space without being asked. You've felt the pull to serve something larger than yourself — and the Sanctuary is asking for hands like yours. Sacred reciprocity isn't transactional; it's how the Temple breathes.
  > → *Step Into Service*

## 4. Membership page
- **Remove** the "Common Questions" / FAQ block.
- Restructure the page so the avatar (the seeker considering becoming a member) sees themselves at every scroll point:
  - Open with a "you" mirror — name the ache, the longing, the readiness.
  - Replace feature-list framing of tiers with **"Where are you on the path?"** — each tier becomes a self-recognition statement (e.g. *"I'm just arriving"* → Welcome, *"I'm ready to belong"* → Belong, *"I'm called to train"* → Train, etc.).
  - Close with an emotional invitation, not a pricing recap.

## 5. Site-wide video flow audit (light pass)
Quick check that every remaining footer video matches its page's emotional arc:
- Women's Circle → cushion clip ✓
- Men's Circle, Hapé, Sacred Tea, Kambo, Veterans → confirm each footer video still belongs; flag any that feel off so you can decide.

## Files to touch (build phase)
- `src/pages/PlantMedicineGlossary.tsx` (or wherever the glossary lives — confirm path during build)
- `src/pages/Volunteer.tsx`
- `src/pages/Membership.tsx` (or 2026 membership pathway page)
- Copy `user-uploads://call2.mp4`, `call3.mp4`, `hug2.mp4` → `src/assets/`
- Possibly a small new `<GlossaryAnswerCall />` component for the looped background block.

## Out of scope (per your instruction)
- No new video generation right now.
- No changes to ceremony pages beyond the audit flag list.

## One clarifying question before I build
For the glossary "Answer the Call" CTA, do you want the button to go to **`/contact`** (Speak with a Guide form) or to **`/membership`** (start the path)? Both fit — just need your call.