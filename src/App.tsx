import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

import { Nav, SiteFooter } from "@/components/site/chrome";
import { DemoGames } from "@/components/site/games";
import { ArticlePage } from "@/Page";
import { HOME_FAQ, findPage } from "@/seo/pages";
import "@/ref.css";
import "@/components/site/games.css";
import "@/components/site/pages.css";
import { site } from "@/site-config";

const YEARS = 8;
const SIGNUP = "#signup";
const SIGNED_KEY = "scottbet:signed-up";
const TRACKING = /^(utm_\w+|gclid|fbclid|ttclid)$/;

/** Destination site, carrying the visitor's campaign parameters along. */
function siteUrl(): string {
  try {
    const url = new URL(site.platformUrl);
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (TRACKING.test(key)) url.searchParams.set(key, value);
    });
    return url.toString();
  } catch {
    return site.platformUrl;
  }
}

const TOUR = [
  { src: "/images/site-home.webp", caption: "כל המשחקים החיים במסך אחד" },
  { src: "/images/site-live-match.webp", caption: "שידור חי ויחסים על אותו מסך" },
  { src: "/images/site-slots.webp", caption: "סלוטים של הספקים הגדולים" },
  { src: "/images/site-live-pitch.webp", caption: "רואים את כל המגרש, בלייב" },
  { src: "/images/site-live-casino.webp", caption: "רולטה וקזינו חי" },
  { src: "/images/site-live-odds.webp", caption: "יחסים שמתעדכנים בכל התקפה" },
];

const STATS = [
  { value: `${YEARS}+`, label: "שנים בתחום" },
  { value: "24/7", label: "תמיכה בתוך האתר" },
  { value: "100%", label: "מותאם לנייד" },
  { value: "0", label: "סוכנים" },
];

const COMPARE = [
  { them: "המשיכה תלויה בסוכן", us: "תשלום זכיות מיידי, ישירות מהחשבון" },
  { them: "זמין רק כשהסוכן עונה", us: "תמיכה 24/7 בצ'אט בתוך האתר" },
  { them: "בונוס לפי מצב הרוח", us: "100% בונוס הצטרפות, קבוע ושקוף" },
  { them: "הפסדתם? זה נגמר שם", us: "עד 20% החזר חודשי על הפסדים" },
  { them: "אין תיעוד, יש רק מילה", us: "כל הפקדה ומשיכה מתועדות בחשבון" },
];

const BADGES = [
  { title: `${YEARS}+ שנים`, text: "פעילות רציפה בתחום" },
  { title: "תשלום מיידי", text: "הזכיות ישירות אליכם" },
  { title: "תמיכה 24/7", text: "צ'אט בתוך האתר" },
  { title: "בלי סוכנים", text: "אתם בשליטה מלאה" },
];

const FAQ = HOME_FAQ;

function goToSignup() {
  const input = document.querySelector<HTMLInputElement>("#signup input");
  addEventListener("scrollend", () => input?.focus({ preventScroll: true }), { once: true });
  document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
}

function EnterCta() {
  return (
    <button className="cta-btn enter-cta" onClick={goToSignup} type="button">
      הכנסו עכשיו
    </button>
  );
}

function Chevron() {
  return (
    <svg aria-hidden="true" className="size-6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function Hero() {
  const video = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    element.src = `/videos/hero${mobile ? "-mobile" : ""}.mp4`;
    element.play().catch(() => undefined);
  }, []);

  return (
    <section className="hero-section" id="top">
      <video aria-hidden="true" className="hero-video" loop muted playsInline poster="/images/hero-bg.webp" preload="none" ref={video} />
      <div className="hero-content">
        <p className="hero-kicker">הבית של הספורט הישראלי · בלי סוכנים</p>
        <h1 className="hero-headline">100% בונוס על ההפקדה הראשונה</h1>
        <p className="hero-promise">ועד 20% החזר חודשי על הפסדים</p>
        <a className="cta-btn" href={SIGNUP}>קבלו 100% בונוס</a>
      </div>
      <a aria-label="גללו למטה" className="scroll-arrow" href="#site-tour">
        <svg aria-hidden="true" className="size-full" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}

