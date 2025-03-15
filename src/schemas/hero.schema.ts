import { z } from 'zod';

export const heroSchema = z.object({
  image: z.string().url('Invalid image URL')
});

export type HeroInput = z.infer<typeof heroSchema>;