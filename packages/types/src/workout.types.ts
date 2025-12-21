/**
 * Workout Types
 *
 * Type definitions per workout programs ed esercizi.
 *
 * SSOT: Questi tipi sono allineati con packages/schemas/src/workout/base.schemas.ts
 * Le definizioni Zod in packages/schemas sono la fonte primaria di verità.
 *
 * ARCHITETTURA SERIE:
 * - SetGroup è la UNICA sorgente di verità per le serie
 * - Ogni SetGroup ha baseSet + count + progression opzionale
 * - Le serie espanse sono in SetGroup.sets[]
 * - NON ESISTE PIÙ Exercise.sets legacy
 */

import type { BaseEntity } from './common.types';
import type { DifficultyLevel, WorkoutStatus, WorkoutTemplateType } from './database.types'; // Import from Prisma

export type { DifficultyLevel, WorkoutStatus, WorkoutTemplateType };

// NOTE: DifficultyLevel, WorkoutStatus, WorkoutTemplateType sono definiti in Prisma schema e importati da database.types

/**
 * Categoria esercizio
 */
export type ExerciseCategory =
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'balance'
  | 'endurance'
  | 'core';

/**
 * Gruppo muscolare target
 */
export type MuscleGroup = 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'full-body';

/**
 * Set di un esercizio
 *
 * Nota: intensityPercent, weight, e rpe sono sempre presenti quando generati dall'AI.
 * Il sistema calcola automaticamente weight da intensityPercent se l'utente ha un 1RM registrato.
 *
 * Campi di tracking (opzionali) per monitorare l'esecuzione effettiva:
 * - done: indica se la serie è stata completata
 * - repsDone: numero effettivo di ripetizioni eseguite
 * - durationDone: durata effettiva (per esercizi time-based)
 * - weightDone: peso effettivo utilizzato
 * - weightDoneLbs: peso effettivo in libbre
 * - notes: note sull'esecuzione
 */
export interface ExerciseSet {
  reps?: number; // Repetitions
  repsMax?: number; // Max reps if range
  duration?: number; // seconds (for time-based exercises)
  weight: number | null; // kg - REQUIRED (calculated from intensityPercent if 1RM available, or provided by AI)
  weightMax?: number | null; // Max weight if range
  weightLbs: number | null; // libbre - REQUIRED (calculated automatically from weight)
  rest: number; // seconds - REQUIRED
  intensityPercent: number | null; // 0-100, percentuale di 1RM - REQUIRED (provided by AI, or calculated from weight if 1RM available)
  intensityPercentMax?: number | null; // Max intensity if range
  rpe: number | null; // 1-10, Rate of Perceived Exertion - REQUIRED (provided by AI)
  rpeMax?: number | null; // Max RPE if range

  // Tracking fields (optional) - filled during workout execution
  done?: boolean; // Serie completata
  repsDone?: number; // Ripetizioni effettive
  durationDone?: number; // Durata effettiva (secondi)
  weightDone?: number; // Peso effettivo (kg)
  weightDoneLbs?: number; // Peso effettivo (lbs)
  notes?: string; // Note sull'esecuzione
}

/**
 * Progressione per gruppi di serie
 */
export interface SetProgression {
  type: 'linear' | 'percentage' | 'rpe';
  steps: Array<{
    fromSet: number; // Serie iniziale (1-based)
    toSet: number; // Serie finale (1-based)
    adjustment: number; // Aggiustamento (kg, %, RPE punti)
  }>;
}

/**
 * Gruppo di serie con progressione opzionale
 *
 * ⭐ SSOT per le serie di un esercizio.
 * Ogni SetGroup rappresenta un gruppo di serie uniformi (es. 4x5 = 4 serie da 5 reps)
 */
export interface SetGroup {
  id: string;
  count: number; // Numero di serie nel gruppo
  baseSet: ExerciseSet; // Parametri base per tutte le serie
  progression?: SetProgression; // Progressione opzionale
  sets: ExerciseSet[]; // Serie individuali (generati dal gruppo)
}

