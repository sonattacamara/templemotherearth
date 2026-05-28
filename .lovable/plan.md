# Facilitator Page — Rewrite & Conversion Plan

## 1. Discovery (how someone gets there)

Today `/join-facilitator` is only linked from three footers. No one finds it. Add real entry points:

- **Navigation**: Add "Facilitators" under the "Get Involved" / Community group in `Navigation.tsx` (desktop + mobile drawer).
- **Homepage**: Add a small "Are you a facilitator?" rail near the bottom of `Index.tsx` (after community, before footer) — one line + link, not a full block.
- **About page**: Add a "Called to facilitate?" inline CTA near the team / facilitator roster section.
- **Community Care / Volunteer**: Add a sibling card "If you're already certified and called to lead, walk this path instead → /join-facilitator".
- **MemberPortal**: Add a quiet link in the Quick-Access area for members who are practitioners.

This is the highest-leverage change — copy can't convert traffic that never arrives.

## 2. Replace the image

- Remove `image-mid-facilitator.jpg` (the white man pouring a cup) from `MidImageBanner`.
- Replace with a BIPOC-aligned sanctuary image already in the asset library (candidates: a sanctuary threshold, hands-on-altar, or a facilitator-in-circle shot). I'll pick one consistent with the Video Direction memory (no drones, no aerial, BIPOC seekers, candlelight, sanctuary objects).
- Keep the footer video (`video-footer-facilitator.mp4`) as-is — user approved.

## 3. Rewrite the page around the facilitator avatar

The avatar is a **certified, experienced practitioner with their own modality** who needs **space + community + a held container** to offer their work. They are not job-seekers; they're answering a calling. Page restructured top-to-bottom:

### a. Hero — mirror, not pitch
- Eyebrow: "For the called"
- H1: "You already do the work. You're looking for the temple to do it in."
- Sub: "Space. Sangha. Sanctuary. We hold the container — you bring the calling."
- Primary CTA: "Answer the Call" → scrolls to form
- Secondary CTA: "Walk Through the Doors" → /about

### b. "Does this mirror you?" pain-point block (avatar recognition)
Six short mirrors (two columns), each one-line:
- You hold sacred work but you're holding it alone.
- You're tired of renting yoga studios that don't understand what you do.
- You've built your craft. You need a community that's already gathered.
- You want to focus on the work, not on marketing, booking, and logistics.
- You want elders, peers, and a lineage to be accountable to.
- You're ready to stop "selling sessions" and start serving in ceremony.

### c. "What we hold for you" — the offer (needs)
Replace the generic "Trained / Heart-Centered / Community-Minded" trio with what the facilitator actually gets:
- **Sanctuary Space** — consecrated rooms, altar, sound, fire. Show up and serve.
- **A Gathered Community** — our members are already arriving. You meet souls, not strangers.
- **A Held Container** — intake, screening, integration, aftercare handled by the temple.
- **Lineage & Eldership** — Dr. George Love, Sonatta, and the council to walk with you.
- **Sacred Reciprocity** — energy exchange that honors your craft (no specifics, RFRA-safe wording).
- **Legal Covering** — facilitate inside a 508(c)(1)(A) sacred ceremony church.

### d. "Who we are listening for" — the standard
Soften "requirements" into discernment language:
- Certified / lineage-trained in your modality (Earth Medicine, Kambo, Hapé, Cacao, breathwork, yin, sound, integration, somatic, etc.)
- Years of personal practice and held ceremonies
- Insurance / paperwork where your modality requires it
- A heart aligned with our six Sacred Values
- Willingness to sit in circle as a student before serving as a steward

### e. "Walk Through the Doors" — process (removes friction)
Four steps:
1. Share your calling (the form)
2. Council reviews and reaches out
3. Sit in our circle as a guest (we meet your energy)
4. Be invited to facilitate in sanctuary

### f. Application form (kept, lightly rewritten)
- Same fields, same edge function `submit-facilitator` — no backend change.
- Section headline: "Share Your Calling"
- Field labels rewritten in mirror language ("The modality I'm called to hold", "How I've been trained and held", "What's stirring this calling right now").
- Submit button: "Send the Smoke Signal" (keep CTA poetic, RFRA-safe).
- Success state: "The council has received your calling."

### g. Mid-image banner (new image, refined copy)
- Eyebrow: "The Calling"
- Headline: "Hold Space. **Become** Space."
- Body: "The facilitators we're listening for aren't looking for a job. They're answering a calling. If this stirs something in you, don't turn away — walk toward it."
- CTA: "Answer the Call" → #apply

### h. Footer video banner (kept)
- Headline tightened: "Step Onto **The Path**"
- Body: "We're a circle of facilitators learning, growing, and holding sacred work together. Come walk with us."

### i. Remove the Eventbrite ceremony list at the bottom
It dilutes the page intent. Replace with a single quiet line: "Not a facilitator? **Sit in circle with us first →** /offerings".

## 4. SEO + meta
- Title: "Facilitators · Answer the Call to Serve in Sanctuary"
- Description: rewritten around "certified practitioners called to facilitate inside a sacred ceremony church."
- Single H1, semantic sections, alt text on the new image.

## 5. Files touched

- `src/pages/JoinFacilitator.tsx` — full rewrite of copy/structure (form logic unchanged)
- `src/components/Navigation.tsx` — add "Facilitators" link
- `src/pages/Index.tsx` — add small facilitator rail
- `src/pages/About.tsx` — add inline CTA
- `src/pages/Volunteer.tsx` and/or `CommunityCare.tsx` — add sibling card
- `src/pages/MemberPortal.tsx` — quiet link
- New image swap in `MidImageBanner` (pick from existing assets; no new generation unless you'd like one)

No database, edge function, or form-logic changes. Pure UX + copy + discovery.

---

**Two quick choices before I build:**

1. **Image for the mid-banner** — want me to (a) pick the best existing BIPOC sanctuary asset already in the project, or (b) generate a new on-brand image (candlelit hands on altar, facilitator in circle)?
2. **Nav placement** — add "Facilitators" as a top-level nav item, or nest it under a "Get Involved" dropdown alongside Volunteer / Membership / Donate?
