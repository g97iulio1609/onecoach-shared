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
import type { DifficultyLevel, WorkoutStatus, WorkoutTemplateType } from './database.types';
export type { DifficultyLevel, WorkoutStatus, WorkoutTemplateType };
/**
 * Categoria esercizio
 */
export type ExerciseCategory = 'strength' | 'cardio' | 'flexibility' | 'balance' | 'endurance' | 'core';
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
    reps?: number;
    repsMax?: number;
    duration?: number;
    weight: number | null;
    weightMax?: number | null;
    weightLbs: number | null;
    rest: number;
    intensityPercent: number | null;
    intensityPercentMax?: number | null;
    rpe: number | null;
    rpeMax?: number | null;
    done?: boolean;
    repsDone?: number;
    durationDone?: number;
    weightDone?: number;
    weightDoneLbs?: number;
    notes?: string;
}
/**
 * Progressione per gruppi di serie
 */
export interface SetProgression {
    type: 'linear' | 'percentage' | 'rpe';
    steps: Array<{
        fromSet: number;
        toSet: number;
        adjustment: number;
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
    count: number;
    baseSet: ExerciseSet;
    progression?: SetProgression;
    sets: ExerciseSet[];
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
    equipment: string[];
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
    totalDuration?: number;
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
    duration: number;
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
    category?: string;
    tags: string[];
    data: Exercise | WorkoutDay | WorkoutWeek;
    isPublic: boolean;
    usageCount: number;
    lastUsedAt?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}
