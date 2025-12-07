/**
 * Workout Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input workout
 */

import { z } from 'zod';
import { tierConfigSchema, reasoningConfigSchema } from '../nutrition/input.schemas';
import { cuid2Schema } from '../core/common.schemas';

// Validation constants
const VALIDATION_CONSTANTS = {
  MIN_DURATION_WEEKS: 1,
  MAX_DURATION_WEEKS: 16,
  MIN_DAYS_PER_WEEK: 2,
  MAX_DAYS_PER_WEEK: 6,
} as const;

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

export type WorkoutRequestBase = z.infer<typeof workoutRequestBaseSchema>;
export type WorkoutStreamRequest = z.infer<typeof workoutStreamRequestSchema>;
export type CreateWorkoutSession = z.infer<typeof createWorkoutSessionSchema>;
export type UpdateWorkoutSession = z.infer<typeof updateWorkoutSessionSchema>;
