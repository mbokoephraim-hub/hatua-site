/**
 * Collections de contenus : les articles (src/content/articles/fr et src/content/articles/en).
 * Les fichiers dont le nom commence par « _ » (modèles) sont ignorés.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const articles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('HATUA Foundation'),
    // Facultatif : fonction de l'auteur, photo (dans public/) et lien « founder » vers la page de la fondatrice
    authorRole: z.string().optional(),
    authorImage: z.string().optional(),
    authorLink: z.string().optional(),
    // Facultatif : petite ligne au-dessus du titre (rubrique, projet…)
    kicker: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Nom du fichier (sans .md) de la version dans l'autre langue, s'il existe
    translation: z.string().optional(),
    // true = brouillon : visible uniquement en prévisualisation, jamais publié
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
