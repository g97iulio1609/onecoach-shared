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
import type { ExecutionMetadata, PlanMetadata } from './prisma.types';
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
export declare function planMetadataToOrchestrator(metadata: PlanMetadata): OrchestratorMetadata;
/**
 * Converte OrchestratorMetadata in PlanMetadata
 */
export declare function orchestratorToPlanMetadata(metadata: OrchestratorMetadata): PlanMetadata;
/**
 * Converte ExecutionMetadata in OrchestratorMetadata
 */
export declare function executionMetadataToOrchestrator(metadata: ExecutionMetadata): OrchestratorMetadata;
/**
 * Type guard per verificare se un valore è OrchestratorMetadata
 */
export declare function isOrchestratorMetadata(value: unknown): value is OrchestratorMetadata;
/**
 * Type guard per verificare se un valore è OrchestratorContext
 */
export declare function isOrchestratorContext(value: unknown): value is OrchestratorContext;
