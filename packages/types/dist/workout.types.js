/**
 * Workout Types
 *
 * Type definitions per workout programs ed esercizi.
 *
 * SSOT: Questi tipi sono allineati con packages/schemas/src/workout/base.schemas.ts
 * Le definizioni Zod in packages/schemas sono la fonte primaria di verità.
 *
 * ARCHITETTURA SERIE:
 * - SetGroup è la UNICA sorgente di verità per le serie
 * - Ogni SetGroup ha baseSet + count + progression opzionale
 * - Le serie espanse sono in SetGroup.sets[]
 * - NON ESISTE PIÙ Exercise.sets legacy
 */
export {};
