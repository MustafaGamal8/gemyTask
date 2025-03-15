import { z } from 'zod';

export const pricingPlanSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.number().positive('Price must be positive'),
  features: z.array(z.string()).min(1, 'At least one feature is required')
});

export type PricingPlanInput = z.infer<typeof pricingPlanSchema>;