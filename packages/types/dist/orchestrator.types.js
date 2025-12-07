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
/**
 * Converte PlanMetadata in OrchestratorMetadata
 */
export function planMetadataToOrchestrator(metadata) {
    return {
        userId: metadata.userId || '',
        goal: metadata.goal,
        planData: metadata.planData,
        lastCheckpoint: metadata.lastCheckpoint,
        ...Object.fromEntries(Object.entries(metadata).filter(([key]) => !['userId', 'goal', 'planData', 'lastCheckpoint'].includes(key))),
    };
}
/**
 * Converte OrchestratorMetadata in PlanMetadata
 */
export function orchestratorToPlanMetadata(metadata) {
    return {
        userId: metadata.userId,
        goal: metadata.goal,
        planData: metadata.planData,
        lastCheckpoint: metadata.lastCheckpoint,
        ...Object.fromEntries(Object.entries(metadata).filter(([key]) => !['userId', 'goal', 'planData', 'lastCheckpoint'].includes(key))),
    };
}
/**
 * Converte ExecutionMetadata in OrchestratorMetadata
 */
export function executionMetadataToOrchestrator(metadata) {
    return {
        userId: metadata.userId,
        goal: metadata.goal,
        planData: metadata.planData,
        result: metadata.result,
        metrics: metadata.metrics,
        ...Object.fromEntries(Object.entries(metadata).filter(([key]) => !['userId', 'goal', 'planData', 'result', 'metrics'].includes(key))),
    };
}
/**
 * Type guard per verificare se un valore è OrchestratorMetadata
 */
export function isOrchestratorMetadata(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return false;
    const obj = value;
    return typeof obj.userId === 'string';
}
/**
 * Type guard per verificare se un valore è OrchestratorContext
 */
export function isOrchestratorContext(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return false;
    const obj = value;
    return typeof obj.userId === 'string';
}
