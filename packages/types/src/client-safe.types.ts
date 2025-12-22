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

// ============================================================================
// USER & AUTH ENUMS
// ============================================================================

export const UserRole = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  COACH: 'COACH',
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const UserStatus = {
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  DELETED: 'DELETED',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const Sex = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER',
} as const;
export type Sex = (typeof Sex)[keyof typeof Sex];

// ============================================================================
// WORKOUT ENUMS
// ============================================================================

export const DifficultyLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED',
} as const;
export type DifficultyLevel = (typeof DifficultyLevel)[keyof typeof DifficultyLevel];

export const WorkoutStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type WorkoutStatus = (typeof WorkoutStatus)[keyof typeof WorkoutStatus];

export const WorkoutGoal = {
  STRENGTH: 'STRENGTH',
  HYPERTROPHY: 'HYPERTROPHY',
  ENDURANCE: 'ENDURANCE',
  MOBILITY: 'MOBILITY',
  GENERAL_FITNESS: 'GENERAL_FITNESS',
} as const;
export type WorkoutGoal = (typeof WorkoutGoal)[keyof typeof WorkoutGoal];

export const WorkoutTemplateType = {
  exercise: 'exercise',
  day: 'day',
  week: 'week',
} as const;
export type WorkoutTemplateType = (typeof WorkoutTemplateType)[keyof typeof WorkoutTemplateType];

// ============================================================================
// NUTRITION ENUMS
// ============================================================================

export const ActivityLevel = {
  SEDENTARY: 'SEDENTARY',
  LIGHT: 'LIGHT',
  MODERATE: 'MODERATE',
  ACTIVE: 'ACTIVE',
  VERY_ACTIVE: 'VERY_ACTIVE',
} as const;
export type ActivityLevel = (typeof ActivityLevel)[keyof typeof ActivityLevel];

export const WeightUnit = {
  KG: 'KG',
  LBS: 'LBS',
} as const;
export type WeightUnit = (typeof WeightUnit)[keyof typeof WeightUnit];

export const NutritionStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type NutritionStatus = (typeof NutritionStatus)[keyof typeof NutritionStatus];

export const TemplateType = {
  meal: 'meal',
  day: 'day',
  week: 'week',
} as const;
export type TemplateType = (typeof TemplateType)[keyof typeof TemplateType];

export const DietType = {
  OMNIVORE: 'OMNIVORE',
  VEGETARIAN: 'VEGETARIAN',
  VEGAN: 'VEGAN',
  PESCATARIAN: 'PESCATARIAN',
  KETO: 'KETO',
} as const;
export type DietType = (typeof DietType)[keyof typeof DietType];

// ============================================================================
// EXERCISE ENUMS
// ============================================================================

export const ExerciseApprovalStatus = {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type ExerciseApprovalStatus =
  (typeof ExerciseApprovalStatus)[keyof typeof ExerciseApprovalStatus];

export const ExerciseRelationType = {
  ALTERNATIVE: 'ALTERNATIVE',
  COMPLEMENTARY: 'COMPLEMENTARY',
  PROGRESSION: 'PROGRESSION',
} as const;
export type ExerciseRelationType = (typeof ExerciseRelationType)[keyof typeof ExerciseRelationType];

export const MuscleRole = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
} as const;
export type MuscleRole = (typeof MuscleRole)[keyof typeof MuscleRole];

// ============================================================================
// PAYMENT & SUBSCRIPTION ENUMS
// ============================================================================

export const SubscriptionPlan = {
  PLUS: 'PLUS',
  PRO: 'PRO',
} as const;
export type SubscriptionPlan = (typeof SubscriptionPlan)[keyof typeof SubscriptionPlan];

export const SubscriptionStatus = {
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  PAST_DUE: 'PAST_DUE',
} as const;
export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus];

export const PaymentStatus = {
  PENDING: 'PENDING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED',
} as const;
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PaymentType = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  CREDITS: 'CREDITS',
  MARKETPLACE: 'MARKETPLACE',
} as const;
export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];

export const TransactionType = {
  PURCHASE: 'PURCHASE',
  CONSUMPTION: 'CONSUMPTION',
  REFUND: 'REFUND',
  ADMIN_ADJUSTMENT: 'ADMIN_ADJUSTMENT',
  SUBSCRIPTION_RENEWAL: 'SUBSCRIPTION_RENEWAL',
  PROMOTION: 'PROMOTION',
} as const;
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];

// ============================================================================
// AI CONFIGURATION ENUMS
// ============================================================================

export const AIProvider = {
  GOOGLE: 'GOOGLE',
  ANTHROPIC: 'ANTHROPIC',
  OPENAI: 'OPENAI',
  XAI: 'XAI',
  OPENROUTER: 'OPENROUTER',
  MINIMAX: 'MINIMAX',
} as const;
export type AIProvider = (typeof AIProvider)[keyof typeof AIProvider];

