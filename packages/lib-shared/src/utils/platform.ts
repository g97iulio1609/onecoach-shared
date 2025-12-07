/**
 * Platform Detection Utilities
 *
 * Cross-platform utilities to detect environment and capabilities
 * Works on both web and React Native
 */

/**
 * Check if code is running on the server
 */
export const isServer = typeof window === 'undefined';

/**
 * Check if code is running on the client
 */
export const isClient = !isServer;

/**
 * Check if browser supports a specific API
 */
export function hasAPI(apiName: string): boolean {
  if (isServer) return false;
  return apiName in window;
}

/**
 * Safely access window object
 */
export function getWindow(): Window | undefined {
  return isClient ? window : undefined;
}

/**
 * Safely access document object
 */
export function getDocument(): Document | undefined {
  return isClient ? document : undefined;
}

/**
 * Safely access localStorage
 */
export function getLocalStorage(): Storage | null {
  if (isServer) return null;
  try {
    return window.localStorage;
  } catch (_error: unknown) {
    return null;
  }
}

/**
 * Safely access sessionStorage
 */
export function getSessionStorage(): Storage | null {
  if (isServer) return null;
  try {
    return window.sessionStorage;
  } catch (_error: unknown) {
    return null;
  }
}

/**
 * Get NODE_ENV with trimming to avoid warnings about spaces
 */
const getNodeEnv = (): string => {
  const env = process.env.NODE_ENV;
  return env ? env.trim() : '';
};

/**
 * Check if running in development mode
 */
export const isDevelopment = getNodeEnv() === 'development';

/**
 * Check if running in production mode
 */
export const isProduction = getNodeEnv() === 'production';

/**
 * Check if running in test mode
 */
export const isTest = getNodeEnv() === 'test';

/**
 * Platform-agnostic noop function
 */
export const noop = () => {};

/**
 * Platform-agnostic delay function
 */
export const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Safely parse JSON with fallback
 */
export function safeJSONParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (_error: unknown) {
    return fallback;
  }
}

/**
 * Safely stringify JSON with fallback
 */
export function safeJSONStringify<T>(value: T, fallback = '{}'): string {
  try {
    return JSON.stringify(value);
  } catch (_error: unknown) {
    return fallback;
  }
}

/**
 * Deep clone an object
 * Uses structuredClone when available (faster and more accurate)
 * Falls back to JSON.parse/stringify for compatibility
 *
 * Note: structuredClone supports:
 * - Dates, Maps, Sets, RegExp
 * - Typed arrays, ArrayBuffers
 * - Circular references
 * - Error objects (partially)
 *
 * Does NOT support:
 * - Functions
 * - Symbols
 * - DOM nodes
 */
export function deepClone<T>(value: T): T {
  // Check if structuredClone is available (Node 17+, modern browsers)
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(value);
    } catch (_error: unknown) {
      // Fall through to JSON method if structuredClone fails
    }
  }

  // Fallback to JSON method (loses Date objects, functions, etc.)
  try {
    return JSON.parse(JSON.stringify(value)) as T;
  } catch (_error: unknown) {
    // If even JSON fails, return the original value
    return value;
  }
}
