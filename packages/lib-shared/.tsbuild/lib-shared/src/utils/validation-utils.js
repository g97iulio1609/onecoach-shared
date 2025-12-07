/**
 * Validation Utilities
 *
 * Common validation functions for form inputs and data.
 * Following KISS and DRY principles.
 */
/**
 * Validate numeric quantity
 */
export function validateQuantity(value, min = 0, max = Infinity) {
    if (isNaN(value)) {
        return { valid: false, error: 'Il valore deve essere un numero' };
    }
    if (value < min) {
        return { valid: false, error: `Il valore deve essere almeno ${min}` };
    }
    if (value > max) {
        return { valid: false, error: `Il valore non può superare ${max}` };
    }
    return { valid: true };
}
/**
 * Validate macros object
 */
export function validateMacros(macros) {
    const requiredFields = ['calories', 'protein', 'carbs', 'fats'];
    for (const field of requiredFields) {
        if (macros[field] === undefined || macros[field] === null) {
            return { valid: false, error: `Il campo ${field} è obbligatorio` };
        }
        if (isNaN(macros[field])) {
            return { valid: false, error: `Il campo ${field} deve essere un numero` };
        }
        if (macros[field] < 0) {
            return { valid: false, error: `Il campo ${field} non può essere negativo` };
        }
    }
    return { valid: true };
}
/**
 * Validate date range
 */
export function validateDateRange(startDate, endDate) {
    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
        return { valid: false, error: 'Data di inizio non valida' };
    }
    if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
        return { valid: false, error: 'Data di fine non valida' };
    }
    if (startDate > endDate) {
        return { valid: false, error: 'La data di inizio deve essere precedente alla data di fine' };
    }
    // Check if range is too large (e.g., > 2 years)
    const twoYearsMs = 2 * 365 * 24 * 60 * 60 * 1000;
    if (endDate.getTime() - startDate.getTime() > twoYearsMs) {
        return { valid: false, error: 'Il periodo non può superare 2 anni' };
    }
    return { valid: true };
}
/**
 * Validate email (simple)
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        return { valid: false, error: 'Email obbligatoria' };
    }
    if (!emailRegex.test(email)) {
        return { valid: false, error: 'Email non valida' };
    }
    return { valid: true };
}
/**
 * Validate required string
 */
export function validateRequired(value, fieldName = 'Campo') {
    if (!value || value.trim().length === 0) {
        return { valid: false, error: `${fieldName} obbligatorio` };
    }
    return { valid: true };
}
/**
 * Validate string length
 */
export function validateLength(value, min, max, fieldName = 'Campo') {
    if (value.length < min) {
        return { valid: false, error: `${fieldName} deve contenere almeno ${min} caratteri` };
    }
    if (value.length > max) {
        return { valid: false, error: `${fieldName} non può superare ${max} caratteri` };
    }
    return { valid: true };
}
/**
 * Validate weight (kg)
 */
export function validateWeight(weight) {
    return validateQuantity(weight, 20, 300);
}
/**
 * Validate body fat percentage
 */
export function validateBodyFat(bodyFat) {
    return validateQuantity(bodyFat, 3, 60);
}
/**
 * Validate circumference measurement (cm)
 */
export function validateCircumference(circumference) {
    return validateQuantity(circumference, 10, 200);
}
/**
 * Validate reps count
 */
export function validateReps(reps) {
    return validateQuantity(reps, 1, 100);
}
/**
 * Validate weight for exercise (kg)
 */
export function validateExerciseWeight(weight) {
    return validateQuantity(weight, 0, 500);
}
/**
 * Validate rest time (seconds)
 */
export function validateRestTime(seconds) {
    return validateQuantity(seconds, 0, 600);
}
/**
 * Sanitize string (remove HTML, trim)
 */
export function sanitizeString(value) {
    return value.replace(/<[^>]*>/g, '').trim();
}
/**
 * Validate and sanitize notes
 */
export function validateNotes(notes, maxLength = 500) {
    const sanitized = sanitizeString(notes);
    if (sanitized.length > maxLength) {
        return { valid: false, error: `Le note non possono superare ${maxLength} caratteri` };
    }
    return { valid: true };
}
