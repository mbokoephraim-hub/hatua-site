import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { routes, pagePath, type PageRef, type RouteKey } from '../i18n';

// Toutes les pages, dans les deux langues, avec leurs versions alternatives (hreflang) pour Google.
// Pour ajouter une page : l'ajouter dans `routes` (src/i18n/index.ts). Les projets sont ajoutés automatiquement.
const pages: PageRef[] = [
  ...(Object.keys(routes) as RouteKey[]).map((key) => ({ key })),
  ...projects.map((p) => ({ key: 'project' as const, slug: p.slug })),
];

export const GET: APIRoute = ({ site }) => {
  const abs = (p: string) => new URL(p, site).href;
  const urls = pages
    .flatMap((page) =>
      (['fr', 'en'] as const).map((lang) => {
        const alternates = (['fr', 'en'] as const)
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
