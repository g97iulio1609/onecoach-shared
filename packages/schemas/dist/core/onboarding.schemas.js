/**
 * Onboarding Schemas
 *
 * Schemi per l'onboarding
 */
import { z } from 'zod';
export const stepCompletionInputSchema = z.object({
    stepNumber: z.number().int().min(1).max(15),
    skipped: z.boolean().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
});
export const goToStepInputSchema = z.object({
    stepNumber: z.number().int().min(1).max(15),
});
