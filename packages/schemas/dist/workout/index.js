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
exerciseSetSchema, setProgressionSchema, setGroupSchema, exerciseSchema, workoutDaySchema, workoutWeekSchema, workoutProgramSchema, 
// AI Generation Schemas
aiSetGroupSchema, aiExerciseSchema, aiWorkoutDaySchema, aiWorkoutWeekSchema, aiWorkoutProgramSchema, 
// Progression Schemas
progressionChangeSchema, progressionWeekDiffSchema, progressionDiffSchema, 
// Agent Output Schemas (SSOT)
exerciseSelectionOutputSchema, workoutPlanningOutputSchema, } from './base.schemas';
// Input schemas per API
export { workoutRequestBaseSchema, workoutStreamRequestSchema, createWorkoutSessionSchema, updateWorkoutSessionSchema, } from './input.schemas';
