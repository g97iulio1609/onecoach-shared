/**
 * Custom Error Classes
 *
 * Domain-specific error types for better error handling.
 * Following: Strong Typing First, Explicit > Implicit, Fail Fast
 */

/**
 * Base application error with error code
 */
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Validation error for input validation failures
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Timeout error for operations that exceed time limits
 */
export class TimeoutError extends AppError {
  constructor(
    message: string,
    public readonly timeoutMs: number
  ) {
    super(message, 'TIMEOUT_ERROR', { timeoutMs });
    this.name = 'TimeoutError';
    Object.setPrototypeOf(this, TimeoutError.prototype);
  }
}

/**
 * AI/LLM provider error
 */
export class ModelError extends AppError {
  constructor(
    message: string,
    public readonly provider: string,
    details?: Record<string, unknown>
  ) {
    super(message, 'MODEL_ERROR', { provider, ...(details || {}) });
    this.name = 'ModelError';
    Object.setPrototypeOf(this, ModelError.prototype);
  }
}

/**
 * Insufficient credits error
 */
export class InsufficientCreditsError extends AppError {
  constructor(
    public readonly required: number,
    public readonly available: number
  ) {
    super(
      `Crediti insufficienti. Richiesti: ${required}, Disponibili: ${available}`,
      'INSUFFICIENT_CREDITS',
      { required, available }
    );
    this.name = 'InsufficientCreditsError';
    Object.setPrototypeOf(this, InsufficientCreditsError.prototype);
  }
}

/**
 * Unauthorized error for authentication failures
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Non autorizzato') {
    super(message, 'UNAUTHORIZED', undefined);
    this.name = 'UnauthorizedError';
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

/**
 * Forbidden error for authorization failures
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Accesso negato') {
    super(message, 'FORBIDDEN', undefined);
    this.name = 'ForbiddenError';
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * Not found error for missing resources
 */
export class NotFoundError extends AppError {
  constructor(
    public readonly resource: string,
    public readonly resourceId?: string
  ) {
    super(`${resource} non trovato${resourceId ? `: ${resourceId}` : ''}`, 'NOT_FOUND', {
      resource,
      resourceId,
    });
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Rate limit exceeded error
 */
export class RateLimitError extends AppError {
  constructor(
    message: string = 'Troppi tentativi, riprova più tardi',
    public readonly retryAfter?: number
  ) {
    super(message, 'RATE_LIMIT_EXCEEDED', { retryAfter });
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

/**
 * Conflict error for resource conflicts
 */
export class ConflictError extends AppError {
  constructor(message: string, details?: unknown) {
    super(message, 'CONFLICT', details);
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}
