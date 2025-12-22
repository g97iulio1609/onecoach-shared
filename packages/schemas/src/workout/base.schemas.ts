/**
 * Workout Base Schemas
 *
 * Schemi base per il dominio workout
 * UNICA FONTE DI VERITÀ per tutti gli schemi workout
 *
 * ARCHITETTURA SERIE:
 * - SetGroup è la sorgente di verità per rappresentare le serie
 * - Ogni SetGroup ha un baseSet (parametri comuni) e count (numero serie)
 * - Le serie individuali sono generate dal baseSet + progression opzionale
 * - Il campo sets[] legacy è deprecato, usare sempre setGroups[]
 */

import { z } from 'zod';

/**
 * Exercise set schema - Singola serie di un esercizio
 *
 * Campi principali:
 * - reps/duration: volume (reps per forza, duration per cardio/plank)
 * - weight/weightLbs: carico (kg e conversione lbs automatica)
 * - intensityPercent: % del 1RM (calcolato auto se 1RM disponibile)
 * - rpe: Rate of Perceived Exertion 1-10
 * - rest: secondi di recupero
 *
 * Campi tracking (opzionali) per esecuzione effettiva:
 * - done, repsDone, weightDone, etc.
 */
export const exerciseSetSchema = z.object({
  // Volume
  reps: z.number().int().positive().optional(),
  repsMax: z.number().int().positive().optional(),
  duration: z.number().optional(), // Rimosso .positive() - il normalizer gestisce 0 -> undefined
  // Carico
  weight: z.number().nonnegative().nullable(),
  weightMax: z.number().positive().nullable().optional(),
  weightLbs: z.number().nonnegative().nullable(), // Reso consistente con weight (non optional)
  // Intensità
  intensityPercent: z.number().min(0).max(100).nullable(),
  intensityPercentMax: z.number().min(0).max(100).nullable().optional(),
  rpe: z.number().int().min(1).max(10).nullable(),
  rpeMax: z.number().int().min(1).max(10).nullable().optional(),
  // Recupero
  rest: z.number().int().positive(),
  // Tracking fields (optional) - filled during workout execution
  done: z.boolean().optional(),
  repsDone: z.number().int().positive().optional(),
  durationDone: z.number().positive().optional(),
  weightDone: z.number().positive().optional(),
  weightDoneLbs: z.number().positive().optional(),
  notes: z.string().optional(),
});
export type ExerciseSet = z.infer<typeof exerciseSetSchema>;

/**
 * Set progression schema - Progressione tra serie di un gruppo
 *
 * Tipi di progressione:
 * - linear: incremento fisso in kg (es. +2.5kg ogni serie)
 * - percentage: incremento % del peso base
 * - rpe: incremento RPE (es. da 7 a 9 nelle ultime serie)
 */
export const setProgressionSchema = z.object({
  type: z.enum(['linear', 'percentage', 'rpe']),
  steps: z.array(
    z.object({
      fromSet: z.number().int().positive(), // Serie iniziale (1-based)
      toSet: z.number().int().positive(), // Serie finale (1-based)
      adjustment: z.number(), // Aggiustamento (kg, %, RPE punti)
    })
  ),
});
export type SetProgression = z.infer<typeof setProgressionSchema>;

/**
 * Set group schema - Gruppo di serie con parametri comuni
 *
 * SORGENTE DI VERITÀ per le serie di un esercizio.
 * Vantaggi rispetto a sets[] flat:
 * - Rappresenta serie uniformi in modo compatto (es. 4x8 = 1 gruppo con count:4)
 * - Supporta progressioni intelligenti (pyramid, drop sets, etc.)
 * - Facilita editing nel visual builder
 *
 * Esempio 4x8 @ 100kg:
 * {
 *   id: "setgroup_123",
 *   count: 4,
 *   baseSet: { reps: 8, weight: 100, rest: 120, ... },
 *   sets: [<4 ExerciseSet espansi>]
 * }
 */
export const setGroupSchema = z.object({
  id: z.string().min(1),
  count: z.number().int().positive(), // Numero di serie nel gruppo
  baseSet: exerciseSetSchema, // Parametri base per tutte le serie
  progression: setProgressionSchema.optional(), // Progressione opzionale
  sets: z.array(exerciseSetSchema), // Serie espanse (generate da baseSet + progression)
});
export type SetGroup = z.infer<typeof setGroupSchema>;

