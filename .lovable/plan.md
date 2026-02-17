

## Replace Mexico Immersion Photos with Real Pictures

The International Immersions page (`/retreats-inquiry`) currently uses 5 placeholder images in its "Your Sacred Space Awaits" gallery section. You've provided 4 real photos of the Sayulita property. Here's the plan:

### Photo Mapping

The 4 uploaded photos will replace the existing placeholder assets:

| Current Placeholder | Replaced With | Description |
|---|---|---|
| `immersion-aerial.jpg` | Aerial coastline shot (image 1) | Clifftop property from above |
| `immersion-hammock.jpg` | Second aerial/coastal view (image 2) | Beach and lush hillside |
| `immersion-interior.jpg` | Hammock with ocean view (image 3) | Relaxation spot with turquoise water |
| `immersion-palapa.jpg` | Palapa from beach level (image 4) | Thatched-roof structure with rocks |

The 5th gallery slot (`immersion-sunset.jpg`) will be removed from the gallery since we have 4 real photos, which works well in a 2-column + 2-column grid layout.

### Technical Steps

1. Copy each uploaded photo into `src/assets/`, overwriting the existing placeholder files with matching names
2. Update the gallery grid in `RetreatsInquiry.tsx` to display 4 photos instead of 5, adjusting the layout for a clean 2x2 or featured-grid arrangement
3. Update alt text and captions to accurately describe the real photos

### What Changes

- **4 asset files replaced** in `src/assets/` (same filenames, real photos)
- **1 file edited**: `src/pages/RetreatsInquiry.tsx` -- gallery array reduced to 4 items with updated captions/alt text and adjusted grid layout
- The hero background image (`offering-retreat.jpg`) stays as-is unless you'd like one of these used there too

