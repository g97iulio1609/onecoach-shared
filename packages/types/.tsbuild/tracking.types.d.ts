/**
 * Tracking Types
 *
 * Type definitions per tracking esecuzione programmi workout e nutrizione
 */
import type { BaseEntity } from './common.types';
import type { Exercise } from './workout.types';
import type { Meal, Macros } from './nutrition.types';
/**
 * Sessione di allenamento
 *
 * Rappresenta l'esecuzione di un giorno specifico di un programma di allenamento.
 * Contiene gli esercizi con i dati di tracking compilati dall'utente.
 */
export interface WorkoutSession extends BaseEntity {
    userId: string;
    programId: string;
    weekNumber: number;
    dayNumber: number;
    startedAt: Date;
    completedAt: Date | null;
    exercises: Exercise[];
    notes?: string;
}
/**
 * Request per creare una nuova sessione di allenamento
 */
export interface CreateWorkoutSessionRequest {
    programId: string;
    weekNumber: number;
    dayNumber: number;
    notes?: string;
}
/**
 * Request per aggiornare una sessione di allenamento
 */
export interface UpdateWorkoutSessionRequest {
    exercises?: Exercise[];
    completedAt?: Date | null;
    notes?: string;
}
/**
 * Log giornaliero nutrizionale
 *
 * Rappresenta l'esecuzione di un giorno specifico di un piano nutrizionale.
 * Contiene i pasti con i dati di tracking compilati dall'utente.
 */
export interface NutritionDayLog extends BaseEntity {
    userId: string;
    planId: string;
    weekNumber: number;
    dayNumber: number;
    date: Date;
    meals: Meal[];
    actualDailyMacros: Macros | null;
    waterIntake: number | null;
    notes?: string;
}
/**
 * Request per creare un nuovo log nutrizionale
 */
export interface CreateNutritionDayLogRequest {
    planId: string;
    weekNumber: number;
    dayNumber: number;
    date?: Date;
    notes?: string;
}
/**
 * Request per aggiornare un log nutrizionale
 */
export interface UpdateNutritionDayLogRequest {
    meals?: Meal[];
    actualDailyMacros?: Macros | null;
    waterIntake?: number | null;
    notes?: string | null;
}
/**
 * Statistiche sessioni workout per un programma
 */
export interface WorkoutProgramStats {
    programId: string;
    totalSessions: number;
    completedSessions: number;
    inProgressSessions: number;
    completionRate: number;
    averageDuration?: number;
    lastSessionDate?: Date;
}
/**
 * Statistiche log nutrizionali per un piano
 */
export interface NutritionPlanStats {
    planId: string;
    totalDays: number;
    loggedDays: number;
    adherenceRate: number;
    averageCalories?: number;
    averageProtein?: number;
    averageCarbs?: number;
    averageFats?: number;
    averageWaterIntake?: number;
    lastLogDate?: Date;
}
/**
 * Progressi utente - overview generale
 */
export interface UserProgressOverview {
    userId: string;
    workoutStats: {
        totalPrograms: number;
        activeSessions: number;
        completedSessions: number;
        totalWeeksCompleted: number;
    };
    nutritionStats: {
        totalPlans: number;
        activeLogs: number;
        totalDaysLogged: number;
        averageAdherence: number;
    };
}
/**
 * Confronto progressi nel tempo (es: per grafici)
 */
export interface ProgressComparison {
    exerciseId?: string;
    dates: Date[];
    weights: (number | null)[];
    reps: (number | null)[];
    volumes: (number | null)[];
}
/**
 * Body Measurement
 */
export interface BodyMeasurement extends BaseEntity {
    userId: string;
    date: Date;
    weight?: number;
    bodyFat?: number;
    muscleMass?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    thigh?: number;
    arm?: number;
    calf?: number;
    neck?: number;
    shoulders?: number;
    height?: number;
    visceralFat?: number;
    waterPercentage?: number;
    boneMass?: number;
    metabolicAge?: number;
    bmr?: number;
    notes?: string;
    photos?: string[];
}
/**
 * Exercise Performance Record
 */