function SiteTour() {
  const track = useRef<HTMLUListElement | null>(null);

  const move = (direction: 1 | -1) => {
    const list = track.current;
    const first = list?.firstElementChild as HTMLElement | null;
    if (!list || !first) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    list.scrollBy({ behavior: "smooth", left: -direction * (first.offsetWidth + gap) });
  };

  return (
    <section aria-labelledby="site-tour-title" className="site-tour" id="site-tour">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <h2 className="section-title" id="site-tour-title">ככה זה נראה מבפנים</h2>
          <p className="section-lead">
            שידורי כדורגל וכדורסל חיים בתוך האתר, יחסים שמתעדכנים בכל התקפה, קזינו וסלוטים. הכל מהנייד, בלי אפליקציה. אלה צילומי מסך אמיתיים מהאתר.
          </p>
        </div>
        <div className="relative">
          <ul className="tour-track" ref={track}>
            {TOUR.map((item) => (
              <li key={item.src}>
                <div className="tour-phone">
                  <img alt={item.caption} height={640} loading="lazy" src={item.src} width={320} />
                </div>
                <p>{item.caption}</p>
              </li>
            ))}
          </ul>
          <button aria-label="הקודם" className="tour-arrow start-0" onClick={() => move(-1)} type="button">
            <Chevron />
          </button>
          <button aria-label="הבא" className="tour-arrow end-0 [&_svg]:rotate-180" onClick={() => move(1)} type="button">
            <Chevron />
          </button>
        </div>
        <EnterCta />
      </div>
    </section>
  );
}

