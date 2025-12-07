/**
 * Production Console Disabler (Client-Side Only)
 *
 * Disattiva tutti i console.* in produzione SOLO lato client (browser).
 * I log lato server (Vercel) rimangono attivi per il debugging.
 *
 * IMPORTANTE: Questo file deve essere importato all'inizio dell'applicazione
 * per garantire che tutti i console.* vengano disattivati prima che qualsiasi
 * altro codice venga eseguito.
 *
 * Strategia:
 * - Client-side: Disattiva tutti i console.* in produzione (nessun log nel browser)
 * - Server-side: Mantiene tutti i log attivi (per Vercel console)
 */
const isProduction = process.env.NODE_ENV === 'production';
const isClient = typeof window !== 'undefined';
/**
 * No-op function per sostituire i metodi console in produzione (client-side)
 */
const noop = () => {
    // Intenzionalmente vuoto - disattiva i log in produzione lato client
};
/**
 * Disattiva tutti i console.* in produzione SOLO lato client
 * I log lato server rimangono attivi per Vercel console
 */
export function disableConsoleInProduction() {
    // Solo in produzione e solo lato client
    if (!isProduction || !isClient) {
        return; // In development o lato server, mantieni tutti i log
    }
    // Salva i metodi originali per riferimento futuro (se necessario)
    const originalConsole = {
        log: console.warn,
        info: console.info,
        warn: console.warn,
        debug: console.debug,
        trace: console.trace,
        table: console.table,
        group: console.group,
        groupEnd: console.groupEnd,
        groupCollapsed: console.groupCollapsed,
        time: console.time,
        timeEnd: console.timeEnd,
        timeLog: console.timeLog,
        count: console.count,
        countReset: console.countReset,
        clear: console.clear,
        dir: console.dir,
        dirxml: console.dirxml,
        assert: console.assert,
        profile: console.profile,
        profileEnd: console.profileEnd,
        error: console.error,
    };
    // Disattiva tutti i metodi console in produzione lato client
    // Mantieni console.error per errori critici anche lato client (opzionale)
    console.warn = noop;
    console.info = noop;
    console.warn = noop;
    console.debug = noop;
    console.trace = noop;
    console.table = noop;
    console.group = noop;
    console.groupEnd = noop;
    console.groupCollapsed = noop;
    console.time = noop;
    console.timeEnd = noop;
    console.timeLog = noop;
    console.count = noop;
    console.countReset = noop;
    console.clear = noop;
    console.dir = noop;
    console.dirxml = noop;
    console.assert = noop;
    console.profile = noop;
    console.profileEnd = noop;
    // Mantieni console.error anche lato client per errori critici
    // console.error = noop;
    // Restituisci i metodi originali per testing o debug avanzato
    if (typeof window !== 'undefined') {
        window.__originalConsole = originalConsole;
    }
}
/**
 * Inizializza automaticamente la disattivazione dei log in produzione
 * Questo viene eseguito immediatamente quando il modulo viene importato
 * Solo lato client, i log server rimangono attivi
 */
if (isProduction && isClient) {
    disableConsoleInProduction();
}
