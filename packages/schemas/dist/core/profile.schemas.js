/**
 * Profile Schemas
 *
 * Schemi per il profilo utente
 */
import { z } from 'zod';
import { Sex, WeightUnit, ActivityLevel, DietType } from '@prisma/client';
export const profileSchema = z.object({
    age: z.number().min(10).max(120).nullable().optional(),
    sex: z.nativeEnum(Sex).nullable().optional(),
    heightCm: z.number().min(100).max(250).nullable().optional(),
    weightKg: z.number().min(30).max(250).nullable().optional(),
    weightUnit: z.nativeEnum(WeightUnit).optional(),
    activityLevel: z.nativeEnum(ActivityLevel).nullable().optional(),
    trainingFrequency: z.number().min(1).max(14).nullable().optional(),
    dailyCalories: z.number().min(800).max(7000).nullable().optional(),
    nutritionGoals: z.array(z.string()).optional().default([]),
    workoutGoals: z.array(z.string()).optional().default([]),
    equipment: z.array(z.string()).optional().default([]),
    dietaryRestrictions: z.array(z.string()).optional().default([]),
    dietaryPreferences: z.array(z.string()).optional().default([]),
    dietType: z.nativeEnum(DietType).nullable().optional(),
    healthNotes: z.string().max(2000).nullable().optional(),
    autoRecalculateMacros: z.boolean().optional(),
});
