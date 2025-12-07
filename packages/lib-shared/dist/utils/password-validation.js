/**
 * Password Validation Utilities
 *
 * Utility riusabile per validazione password con policy di sicurezza
 */
/**
 * Requisiti password per amministratori
 */
export const ADMIN_PASSWORD_REQUIREMENTS = {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
};
/**
 * Valida una password secondo i requisiti specificati
 */
export function validatePassword(password, requirements = ADMIN_PASSWORD_REQUIREMENTS) {
    // Controllo lunghezza minima
    if (password.length < requirements.minLength) {
        return {
            valid: false,
            error: `La password deve contenere almeno ${requirements.minLength} caratteri`,
        };
    }
    // Controllo maiuscole
    if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
        return {
            valid: false,
            error: 'La password deve contenere almeno una lettera maiuscola',
        };
    }
    // Controllo minuscole
    if (requirements.requireLowercase && !/[a-z]/.test(password)) {
        return {
            valid: false,
            error: 'La password deve contenere almeno una lettera minuscola',
        };
    }
    // Controllo numeri
    if (requirements.requireNumbers && !/\d/.test(password)) {
        return {
            valid: false,
            error: 'La password deve contenere almeno un numero',
        };
    }
    // Controllo caratteri speciali
    if (requirements.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return {
            valid: false,
            error: 'La password deve contenere almeno un carattere speciale (!@#$%^&*...)',
        };
    }
    return { valid: true };
}
/**
 * Genera un messaggio descrittivo dei requisiti password
 */
export function getPasswordRequirementsMessage(requirements = ADMIN_PASSWORD_REQUIREMENTS) {
    const parts = [];
    parts.push(`almeno ${requirements.minLength} caratteri`);
    if (requirements.requireUppercase)
        parts.push('una maiuscola');
    if (requirements.requireLowercase)
        parts.push('una minuscola');
    if (requirements.requireNumbers)
        parts.push('un numero');
    if (requirements.requireSpecialChars)
        parts.push('un carattere speciale');
    return `La password deve contenere ${parts.join(', ')}`;
}
