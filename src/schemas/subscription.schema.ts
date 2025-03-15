import { z } from 'zod';

export const subscriptionSchema = z.object({
  email: z.string().email('Invalid email address')
});

export type SubscriptionInput = z.infer<typeof subscriptionSchema>;