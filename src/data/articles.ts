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
  const words = (a.body ?? '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Articles regroupés par mois (du plus récent au plus ancien), pour le catalogue. */
export function groupByMonth(articles: Article[], lang: Lang) {
  const fmt = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const groups = new Map<string, { key: string; label: string; year: number; items: Article[] }>();
  for (const a of articles) {
    const d = a.data.date;
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
    if (!groups.has(key)) groups.set(key, { key, label: fmt.format(d), year: d.getUTCFullYear(), items: [] });
    groups.get(key)!.items.push(a);
  }
  return [...groups.values()];
}
