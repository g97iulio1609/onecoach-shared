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
 * Type guard per verificare se un valore è SetJson
 */
export function isSetJson(value) {
    if (!value || typeof value !== 'object')
        return false;
    const obj = value;
    return (typeof obj.rest === 'number' &&
        (obj.weight === null || typeof obj.weight === 'number') &&
        (obj.weightLbs === null || typeof obj.weightLbs === 'number'));
}
/**
 * Type guard per verificare se un valore è ExerciseJson
 */
export function isExerciseJson(value) {
    if (!value || typeof value !== 'object')
        return false;
    const obj = value;
    return (typeof obj.name === 'string' &&
        Array.isArray(obj.sets) &&
        obj.sets.every((set) => isSetJson(set)));
}
/**
 * Type guard per verificare se un valore è PlanMetadata
 */
export function isPlanMetadata(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 * Type guard per verificare se un valore è ExecutionMetadata
 */
export function isExecutionMetadata(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return false;
    const obj = value;
    return typeof obj.userId === 'string';
}
/**
 * Type guard per verificare se un valore è CheckpointMetadata
 */
export function isCheckpointMetadata(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return false;
    const obj = value;
    return (typeof obj.executionId === 'string' &&
        typeof obj.timestamp === 'string' &&
        typeof obj.state === 'object' &&
        obj.state !== null);
}
