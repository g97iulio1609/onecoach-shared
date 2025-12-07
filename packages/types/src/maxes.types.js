/**
 * Maxes Types - SSOT (Single Source of Truth)
 *
 * Tipi centralizzati per la gestione dei massimali (1RM).
 * Tutti i componenti, API e store devono importare da qui.
 *
 * @module @OneCoach/types/maxes
 */
// ============================================================================
// Utility Functions
// ============================================================================
/**
 * Converte un MaxApiItem in Max (per lo store)
 */
export function apiItemToMax(item) {
  return {
    id: item.id,
    exerciseId: item.exerciseId,
    exerciseName: item.exercise?.name || 'Esercizio',
    oneRepMax: Number(item.oneRepMax),
    notes: item.notes,
    version: item.version || 1,
    lastUpdated: item.lastUpdated,
    createdAt: item.createdAt || item.lastUpdated,
  };
}
/**
 * Converte un MaxRealtimePayload in Max
 */
export function realtimePayloadToMax(payload) {
  return {
    id: payload.id,
    exerciseId: payload.exerciseId,
    exerciseName: payload.exercises?.name || 'Esercizio',
    oneRepMax: Number(payload.oneRepMax),
    notes: payload.notes,
    version: payload.version,
    lastUpdated: payload.lastUpdated,
    createdAt: payload.createdAt,
  };
}