/**
 * Exercise schema - Esercizio completo con setGroups
 *
 * ARCHITETTURA:
 * - setGroups[] è la SORGENTE DI VERITÀ per le serie
 * - Ogni SetGroup rappresenta serie uniformi o con progressione
 * - Il campo sets[] legacy è mantenuto per compatibilità ma deprecato
 *
 * L'AI genera sempre setGroups. Il normalizer converte sets[] legacy → setGroups[]
 */
export const exerciseSchema = z.object({
  // Identificazione
  id: z.string().optional(),
  exerciseId: z.string().min(1, 'exerciseId OBBLIGATORIO - deve essere un ID esistente dal catalogo esercizi'),
  name: z.string().min(1),
  description: z.string().min(1),

  // Classificazione
  type: z.enum(['compound', 'accessory', 'isolation', 'core']),
  category: z.enum(['strength', 'cardio', 'flexibility', 'balance', 'endurance', 'core']),
  muscleGroup: z.string().optional(), // Singolo gruppo (legacy)
  /**
   * Gruppi muscolari target - VALIDI SOLO questi valori:
   * - "chest" (per pettorali/pectorals/pecs)
   * - "back" (per dorsali/lats/traps/posterior chain)
   * - "shoulders" (per spalle/delts/deltoids)
   * - "arms" (per braccia/triceps/biceps/forearms)
   * - "legs" (per gambe/quads/hamstrings/glutes/calves)
   * - "core" (per core/abs/abdominals)
   * - "full-body" (per esercizi full body)
   *
   * MAPPING OBBLIGATORIO prima della generazione:
   * - "triceps", "biceps", "forearms" → "arms"
   * - "pectorals", "pecs" → "chest"
   * - "lats", "traps", "posterior chain" → "back"
   * - "delts", "deltoids" → "shoulders"
   * - "quads", "quadriceps", "hamstrings", "glutes", "calves" → "legs"
   * - "abs", "abdominals" → "core"
   */
  muscleGroups: z
    .array(
      z.enum(['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'full-body'], {
        error:
          'muscleGroups deve contenere solo: "chest", "back", "shoulders", "arms", "legs", "core", "full-body". Mappa "triceps"/"biceps" → "arms", "quads"/"hamstrings" → "legs", etc.',
      })
    )
    .optional(),

  // ⭐ SERIE - setGroups è la sorgente di verità
  setGroups: z.array(setGroupSchema).min(1),

  // Display fields (per UI)
  reps: z.string().optional(), // Range reps per display ("8-10")
  rest: z.string().optional(), // Rest per display ("120s")
  intensity: z.string().optional(), // Intensità per display ("RPE 7-8")
  typeLabel: z.string().optional(),
  repRange: z.string().optional(),

  // Dettagli esercizio
  notes: z.string().optional(),
  formCues: z.array(z.string()).optional(),
  variation: z.record(z.string(), z.string()).optional(), // Multilingue { en, it }
  equipment: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional(),
});
export type Exercise = z.infer<typeof exerciseSchema>;

/**
 * Workout day schema
 */
export const workoutDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  dayName: z.string(),
  name: z.string().min(1),
  targetMuscles: z.array(z.string()).min(1),
  exercises: z.array(exerciseSchema).min(1),
  totalDuration: z.number().positive().optional(),
  notes: z.string().min(1),
  warmup: z.string().optional(),
  cooldown: z.string().min(1),
});
export type WorkoutDay = z.infer<typeof workoutDaySchema>;

/**
 * Workout week schema
 */
export const workoutWeekSchema = z.object({
  weekNumber: z.number().int().positive(),
  focus: z.string().optional(),
  days: z.array(workoutDaySchema).min(1),
  notes: z.string().optional(),
});
export type WorkoutWeek = z.infer<typeof workoutWeekSchema>;

/**
 * Workout program schema (main)
 */
