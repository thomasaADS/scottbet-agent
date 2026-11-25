import { Nav, SiteFooter } from "@/components/site/chrome";
import { SEO_PAGES } from "@/seo/pages";
import type { SeoPage } from "@/seo/pages";

export function ArticlePage({ page }: { page: SeoPage }) {
  const related = SEO_PAGES.filter((other) => other.slug !== page.slug);
  return (
    <>
      <Nav home={false} />
      <main className="seo-page">
        <header className="seo-hero">
          <div aria-label="מיקום באתר" className="seo-crumbs" role="navigation">
            <a href="/">scottbet</a>
            <span aria-hidden="true">/</span>
            <span>{page.label}</span>
          </div>
          <h1>{page.h1}</h1>
          <p>{page.lead}</p>
          <a className="cta-btn" href="/#signup">הירשמו לפלטפורמה</a>
        </header>

        <article className="seo-body">
          {page.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((text) => (
                <p key={text}>{text}</p>
              ))}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </article>

        <section aria-labelledby="page-faq" className="faq">
          <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <h2 className="section-title text-center" id="page-faq">שאלות נפוצות על {page.label}</h2>
            <div className="flex flex-col gap-3">
              {page.faq.map((item) => (
                <details key={item.q} open>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="page-more" className="seo-more">
          <h2 id="page-more">עוד ב-scottbet</h2>
          <ul>
            {related.map((other) => (
              <li key={other.slug}>
                <a href={`/${other.slug}`}>
                  <b>{other.label}</b>
                  <span>{other.lead}</span>
                </a>
              </li>
            ))}
            <li>
              <a href="/#games">
                <b>משחקי דמו בחינם</b>
                <span>גלגל המזל, מכונת מזל, קראש, פלינקו, פנדל וכרטיס גירוד, בלי הרשמה.</span>
              </a>
            </li>
          </ul>
          <a className="cta-btn" href="/#signup">הכנסו עכשיו</a>
        </section>
      </main>
      <SiteFooter home={false} />
    </>
  );
}
