/**
 * Weight Converter Utilities
 *
 * Utility functions per conversione e formattazione pesi
 */
import { kgToLbs, lbsToKg } from '@onecoach/lib-workout/intensity-calculator';
/**
 * Formatta il peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, calcolato se non fornito)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Stringa formattata con valore e unità
 */
export declare function formatWeight(weightKg: number | null, weightLbs: number | null | undefined, unit: 'KG' | 'LBS'): string;
/**
 * Ottiene il valore del peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, può essere null)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Valore del peso nell'unità richiesta
 */
export declare function getWeightValue(weightKg: number | null | undefined, weightLbs: number | null | undefined, unit: 'KG' | 'LBS'): number | undefined;
export { kgToLbs, lbsToKg };
/**
 * Sincronizza peso in kg e lbs, assicurando che entrambi siano sempre presenti
 * Se manca uno dei due, lo calcola dall'altro
 * @param weightKg - Peso in chilogrammi (opzionale)
 * @param weightLbs - Peso in libbre (opzionale)
 * @returns Oggetto con weightKg e weightLbs sempre sincronizzati
 */
export declare function syncWeightUnits(weightKg?: number | null, weightLbs?: number | null): {
    weightKg?: number;
    weightLbs?: number;
} | null;
//# sourceMappingURL=weight-converter.d.ts.map