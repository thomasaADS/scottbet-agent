/**
 * All site links live here. Fill in the empty fields and the
 * matching buttons appear across the site automatically.
 */
export const site = {
  brand: "Scottbet",
  /** Where every "enter the site" button sends the visitor (referral link). */
  platformUrl: "https://scottbet.com/he",
  /** Customer-service WhatsApp number in international format, digits only, e.g. 972501234567. */
  whatsappNumber: "",
  /** Telegram link, e.g. https://t.me/username */
  telegramUrl: "",
};

export function whatsappUrl(text: string): string | null {
  if (!site.whatsappNumber) return null;
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

