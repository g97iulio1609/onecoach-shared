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
export declare const isoDateStringSchema: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>, z.ZodTransform<string, string | Date>>;
/**
 * ID Validator
 *
 * Accepts:
 * - UUID v4 (nuovo standard createId)
 * - CUID2 (legacy) 24-32 alfanumerico
 * - ID prefissati prefix_timestamp_random (es. workout_1764116371378_vwhydv)
 */
export declare function cuid2Schema(message?: string): z.ZodString;
/**
 * Timestamp schema
 */
export declare const timestampSchema: z.ZodObject<{
    createdAt: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>, z.ZodTransform<string, string | Date>>;
    updatedAt: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>, z.ZodTransform<string, string | Date>>;
}, z.core.$strip>;
/**
 * Locale schema
 */
export declare const localeSchema: z.ZodString;
/**
 * Optional URL schema
 * Accetta stringa vuota, null, undefined, o URL valido
 * Se viene fornita una stringa vuota o null, viene trasformata in undefined
 */
export declare const optionalUrlSchema: z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>;
/**
 * String array schema
 */
export declare const stringArraySchema: z.ZodArray<z.ZodString>;
