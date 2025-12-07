/**
 * useAsyncState Hook
 *
 * Unified hook for managing async operations (loading, error, data)
 * Follows KISS, SOLID, DRY principles
 *
 * Eliminates repetitive useState patterns for async operations
 */

'use client';

import { useState, useCallback } from 'react';
import { getErrorMessage } from '@OneCoach/lib-shared/utils/api-error-handler';

export interface UseAsyncStateOptions<T> {
  initialData?: T | null;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface UseAsyncStateReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  setData: (data: T | null) => void;
  setError: (error: Error | null) => void;
  setLoading: (loading: boolean) => void;
  execute: (asyncFn: () => Promise<T>) => Promise<T | null>;
  reset: () => void;
}

/**
 * Hook for managing async state
 *
 * @example
 * ```tsx
 * const { data, isLoading, error, execute } = useAsyncState<User>();
 *
 * const loadUser = () => execute(async () => {
 *   const response = await fetch('/api/user');
 *   return response.json();
 * });
 * ```
 */
export function useAsyncState<T = unknown>(
  options: UseAsyncStateOptions<T> = {}
): UseAsyncStateReturn<T> {
  const { initialData = null, onSuccess, onError } = options;

  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (asyncFn: () => Promise<T>): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFn();
        setData(result);
        onSuccess?.(result);
        return result;
      } catch (err: unknown) {
        const errorMessage = getErrorMessage(err);
        const error = new Error(errorMessage);
        setError(error);
        onError?.(error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError]
  );

  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setIsLoading(false);
  }, [initialData]);

  return {
    data,
    isLoading,
    error,
    setData,
    setError,
    setLoading: setIsLoading,
    execute,
    reset,
  };
}
