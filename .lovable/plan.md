# Remove Transactional Language · Speak Only in Spirit

## What's wrong today

Even when copy says "this is not transactional" or "this is not a business," it still names the very thing we want absent. The avatar's nervous system hears the word, not the negation. We will rewrite every one of these into affirmative, mirror-style language so the avatar only sees who they already are and what the Temple already is.

## Words being retired site-wide

transactional · business · pricing · cost (as price) · customer · client · purchase · buy · checkout (in copy, not Stripe code) · sale · conversion · convert · funnel · lead · marketing · brand (as noun) · product · ROI · investment · deal · offer expires

(Stripe / Eventbrite internal code keeps its technical names · these only affect words the avatar reads.)

## Specific rewrites

**1. Volunteer page · `src/pages/Volunteer.tsx` line 337**
Old: "Sacred reciprocity isn't transactional. It's how the Temple breathes."
New: "Sacred reciprocity is how the Temple breathes · the current of giving and receiving that keeps the fire lit."

**2. Community Care · `src/pages/CommunityCare.tsx`**
- Line 31 ("This is not a pricing page...") → "This is a philosophy of energy · yours, ours, and the unseen current that moves between us. What you offer here becomes the door someone else will one day walk through."
- Line 75 ("This is not transactional. This is ceremonial...") → "This is ceremonial. The way a river only stays alive because water keeps moving, sacred community only stays alive because energy keeps moving through it."
- Line 94 ("Temple Mother Earth is not a business. We are a village...") → "Temple Mother Earth is a village. Every village needs guardians · souls whose presence keeps the fire lit, the doors open, and the table set."
- Line 97 ("Your offering does not buy you a seat...") → "Your offering sustains the energy that made your seat possible. When you give as a Sustainer, you hold the door open for the one walking behind you. When you receive a scholarship, someone before you held that door open for you."
- Line 139 ("The True Cost Of The Ceremony") → "What The Ceremony Truly Asks"

**3. Privacy Policy · `src/pages/PrivacyPolicy.tsx` line 42**
"...for marketing purposes" → "...for outside purposes"

**4. Volunteer · `src/pages/Volunteer.tsx` line 54**
"Brand and visual stewardship" → "Visual stewardship of the sanctuary's image"

**5. Sacred Series · `src/pages/SacredSeries.tsx` line 654 comment**
Code comment "SACRED PATHWAYS PRICING" → "SACRED PATHWAYS OFFERINGS" (non-visible but keeps our standard).

**6. Index / footer · `src/pages/Index.tsx` line 1040**
Comment "Brand" → "Sanctuary mark" (non-visible cleanup).

**7. Membership intro · re-read and reword any remaining tier copy that uses "subscribe," "subscription," "plan," "checkout" in visible text → "join the path," "walk this tier," "step in."**

**8. Ceremony Intake form · `src/pages/CeremonyIntake.tsx` line 1353**
"Do you have unfinished business with friends, family, or community?" → "Is there anything unresolved between you and another · friend, family, or community · that you are still carrying?"
(Field key `unfinishedBusiness` stays internal so GHL mapping doesn't break.)

## What I'm NOT touching

- Stripe / Eventbrite SDK function names, route names like `create-checkout`, webhook event names (`checkout.session.completed`), `EventbriteCheckout` component name · these are invisible to the avatar.
- Admin-only pages (`WebhookChecklist`, `Admin*`) · internal tools, no avatar exposure.
- TypeScript types from Supabase generated files.

## Retiring my own phrasing too

In future analytics/strategy answers I'll stop saying "conversion," "funnel," "lead," "capture." Replacement vocabulary I'll use with you:
- conversion → "the moment they say yes to themselves"
- funnel → "the path home"
- capture email → "open a thread of contact"
- 14-day sequence → "a fourteen-day thread of transmissions that keeps the doorway lit until they're ready to walk through"

## Verification after build

- `rg -i "transactional|\bbusiness\b|pricing|customer|purchase|\bbuy\b|conversion|\bfunnel\b|\bbrand\b|marketing"` against `src/pages` and `src/components` returns only code/technical hits, no visible copy.
- Manually open Volunteer, Community Care, Membership, Privacy, Ceremony Intake in preview to confirm the new wording reads as spiritual mirror language.
