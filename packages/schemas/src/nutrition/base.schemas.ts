/**
 * Nutrition Base Schemas - SINGLE SOURCE OF TRUTH
 *
 * Core value objects per il dominio nutrizione.
 * Pattern-based schemas sono in pattern.schemas.ts
 *
 * @module @onecoach/schemas/nutrition
 */

import { z } from 'zod';
import { isoDateStringSchema, timestampSchema } from '../core/common.schemas';

// ============================================================================
// CORE VALUE OBJECTS
// ============================================================================

/**
 * Tipi di pasto supportati
 */
export const MealTypeSchema = z.enum([
  'breakfast',
  'lunch',
  'dinner',
  'snack',
  'pre-workout',
  'post-workout',
]);
export type MealType = z.infer<typeof MealTypeSchema>;

/**
 * Macronutrienti base (fiber opzionale)
 */
export const MacrosSchema = z.object({
  calories: z.number().min(0),
  protein: z.number().min(0),
  carbs: z.number().min(0),
  fats: z.number().min(0),
  fiber: z.number().min(0).optional(),
});
export type Macros = z.infer<typeof MacrosSchema>;

/**
 * Macronutrienti completi (fiber obbligatorio)
 */
export const CompleteMacrosSchema = MacrosSchema.extend({
  fiber: z.number().min(0),
});
export type CompleteMacros = z.infer<typeof CompleteMacrosSchema>;

/**
 * Obiettivi nutrizionali
 */
export const NutritionGoalSchema = z.enum([
  'weight_loss',
  'muscle_gain',
  'maintenance',
  'performance',
  'health',
  'body_recomposition',
]);
export type NutritionGoal = z.infer<typeof NutritionGoalSchema>;

/**
 * Tipi di dieta supportati
 */
export const DietTypeSchema = z.enum([
  'omnivore',
  'vegetarian',
  'vegan',
  'pescatarian',
  'keto',
  'paleo',
  'mediterranean',
  'none',
]);
export type DietType = z.infer<typeof DietTypeSchema>;

/**
 * Livelli di attività
 */
export const ActivityLevelSchema = z.enum([
  'sedentary',
  'light',
  'moderate',
  'active',
  'very_active',
]);
export type ActivityLevel = z.infer<typeof ActivityLevelSchema>;

/**
 * Genere
 */
export const GenderSchema = z.enum(['male', 'female', 'other']);
export type Gender = z.infer<typeof GenderSchema>;

// ============================================================================
// USER PROFILE
// ============================================================================

/**
 * Profilo utente per calcoli nutrizionali
 */
export const NutritionUserProfileSchema = z.object({
  name: z.string().optional(),
  weight: z.number().min(30).max(300),
  height: z.number().min(100).max(250),
  age: z.number().min(10).max(100),
  gender: GenderSchema,
  activityLevel: ActivityLevelSchema,
  bodyFatPercentage: z.number().min(0).max(100).optional(),
});
export type NutritionUserProfile = z.infer<typeof NutritionUserProfileSchema>;

// ============================================================================
// FOOD & MEAL ENTITIES
// ============================================================================

/**
 * Alimento in un pasto
 */
export const FoodSchema = z.object({
  id: z.string(),
  foodItemId: z.string(),
  name: z.string(),
  quantity: z.number().min(0),
  unit: z.enum(['g', 'ml']).default('g'),
  macros: MacrosSchema.optional(),
  notes: z.string().optional(),
  done: z.boolean().optional(),
  actualQuantity: z.number().optional(),
  actualMacros: MacrosSchema.optional(),
});
export type Food = z.infer<typeof FoodSchema>;

/**
 * Pasto
 */
export const MealSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: MealTypeSchema,
  time: z.string().optional(),
  foods: z.array(FoodSchema),
  totalMacros: MacrosSchema,
  notes: z.string().optional(),
});
export type Meal = z.infer<typeof MealSchema>;

/**
 * Giorno nutrizionale
 */
export const NutritionDaySchema = z.object({
  id: z.string(),
  dayNumber: z.number().int().positive(),
  dayName: z.string(),
  meals: z.array(MealSchema).min(1),
  totalMacros: MacrosSchema,
  waterIntake: z.number().optional(),
  notes: z.string().optional(),
});
export type NutritionDay = z.infer<typeof NutritionDaySchema>;

/**
 * Settimana nutrizionale
 */
