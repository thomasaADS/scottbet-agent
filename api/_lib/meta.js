// Server-side events for the Meta Conversions API. The access token lives only
// in the META_CAPI_TOKEN environment variable and never reaches the browser.
import { createHash } from "node:crypto";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

/** Israeli mobile numbers to E.164 digits without "+", as Meta expects. */
function normalizePhone(phone) {
  const digits = String(phone ?? "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("972")) return digits;
  if (digits.startsWith("0")) return `972${digits.slice(1)}`;
  return digits;
}

function cookie(request, name) {
  const match = String(request.headers.cookie ?? "").match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function clientIp(request) {
  const forwarded = String(request.headers["x-forwarded-for"] ?? "").split(",")[0].trim();
  return forwarded || undefined;
}

/**
 * Sends one event. Resolves to true when Meta accepted it, false otherwise.
 * Never throws: tracking must not break the visitor's request.
 */
export async function sendMetaEvent(request, { name, eventId, sourceUrl, phone, firstName }) {
  const token = process.env.META_CAPI_TOKEN;
  const pixelId = process.env.META_PIXEL_ID;
  if (!token || !pixelId) return false;

  const userData = {
    client_ip_address: clientIp(request),
    client_user_agent: request.headers["user-agent"],
    fbp: cookie(request, "_fbp"),
    fbc: cookie(request, "_fbc"),
    country: [sha256("il")],
  };
  const normalized = normalizePhone(phone);
  if (normalized) userData.ph = [sha256(normalized)];
  if (firstName) userData.fn = [sha256(String(firstName).trim().toLowerCase())];

  const body = {
    data: [
      {
        event_name: name,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: sourceUrl,
        user_data: userData,
      },
    ],
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) console.error("Meta event rejected", name, response.status, (await response.text()).slice(0, 300));
    return response.ok;
  } catch (error) {
    console.error("Meta event failed", name, error instanceof Error ? error.message : error);
    return false;
  }
}
