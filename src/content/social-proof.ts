/**
 * Real customer material supplied by scottbet. Both lists start empty and the
 * matching blocks stay hidden until real entries are added here.
 */

export interface Testimonial {
  name: string;
  age: number;
  city: string;
  /** One or two sentences, in the customer's own words. */
  text: string;
}

/** Real customer recommendations (name, age, city, quote). */
export const TESTIMONIALS: Testimonial[] = [];

export interface PayoutProof {
  /** Path of a screenshot under /public, e.g. "/images/payouts/2026-11-win.webp". */
  image: string;
  /** Short caption, e.g. "משיכה של ₪4,200 · נובמבר 2026". */
  caption: string;
}

/** Real payout confirmations (screenshots with personal details hidden). */
export const PAYOUT_PROOFS: PayoutProof[] = [];
