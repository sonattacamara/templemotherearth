const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

interface GHLContactPayload {
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  tags?: string[];
  source?: string;
  customFields?: { id: string; value: string }[];
}

/**
 * Upsert a contact in GoHighLevel.
 * - Looks up by email first.
 * - If found → PUT to update (merges tags).
 * - If not found → POST to create.
 */
export async function upsertGHLContact(
  payload: GHLContactPayload
): Promise<{ success: boolean; contactId?: string; action?: string; error?: string }> {
  const GHL_API_TOKEN = Deno.env.get("GHL_API_TOKEN");
  if (!GHL_API_TOKEN) throw new Error("GHL_API_TOKEN is not configured");

  const GHL_LOCATION_ID = Deno.env.get("GHL_LOCATION_ID");
  if (!GHL_LOCATION_ID) throw new Error("GHL_LOCATION_ID is not configured");

  const headers: Record<string, string> = {
    Authorization: `Bearer ${GHL_API_TOKEN}`,
    Version: GHL_API_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const email = payload.email.trim().toLowerCase();

  // Step 1: Lookup existing contact by email
  let existingContactId: string | null = null;
  try {
    const lookupUrl = `${GHL_API_BASE}/contacts/lookup/email/${encodeURIComponent(email)}?locationId=${GHL_LOCATION_ID}`;
    const lookupRes = await fetch(lookupUrl, { method: "GET", headers });
    if (lookupRes.ok) {
      const lookupData = await lookupRes.json();
      if (lookupData?.contacts?.[0]?.id) {
        existingContactId = lookupData.contacts[0].id;
      }
    }
  } catch (e) {
    console.warn("[GHL] Lookup failed, will attempt create:", e);
  }

  const contactBody: Record<string, unknown> = {
    locationId: GHL_LOCATION_ID,
    email,
    ...(payload.firstName && { firstName: payload.firstName }),
    ...(payload.lastName && { lastName: payload.lastName }),
    ...(payload.name && { name: payload.name }),
    ...(payload.phone && { phone: payload.phone }),
    ...(payload.tags && { tags: payload.tags }),
    ...(payload.source && { source: payload.source }),
    ...(payload.customFields && { customFields: payload.customFields }),
  };

  // Step 2: Update or Create
  if (existingContactId) {
    const updateRes = await fetch(`${GHL_API_BASE}/contacts/${existingContactId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(contactBody),
    });
    if (!updateRes.ok) {
      const errText = await updateRes.text();
      console.error(`[GHL] Update failed [${updateRes.status}]: ${errText}`);
      return { success: false, error: `Update failed: ${updateRes.status}` };
    }
    console.log(`[GHL] Updated contact ${existingContactId}`);
    return { success: true, contactId: existingContactId, action: "updated" };
  } else {
    const createRes = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers,
      body: JSON.stringify(contactBody),
    });
    if (!createRes.ok) {
      const errText = await createRes.text();
      console.error(`[GHL] Create failed [${createRes.status}]: ${errText}`);
      return { success: false, error: `Create failed: ${createRes.status}` };
    }
    const createData = await createRes.json();
    const newId = createData?.contact?.id || "unknown";
    console.log(`[GHL] Created contact ${newId}`);
    return { success: true, contactId: newId, action: "created" };
  }
}
