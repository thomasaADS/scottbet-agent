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
export const TESTIMONIALS: Testimonial[] = [
  { name: "דוד יוסף", age: 24, city: "חולון", text: "משחק באתר מעל שנה, אין מתחרים. ישן בראש שקט, יודע שמשלמים לי זכיות." },
  { name: "דוד טטנבאום", age: 48, city: "ראשון לציון", text: "שידורים ישירים למשחקי ספורט, זה משהו שלא היה עוד בישראל. מומלץ." },
  { name: "רפאל פרץ", age: 41, city: "דימונה", text: "שירות לקוחות אנושי, מענה מהיר. זכיתי ברולטה ב-5,000 ש\"ח, שילמו באותו יום." },
  { name: "כפיר נתן", age: 26, city: "עכו", text: "כל חמישי ערב בלאק ג'ק עם חברים, זה רק בסקוט בט." },
  { name: "יהונתן זאב", age: 34, city: "חיפה", text: "הרווחתי 36 אלף. שהשליח הגיע לבית לא האמנתי. חשבתי שלהרוויח כסף מאתר שעובד בישראל זה סיפורים. סקוט בט זה הבית שלי!" },
  { name: "רובי אמיר", age: 35, city: "קדימה", text: "מומלץ, מומלץ, מומלץ. משחק כאן שנים, מקבל תשלומים כמו שעון, מפקיד בראש שקט." },
];

export interface PayoutProof {
  /** Path of a screenshot under /public, e.g. "/images/payouts/2026-11-win.webp". */
  image: string;
  /** Short caption, e.g. "משיכה של ₪4,200 · נובמבר 2026". */
  caption: string;
}

/** Real payout confirmations (screenshots with personal details hidden). */
export const PAYOUT_PROOFS: PayoutProof[] = [];
