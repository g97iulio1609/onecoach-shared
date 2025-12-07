/**
 * Error types for type-safe error handling
 */
import { z } from 'zod';
/**
 * Base error type
 */
export interface BaseError {
    message: string;
    name?: string;
    stack?: string;
}
/**
 * Zod validation error
 */
export interface ValidationError extends BaseError {
    type: 'validation';
    issues: z.ZodIssue[];
}
/**
 * Prisma database error
 */
export interface PrismaError extends BaseError {
    type: 'prisma';
    code: string;
    meta?: Record<string, unknown>;
}
/**
 * API error
 */
export interface ApiError extends BaseError {
    type: 'api';
    status: number;
    statusText?: string;
}
/**
 * Authentication error
 */
export interface AuthError extends BaseError {
    type: 'auth';
    code?: string;
}
/**
 * Business logic error
 */
export interface BusinessError extends BaseError {
    type: 'business';
    code?: string;
    context?: Record<string, unknown>;
}
/**
 * Discriminated union of all error types
 */
export type AppError = ValidationError | PrismaError | ApiError | AuthError | BusinessError | BaseError;
/**
 * Type guard for validation errors
 */
export declare function isValidationError(error: unknown): error is ValidationError;
/**
 * Type guard for Prisma errors
 */
export declare function isPrismaError(error: unknown): error is PrismaError;
/**
 * Type guard for API errors
 */
export declare function isApiError(error: unknown): error is ApiError;
/**
 * Type guard for auth errors
 */
export declare function isAuthError(error: unknown): error is AuthError;
/**
 * Type guard for business errors
 */
export declare function isBusinessError(error: unknown): error is BusinessError;
