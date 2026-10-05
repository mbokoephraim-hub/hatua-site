import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { url } from '../utils/url';

// Pages statiques du site (ajoutez ici toute nouvelle page). Les projets sont ajoutés automatiquement.
const staticPages = ['/', '/a-propos', '/poles', '/projets', '/s-engager', '/contact', '/fondatrice'];

export const GET: APIRoute = ({ site }) => {
  const paths = [...staticPages, ...projects.map((p) => `/projets/${p.slug}`)];
  const urls = paths
    .map((p) => `  <url><loc>${new URL(url(p), site).href}</loc></url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
