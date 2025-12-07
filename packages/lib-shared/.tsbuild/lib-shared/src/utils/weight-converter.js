/**
 * Weight Converter Utilities
 *
 * Utility functions per conversione e formattazione pesi
 */
import { kgToLbs, lbsToKg } from '@OneCoach/lib-workout/intensity-calculator';
/**
 * Formatta il peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, calcolato se non fornito)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Stringa formattata con valore e unità
 */
export function formatWeight(weightKg, weightLbs, unit) {
    if (weightKg === null || weightKg === undefined) {
        return 'N/A';
    }
    if (unit === 'LBS') {
        const lbs = weightLbs ?? kgToLbs(weightKg);
        return `${lbs.toFixed(1)} lbs`;
    }
    return `${weightKg.toFixed(1)} kg`;
}
/**
 * Ottiene il valore del peso in base all'unità preferita
 * @param weightKg - Peso in chilogrammi (può essere null)
 * @param weightLbs - Peso in libbre (opzionale, può essere null)
 * @param unit - Unità preferita ('KG' o 'LBS')
 * @returns Valore del peso nell'unità richiesta
 */
export function getWeightValue(weightKg, weightLbs, unit) {
    if (weightKg === undefined || weightKg === null) {
        return undefined;
    }
    if (unit === 'LBS') {
        return weightLbs !== null && weightLbs !== undefined ? weightLbs : kgToLbs(weightKg);
    }
    return weightKg;
}
// Re-export conversion functions
export { kgToLbs, lbsToKg };
/**
 * Sincronizza peso in kg e lbs, assicurando che entrambi siano sempre presenti
 * Se manca uno dei due, lo calcola dall'altro
 * @param weightKg - Peso in chilogrammi (opzionale)
 * @param weightLbs - Peso in libbre (opzionale)
 * @returns Oggetto con weightKg e weightLbs sempre sincronizzati
 */
export function syncWeightUnits(weightKg, weightLbs) {
    // Se non abbiamo nessuno dei due valori, ritorna null
    if (!weightKg && !weightLbs) {
        return null;
    }
    let finalWeightKg;
    let finalWeightLbs;
    if (weightKg !== undefined && weightKg !== null && weightKg > 0) {
        // Abbiamo kg, usa quello come fonte di verità
        finalWeightKg = weightKg;
        finalWeightLbs = kgToLbs(weightKg);
    }
    else if (weightLbs !== undefined && weightLbs !== null && weightLbs > 0) {
        // Abbiamo solo lbs, converti in kg
        finalWeightKg = lbsToKg(weightLbs);
        finalWeightLbs = weightLbs;
    }
    else {
        // Valori non validi
        return null;
    }
    return {
        weightKg: finalWeightKg,
        weightLbs: finalWeightLbs,
    };
}
