/**
 * Payment Schemas
 *
 * Schemi per i pagamenti
 */
import { z } from 'zod';
export declare const createPaymentIntentSchema: z.ZodObject<{
    amount: z.ZodNumber;
    currency: z.ZodDefault<z.ZodString>;
    type: z.ZodEnum<{
        credits: "credits";
        marketplace: "marketplace";
    }>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const confirmPaymentIntentSchema: z.ZodObject<{
    paymentIntentId: z.ZodString;
    paymentMethodId: z.ZodString;
}, z.core.$strip>;
export type CreatePaymentIntentInput = z.infer<typeof createPaymentIntentSchema>;
export type ConfirmPaymentIntentInput = z.infer<typeof confirmPaymentIntentSchema>;
