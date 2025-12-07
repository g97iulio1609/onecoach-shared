/**
 * Maxes Types - SSOT (Single Source of Truth)
 *
 * Tipi centralizzati per la gestione dei massimali (1RM).
 * Tutti i componenti, API e store devono importare da qui.
 *
 * @module @onecoach/types/maxes
 */
/**
 * Massimale (1RM) dell'utente per un esercizio specifico
 */
export interface Max {
    /** ID univoco del massimale */
    id: string;
    /** ID dell'esercizio di riferimento */
    exerciseId: string;
    /** Nome dell'esercizio (per display) */
    exerciseName: string;
    /** Valore del massimale in kg */
    oneRepMax: number;
    /** Note opzionali */
    notes: string | null;
    /** Versione corrente (per history tracking) */
    version: number;
    /** Data ultimo aggiornamento */
    lastUpdated: string;
    /** Data creazione */
    createdAt: string;
}
/**
 * Versione storica di un massimale
 */
export interface MaxVersion {
    /** ID univoco della versione */
    id: string;
    /** ID del massimale padre */
    maxId: string;
    /** Valore del massimale in questa versione */
    oneRepMax: number;
    /** Note in questa versione */
    notes: string | null;
    /** Numero versione */
    version: number;
    /** Data creazione versione */
    createdAt: string;
}
/**
 * Esercizio nel contesto dei massimali
 */
export interface MaxExercise {
    id: string;
    slug: string;
    name: string;
}
/**
 * Risposta API GET /api/profile/maxes
 */
export interface GetMaxesResponse {
    maxes: MaxApiItem[];
}
/**
 * Item massimale come ritornato dall'API
 */
export interface MaxApiItem {
    id: string;
    exerciseId: string;
    oneRepMax: number;
    notes: string | null;
    lastUpdated: string;
    createdAt?: string;
    version?: number;
    exercise: MaxExercise;
}
/**
 * Payload per creazione/aggiornamento massimale
 */
export interface UpsertMaxPayload {
    exerciseId: string;
    oneRepMax: number;
    notes?: string | null;
}
/**
 * Risposta API POST/PUT /api/profile/maxes
 */
export interface UpsertMaxResponse {
    max: MaxApiItem;
}
/**
 * Risposta API GET /api/profile/maxes/[exerciseId]/history
 */
export interface MaxHistoryResponse {
    exercise: MaxExercise;
    history: MaxHistoryEntry[];
    stats: MaxHistoryStats;
}
/**
 * Entry nella history dei massimali
 */
export interface MaxHistoryEntry {
    id: string;
    maxId: string;
    oneRepMax: number;
    notes: string | null;
    version: number;
    createdAt: string;
    isCurrent: boolean;
}
/**
 * Statistiche dello storico massimali
 */
export interface MaxHistoryStats {
    currentValue: number;
    maxValue: number;
    minValue: number;
    avgValue: number;
    totalVersions: number;
    firstRecorded: string;
    lastUpdated: string;
    progression?: number;
    progressionPercent?: number;
}
/**
 * Input per creare un massimale (usato nello store)
 */
export interface CreateMaxInput {
    exerciseId: string;
    exerciseName: string;
    oneRepMax: number;
    notes?: string;
}
/**
 * Input per aggiornare un massimale (usato nello store)
 */
export interface UpdateMaxInput {
    oneRepMax?: number;
    notes?: string;
}
/**
 * Esercizio per la ricerca nel modal
 */
export interface SearchableExercise {
    id: string;
    slug: string;
    name: string;
    muscleGroups?: string[];
}
/**
 * Props per il componente MaxCard
 */
export interface MaxCardProps {
    max: Max;
    onEdit: (max: Max) => void;
    onDelete: (exerciseId: string) => void;
    onViewHistory: (max: Max) => void;
}
/**
 * Props per il modal Add/Edit
 */
export interface MaxFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: UpsertMaxPayload) => Promise<void>;
    editingMax?: Max | null;
    isSaving?: boolean;
}
/**
 * Props per il modal History
 */
export interface MaxHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    max: Max | null;
    historyData: MaxHistoryResponse | null;
    isLoading: boolean;
    onEditMax: (max: Max) => void;
}
/**
 * Payload realtime per massimali
 */
export interface MaxRealtimePayload {
    id: string;
    userId: string;
    exerciseId: string;
    oneRepMax: number;
    notes: string | null;
    lastUpdated: string;
    createdAt: string;
    version: number;
    exercises?: {
        id: string;
        name: string;
        slug?: string;
    };
}
/**
 * Converte un MaxApiItem in Max (per lo store)
 */
export declare function apiItemToMax(item: MaxApiItem): Max;
/**
 * Converte un MaxRealtimePayload in Max
 */
export declare function realtimePayloadToMax(payload: MaxRealtimePayload): Max;