export const NutritionWeekSchema = z.object({
  id: z.string(),
  weekNumber: z.number().int().positive(),
  days: z.array(NutritionDaySchema).min(1),
  weeklyAverageMacros: MacrosSchema,
  notes: z.string().optional(),
});
export type NutritionWeek = z.infer<typeof NutritionWeekSchema>;

// ============================================================================
// NUTRITION PLAN (espanso per viewer)
// ============================================================================

/**
 * Stati del piano
 */
export const PlanStatusSchema = z.enum(['DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED']);
export type PlanStatus = z.infer<typeof PlanStatusSchema>;

/**
 * Piano nutrizionale base (senza timestamps)
 */
export const NutritionPlanBaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  goals: z.array(z.string()).min(1),
  durationWeeks: z.number().int().min(1).max(16),
  targetMacros: CompleteMacrosSchema,
  weeks: z.array(NutritionWeekSchema).min(1),
  restrictions: z.array(z.string()).default([]),
  preferences: z.array(z.string()).default([]),
  status: PlanStatusSchema.default('ACTIVE'),
  version: z.number().int().default(1),
  userProfile: NutritionUserProfileSchema.optional(),
  metadata: z.record(z.string(), z.unknown()).nullable().optional(),
});

/**
 * Piano nutrizionale completo
 */
export const NutritionPlanSchema = NutritionPlanBaseSchema.extend(timestampSchema.shape);
export type NutritionPlan = z.infer<typeof NutritionPlanSchema>;

// ============================================================================
// PERSONALIZATION & ADAPTATIONS
// ============================================================================

/**
 * Piano personalizzato - customizzazioni specifiche per l'utente
 */
export const PersonalizedPlanSchema = z.object({
  customizations: z.array(z.string()),
  personalNotes: z.array(z.string()),
  motivationalMessage: z.string().optional(),
});
export type PersonalizedPlan = z.infer<typeof PersonalizedPlanSchema>;

/**
 * Adattamenti al piano - timing, porzioni, sostituzioni
 */
export const AdaptationsSchema = z.object({
  mealTimingAdjustments: z
    .array(
      z.object({
        mealId: z.string(),
        newTime: z.string(),
        reason: z.string().optional(),
      })
    )
    .optional(),
  portionAdjustments: z
    .array(
      z.object({
        mealId: z.string(),
        foodId: z.string(),
        adjustmentFactor: z.number(),
        reason: z.string().optional(),
      })
    )
    .optional(),
  substitutions: z
    .array(
      z.object({
        originalFoodId: z.string(),
        substituteFoodId: z.string(),
        reason: z.string().optional(),
      })
    )
    .optional(),
});
export type Adaptations = z.infer<typeof AdaptationsSchema>;

// ============================================================================
// TRACKING
// ============================================================================

/**
 * Tracking giornaliero
 */
export const NutritionTrackingSchema = z.object({
  planId: z.string(),
  date: isoDateStringSchema,
  meals: z.array(
    z.object({
      mealId: z.string(),
      completed: z.boolean(),
      actualFoods: z.array(FoodSchema).optional(),
      notes: z.string().optional(),
    })
  ),
  actualMacros: MacrosSchema,
  waterIntake: z.number(),
  notes: z.string().optional(),
});
export type NutritionTracking = z.infer<typeof NutritionTrackingSchema>;

// ============================================================================
// TEMPLATES
// ============================================================================

export const NutritionTemplateTypeSchema = z.enum(['meal', 'day', 'week']);
export type NutritionTemplateType = z.infer<typeof NutritionTemplateTypeSchema>;

export const MealTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  meal: MealSchema,
  tags: z.array(z.string()),
  isPublic: z.boolean(),
  userId: z.string(),
  createdAt: isoDateStringSchema,
  updatedAt: isoDateStringSchema,
});
export type MealTemplate = z.infer<typeof MealTemplateSchema>;

// ============================================================================
// DIETARY RESTRICTIONS
// ============================================================================

/**
 * Restrizioni alimentari
 */
export const DietaryRestrictionsSchema = z.object({
  allergies: z.array(z.string()).default([]),
  intolerances: z.array(z.string()).default([]),
  dietType: DietTypeSchema,
  dislikedFoods: z.array(z.string()).default([]),
  preferredFoods: z.array(z.string()).default([]),
});
export type DietaryRestrictions = z.infer<typeof DietaryRestrictionsSchema>;
