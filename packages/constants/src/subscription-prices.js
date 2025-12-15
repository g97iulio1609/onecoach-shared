/**
 * Subscription pricing constants and helpers
 */
const SUBSCRIPTION_PLAN_RECORDS = [
    {
        plan: 'BASIC',
        envKey: 'STRIPE_PRICE_ID_BASIC',
    },
    {
        plan: 'PRO',
        envKey: 'STRIPE_PRO_PLAN_PRICE_ID', // Aligning with apps/next usage
    },
    {
        plan: 'PLUS',
        envKey: 'STRIPE_PLUS_PLAN_PRICE_ID',
    },
];
/**
 * Gets the Stripe Price ID for a given subscription plan from environment variables.
 */
export function getSubscriptionPriceId(plan) {
    if (plan === 'FREE')
        return '';
    const record = SUBSCRIPTION_PLAN_RECORDS.find((r) => r.plan === plan);
    if (!record)
        return null;
    // Access process.env only if available (server-side)
    if (typeof process !== 'undefined' && process.env) {
        return process.env[record.envKey] ?? null;
    }
    return null;
}
