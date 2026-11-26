// Mirrors browser pixel events to the Meta Conversions API so they are still
// counted when the browser pixel is blocked. Deduplicated by event id.
import { sendMetaEvent } from "./_lib/meta.js";

const ALLOWED = new Set(["PageView", "Contact"]);

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }
  const body = typeof request.body === "object" && request.body ? request.body : {};
  const name = String(body.event ?? "");
  const eventId = String(body.eventId ?? "").slice(0, 80);
  if (!ALLOWED.has(name) || !/^[\w-]{6,80}$/.test(eventId)) {
    return response.status(400).json({ error: "Invalid event" });
  }
  const host = String(request.headers.host ?? "");
  const path = String(body.path ?? "/").slice(0, 300);
  const sourceUrl = `https://${host}${path.startsWith("/") ? path : "/"}`;
  const sent = await sendMetaEvent(request, { name, eventId, sourceUrl });
  return response.status(200).json({ ok: true, sent });
}
