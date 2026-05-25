
# Unified Admin Submissions Dashboard

Build a new admin page at `/admin/submissions` that shows **every** form submission across all form types in one readable place, complementing the existing `/admin/intakes` (which stays as-is for ceremony intakes only).

## What gets built

**New route:** `/admin/submissions` (added to `src/App.tsx`)

**New page:** `src/pages/AdminSubmissions.tsx`

Features:
- Admin-only access (same `has_role(auth.uid(), 'admin')` gate as `/admin/intakes`; non-admins see "Access Denied")
- Lists every row in `public.form_submissions`, newest first
- **Form-type filter** dropdown with all known form names: `ceremony-intake`, `volunteer`, `sponsor`, `facilitator`, `contact`, `veterans`, `retreats-inquiry`, `private-ceremony`, `traveling-ceremony`, `art-expo`, `newsletter`, `sacred-blueprint`
- **Search box** (filters by name, email, phone across the `metadata` JSON)
- **Date range filter** (last 7 / 30 / 90 days / all)
- Table columns: Date · Form Type · Name · Email · Phone · Actions
- **"View Details"** button opens a side drawer that converts the `metadata` JSON into a readable key/value list (every question + answer, formatted like the intake dashboard)
- **"Export CSV"** button — exports the currently filtered rows (flattens metadata into columns)
- Pagination (50 rows per page)

## What is NOT changed

- No edits to any form (ceremony intake or otherwise)
- No edits to how submissions are saved
- No schema changes — `form_submissions` table and RLS policies stay exactly as they are
- `/admin/intakes` stays untouched and keeps working for ceremony intakes
- No website design changes
- No publishing of unrelated changes
- Admin role for `sonattacamara@gmail.com` is still pending your signup at `/member/auth` (separate step — once you sign up and confirm, I'll grant the role and both `/admin/intakes` and `/admin/submissions` become accessible)

## Technical notes

- Uses existing Supabase client (`@/integrations/supabase/client`)
- Query: `supabase.from('form_submissions').select('*').order('created_at', { ascending: false })`
- RLS already enforces admin-only SELECT — no new policies needed
- Drawer uses existing `@/components/ui/sheet` or `dialog`
- CSV export done client-side (no edge function needed)
- Reuses the readable-metadata formatting pattern from `src/pages/AdminIntakes.tsx`

## Files touched

- `src/App.tsx` — add one `<Route>` for `/admin/submissions`
- `src/pages/AdminSubmissions.tsx` — new file (the dashboard)

That's it. Two files.
