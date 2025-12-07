/**
 * API Helpers
 *
 * Utility KISS/DRY per standardizzare handler PATCH e batch.
 * Al momento fornisce solo tipi e firme base; estendibile in futuro.
 */

import { z } from 'zod';

export type PatchValidator<T extends z.ZodTypeAny> = (schema: T, payload: unknown) => z.infer<T>;

export function validatePatch<T extends z.ZodTypeAny>(schema: T, payload: unknown): z.infer<T> {
  return schema.partial().parse(payload);
}

export type BatchAction = 'update' | 'delete' | 'create';

export interface BatchResult {
  success: boolean;
  results: Array<{ id: string; success: boolean; error?: string }>;
  created?: number;
  updated?: number;
  deleted?: number;
}

// Placeholder per futuri handler factory (non usato ancora per evitare breaking change).
export function createBatchResult(): BatchResult {
  return { success: true, results: [] };
}
