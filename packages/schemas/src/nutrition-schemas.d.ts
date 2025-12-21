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
import { cuid2Schema } from './core/common.schemas';
export { cuid2Schema };
/**
 * User metrics validation schema
 *
 * Validates weight, height, age, gender, and activity level.
 * Used across all nutrition endpoints.
 */
export declare const userMetricsSchema: z.ZodObject<{
    weight: z.ZodNumber;
    height: z.ZodNumber;
    age: z.ZodNumber;
    gender: z.ZodEnum<{
        other: "other";
        male: "male";
        female: "female";
    }>;
    activityLevel: z.ZodEnum<{
        light: "light";
        active: "active";
        sedentary: "sedentary";
        moderate: "moderate";
        very_active: "very_active";
    }>;
}, z.core.$strip>;
/**
 * Nutrition plan goals schema (array of goals)
 *
 * Supports multiple nutrition goals (e.g., weight loss + muscle maintenance).
 * Goals are provided as names and will be converted to IDs in the backend.
 */
export declare const nutritionPlanGoalsSchema: z.ZodArray<z.ZodEnum<{
    performance: "performance";
    weight_loss: "weight_loss";
    muscle_gain: "muscle_gain";
    maintenance: "maintenance";
}>>;
/**
 * Model tier configuration schema
 *
 * Validates tier selection and admin overrides for provider/model.
 */
export declare const tierConfigSchema: z.ZodObject<{
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        openrouter: "openrouter";
        openai: "openai";
        anthropic: "anthropic";
        google: "google";
        xai: "xai";
    }>>;
    model: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Reasoning configuration schema
 */
export declare const reasoningConfigSchema: z.ZodObject<{
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        medium: "medium";
        low: "low";
        high: "high";
    }>>;
}, z.core.$strip>;
/**
 * Complete nutrition request schema (non-streaming)
 *
 * Used by: /api/agent/nutrition/route.ts
 *
 * NOTE: Uses 'goals' (array) format only. Multiple goals supported.
 */
export declare const nutritionRequestSchema: z.ZodObject<{
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        openrouter: "openrouter";
        openai: "openai";
        anthropic: "anthropic";
        google: "google";
        xai: "xai";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    goals: z.ZodArray<z.ZodEnum<{
        performance: "performance";
        weight_loss: "weight_loss";
        muscle_gain: "muscle_gain";
        maintenance: "maintenance";
    }>>;
    durationWeeks: z.ZodNumber;
    daysPerWeek: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    restrictions: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    preferences: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    usePlanning: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    weight: z.ZodNumber;
    height: z.ZodNumber;
    age: z.ZodNumber;
    gender: z.ZodEnum<{
        other: "other";
        male: "male";
        female: "female";
    }>;
    activityLevel: z.ZodEnum<{
        light: "light";
        active: "active";
        sedentary: "sedentary";
        moderate: "moderate";
        very_active: "very_active";
    }>;
}, z.core.$strip>;
/**
 * Streaming nutrition request schema
 *
 * Used by: /api/agent/nutrition/stream/route.ts
 */
export declare const nutritionStreamRequestSchema: z.ZodIntersection<z.ZodObject<{
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        openrouter: "openrouter";
        openai: "openai";
        anthropic: "anthropic";
        google: "google";
        xai: "xai";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    goals: z.ZodArray<z.ZodEnum<{
        performance: "performance";
        weight_loss: "weight_loss";
        muscle_gain: "muscle_gain";
        maintenance: "maintenance";
    }>>;
    durationWeeks: z.ZodNumber;
    daysPerWeek: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    restrictions: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    preferences: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    usePlanning: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    weight: z.ZodNumber;
    height: z.ZodNumber;
    age: z.ZodNumber;
    gender: z.ZodEnum<{
        other: "other";
        male: "male";
        female: "female";
    }>;
    activityLevel: z.ZodEnum<{
        light: "light";
        active: "active";
        sedentary: "sedentary";
        moderate: "moderate";
        very_active: "very_active";
    }>;
}, z.core.$strip>, z.ZodObject<{
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        medium: "medium";
        low: "low";
        high: "high";
    }>>;
}, z.core.$strip>>;
/**
 * Macros validation schema
 * Consolidated schema used across the application
 */
