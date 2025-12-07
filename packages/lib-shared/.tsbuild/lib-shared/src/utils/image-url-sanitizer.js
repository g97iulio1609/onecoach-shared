/**
 * Image URL Sanitizer
 *
 * Rimuove URL non validi o non configurati (come via.placeholder.com)
 * per evitare errori con Next.js Image component
 */
/**
 * Lista di hostname configurati in next.config.mjs
 * Deve essere sincronizzata con la configurazione di Next.js
 */
const ALLOWED_HOSTNAMES = [
    '**.supabase.co', // Pattern per Supabase Storage
    'supabase.co',
    'localhost',
    '127.0.0.1',
];
/**
 * Verifica se un hostname è consentito
 * @param hostname - Hostname da verificare
 * @returns true se consentito, false altrimenti
 */
function isHostnameAllowed(hostname) {
    if (!hostname || hostname === '') {
        return false;
    }
    // Verifica pattern wildcard per Supabase
    if (hostname.endsWith('.supabase.co')) {
        return true;
    }
    // Verifica hostname esatti
    return ALLOWED_HOSTNAMES.some((allowed) => {
        if (allowed.includes('**')) {
            // Pattern wildcard: **.supabase.co
            const pattern = allowed.replace('**', '');
            return hostname.endsWith(pattern);
        }
        return hostname === allowed;
    });
}
/**
 * Sanitizza un imageUrl rimuovendo domini non configurati o non validi
 * @param imageUrl - URL dell'immagine da sanitizzare
 * @returns URL sanitizzato o null se non valido
 */
export function sanitizeImageUrl(imageUrl) {
    if (!imageUrl || typeof imageUrl !== 'string') {
        return null;
    }
    // Rimuovi spazi e trim
    const trimmed = imageUrl.trim();
    // Stringa vuota o solo spazi = nessuna immagine
    if (!trimmed || trimmed === '') {
        return null;
    }
    // Rimuovi via.placeholder.com e domini simili non configurati
    if (trimmed.includes('via.placeholder.com') ||
        trimmed.includes('placeholder.com') ||
        trimmed.includes('example.com')) {
        return null;
    }
    // Verifica che sia un URL valido e assoluto
    try {
        const url = new URL(trimmed);
        // Verifica che abbia un protocollo valido (http o https)
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
            // Blocca data:, blob:, file:, etc.
            return null;
        }
        // Verifica che l'hostname non sia vuoto
        if (!url.hostname || url.hostname === '') {
            return null;
        }
        // Verifica che l'hostname sia configurato in next.config.mjs
        if (!isHostnameAllowed(url.hostname)) {
            return null;
        }
        // Se tutte le verifiche passano, restituisci l'URL
        return trimmed;
    }
    catch (_error) {
        // Se non è un URL valido (es. URL relativo), restituisci null
        return null;
    }
}
/**
 * Verifica se un imageUrl è valido per Next.js Image component
 * @param imageUrl - URL dell'immagine da verificare
 * @returns true se valido, false altrimenti
 */
export function isValidImageUrl(imageUrl) {
    return sanitizeImageUrl(imageUrl) !== null;
}
