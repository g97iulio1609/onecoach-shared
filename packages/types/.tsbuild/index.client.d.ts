/**
 * Client-Safe Types Entry Point
 *
 * Export all client-safe types and const objects that can be safely used in client components
 * without triggering bundler warnings about server-only modules.
 *
 * Use this import path in client components instead of importing from @prisma/client:
 * @example
 * import type { ActivityLevel, Sex, WeightUnit } from '@onecoach/types/client';
 * import { ActivityLevel } from '@onecoach/types/client'; // for runtime values
 */
export * from './client-safe.types';
