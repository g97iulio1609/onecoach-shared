/**
 * Workout Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input workout
 */
import { z } from 'zod';
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
        google: "google";
        anthropic: "anthropic";
        openai: "openai";
        xai: "xai";
        openrouter: "openrouter";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    reasoningEnabled: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>;
}, z.core.$strip>;
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
export type WorkoutRequestBase = z.infer<typeof workoutRequestBaseSchema>;
export type WorkoutStreamRequest = z.infer<typeof workoutStreamRequestSchema>;
export type CreateWorkoutSession = z.infer<typeof createWorkoutSessionSchema>;
export type UpdateWorkoutSession = z.infer<typeof updateWorkoutSessionSchema>;
//# sourceMappingURL=input.schemas.d.ts.map