export const OperationType = {
  GENERAL_CHAT: 'GENERAL_CHAT',
  VISION_ANALYSIS: 'VISION_ANALYSIS',
  FOOD_LABEL_ANALYSIS: 'FOOD_LABEL_ANALYSIS',
  MEAL_SEGMENTATION: 'MEAL_SEGMENTATION',
  PLAN_GENERATION: 'PLAN_GENERATION',
  PLAN_MODIFICATION: 'PLAN_MODIFICATION',
  PLAN_RECALCULATION: 'PLAN_RECALCULATION',
  EXERCISE_GENERATION: 'EXERCISE_GENERATION',
  EXERCISE_AUTOCOMPLETE: 'EXERCISE_AUTOCOMPLETE',
  ANALYTICS_INSIGHTS: 'ANALYTICS_INSIGHTS',
  PROGRESS_ANALYSIS: 'PROGRESS_ANALYSIS',
  COMPLEXITY_EVALUATION: 'COMPLEXITY_EVALUATION',
  CHAT_GENERATION: 'CHAT_GENERATION',
  NUTRITION_GENERATION: 'NUTRITION_GENERATION',
  WORKOUT_GENERATION: 'WORKOUT_GENERATION',
  ONEAGENDA_GENERATION: 'ONEAGENDA_GENERATION',
} as const;
export type OperationType = (typeof OperationType)[keyof typeof OperationType];

// ============================================================================
// AFFILIATE & REWARDS ENUMS
// ============================================================================

export const AffiliateRewardType = {
  REGISTRATION_CREDIT: 'REGISTRATION_CREDIT',
  SUBSCRIPTION_COMMISSION: 'SUBSCRIPTION_COMMISSION',
  BONUS: 'BONUS',
} as const;
export type AffiliateRewardType = (typeof AffiliateRewardType)[keyof typeof AffiliateRewardType];

export const AffiliateRewardStatus = {
  PENDING: 'PENDING',
  CLEARED: 'CLEARED',
  CANCELLED: 'CANCELLED',
} as const;
export type AffiliateRewardStatus =
  (typeof AffiliateRewardStatus)[keyof typeof AffiliateRewardStatus];

export const ReferralAttributionStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
} as const;
export type ReferralAttributionStatus =
  (typeof ReferralAttributionStatus)[keyof typeof ReferralAttributionStatus];

// ============================================================================
// POLICY ENUMS
// ============================================================================

export const PolicyType = {
  PRIVACY: 'PRIVACY',
  TERMS: 'TERMS',
  GDPR: 'GDPR',
  CONTENT: 'CONTENT',
} as const;
export type PolicyType = (typeof PolicyType)[keyof typeof PolicyType];

export const PolicyStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
} as const;
export type PolicyStatus = (typeof PolicyStatus)[keyof typeof PolicyStatus];

// ============================================================================
// PLANNING ENUMS
// ============================================================================

export const PlanningStatus = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  PAUSED: 'PAUSED',
} as const;
export type PlanningStatus = (typeof PlanningStatus)[keyof typeof PlanningStatus];

export const PlanningAgentType = {
  WORKOUT: 'WORKOUT',
  NUTRITION: 'NUTRITION',
} as const;
export type PlanningAgentType = (typeof PlanningAgentType)[keyof typeof PlanningAgentType];

export const CalendarPlanType = {
  NUTRITION: 'NUTRITION',
  WORKOUT: 'WORKOUT',
} as const;
export type CalendarPlanType = (typeof CalendarPlanType)[keyof typeof CalendarPlanType];

// ============================================================================
// MARKETPLACE & COACH ENUMS
// ============================================================================

export const CoachVerificationStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type CoachVerificationStatus =
  (typeof CoachVerificationStatus)[keyof typeof CoachVerificationStatus];

export const VettingStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;
export type VettingStatus = (typeof VettingStatus)[keyof typeof VettingStatus];

export const MarketplacePlanType = {
  WORKOUT: 'WORKOUT',
  NUTRITION: 'NUTRITION',
} as const;
export type MarketplacePlanType = (typeof MarketplacePlanType)[keyof typeof MarketplacePlanType];

export const PurchaseStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  REFUNDED: 'REFUNDED',
  FAILED: 'FAILED',
} as const;
export type PurchaseStatus = (typeof PurchaseStatus)[keyof typeof PurchaseStatus];

// ============================================================================
// PROMOTION ENUMS
// ============================================================================

export const PromotionType = {
  STRIPE_COUPON: 'STRIPE_COUPON',
  BONUS_CREDITS: 'BONUS_CREDITS',
} as const;
export type PromotionType = (typeof PromotionType)[keyof typeof PromotionType];

export const DiscountType = {
  PERCENTAGE: 'PERCENTAGE',
  FIXED_AMOUNT: 'FIXED_AMOUNT',
} as const;
export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];

export const ApiKeyStatus = {
  ACTIVE: 'ACTIVE',
  REVOKED: 'REVOKED',
  EXPIRED: 'EXPIRED',
} as const;
export type ApiKeyStatus = (typeof ApiKeyStatus)[keyof typeof ApiKeyStatus];

// ============================================================================
// AGENT ENUMS
// ============================================================================

export const AgentRole = {
  COORDINATOR: 'coordinator',
  COPILOT: 'copilot',
  CALORIE_CALCULATION: 'calorie_calculation',
  MEAL_PLANNING: 'meal_planning',
  FOOD_SELECTION: 'food_selection',
  RECIPE_GENERATION: 'recipe_generation',
  DAY_GENERATION: 'day_generation',
  VALIDATION: 'validation',
  PERSONALIZATION: 'personalization',
  WORKOUT_PLANNING: 'workout_planning',
  WORKOUT_DAY_GENERATION: 'workout_day_generation',
  EXERCISE_SELECTION: 'exercise_selection',
  EXERCISE_GENERATION: 'exercise_generation',
  FOOD_GENERATION: 'food_generation',
  PROGRESSION: 'progression',
  ANALYTICS: 'analytics',
  ONEAGENDA: 'oneagenda',
  MEAL_GENERATION: 'meal_generation',
} as const;
export type AgentRole = (typeof AgentRole)[keyof typeof AgentRole];
