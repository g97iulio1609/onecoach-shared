/**
 * Common Schemas
 *
 * Schemi comuni utilizzati in tutto il sistema
 */
import { z } from 'zod';
/**
 * ISO Date String helper
 * Accetta sia stringa datetime che Date object e li trasforma in ISO string
 */
export const isoDateStringSchema = z
    .union([z.string().datetime(), z.date()])
    .transform((value) => (value instanceof Date ? value.toISOString() : value));
/**
 * ID Validator
 *
 * Accepts:
 * - UUID v4 (nuovo standard createId)
 * - CUID2 (legacy) 24-32 alfanumerico
 * - ID prefissati prefix_timestamp_random (es. workout_1764116371378_vwhydv)
 */
export function cuid2Schema(message = 'ID non valido') {
    const prefixedIdPattern = /^[a-z0-9_]+_\d+_[a-z0-9]{6,}$/i;
    const uuidV4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return z
        .string()
        .min(1, `${message} (richiesto)`)
        .refine((id) => {
        // UUID v4 (nuovo default)
        if (uuidV4Pattern.test(id)) {
            return true;
        }
        // CUID2: 24-32 chars, alphanumeric
        if (id.length >= 24 && id.length <= 32 && /^[a-z0-9]+$/i.test(id)) {
            return true;
        }
        // Prefixed ID format: prefix_timestamp_random (e.g., workout_1764116371378_vwhydv)
        if (prefixedIdPattern.test(id) && id.length >= 20) {
            return true;
        }
        return false;
    }, { message });
}
/**
 * Timestamp schema
 */
export const timestampSchema = z.object({
    createdAt: isoDateStringSchema,
    updatedAt: isoDateStringSchema,
});
/**
 * Locale schema
 */
export const localeSchema = z.string().trim().min(2).max(8);
/**
 * Optional URL schema
 * Accetta stringa vuota, null, undefined, o URL valido
 * Se viene fornita una stringa vuota o null, viene trasformata in undefined
 */
export const optionalUrlSchema = z.preprocess((val) => {
    if (val === '' || val === null || val === undefined) {
        return undefined;
    }
    return val;
}, z.url().trim().max(2048).optional());
/**
 * String array schema
 */
export const stringArraySchema = z.array(z.string().trim().min(1).max(128));