/**
 * Esercizio
 *
 * ARCHITETTURA: Usa SOLO setGroups per rappresentare le serie.
 * Ogni SetGroup rappresenta un gruppo di serie identiche (es. 4x5 = 4 serie da 5 reps)
 *
 * NOMENCLATURA ID:
 * - id: ID dell'istanza dell'esercizio nel workout (temporaneo/generato)
 * - catalogExerciseId: ID dell'esercizio nel catalogo database (per lookup 1RM)
 */
export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  muscleGroups: MuscleGroup[];
  /** Gruppi di serie - UNICA sorgente di verità per le serie */
  setGroups: SetGroup[];
  notes: string;
  typeLabel: string;
  repRange: string;
  formCues: string[];
  equipment: string[]; // Array di nomi attrezzature (read-only se catalogExerciseId presente)
  /**
   * ID dell'esercizio nel catalogo database (exercises.id).
   * Usato per lookup 1RM e riferimenti al catalogo.
   * OBBLIGATORIO per esercizi dal catalogo.
   */
  catalogExerciseId: string;
  /** URL video dimostrativo opzionale per l'esercizio */
  videoUrl?: string;
  /** Variante dell'esercizio come oggetto multilingue: { en: "...", it: "..." } */
  variation?: Record<string, string>;
}

/**
 * Giorno di allenamento
 */
export interface WorkoutDay {
  dayNumber: number;
  name: string;
  exercises: Exercise[];
  totalDuration?: number; // minuti stimati
  notes: string;
  /** Array di muscle IDs (non nomi) per i muscoli target del giorno */
  targetMuscles: string[];
  warmup?: string;
  cooldown: string;
}

/**
 * Settimana di allenamento
 */
export interface WorkoutWeek {
  weekNumber: number;
  days: WorkoutDay[];
  notes?: string;
  focus?: string;
}

/**
 * Programma di allenamento
 */
export interface WorkoutProgram extends BaseEntity {
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  durationWeeks: number;
  weeks: WorkoutWeek[];
  goals: string[];
  status: WorkoutStatus;
  userId?: string;
  version?: number;
  metadata?: Record<string, unknown> | null;
}

/**
 * Workout progress tracking
 */
export interface WorkoutProgress {
  workoutId: string;
  date: string;
  exercises: {
    exerciseId: string;
    completed: boolean;
    actualSets?: ExerciseSet[];
    notes?: string;
  }[];
  duration: number; // minuti effettivi
  notes?: string;
}

/**
 * Template workout unificato
 *
 * Supporta Exercise, Day e Week template in una struttura unificata
 *
 * NOTE: WorkoutTemplateType è definito in Prisma schema e importato da database.types
 */
export interface WorkoutTemplate {
  id: string;
  type: WorkoutTemplateType;
  name: string;
  description?: string;
  category?: string; // Categoria predefinita
  tags: string[];
  data: Exercise | WorkoutDay | WorkoutWeek; // Dati a seconda del tipo
  isPublic: boolean;
  usageCount: number; // Contatore utilizzi
  lastUsedAt?: string; // Ultimo utilizzo
  userId: string;
  createdAt: string;
  updatedAt: string;
}
import type { AgentWorkoutProgram } from './generation.types';
export type { AgentWorkoutProgram };

/**
 * AI Workout Program - Specifico per la generazione/espansione
 * Unifica AIWorkoutProgram con AgentWorkoutProgram per SSOT
 */
export type AIWorkoutProgram = AgentWorkoutProgram;

/**
 * Singola modifica in una progressione settimanale
 */
export interface WorkoutChange {
  dayNumber: number;
  exerciseIndex: number;
  setGroupIndex: number;
  reps: number;
  weight?: number;
  weightLbs?: number;
  intensityPercent?: number;
  rpe?: number;
  rest?: number;
  count?: number; // Permette di cambiare il numero di serie
}

/**
 * Diff di progressione per generare settimane successive
 */
export interface ProgressionDiff {
  week2: {
    focus?: string;
    notes?: string;
    changes: WorkoutChange[];
  };
  week3: {
    focus?: string;
    notes?: string;
    changes: WorkoutChange[];
  };
  week4: {
    focus?: string;
    notes?: string;
    changes: WorkoutChange[];
  };
}
