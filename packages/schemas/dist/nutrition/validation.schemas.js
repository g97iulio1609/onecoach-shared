/**
 * Nutrition Validation Schemas
 *
 * Schemi estesi per validazione API con vincoli più stretti
 * UNICA FONTE DI VERITÀ per validazione nutrizione
 */
import { z } from 'zod';
import { MacrosSchema, CompleteMacrosSchema, FoodSchema, MealSchema, NutritionDaySchema, NutritionWeekSchema, NutritionPlanSchema, } from './base.schemas';
const USER_METRICS_CONSTANTS = {
    MIN_WEIGHT: 30,
    MAX_WEIGHT: 300,
    MIN_HEIGHT: 100,
    MAX_HEIGHT: 250,
    MIN_AGE: 10,
    MAX_AGE: 100,
};
// Shared schemas with stricter calorie bounds for validation
export const macrosValidationSchema = MacrosSchema.extend({
    calories: MacrosSchema.shape.calories.min(800).max(6000),
});
export const targetMacrosValidationSchema = CompleteMacrosSchema.extend({
    calories: CompleteMacrosSchema.shape.calories.min(800).max(6000),
});
export const foodValidationSchema = FoodSchema.extend({
    macros: macrosValidationSchema.required(),
});
export const mealValidationSchema = MealSchema.extend({
    foods: z.array(foodValidationSchema).min(1),
    totalMacros: macrosValidationSchema,
});
export const nutritionDayValidationSchema = NutritionDaySchema.extend({
    meals: z.array(mealValidationSchema).min(1),
    totalMacros: macrosValidationSchema,
    waterIntake: z.number().positive().optional(),
});
export const nutritionWeekValidationSchema = NutritionWeekSchema.extend({
    days: z.array(nutritionDayValidationSchema).min(1),
});
export const nutritionPlanValidationSchema = NutritionPlanSchema.extend({
    targetMacros: targetMacrosValidationSchema,
    weeks: z.array(nutritionWeekValidationSchema).min(1),
});
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
 */
export const nutritionPlanGoalsSchema = z
    .array(z.enum(['weight_loss', 'muscle_gain', 'maintenance', 'performance'], {
    message: 'Obiettivo nutrizionale non valido',
}))
    .min(1, 'Almeno un obiettivo richiesto');
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
