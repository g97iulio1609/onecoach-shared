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
        weight: number;
        height: number;
        age: number;
        gender: 'male' | 'female' | 'other';
        experienceLevel: 'beginner' | 'intermediate' | 'advanced';
        currentLifts?: Record<string, number>;
        injuries?: string[];
        fitnessLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    };
    goals: {
        primary: 'strength' | 'hypertrophy' | 'endurance' | 'power' | 'general_fitness';
        targetMuscles: string[];
        daysPerWeek: number;
        duration: number;
        sessionDuration?: number;
    };
    constraints: {
        equipment: string[];
        location: 'gym' | 'home' | 'outdoor';
        timePerSession: number;
    };
    preferences?: {
        preferredExercises?: string[];
        dislikedExercises?: string[];
        workoutTime?: 'morning' | 'afternoon' | 'evening';
    };
    additionalNotes?: string;
    availableExercises?: string[];
    oneRepMaxData?: Array<{
        exerciseId: string;
        exerciseName: string;
        weight: number;
        weightUnit: 'kg' | 'lbs';
        dateRecorded: Date;
        estimated: boolean;
    }>;
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
        [key: string]: string | number | boolean | null | undefined | Record<string, unknown> | unknown[];
    };
}
/**
 * Complete workout program (Agent version)
 * Renamed to avoid conflict with shared WorkoutProgram
 */
export interface AgentWorkoutProgram {
    id: string;
    userId: string;
    name: string;
    description: string;
    difficulty: DifficultyLevel;
    durationWeeks: number;
    goals: string[];
    weeks: AgentWorkoutWeek[];
    status: WorkoutStatus;
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
        [key: string]: string | number | boolean | null | undefined | Record<string, unknown> | unknown[];
    };
    createdAt: Date;
    updatedAt: Date;
}
/**
 * Single week in workout program (Agent version)
 */
export interface AgentWorkoutWeek {
    weekNumber: number;
    phase?: 'accumulation' | 'intensification' | 'realization' | 'deload';
    days: AgentWorkoutDay[];
    notes?: string;
    focus?: string;
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
    dayName: string;
    name?: string;
    targetMuscles: string[];
    totalDuration?: number;
    exercises: AgentWorkoutExercise[];
    notes?: string;
    focus?: string;
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
    reps?: number;
    repsMax?: number;
    duration?: number;
    weight?: number | null;
    weightMax?: number | null;
    intensityPercent?: number | null;
    intensityPercentMax?: number | null;
    rpe?: number | null;
    rpeMax?: number | null;
    rest: number;
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
        fromSet: number;
        toSet: number;
        adjustment: number;
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
    count: number;
    baseSet: AgentExerciseSet;
    progression?: AgentSetProgression;
    sets: AgentExerciseSet[];
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
    exerciseId?: string;
    name: string;
    type?: 'compound' | 'accessory' | 'isolation' | 'core';
    category?: 'compound' | 'isolation' | 'cardio' | 'mobility' | 'other';
    muscleGroups?: string[];
    equipment?: string[];
    setGroups: AgentSetGroup[];
    totalVolume?: number;
    reps?: string;
    rest?: string;
    intensity?: string;
    notes?: string;
    formCues?: string[];
    videoUrl?: string;
    instructionUrl?: string;
    description?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
}
