import { SEO_PAGES } from "@/seo/pages";

/** Top bar. On sub-pages the links point back to the home page sections. */
export function Nav({ home }: { home: boolean }) {
  const signup = home ? "#signup" : "/#signup";
  return (
    <nav>
      <a aria-label="scottbet, עמוד הבית" href={home ? "#top" : "/"}>
        <img alt="scottbet" className="h-7 md:h-9 w-auto" height={36} src="/images/brand-logo.svg" width={198} />
      </a>
      <a className="nav-cta" href={signup}>קבלו בונוס</a>
    </nav>
  );
}

export function SiteFooter({ home }: { home: boolean }) {
  const base = home ? "" : "/";
  return (
    <footer className="site-footer">
      <div aria-label="קישורים באתר" className="footer-links" role="navigation">
        <a href={home ? "#top" : "/"}>עמוד הבית</a>
        {SEO_PAGES.map((page) => (
          <a href={`/${page.slug}`} key={page.slug}>{page.label}</a>
        ))}
        <a href={`${base}#games`}>משחקי דמו</a>
        <a href={`${base}#faq`}>שאלות נפוצות</a>
      </div>
      <img alt="scottbet" className="h-8 w-auto" height={32} loading="lazy" src="/images/brand-logo.svg" width={176} />
      <p>
        <b>18+</b> · הימרו באחריות. ההימורים מיועדים לבגירים בלבד וכרוכים בסיכון כספי. ההטבות כפופות לתקנון האתר.
      </p>
    </footer>
  );
}
