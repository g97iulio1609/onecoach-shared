/**
 * Generation Types
 *
 * Type definitions for AI generation inputs and outputs.
 * Moved here to allow client-side usage without importing server-only packages.
 */

import { DifficultyLevel, WorkoutStatus } from './database.types';

/**
 * Workout generation input
 */
export interface WorkoutGenerationInput {
  userId: string;
  userProfile: {
    name?: string;
    weight: number; // kg
    height: number; // cm
    age: number;
    gender: 'male' | 'female' | 'other';
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    currentLifts?: Record<string, number>; // Exercise name -> weight in kg
    injuries?: string[];
    fitnessLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  };
  goals: {
    primary: 'strength' | 'hypertrophy' | 'endurance' | 'power' | 'general_fitness';
    targetMuscles: string[]; // e.g., ['chest', 'back', 'legs']
    daysPerWeek: number; // 2-7
    duration: number; // weeks
    sessionDuration?: number; // minutes per session
  };
  constraints: {
    equipment: string[]; // e.g., ['barbell', 'dumbbells', 'bodyweight']
    location: 'gym' | 'home' | 'outdoor';
    timePerSession: number; // minutes
  };
  preferences?: {
    preferredExercises?: string[];
    dislikedExercises?: string[];
    workoutTime?: 'morning' | 'afternoon' | 'evening';
  };
  additionalNotes?: string;
  availableExercises?: string[]; // List of existing exercise names/IDs to prioritize
  oneRepMaxData?: Array<{
    exerciseId: string;
    exerciseName: string;
    weight: number;
    weightUnit: 'kg' | 'lbs';
    dateRecorded: Date;
    estimated: boolean;
  }>;
  // Feedback loop data from FeedbackLoopAgent
  feedbackData?: {
    userStatus: {
      category: 'new_user' | 'sparse_data' | 'regular_user' | 'active_user';
      totalSessions: number;
      consistencyScore: number;
    };
    exerciseTrends: Array<{
      exerciseName: string;
      trend: 'improving' | 'plateau' | 'regressing' | 'insufficient_data' | 'new_exercise';
      estimatedOneRM: number | null;
      recommendation: string;
    }>;
    suggestedRpeRange: {
      min: number;
      max: number;
    };
    deloadRecommended: boolean;
    adaptiveRecommendations: Array<{
      category: string;
      recommendation: string;
    }>;
  };
}

/**
 * Workout generation output
 */
export interface WorkoutGenerationOutput {
  program: AgentWorkoutProgram;
  tokensUsed: number;
  costUSD: number;
  generatedAt: Date;
  metadata?: {
    validationScore?: number;
    refinementPasses?: number;
    [key: string]:
      | string
      | number
      | boolean
      | null
      | undefined
      | Record<string, unknown>
      | unknown[];
  };
}

/**
 * Complete workout program (Agent version)
 * Renamed to avoid conflict with shared WorkoutProgram
 */
