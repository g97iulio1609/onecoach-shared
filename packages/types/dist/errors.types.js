/**
 * Error types for type-safe error handling
 */
import { z } from 'zod';
/**
 * Type guard for validation errors
 */
export function isValidationError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'type' in error &&
        error.type === 'validation' &&
        'issues' in error &&
        Array.isArray(error.issues));
}
/**
 * Type guard for Prisma errors
 */
export function isPrismaError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'type' in error &&
        error.type === 'prisma' &&
        'code' in error &&
        typeof error.code === 'string');
}
/**
 * Type guard for API errors
 */
export function isApiError(error) {
    return (typeof error === 'object' &&
        error !== null &&
        'type' in error &&
        error.type === 'api' &&
        'status' in error &&
        typeof error.status === 'number');
}
/**
 * Type guard for auth errors
 */
export function isAuthError(error) {
    return typeof error === 'object' && error !== null && 'type' in error && error.type === 'auth';
}
/**
 * Type guard for business errors
 */
export function isBusinessError(error) {
    return (typeof error === 'object' && error !== null && 'type' in error && error.type === 'business');
}
