import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CLUSTERS = [
  'hire-hub',
  'vs',
  'migration',
  'agency',
  'seo-hub',
  'cms-hub',
  'perf-hub',
  'integrations',
  'meta',
] as const;

const faqItem = z.object({
  q: z.string(),
  a: z.string(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    cluster: z.enum(CLUSTERS).optional(),
    faq: z.array(faqItem).default([]),
  }),
});

export const collections = { blog };
