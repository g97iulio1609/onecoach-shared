/**
 * API Helpers
 *
 * Utility KISS/DRY per standardizzare handler PATCH e batch.
 * Al momento fornisce solo tipi e firme base; estendibile in futuro.
 */
import { z } from 'zod';
export function validatePatch(schema, payload) {
    return schema.partial().parse(payload);
}
// Placeholder per futuri handler factory (non usato ancora per evitare breaking change).
export function createBatchResult() {
    return { success: true, results: [] };
}
