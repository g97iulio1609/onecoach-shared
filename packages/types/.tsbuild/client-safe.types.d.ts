/**
 * Client-Safe Types
 *
 * Const objects and types that mirror Prisma enums without requiring @prisma/client.
 * These are safe to use in client components and do not trigger bundler warnings.
 *
 * Each enum has both a const object (for runtime values) and a type (for TypeScript).
 * This ensures compatibility with both runtime code and type checking.
 *
 * IMPORTANT: Keep these in sync with the Prisma schema enums.
 */
export declare const UserRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly SUPER_ADMIN: "SUPER_ADMIN";
    readonly COACH: "COACH";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly SUSPENDED: "SUSPENDED";
    readonly DELETED: "DELETED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const Sex: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
    readonly OTHER: "OTHER";
};
export type Sex = (typeof Sex)[keyof typeof Sex];
export declare const DifficultyLevel: {
    readonly BEGINNER: "BEGINNER";
    readonly INTERMEDIATE: "INTERMEDIATE";
    readonly ADVANCED: "ADVANCED";
};
export type DifficultyLevel = (typeof DifficultyLevel)[keyof typeof DifficultyLevel];
export declare const WorkoutStatus: {
    readonly DRAFT: "DRAFT";
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly ARCHIVED: "ARCHIVED";
};
export type WorkoutStatus = (typeof WorkoutStatus)[keyof typeof WorkoutStatus];
export declare const WorkoutGoal: {
    readonly STRENGTH: "STRENGTH";
    readonly HYPERTROPHY: "HYPERTROPHY";
    readonly ENDURANCE: "ENDURANCE";
    readonly MOBILITY: "MOBILITY";
    readonly GENERAL_FITNESS: "GENERAL_FITNESS";
};
export type WorkoutGoal = (typeof WorkoutGoal)[keyof typeof WorkoutGoal];
export declare const WorkoutTemplateType: {
    readonly exercise: "exercise";
    readonly day: "day";
    readonly week: "week";
};
export type WorkoutTemplateType = (typeof WorkoutTemplateType)[keyof typeof WorkoutTemplateType];
export declare const ActivityLevel: {
    readonly SEDENTARY: "SEDENTARY";
    readonly LIGHT: "LIGHT";
    readonly MODERATE: "MODERATE";
    readonly ACTIVE: "ACTIVE";
    readonly VERY_ACTIVE: "VERY_ACTIVE";
};
export type ActivityLevel = (typeof ActivityLevel)[keyof typeof ActivityLevel];
export declare const WeightUnit: {
    readonly KG: "KG";
    readonly LBS: "LBS";
};
export type WeightUnit = (typeof WeightUnit)[keyof typeof WeightUnit];
export declare const NutritionStatus: {
    readonly DRAFT: "DRAFT";
    readonly ACTIVE: "ACTIVE";
    readonly COMPLETED: "COMPLETED";
    readonly ARCHIVED: "ARCHIVED";
};
export type NutritionStatus = (typeof NutritionStatus)[keyof typeof NutritionStatus];
export declare const TemplateType: {
    readonly meal: "meal";
    readonly day: "day";
    readonly week: "week";
};
export type TemplateType = (typeof TemplateType)[keyof typeof TemplateType];
export declare const DietType: {
    readonly OMNIVORE: "OMNIVORE";
    readonly VEGETARIAN: "VEGETARIAN";
    readonly VEGAN: "VEGAN";
    readonly PESCATARIAN: "PESCATARIAN";
    readonly KETO: "KETO";
};
export type DietType = (typeof DietType)[keyof typeof DietType];
export declare const ExerciseApprovalStatus: {
    readonly DRAFT: "DRAFT";
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type ExerciseApprovalStatus = (typeof ExerciseApprovalStatus)[keyof typeof ExerciseApprovalStatus];
export declare const ExerciseRelationType: {
    readonly ALTERNATIVE: "ALTERNATIVE";
    readonly COMPLEMENTARY: "COMPLEMENTARY";
    readonly PROGRESSION: "PROGRESSION";
};
export type ExerciseRelationType = (typeof ExerciseRelationType)[keyof typeof ExerciseRelationType];
export declare const MuscleRole: {
    readonly PRIMARY: "PRIMARY";
    readonly SECONDARY: "SECONDARY";
};
export type MuscleRole = (typeof MuscleRole)[keyof typeof MuscleRole];
export declare const SubscriptionPlan: {
    readonly PLUS: "PLUS";
    readonly PRO: "PRO";
};
export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];
export declare const SubscriptionStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly CANCELLED: "CANCELLED";
    readonly EXPIRED: "EXPIRED";
    readonly PAST_DUE: "PAST_DUE";
};
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly SUCCEEDED: "SUCCEEDED";
    readonly FAILED: "FAILED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const PaymentType: {
    readonly SUBSCRIPTION: "SUBSCRIPTION";
    readonly CREDITS: "CREDITS";
    readonly MARKETPLACE: "MARKETPLACE";
};
export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];
export declare const TransactionType: {
    readonly PURCHASE: "PURCHASE";
    readonly CONSUMPTION: "CONSUMPTION";
    readonly REFUND: "REFUND";
    readonly ADMIN_ADJUSTMENT: "ADMIN_ADJUSTMENT";
    readonly SUBSCRIPTION_RENEWAL: "SUBSCRIPTION_RENEWAL";
    readonly PROMOTION: "PROMOTION";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const AIProvider: {
    readonly GOOGLE: "GOOGLE";
    readonly ANTHROPIC: "ANTHROPIC";
    readonly OPENAI: "OPENAI";
    readonly XAI: "XAI";
    readonly OPENROUTER: "OPENROUTER";
    readonly MINIMAX: "MINIMAX";
};
export type AIProvider = (typeof AIProvider)[keyof typeof AIProvider];
export declare const OperationType: {
    readonly GENERAL_CHAT: "GENERAL_CHAT";
    readonly VISION_ANALYSIS: "VISION_ANALYSIS";
    readonly FOOD_LABEL_ANALYSIS: "FOOD_LABEL_ANALYSIS";
    readonly MEAL_SEGMENTATION: "MEAL_SEGMENTATION";
    readonly PLAN_GENERATION: "PLAN_GENERATION";
    readonly PLAN_MODIFICATION: "PLAN_MODIFICATION";
    readonly PLAN_RECALCULATION: "PLAN_RECALCULATION";
    readonly EXERCISE_GENERATION: "EXERCISE_GENERATION";
    readonly EXERCISE_AUTOCOMPLETE: "EXERCISE_AUTOCOMPLETE";
    readonly ANALYTICS_INSIGHTS: "ANALYTICS_INSIGHTS";
    readonly PROGRESS_ANALYSIS: "PROGRESS_ANALYSIS";
    readonly COMPLEXITY_EVALUATION: "COMPLEXITY_EVALUATION";
    readonly CHAT_GENERATION: "CHAT_GENERATION";
    readonly NUTRITION_GENERATION: "NUTRITION_GENERATION";
    readonly WORKOUT_GENERATION: "WORKOUT_GENERATION";
    readonly ONEAGENDA_GENERATION: "ONEAGENDA_GENERATION";
};
export type OperationType = (typeof OperationType)[keyof typeof OperationType];
export declare const AffiliateRewardType: {
    readonly REGISTRATION_CREDIT: "REGISTRATION_CREDIT";
    readonly SUBSCRIPTION_COMMISSION: "SUBSCRIPTION_COMMISSION";
    readonly BONUS: "BONUS";
};
export type AffiliateRewardType = (typeof AffiliateRewardType)[keyof typeof AffiliateRewardType];
export declare const AffiliateRewardStatus: {
    readonly PENDING: "PENDING";
    readonly CLEARED: "CLEARED";
    readonly CANCELLED: "CANCELLED";
};
export type AffiliateRewardStatus = (typeof AffiliateRewardStatus)[keyof typeof AffiliateRewardStatus];
export declare const ReferralAttributionStatus: {
    readonly PENDING: "PENDING";
    readonly ACTIVE: "ACTIVE";
    readonly CANCELLED: "CANCELLED";
};
export type ReferralAttributionStatus = (typeof ReferralAttributionStatus)[keyof typeof ReferralAttributionStatus];
export declare const PolicyType: {
    readonly PRIVACY: "PRIVACY";
    readonly TERMS: "TERMS";
    readonly GDPR: "GDPR";
    readonly CONTENT: "CONTENT";
};
export type PolicyType = (typeof PolicyType)[keyof typeof PolicyType];
export declare const PolicyStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type PolicyStatus = (typeof PolicyStatus)[keyof typeof PolicyStatus];
export declare const PlanningStatus: {
    readonly PENDING: "PENDING";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly CANCELLED: "CANCELLED";
    readonly PAUSED: "PAUSED";
};
export type PlanningStatus = (typeof PlanningStatus)[keyof typeof PlanningStatus];
export declare const PlanningAgentType: {
    readonly WORKOUT: "WORKOUT";
    readonly NUTRITION: "NUTRITION";
};
export type PlanningAgentType = (typeof PlanningAgentType)[keyof typeof PlanningAgentType];
export declare const CalendarPlanType: {
    readonly NUTRITION: "NUTRITION";
    readonly WORKOUT: "WORKOUT";
};
export type CalendarPlanType = (typeof CalendarPlanType)[keyof typeof CalendarPlanType];
export declare const CoachVerificationStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type CoachVerificationStatus = (typeof CoachVerificationStatus)[keyof typeof CoachVerificationStatus];
export declare const VettingStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type VettingStatus = (typeof VettingStatus)[keyof typeof VettingStatus];
export declare const MarketplacePlanType: {
    readonly WORKOUT: "WORKOUT";
    readonly NUTRITION: "NUTRITION";
};
export type MarketplacePlanType = (typeof MarketplacePlanType)[keyof typeof MarketplacePlanType];
export declare const PurchaseStatus: {
    readonly PENDING: "PENDING";
    readonly COMPLETED: "COMPLETED";
    readonly REFUNDED: "REFUNDED";
    readonly FAILED: "FAILED";
};
export type PurchaseStatus = (typeof PurchaseStatus)[keyof typeof PurchaseStatus];
export declare const PromotionType: {
    readonly STRIPE_COUPON: "STRIPE_COUPON";
    readonly BONUS_CREDITS: "BONUS_CREDITS";
};
export type PromotionType = (typeof PromotionType)[keyof typeof PromotionType];
export declare const DiscountType: {
    readonly PERCENTAGE: "PERCENTAGE";
    readonly FIXED_AMOUNT: "FIXED_AMOUNT";
};
export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];
export declare const ApiKeyStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly REVOKED: "REVOKED";
    readonly EXPIRED: "EXPIRED";
};
export type ApiKeyStatus = (typeof ApiKeyStatus)[keyof typeof ApiKeyStatus];
export declare const AgentRole: {
    readonly COORDINATOR: "coordinator";
    readonly COPILOT: "copilot";
    readonly CALORIE_CALCULATION: "calorie_calculation";
    readonly MEAL_PLANNING: "meal_planning";
    readonly FOOD_SELECTION: "food_selection";
    readonly RECIPE_GENERATION: "recipe_generation";
    readonly DAY_GENERATION: "day_generation";
    readonly VALIDATION: "validation";
    readonly PERSONALIZATION: "personalization";
    readonly WORKOUT_PLANNING: "workout_planning";
    readonly WORKOUT_DAY_GENERATION: "workout_day_generation";
    readonly EXERCISE_SELECTION: "exercise_selection";
    readonly EXERCISE_GENERATION: "exercise_generation";
    readonly FOOD_GENERATION: "food_generation";
    readonly PROGRESSION: "progression";
    readonly ANALYTICS: "analytics";
    readonly ONEAGENDA: "oneagenda";
    readonly MEAL_GENERATION: "meal_generation";
};
export type AgentRole = (typeof AgentRole)[keyof typeof AgentRole];
