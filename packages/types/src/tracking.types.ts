/**
 * Tracking Types
 *
 * Type definitions per tracking esecuzione programmi workout e nutrizione
 */

import type { BaseEntity } from './common.types';
import type { Exercise } from './workout.types';
import type { Meal, Macros } from './nutrition.types';

// Exercise is exported from workout.types, no need to re-export here

/**
 * Sessione di allenamento
 *
 * Rappresenta l'esecuzione di un giorno specifico di un programma di allenamento.
 * Contiene gli esercizi con i dati di tracking compilati dall'utente.
 */
export interface WorkoutSession extends BaseEntity {
  userId: string;
  programId: string; // ID del WorkoutProgram
  weekNumber: number;
  dayNumber: number;
  startedAt: Date;
  completedAt: Date | null; // Null se sessione non ancora completata
  exercises: Exercise[]; // Esercizi con tracking fields compilati (done, repsDone, weightDone, etc.)
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
  exercises?: Exercise[]; // Esercizi con tracking aggiornato
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
  planId: string; // ID del NutritionPlan
  weekNumber: number;
  dayNumber: number;
  date: Date; // Data del log (unica per userId + planId + weekNumber + dayNumber)
  meals: Meal[]; // Pasti con tracking fields compilati (Food.done, Food.actualQuantity, etc.)
  actualDailyMacros: Macros | null; // Totale giornaliero effettivo calcolato
  waterIntake: number | null; // Litri
  notes?: string;
}

/**
 * Request per creare un nuovo log nutrizionale
 */
export interface CreateNutritionDayLogRequest {
  planId: string;
  weekNumber: number;
  dayNumber: number;
  date?: Date; // Opzionale, default oggi
  notes?: string;
}

/**
 * Request per aggiornare un log nutrizionale
 */
export interface UpdateNutritionDayLogRequest {
  meals?: Meal[]; // Pasti con tracking aggiornato
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
  completionRate: number; // Percentuale 0-100
  averageDuration?: number; // Minuti medi per sessione
  lastSessionDate?: Date;
}

/**
 * Statistiche log nutrizionali per un piano
 */
export interface NutritionPlanStats {
  planId: string;
  totalDays: number;
  loggedDays: number;
  adherenceRate: number; // Percentuale 0-100
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
    averageAdherence: number; // Percentuale media aderenza
  };
}

/**
 * Confronto progressi nel tempo (es: per grafici)
 */
export interface ProgressComparison {
  exerciseId?: string; // Per confronto esercizio specifico
  dates: Date[];
  weights: (number | null)[]; // Peso utilizzato
  reps: (number | null)[]; // Ripetizioni
  volumes: (number | null)[]; // Volume totale (weight * reps * sets)
}

// ============================================
// ANALYTICS & MEASUREMENTS
// ============================================

/**
 * Body Measurement
 */
export interface BodyMeasurement extends BaseEntity {
  userId: string;
  date: Date;
  weight?: number; // kg
  bodyFat?: number; // percentage
  muscleMass?: number; // kg
  chest?: number; // cm
  waist?: number; // cm
  hips?: number; // cm
  thigh?: number; // cm
  arm?: number; // cm
  calf?: number; // cm
  neck?: number; // cm
  shoulders?: number; // cm
  notes?: string;
  photos?: string[]; // URLs
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
  weight: number; // kg
  volume: number; // sets * reps * weight
  rpe?: number; // Rate of Perceived Exertion (1-10)
  notes?: string;
}

/**
 * User Progress Snapshot
 */
export interface UserProgressSnapshot extends BaseEntity {
  userId: string;
  date: Date;
  // Body metrics
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  // Workout metrics
  workoutSessions7d: number;
  workoutSessions30d: number;
  avgVolumePerSession?: number;
  strengthProgress?: Record<string, number>; // {exerciseId: percentChange}
  // Nutrition metrics
  nutritionLogs7d: number;
  nutritionLogs30d: number;
  avgCalories?: number;
  avgProtein?: number;
  avgCarbs?: number;
  avgFats?: number;
  adherenceRate?: number; // percentage
  // Goals
  activeGoals: string[];
  completedGoals: string[];
}

/**
 * User Goal
 */
export interface UserGoal extends BaseEntity {
  userId: string;
  type: string; // 'weight_loss', 'muscle_gain', 'strength', etc.
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
  // Metrics
  daysLogged: number;
  totalDays: number;
  adherenceRate: number; // percentage
  avgCalories: number;
  avgProtein: number;
  avgCarbs: number;
  avgFats: number;
  avgWaterIntake?: number;
  // Variance from targets
  caloriesVariance: number; // percentage
  proteinVariance: number;
  carbsVariance: number;
  fatsVariance: number;
}

// ============================================
// ANALYTICS AGGREGATES & REPORTS
// ============================================

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
    // Serie giornaliera target vs effettivo per calorie
    calorieVariance?: Array<{
      date: string; // ISO date
      target: number;
      actual: number;
      variance: number; // percentuale differenza
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
