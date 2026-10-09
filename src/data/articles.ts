/**
 * Accès aux articles (src/content/articles/<langue>/<nom-du-fichier>.md).
 * L'adresse d'un article est le nom de son fichier : fr/mon-article.md → /articles/mon-article/
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Article = CollectionEntry<'articles'>;

// Les brouillons (draft: true) ne sont jamais publiés ; ils s'affichent seulement en développement
// ou si la variable SHOW_DRAFTS=true est définie (prévisualisation).
const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === 'true';

export const articleLang = (a: Article): Lang => (a.id.startsWith('en/') ? 'en' : 'fr');
export const articleSlug = (a: Article): string => a.id.split('/').slice(1).join('/');

export async function getArticles(lang: Lang): Promise<Article[]> {
  const all = await getCollection('articles', (a) => articleLang(a) === lang && (showDrafts || !a.data.draft));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Durée de lecture estimée, en minutes (environ 200 mots par minute). */
export function readingTime(a: Article): number {
  const words = (a.body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}
