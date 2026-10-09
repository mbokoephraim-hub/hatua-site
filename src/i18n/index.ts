/**
 * Langues du site et correspondance des adresses entre le français et l'anglais.
 * Le français est à la racine (/a-propos/), l'anglais sous /en/ (/en/about/).
 */
import { url } from '../utils/url';

export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'fr';

/** Adresse de chaque page, dans chaque langue (sans le préfixe du sous-dossier éventuel). */
export const routes = {
  home: { fr: '/', en: '/en/' },
  about: { fr: '/a-propos', en: '/en/about' },
  poles: { fr: '/poles', en: '/en/focus-areas' },
  projects: { fr: '/projets', en: '/en/projects' },
  articles: { fr: '/articles', en: '/en/articles' },
  engage: { fr: '/s-engager', en: '/en/get-involved' },
  contact: { fr: '/contact', en: '/en/contact' },
  founder: { fr: '/sublimekoyi', en: '/en/sublimekoyi' },
} as const;

export type RouteKey = keyof typeof routes;

/** Identifie la page courante pour le sélecteur de langue (ex. { key: 'project', slug: 'echos' }). */
export type PageRef =
  | { key: RouteKey }
  | { key: 'project'; slug: string }
  | { key: 'article'; slugs: Partial<Record<Lang, string>> } // slug de l'article dans chaque langue où il existe
  | { key: 'none' };

/** Lien vers une page dans une langue donnée (avec ancre facultative), prêt à mettre dans un href. */
export function path(key: RouteKey, lang: Lang, hash?: string): string {
  return url(`${routes[key][lang]}${hash ? `#${hash}` : ''}`);
}

export function projectPath(slug: string, lang: Lang): string {
  return url(`${routes.projects[lang]}/${slug}`);
}

/** Adresse de la même page dans une langue donnée (pour le sélecteur et les balises hreflang). */
export function articlePath(slug: string, lang: Lang): string {
  return url(`${routes.articles[lang]}/${slug}`);
}

export function pagePath(page: PageRef, lang: Lang): string {
  if (page.key === 'none') return path('home', lang);
  if (page.key === 'project') return projectPath(page.slug, lang);
  // Article non traduit : on renvoie vers la liste des articles de l'autre langue
  if (page.key === 'article') return page.slugs[lang] ? articlePath(page.slugs[lang]!, lang) : path('articles', lang);
  return path(page.key, lang);
}

/** La page existe-t-elle vraiment dans cette langue ? (sert aux balises hreflang) */
export function hasPage(page: PageRef, lang: Lang): boolean {
  if (page.key === 'none') return false;
  if (page.key === 'article') return Boolean(page.slugs[lang]);
  return true;
}

/** Langue de la page courante, d'après la configuration i18n d'Astro. */
export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale === 'en' ? 'en' : 'fr';
}

export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');

/** Citation avec les guillemets de la langue : « … » en français, “…” en anglais. */
export const quote = (text: string, lang: Lang) => (lang === 'fr' ? `« ${text} »` : `“${text}”`);
