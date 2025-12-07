/**
 * Type Guards
 *
 * Utility type guards for runtime type checking
 */
/**
 * Type guard per verificare se un valore è un Error
 */
export function isError(error) {
    return error instanceof Error;
}
/**
 * Type guard per verificare se un valore è un oggetto
 */
export function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
/**
 * Type guard per verificare se un valore è una stringa
 */
export function isString(value) {
    return typeof value === 'string';
}
/**
 * Type guard per verificare se un valore è un numero
 */
export function isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value);
}
/**
 * Type guard per verificare se un valore è un array
 */
export function isArray(value) {
    return Array.isArray(value);
}
/**
 * Type guard per verificare se un oggetto ha una proprietà specifica
 */
export function hasProperty(obj, prop) {
    return isObject(obj) && prop in obj;
}
/**
 * Type guard per verificare se un errore ha un messaggio
 */
export function isErrorWithMessage(error) {
    return isError(error) && isString(error.message);
}
/**
 * Type guard per verificare se un errore ha un codice
 */
export function isErrorWithCode(error) {
    return isError(error) && ('code' in error || 'statusCode' in error);
}
