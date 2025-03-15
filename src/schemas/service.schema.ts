import { z } from 'zod';

export const serviceSchema = z.object({
  image: z.string().url('Invalid image URL'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  options: z.record(z.any()).or(z.array(z.any())).refine((val) => {
    try {
      JSON.stringify(val);
      return true;
    } catch {
      return false;
    }
  }, 'Invalid JSON format for options')
});

export type ServiceInput = z.infer<typeof serviceSchema>;