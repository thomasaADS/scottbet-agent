import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { agentLabel, site, whatsappUrl } from "@/site-config";

const WHATSAPP_TEXT = `היי, הגעתי מהאתר ואני רוצה לפתוח חשבון ב-${site.brand}`;

/* ------------------------------------------------------------------ CTAs */

export function EnterCta({ children, variant = "gold" }: { children: ReactNode; variant?: "gold" | "ruby" }) {
  return (
    <a className={`cta-enter cta-enter--${variant}`} href={site.platformUrl} rel="noopener noreferrer" target="_blank">
      <span className="cta-enter__label">{children}</span>
      <span aria-hidden="true" className="cta-enter__chip" />
    </a>
  );
}

export function WhatsappCta({ children }: { children: ReactNode }) {
  const href = whatsappUrl(WHATSAPP_TEXT);
  if (!href) return null;
  return (
    <a className="cta-whatsapp" href={href} rel="noopener noreferrer" target="_blank">
      <span aria-hidden="true" className="cta-whatsapp__dot" />
      {children}
    </a>
  );
}

export function TelegramCta({ children }: { children: ReactNode }) {
  if (!site.telegramUrl) return null;
  return (
    <a className="cta-telegram" href={site.telegramUrl} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

export function GhostLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a className="cta-ghost" href={href}>
      {children}
      <span aria-hidden="true" className="cta-ghost__arrow">←</span>
    </a>
  );
}

/* ---------------------------------------------------------------- header */

const NAV = [
  { href: "#worlds", label: "עולמות המשחק" },
  { href: "#how", label: "איך מצטרפים" },
  { href: "#why", label: "למה סוכן" },
  { href: "#faq", label: "שאלות" },
  { href: "#games", label: "משחקי דמו" },
];

export function SiteHeader() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-solid={solid ? "true" : "false"}>
      <a aria-label={`${site.brand}, לראש העמוד`} className="site-logo" href="#top">
        <span className="site-logo__word" dir="ltr">scott<b>bet</b></span>
        <span className="site-logo__tag">סוכן רשמי</span>
      </a>
      <nav aria-label="ניווט ראשי" className="site-nav">
        {NAV.map((item) => (
          <a href={item.href} key={item.href}>{item.label}</a>
        ))}
      </nav>
      <a className="header-enter" href={site.platformUrl} rel="noopener noreferrer" target="_blank">
        כניסה ל-{site.brand}
      </a>
    </header>
  );
}

/* ---------------------------------------------------------------- worlds */

const WORLDS = [
  {
    image: "/assets/cat/sport.jpg",
    name: "ספורט וליין חי",
    text: "כדורגל, כדורסל, טניס וסייבר ספורט, עם יחסים שמתעדכנים תוך כדי משחק.",
    points: ["ליין חי", "שידורים", "סייבר ספורט"],
  },
  {
    image: "/assets/cat/live.jpg",
    name: "קזינו חי",
    text: "רולטה, בלאק ג׳ק ובאקרה מול דילרים אמיתיים בשידור ישיר.",
    points: ["רולטה", "בלאק ג׳ק", "באקרה"],
  },
  {
    image: "/assets/cat/slots.jpg",
    name: "מכונות מזל",
    text: "מאות סלוטים מהספקים המובילים, מהקלאסיקות ועד ג׳קפוטים.",
    points: ["סלוטים", "ג׳קפוטים", "משחקי טורבו"],
  },
];

