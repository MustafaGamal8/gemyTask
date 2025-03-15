import { z } from 'zod';

export const testimonialSchema = z.object({
  author: z.string().min(1, 'Author is required'),
  content: z.string().min(1, 'Content is required'),
  rating: z.number().int().min(1).max(5).default(5)
});

export type TestimonialInput = z.infer<typeof testimonialSchema>;