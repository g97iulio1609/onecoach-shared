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
};
export const UserStatus = {
    ACTIVE: 'ACTIVE',
    SUSPENDED: 'SUSPENDED',
    DELETED: 'DELETED',
};
export const Sex = {
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    OTHER: 'OTHER',
};
// ============================================================================
// WORKOUT ENUMS
// ============================================================================
export const DifficultyLevel = {
    BEGINNER: 'BEGINNER',
    INTERMEDIATE: 'INTERMEDIATE',
    ADVANCED: 'ADVANCED',
};
export const WorkoutStatus = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    ARCHIVED: 'ARCHIVED',
};
export const WorkoutGoal = {
    STRENGTH: 'STRENGTH',
    HYPERTROPHY: 'HYPERTROPHY',
    ENDURANCE: 'ENDURANCE',
    MOBILITY: 'MOBILITY',
    GENERAL_FITNESS: 'GENERAL_FITNESS',
};
export const WorkoutTemplateType = {
    exercise: 'exercise',
    day: 'day',
    week: 'week',
};
// ============================================================================
// NUTRITION ENUMS
// ============================================================================
export const ActivityLevel = {
    SEDENTARY: 'SEDENTARY',
    LIGHT: 'LIGHT',
    MODERATE: 'MODERATE',
    ACTIVE: 'ACTIVE',
    VERY_ACTIVE: 'VERY_ACTIVE',
};
export const WeightUnit = {
    KG: 'KG',
    LBS: 'LBS',
};
export const NutritionStatus = {
    DRAFT: 'DRAFT',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    ARCHIVED: 'ARCHIVED',
};
export const TemplateType = {
    meal: 'meal',
    day: 'day',
    week: 'week',
};
export const DietType = {
    OMNIVORE: 'OMNIVORE',
    VEGETARIAN: 'VEGETARIAN',
    VEGAN: 'VEGAN',
    PESCATARIAN: 'PESCATARIAN',
    KETO: 'KETO',
};
// ============================================================================
// EXERCISE ENUMS
// ============================================================================
export const ExerciseApprovalStatus = {
    DRAFT: 'DRAFT',
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
};
export const ExerciseRelationType = {
    ALTERNATIVE: 'ALTERNATIVE',
    COMPLEMENTARY: 'COMPLEMENTARY',
    PROGRESSION: 'PROGRESSION',
};
export const MuscleRole = {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY',
};
// ============================================================================
// PAYMENT & SUBSCRIPTION ENUMS
// ============================================================================
export const SubscriptionPlan = {
    PLUS: 'PLUS',
    PRO: 'PRO',
};
export const SubscriptionStatus = {
    ACTIVE: 'ACTIVE',
    CANCELLED: 'CANCELLED',
    EXPIRED: 'EXPIRED',
    PAST_DUE: 'PAST_DUE',
};
export const PaymentStatus = {
    PENDING: 'PENDING',
    SUCCEEDED: 'SUCCEEDED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
};
export const PaymentType = {
    SUBSCRIPTION: 'SUBSCRIPTION',
    CREDITS: 'CREDITS',
    MARKETPLACE: 'MARKETPLACE',
};
export const TransactionType = {
    PURCHASE: 'PURCHASE',
    CONSUMPTION: 'CONSUMPTION',
    REFUND: 'REFUND',
    ADMIN_ADJUSTMENT: 'ADMIN_ADJUSTMENT',
    SUBSCRIPTION_RENEWAL: 'SUBSCRIPTION_RENEWAL',
    PROMOTION: 'PROMOTION',
};
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
};
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
};
// ============================================================================
// AFFILIATE & REWARDS ENUMS
// ============================================================================
export const AffiliateRewardType = {
    REGISTRATION_CREDIT: 'REGISTRATION_CREDIT',
    SUBSCRIPTION_COMMISSION: 'SUBSCRIPTION_COMMISSION',
    BONUS: 'BONUS',
};
export const AffiliateRewardStatus = {
    PENDING: 'PENDING',
    CLEARED: 'CLEARED',
    CANCELLED: 'CANCELLED',
};
export const ReferralAttributionStatus = {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    CANCELLED: 'CANCELLED',
};
// ============================================================================
// POLICY ENUMS
// ============================================================================
export const PolicyType = {
    PRIVACY: 'PRIVACY',
    TERMS: 'TERMS',
    GDPR: 'GDPR',
    CONTENT: 'CONTENT',
};
export const PolicyStatus = {
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
    ARCHIVED: 'ARCHIVED',
};
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
};
export const PlanningAgentType = {
    WORKOUT: 'WORKOUT',
    NUTRITION: 'NUTRITION',
};
export const CalendarPlanType = {
    NUTRITION: 'NUTRITION',
    WORKOUT: 'WORKOUT',
};
// ============================================================================
// MARKETPLACE & COACH ENUMS
// ============================================================================
export const CoachVerificationStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
};
export const VettingStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED',
};
export const MarketplacePlanType = {
    WORKOUT: 'WORKOUT',
    NUTRITION: 'NUTRITION',
};
export const PurchaseStatus = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    REFUNDED: 'REFUNDED',
    FAILED: 'FAILED',
};
// ============================================================================
// PROMOTION ENUMS
// ============================================================================
export const PromotionType = {
    STRIPE_COUPON: 'STRIPE_COUPON',
    BONUS_CREDITS: 'BONUS_CREDITS',
};
export const DiscountType = {
    PERCENTAGE: 'PERCENTAGE',
    FIXED_AMOUNT: 'FIXED_AMOUNT',
};
export const ApiKeyStatus = {
    ACTIVE: 'ACTIVE',
    REVOKED: 'REVOKED',
    EXPIRED: 'EXPIRED',
};
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
};
