/**
 * Subscription pricing constants and helpers
 */
export type SubscriptionPlanType = 'FREE' | 'BASIC' | 'PRO' | 'PLUS';
/**
 * Gets the Stripe Price ID for a given subscription plan from environment variables.
 */
export declare function getSubscriptionPriceId(plan: string): string | null;
