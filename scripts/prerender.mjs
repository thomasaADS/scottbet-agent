// Renders every route to static HTML after the client and server builds, so
// search engines and AI crawlers receive the full page without running JS.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const config = JSON.parse(await readFile(resolve(root, "src/seo/config.json"), "utf8"));
const server = await import(pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href);
const template = await readFile(resolve(dist, "index.html"), "utf8");

const esc = (text) => text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const url = (path) => `${config.siteUrl}${path}`;
const today = new Date().toISOString().slice(0, 10);

const organization = {
  "@type": "Organization",
  "@id": url("/#organization"),
  name: config.siteName,
  url: url("/"),
  logo: url("/images/brand-logo.svg"),
  areaServed: { "@type": "Country", name: "Israel" },
  knowsLanguage: "he",
};

const faqSchema = (items) => ({
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
});

function head({ title, description, path, graph }) {
  const canonical = url(path);
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="he-IL" href="${canonical}" />`,
    `<link rel="alternate" hreflang="x-default" href="${canonical}" />`,
    `<meta name="geo.region" content="IL" />`,
    `<meta name="geo.placename" content="Israel" />`,
    `<meta name="language" content="Hebrew" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${config.siteName}" />`,
    `<meta property="og:locale" content="${config.locale}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:image" content="${url(config.ogImage)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${url(config.ogImage)}" />`,
    `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

const routes = [
  {
    path: "/",
    file: "index.html",
    title: server.HOME_TITLE,
    description: server.HOME_DESCRIPTION,
    graph: [
      organization,
      {
        "@type": "WebSite",
        "@id": url("/#website"),
        name: config.siteName,
        url: url("/"),
        inLanguage: "he-IL",
        publisher: { "@id": url("/#organization") },
      },
      {
        "@type": "WebPage",
        "@id": url("/#webpage"),
        url: url("/"),
        name: server.HOME_TITLE,
        description: server.HOME_DESCRIPTION,
        inLanguage: "he-IL",
        isPartOf: { "@id": url("/#website") },
        dateModified: today,
      },
      faqSchema(server.HOME_FAQ),
    ],
  },
  ...server.SEO_PAGES.map((page) => ({
    path: `/${page.slug}`,
    file: `${page.slug}/index.html`,
    title: page.title,
    description: page.description,
    graph: [
      organization,
      {
        "@type": "WebPage",
        "@id": url(`/${page.slug}#webpage`),
        url: url(`/${page.slug}`),
        name: page.title,
        headline: page.h1,
        description: page.description,
        inLanguage: "he-IL",
        isPartOf: { "@id": url("/#website") },
        dateModified: today,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: config.siteName, item: url("/") },
          { "@type": "ListItem", position: 2, name: page.label, item: url(`/${page.slug}`) },
        ],
      },
      faqSchema(page.faq),
    ],
  })),
];

for (const route of routes) {
  const html = template
    .replace("<!--seo-head-->", head(route))
    .replace('<div id="root"></div>', `<div id="root">${server.render(route.path)}</div>`);
  if (!html.includes('<div id="root"><')) throw new Error(`Prerender failed for ${route.path}`);
  const target = resolve(dist, route.file);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
  console.log(`prerendered ${route.path} (${Math.round(html.length / 1024)} KB)`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${url(route.path)}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${route.path === "/" ? "1.0" : "0.8"}</priority></url>`).join("\n")}
</urlset>
`;
await writeFile(resolve(dist, "sitemap.xml"), sitemap);

const robots = `User-agent: *
Allow: /
Disallow: /api/

# AI assistants and answer engines are welcome
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /

Sitemap: ${url("/sitemap.xml")}
`;
await writeFile(resolve(dist, "robots.txt"), robots);

const llms = `# ${config.siteName}

> ${server.HOME_DESCRIPTION}

scottbet הוא אתר הימורי ספורט וקזינו אונליין בעברית, בלי סוכנים: החשבון מנוהל ישירות מול האתר, תשלום הזכיות מיידי, והתמיכה זמינה 24/7 בצ'אט בתוך האתר. האתר מיועד לבני 18 ומעלה.

## עובדות מרכזיות

- 100% בונוס על ההפקדה הראשונה (בכפוף לתקנון האתר)
- עד 20% החזר חודשי על הפסדים
- תשלום זכיות מיידי, ישירות מהחשבון
- שידורי כדורגל וכדורסל חיים בתוך האתר
- תמיכה 24/7 בצ'אט, בעברית
- אמצעי תשלום: ויזה, מאסטרקארד, אמריקן אקספרס, ביט, פייבוקס, מזומן וקריפטו
- פועל יותר מ-8 שנים

## עמודים

- [עמוד הבית](${url("/")}): סקירת האתר, שאלות נפוצות, משחקי דמו וטופס הרשמה
${server.SEO_PAGES.map((page) => `- [${page.label}](${url(`/${page.slug}`)}): ${page.description}`).join("\n")}

## שאלות נפוצות

${server.HOME_FAQ.map((item) => `### ${item.q}\n${item.a}`).join("\n\n")}
`;
await writeFile(resolve(dist, "llms.txt"), llms);
console.log("wrote sitemap.xml, robots.txt, llms.txt");
