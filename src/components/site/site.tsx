import { useRef } from "react";
import type { ReactNode } from "react";

import { site, whatsappUrl } from "@/site-config";

const WHATSAPP_TEXT = `היי, הגעתי מהאתר ואני רוצה לפתוח חשבון ב-${site.brand}`;
const primaryHref = whatsappUrl(WHATSAPP_TEXT) ?? site.platformUrl;

/* ------------------------------------------------------------------ CTAs */

export function PillCta({ children, tone = "yellow" }: { children: ReactNode; tone?: "yellow" | "white" }) {
  return (
    <a className={`pill pill--${tone}`} href={primaryHref} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

export function EnterLink({ children }: { children: ReactNode }) {
  return (
    <a className="enter-link" href={site.platformUrl} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

function Logo({ height }: { height: number }) {
  return <img alt={site.brand} className="logo" height={height} src="/assets/brand/logo.svg" width={Math.round(height * 5.51)} />;
}

/* ---------------------------------------------------------------- header */

export function SiteHeader() {
  return (
    <header className="topbar">
      <a aria-label={`${site.brand}, לראש העמוד`} className="topbar__logo" href="#top">
        <Logo height={30} />
      </a>
      <nav aria-label="ניווט ראשי" className="topbar__nav">
        <a href="#site-tour">האתר מבפנים</a>
        <a href="#how">איך מצטרפים</a>
        <a href="#faq">שאלות</a>
        <a href="#games">משחקי דמו</a>
      </nav>
      <a className="topbar__cta" href={primaryHref} rel="noopener noreferrer" target="_blank">
        קבלו בונוס
      </a>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */

export function Hero() {
  return (
    <section className="hero" id="top">
      <video
        autoPlay
        className="hero__video"
        loop
        muted
        playsInline
        poster="/assets/hero/hero-bg.webp"
        preload="metadata"
      >
        <source media="(max-width: 720px)" src="/assets/hero/hero-mobile.mp4" type="video/mp4" />
        <source src="/assets/hero/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero__inner">
        <p className="hero__badge">הסוכן הרשמי של {site.brand} · ליווי אישי</p>
        <h1 className="hero__title">100% בונוס על ההפקדה הראשונה</h1>
        <p className="hero__sub">ועד 20% החזר חודשי על הפסדים</p>
        <PillCta>קבלו 100% בונוס</PillCta>
        <p className="hero__terms">ההטבות בכפוף לתקנון האתר · 18+</p>
        <a aria-label="להמשך העמוד" className="hero__down" href="#site-tour">
          <span aria-hidden="true">⌄</span>
        </a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- site tour */

const TOUR = [
  { image: "/assets/site/site-live-casino.webp", caption: "כל המשחקים החיים במסך אחד" },
  { image: "/assets/site/site-live-match.webp", caption: "שידור חי ויחסים על אותו מסך" },
  { image: "/assets/site/site-slots.webp", caption: "סלוטים של הספקים הגדולים" },
  { image: "/assets/site/site-live-pitch.webp", caption: "רואים את כל המגרש, בלייב" },
  { image: "/assets/site/site-live-odds.webp", caption: "יחסים שמתעדכנים בזמן אמת" },
  { image: "/assets/site/site-home.webp", caption: "הכול מתחיל מעמוד אחד" },
];

export function SiteTour() {
  const rail = useRef<HTMLDivElement | null>(null);

  const move = (direction: 1 | -1) => {
    const element = rail.current;
    if (!element) return;
    element.scrollBy({ behavior: "smooth", left: direction * element.clientWidth * 0.7 });
  };

  return (
    <section className="tour" id="site-tour">
      <h2 className="tour__title">ככה זה נראה מבפנים</h2>
      <p className="tour__lead">
        שידורי כדורגל וכדורסל חיים בתוך האתר, יחסים שמתעדכנים בכל התקפה, קזינו וסלוטים. הכול מהנייד, בלי אפליקציה. אלה צילומי מסך אמיתיים מהאתר.
      </p>
      <div className="tour__frame">
        <button aria-label="הקודם" className="tour__arrow tour__arrow--prev" onClick={() => move(1)} type="button">›</button>
        <div className="tour__rail" dir="ltr" ref={rail}>
          {TOUR.map((item) => (
            <figure className="phone" key={item.image}>
              <img alt={item.caption} height={640} loading="lazy" src={item.image} width={320} />
              <figcaption dir="rtl">{item.caption}</figcaption>
            </figure>
          ))}
        </div>
        <button aria-label="הבא" className="tour__arrow tour__arrow--next" onClick={() => move(-1)} type="button">‹</button>
      </div>
      <div className="tour__cta">
        <PillCta>הכנסו עכשיו</PillCta>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- about */

const STATS = [
  { value: "+8", label: "שנים בתחום" },
  { value: "24/7", label: "ליווי ותמיכה" },
  { value: "100%", label: "מותאם לנייד" },
  { value: "6", label: "משחקי דמו בחינם" },
];

export function About() {
  return (
    <section className="about" id="about-brand">
      <h2 className="about__title">+8 שנים בתחום. סוכן אחד שמלווה אתכם.</h2>
      <p className="about__lead">
        {site.brand} פועל יותר מ-8 שנים עבור שחקנים בישראל. דרך הסוכן אתם מקבלים חשבון אישי, איש קשר אחד לכל שאלה, וליווי בהפקדות ובמשיכות מהיום הראשון.
      </p>
      <ul className="about__stats">
        {STATS.map((stat) => (
          <li key={stat.label}>
            <b dir="ltr">{stat.value}</b>
            <span>{stat.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* --------------------------------------------------------------- compare */

const COMPARE = [
  { alone: "מחכים לתשובה מתמיכה כללית", agent: "איש קשר אחד שמכיר אתכם" },
  { alone: "פותחים חשבון לבד מול טפסים", agent: "הסוכן פותח ומגדיר את החשבון איתכם" },
  { alone: "לא ברור איזה בונוס מגיע", agent: "100% בונוס הצטרפות, מוסבר מראש" },
  { alone: "הפסדתם? זה נגמר שם", agent: "עד 20% החזר חודשי על הפסדים" },
  { alone: "משיכה בלי מי שילווה", agent: "כל הפקדה ומשיכה מלווה מול בן אדם" },
];

const PERKS = [
  { title: "+8 שנים", text: "פעילות רציפה בתחום" },
  { title: "ליווי אישי", text: "סוכן אחד מההתחלה" },
  { title: "24/7", text: "מענה בכל שעה" },
  { title: "דיסקרטיות", text: "בלי דיוורים ושיחות מכירה" },
];

export function Compare() {
  return (
    <section className="compare" id="why">
      <h2 className="compare__title">ההבדל מורגש ברגע שזוכים</h2>
      <p className="compare__lead">ההפקדה קלה בכל מקום. המבחן האמיתי הוא הליווי. ככה זה נראה לבד, וככה זה נראה עם סוכן.</p>
      <ul className="compare__rows">
        {COMPARE.map((row) => (
          <li className="compare__row" key={row.agent}>
            <div className="compare__cell compare__cell--alone">
              <small>לבד מול אתר</small>
              <span>{row.alone}</span>
            </div>
            <div className="compare__cell compare__cell--agent">
              <small>עם סוכן {site.brand}</small>
              <span>{row.agent}</span>
            </div>
          </li>
        ))}
      </ul>
      <ul className="compare__perks">
        {PERKS.map((perk) => (
          <li key={perk.title}>
            <b>{perk.title}</b>
            <span>{perk.text}</span>
          </li>
        ))}
      </ul>
      <div className="compare__cta">
        <PillCta>הכנסו עכשיו</PillCta>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- steps */

const STEPS = [
  { title: "פונים לסוכן", text: "הודעה קצרה או כניסה ישירה לאתר. עונה לכם בן אדם, לא בוט." },
  { title: "פותחים חשבון", text: `הסוכן פותח לכם חשבון אישי ב-${site.brand} ומוודא שהכול מוגדר נכון.` },
  { title: "מפקידים ומקבלים בונוס", text: "בוחרים יחד את דרך ההפקדה שנוחה לכם, וההטבה נטענת לפי התקנון." },
  { title: "משחקים ומושכים", text: "ספורט, קזינו חי וסלוטים. כשרוצים למשוך, סוגרים את זה מול הסוכן." },
];

export function Steps() {
  return (
    <section className="steps" id="how">
      <h2 className="steps__title">ארבעה צעדים ואתם בפנים</h2>
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

/* ------------------------------------------------------------------- faq */

const FAQ = [
  {
    q: "מה יש באתר?",
    a: "הימורי ספורט וליין חי, שידורים חיים, קזינו חי מול דילרים אמיתיים, מאות סלוטים ומשחקי טורבו. הכול מאותו חשבון.",
  },
  {
    q: "איך מקבלים את בונוס ההצטרפות?",
    a: "נרשמים דרך הסוכן ומבצעים הפקדה ראשונה. הבונוס נטען לפי תנאי התקנון של האתר, והסוכן מסביר אותם לפני ההפקדה.",
  },
  {
    q: "איך עובד ההחזר החודשי?",
    a: "עד 20% מההפסדים נטו חוזרים ליתרה אחת לחודש, בכפוף לתקנון. הסוכן יעדכן אתכם בגובה ההחזר.",
  },
  {
    q: "מה ההבדל בין הרשמה דרך סוכן להרשמה רגילה?",
    a: `החשבון הוא אותו חשבון ב-${site.brand}. ההבדל הוא איש קשר אישי שפותח את החשבון, מלווה בהפקדות ובמשיכות ועונה על שאלות.`,
  },
  {
    q: "אילו אמצעי תשלום מקבלים?",
    a: "כרטיסי אשראי, ביט, PayBox, מזומן וקריפטו. הסוכן יתאים לכם את הדרך הנוחה.",
  },
  {
    q: "האם משחקי הדמו כאן משלמים כסף?",
    a: "לא. משחקי הדמו בעמוד הזה פועלים עם מטבעות דמו בלבד, ללא ערך כספי.",
  },
  {
    q: "האתר עובד טוב בנייד?",
    a: "כן. האתר מותאם לנייד ואין צורך להתקין אפליקציה.",
  },
];

export function Faq() {
  return (
    <section className="faq" id="faq">
      <h2 className="faq__title">שאלות נפוצות</h2>
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

/* ------------------------------------------------------------------- seo */

export function SeoBlock() {
  return (
    <section className="seo" id="about">
      <div className="seo__grid">
        <h2 className="seo__title">סוכן {site.brand} בישראל: הימורי ספורט, קזינו אונליין ומכונות מזל</h2>
        <article>
          <h3>הימורי ספורט וליין חי</h3>
          <p>ב-{site.brand} מהמרים על כדורגל, כדורסל, טניס וסייבר ספורט, לפני המשחק ובזמן אמת, עם שידורים חיים בתוך האתר.</p>
        </article>
        <article>
          <h3>קזינו חי אונליין</h3>
          <p>רולטה, בלאק ג׳ק ובאקרה מול דילרים אמיתיים בשידור חי. נכנסים לשולחן מהנייד או מהמחשב, עם אותו חשבון ואותה יתרה.</p>
        </article>
        <article>
          <h3>מכונות מזל וסלוטים</h3>
          <p>מאות מכונות מזל, ג׳קפוטים ומשחקי טורבו כמו קראש ופלינקו. בעמוד הזה אפשר לנסות גרסאות דמו בחינם לפני המשחק המלא.</p>
        </article>
        <article>
          <h3>למה להירשם דרך סוכן</h3>
          <p>סוכן אישי פותח את החשבון, מלווה בהפקדות ובמשיכות ועונה על שאלות. איש קשר אחד במקום פניות לתמיכה כללית.</p>
        </article>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- signup */

const PAY = [
  { image: "/assets/pay/visa.svg", label: "Visa" },
  { image: "/assets/pay/mastercard.svg", label: "Mastercard" },
  { image: "/assets/pay/americanexpress.svg", label: "American Express" },
  { text: "bit", tone: "bit", label: "ביט" },
  { text: "PayBox", tone: "paybox", label: "PayBox" },
  { text: "₪", tone: "cash", label: "מזומן", caption: "מזומן" },
  { image: "/assets/pay/bitcoin.svg", label: "קריפטו", caption: "קריפטו" },
];

export function Signup() {
  const whatsapp = whatsappUrl(WHATSAPP_TEXT);
  return (
    <section className="signup" id="signup">
      <h2 className="signup__title">קבלו את ההטבה</h2>
      <p className="signup__lead">100% בונוס על ההפקדה הראשונה ועד 20% החזר חודשי על הפסדים. לוחצים, האתר נפתח בחלון חדש ומשלימים שם את ההרשמה.</p>
      <div className="signup__card">
        <PillCta>קבלו 100% בונוס</PillCta>
        {whatsapp ? <EnterLink>או כניסה ישירה לאתר {site.brand}</EnterLink> : null}
        {site.telegramUrl ? (
          <a className="enter-link" href={site.telegramUrl} rel="noopener noreferrer" target="_blank">ערוץ הטלגרם</a>
        ) : null}
        <p className="signup__note">ההטבות בכפוף לתקנון האתר. 18+ בלבד.</p>
      </div>
      <h3 className="signup__paytitle">אמצעי תשלום להפקדה ולמשיכה</h3>
      <ul className="signup__pay">
        {PAY.map((item) => (
          <li key={item.label} title={item.label}>
            {item.image ? <img alt={item.label} height={28} loading="lazy" src={item.image} width={56} /> : <b data-tone={item.tone}>{item.text}</b>}
            {item.caption ? <small>{item.caption}</small> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- footer */

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
    title: "באתר",
    links: [
      { href: "#site-tour", label: "הימורי ספורט" },
      { href: "#site-tour", label: "קזינו חי" },
      { href: "#site-tour", label: "מכונות מזל" },
      { href: "#about", label: "קזינו אונליין" },
    ],
  },
  {
    title: "מידע",
    links: [
      { href: "#how", label: "איך מצטרפים" },
      { href: "#why", label: "למה סוכן" },
      { href: "#faq", label: "שאלות נפוצות" },
      { href: "#signup", label: "בונוס הצטרפות" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <nav aria-label="קישורים" className="footer__links">
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
          <h3 dir="ltr">{site.brand}</h3>
          <ul>
            <li><a href={site.platformUrl} rel="noopener noreferrer" target="_blank">כניסה לאתר {site.brand}</a></li>
            <li><a href={site.platformUrl} rel="noopener noreferrer" target="_blank">הרשמה ופתיחת חשבון</a></li>
          </ul>
        </div>
      </nav>
      <Logo height={34} />
      <p className="footer__legal">
        <b>18+</b> · הימרו באחריות. ההימורים מיועדים לבגירים בלבד וכרוכים בסיכון כספי. ההטבות כפופות לתקנון האתר. האתר הוא אתר סוכן, ומשחקי הדמו בעמוד זה הם להמחשה בלבד, ללא כסף אמיתי.
      </p>
    </footer>
  );
}

export function ChatPill() {
  const whatsapp = whatsappUrl(WHATSAPP_TEXT);
  return (
    <a className="chat-pill" href={whatsapp ?? "#faq"} {...(whatsapp ? { rel: "noopener noreferrer", target: "_blank" } : {})}>
      {whatsapp ? "וואטסאפ לסוכן 24/7" : "שאלות ותמיכה 24/7"}
    </a>
  );
}
