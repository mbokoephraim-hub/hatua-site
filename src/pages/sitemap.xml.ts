import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { articleSlug, getArticles } from '../data/articles';
import { routes, pagePath, hasPage, type PageRef, type RouteKey } from '../i18n';

// Toutes les pages, dans les deux langues, avec leurs versions alternatives (hreflang) pour Google.
// Pour ajouter une page : l'ajouter dans `routes` (src/i18n/index.ts). Les projets sont ajoutés automatiquement.
const staticPages: PageRef[] = [
  ...(Object.keys(routes) as RouteKey[]).map((key) => ({ key })),
  ...projects.map((p) => ({ key: 'project' as const, slug: p.slug })),
];

/** Articles publiés : une entrée par article, reliée à sa traduction quand elle existe. */
async function articlePages(): Promise<PageRef[]> {
  const fr = await getArticles('fr');
  const en = await getArticles('en');
  const enSlugs = new Set(en.map(articleSlug));
  const pages: PageRef[] = [];
  const pairedEn = new Set<string>();
  for (const a of fr) {
    const t = a.data.translation && enSlugs.has(a.data.translation) ? a.data.translation : undefined;
    if (t) pairedEn.add(t);
    pages.push({ key: 'article', slugs: { fr: articleSlug(a), ...(t ? { en: t } : {}) } });
  }
  for (const a of en) if (!pairedEn.has(articleSlug(a))) pages.push({ key: 'article', slugs: { en: articleSlug(a) } });
  return pages;
}

export const GET: APIRoute = async ({ site }) => {
  const pages = [...staticPages, ...(await articlePages())];
  const abs = (p: string) => new URL(p, site).href;
  const urls = pages
    .flatMap((page) =>
      (['fr', 'en'] as const).filter((lang) => hasPage(page, lang)).map((lang) => {
        const alternates = (['fr', 'en'] as const)
          .filter((l) => hasPage(page, l))
          .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(pagePath(page, l))}"/>`)
          .join('\n');
        return `  <url>\n    <loc>${abs(pagePath(page, lang))}</loc>\n${alternates}\n  </url>`;
      }),
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
