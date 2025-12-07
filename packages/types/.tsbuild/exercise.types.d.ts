/**
 * Exercise Types - Cross-Platform
 *
 * Types shared across platforms for exercise-related functionality
 */
import type { ExerciseApprovalStatus } from './index';
/**
 * Riferimento a un esercizio del catalogo database.
 *
 * NOMENCLATURA:
 * - catalogExerciseId: ID dell'esercizio nel catalogo (exercises.id in Prisma)
 *   Diverso da un ID temporaneo di istanza in un workout.
 *
 * Usato quando si deve riferire un esercizio per:
 * - Massimali (1RM)
 * - Selezione esercizi per workout
 * - Lookup 1RM per calcolo intensità
 */
export interface CatalogExerciseReference {
    /** ID dell'esercizio nel catalogo (exercises.id) - OBBLIGATORIO */
    catalogExerciseId: string;
    /** Nome dell'esercizio per display */
    name: string;
    /** Slug dell'esercizio (opzionale) */
    slug?: string;
}
/**
 * Esercizio selezionato per i massimali.
 * Estende CatalogExerciseReference con metadati opzionali.
 */
export interface ExerciseForOneRepMax extends CatalogExerciseReference {
    /** Categoria dell'esercizio */
    category?: string;
    /** Gruppi muscolari */
    muscleGroups?: string[];
    /** Equipment necessario */
    equipment?: string[];
}
/**
 * Tipo per i filtri di stato
 */
export type FilterStatus = 'ALL' | ExerciseApprovalStatus;
/**
 * Parameters for fetching exercises
 */
export interface FetchParams {
    page?: number;
    search?: string;
    status?: FilterStatus;
    exerciseTypeId?: string;
    equipmentIds?: string[];
    bodyPartIds?: string[];
    muscleIds?: string[];
}