export interface ExercisePerformanceRecord extends BaseEntity {
    userId: string;
    exerciseId: string;
    sessionId?: string;
    date: Date;
    sets: number;
    reps: number;
    weight: number;
    volume: number;
    rpe?: number;
    notes?: string;
}
/**
 * User Progress Snapshot
 */
export interface UserProgressSnapshot extends BaseEntity {
    userId: string;
    date: Date;
    weight?: number;
    bodyFat?: number;
    muscleMass?: number;
    workoutSessions7d: number;
    workoutSessions30d: number;
    avgVolumePerSession?: number;
    strengthProgress?: Record<string, number>;
    nutritionLogs7d: number;
    nutritionLogs30d: number;
    avgCalories?: number;
    avgProtein?: number;
    avgCarbs?: number;
    avgFats?: number;
    adherenceRate?: number;
    activeGoals: string[];
    completedGoals: string[];
}
/**
 * User Goal
 */
export interface UserGoal extends BaseEntity {
    userId: string;
    type: string;
    target: {
        metric: string;
        targetValue: number;
        currentValue: number;
        unit: string;
    };
    deadline?: Date;
    status: 'ACTIVE' | 'COMPLETED' | 'ABANDONED';
    startDate: Date;
    completedDate?: Date;
    progressLogs: Array<{
        date: Date;
        value: number;
        notes?: string;
    }>;
    notes?: string;
}
/**
 * Nutrition Adherence Metric
 */
export interface NutritionAdherenceMetric extends BaseEntity {
    userId: string;
    planId: string;
    weekNumber: number;
    startDate: Date;
    endDate: Date;
    daysLogged: number;
    totalDays: number;
    adherenceRate: number;
    avgCalories: number;
    avgProtein: number;
    avgCarbs: number;
    avgFats: number;
    avgWaterIntake?: number;
    caloriesVariance: number;
    proteinVariance: number;
    carbsVariance: number;
    fatsVariance: number;
}
/**
 * Comprehensive User Analytics Report
 */
export interface UserAnalyticsReport {
    userId: string;
    period: {
        start: Date;
        end: Date;
    };
    bodyMetrics: {
        current: BodyMeasurement | null;
        previous: BodyMeasurement | null;
        changes: {
            weight?: number;
            bodyFat?: number;
            muscleMass?: number;
        };
    };
    workoutAnalytics: {
        totalSessions: number;
        completedSessions: number;
        completionRate: number;
        totalVolume: number;
        avgVolume: number;
        strengthGains: Array<{
            exerciseId: string;
            exerciseName: string;
            percentChange: number;
            previousMax: number;
            currentMax: number;
        }>;
    };
    nutritionAnalytics: {
        totalLogs: number;
        adherenceRate: number;
        avgMacros: Macros;
        varianceFromTargets: {
            calories: number;
            protein: number;
            carbs: number;
            fats: number;
        };
        calorieVariance?: Array<{
            date: string;
            target: number;
            actual: number;
            variance: number;
        }>;
    };
    goals: {
        active: UserGoal[];
        completed: UserGoal[];
        onTrack: number;
        atRisk: number;
    };
}
/**
 * Time Series Data Point
 */
export interface TimeSeriesDataPoint {
    date: Date;
    value: number;
    label?: string;
}
/**
 * Chart Data for Analytics
 */
export interface AnalyticsChartData {
    type: 'line' | 'bar' | 'area' | 'scatter';
    title: string;
    xLabel: string;
    yLabel: string;
    datasets: Array<{
        label: string;
        data: TimeSeriesDataPoint[];
        color?: string;
    }>;
}
/**
 * Analytics Insights (AI-generated)
 */
export interface AnalyticsInsight {
    id: string;
    type: 'success' | 'warning' | 'info' | 'suggestion';
    title: string;
    description: string;
    actionable: boolean;
    action?: {
        label: string;
        url?: string;
    };
    priority: 'high' | 'medium' | 'low';
    createdAt: Date;
}
