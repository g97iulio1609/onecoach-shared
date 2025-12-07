/**
 * Onboarding Schemas
 *
 * Schemi per l'onboarding
 */
import { z } from 'zod';
export declare const stepCompletionInputSchema: z.ZodObject<{
    stepNumber: z.ZodNumber;
    skipped: z.ZodOptional<z.ZodBoolean>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export declare const goToStepInputSchema: z.ZodObject<{
    stepNumber: z.ZodNumber;
}, z.core.$strip>;
export type StepCompletionInput = z.infer<typeof stepCompletionInputSchema>;
export type GoToStepInput = z.infer<typeof goToStepInputSchema>;
