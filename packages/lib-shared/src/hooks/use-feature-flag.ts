/**
 * useFeatureFlag Hook
 *
 * React hook for checking feature flags on the client-side
 */

'use client';

import { useState, useEffect } from 'react';

interface UseFeatureFlagOptions {
  userId?: string;
  userRole?: string;
  defaultValue?: boolean;
}

export function useFeatureFlag(
  flagKey: string,
  options?: UseFeatureFlagOptions
): [boolean, boolean] {
  const [enabled, setEnabled] = useState(options?.defaultValue ?? false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkFlag() {
      try {
        const params = new URLSearchParams({ key: flagKey });
        if (options?.userId) params.append('userId', options.userId);
        if (options?.userRole) params.append('userRole', options.userRole);

        const response = await fetch(`/api/feature-flags/evaluate?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch flag');

        const data = await response.json();
        if (mounted) {
          setEnabled(data.enabled);
        }
      } catch (error: unknown) {
        console.error(`Error checking flag ${flagKey}:`, error);
        if (mounted) {
          setEnabled(options?.defaultValue ?? false);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    checkFlag();

    return () => {
      mounted = false;
    };
  }, [flagKey, options?.userId, options?.userRole, options?.defaultValue]);

  return [enabled, loading];
}

/**
 * Track a feature flag event
 */
export async function trackFlagEvent(
  flagKey: string,
  event: 'ENABLED' | 'DISABLED' | 'EVALUATED' | 'ERROR',
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    await fetch('/api/feature-flags/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flagKey,
        event,
        metadata,
      }),
    });
  } catch (error: unknown) {
    console.error('Failed to track flag event:', error);
  }
}

/**
 * Submit feedback for a feature flag
 */
export async function submitFlagFeedback(
  flagKey: string,
  rating: number,
  comment?: string,
  metadata?: Record<string, unknown>
): Promise<boolean> {
  try {
    const response = await fetch(`/api/admin/feature-flags/${flagKey}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rating,
        comment,
        metadata,
      }),
    });

    return response.ok;
  } catch (error: unknown) {
    console.error('Failed to submit flag feedback:', error);
    return false;
  }
}
