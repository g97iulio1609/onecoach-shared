/**
 * Profile Schemas
 *
 * Schemi per il profilo utente
 */
import { z } from 'zod';
export declare const profileSchema: z.ZodObject<{
    age: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    sex: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        MALE: "MALE";
        FEMALE: "FEMALE";
        OTHER: "OTHER";
    }>>>;
    heightCm: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    weightKg: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    weightUnit: z.ZodOptional<z.ZodEnum<{
        KG: "KG";
        LBS: "LBS";
    }>>;
    activityLevel: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        SEDENTARY: "SEDENTARY";
        LIGHT: "LIGHT";
        MODERATE: "MODERATE";
        ACTIVE: "ACTIVE";
        VERY_ACTIVE: "VERY_ACTIVE";
    }>>>;
    trainingFrequency: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    dailyCalories: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    nutritionGoals: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    workoutGoals: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    equipment: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    dietaryRestrictions: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    dietaryPreferences: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    dietType: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        OMNIVORE: "OMNIVORE";
        VEGETARIAN: "VEGETARIAN";
        VEGAN: "VEGAN";
        PESCATARIAN: "PESCATARIAN";
        KETO: "KETO";
        PALEO: "PALEO";
        MEDITERRANEAN: "MEDITERRANEAN";
    }>>>;
    healthNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    autoRecalculateMacros: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type ProfileInput = z.infer<typeof profileSchema>;
