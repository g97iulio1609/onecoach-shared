/**
 * Prisma Types
 *
 * Tipi specifici per campi JSON di Prisma.
 * Fornisce type safety per dati serializzati in database.
 *
 * Principi:
 * - KISS: Strutture semplici e dirette
 * - SOLID: Single responsibility per ogni tipo
 * - DRY: Tipi riusabili per strutture comuni
 */

/**
 * Versione JSON-safe di ExerciseSet per storage in Prisma
 */
export interface SetJson {
  reps?: number | null;
  duration?: number | null;
  weight: number | null;
  weightLbs: number | null;
  rest: number;
  intensityPercent: number | null;
  rpe: number | null;
  done?: boolean;
  repsDone?: number;
  durationDone?: number;
  weightDone?: number;
  weightDoneLbs?: number;
  notes?: string;
}

/**
 * Versione JSON-safe di Exercise per storage in Prisma
 *
 * NOMENCLATURA:
 * - exerciseId: Nome legacy nel JSON (per compatibilità DB esistente)
 * - catalogExerciseId: Nome standardizzato (nuovo standard)
 *   Entrambi rappresentano l'ID dell'esercizio nel catalogo
 */
export interface ExerciseJson {
  id?: string;
  /** @deprecated Usa catalogExerciseId. Mantenuto per compatibilità con dati JSON esistenti */
  exerciseId?: string;
  /** ID dell'esercizio nel catalogo database */
  catalogExerciseId?: string;
  name: string;
  description?: string;
  category?: string;
  muscleGroups?: string[];
  sets: SetJson[];
  notes?: string;
  typeLabel?: string;
  repRange?: string;
  formCues?: string[];
  equipment?: string[];
  videoUrl?: string;
  variation?: Record<string, string>;
  setGroups?: unknown[];
}

/**
 * Metadata per nutrition plans
 */
export interface PlanMetadata {
  goal?: string;
  planData?: unknown;
  userId?: string;
  lastCheckpoint?: CheckpointMetadata;
  [key: string]: unknown;
}

/**
 * Metadata per execution context
 */
export interface ExecutionMetadata {
  userId: string;
  planData?: ExecutionContextData;
  goal?: string;
  result?: unknown;
  metrics?: ExecutionMetrics;
  [key: string]: unknown;
}

/**
 * Metadata per checkpoint
 */
export interface CheckpointMetadata {
  executionId: string;
  timestamp: string;
  state: {
    status: string;
    progress: number;
    completedTasks: number;
    totalTasks: number;
  };
  context?: ExecutionContextData;
  [key: string]: unknown;
}

/**
 * Dati per execution context (versione serializzabile)
 */
export interface ExecutionContextData {
  id: string;
  domain: string;
  goal: string;
  mode: string;
  params: {
    domain: string;
    goal: string;
    mode?: string;
    context?: Record<string, unknown>;
    [key: string]: unknown;
  };
  config?: Record<string, unknown>;
  tasks?: unknown[];
  state: {
    status: string;
    progress: number;
    completedTasks: number;
    totalTasks: number;
    completedSubtasks?: number;
    totalSubtasks?: number;
  };
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Metriche di esecuzione
 */
export interface ExecutionMetrics {
  executionTime?: number;
  tokensUsed?: number;
  steps?: number;
  retries?: number;
  [key: string]: unknown;
}

/**
 * Dati per nutrition plan (versione serializzabile)
 */
export interface PlanData {
  name?: string;
  description?: string;
  durationWeeks?: number;
  targetMacros?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  weeks?: unknown[];
  restrictions?: string[];
  preferences?: string[];
  goals?: string[];
  [key: string]: unknown;
}

/**
 * Type guard per verificare se un valore è SetJson
 */
export function isSetJson(value: unknown): value is SetJson {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.rest === 'number' &&
    (obj.weight === null || typeof obj.weight === 'number') &&
    (obj.weightLbs === null || typeof obj.weightLbs === 'number')
  );
}

/**
 * Type guard per verificare se un valore è ExerciseJson
 */
export function isExerciseJson(value: unknown): value is ExerciseJson {
  if (!value || typeof value !== 'object') return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.name === 'string' &&
    Array.isArray(obj.sets) &&
    obj.sets.every((set) => isSetJson(set))
  );
}

/**
 * Type guard per verificare se un valore è PlanMetadata
 */
export function isPlanMetadata(value: unknown): value is PlanMetadata {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Type guard per verificare se un valore è ExecutionMetadata
 */
export function isExecutionMetadata(value: unknown): value is ExecutionMetadata {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.userId === 'string';
}

/**
 * Type guard per verificare se un valore è CheckpointMetadata
 */
export function isCheckpointMetadata(value: unknown): value is CheckpointMetadata {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.executionId === 'string' &&
    typeof obj.timestamp === 'string' &&
    typeof obj.state === 'object' &&
    obj.state !== null
  );
}
