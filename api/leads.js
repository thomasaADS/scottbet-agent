// Receives the signup form. Forwards each lead to whichever destinations are
// configured as environment variables in Vercel:
//   LEADS_WEBHOOK_URL                      - any HTTPS endpoint (CRM, Zapier, Make, Google Sheet script)
//   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID  - a Telegram chat or group
// With nothing configured the request is rejected so that leads are never
// silently dropped.

import { sendMetaEvent } from "./_lib/meta.js";

function clean(value, max) {
  return String(value ?? "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max);
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const body = typeof request.body === "object" && request.body ? request.body : {};
  const lead = {
    name: clean(body.name, 100),
    phone: clean(body.phone, 20).replace(/[\s-]/g, ""),
    ageConfirmed: body.ageConfirmed === true,
    source: clean(body.source, 500),
    placement: clean(body.placement, 40),
    receivedAt: new Date().toISOString(),
  };

  if (lead.name.length < 2) return response.status(400).json({ error: "נא להזין שם מלא" });
  if (!/^\+?\d{9,15}$/.test(lead.phone)) return response.status(400).json({ error: "מספר טלפון לא תקין" });
  if (!lead.ageConfirmed) return response.status(400).json({ error: "יש לאשר גיל 18+" });

  const { LEADS_WEBHOOK_URL, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  const deliveries = [];

  if (LEADS_WEBHOOK_URL) {
    deliveries.push(
      fetch(LEADS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }),
    );
  }

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    const text = `ליד חדש מהאתר\nשם: ${lead.name}\nטלפון: ${lead.phone}\nמקור: ${lead.source || "ישיר"}`;
    deliveries.push(
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
      }),
    );
  }

  if (deliveries.length === 0) {
    console.error("Lead received but no destination is configured");
    return response.status(503).json({ error: "ההרשמה אינה זמינה כרגע, נסו שוב מאוחר יותר" });
  }

  const results = await Promise.allSettled(deliveries);
  const delivered = results.some((result) => result.status === "fulfilled" && result.value.ok);
  if (!delivered) {
    console.error("Lead delivery failed for every destination");
    return response.status(502).json({ error: "שגיאה בשליחה, נסו שוב" });
  }

  // The lead reached a destination, so count it as a conversion server-side too.
  const eventId = clean(body.eventId, 80);
  if (/^[\w-]{6,80}$/.test(eventId)) {
    await sendMetaEvent(request, {
      name: "Lead",
      eventId,
      sourceUrl: `https://${String(request.headers.host ?? "")}/`,
      phone: lead.phone,
      firstName: lead.name.split(/\s+/)[0],
    });
  }

  return response.status(200).json({ ok: true });
}
