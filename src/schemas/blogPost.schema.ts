import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  image: z.string().url('Invalid image URL').optional(),
  tags: z.array(z.string()).min(1, 'At least one tag is required')
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;