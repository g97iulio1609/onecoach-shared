/**
 * Prisma Helper Types
 *
 * Utility types for Prisma query results
 * Refactored to work independently of generated Prisma client
 */
import type { UserRole, UserStatus, SubscriptionPlan, OperationType } from './database.types';
/**
 * User with counts for admin dashboard
 */
export interface UserWithCounts {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
    status: UserStatus;
    credits: number;
    createdAt: Date;
    _count: {
        workout_programs: number;
        nutrition_plans: number;
        subscriptions: number;
    };
}
/**
 * Subscription with user info
 */
export interface SubscriptionWithUser {
    id: string;
    userId: string;
    plan: SubscriptionPlan;
    status: string;
    stripeSubscriptionId: string | null;
    stripeCustomerId: string | null;
    stripePriceId: string | null;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    createdAt: Date;
    updatedAt: Date;
    users: {
        id: string;
        email: string;
        name: string | null;
    };
}
/**
 * Payment aggregate result
 */
export interface PaymentAggregateResult {
    _sum: {
        amount: number | null;
    } | null;
}
/**
 * Credit transaction aggregate result
 */
export interface CreditTransactionAggregateResult {
    _sum: {
        amount: number | null;
    } | null;
}
/**
 * Subscription group by result
 */
export interface SubscriptionGroupByResult {
    plan: string;
    _count: {
        plan: number;
    };
}
/**
 * Payment group by result
 */
export interface PaymentGroupByResult {
    createdAt: Date;
    _sum: {
        amount: number | null;
    } | null;
}
/**
 * Credit transaction group by result
 */
export interface CreditTransactionGroupByResult {
    description: string;
    _sum: {
        amount: number | null;
    } | null;
    _count: number;
}
/**
 * User group by result
 */
export interface UserGroupByResult {
    createdAt: Date;
    _count: number;
}
/**
 * User with counts for analytics
 */
export interface UserWithAnalyticsCounts {
    id: string;
    email: string;
    name: string | null;
    _count: {
        workout_programs: number;
        nutrition_plans: number;
        credit_transactions: number;
    };
}
/**
 * AI Operation Config type
 */
export interface AIOperationConfig {
    id: string;
    operationType: OperationType;
    model: string;
    creditCost: number;
    maxTokens: number;
    thinkingBudget: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    recalculateCreditsCost: number | null;
}
