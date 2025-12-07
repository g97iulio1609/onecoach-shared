/**
 * Payment Schemas
 *
 * Schemi per i pagamenti
 */
import { z } from 'zod';
export const createPaymentIntentSchema = z.object({
    amount: z.number().positive(),
    currency: z.string().length(3).default('eur'),
    type: z.enum(['credits', 'marketplace']),
    metadata: z.record(z.string(), z.string()).optional(),
    description: z.string().max(500).optional(),
});
export const confirmPaymentIntentSchema = z.object({
    paymentIntentId: z.string().min(1),
    paymentMethodId: z.string().min(1),
});
