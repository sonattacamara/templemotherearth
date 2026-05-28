# Plan — Video Placements + Level 5 Copy

Reusing existing `FooterVideoBanner` component (video bg + text/CTA on top, dark overlay) for all 4 video placements. No new components.

## 1. Kambo · "Take Your Seat" footer video
- File: `src/pages/sanctuary/KamboCeremony.tsx`
- Copy `user-uploads://takeaseat.mp4` → `src/assets/video-kambo-takeaseat.mp4`
- Replace the existing closing "Take Your Seat" / Eventbrite CTA section with `<FooterVideoBanner>`:
  - Eyebrow: "The Frog Is Calling"
  - Headline: "Take Your Seat"
  - Body: existing invitation copy
  - CTA: keep current Co-ed Eventbrite link (Sundays 8 AM) as primary; Women's Only link stays in the cards section above

## 2. Hapé · "The Forest Has Been Waiting" footer video
- File: `src/pages/sanctuary/HapeCeremony.tsx`
- Copy `user-uploads://forest1.mp4` → `src/assets/video-hape-forest.mp4`
- Replace the existing closing `<section>` ("The Forest Has Been Waiting" + EventbriteCheckout) with `<FooterVideoBanner>` using the forest video as background:
  - Eyebrow: "Recurring Offering · Washington, DC"
  - Headline: "The Forest Has Been Waiting"
  - Body: existing copy
  - CTA: "Reserve Your Seat in the Circle" → existing Eventbrite URL
- Keep the RFRA + Sacred Access disclosure block below it untouched

## 3. Inner Alchemy Spa · "You Have Earned This Day" footer video
- File: `src/pages/sanctuary/InnerAlchemySpa.tsx`
- Copy `user-uploads://relax.mp4` → `src/assets/video-spa-footer.mp4`
- Replace the closing `<SanctuaryCTA>` with `<FooterVideoBanner>`:
  - Eyebrow: "Recurring Offering · Full Day Experience"
  - Headline: "You Have Earned This Day"
  - Body: existing copy
  - CTA: "Reserve Your Day of Restoration" → existing Eventbrite URL

## 4. Sacred Art Expo · "Calling All Artists" video
- File: `src/pages/sanctuary/SacredArtExpo.tsx`
- Copy `user-uploads://artist.mp4` → `src/assets/video-art-expo-artists.mp4`
- Locate the "Calling All Artists" section and replace its current static visual (image or flat panel) with `<FooterVideoBanner>` (or inline video bg variant if the section sits mid-page rather than at footer — will use `FooterVideoBanner` for consistency since it accepts arbitrary headline/body/CTA)
- Preserve existing eyebrow/headline/body/CTA copy and link to the artist application

## 5. Level 5 · copy update only (no video)
- File: `src/pages/sanctuary/Level5Ceremony.tsx`
- Update the page's primary message/lead to center the theme **"Connecting You to the God Within"**:
  - Eyebrow stays
  - Headline / hero subline reworded to evoke meeting the divine that already lives inside the seeker
  - Adjust 1–2 body paragraphs in the opening section to reinforce this (sovereign divinity, the God within, no external authority) while preserving RFRA-safe language
- No layout changes, no new sections

## 6. Held / not placed
- `user-uploads://sacred_tea_house-2.mp4` — no placement instruction given; holding unused until directed (will not copy into repo)

## Technical notes
- All copy follows RFRA rules · no em/en dashes · no emojis
- `FooterVideoBanner` already provides the dark overlay so text remains readable on top of the video
- No changes to data, routes, or business logic — presentation only
