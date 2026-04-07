

# Plan: Migrate GHL Integration from Webhook to Direct API

## What This Does

Right now, every form on your site sends data to a single GoHighLevel webhook URL. This works for triggering automations, but it does not intelligently create or update contacts in your CRM. We will replace that webhook approach with direct GHL API calls using your **Private Integration Token** and **Location ID**, so that:

- **Existing contacts** get updated (no duplicates)
- **New contacts** get created automatically
- Every form submission flows cleanly into your GHL CRM

## All Forms That Collect Contact Info (13 total)

| # | Form / Trigger | Edge Function | Fields Collected |
|---|----------------|--------------|-----------------|
| 1 | Contact Page | `submit-contact` | First, Last, Email, Phone, Subject, Message |
| 2 | Ceremony Intake | `submit-intake` | First, Last, Email, Phone + ceremony details |
| 3 | Sacred Blueprint | `submit-sacred-blueprint` | First, Last, Email, Phone + birth info |
| 4 | Volunteer | `submit-volunteer` | First, Last, Email, Phone + interests |
| 5 | Sponsor | `submit-sponsor` | First, Last, Email, Phone + org, type |
| 6 | Facilitator | `submit-facilitator` | First, Last, Email, Phone + modality |
| 7 | Private Ceremonies | `submit-private-ceremony` | First, Last, Email, Phone + details |
| 8 | Traveling Ceremonies | `submit-traveling-ceremony` | First, Last, Email, Phone + details |
| 9 | Retreats Inquiry | `submit-retreats-inquiry` | First, Last, Email, Phone + interest |
| 10 | Veterans Program | `submit-veterans` | First, Last, Email, Phone + service info |
| 11 | Art Expo | `submit-art-expo` | First, Last, Email, Phone + art details |
| 12 | Newsletter | `submit-newsletter` | Email only |
| 13 | Welcome Email (signup) | `send-welcome-email` | First, Last, Email |

## Implementation Approach

### Step 1 — Store Your Credentials as Secrets

Two new secrets will be added to your backend:
- **`GHL_API_TOKEN`** — Your Private Integration Token
- **`GHL_LOCATION_ID`** — Your Location ID (vMRpHtI7DCeMXTjneZMn)

### Step 2 — Create a Shared GHL Helper Function

Build a reusable utility (`supabase/functions/_shared/ghl-contact.ts`) that all 13 edge functions will import. This helper will:

1. **Search** GHL for an existing contact by email using `GET /contacts/lookup/email/{email}`
2. **If found** → `PUT /contacts/{contactId}` to update their record with the latest info and add tags
3. **If not found** → `POST /contacts/` to create a new contact with all provided fields and tags

All calls use the GHL v2 API (`https://services.leadconnectorhq.com/contacts/`) with your Private Integration Token in the `Authorization: Bearer` header and Location ID in the request body/params.

### Step 3 — Update All 13 Edge Functions

Each function gets updated to:
1. Import the shared GHL helper instead of using `GHL_WEBHOOK_URL`
2. Call `upsertGHLContact()` with the contact data + form-specific tags
3. Keep all existing validation, CORS handling, and form_submissions logging intact

The tag system stays the same (e.g., `contact-form-submission`, `volunteer-application`, `sponsor-inquiry`) so your existing GHL workflows and automations remain unaffected.

### Step 4 — Remove the Old Webhook Secret

Once all functions are migrated and verified, the `GHL_WEBHOOK_URL` secret becomes unused and can be cleaned up.

## Technical Details

**GHL API Endpoints Used:**
- `GET https://services.leadconnectorhq.com/contacts/lookup/email/{email}` — lookup by email
- `POST https://services.leadconnectorhq.com/contacts/` — create contact
- `PUT https://services.leadconnectorhq.com/contacts/{id}` — update contact

**Request Headers:**
```text
Authorization: Bearer {GHL_API_TOKEN}
Version: 2021-07-28
Content-Type: application/json
```

**Contact Payload Structure:**
```text
{
  locationId: GHL_LOCATION_ID,
  firstName, lastName, name, email, phone,
  tags: ["form-specific-tag"],
  source: "temple-mother-earth-website",
  customFields: [form-specific extras like message, ceremony type, etc.]
}
```

**No frontend changes needed** — all form pages stay exactly the same; only the backend edge functions change.

## What I Need From You

Before I start building, I will need you to provide:
1. Your **GHL Private Integration Token**
2. Confirmation of your **Location ID** (I have `vMRpHtI7DCeMXTjneZMn` from your workspace notes — is that correct?)

