import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string().optional(),
  }),
});

const pages = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

export const collections = { blog, pages };