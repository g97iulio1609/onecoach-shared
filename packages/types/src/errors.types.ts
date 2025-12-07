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
export type AppError =
  | ValidationError
  | PrismaError
  | ApiError
  | AuthError
  | BusinessError
  | BaseError;

/**
 * Type guard for validation errors
 */
export function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'validation' &&
    'issues' in error &&
    Array.isArray((error as ValidationError).issues)
  );
}

/**
 * Type guard for Prisma errors
 */
export function isPrismaError(error: unknown): error is PrismaError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'prisma' &&
    'code' in error &&
    typeof (error as PrismaError).code === 'string'
  );
}

/**
 * Type guard for API errors
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'type' in error &&
    error.type === 'api' &&
    'status' in error &&
    typeof (error as ApiError).status === 'number'
  );
}

/**
 * Type guard for auth errors
 */
export function isAuthError(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && 'type' in error && error.type === 'auth';
}

/**
 * Type guard for business errors
 */
export function isBusinessError(error: unknown): error is BusinessError {
  return (
    typeof error === 'object' && error !== null && 'type' in error && error.type === 'business'
  );
}