function About() {
  return (
    <section aria-labelledby="about-title" className="about">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <h2 className="section-title" id="about-title">{YEARS}+ שנים בתחום. אותו צוות, אותו עיקרון.</h2>
          <p className="section-lead">
            scottbet פועל יותר מ-{YEARS} שנים עבור שחקנים בישראל. בנינו את האתר כדי להחליף את שיטת הסוכנים: חשבון אישי שמנוהל ישירות מולכם, כסף שזמין לכם בכל רגע, וצוות דובר עברית שזמין בתוך האתר מסביב לשעון.
          </p>
        </div>
        <ul className="about-stats">
          {STATS.map((stat) => (
            <li key={stat.label}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section aria-labelledby="why-us-title" className="why-us">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-4">
          <h2 className="section-title" id="why-us-title">ההבדל מורגש ברגע שזוכים</h2>
          <p className="section-lead">ההפקדה קלה בכל מקום. המבחן האמיתי הוא המשיכה. ככה זה נראה אצל סוכן, וככה זה נראה אצלנו.</p>
        </div>
        <ul className="compare">
          {COMPARE.map((row) => (
            <li key={row.us}>
              <div className="compare-them">
                <span className="compare-label">אתר עם סוכן</span>
                <span>{row.them}</span>
              </div>
              <div className="compare-us">
                <span className="compare-label">scottbet</span>
                <span>{row.us}</span>
              </div>
            </li>
          ))}
        </ul>
        <ul className="trust-badges">
          {BADGES.map((badge) => (
            <li key={badge.title}>
              <b>{badge.title}</b>
              <span>{badge.text}</span>
            </li>
          ))}
        </ul>
        <EnterCta />
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section aria-labelledby="faq-title" className="faq" id="faq">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <h2 className="section-title text-center" id="faq-title">שאלות נפוצות</h2>
        <div className="flex flex-col gap-3">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function validate(name: string, phone: string, ageConfirmed: boolean): string {
  if (name.trim().length < 2) return "נא להזין שם מלא";
  if (!/^\+?\d{9,15}$/.test(phone.replace(/[\s-]/g, ""))) return "מספר טלפון לא תקין";
  if (!ageConfirmed) return "יש לאשר גיל 18+";
  return "";
}

function BonusForm() {
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SIGNED_KEY) === "1") setDone(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      ageConfirmed: data.get("ageConfirmed") === "on",
      source: window.location.search,
      placement: "footer",
    };
    const problem = validate(payload.name, payload.phone, payload.ageConfirmed);
    if (problem) {
      setError(problem);
      return;
    }
    const tab = window.open("", "_blank");
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(body.error || "שגיאה בשליחה, נסו שוב");
      if (tab) {
        tab.opener = null;
        tab.location.href = siteUrl();
      }
      setOpened(Boolean(tab));
      setStatus("idle");
      setDone(true);
      try {
        sessionStorage.setItem(SIGNED_KEY, "1");
      } catch {
        /* storage unavailable */
      }
    } catch (failure) {
      tab?.close();
      setStatus("idle");
      setError(failure instanceof Error ? failure.message : "שגיאה בשליחה, נסו שוב");
    }
  };

  if (done) {
    return (
      <div className="bonus-done" role="status">
        <p className="text-ink-950 md:text-3xl text-2xl font-black">{opened ? "נרשמתם! האתר נפתח בחלון חדש" : "נרשמתם!"}</p>
        <p className="text-ink-600">השלימו באתר את ההרשמה והבונוס יחכה לכם בהפקדה הראשונה.</p>
        <a className="cta-btn" href={siteUrl()} rel="noopener" target="_blank">
          {opened ? "לא נפתח? לחצו כאן" : "כניסה לאתר"}
        </a>
      </div>
    );
  }

  return (
    <form aria-label="קבלת בונוס - תחתון" className="bonus-form" noValidate onSubmit={submit}>
      <input aria-label="שם מלא" autoComplete="name" maxLength={100} name="name" placeholder="שם מלא" />
      <input aria-label="טלפון נייד" autoComplete="tel" dir="ltr" inputMode="tel" maxLength={20} name="phone" placeholder="טלפון נייד" type="tel" />
      <label className="bonus-consent">
        <input name="ageConfirmed" type="checkbox" />
        <span>אני מעל גיל 18 ומאשר/ת קבלת פניות לגבי ההטבה</span>
      </label>
      {error ? <p className="text-red-600 font-bold" role="alert">{error}</p> : null}
      <button className="cta-btn" disabled={status === "sending"} type="submit">
        {status === "sending" ? "שולחים..." : "קבלו 100% בונוס"}
      </button>
    </form>
  );
}

function Signup() {
  return (
    <section aria-labelledby="signup-title" className="lead-form" id="signup">
      <div className="max-w-xl w-full flex flex-col gap-8 text-center">
        <div className="flex flex-col gap-4">
          <h2 className="section-title" id="signup-title">קבלו את ההטבה</h2>
          <p className="section-lead">
            100% בונוס על ההפקדה הראשונה ועד 20% החזר חודשי על הפסדים. השאירו פרטים, האתר נפתח בחלון חדש ומשלימים שם את ההרשמה.
          </p>
        </div>
        <div className="form-card">
          <BonusForm />
        </div>
        <div aria-labelledby="payments-title" className="flex flex-col gap-4" role="region">
          <h3 className="text-white font-bold md:text-xl text-lg" id="payments-title">אמצעי תשלום להפקדה ולמשיכה</h3>
          <ul aria-label="אמצעי תשלום" className="payment-methods">
            <li aria-label="Visa" title="Visa"><img alt="" src="/images/pay/visa.svg" /></li>
            <li aria-label="Mastercard" title="Mastercard"><img alt="" src="/images/pay/mastercard.svg" /></li>
            <li aria-label="American Express" title="American Express"><img alt="" src="/images/pay/americanexpress.svg" /></li>
            <li aria-label="Bit" title="Bit"><span className="font-black bit-mark" dir="ltr">bit</span></li>
            <li aria-label="PayBox" title="PayBox"><span className="font-black paybox-mark" dir="ltr">PayBox</span></li>
            <li aria-label="מזומן" title="מזומן">
              <svg aria-hidden="true" className="cash-mark" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <rect height="12" rx="2" width="20" x="2" y="6" />
                <circle cx="12" cy="12" r="2.5" />
                <path d="M6 12h.01M18 12h.01" />
              </svg>
              <span className="text-black/70 text-sm font-bold">מזומן</span>
            </li>
            <li aria-label="קריפטו" title="קריפטו">
              <img alt="" src="/images/pay/bitcoin.svg" />
              <span className="text-black/70 text-sm font-bold">קריפטו</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const hero = document.querySelector(".hero-section");
    if (!hero) return undefined;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(Boolean(entry?.isIntersecting)));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav home />
      <main>
        <Hero />
        <SiteTour />
        <About />
        <WhyUs />
        <Faq />
        <DemoGames />
        <Signup />
        <a className={`support-btn ${heroVisible ? "invisible opacity-0" : ""}`} href="#faq">צ'אט תמיכה 24/7</a>
      </main>
      <SiteFooter home />
    </>
  );
}

export default function App({ path }: { path: string }) {
  const page = findPage(path);
  return page ? <ArticlePage page={page} /> : <Home />;
}
