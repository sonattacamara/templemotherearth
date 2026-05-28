# Plan

## 1. Replace "Secure Your Place" everywhere
Not spiritual. Swap to a sanctuary-aligned phrase across all 8 occurrences:
- `src/pages/sanctuary/HapeCeremony.tsx` (3x), `src/pages/sanctuary/SacredTeaCeremony.tsx` (1x), `src/components/sanctuary/SacredSeriesLayout.tsx` (1x), `src/components/EventbriteCheckout.tsx` (default label + docs, 3x).

New wording (context-sensitive):
- Button label: **"Reserve Your Seat in the Circle"** (or short: **"Hold My Seat"**)
- Sentence form: **"The circle is forming. Hold your seat and let your preparation begin."**

## 2. Home page — footer video removed
In `src/pages/Index.tsx`, delete the `<FooterVideoBanner>` block (lines ~1068-1075), the `FooterVideoBanner` import (line 15), and the `footerHomeVideoAsset` import (line 17). The `MidImageBanner` ("The Door Is Open · Walk In") above it stays as the closing visual moment before `<EventbriteCTA />`. No new video generated.

## 3. Home page — "Upcoming Ceremonies & Offerings" section
Current section duplicates the dedicated Immersions area and only lists 2 of 6 immersions. For higher conversion, **simplify, don't duplicate**:

- **Remove** the two immersion cards (Costa Rica + Sayulita) from this section. Immersions live in their own section + nav already.
- **Keep** the "Important Information" age/membership/intake panel (high-trust gate copy).
- **Keep & elevate** the single Eventbrite CTA card — make it the primary action of the section: "Browse This Week's Sacred Gatherings" → "See Upcoming Ceremonies →".
- Update subhead from "ceremonies, community gatherings, and international immersions" → "Earth Medicine ceremonies and community gatherings here in Washington, DC."

Result: one section = one action = higher conversion. Immersions stay in their dedicated section only.

## 4. Sacred Yin Yoga page — add footer video
File: `src/pages/sanctuary/SacredYinYoga.tsx`. The existing bottom CTA block (`<section>` "Two Containers · One Practice / Your Body Is Ready to Rest") is currently flat dark green. Replace it with a `<FooterVideoBanner>` using the uploaded `yoga3.mp4`:
- Copy `user-uploads://yoga3.mp4` → `src/assets/video-yin-footer.mp4`
- Eyebrow: "Two Containers · One Practice"
- Headline: "Your Body Is Ready to Rest"
- Body: existing italic line ("You don't need experience…")
- Single primary CTA: **"Fourth Tuesday · In Person"** → Softening Eventbrite (drops the dual-button layout since `FooterVideoBanner` is single-CTA; the two offerings are already shown in the cards section above)

## 5. Frequency, Fungi & Flow page
File: `src/pages/sanctuary/FrequencyFungiFlow.tsx`.

**a) New "Ways to Move" section** before the final CTA, explaining the dance styles welcomed on the floor:
- **Static Stand** — feet rooted, eyes closed, let the frequency move you from the inside. No choreography. No floor travel. Just presence in the body.
- **Contact Dance** — slow, consensual partner-led movement. Shoulder, palm, back. Listening through the skin.
- **Free Flow** — your own rhythm, full floor, no rules. The body leads.
- **Stillness as Movement** — sit, lie, breathe. The frequency does the work. Stillness is sacred on this floor.

Rendered as a `<SanctuaryColCards>` grid (matches existing page pattern).

**b) Replace final CTA with footer video banner**
- Copy `user-uploads://dance_footer.mp4` → `src/assets/video-fff-footer.mp4`
- Swap the current `<SanctuaryCTA>` ("Your Soul Is Already on the Floor") for `<FooterVideoBanner>` with the uploaded dance video as background and the existing eyebrow/headline/body/CTA layered on top.

## 6. Contact video — note only
`user-uploads://contact_us.mp4` was attached but the user did not give it a placement instruction in this message. **Holding it unused** until directed. Will copy to `src/assets/video-contact-hero.mp4` if/when assigned a spot.

## 7. Out of scope
- No analytics/pixel/webhook work
- No emoji sweep continuation
- No other page rewrites

## Technical notes
- All copy follows RFRA + no em/en dash + no emoji rules.
- Reuses existing `FooterVideoBanner` and `SanctuaryColCards` — no new components.
- Old `video-footer-home-threshold.mp4` asset stays in repo unreferenced (cheap).
