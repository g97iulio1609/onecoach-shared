/**
 * Validation Utilities
 *
 * Centralized validation functions
 * Follows DRY principle - eliminates duplicate validation code
 */

/**
 * Email validation
 */
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

/**
 * Password validation
 */
export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

export function validatePassword(
  password: string,
  options: { minLength?: number; requireUppercase?: boolean; requireNumber?: boolean } = {}
): PasswordValidationResult {
  const { minLength = 8, requireUppercase = false, requireNumber = false } = options;
  const errors: string[] = [];

  if (password.length < minLength) {
    errors.push(`La password deve essere di almeno ${minLength} caratteri`);
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('La password deve contenere almeno una lettera maiuscola');
  }

  if (requireNumber && !/\d/.test(password)) {
    errors.push('La password deve contenere almeno un numero');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if passwords match
 */
export function passwordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword;
}

/**
 * Required field validation
 */
export function isRequired(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Number validation
 */
export function isValidNumber(
  value: string | number,
  options: { min?: number; max?: number } = {}
): boolean {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return false;
  if (options.min !== undefined && num < options.min) return false;
  if (options.max !== undefined && num > options.max) return false;
  return true;
}

/**
 * URL validation
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_error: unknown) {
    return false;
  }
}

/**
 * Generic validation function
 */
export type Validator<T = unknown> = (value: T, allValues?: T) => string | null;

export function createValidator<T>(validators: Validator<T>[]): (value: T) => string | null {
  return (value: T) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
}
