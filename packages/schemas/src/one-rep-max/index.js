/**
 * One Rep Max Schemas
 *
 * Schema Zod centralizzato per la gestione dei massimali (1RM).
 * SORGENTE DI VERITÀ per la validazione in tutto il monorepo.
 *
 * NOMENCLATURA:
 * - catalogExerciseId: ID dell'esercizio nel catalogo database (exercises.id)
 *   Usato per identificare univocamente un esercizio dal catalogo
 *   (diverso da un'istanza temporanea di Exercise in un workout)
 */
import { z } from 'zod';
// ============================================================================
// CATALOG EXERCISE REFERENCE
// ============================================================================
/**
 * Schema per un riferimento a un esercizio del catalogo.
 * Usato quando si deve selezionare un esercizio per associarlo a un massimale.
 *
 * IMPORTANTE: catalogExerciseId è OBBLIGATORIO e deve corrispondere
 * a un exercises.id valido nel database.
 */
export const CatalogExerciseReferenceSchema = z.object({
    /** ID dell'esercizio nel catalogo (exercises.id in Prisma) - OBBLIGATORIO */
    catalogExerciseId: z
        .string()
        .min(1, "L'ID dell'esercizio è obbligatorio")
        .describe("ID dell'esercizio dal catalogo database"),
    /** Nome dell'esercizio (per display) - OBBLIGATORIO */
    name: z.string().min(1, "Il nome dell'esercizio è obbligatorio"),
    /** Slug dell'esercizio (opzionale, per display/ricerca) */
    slug: z.string().optional(),
});
// ============================================================================
// ONE REP MAX INPUT
// ============================================================================
/**
 * Schema per creare/aggiornare un massimale.
 * Validazione centralizzata usata sia dal client che dal server.
 */
export const OneRepMaxInputSchema = z.object({
    /** ID dell'esercizio dal catalogo - OBBLIGATORIO */
    catalogExerciseId: z
        .string()
        .min(1, "L'ID dell'esercizio è obbligatorio")
        .describe("ID dell'esercizio dal catalogo database"),
    /** Valore del massimale in kg - deve essere > 0 e <= 1000 */
    oneRepMax: z
        .number()
        .positive('Il massimale deve essere maggiore di 0')
        .max(1000, 'Il massimale non può superare 1000 kg'),
    /** Note opzionali */
    notes: z.string().max(1000).nullable().optional(),
});
// ============================================================================
// ONE REP MAX RESPONSE
// ============================================================================
/**
 * Schema per un massimale completo con dati dell'esercizio
 */
export const OneRepMaxWithExerciseSchema = z.object({
    id: z.string(),
    userId: z.string(),
    catalogExerciseId: z.string(),
    oneRepMax: z.number(),
    notes: z.string().nullable(),
    lastUpdated: z.date(),
    createdAt: z.date(),
    version: z.number(),
    exercise: z
        .object({
        id: z.string(),
        slug: z.string(),
        translations: z
            .array(z.object({
            name: z.string(),
            locale: z.string(),
        }))
            .optional(),
    })
        .optional(),
});
// ============================================================================
// EXERCISE SELECTOR OUTPUT
// ============================================================================
/**
 * Schema per l'output dell'ExerciseSelector quando usato per i massimali.
 * Garantisce che catalogExerciseId sia sempre presente.
 */
export const ExerciseSelectorOutputForMaxesSchema = z.object({
    /** ID dell'esercizio dal catalogo - OBBLIGATORIO per i massimali */
    catalogExerciseId: z.string().min(1, "L'ID dell'esercizio è obbligatorio"),
    /** Nome dell'esercizio per display */
    name: z.string().min(1),
    /** Categoria dell'esercizio */
    category: z.string().optional(),
    /** Gruppi muscolari */
    muscleGroups: z.array(z.string()).optional(),
    /** Equipment necessario */
    equipment: z.array(z.string()).optional(),
});
// ============================================================================
// VALIDATION HELPERS
// ============================================================================
/**
 * Valida l'input per creare/aggiornare un massimale.
 *
 * @throws {z.ZodError} se la validazione fallisce
 */
export function validateOneRepMaxInput(input) {
    return OneRepMaxInputSchema.parse(input);
}
/**
 * Valida l'input in modo sicuro, restituendo un result object.
 */
export function safeValidateOneRepMaxInput(input) {
    return OneRepMaxInputSchema.safeParse(input);
}
/**
 * Valida un riferimento a un esercizio del catalogo.
 */
export function validateCatalogExerciseReference(input) {
    return CatalogExerciseReferenceSchema.parse(input);
}
/**
 * Converte un oggetto Exercise in CatalogExerciseReference.
 */
export function toCatalogExerciseReference(exercise) {
    return {
        catalogExerciseId: exercise.catalogExerciseId,
        name: exercise.name,
        slug: exercise.slug,
    };
}
