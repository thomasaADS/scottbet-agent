/** Site-wide links. */
export const site = {
  brand: "scottbet",
  /** Where visitors land after signing up (campaign parameters are passed along). */
  platformUrl: "https://scottbet.com/he",
  /** Customer-service WhatsApp, international format without "+". */
  whatsappNumber: "972504950760",
};

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent("היי, הגעתי מהאתר של scottbet ויש לי שאלה")}`;
