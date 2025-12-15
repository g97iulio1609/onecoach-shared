/**
 * Nutrition Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input nutrizione
 */
import { z } from 'zod';
/**
 * Model tier configuration schema
 */
export declare const tierConfigSchema: z.ZodObject<{
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        google: "google";
        anthropic: "anthropic";
        openai: "openai";
        xai: "xai";
        openrouter: "openrouter";
    }>>;
    model: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Reasoning configuration schema
 */
export declare const reasoningConfigSchema: z.ZodObject<{
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
}, z.core.$strip>;
/**
 * Complete nutrition request schema (non-streaming)
 */
export declare const nutritionRequestSchema: z.ZodObject<{
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        google: "google";
        anthropic: "anthropic";
        openai: "openai";
        xai: "xai";
        openrouter: "openrouter";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    goals: z.ZodArray<z.ZodEnum<{
        weight_loss: "weight_loss";
        muscle_gain: "muscle_gain";
        maintenance: "maintenance";
        performance: "performance";
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
        sedentary: "sedentary";
        light: "light";
        moderate: "moderate";
        active: "active";
        very_active: "very_active";
    }>;
}, z.core.$strip>;
/**
 * Streaming nutrition request schema
 */
export declare const nutritionStreamRequestSchema: z.ZodIntersection<z.ZodObject<{
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        google: "google";
        anthropic: "anthropic";
        openai: "openai";
        xai: "xai";
        openrouter: "openrouter";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    goals: z.ZodArray<z.ZodEnum<{
        weight_loss: "weight_loss";
        muscle_gain: "muscle_gain";
        maintenance: "maintenance";
        performance: "performance";
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
        sedentary: "sedentary";
        light: "light";
        moderate: "moderate";
        active: "active";
        very_active: "very_active";
    }>;
}, z.core.$strip>, z.ZodObject<{
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
}, z.core.$strip>>;
/**
 * Nutrition modification request schema
 */
export declare const nutritionModifyStreamRequestSchema: z.ZodObject<{
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        google: "google";
        anthropic: "anthropic";
        openai: "openai";
        xai: "xai";
        openrouter: "openrouter";
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
export type TierConfig = z.infer<typeof tierConfigSchema>;
export type ReasoningConfig = z.infer<typeof reasoningConfigSchema>;
export type NutritionRequest = z.infer<typeof nutritionRequestSchema>;
export type NutritionStreamRequest = z.infer<typeof nutritionStreamRequestSchema>;
export type NutritionModifyStreamRequest = z.infer<typeof nutritionModifyStreamRequestSchema>;
export type CreateNutritionDayLog = z.infer<typeof createNutritionDayLogSchema>;
export type UpdateNutritionDayLog = z.infer<typeof updateNutritionDayLogSchema>;
//# sourceMappingURL=input.schemas.d.ts.map