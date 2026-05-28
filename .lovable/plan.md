# Plan: Footer videos, Cacao rewrite, Kambo schedule, site-wide emoji sweep

## 1. Footer videos

**Home page (`src/pages/Index.tsx`)**
- Replace existing drone footer video (`video-footer-home.mp4`) with a newly generated 1080p video: BIPOC seekers walking together through the temple threshold/archway door, slow reverent pace, warm golden hour, dark jungle green tones. Camera fixed, 10s loop. Keep the existing overlay copy ("The Door Is Open · Walk In").
- Save new asset as `src/assets/video-footer-home-threshold.mp4`. Old file stays in repo unused (cheap; avoids breaking other refs).

**Sacred Series page (`src/pages/SacredSeries.tsx`)**
- Copy uploaded `answercall.mp4` to `src/assets/video-sacred-series-answercall.mp4`.
- Add `<FooterVideoBanner>` at the end of the page (above whatever currently closes it), using the answercall video as background with the existing call-to-action write-up layered on top in the foreground. Same component pattern already used on Home / Membership / Veterans.

## 2. Future video creation rule (memory update)
Save a new memory: `mem://style/video-direction` — "Never generate drones, aerial swoops, or anything outside the sanctuary ecosystem. Always feature BIPOC seekers, sacred ritual objects, candlelight, plants, water, threshold/door imagery. Match avatar: heart-led, spirit-forward, luxurious yet grounded." Add a one-line reference in Core of `mem://index.md`.

## 3. Kambo page (`src/pages/sanctuary/KamboCeremony.tsx`)
Add weekly schedule directly into both `PathCard` descriptions and the bottom-section CTAs so seekers see the day/time before clicking Eventbrite:
- **Co-ed with King James** → append "Sundays · 8:00 AM"
- **Women's Only · The Sacred Release** → append "Saturdays · 8:00 AM"

Placement: small line under the title, above the description. Styled in gold (`text-[hsl(45,70%,55%)]`), uppercase, tracked.

## 4. Cacao page rewrite (`src/pages/sanctuary/CacaoCeremony.tsx`)

**Reframe**: From ceremonial-grade rite → soft microdose heart-opening social entry-point to the sanctuary.

**Remove**:
- All emoji characters
- Pre-screening language
- Health / medical disclosures
- Medical intake form references
- Ceremony-grade FAQs (keep only soft logistical FAQs if any: parking, what to wear, what to bring)
- Anything implying "you must qualify"

**Keep**:
- How to arrive ready (light/aspirational version: open heart, comfortable clothes)
- What to bring (water, journal, layers)

**Add / rewrite** with **heart-opening soft-entry voice**:
- Hero subhead: "Your softest doorway into our sanctuary. No fasting. No intensity. Just cacao, candlelight, music, and a community that finally feels like home."
- Avatar-mirror keypoints (the "oh yeah, that's me" moments): "You've been craving real connection." / "You want sacred without scary." / "You want to feel something again without forcing it."
- Lifestyle benefit cards: Heart opens · Nervous system softens · Strangers become sisters & brothers
- Soft CTA bottom: "Pull up a cushion. The cacao is already warm."

**Visual upgrade** (replacing emoji anchors): Use Lucide icons (`Heart`, `Flame`, `Users`, `Music`, `Moon`) in gold circles, OR small generated imagery if the layout calls for it (will decide during implementation — leaning Lucide for speed and consistency).

## 5. Site-wide emoji sweep
- Grep entire `src/` for emoji unicode ranges and replace with Lucide SVG icons or simply remove if decorative.
- Audit all ceremony pages, landing pages, journal posts, portal pages, components.
- Where an emoji functioned as a section anchor (e.g. 🌿, ✨, 🔥), swap to thematic Lucide icon in gold.
- This is the slowest item. Will be the last pass.

## 6. Out of scope for this plan
- Analytics conversation (you want to discuss recommendations first — separate thread when you're ready)
- Pixel/webhook IDs (waiting on you)
- Phase 2/3 ceremony footer rollout

## Technical notes
- Video generation: use `videogen--generate_video` with starting-frame from an existing temple-door image if one exists in `src/assets/` (will check), else text-to-video at 16:9 1080p, 10s, camera_fixed=true for the reverent slow-walk feel.
- All new copy follows RFRA rules (no medical/clinical terms), no em/en dashes (middle dot only), no emojis, Lucide icons only.
- `FooterVideoBanner` component already exists and handles overlay copy + CTA — no new component needed.

## Order of execution
1. Copy `answercall.mp4` into assets
2. Add Sacred Series footer banner (fastest, uses uploaded asset)
3. Kambo schedule lines (5-min edit)
4. Generate new Home threshold video (longest single step, runs while I work on Cacao)
5. Cacao rewrite (large but mechanical)
6. Site-wide emoji sweep
7. Update memory with video direction rule

Ready to build on your approval.