export const workoutProgramSchema = z.object({
  name: z.string().min(3, 'Nome deve essere almeno 3 caratteri'),
  description: z.string(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ELITE']),
  durationWeeks: z.number().int().min(1).max(52),
  weeks: z.array(workoutWeekSchema).min(1),
  goals: z.array(z.string()),
});
export type WorkoutProgram = z.infer<typeof workoutProgramSchema>;

/**
 * AI Generation Schemas - Simplified versions for AI output
 *
 * These schemas allow AI to generate only baseSet + count,
 * and the sets[] array is built programmatically to save tokens.
 */

/**
 * AI SetGroup Schema - sets[] is optional for AI generation
 * The code will expand sets[] from baseSet + count after AI generation
 */
export const aiSetGroupSchema = z.object({
  id: z.string().min(1),
  count: z.number().int().positive(),
  baseSet: exerciseSetSchema,
  progression: setProgressionSchema.optional(),
  sets: z.array(exerciseSetSchema).optional(), // Optional for AI - will be built programmatically
});
export type AISetGroup = z.infer<typeof aiSetGroupSchema>;

/**
 * AI Exercise Schema - uses aiSetGroupSchema
 */
export const aiExerciseSchema = z.object({
  id: z.string().optional(),
  exerciseId: z.string().min(1, 'exerciseId OBBLIGATORIO - deve essere un ID esistente dal catalogo esercizi'),
  name: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['compound', 'accessory', 'isolation', 'core']),
  category: z.enum(['strength', 'cardio', 'flexibility', 'balance', 'endurance', 'core']),
  muscleGroup: z.string().optional(),
  /**
   * Gruppi muscolari target - VALIDI SOLO questi valori:
   * - "chest", "back", "shoulders", "arms", "legs", "core", "full-body"
   * MAPPING: "triceps"/"biceps" → "arms", "quads"/"hamstrings" → "legs", etc.
   */
  muscleGroups: z
    .array(
      z.enum(['chest', 'back', 'shoulders', 'arms', 'legs', 'core', 'full-body'], {
        error:
          'muscleGroups deve contenere solo: "chest", "back", "shoulders", "arms", "legs", "core", "full-body". Mappa "triceps"/"biceps" → "arms", "quads"/"hamstrings" → "legs", etc.',
      })
    )
    .optional(),
  setGroups: z.array(aiSetGroupSchema).min(1), // Uses AI version with optional sets[]
  reps: z.string().optional(),
  rest: z.string().optional(),
  intensity: z.string().optional(),
  typeLabel: z.string().optional(),
  repRange: z.string().optional(),
  notes: z.string().optional(),
  formCues: z.array(z.string()).optional(),
  variation: z.record(z.string(), z.string()).optional(),
  equipment: z.array(z.string()).optional(),
  videoUrl: z.string().url().optional(),
});
export type AIExercise = z.infer<typeof aiExerciseSchema>;

/**
 * AI Workout Day Schema
 */
export const aiWorkoutDaySchema = z.object({
  dayNumber: z.number().int().positive(),
  dayName: z.string(),
  name: z.string().min(1),
  targetMuscles: z.array(z.string()).min(1),
  exercises: z.array(aiExerciseSchema).min(1),
  totalDuration: z.number().positive().optional(),
  notes: z.string().min(1),
  warmup: z.string().optional(),
  cooldown: z.string().min(1),
});
export type AIWorkoutDay = z.infer<typeof aiWorkoutDaySchema>;

/**
 * AI Workout Week Schema
 */
export const aiWorkoutWeekSchema = z.object({
  weekNumber: z.number().int().positive(),
  focus: z.string().optional(),
  days: z.array(aiWorkoutDaySchema).min(1),
  notes: z.string().optional(),
});
export type AIWorkoutWeek = z.infer<typeof aiWorkoutWeekSchema>;

/**
 * AI Workout Program Schema - for AI generation only
 * Uses simplified schemas where sets[] is optional
 */
export const aiWorkoutProgramSchema = z.object({
  name: z.string().min(3, 'Nome deve essere almeno 3 caratteri'),
  description: z.string(),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ELITE']),
  durationWeeks: z.number().int().min(1).max(52),
  weeks: z.array(aiWorkoutWeekSchema).min(1),
  goals: z.array(z.string()),
});
export type AIWorkoutProgram = z.infer<typeof aiWorkoutProgramSchema>;

