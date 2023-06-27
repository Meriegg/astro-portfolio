import { defineCollection, z } from 'astro:content';

// 2. Define your collection(s)
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    author: z.string(),
    pubDate: z.string(),
    updatedOn: z.string().optional().nullable(),
    description: z.string(),
    authorSocialLink: z.string().optional(),
    tags: z.array(z.string()),
  })
});

export const collections = {
  'blogPosts': blog,
};