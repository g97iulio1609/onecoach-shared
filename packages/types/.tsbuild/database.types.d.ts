/**
 * Database Types
 *
 * Type definitions centralized - re-exporting Prisma enums as single source of truth
 * Following SOLID principles: types defined once, reused everywhere
 */
import type { UserRole, UserStatus, SubscriptionPlan, SubscriptionStatus, PaymentStatus, PaymentType, TransactionType, AIProvider, Sex, ActivityLevel, WeightUnit, WorkoutGoal } from '@prisma/client';
export { UserRole, UserStatus, SubscriptionPlan, SubscriptionStatus, PaymentStatus, PaymentType, TransactionType, OperationType, AIProvider, DifficultyLevel, WorkoutStatus, NutritionStatus, CalendarPlanType, Sex, ActivityLevel, WeightUnit, WorkoutGoal, DietType, AffiliateRewardType, AffiliateRewardStatus, ReferralAttributionStatus, ExerciseApprovalStatus, MuscleRole, PolicyType, PolicyStatus, PromotionType, DiscountType, MarketplacePlanType, PlanningStatus, PlanningAgentType, CoachVerificationStatus, VettingStatus, PurchaseStatus, ExerciseRelationType, WorkoutTemplateType, TemplateType, } from '@prisma/client';
export { Prisma } from '@prisma/client';
export interface User {
    id: string;
    email: string;
    name: string | null;
    password: string;
    role: UserRole;
    status: UserStatus;
    credits: number;
    stripeCustomerId: string | null;
    emailVerified: Date | null;
    image: string | null;
    createdAt: Date;
    updatedAt: Date;
    autoRecalculateMacros: boolean;
    healthLastSync: Date | null;
    healthPlatform: string | null;
}
export type SafeUser = Omit<User, 'password'>;
export interface Subscription {
    id: string;
    userId: string;
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    stripeSubscriptionId: string | null;
    stripeCustomerId: string | null;
    stripePriceId: string | null;
    currentPeriodStart: Date;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface Payment {
    id: string;
    userId: string;
    subscriptionId: string | null;
    stripePaymentId: string;
    stripePaymentIntentId: string | null;
    amount: number;
    currency: string;
    status: PaymentStatus;
    type: PaymentType;
    creditsAdded: number | null;
    metadata: Record<string, unknown> | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface CreditTransaction {
    id: string;
    userId: string;
    amount: number;
    type: TransactionType;
    description: string;
    metadata: Record<string, unknown> | null;
    balanceAfter: number;
    createdAt: Date;
}
export interface AIProviderConfig {
    id: string;
    provider: AIProvider;
    isEnabled: boolean;
    defaultModel: string | null;
    metadata: Record<string, unknown> | null;
    vercelEnvVarId: string | null;
    updatedBy: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface UserProfile {
    id: string;
    userId: string;
    age: number | null;
    sex: Sex | null;
    heightCm: number | null;
    weightKg: number | null;
    activityLevel: ActivityLevel | null;
    trainingFrequency: number | null;
    dailyCalories: number | null;
    workoutGoal: WorkoutGoal | null;
    equipment: string[];
    dietaryRestrictions: string[];
    dietaryPreferences: string[];
    healthNotes: string | null;
    createdAt: Date;
    updatedAt: Date;
    weightUnit: WeightUnit;
    workoutGoals: string[];
    nutritionGoals: string[];
}
export interface UserOneRepMax {
    id: string;
    userId: string;
    exerciseId: string;
    oneRepMax: number;
    notes: string | null;
    lastUpdated: Date;
    createdAt: Date;
    version: number;
}
export interface UserOneRepMaxVersion {
    id: string;
    maxId: string;
    userId: string;
    exerciseId: string;
    oneRepMax: number;
    notes: string | null;
    version: number;
    createdBy: string;
    createdAt: Date;
    userOneRepMaxId: string | null;
}
export interface NutritionGoal {
    id: string;
    name: string;
    slug: string;
}
export interface UserWithRelations extends SafeUser {
    subscriptions?: Subscription[];
    creditTransactions?: CreditTransaction[];
    profile?: UserProfile;
    _count?: {
        workout_programs: number;
        nutrition_plans: number;
        conversations: number;
    };
}
export interface UserOneRepMaxWithExercise extends Omit<UserOneRepMax, 'oneRepMax' | 'version'> {
    oneRepMax: number;
    version: number;
    exercise?: {
        id: string;
        slug: string;
        translations?: Array<{
            name: string;
            locale: string;
        }>;
    };
}
export interface SubscriptionWithRelations extends Subscription {
    user?: SafeUser;
    payments?: Payment[];
}
export interface CreditBalance {
    balance: number;
    lastTransaction?: CreditTransaction;
    hasUnlimitedCredits: boolean;
}
export interface DashboardMetrics {
    totalUsers: number;
    activeUsers: number;
    totalRevenue: number;
    creditsConsumed: number;
    workoutsGenerated: number;
    nutritionGenerated: number;
    newUsersThisMonth: number;
    subscriptionsByPlan: {
        plus: number;
        pro: number;
    };
}
export interface UserStatistics {
    totalWorkouts: number;
    totalNutritionPlans: number;
    totalCreditsUsed: number;
    totalCreditsRemaining: number;
    lastActivity?: Date;
    joinedDate: Date;
}
