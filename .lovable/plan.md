

# Plan: Fix Ceremony Intake Form & Add /intake Route

## What's Wrong

Looking at the current code, the form buttons use `disabled={!canProceed()}` which visually grays out the Continue button but `handleNext()` is still callable. The real issue: `canProceed()` returns a truthy check, but `validateStep()` uses Zod schemas that only cover steps 1-3. For step 4, `validateStep()` has no schema match, so it silently returns `true` --- but `canProceed()` for step 4 checks `!totalFlagged`, which blocks users who don't have flagged conditions from proceeding if they haven't filled required fields.

More critically: the user's instruction references `pregnant` and `allergies` radio fields that cause `undefined` vs `""` issues. Looking at the current state, `hasAllergies` is initialized as `""` which is correct, but there is no `pregnant` field at all in the form --- the pregnancy check is buried inside the medical conditions checklist, not a standalone radio. This suggests the user may have been testing a different version or the issue manifests differently on mobile.

## What I'll Do

### 1. Add `/intake` Route
Add a second route in `App.tsx` pointing to the same `CeremonyIntake` component so both `/ceremony-intake` and `/intake` resolve correctly.

### 2. Fix Step Validation & Progression
- Ensure `validateStep()` covers all steps (not just 1-3) to prevent silent failures
- Make `handleNext()` scroll to the first validation error when validation fails, so users see what's missing instead of the button appearing frozen
- Add explicit error messages on step 4 for required radio fields (`takingMedications`, `hasAllergies`, etc.) that currently have no validation

### 3. Ensure All Radio Fields Initialize Correctly
Audit all radio/yes-no fields in `formData` state to confirm they initialize as `""` (not `undefined`). The current code already does this correctly for most fields, but I'll double-check every field used in `radioYesNo()` calls.

### 4. Add Visual Feedback on Button Press
When `canProceed()` returns false, show a toast or inline message telling the user what's missing, instead of silently disabling the button.

### 5. Update Footer Text
Change "sacred ceremony church" to "sacred ceremony temple" in the footer on line 1154.

## Technical Details

**Files modified:**
- `src/App.tsx` — add `<Route path="/intake" element={<CeremonyIntake />} />`
- `src/pages/CeremonyIntake.tsx` — fix validation logic, add error feedback, ensure radio field initialization

**No backend changes needed.** The edge function `submit-intake` and GHL integration remain unchanged.

