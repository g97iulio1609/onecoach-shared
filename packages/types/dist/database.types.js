/**
 * Database Types
 *
 * Type definitions centralized - re-exporting Prisma enums as single source of truth
 * Following SOLID principles: types defined once, reused everywhere
 */
// Re-export all enums from Prisma to maintain compatibility
export { UserRole, UserStatus, SubscriptionPlan, SubscriptionStatus, PaymentStatus, PaymentType, TransactionType, OperationType, AIProvider, DifficultyLevel, WorkoutStatus, NutritionStatus, CalendarPlanType, Sex, ActivityLevel, WeightUnit, WorkoutGoal, DietType, AffiliateRewardType, AffiliateRewardStatus, ReferralAttributionStatus, ExerciseApprovalStatus, MuscleRole, PolicyType, PolicyStatus, PromotionType, DiscountType, MarketplacePlanType, PlanningStatus, PlanningAgentType, CoachVerificationStatus, VettingStatus, PurchaseStatus, ExerciseRelationType, WorkoutTemplateType, TemplateType, } from '@prisma/client';
// Re-export Prisma namespace for compatibility
export { Prisma } from '@prisma/client';
