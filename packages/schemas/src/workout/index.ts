/**
 * @OneCoach/schemas - Workout Module
 *
 * UNICA FONTE DI VERITÀ (SSOT) per tutti gli schemi Zod workout.
 * Questo modulo è la sorgente canonica per:
 * - SetGroup e Exercise schemas
 * - WorkoutDay, WorkoutWeek, WorkoutProgram schemas
 * - Input schemas per API
 *
 * ARCHITETTURA SERIE:
 * - SetGroup è la SORGENTE DI VERITÀ per le serie
 * - Ogni SetGroup ha baseSet (parametri comuni), count (numero serie), progression (opzionale)
 * - Le serie individuali sono espanse in SetGroup.sets[]
 * - NON esiste più campo Exercise.sets legacy
 *
 * @example
 * import {
 *   exerciseSchema,
 *   setGroupSchema,
 *   workoutProgramSchema,
 *   type Exercise,
 *   type SetGroup
 * } from '@OneCoach/schemas/workout';
 */

// Base schemas - SSOT per tutti i tipi workout
export {
  // Schemas Zod
  exerciseSetSchema,
  setProgressionSchema,
  setGroupSchema,
  exerciseSchema,
  workoutDaySchema,
  workoutWeekSchema,
  workoutProgramSchema,
  // AI Generation Schemas
  aiSetGroupSchema,
  aiExerciseSchema,
  aiWorkoutDaySchema,
  aiWorkoutWeekSchema,
  aiWorkoutProgramSchema,
  // Progression Schemas
  progressionChangeSchema,
  progressionWeekDiffSchema,
  progressionDiffSchema,
  // Agent Output Schemas (SSOT)
  exerciseSelectionOutputSchema,
  workoutPlanningOutputSchema,
  // Tipi inferiti da Zod
  type ExerciseSet,
  type SetProgression,
  type SetGroup,
  type Exercise,
  type WorkoutDay,
  type WorkoutWeek,
  type WorkoutProgram,
  type AISetGroup,
  type AIExercise,
  type AIWorkoutDay,
  type AIWorkoutWeek,
  type AIWorkoutProgram,
  type ProgressionChange,
  type ProgressionWeekDiff,
  type ProgressionDiff,
  type ExerciseSelectionOutput,
  type WorkoutPlanningOutput,
} from './base.schemas';

// Input schemas per API
export {
  workoutRequestBaseSchema,
  workoutStreamRequestSchema,
  createWorkoutSessionSchema,
  updateWorkoutSessionSchema,
  type WorkoutRequestBase,
  type WorkoutStreamRequest,
  type CreateWorkoutSession,
  type UpdateWorkoutSession,
} from './input.schemas';
