/**
 * Orchestrator Types
 *
 * Tipi specifici per Orchestrator integration.
 * Fornisce type safety per metadata e context dell'orchestrator.
 *
 * Principi:
 * - KISS: Strutture semplici e mappabili
 * - SOLID: Single responsibility per ogni tipo
 * - DRY: Tipi riusabili per conversioni Prisma ↔ SDK
 */

import type { ExecutionMetadata, PlanMetadata, CheckpointMetadata } from './prisma.types';

/**
 * Metadata per orchestrator (versione type-safe)
 * Sostituisce Record<string, unknown> in tutto il codebase
 */
export interface OrchestratorMetadata {
  userId: string;
  goal?: string;
  planData?: unknown;
  lastCheckpoint?: unknown;
  result?: unknown;
  metrics?: {
    executionTime?: number;
    tokensUsed?: number;
    steps?: number;
    retries?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Context per orchestrator (versione type-safe)
 * Sostituisce Record<string, unknown> per context objects
 */
export interface OrchestratorContext {
  userId: string;
  sessionId?: string;
  domain?: string;
  mode?: string;
  metadata?: OrchestratorMetadata;
  [key: string]: unknown;
}

/**
 * Planning service adapter interface
 * Tipizza l'adapter per il planning service
 */
export interface PlanningServiceAdapter {
  validatePlan?: (plan: unknown) => Promise<{
    isValid: boolean;
    errors?: string[];
    score?: number;
  }>;
  getPlan?: (planId: string) => Promise<{
    id: string;
    executionId: string;
    userId: string;
    domain: string;
    goal: string;
    plan: unknown;
    status: string;
    metadata: OrchestratorMetadata;
    createdAt: Date;
    updatedAt: Date;
  } | null>;
  enrichContext?: (context: unknown) => Promise<{
    additionalData: Record<string, unknown>;
    suggestions: string[];
    constraints: string[];
    preferences: Record<string, unknown>;
  }>;
}

/**
 * Converte PlanMetadata in OrchestratorMetadata
 */
export function planMetadataToOrchestrator(metadata: PlanMetadata): OrchestratorMetadata {
  return {
    userId: (metadata.userId as string) || '',
    goal: metadata.goal as string | undefined,
    planData: metadata.planData,
    lastCheckpoint: metadata.lastCheckpoint,
    ...Object.fromEntries(
      Object.entries(metadata).filter(
        ([key]) => !['userId', 'goal', 'planData', 'lastCheckpoint'].includes(key)
      )
    ),
  };
}

/**
 * Converte OrchestratorMetadata in PlanMetadata
 */
export function orchestratorToPlanMetadata(metadata: OrchestratorMetadata): PlanMetadata {
  return {
    userId: metadata.userId,
    goal: metadata.goal,
    planData: metadata.planData,
    lastCheckpoint: metadata.lastCheckpoint as CheckpointMetadata | undefined,
    ...Object.fromEntries(
      Object.entries(metadata).filter(
        ([key]) => !['userId', 'goal', 'planData', 'lastCheckpoint'].includes(key)
      )
    ),
  };
}

/**
 * Converte ExecutionMetadata in OrchestratorMetadata
 */
export function executionMetadataToOrchestrator(metadata: ExecutionMetadata): OrchestratorMetadata {
  return {
    userId: metadata.userId,
    goal: metadata.goal,
    planData: metadata.planData,
    result: metadata.result,
    metrics: metadata.metrics,
    ...Object.fromEntries(
      Object.entries(metadata).filter(
        ([key]) => !['userId', 'goal', 'planData', 'result', 'metrics'].includes(key)
      )
    ),
  };
}

/**
 * Type guard per verificare se un valore è OrchestratorMetadata
 */
export function isOrchestratorMetadata(value: unknown): value is OrchestratorMetadata {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.userId === 'string';
}

/**
 * Type guard per verificare se un valore è OrchestratorContext
 */
export function isOrchestratorContext(value: unknown): value is OrchestratorContext {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const obj = value as Record<string, unknown>;
  return typeof obj.userId === 'string';
}