export declare const macrosSchema: z.ZodObject<{
    calories: z.ZodNumber;
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    fiber: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
/**
 * Nutrition day input schema (for modifications - STRICT schema corrente)
 */
export declare const nutritionDayInputSchema: z.ZodObject<{
    dayNumber: z.ZodNumber;
    dayName: z.ZodOptional<z.ZodString>;
    meals: z.ZodArray<z.ZodAny>;
    totalMacros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    waterIntake: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Nutrition modification request schema
 *
 * Used by: /api/agent/nutrition/modify/stream/route.ts
 */
export declare const nutritionModifyStreamRequestSchema: z.ZodObject<{
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        medium: "medium";
        low: "low";
        high: "high";
    }>>;
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        openrouter: "openrouter";
        openai: "openai";
        anthropic: "anthropic";
        google: "google";
        xai: "xai";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    planId: z.ZodString;
    dayNumber: z.ZodNumber;
    modifications: z.ZodString;
    currentDay: z.ZodOptional<z.ZodObject<{
        dayNumber: z.ZodNumber;
        dayName: z.ZodOptional<z.ZodString>;
        meals: z.ZodArray<z.ZodAny>;
        totalMacros: z.ZodObject<{
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        waterIntake: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    targetMacros: z.ZodOptional<z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Workout request schema (for consistency)
 */
export declare const workoutRequestBaseSchema: z.ZodObject<{
    goals: z.ZodArray<z.ZodString>;
    difficulty: z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
    }>;
    durationWeeks: z.ZodNumber;
    daysPerWeek: z.ZodNumber;
    equipmentIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
/**
 * Workout stream request schema
 */
export declare const workoutStreamRequestSchema: z.ZodObject<{
    goals: z.ZodArray<z.ZodString>;
    difficulty: z.ZodEnum<{
        beginner: "beginner";
        intermediate: "intermediate";
        advanced: "advanced";
    }>;
    durationWeeks: z.ZodNumber;
    daysPerWeek: z.ZodNumber;
    equipmentIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        openrouter: "openrouter";
        openai: "openai";
        anthropic: "anthropic";
        google: "google";
        xai: "xai";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        medium: "medium";
        low: "low";
        high: "high";
    }>>;
}, z.core.$strip>;
/**
 * ==========================================
 * TRACKING SCHEMAS
 * ==========================================
 */
/**
 * Workout session creation schema
 */
export declare const createWorkoutSessionSchema: z.ZodObject<{
    programId: z.ZodString;
    weekNumber: z.ZodNumber;
    dayNumber: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Workout session update schema
 */
export declare const updateWorkoutSessionSchema: z.ZodObject<{
    exercises: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Nutrition day log creation schema
 */
export declare const createNutritionDayLogSchema: z.ZodObject<{
    planId: z.ZodString;
    weekNumber: z.ZodNumber;
    dayNumber: z.ZodNumber;
    date: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Nutrition day log update schema
 */
export declare const updateNutritionDayLogSchema: z.ZodObject<{
    meals: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    actualDailyMacros: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    waterIntake: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
/**
 * Type exports for TypeScript
 */
export type UserMetrics = z.infer<typeof userMetricsSchema>;
export type NutritionPlanGoals = z.infer<typeof nutritionPlanGoalsSchema>;
export type TierConfig = z.infer<typeof tierConfigSchema>;
export type ReasoningConfig = z.infer<typeof reasoningConfigSchema>;
export type NutritionRequest = z.infer<typeof nutritionRequestSchema>;
export type NutritionStreamRequest = z.infer<typeof nutritionStreamRequestSchema>;
export type Macros = z.infer<typeof macrosSchema>;
export type NutritionDayInput = z.infer<typeof nutritionDayInputSchema>;
export type NutritionModifyStreamRequest = z.infer<typeof nutritionModifyStreamRequestSchema>;
export type WorkoutRequestBase = z.infer<typeof workoutRequestBaseSchema>;
export type WorkoutStreamRequest = z.infer<typeof workoutStreamRequestSchema>;
export type CreateWorkoutSession = z.infer<typeof createWorkoutSessionSchema>;
export type UpdateWorkoutSession = z.infer<typeof updateWorkoutSessionSchema>;
export type CreateNutritionDayLog = z.infer<typeof createNutritionDayLogSchema>;
export type UpdateNutritionDayLog = z.infer<typeof updateNutritionDayLogSchema>;
//# sourceMappingURL=nutrition-schemas.d.ts.map