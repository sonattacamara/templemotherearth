## Goals

1. Make sure each step of `/ceremony-intake` validates correctly with clear inline errors (no more silent "stuck on step 3").
2. Add a protected `/admin/intakes` page that lists, searches and filters submitted ceremony intakes from `form_submissions`.

---

## Part 1 — Ceremony Intake validation hardening

The form already uses Zod + `validationErrors` + a toast, but only Step 1 fields render the `data-error` wrapper. When a Step 2/3/4/6 field fails, the auto-scroll falls through to "scroll to top of form," which on long Step 4 looks like nothing happened — this is the "stuck" symptom.

Fixes in `src/pages/CeremonyIntake.tsx`:

- Step 2 (emergency contact) and Step 3 (ceremony selection): wrap each required field's container with `data-error={!!validationErrors.<field>}` and add the red ring + inline `<p className="text-xs text-destructive">` message under each. Currently only `ceremonyType`/`experienceLevel`/`intentions` show inline messages; do the same for `emergencyName`, `emergencyPhone`, `emergencyRelation`.
- Step 4: add `data-error` wrappers around every field that `getStep4ValidationErrors()` can flag (medications block, mental health block, substances block, allergies/body, ceremony experience, Kambo block). Today only the toast shows — users can't see which radio is missing. Add inline `<p className="text-xs text-destructive">` under each field group.
- Step 6 agreements: add the same `data-error` wrapper + inline message under each unchecked required checkbox so users immediately see which box blocks submission.
- `scrollToValidationTarget()` already targets `[data-error="true"]` — no change needed once the wrappers exist.
- Show a persistent banner at the top of any step that has errors: "Please complete the highlighted fields below" so the user has a visual cue beyond the toast.
- Keep the existing `canProceed()` button-dim behavior, but always allow clicking "Continue" so `validateStep()` runs and surfaces messages (right now the button is dimmed but still clickable — fine; just ensure styling reads as actionable).

No schema or backend change needed for Part 1.

---

## Part 2 — Admin Intakes review page

### Database

`form_submissions` already exists with RLS: `Only admins can read form submissions` using `has_role(auth.uid(), 'admin')`. The `app_role` enum has `{admin, user}`. No migration required for the table itself.

To grant access I'll need at least one admin row in `user_roles`. Plan:
- Add an `is_current_user_admin()` SQL helper (optional convenience) — or just reuse `has_role`.
- Provide a migration that inserts an admin row for the user-specified email (will ask which email at implementation time, or the user can run it themselves from Cloud).

### Route + page

New file `src/pages/AdminIntakes.tsx`, registered at `/admin/intakes` in `src/App.tsx`.

Behavior:
- Requires login (redirect to `/member/auth` if no `user`).
- Checks `user_roles` for `admin` (same pattern as `Analytics.tsx`). Non-admins see an "Access denied" panel.
- Loads `form_submissions` where `form_name = 'ceremony-intake'`, ordered by `created_at desc`, limit 200.
- Top toolbar:
  - Free-text search (matches name, email, phone in `metadata`).
  - Filter by `ceremonyType` (dropdown of distinct values).
  - Date range (last 7 / 30 / 90 / all).
  - "Flagged only" toggle (any flagged condition or Kambo contraindication).
  - CSV export of the filtered list.
- Table columns: Submitted, Name, Email, Phone, Ceremony, Experience, Flags badge, "View" button.
- Clicking a row opens a side `Sheet` (shadcn) showing the full intake nicely sectioned (Personal, Emergency, Ceremony, Health, Mental Health, Substances, Body, Previous Ceremony, Kambo, Intentions, Inner Landscape, Agreements). Render straight from `metadata` JSON using a small label map.
- "Open in GHL" link if a GHL contact ID is saved (skip if not present).

### Navigation

Add a small "Admin" section to the member portal sidebar / header that's only visible to admins, with links to `/analytics` and `/admin/intakes`. Pure UI gating; security stays server-side via RLS.

---

## Technical details

Files to edit:
- `src/pages/CeremonyIntake.tsx` — add `data-error` + inline error text on Step 2, 3, 4, 6 fields; add error banner at top of each step.

Files to create:
- `src/pages/AdminIntakes.tsx` — admin-gated review UI.
- `src/components/admin/IntakeDetailSheet.tsx` — formatted full-intake view.

Files to update:
- `src/App.tsx` — add `/admin/intakes` route.
- `src/components/Navigation.tsx` (or portal header) — conditional Admin link.

Migration:
- Insert an admin role in `user_roles` for the designated user (will confirm email when implementing).

No edge function changes. No changes to `submit-intake` or GHL integration.

---

## Out of scope

- Editing or deleting submissions (table has no UPDATE/DELETE policies; intakes are immutable by design).
- Re-architecting the intake form structure or wording.
- Adding email notifications on new intake.
