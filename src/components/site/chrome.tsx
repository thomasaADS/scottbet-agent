import { SEO_PAGES } from "@/seo/pages";
import { site, whatsappUrl } from "@/site-config";

/** Top bar. On sub-pages the links point back to the home page sections. */
export function Nav({ home }: { home: boolean }) {
  return (
    <nav>
      <a aria-label="scottbet, עמוד הבית" href={home ? "#top" : "/"}>
        <img alt="scottbet" className="h-7 md:h-9 w-auto" height={36} src="/images/brand-logo.svg" width={198} />
      </a>
      <a className="nav-cta" href={site.platformUrl} rel="noopener" target="_blank">לפרטים נוספים</a>
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
      <p className="footer-legal" dir="ltr" lang="en">
        © 2018–{new Date().getFullYear()} Scottbet. All rights reserved. Scottbet is intended for persons aged 18 and over. Gambling involves financial risk and can be addictive; please play responsibly and only with money you can afford to lose. All bonuses and promotions are subject to the site's Terms &amp; Conditions.
      </p>
    </footer>
  );
}

/** Floating WhatsApp button, visible on every page. */
export function WhatsappFab() {
  return (
    <a aria-label="וואטסאפ תמיכה 24/7" className="wa-fab" href={whatsappUrl} rel="noopener" target="_blank">
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path
          d="M16 3C8.8 3 3 8.8 3 16c0 2.3.6 4.5 1.7 6.400L3 29l6.800-1.700A13 13 0 1 0 16 3zm0 2.300A10.700 10.700 0 1 1 10.300 25l-.400-.250-4 1 1.050-3.900-.270-.420A10.700 10.700 0 0 1 16 5.300zm-4.500 5.400c-.230 0-.600.090-.920.430-.320.350-1.200 1.180-1.200 2.870s1.230 3.330 1.400 3.560c.180.230 2.400 3.830 5.930 5.220 2.930 1.160 3.530.930 4.160.870.640-.060 2.050-.840 2.340-1.650.290-.810.290-1.500.200-1.650-.090-.140-.320-.230-.660-.400-.350-.180-2.050-1.010-2.370-1.130-.320-.110-.550-.170-.780.180-.230.340-.900 1.120-1.100 1.350-.200.230-.400.260-.750.090-.350-.180-1.470-.540-2.800-1.730-1.030-.920-1.730-2.060-1.930-2.400-.200-.350-.020-.540.150-.710.160-.150.350-.400.520-.600.180-.200.230-.350.350-.580.110-.230.060-.430-.030-.600-.090-.180-.770-1.900-1.070-2.600-.280-.670-.570-.580-.780-.590z"
          fill="currentColor"
        />
      </svg>
      <span>וואטסאפ</span>
    </a>
  );
}
