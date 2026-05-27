const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadInput = {
  firstName?: unknown;
  lastName?: unknown;
  email?: unknown;
  phone?: unknown;
};

export type CleanLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export function validateLead(data: LeadInput): { ok: true; value: CleanLead } | { ok: false; error: string } {
  const firstName = String(data.firstName ?? "").trim().slice(0, 100);
  if (firstName.length < 1) return { ok: false, error: "First name is required." };

  const lastName = String(data.lastName ?? "").trim().slice(0, 100);
  if (lastName.length < 1) return { ok: false, error: "Last name is required." };

  const email = String(data.email ?? "").trim().toLowerCase().slice(0, 255);
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Invalid email address." };

  const phone = String(data.phone ?? "").trim().slice(0, 25);

  return { ok: true, value: { firstName, lastName, email, phone } };
}