/**
 * Progression Diff Schema - for Progression Agent output
 *
 * Represents ONLY the changes to apply to subsequent weeks.
 * This saves tokens by generating only diffs instead of full weeks.
 *
 * Structure:
 * - week2/3/4: Contains only the fields that change
 * - changes[]: Array of specific modifications to exercises
 * - Each change targets a specific exercise by dayNumber + exerciseIndex + setGroupIndex
 */
export const progressionChangeSchema = z.object({
  dayNumber: z.number().int().positive(),
  exerciseIndex: z.number().int().nonnegative(), // 0-based index in exercises array
  setGroupIndex: z.number().int().nonnegative(), // 0-based index in setGroups array
  // reps is REQUIRED to ensure it's never lost when applying progression
  reps: z.number().int().positive(),
  // Other fields are optional - only include if they change
  weight: z.number().nonnegative().optional(),
  weightLbs: z.number().nonnegative().optional(),
  intensityPercent: z.number().min(0).max(100).optional(),
  rpe: z.number().int().min(1).max(10).optional(),
  rest: z.number().int().positive().optional(),
  count: z.number().int().positive().optional(), // Add/remove sets
});
export type ProgressionChange = z.infer<typeof progressionChangeSchema>;

export const progressionWeekDiffSchema = z.object({
  focus: z.string().optional(),
  notes: z.string().optional(),
  changes: z.array(progressionChangeSchema), // Array of changes to apply
});
export type ProgressionWeekDiff = z.infer<typeof progressionWeekDiffSchema>;

export const progressionDiffSchema = z.object({
  week2: progressionWeekDiffSchema,
  week3: progressionWeekDiffSchema.optional(),
  week4: progressionWeekDiffSchema.optional(),
});
export type ProgressionDiff = z.infer<typeof progressionDiffSchema>;

/**
 * Exercise Selection Output Schema - SSOT for Exercise Selection Agent
 *
 * Output schema for the exercise selection step in workout generation.
 * This is the single source of truth for exercise selection results.
 */
export const exerciseSelectionOutputSchema = z.object({
  selectedExercises: z.array(
    z.object({
      name: z.string(),
      exerciseId: z.string().min(1, 'exerciseId OBBLIGATORIO - SOLO ID esistenti dal catalogo'),
      category: z.enum(['compound', 'isolation', 'cardio', 'core', 'mobility']),
      targetMuscles: z.array(z.string()),
      equipment: z.array(z.string()),
      difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'elite']),
      sets: z.number(),
      reps: z.union([z.string(), z.number()]),
      restSeconds: z.number(),
      notes: z.string().optional(),
    })
  ).min(1),
  weeklyStructure: z.object({
    splitType: z.enum(['full_body', 'upper_lower', 'push_pull_legs', 'bro_split', 'custom']),
    workouts: z.array(
      z.object({
        day: z.string(),
        focus: z.string(),
        exerciseNames: z.array(z.string()).min(1),
      })
    ).min(1),
  }),
});
export type ExerciseSelectionOutput = z.infer<typeof exerciseSelectionOutputSchema>;

/**
 * Workout Planning Output Schema - SSOT for Workout Planning Agent
 *
 * Output schema for the workout planning step in workout generation.
 * This is the single source of truth for workout planning results.
 */
export const workoutPlanningOutputSchema = z.object({
  programStructure: z.object({
    name: z.string(),
    splitType: z.enum(['full_body', 'upper_lower', 'push_pull_legs', 'bro_split', 'custom']),
    durationWeeks: z.number(),
    mesocycles: z.array(
      z.object({
        week: z.number(),
        phase: z.enum(['accumulation', 'intensification', 'realization', 'deload']),
        description: z.string(),
      })
    ).min(1),
  }),
  weeklySchedule: z.array(z.any()).min(1),
  progressionStrategy: z.object({
    method: z.enum(['linear', 'double_progression', 'wave_loading', 'block_periodization']),
    description: z.string(),
    incrementPerWeek: z.string(),
    deloadFrequency: z.string(),
  }),
});
export type WorkoutPlanningOutput = z.infer<typeof workoutPlanningOutputSchema>;
