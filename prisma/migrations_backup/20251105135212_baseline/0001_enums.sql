-- =============================================================================
-- onecoach Database - Enum Definitions
-- =============================================================================
-- Module 0001: All Enum Types
-- Following KISS, SOLID, and DRY principles
-- Enums grouped by domain for better organization
-- =============================================================================

-- User and Authentication Enums
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'COACH');
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- Subscription and Payment Enums
CREATE TYPE "SubscriptionPlan" AS ENUM ('PLUS', 'PRO');
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PAST_DUE');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED');
CREATE TYPE "PaymentType" AS ENUM ('SUBSCRIPTION', 'CREDITS');
CREATE TYPE "TransactionType" AS ENUM ('PURCHASE', 'CONSUMPTION', 'REFUND', 'ADMIN_ADJUSTMENT', 'SUBSCRIPTION_RENEWAL');

-- Fitness and Workout Enums
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');
CREATE TYPE "WorkoutGoal" AS ENUM ('STRENGTH', 'HYPERTROPHY', 'ENDURANCE', 'MOBILITY', 'GENERAL_FITNESS');
CREATE TYPE "WorkoutStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');
CREATE TYPE "WorkoutTemplateType" AS ENUM ('exercise', 'day', 'week');

-- Exercise and Body Composition Enums
CREATE TYPE "ExerciseApprovalStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "ExerciseRelationType" AS ENUM ('ALTERNATIVE', 'COMPLEMENTARY', 'PROGRESSION');
CREATE TYPE "MuscleRole" AS ENUM ('PRIMARY', 'SECONDARY');

-- Nutrition Enums
CREATE TYPE "NutritionStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');
CREATE TYPE "TemplateType" AS ENUM ('meal', 'day', 'week');

-- AI and Operations Enums
CREATE TYPE "AIModel" AS ENUM ('HAIKU', 'SONNET');
CREATE TYPE "AIProvider" AS ENUM ('GOOGLE', 'ANTHROPIC', 'OPENAI', 'XAI', 'OPENROUTER');
CREATE TYPE "OperationType" AS ENUM ('WORKOUT_GENERATION', 'NUTRITION_GENERATION', 'WORKOUT_EDIT', 'NUTRITION_EDIT', 'GENERAL_CHAT');

-- Affiliate System Enums
CREATE TYPE "AffiliateRewardType" AS ENUM ('REGISTRATION_CREDIT', 'SUBSCRIPTION_COMMISSION', 'BONUS');
CREATE TYPE "AffiliateRewardStatus" AS ENUM ('PENDING', 'CLEARED', 'CANCELLED');
CREATE TYPE "ReferralAttributionStatus" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED');

-- Coach and Marketplace Enums
CREATE TYPE "CoachVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "VettingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE "MarketplacePlanType" AS ENUM ('WORKOUT', 'NUTRITION');
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED', 'FAILED');

-- Policy and Legal Enums
CREATE TYPE "PolicyType" AS ENUM ('PRIVACY', 'TERMS', 'GDPR', 'CONTENT');
CREATE TYPE "PolicyStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- Planning System Enums
CREATE TYPE "PlanningStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED', 'PAUSED');
CREATE TYPE "PlanningAgentType" AS ENUM ('WORKOUT', 'NUTRITION');
CREATE TYPE "CalendarPlanType" AS ENUM ('NUTRITION', 'WORKOUT');

-- Units and Measurements
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LBS');
