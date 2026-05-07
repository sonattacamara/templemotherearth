## Heads up · we already have a /volunteer page

You may not have realized it, but Temple Mother Earth already has a working volunteer page at `/volunteer` with a hero, "Sacred Energy Exchange" explainer, and a form that pipes directly into GoHighLevel (via the `submit-volunteer` edge function). The Google Sites version is older and has more depth in one area you don't yet have on Lovable: **the seven sacred role descriptions**.

So the work here is not "build from scratch" · it's **upgrade what exists** to match (and surpass) the Google Sites depth, and then promote it properly.

---

## Recommendation on Linktree

**Do not put `/volunteer` on Linktree.** That contradicts your Core Strategy memory ("Single source of truth site, no Linktree, native integration"). Linktree fragments your funnel, makes analytics impossible, and trains people to leave your site. Volunteer should be a first-class destination on `templemotherearth.org` itself, surfaced everywhere it's relevant.

---

## What the upgraded /volunteer page will include

### 1. Hero (refined)
Keep the existing hero structure. Tighten the copy to lead with mission ("Service is the Sacrament") and add a single primary CTA that scrolls to the sacred roles grid.

### 2. The Seven Sacred Roles (NEW · the missing piece)
A premium grid of role cards, each with a Lucide icon, sacred title, and the poetic description from the Google Sites version (lightly edited for tone). One card per role:

1. **Guardian of Sacred Hospitality** · Reception, greeting, holding the threshold
2. **Weavers of Sacred Gatherings** · Events team, ceremony setup, flow
3. **Alchemists of Digital Vibration** · Social media, content posting
4. **Scribes of Visual Revelation** · Graphic design, flyers, visual identity
5. **Emissaries of Unity** · Community outreach, partnerships, ambassadorship
6. **Guardians of Gaia's Heartbeat** · Land stewardship, forest cleanup, garden
7. **Architects of Divine Restoration** · Construction, repair, building work

Each card also has a "How you'd serve" bullet list and an "Energy Exchange" line so volunteers see the tangible give-and-receive.

### 3. Sacred Energy Exchange (kept)
The existing Serve · Receive Blessings · Heal triptych stays as the values band. We'll move it directly under the roles so the flow is: see the roles → understand the exchange → apply.

### 4. Application form (upgraded)
The existing form already syncs to GHL · we'll extend the "Areas of interest" radio so it matches the seven sacred role names, and flip it from radio (one only) to checkbox (multi · most volunteers want to serve in more than one area).

### 5. Closing CTA
A "Continue Your Journey" footer linking to Membership, Sacred Series, and Donate · same pattern used on ceremony pages.

---

## Promotion plan · how /volunteer gets discovered

We'll expose /volunteer in five places, all native:

1. **Top nav · Get Involved dropdown** · add "Volunteer · Serve the Temple" entry alongside Membership and Donate
2. **Homepage Get Involved band** · already exists; ensure Volunteer card has its own tile with a clear CTA, not just a footer link
3. **Footer** · Volunteer link already lives in the Get Involved column · keep
4. **Membership page** · add a "Can't afford full reciprocity? Serve in exchange" callout pointing to /volunteer (this is Sacred Energy Exchange in practice)
5. **Sacred Series & ceremony pages** · subtle "Volunteer for this ceremony" line in the Continue Your Journey grid for those who want to serve specific events

---

## Technical notes (for the implementation pass)

- Page: `src/pages/Volunteer.tsx` · refactor in place, add `RolesGrid` section between Hero and Sacred Energy Exchange
- Icons: `Sparkles, CalendarHeart, Megaphone, Palette, HeartHandshake, TreePine, Hammer` (Lucide)
- Form: change `interests` from string → `string[]`; update `submit-volunteer` edge function to accept array and join with " · " when posting to GHL
- Imagery: each role card gets a small Lucide icon · no role photos needed (avoids stock-photo trap and keeps load fast)
- SEO: title stays "Volunteer | Serve Temple Mother Earth Community"; add JSON-LD `VolunteerOpportunity` schema for each role
- Promotion edits:
  - `src/components/Navigation.tsx` · add Volunteer to Get Involved dropdown
  - `src/pages/Membership.tsx` · add "Serve in exchange" callout
  - Homepage Get Involved tile already exists · confirm link

---

## Questions before implementation

1. **Roles to include** · ship all seven from Google Sites, or do you want to add/remove any (e.g. Kitchen Stewards, Photographers/Videographers, Sound Healers)?
2. **Form interests** · keep it simple (one selection) or upgrade to multi-select checkboxes?
3. **Membership / Energy Exchange callout** · should volunteer hours convert to actual ceremony credits (tracked), or stay as informal "we'll honor your service" language for now?
