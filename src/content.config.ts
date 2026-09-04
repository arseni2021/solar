import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  section: z.literal('blog'),
  cluster: z.string(),
  pubDate: z.date(),
  updatedDate: z.date().optional(),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: articleSchema,
});

const articlesRu = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles-ru' }),
  schema: articleSchema,
});

export const collections = { articles, 'articles-ru': articlesRu };
