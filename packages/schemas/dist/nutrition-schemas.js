/**
 * Centralized Nutrition Validation Schemas
 *
 * Eliminates ~95 lines of duplicated Zod schemas across 3 API routes.
 * Provides consistent validation for all nutrition-related endpoints.
 *
 * Following DRY principle - used by:
 * - /api/agent/nutrition/route.ts
 * - /api/agent/nutrition/stream/route.ts
 * - /api/agent/nutrition/modify/stream/route.ts
 */
import { z } from 'zod';
import { USER_METRICS_CONSTANTS, VALIDATION_CONSTANTS } from '@onecoach/lib-ai-agents';
import { MacrosSchema } from './nutrition/base.schemas';
import { cuid2Schema } from './core/common.schemas';
// Re-export cuid2Schema from common.schemas for backward compatibility
// This ensures consistent validation across all schemas, including support for
// prefixed IDs (e.g., workout_1764116371378_vwhydv)
export { cuid2Schema };
/**
 * User metrics validation schema
 *
 * Validates weight, height, age, gender, and activity level.
 * Used across all nutrition endpoints.
 */
export const userMetricsSchema = z.object({
    weight: z
        .number()
        .min(USER_METRICS_CONSTANTS.MIN_WEIGHT, 'Peso minimo 30kg')
        .max(USER_METRICS_CONSTANTS.MAX_WEIGHT, 'Peso massimo 300kg'),
    height: z
        .number()
        .min(USER_METRICS_CONSTANTS.MIN_HEIGHT, 'Altezza minima 100cm')
        .max(USER_METRICS_CONSTANTS.MAX_HEIGHT, 'Altezza massima 250cm'),
    age: z
        .number()
        .min(USER_METRICS_CONSTANTS.MIN_AGE, 'Età minima 10 anni')
        .max(USER_METRICS_CONSTANTS.MAX_AGE, 'Età massima 100 anni'),
    gender: z.enum(['male', 'female', 'other'], {
        message: 'Genere non valido',
    }),
    activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'very_active'], {
        message: 'Livello di attività non valido',
    }),
});
/**
 * Nutrition plan goals schema (array of goals)
 *
 * Supports multiple nutrition goals (e.g., weight loss + muscle maintenance).
 * Goals are provided as names and will be converted to IDs in the backend.
 */
export const nutritionPlanGoalsSchema = z
    .array(z.enum(['weight_loss', 'muscle_gain', 'maintenance', 'performance'], {
    message: 'Obiettivo nutrizionale non valido',
}))
    .min(1, 'Almeno un obiettivo richiesto');
/**
 * Model tier configuration schema
 *
 * Validates tier selection and admin overrides for provider/model.
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
 *
 * Used by: /api/agent/nutrition/route.ts
 *
 * NOTE: Uses 'goals' (array) format only. Multiple goals supported.
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
 *
 * Used by: /api/agent/nutrition/stream/route.ts
 */
export const nutritionStreamRequestSchema = z.intersection(nutritionRequestSchema, reasoningConfigSchema);
/**
 * Macros validation schema
 * Consolidated schema used across the application
 */
export const macrosSchema = MacrosSchema;
/**
 * Nutrition day input schema (for modifications - STRICT schema corrente)
 */
export const nutritionDayInputSchema = z.object({
    dayNumber: z.number().int().min(1),
    dayName: z.string().optional(),
    meals: z.array(z.any()), // Validated by nutrition-validator.ts
    totalMacros: macrosSchema,
    waterIntake: z.number().optional(),
    notes: z.string().optional(),
});
/**
 * Nutrition modification request schema
 *
 * Used by: /api/agent/nutrition/modify/stream/route.ts
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
 * Workout request schema (for consistency)
 */
export const workoutRequestBaseSchema = z.object({
    goals: z.array(z.string()).min(1, 'Almeno un obiettivo richiesto'),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced'], {
        message: 'Difficoltà non valida',
    }),
    durationWeeks: z
        .number()
        .int()
        .min(VALIDATION_CONSTANTS.MIN_DURATION_WEEKS)
        .max(VALIDATION_CONSTANTS.MAX_DURATION_WEEKS),
    daysPerWeek: z
        .number()
        .int()
        .min(VALIDATION_CONSTANTS.MIN_DAYS_PER_WEEK)
        .max(VALIDATION_CONSTANTS.MAX_DAYS_PER_WEEK),
    equipmentIds: z.array(z.string()).optional(),
});
/**
 * Workout stream request schema
 */
export const workoutStreamRequestSchema = workoutRequestBaseSchema
    .extend(tierConfigSchema.shape)
    .extend(reasoningConfigSchema.shape);
/**
 * ==========================================
 * TRACKING SCHEMAS
 * ==========================================
 */
/**
 * Workout session creation schema
 */
export const createWorkoutSessionSchema = z.object({
    programId: cuid2Schema('ID programma non valido'),
    weekNumber: z.number().int().min(1, 'Numero settimana non valido'),
    dayNumber: z.number().int().min(1, 'Numero giorno non valido'),
    notes: z.string().optional(),
});
/**
 * Workout session update schema
 */
export const updateWorkoutSessionSchema = z.object({
    exercises: z.array(z.any()).optional(), // Validated by workout types
    completedAt: z.coerce.date().nullable().optional(),
    notes: z.string().optional(),
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