export function Worlds() {
  return (
    <section className="worlds" id="worlds">
      <h2 className="worlds__title">שלושה עולמות, חשבון אחד</h2>
      <div className="worlds__rail">
        {WORLDS.map((world, index) => (
          <article className="world" data-tilt={index % 2 === 0 ? "a" : "b"} key={world.name}>
            <img alt="" className="world__img" height={900} loading="lazy" src={world.image} width={1200} />
            <div className="world__body">
              <h3 className="world__name">{world.name}</h3>
              <p className="world__text">{world.text}</p>
              <ul className="world__points">
                {world.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <div className="worlds__cta">
        <EnterCta>לכל המשחקים ב-{site.brand}</EnterCta>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- steps */

const STEPS = [
  { title: "פונים לסוכן", text: "הודעה קצרה או כניסה ישירה לאתר. עונה לכם בן אדם, לא בוט." },
  { title: "פותחים חשבון", text: `הסוכן פותח לכם חשבון אישי ב-${site.brand} ומוודא שהכול מוגדר נכון.` },
  { title: "מפקידים", text: "בוחרים יחד את דרך ההפקדה שנוחה לכם ומקבלים אישור ברגע שהיא נקלטת." },
  { title: "משחקים ומושכים", text: "ספורט, קזינו חי וסלוטים. כשרוצים למשוך, סוגרים את זה ישירות מול הסוכן." },
];

export function Steps() {
  return (
    <section className="steps" id="how">
      <div className="steps__intro">
        <p className="steps__eyebrow">איך מצטרפים</p>
        <h2 className="steps__title">ארבעה צעדים מההודעה הראשונה ועד המשחק</h2>
        <div className="steps__cta">
          <WhatsappCta>פתיחת חשבון בוואטסאפ</WhatsappCta>
          <GhostLink href="#faq">יש לי שאלה קודם</GhostLink>
        </div>
      </div>
      <ol className="steps__list">
        {STEPS.map((step, index) => (
          <li className="step" key={step.title}>
            <span aria-hidden="true" className="step__num">{index + 1}</span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__text">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ------------------------------------------------------------------- why */

const REASONS = [
  { title: "איש קשר אחד", text: "אותו סוכן מהיום הראשון. לא מסבירים הכול מחדש בכל פנייה." },
  { title: "תשובות מבן אדם", text: "שאלה על הפקדה, משיכה או הימור: מקבלים תשובה ברורה, לא טיקט." },
  { title: "דיסקרטיות", text: "התקשורת נשארת ביניכם לבין הסוכן. בלי דיוורים ובלי שיחות מכירה." },
  { title: "סדר בכסף", text: "כל הפקדה ומשיכה מאושרת מולכם, כך שתמיד ברור מה מצב החשבון." },
];

export function Why() {
  return (
    <section className="why" id="why">
      <h2 className="why__title">ההבדל בין אתר לבין {agentLabel}</h2>
      <dl className="why__table">
        {REASONS.map((reason) => (
          <div className="why__row" key={reason.title}>
            <dt>{reason.title}</dt>
            <dd>{reason.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------- faq */

const FAQ = [
  {
    q: "מה ההבדל בין הרשמה דרך סוכן להרשמה רגילה?",
    a: `החשבון הוא אותו חשבון ב-${site.brand}. ההבדל הוא שיש לכם איש קשר אישי שפותח את החשבון, מלווה בהפקדות ובמשיכות ועונה על שאלות.`,
  },
  {
    q: "האם משחקי הדמו באתר הזה משלמים כסף?",
    a: "לא. משחקי הדמו כאן פועלים עם מטבעות דמו בלבד, אין להם ערך כספי ואי אפשר להפקיד או למשוך דרכם.",
  },
  {
    q: "אילו בונוסים מקבלים?",
    a: "המבצעים משתנים מעת לעת ותלויים בתקנון הפלטפורמה. את התנאים העדכניים מקבלים ישירות מהסוכן לפני ההפקדה.",
  },
  {
    q: "מי יכול להצטרף?",
    a: "בגירים מגיל 18 ומעלה בלבד, ובכפוף לחוק החל במקום המגורים שלכם ולתקנון הפלטפורמה.",
  },
  {
    q: "מה עושים אם ההימורים יוצאים משליטה?",
    a: "עוצרים. קבעו מראש תקציב וזמן משחק, אל תרדפו אחרי הפסדים, ופנו לעזרה מקצועית אם קשה להפסיק. אפשר גם לבקש מהסוכן לסגור את החשבון.",
  },
];

export function Faq() {
  return (
    <section className="faq" id="faq">
      <h2 className="faq__title">שאלות לפני שמתחילים</h2>
      <div className="faq__list">
        {FAQ.map((item) => (
          <details className="faq__item" key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- final + foot */

export function FinalCall() {
  return (
    <section className="final">
      <img alt="" className="final__art" height={800} loading="lazy" src="/assets/brand/cover.jpg" width={1200} />
      <div className="final__copy">
        <h2 className="final__title">השולחן פתוח. מצטרפים?</h2>
        <p className="final__text">פתיחת חשבון ב-{site.brand} עם ליווי אישי, מהצעד הראשון.</p>
        <div className="final__actions">
          <EnterCta variant="ruby">כניסה ל-{site.brand}</EnterCta>
          <WhatsappCta>דברו עם הסוכן</WhatsappCta>
          <TelegramCta>ערוץ הטלגרם</TelegramCta>
        </div>
      </div>
    </section>
  );
}

const STRIP = ["ספורט חי", "קזינו חי", "מכונות מזל", "רולטה", "בלאק ג׳ק", "פוקר", "קראש", "גלגל המזל", "ליווי אישי", "משחקי דמו בחינם"];

export function HeroStrip() {
  return (
    <div aria-hidden="true" className="hero-strip">
      {[0, 1, 2].map((copy) => (
        <div className="hero-strip__track" key={copy}>
          {STRIP.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function HeroStats() {
  return (
    <ul className="hero-stats">
      <li><b>24/7</b><span>ספורט וליין חי</span></li>
      <li><b>3</b><span>עולמות משחק</span></li>
      <li><b>6</b><span>משחקי דמו בחינם</span></li>
    </ul>
  );
}

export function SeoBlock() {
  return (
    <section className="seo" id="about">
      <div className="seo__grid">
        <h2 className="seo__title">סוכן {site.brand} בישראל: הימורי ספורט, קזינו אונליין ומכונות מזל</h2>
        <article>
          <h3>הימורי ספורט וליין חי</h3>
          <p>ב-{site.brand} מהמרים על כדורגל, כדורסל, טניס וסייבר ספורט, לפני המשחק ובזמן אמת. הסוכן עוזר לפתוח חשבון ולהתחיל להמר על הליגות שאתם עוקבים אחריהן.</p>
        </article>
        <article>
          <h3>קזינו חי אונליין</h3>
          <p>רולטה, בלאק ג׳ק ובאקרה מול דילרים אמיתיים בשידור חי. נכנסים לשולחן מהנייד או מהמחשב, עם אותו חשבון ואותה יתרה.</p>
        </article>
        <article>
          <h3>מכונות מזל וסלוטים</h3>
          <p>מאות מכונות מזל, ג׳קפוטים ומשחקי טורבו כמו קראש ופלינקו. בעמוד הזה אפשר לנסות גרסאות דמו בחינם לפני שנכנסים למשחק המלא.</p>
        </article>
        <article>
          <h3>למה להירשם דרך סוכן</h3>
          <p>סוכן אישי פותח את החשבון, מלווה בהפקדות ובמשיכות ועונה על שאלות. איש קשר אחד במקום פניות לתמיכה כללית.</p>
        </article>
      </div>
    </section>
  );
}

const LINK_GROUPS = [
  {
    title: "משחקי דמו",
    links: [
      { href: "#games", label: "גלגל המזל" },
      { href: "#games", label: "מכונת מזל" },
      { href: "#games", label: "קראש" },
      { href: "#games", label: "פלינקו" },
      { href: "#games", label: "פנדל" },
      { href: "#games", label: "כרטיס גירוד" },
    ],
  },
  {
    title: "עולמות המשחק",
    links: [
      { href: "#worlds", label: "הימורי ספורט" },
      { href: "#worlds", label: "קזינו חי" },
      { href: "#worlds", label: "מכונות מזל" },
      { href: "#about", label: "קזינו אונליין" },
    ],
  },
  {
    title: "מידע",
    links: [
      { href: "#how", label: "איך מצטרפים" },
      { href: "#why", label: "למה סוכן" },
      { href: "#faq", label: "שאלות נפוצות" },
      { href: "#about", label: `על סוכן ${site.brand}` },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav aria-label="קישורים" className="site-links">
        {LINK_GROUPS.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3>{site.brand}</h3>
          <ul>
            <li><a href={site.platformUrl} rel="noopener noreferrer" target="_blank">כניסה לאתר {site.brand}</a></li>
            <li><a href={site.platformUrl} rel="noopener noreferrer" target="_blank">הרשמה ופתיחת חשבון</a></li>
          </ul>
        </div>
      </nav>
      <p className="site-footer__brand">
        <span dir="ltr">{site.brand}</span> · סוכן רשמי
      </p>
      <p className="site-footer__legal">
        18+ בלבד. הימורים עלולים לגרום להתמכרות, שחקו באחריות. האתר הוא אתר סוכן ואינו מפעיל משחקים בכסף אמיתי. משחקי הדמו בעמוד זה הם להמחשה בלבד. השימוש בפלטפורמה כפוף לתקנון שלה ולחוק החל במקום מגוריכם.
      </p>
    </footer>
  );
}

export function StickyBar() {
  const whatsapp = whatsappUrl(WHATSAPP_TEXT);
  return (
    <div className="sticky-bar">
      <a className="sticky-bar__enter" href={site.platformUrl} rel="noopener noreferrer" target="_blank">
        כניסה ל-{site.brand}
      </a>
      {whatsapp ? (
        <a className="sticky-bar__chat" href={whatsapp} rel="noopener noreferrer" target="_blank">
          וואטסאפ
        </a>
      ) : (
        <a className="sticky-bar__demo" href="#games">משחקי דמו</a>
      )}
    </div>
  );
}
