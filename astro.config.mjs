// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// URL publique du site (sitemap, Open Graph, URL canoniques).
const SITE_URL = process.env.SITE_URL || 'https://hatuafoundation.org';

// Sous-dossier éventuel (si le site n'est pas à la racine du domaine). Laisser vide sinon.
const BASE_PATH = process.env.BASE_PATH || '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore', // les liens internes sont générés avec la barre finale (src/utils/url.ts),
  // Structure multilingue prête : ajoutez 'en' dans `locales` le moment venu.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
