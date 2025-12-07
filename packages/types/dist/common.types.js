/**
 * Common Types
 *
 * Type definitions comuni utilizzate in tutta l'applicazione
 */
/**
 * Type guard per verificare se un valore è JsonConfig
 */
export function isJsonConfig(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 * Type guard per verificare se un valore è ErrorDetails
 */
export function isErrorDetails(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 * Crea un OperationResult con tipizzazione forte
 */
export function createOperationResult(success, metadata, data, error) {
    const result = {
        success,
        metadata,
    };
    if (data !== undefined) {
        result.data = data;
    }
    if (error !== undefined) {
        result.error = error;
    }
    return result;
}
