I hear the frustration on the Veterans page. The current Kambo section still uses a framed static image inside the section. I would change it to the format you asked for: a full background visual with the words layered on top, so it feels like the story continues instead of dropping into a picture card.

## Immediate implementation plan

### 1. Women’s Circle footer video
- Use the uploaded `coushion.mp4` as the bottom video on the Women’s Circle page.
- Replace the current static `SanctuaryCTA` block with the same full video banner pattern used on the Men’s Circle page.
- Keep the headline superimposed over the video:

```text
The Circle Is
Waiting For You
```

- Rewrite the supporting line so it feels like sisterhood and return, not a transactional Eventbrite instruction.

### 2. Refine “Reserve Your Seat in the Circle” CTA language
I will update the affected ceremony and circle pages so the CTA text and supporting line flow with each page’s story. The goal is: less generic, less transactional, more aligned with the threshold the reader is standing at.

Likely updates:
- Hapé: “Enter the Forest Circle” or “Take Your Place in the Forest”
- Men’s Circle: “Step Into The Cove”
- Women’s Circle: “Take Your Seat in the Circle”
- Sacred Tea: “Take Your Seat at the Table” or “Enter the Tea Ceremony”
- Shared Sacred Series footer line: rewrite the generic “Reserve your seat in the circle” language into a softer preparation message.

I will keep Eventbrite links and form logic unchanged.

### 3. Veterans Transformation Program Kambo section fix
- Replace the current framed Kambo image card with a full width background image/video style section.
- Put the Kambo headline and veteran focused copy directly on top of the background with a dark overlay for readability.
- Keep it grounded for the veteran avatar: direct, plain spoken, no jargon, no “you should already know what this means.”
- Remove the current “Kambo: The Warrior’s Medicine That Heals What Pills Cannot” phrasing and use safer, more site aligned language.
- Clean up the most noncompliant words in that section while preserving the message: veterans are looking for root level restoration, not another waiting room or another pill bottle.

## Home page bounce rate strategy

My recommendation: yes, the Home page should push avatar relevance much higher. Right now it opens with broad temple language and then makes people scroll before they see themselves. For bounce rate, the first screen should answer:

```text
Is this for me?
What pain or threshold brought me here?
Where do I go next?
```

I would restructure the top of Home like this:

### First viewport
- Keep the cinematic hero, but make the copy less abstract and more visitor centered.
- Add three clear avatar pathways immediately under the hero CTA area:
  - “I need a ceremony”
  - “I’m a veteran carrying too much”
  - “I need community and integration”
- Keep “Sacred Blueprint” available, but not competing with the main path for first time visitors.

### Immediately below hero
Move a “Choose Your Threshold” section near the top with cards for the highest intent audiences:
- Kambo and purification
- Sacred Tea Ceremony
- Veterans Transformation
- Women’s Circle and Men’s Circle
- Sacred Series
- Community gatherings

This will help people identify themselves quickly and click deeper before they bounce.

### Social proof sooner
Move real community faces, testimonials, or “people like you come here when...” higher. The current “Faces of Temple Mother Earth” section is valuable, but it can become more conversion focused by pairing photos with avatar statements.

## Sacred Series strategy

My recommendation: make the page evergreen, but do not hide the full story of the 7 day arc.

Best structure:

```text
Top: Next Sacred Series cycle
Middle: The 7 day ceremonial arc
Bottom: Full year themes or past cycles
```

For the month issue:
- Do not start with March if March has passed.
- Show the next valid upcoming month or “Next cycle opens soon” at the top.
- Keep the full 7 day sequence visible because it explains the complete journey.
- If month specific themes matter, place past months lower as an archive or “2026 Series Themes,” not as the first thing visitors see.

This avoids monthly maintenance while keeping the page truthful and current.

## What I would not do right now
- I will not create any new videos.
- I will not change payment, Eventbrite, forms, or backend logic.
- I will not rebuild the whole Home or Sacred Series page unless you approve that as a separate implementation phase.

## Files I expect to update if approved
- `src/pages/sanctuary/WomensCircle.tsx`
- `src/pages/sanctuary/MensCircle.tsx`
- `src/pages/sanctuary/HapeCeremony.tsx`
- `src/pages/sanctuary/SacredTeaCeremony.tsx`
- `src/pages/VeteransTransformation.tsx`
- `src/components/sanctuary/SacredSeriesLayout.tsx`
- Copy uploaded `coushion.mp4` into `src/assets/` for the Women’s Circle footer