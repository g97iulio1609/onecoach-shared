/**
 * Stripe Types
 *
 * Type definitions per integrazione Stripe
 */
import type { SubscriptionPlan } from './database.types';
/**
 * Payment Intent Request
 */
export interface PaymentIntentRequest {
    type: 'credits' | 'marketplace';
    packId?: string;
    marketplacePlanId?: string;
    promoCode?: string;
    referralCode?: string;
}
/**
 * Payment Intent Response
 */
export interface PaymentIntentResponse {
    clientSecret: string;
    paymentIntentId: string;
}
/**
 * Payment Confirm Request
 */
export interface PaymentConfirmRequest {
    paymentIntentId: string;
    paymentMethodId: string;
}
/**
 * Payment Confirm Response
 */
export interface PaymentConfirmResponse {
    success?: boolean;
    requiresAction?: boolean;
    clientSecret?: string;
    status?: string;
    paymentIntentId: string;
}
/**
 * Setup Intent Request
 */
export interface SetupIntentRequest {
    plan: SubscriptionPlan;
    promoCode?: string;
    referralCode?: string;
}
/**
 * Setup Intent Response
 */
export interface SetupIntentResponse {
    clientSecret: string;
    setupIntentId: string;
}
/**
 * Subscription Create Request
 */
export interface SubscriptionCreateRequest {
    setupIntentId: string;
    plan: SubscriptionPlan;
    promoCode?: string;
    referralCode?: string;
}
/**
 * Subscription Create Response
 */
export interface SubscriptionCreateResponse {
    success?: boolean;
    requiresAction?: boolean;
    clientSecret?: string;
    subscriptionId: string;
    status?: string;
}
/**
 * Stripe Webhook Event
 */
export interface StripeWebhookEvent {
    id: string;
    type: string;
    data: {
        object: unknown;
    };
}
/**
 * Plan Pricing Info
 */
export interface PlanPricing {
    plan: SubscriptionPlan;
    name: string;
    price: number;
    currency: string;
    interval: 'month' | 'year';
    credits: number | 'unlimited';
    features: string[];
    stripePriceId: string;
}
/**
 * Credit Pack Info
 */
export interface CreditPackOption {
    id: string;
    credits: number;
    price: number;
    currency: string;
    popular?: boolean;
    savings?: string;
}
export interface CreditPackPricing extends CreditPackOption {
    stripePriceId: string;
}
/**
 * Customer Portal Request
 */
export interface CustomerPortalRequest {
    returnUrl: string;
}
/**
 * Customer Portal Response
 */
export interface CustomerPortalResponse {
    url: string;
}
/**
 * Stripe Config
 */
export interface StripeConfig {
    publishableKey: string;
    plans: {
        plus: PlanPricing;
        pro: PlanPricing;
    };
    creditPacks: CreditPackPricing[];
}
