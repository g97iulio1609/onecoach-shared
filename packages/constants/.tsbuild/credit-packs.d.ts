/**
 * Credit pack option (for UI display)
 */
export interface CreditPackOption {
    id: string;
    credits: number;
    price: number;
    currency: string;
    popular?: boolean;
    savings?: string;
}
/**
 * Credit pack pricing (with Stripe price ID)
 */
export interface CreditPackPricing extends CreditPackOption {
    stripePriceId: string;
}
/**
 * Catalogo credito per utilizzo lato client (UI)
 */
export declare const CREDIT_PACK_OPTIONS: CreditPackOption[];
/**
 * Risolve i pacchetti crediti con gli Stripe price ID associati.
 * Da utilizzare esclusivamente lato server.
 */
export declare function getCreditPackPricing(): CreditPackPricing[];
/**
 * Recupera rapidamente il price ID di Stripe per un dato numero di crediti.
 */
export declare function getCreditPackPriceId(credits: number): string | null;
/**
 * Trova la definizione del pack partendo dai crediti.
 */
export declare function findCreditPackOption(credits: number): CreditPackOption | undefined;
/**
 * Mappa un Stripe price ID al numero di crediti corrispondente.
 * @param priceId Stripe price ID
 * @returns Numero di crediti o null se non trovato
 */
export declare function getCreditsFromPriceId(priceId: string): number | null;