export interface AgentWorkoutProgram {
  id: string;
  userId: string; // Required by DB
  name: string;
  description: string;
  difficulty: DifficultyLevel; // Aligned with DB: DifficultyLevel
  durationWeeks: number; // Required by DB
  goals: string[]; // Array of goal strings/IDs (aligned with DB: String[])
  weeks: AgentWorkoutWeek[];
  status: WorkoutStatus; // Aligned with DB: WorkoutStatus
  metadata?: {
    generationMethod?: string;
    validationScore?: number;
    userProfile?: WorkoutGenerationInput['userProfile'];
    oneRepMaxData?: Array<{
      exerciseId: string;
      exerciseName: string;
      weight: number;
      weightUnit: 'kg' | 'lbs';
      dateRecorded: Date;
      estimated: boolean;
    }>;
    progressionStrategy?: {
      method: 'linear' | 'double_progression' | 'wave_loading' | 'block_periodization';
      description: string;
      incrementPerWeek: string;
      deloadFrequency: string;
    };
    startingWeights?: Array<{
      exercise: string;
      startingWeight: number;
      unit: string;
      notes?: string;
    }>;
    personalizedTips?: Array<{
      category: string;
      tip: string;
      priority: 'high' | 'medium' | 'low';
    }>;
    motivationalMessage?: string;
    practicalAdvice?: {
      warmUpRoutine: string;
      coolDownRoutine: string;
      restDayActivities: string[];
      nutritionTips: string[];
      sleepRecommendations: string;
    };
    [key: string]:
      | string
      | number
      | boolean
      | null
      | undefined
      | Record<string, unknown>
      | unknown[];
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Single week in workout program (Agent version)
 */
export interface AgentWorkoutWeek {
  weekNumber: number;
  phase: 'accumulation' | 'intensification' | 'realization' | 'deload';
  days: AgentWorkoutDay[];
  notes?: string;
  focus?: string; // Optional focus/theme for the week
}

/**
 * Single workout day (Agent version)
 *
 * Allineato con base.schemas.ts:
 * - targetMuscles è il campo principale per i muscoli target
 * - focus è opzionale (tema del giorno)
 * - totalDuration in minuti
 */
export interface AgentWorkoutDay {
  dayNumber: number;
  dayName: string; // e.g., "Monday", "Day 1"
  name?: string; // Workout name (e.g., "Upper Body Strength")
  targetMuscles: string[]; // Array of muscle IDs - REQUIRED
  totalDuration?: number; // Duration in minutes
  exercises: AgentWorkoutExercise[];
  notes?: string;
  focus?: string; // Optional theme for the day
  warmup?: string;
  cooldown?: string;
}

/**
 * Exercise Set - Singola serie di un esercizio
 *
 * Campi principali:
 * - reps/duration: volume (reps per forza, duration per cardio/plank)
 * - weight: carico in kg (null se senza 1RM)
 * - intensityPercent: % del 1RM
 * - rpe: Rate of Perceived Exertion 1-10
 * - rest: secondi di recupero
 */
export interface AgentExerciseSet {
  // Volume
  reps?: number;
  repsMax?: number;
  duration?: number;
  // Carico
  weight?: number | null;
  weightMax?: number | null;
  // Intensità
  intensityPercent?: number | null;
  intensityPercentMax?: number | null;
  rpe?: number | null;
  rpeMax?: number | null;
  // Recupero
  rest: number;
  // Tracking fields (optional)
  done?: boolean;
  repsDone?: number;
  durationDone?: number;
  weightDone?: number;
  notes?: string;
}

/**
 * Set Progression - Progressione tra serie di un gruppo
 *
 * Tipi:
 * - linear: incremento fisso in kg
 * - percentage: incremento % del peso base
 * - rpe: incremento RPE
 */
export interface AgentSetProgression {
  type: 'linear' | 'percentage' | 'rpe';
  steps: Array<{
    fromSet: number; // Serie iniziale (1-based)
    toSet: number; // Serie finale (1-based)
    adjustment: number; // Aggiustamento (kg, %, RPE punti)
  }>;
}

/**
 * Set Group - Gruppo di serie con parametri comuni
 *
 * ⭐ SORGENTE DI VERITÀ per le serie di un esercizio.
 *
 * Esempio 4x8 @ 100kg:
 * {
 *   id: "setgroup_123",
 *   count: 4,
 *   baseSet: { reps: 8, weight: 100, rest: 120, rpe: 7 },
 *   sets: [<4 AgentExerciseSet espansi>]
 * }
 */
export interface AgentSetGroup {
  id: string;
  count: number; // Numero di serie nel gruppo
  baseSet: AgentExerciseSet; // Parametri base per tutte le serie
  progression?: AgentSetProgression; // Progressione opzionale
  sets: AgentExerciseSet[]; // Serie espanse (generate da baseSet + progression)
}

/**
 * Single exercise in workout (Agent version)
 *
 * ARCHITETTURA:
 * - setGroups[] è la SORGENTE DI VERITÀ per le serie
 * - Ogni SetGroup rappresenta serie uniformi o con progressione
 * - name è il campo per il nome esercizio (non exerciseName)
 */
export interface AgentWorkoutExercise {
  id?: string;
  exerciseId?: string; // ID dal catalogo esercizi
  name: string; // Nome esercizio (NEVER use "exerciseName")

  // Classificazione
  type?: 'compound' | 'accessory' | 'isolation' | 'core';
  category?: 'compound' | 'isolation' | 'cardio' | 'mobility' | 'other';
  muscleGroups?: string[]; // Names of muscles (e.g. "Chest", "Triceps")
  equipment?: string[]; // Names of equipment (e.g. "Barbell", "Bench")

  // ⭐ SERIE - setGroups è la SORGENTE DI VERITÀ
  setGroups: AgentSetGroup[];

  // Metriche calcolate
  totalVolume?: number;

  // Display fields (per UI)
  reps?: string; // Range reps per display ("8-10")
  rest?: string; // Rest per display ("120s")
  intensity?: string; // Intensità per display ("RPE 7-8")

  // Dettagli
  notes?: string;
  formCues?: string[];
  videoUrl?: string;
  instructionUrl?: string;

  // Optional fields for automatic creation of new exercises
  description?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}
