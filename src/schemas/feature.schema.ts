import { z } from 'zod';

export const featureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Invalid image URL')
});

export type FeatureInput = z.infer<typeof featureSchema>;