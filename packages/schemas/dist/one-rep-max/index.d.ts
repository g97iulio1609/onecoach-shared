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
/**
 * Schema per un riferimento a un esercizio del catalogo.
 * Usato quando si deve selezionare un esercizio per associarlo a un massimale.
 *
 * IMPORTANTE: catalogExerciseId è OBBLIGATORIO e deve corrispondere
 * a un exercises.id valido nel database.
 */
export declare const CatalogExerciseReferenceSchema: z.ZodObject<{
    catalogExerciseId: z.ZodString;
    name: z.ZodString;
    slug: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CatalogExerciseReference = z.infer<typeof CatalogExerciseReferenceSchema>;
/**
 * Schema per creare/aggiornare un massimale.
 * Validazione centralizzata usata sia dal client che dal server.
 */
export declare const OneRepMaxInputSchema: z.ZodObject<{
    catalogExerciseId: z.ZodString;
    oneRepMax: z.ZodNumber;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type OneRepMaxInput = z.infer<typeof OneRepMaxInputSchema>;
/**
 * Schema per un massimale completo con dati dell'esercizio
 */
export declare const OneRepMaxWithExerciseSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    catalogExerciseId: z.ZodString;
    oneRepMax: z.ZodNumber;
    notes: z.ZodNullable<z.ZodString>;
    lastUpdated: z.ZodDate;
    createdAt: z.ZodDate;
    version: z.ZodNumber;
    exercise: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        slug: z.ZodString;
        translations: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            locale: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type OneRepMaxWithExercise = z.infer<typeof OneRepMaxWithExerciseSchema>;
/**
 * Schema per l'output dell'ExerciseSelector quando usato per i massimali.
 * Garantisce che catalogExerciseId sia sempre presente.
 */
export declare const ExerciseSelectorOutputForMaxesSchema: z.ZodObject<{
    catalogExerciseId: z.ZodString;
    name: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    muscleGroups: z.ZodOptional<z.ZodArray<z.ZodString>>;
    equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type ExerciseSelectorOutputForMaxes = z.infer<typeof ExerciseSelectorOutputForMaxesSchema>;
/**
 * Valida l'input per creare/aggiornare un massimale.
 *
 * @throws {z.ZodError} se la validazione fallisce
 */
export declare function validateOneRepMaxInput(input: unknown): OneRepMaxInput;
/**
 * Valida l'input in modo sicuro, restituendo un result object.
 */
export declare function safeValidateOneRepMaxInput(input: unknown): z.ZodSafeParseResult<{
    catalogExerciseId: string;
    oneRepMax: number;
    notes?: string | null | undefined;
}>;
/**
 * Valida un riferimento a un esercizio del catalogo.
 */
export declare function validateCatalogExerciseReference(input: unknown): CatalogExerciseReference;
/**
 * Converte un oggetto Exercise in CatalogExerciseReference.
 */
export declare function toCatalogExerciseReference(exercise: {
    catalogExerciseId: string;
    name: string;
    slug?: string;
}): CatalogExerciseReference;
