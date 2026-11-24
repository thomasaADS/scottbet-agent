/**
 * Scene data for the scroll-scrub journey. One continuous film, delivered as
 * four frame-contiguous segments so each chapter owns its own copy.
 * Keep this array a module constant.
 */
import type {
  ScrollScrubScene,
  ScrollScrubTheme,
} from "@/components/scroll-scrub/scroll-scrub";

export const scrollScrubTheme: ScrollScrubTheme = {
  accent: "#FFD447",
  background: "#081A40",
  ink: "#FFFFFF",
  muted: "#C3CFEC",
};

function media(n: string) {
  return {
    clip: `/assets/world/scene-${n}.mp4`,
    mobileClip: `/assets/world/scene-${n}-mobile.mp4`,
    mobilePoster: `/assets/world/scene-${n}-mobile-poster.jpg`,
    poster: `/assets/world/scene-${n}-poster.jpg`,
  };
}

export const scrollScrubScenes: ScrollScrubScene[] = [
  {
    ...media("01"),
    id: "top",
    label: "פתיחה",
    kicker: "הסוכן הרשמי של Scottbet",
    title: "סוכן אישי. חשבון אחד. כל המשחקים.",
    body: "פותחים חשבון ב-Scottbet דרך סוכן שמלווה אתכם אישית, מההרשמה ועד המשיכה. בלי טפסים מסובכים ובלי להמתין לתמיכה.",
    tags: ["ספורט חי", "קזינו חי", "מכונות מזל"],
    align: "right",
    scroll: 1.6,
  },
  {
    ...media("02"),
    id: "worlds",
    label: "עולמות",
    title: "הגלגל כבר מסתובב",
    body: "רולטה, בלאק ג׳ק ובאקרה מול דילרים אמיתיים, מאות סלוטים וליין ספורט מכל העולם. הכול מאותו חשבון.",
    align: "right",
    scroll: 1.4,
  },
  {
    ...media("03"),
    id: "service",
    label: "שירות",
    title: "הפקדה ומשיכה מול בן אדם",
    body: "כל תנועה בחשבון נסגרת ישירות מול הסוכן. שאלה, בקשה או משיכה: מישהו אמיתי עונה לכם.",
    tags: ["ליווי אישי", "מענה מהיר"],
    align: "right",
    scroll: 1.4,
  },
  {
    ...media("04"),
    id: "play",
    label: "משחקים",
    title: "רוצים לטעום קודם?",
    body: "שישה משחקי דמו מחכים למטה: גלגל המזל, סלוטים, קראש ועוד. משחקים בחינם, בלי הרשמה ובלי כסף אמיתי.",
    align: "right",
    scroll: 1.6,
  },
];
