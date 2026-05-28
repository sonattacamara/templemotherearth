## Part 1 · Video Footer Placements (4 uploaded videos)

Reuse the existing `FooterVideoBanner` pattern (dark overlay + headline + CTA) used on Kambo, Hape, Spa, etc.

1. **Sacred Tea House** (`tea2.mp4`)
   - Copy to `src/assets/video-teahouse-footer.mp4`
   - Replace the closing "The Tea House Awaits" gradient section in `SacredTeaHouse.tsx` with a video banner
   - Superimposed: eyebrow "Monthly Offering · Washington, DC" · headline **"The Tea House Awaits"** · subline "A monthly sanctuary of slowness and sacred sacrament" · CTA "Reserve Your Seat" → existing Eventbrite link

2. **Community Potluck** (`tabel_set.mp4`)
   - Copy to `src/assets/video-potluck-footer.mp4`
   - Replace the final `SanctuaryCTA` block in `CommunityPotluck.tsx`
   - Superimposed: eyebrow "4th Monday · Free & Open" · headline **"The Table Is Already Set For You"** · CTA "Register Free" → existing Eventbrite link

3. **Men's Circle / The Cove** (`circle_men.mp4`)
   - Copy to `src/assets/video-mens-circle-footer.mp4`
   - Replace the final `SanctuaryCTA` in `MensCircle.tsx`
   - Superimposed: eyebrow "Recurring Brotherhood Circle" · headline **"The Circle Is Waiting For You"** · CTA "Reserve Your Seat" → existing Eventbrite link

4. **`woman_circle2.mp4`** — held, no placement was specified. Will save to `src/assets/video-womens-circle-footer.mp4` and await your placement instruction (likely the Women's Circle footer CTA — confirm before I wire it).

---

## Part 2 · Earth Kingdoms background imagery

Add a layered background image to each `KingdomSection` (positioned absolute behind the content, with a dark gradient overlay so text stays legible). Pattern: `<img className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity">` + existing dark section bg.

Images to generate (no existing assets match — will use `imagegen` at standard quality, 1920×1080):

| Kingdom | Background image prompt |
|---|---|
| Mineral | Cluster of raw quartz, amethyst, and shilajit crystals on dark stone, cinematic moody lighting |
| Plant | Old-growth forest canopy of towering trees, shafts of golden light through mist |
| Fungi | Wild mushrooms (amanita, psilocybe, lion's mane) on mossy forest floor, macro, soft fog |
| Animal | Tree frog and serpent coiled on a mossy branch together, dark jungle backdrop |
| Kingdom of Man | *See proposal below* |

**Inline imagery fixes within Animal Kingdom content cards:**
- "Sacred Toad" card currently uses a snail icon → swap to a toad image/icon
- "Kundalini Serpent" card → snake image
- "Kambo" card → frog image
- I will generate small (512×512) thematic illustrations for these three cards and replace the lucide icons with `<img>` tags, OR keep lucide and swap to correct lucide icons (`lucide-react` doesn't have toad/frog/snake — so generated images are the right call). Confirm direction.

---

## Part 3 · "Kingdom of Man" background — my thoughts

The other four kingdoms are non-human nature. Man is the conscious witness · the integrator. Three directions to choose from:

- **A · The Reverent Human** — silhouette of a BIPOC figure standing barefoot on earth at dawn, arms open, mist rising, mountains behind. Conveys "the temple is the body."
- **B · The Web of Kingdoms** — a human figure at center, faintly translucent, with roots, mycelium, crystals, and animals woven around them. Conveys "woven in, not above."
- **C · Hands of Earth** — close-up of hands cupping soil with a small seedling, crystals, and a tiny mushroom. Symbolic of stewardship.

My recommendation: **A** · matches the existing BIPOC sanctuary-seeker visual direction (per memory) and the page's "you are the temple" subtitle.

---

## Part 4 · "Kingdoms Are Waiting For You" footer video — concept only (NOT generating)

You asked for thoughts, not generation. Concept for when you're ready:
- 10-second cinematic montage: macro crystal facet → forest canopy pan → mushroom cap pushing through moss → frog blinking on a leaf → BIPOC hand pressing into earth → fade to title card.
- Could be assembled from existing site footage or generated via `videogen` later as a single clip with a slow drifting camera through a forest threshold where each kingdom subtly appears.
- Placement: replaces the current gradient "Kingdoms Are Waiting for You" footer with a `FooterVideoBanner`.
- I'll wait for your go-ahead before generating.

---

## Technical notes

- All four uploaded videos: copy from `user-uploads://` → `src/assets/`, import via `?url`, render as muted/autoplay/loop/playsInline `<video>` with absolute positioning and dark overlay.
- New section bg images: imported via ES module, rendered inside each `KingdomSection` as absolute layer with `pointer-events-none` and tuned opacity per palette so type contrast is preserved.
- No data, route, or business-logic changes. Presentation only.
- Follows existing RFRA-safe copy rules (no chemical names, no em-dashes, no emojis).

---

## Open questions before I build

1. **Kingdom of Man background**: A, B, or C above?
2. **Animal Kingdom card icons** (Toad / Snake / Frog): replace lucide icons with generated illustrations? (recommended)
3. **`woman_circle2.mp4`**: confirm Women's Circle footer placement with headline "The Circle Is Waiting For You" (matching men's pattern)?
4. **"Kingdoms Are Waiting For You" footer video**: hold for now and just add still images this round?
