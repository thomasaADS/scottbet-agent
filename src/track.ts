type Fbq = (action: string, name: string, params?: object, options?: { eventID: string }) => void;

export function newEventId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

/** Fires a Meta Pixel event in the browser with an id the server can deduplicate against. */
export function trackPixel(event: string, eventId: string) {
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (typeof fbq === "function") fbq("track", event, {}, { eventID: eventId });
}

/** Mirrors the same event to the server-side Conversions API. */
export function trackServer(event: string, eventId: string) {
  try {
    void fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, eventId, path: window.location.pathname + window.location.search }),
      keepalive: true,
    }).catch(() => undefined);
  } catch {
    /* tracking must never break the page */
  }
}
