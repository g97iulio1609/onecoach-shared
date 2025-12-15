/**
 * Nutrition Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input nutrizione
 */
import { z } from 'zod';
import { userMetricsSchema, nutritionPlanGoalsSchema, macrosSchema, nutritionDayInputSchema, } from './validation.schemas';
import { cuid2Schema } from '../core/common.schemas';
// Validation constants
const VALIDATION_CONSTANTS = {
    MIN_DURATION_WEEKS: 1,
    MAX_DURATION_WEEKS: 16,
    MIN_NUTRITION_DAYS: 1,
    MAX_NUTRITION_DAYS: 7,
};
/**
 * Model tier configuration schema
 */
export const tierConfigSchema = z.object({
    tier: z
        .enum(['fast', 'balanced', 'quality'], {
        message: 'Tier non valido',
    })
        .optional()
        .default('balanced'),
    provider: z
        .enum(['google', 'anthropic', 'openai', 'xai', 'openrouter'], {
        message: 'Provider non valido',
    })
        .optional(),
    model: z
        .string()
        .trim()
        .min(1, 'Nome modello troppo corto')
        .max(128, 'Nome modello troppo lungo')
        .optional(),
});
/**
 * Reasoning configuration schema
 */
export const reasoningConfigSchema = z.object({
    reasoningEnabled: z.boolean().optional().default(false),
    reasoningEffort: z
        .enum(['low', 'medium', 'high'], {
        message: 'Livello di reasoning non valido',
    })
        .optional(),
});
/**
 * Complete nutrition request schema (non-streaming)
 */
export const nutritionRequestSchema = z
    .object({
    // User metrics
    ...userMetricsSchema.shape,
    // Plan parameters
    goals: nutritionPlanGoalsSchema, // Required array of goals
    durationWeeks: z
        .number()
        .int()
        .min(VALIDATION_CONSTANTS.MIN_DURATION_WEEKS, 'Durata minima 1 settimana')
        .max(VALIDATION_CONSTANTS.MAX_DURATION_WEEKS, 'Durata massima 16 settimane'),
    daysPerWeek: z
        .number()
        .int()
        .min(VALIDATION_CONSTANTS.MIN_NUTRITION_DAYS, 'Minimo 1 giorno')
        .max(VALIDATION_CONSTANTS.MAX_NUTRITION_DAYS, 'Massimo 7 giorni')
        .optional()
        .default(7),
    restrictions: z.array(z.string()).optional().default([]),
    preferences: z.array(z.string()).optional().default([]),
    // Planning option
    usePlanning: z.boolean().optional().default(false),
    // Model configuration (admin only)
    ...tierConfigSchema.shape,
})
    .refine((data) => {
    // If provider is specified, model must also be specified (admin override)
    if (data.provider && !data.model) {
        return false;
    }
    return true;
}, {
    message: 'Se specifichi un provider, devi anche specificare un modello',
    path: ['model'],
});
/**
 * Streaming nutrition request schema
 */
export const nutritionStreamRequestSchema = z.intersection(nutritionRequestSchema, reasoningConfigSchema);
/**
 * Nutrition modification request schema
 */
export const nutritionModifyStreamRequestSchema = z.object({
    planId: cuid2Schema('ID piano non valido'),
    dayNumber: z.number().int().min(1, 'Numero giorno non valido'),
    modifications: z.string().min(10, 'Descrizione modifiche troppo breve'),
    currentDay: nutritionDayInputSchema.optional(),
    targetMacros: macrosSchema.optional(),
    // Model configuration (admin only)
    ...tierConfigSchema.shape,
    ...reasoningConfigSchema.shape,
});
/**
 * Nutrition day log creation schema
 */
export const createNutritionDayLogSchema = z.object({
    planId: cuid2Schema('ID piano non valido'),
    weekNumber: z.number().int().min(1, 'Numero settimana non valido'),
    dayNumber: z.number().int().min(1, 'Numero giorno non valido'),
    date: z.coerce.date().optional(),
    notes: z.string().optional(),
});
/**
 * Nutrition day log update schema
 */
export const updateNutritionDayLogSchema = z.object({
    meals: z.array(z.any()).optional(), // Validated by nutrition types
    actualDailyMacros: macrosSchema.nullable().optional(),
    waterIntake: z.number().min(0).max(20).nullable().optional(), // Max 20L per day
    notes: z.string().nullable().optional(), // Accepts string, null, or undefined
});
