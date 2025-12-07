-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS citext;

-- CreateEnum
CREATE TYPE "AffiliateRewardType" AS ENUM ('REGISTRATION_CREDIT', 'SUBSCRIPTION_COMMISSION', 'BONUS');

-- CreateEnum
CREATE TYPE "AffiliateRewardStatus" AS ENUM ('PENDING', 'CLEARED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReferralAttributionStatus" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('meal', 'day', 'week');

-- CreateEnum
CREATE TYPE "WorkoutTemplateType" AS ENUM ('exercise', 'day', 'week');

-- CreateEnum
CREATE TYPE "AIModel" AS ENUM ('HAIKU', 'SONNET');

-- CreateEnum
CREATE TYPE "AIProvider" AS ENUM ('GOOGLE', 'ANTHROPIC', 'OPENAI', 'XAI', 'OPENROUTER');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "ExerciseApprovalStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ExerciseRelationType" AS ENUM ('ALTERNATIVE', 'COMPLEMENTARY', 'PROGRESSION');

-- CreateEnum
CREATE TYPE "MuscleRole" AS ENUM ('PRIMARY', 'SECONDARY');

-- CreateEnum
CREATE TYPE "NutritionStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('WORKOUT_GENERATION', 'NUTRITION_GENERATION', 'WORKOUT_EDIT', 'NUTRITION_EDIT', 'GENERAL_CHAT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('SUBSCRIPTION', 'CREDITS');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('PLUS', 'PRO');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PAST_DUE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PURCHASE', 'CONSUMPTION', 'REFUND', 'ADMIN_ADJUSTMENT', 'SUBSCRIPTION_RENEWAL');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'COACH');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LBS');

-- CreateEnum
CREATE TYPE "WorkoutGoal" AS ENUM ('STRENGTH', 'HYPERTROPHY', 'ENDURANCE', 'MOBILITY', 'GENERAL_FITNESS');

-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PolicyType" AS ENUM ('PRIVACY', 'TERMS', 'GDPR', 'CONTENT');

-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "PlanningStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED', 'PAUSED');

-- CreateEnum
CREATE TYPE "PlanningAgentType" AS ENUM ('WORKOUT', 'NUTRITION');

-- CreateEnum
CREATE TYPE "CalendarPlanType" AS ENUM ('NUTRITION', 'WORKOUT');

-- CreateEnum
CREATE TYPE "CoachVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VettingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "MarketplacePlanType" AS ENUM ('WORKOUT', 'NUTRITION');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED', 'FAILED');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_config_history" (
    "id" TEXT NOT NULL,
    "operationType" "OperationType" NOT NULL,
    "model" "AIModel" NOT NULL,
    "creditCost" INTEGER NOT NULL,
    "maxTokens" INTEGER NOT NULL,
    "thinkingBudget" INTEGER NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_config_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_operation_configs" (
    "id" TEXT NOT NULL,
    "operationType" "OperationType" NOT NULL,
    "model" "AIModel" NOT NULL,
    "creditCost" INTEGER NOT NULL,
    "maxTokens" INTEGER NOT NULL DEFAULT 4096,
    "thinkingBudget" INTEGER NOT NULL DEFAULT 10000,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recalculateCreditsCost" INTEGER DEFAULT 1,

    CONSTRAINT "ai_operation_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_provider_configs" (
    "id" TEXT NOT NULL,
    "provider" "AIProvider" NOT NULL,
    "apiKey" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "defaultModel" TEXT,
    "metadata" JSONB,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_provider_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_programs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "registrationCredit" INTEGER NOT NULL DEFAULT 0,
    "baseCommissionRate" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "maxLevels" INTEGER NOT NULL DEFAULT 1,
    "subscriptionGraceDays" INTEGER NOT NULL DEFAULT 3,
    "rewardPendingDays" INTEGER NOT NULL DEFAULT 14,
    "lifetimeCommissions" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_program_levels" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "commissionRate" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "creditReward" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_program_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_codes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "code" CITEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_attributions" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "referralCodeId" TEXT NOT NULL,
    "referrerUserId" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "status" "ReferralAttributionStatus" NOT NULL DEFAULT 'PENDING',
    "attributedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "graceEndAt" TIMESTAMP(3),
    "parentAttributionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "referral_attributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_rewards" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "attributionId" TEXT NOT NULL,
    "type" "AffiliateRewardType" NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "currencyAmount" DECIMAL(10,2),
    "currencyCode" VARCHAR(8),
    "creditAmount" INTEGER DEFAULT 0,
    "status" "AffiliateRewardStatus" NOT NULL DEFAULT 'PENDING',
    "pendingUntil" TIMESTAMP(3) NOT NULL,
    "readyAt" TIMESTAMP(3),
    "settledAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "affiliate_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payout_audit_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "rewardIds" JSONB NOT NULL,
    "action" TEXT NOT NULL,
    "amount" DECIMAL(10,2),
    "currencyCode" VARCHAR(8),
    "performedBy" TEXT NOT NULL,
    "notes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payout_audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_part_translations" (
    "id" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bodyPartId" TEXT NOT NULL,

    CONSTRAINT "body_part_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_parts" (
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "body_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "messages" JSONB NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_transactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "balanceAfter" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "credit_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_metrics" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "newUsers" INTEGER NOT NULL DEFAULT 0,
    "activeUsers" INTEGER NOT NULL DEFAULT 0,
    "creditsConsumed" INTEGER NOT NULL DEFAULT 0,
    "revenue" INTEGER NOT NULL DEFAULT 0,
    "workoutsGenerated" INTEGER NOT NULL DEFAULT 0,
    "nutritionGenerated" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipment_translations" (
    "id" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "equipment_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipments" (
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_body_parts" (
    "exerciseId" TEXT NOT NULL,
    "bodyPartId" TEXT NOT NULL,

    CONSTRAINT "exercise_body_parts_pkey" PRIMARY KEY ("exerciseId","bodyPartId")
);

-- CreateTable
CREATE TABLE "exercise_equipments" (
    "exerciseId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "exercise_equipments_pkey" PRIMARY KEY ("exerciseId","equipmentId")
);

-- CreateTable
CREATE TABLE "exercise_muscles" (
    "exerciseId" TEXT NOT NULL,
    "role" "MuscleRole" NOT NULL,
    "muscleId" TEXT NOT NULL,

    CONSTRAINT "exercise_muscles_pkey" PRIMARY KEY ("exerciseId","muscleId","role")
);

-- CreateTable
CREATE TABLE "exercise_relations" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "relation" "ExerciseRelationType" NOT NULL DEFAULT 'ALTERNATIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_translations" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "shortName" VARCHAR(128),
    "description" TEXT,
    "searchTerms" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_type_translations" (
    "id" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseTypeId" TEXT NOT NULL,

    CONSTRAINT "exercise_type_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_types" (
    "name" VARCHAR(64) NOT NULL,
    "imageUrl" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "exercise_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_versions" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "diff" JSONB NOT NULL,
    "baseVersion" INTEGER,
    "metadata" JSONB,
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" VARCHAR(40) NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "overview" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "instructions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "exerciseTips" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "variations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "approvalStatus" "ExerciseApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "approvedAt" TIMESTAMP(3),
    "isUserGenerated" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "approvedById" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseTypeId" TEXT,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscle_translations" (
    "id" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "muscleId" TEXT NOT NULL,

    CONSTRAINT "muscle_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscles" (
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "muscles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_plan_versions" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "targetMacros" JSONB NOT NULL,
    "restrictions" TEXT[],
    "preferences" TEXT[],
    "status" "NutritionStatus" NOT NULL,
    "metadata" JSONB,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "goals" TEXT[],
    "weeks" JSONB NOT NULL,

    CONSTRAINT "nutrition_plan_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_plans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "targetMacros" JSONB NOT NULL,
    "restrictions" TEXT[],
    "preferences" TEXT[],
    "status" "NutritionStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "goals" TEXT[],
    "weeks" JSONB NOT NULL,

    CONSTRAINT "nutrition_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_items" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nameNormalized" VARCHAR(255) NOT NULL,
    "barcode" VARCHAR(128),
    "macrosPer100g" JSONB NOT NULL,
    "servingSize" DECIMAL(6,2),
    "unit" TEXT NOT NULL DEFAULT 'g',
    "metadata" JSONB,
    "imageUrl" VARCHAR(512),
    "brandId" TEXT,
    "proteinPct" DECIMAL(5,2),
    "carbPct" DECIMAL(5,2),
    "fatPct" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_item_translations" (
    "id" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_item_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_brands" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "nameNormalized" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_item_categories" (
    "foodItemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "food_item_categories_pkey" PRIMARY KEY ("foodItemId","categoryId")
);

-- CreateTable
CREATE TABLE "nutrition_goals" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "nutrition_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_goal_translations" (
    "id" TEXT NOT NULL,
    "nutritionGoalId" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutrition_goal_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "stripePaymentId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'eur',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "type" "PaymentType" NOT NULL,
    "creditsAdded" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "SubscriptionPlan" NOT NULL,
    "status" "SubscriptionStatus" NOT NULL DEFAULT 'ACTIVE',
    "stripeSubscriptionId" TEXT,
    "stripeCustomerId" TEXT,
    "stripePriceId" TEXT,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_one_rep_max" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "oneRepMax" DECIMAL(5,2) NOT NULL,
    "notes" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_one_rep_max_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_one_rep_max_versions" (
    "id" TEXT NOT NULL,
    "maxId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "oneRepMax" DECIMAL(5,2) NOT NULL,
    "notes" TEXT,
    "version" INTEGER NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userOneRepMaxId" TEXT,

    CONSTRAINT "user_one_rep_max_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "age" INTEGER,
    "sex" "Sex",
    "heightCm" INTEGER,
    "weightKg" DECIMAL(5,2),
    "activityLevel" "ActivityLevel" DEFAULT 'MODERATE',
    "trainingFrequency" INTEGER DEFAULT 3,
    "dailyCalories" INTEGER,
    "workoutGoal" "WorkoutGoal" DEFAULT 'GENERAL_FITNESS',
    "equipment" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dietaryRestrictions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dietaryPreferences" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "healthNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weightUnit" "WeightUnit" NOT NULL DEFAULT 'KG',
    "workoutGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "nutritionGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_templates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "meal" JSONB NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_templates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TemplateType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "data" JSONB NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutrition_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_templates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "WorkoutTemplateType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "data" JSONB NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" CITEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "credits" INTEGER NOT NULL DEFAULT 0,
    "stripeCustomerId" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "autoRecalculateMacros" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "credentials" TEXT,
    "coachingStyle" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "websiteUrl" TEXT,
    "verificationStatus" "CoachVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "isPubliclyVisible" BOOLEAN NOT NULL DEFAULT false,
    "totalSales" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(3,2),
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_vetting_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "credentialDocuments" JSONB,
    "status" "VettingStatus" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "reviewNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_vetting_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketplace_plans" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "planType" "MarketplacePlanType" NOT NULL,
    "workoutProgramId" TEXT,
    "nutritionPlanId" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'EUR',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "totalPurchases" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(3,2),
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "marketplace_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_purchases" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketplacePlanId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "coachCommission" DECIMAL(10,2) NOT NULL,
    "platformCommission" DECIMAL(10,2) NOT NULL,
    "stripePaymentId" TEXT,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refundedAt" TIMESTAMP(3),

    CONSTRAINT "plan_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_ratings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketplacePlanId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_payout_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "beneficiaryName" VARCHAR(255) NOT NULL,
    "taxCode" VARCHAR(32),
    "vatNumber" VARCHAR(32),
    "iban" VARCHAR(34),
    "bicSwift" VARCHAR(11),
    "addressLine1" VARCHAR(255),
    "addressLine2" VARCHAR(255),
    "city" VARCHAR(128),
    "postalCode" VARCHAR(24),
    "country" VARCHAR(2),
    "taxResidence" VARCHAR(2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_payout_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "workout_goal_translations" (
    "id" TEXT NOT NULL,
    "workoutGoalId" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_goal_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_goals" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "workout_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_program_versions" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "DifficultyLevel" NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "goals" TEXT[],
    "status" "WorkoutStatus" NOT NULL,
    "weeks" JSONB NOT NULL,
    "metadata" JSONB,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_program_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_programs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "DifficultyLevel" NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "goals" TEXT[],
    "status" "WorkoutStatus" NOT NULL DEFAULT 'ACTIVE',
    "weeks" JSONB NOT NULL,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "exercises" JSONB NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_day_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "meals" JSONB NOT NULL,
    "actualDailyMacros" JSONB,
    "waterIntake" DECIMAL(4,2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutrition_day_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_measurements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "weight" DECIMAL(5,2),
    "bodyFat" DECIMAL(4,2),
    "muscleMass" DECIMAL(5,2),
    "chest" DECIMAL(5,2),
    "waist" DECIMAL(5,2),
    "hips" DECIMAL(5,2),
    "thigh" DECIMAL(5,2),
    "arm" DECIMAL(5,2),
    "calf" DECIMAL(5,2),
    "neck" DECIMAL(5,2),
    "shoulders" DECIMAL(5,2),
    "notes" TEXT,
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "body_measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_performance_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sessionId" TEXT,
    "date" DATE NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DECIMAL(6,2) NOT NULL,
    "volume" DECIMAL(8,2) NOT NULL,
    "rpe" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_performance_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress_snapshots" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "weight" DECIMAL(5,2),
    "bodyFat" DECIMAL(4,2),
    "muscleMass" DECIMAL(5,2),
    "workoutSessions7d" INTEGER NOT NULL DEFAULT 0,
    "workoutSessions30d" INTEGER NOT NULL DEFAULT 0,
    "avgVolumePerSession" DECIMAL(8,2),
    "strengthProgress" JSONB,
    "nutritionLogs7d" INTEGER NOT NULL DEFAULT 0,
    "nutritionLogs30d" INTEGER NOT NULL DEFAULT 0,
    "avgCalories" DECIMAL(6,2),
    "avgProtein" DECIMAL(6,2),
    "avgCarbs" DECIMAL(6,2),
    "avgFats" DECIMAL(6,2),
    "adherenceRate" DECIMAL(5,2),
    "activeGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "completedGoals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_progress_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_goals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "target" JSONB NOT NULL,
    "deadline" DATE,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "startDate" DATE NOT NULL,
    "completedDate" DATE,
    "progressLogs" JSONB[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_adherence_metrics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "daysLogged" INTEGER NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "adherenceRate" DECIMAL(5,2) NOT NULL,
    "avgCalories" DECIMAL(6,2) NOT NULL,
    "avgProtein" DECIMAL(6,2) NOT NULL,
    "avgCarbs" DECIMAL(6,2) NOT NULL,
    "avgFats" DECIMAL(6,2) NOT NULL,
    "avgWaterIntake" DECIMAL(4,2),
    "caloriesVariance" DECIMAL(6,2) NOT NULL,
    "proteinVariance" DECIMAL(6,2) NOT NULL,
    "carbsVariance" DECIMAL(6,2) NOT NULL,
    "fatsVariance" DECIMAL(6,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutrition_adherence_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policies" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(64) NOT NULL,
    "type" "PolicyType" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "metaDescription" VARCHAR(500),
    "status" "PolicyStatus" NOT NULL DEFAULT 'DRAFT',
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "policies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "policy_history" (
    "id" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "slug" VARCHAR(64) NOT NULL,
    "type" "PolicyType" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "metaDescription" VARCHAR(500),
    "status" "PolicyStatus" NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "policy_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_consents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "policyId" TEXT NOT NULL,
    "policyType" "PolicyType" NOT NULL,
    "policyVersion" INTEGER NOT NULL,
    "consented" BOOLEAN NOT NULL DEFAULT true,
    "consentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "withdrawnAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanningPlan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agentType" "PlanningAgentType" NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "daysPerWeek" INTEGER NOT NULL,
    "status" "PlanningStatus" NOT NULL DEFAULT 'PENDING',
    "metadata" JSONB,
    "errorMessage" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "pausedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanningPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanningTask" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "status" "PlanningStatus" NOT NULL DEFAULT 'PENDING',
    "result" JSONB,
    "errorMessage" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanningTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanningSubTask" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "dayName" TEXT NOT NULL,
    "status" "PlanningStatus" NOT NULL DEFAULT 'PENDING',
    "result" JSONB,
    "errorMessage" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanningSubTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_assignments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "planType" "CalendarPlanType" NOT NULL,
    "planId" TEXT NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calendar_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE INDEX "ai_config_history_createdAt_idx" ON "ai_config_history"("createdAt");

-- CreateIndex
CREATE INDEX "ai_config_history_operationType_idx" ON "ai_config_history"("operationType");

-- CreateIndex
CREATE UNIQUE INDEX "ai_operation_configs_operationType_key" ON "ai_operation_configs"("operationType");

-- CreateIndex
CREATE INDEX "ai_operation_configs_isActive_idx" ON "ai_operation_configs"("isActive");

-- CreateIndex
CREATE INDEX "ai_operation_configs_operationType_idx" ON "ai_operation_configs"("operationType");

-- CreateIndex
CREATE UNIQUE INDEX "ai_provider_configs_provider_key" ON "ai_provider_configs"("provider");

-- CreateIndex
CREATE INDEX "affiliate_program_levels_programId_idx" ON "affiliate_program_levels"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_program_levels_programId_level_key" ON "affiliate_program_levels"("programId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_userId_key" ON "referral_codes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_code_key" ON "referral_codes"("code");

-- CreateIndex
CREATE INDEX "referral_codes_programId_idx" ON "referral_codes"("programId");

-- CreateIndex
CREATE INDEX "referral_attributions_programId_idx" ON "referral_attributions"("programId");

-- CreateIndex
CREATE INDEX "referral_attributions_referralCodeId_idx" ON "referral_attributions"("referralCodeId");

-- CreateIndex
CREATE INDEX "referral_attributions_referrerUserId_idx" ON "referral_attributions"("referrerUserId");

-- CreateIndex
CREATE INDEX "referral_attributions_referredUserId_idx" ON "referral_attributions"("referredUserId");

-- CreateIndex
CREATE UNIQUE INDEX "referral_attributions_programId_referredUserId_level_key" ON "referral_attributions"("programId", "referredUserId", "level");

-- CreateIndex
CREATE INDEX "affiliate_rewards_programId_idx" ON "affiliate_rewards"("programId");

-- CreateIndex
CREATE INDEX "affiliate_rewards_attributionId_idx" ON "affiliate_rewards"("attributionId");

-- CreateIndex
CREATE INDEX "affiliate_rewards_status_idx" ON "affiliate_rewards"("status");

-- CreateIndex
CREATE INDEX "idx_affiliate_rewards_metadata_gin" ON "affiliate_rewards" USING GIN ("metadata");

-- CreateIndex
CREATE INDEX "payout_audit_log_userId_idx" ON "payout_audit_log"("userId");

-- CreateIndex
CREATE INDEX "payout_audit_log_performedBy_idx" ON "payout_audit_log"("performedBy");

-- CreateIndex
CREATE INDEX "payout_audit_log_action_idx" ON "payout_audit_log"("action");

-- CreateIndex
CREATE INDEX "payout_audit_log_createdAt_idx" ON "payout_audit_log"("createdAt");

-- CreateIndex
CREATE INDEX "idx_payout_audit_log_rewardids_gin" ON "payout_audit_log" USING GIN ("rewardIds");

-- CreateIndex
CREATE INDEX "body_part_translations_bodyPartId_idx" ON "body_part_translations"("bodyPartId");

-- CreateIndex
CREATE INDEX "body_part_translations_locale_idx" ON "body_part_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "body_part_translations_bodyPartId_locale_key" ON "body_part_translations"("bodyPartId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "body_parts_name_key" ON "body_parts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "body_parts_slug_key" ON "body_parts"("slug");

-- CreateIndex
CREATE INDEX "body_parts_name_idx" ON "body_parts"("name");

-- CreateIndex
CREATE INDEX "conversations_createdAt_idx" ON "conversations"("createdAt");

-- CreateIndex
CREATE INDEX "conversations_userId_idx" ON "conversations"("userId");

-- CreateIndex
CREATE INDEX "credit_transactions_createdAt_idx" ON "credit_transactions"("createdAt");

-- CreateIndex
CREATE INDEX "credit_transactions_type_idx" ON "credit_transactions"("type");

-- CreateIndex
CREATE INDEX "credit_transactions_userId_idx" ON "credit_transactions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "daily_metrics_date_key" ON "daily_metrics"("date");

-- CreateIndex
CREATE INDEX "daily_metrics_date_idx" ON "daily_metrics"("date");

-- CreateIndex
CREATE INDEX "equipment_translations_equipmentId_idx" ON "equipment_translations"("equipmentId");

-- CreateIndex
CREATE INDEX "equipment_translations_locale_idx" ON "equipment_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_translations_equipmentId_locale_key" ON "equipment_translations"("equipmentId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "equipments_name_key" ON "equipments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "equipments_slug_key" ON "equipments"("slug");

-- CreateIndex
CREATE INDEX "equipments_name_idx" ON "equipments"("name");

-- CreateIndex
CREATE INDEX "exercise_body_parts_bodyPartId_idx" ON "exercise_body_parts"("bodyPartId");

-- CreateIndex
CREATE INDEX "exercise_equipments_equipmentId_idx" ON "exercise_equipments"("equipmentId");

-- CreateIndex
CREATE INDEX "exercise_muscles_muscleId_idx" ON "exercise_muscles"("muscleId");

-- CreateIndex
CREATE INDEX "exercise_muscles_role_idx" ON "exercise_muscles"("role");

-- CreateIndex
CREATE INDEX "exercise_relations_toId_idx" ON "exercise_relations"("toId");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_relations_fromId_toId_relation_key" ON "exercise_relations"("fromId", "toId", "relation");

-- CreateIndex
CREATE INDEX "exercise_translations_exerciseId_idx" ON "exercise_translations"("exerciseId");

-- CreateIndex
CREATE INDEX "exercise_translations_locale_idx" ON "exercise_translations"("locale");

-- CreateIndex
CREATE INDEX "exercise_translations_name_idx" ON "exercise_translations"("name");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_translations_exerciseId_locale_key" ON "exercise_translations"("exerciseId", "locale");

-- CreateIndex
CREATE INDEX "exercise_type_translations_exerciseTypeId_idx" ON "exercise_type_translations"("exerciseTypeId");

-- CreateIndex
CREATE INDEX "exercise_type_translations_locale_idx" ON "exercise_type_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_type_translations_exerciseTypeId_locale_key" ON "exercise_type_translations"("exerciseTypeId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_types_name_key" ON "exercise_types"("name");

-- CreateIndex
CREATE INDEX "exercise_types_name_idx" ON "exercise_types"("name");

-- CreateIndex
CREATE INDEX "exercise_versions_createdAt_idx" ON "exercise_versions"("createdAt");

-- CreateIndex
CREATE INDEX "exercise_versions_createdById_idx" ON "exercise_versions"("createdById");

-- CreateIndex
CREATE INDEX "exercise_versions_exerciseId_idx" ON "exercise_versions"("exerciseId");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_versions_exerciseId_version_key" ON "exercise_versions"("exerciseId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "exercises_slug_key" ON "exercises"("slug");

-- CreateIndex
CREATE INDEX "exercises_approvalStatus_idx" ON "exercises"("approvalStatus");

-- CreateIndex
CREATE INDEX "exercises_approvedById_idx" ON "exercises"("approvedById");

-- CreateIndex
CREATE INDEX "exercises_createdAt_idx" ON "exercises"("createdAt");

-- CreateIndex
CREATE INDEX "exercises_createdById_idx" ON "exercises"("createdById");

-- CreateIndex
CREATE INDEX "exercises_exerciseTypeId_idx" ON "exercises"("exerciseTypeId");

-- CreateIndex
CREATE INDEX "muscle_translations_locale_idx" ON "muscle_translations"("locale");

-- CreateIndex
CREATE INDEX "muscle_translations_muscleId_idx" ON "muscle_translations"("muscleId");

-- CreateIndex
CREATE UNIQUE INDEX "muscle_translations_muscleId_locale_key" ON "muscle_translations"("muscleId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "muscles_name_key" ON "muscles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "muscles_slug_key" ON "muscles"("slug");

-- CreateIndex
CREATE INDEX "muscles_name_idx" ON "muscles"("name");

-- CreateIndex
CREATE INDEX "nutrition_plan_versions_createdAt_idx" ON "nutrition_plan_versions"("createdAt");

-- CreateIndex
CREATE INDEX "nutrition_plan_versions_planId_idx" ON "nutrition_plan_versions"("planId");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_plan_versions_planId_version_key" ON "nutrition_plan_versions"("planId", "version");

-- CreateIndex
CREATE INDEX "nutrition_plans_createdAt_idx" ON "nutrition_plans"("createdAt");

-- CreateIndex
CREATE INDEX "nutrition_plans_status_idx" ON "nutrition_plans"("status");

-- CreateIndex
CREATE INDEX "nutrition_plans_userId_idx" ON "nutrition_plans"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "food_items_barcode_key" ON "food_items"("barcode");

-- CreateIndex
CREATE INDEX "food_items_name_idx" ON "food_items"("name");

-- CreateIndex
CREATE INDEX "food_items_nameNormalized_idx" ON "food_items"("nameNormalized");

-- CreateIndex
CREATE INDEX "food_items_barcode_idx" ON "food_items"("barcode");

-- CreateIndex
CREATE INDEX "food_items_brandId_idx" ON "food_items"("brandId");

-- CreateIndex
CREATE INDEX "food_items_proteinPct_idx" ON "food_items"("proteinPct");

-- CreateIndex
CREATE INDEX "food_items_carbPct_idx" ON "food_items"("carbPct");

-- CreateIndex
CREATE INDEX "food_items_fatPct_idx" ON "food_items"("fatPct");

-- CreateIndex
CREATE INDEX "food_item_translations_foodItemId_idx" ON "food_item_translations"("foodItemId");

-- CreateIndex
CREATE INDEX "food_item_translations_locale_idx" ON "food_item_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "food_item_translations_foodItemId_locale_key" ON "food_item_translations"("foodItemId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "food_brands_name_key" ON "food_brands"("name");

-- CreateIndex
CREATE INDEX "food_brands_nameNormalized_idx" ON "food_brands"("nameNormalized");

-- CreateIndex
CREATE UNIQUE INDEX "food_categories_name_key" ON "food_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "food_categories_slug_key" ON "food_categories"("slug");

-- CreateIndex
CREATE INDEX "food_categories_slug_idx" ON "food_categories"("slug");

-- CreateIndex
CREATE INDEX "food_item_categories_categoryId_idx" ON "food_item_categories"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_goals_name_key" ON "nutrition_goals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_goals_slug_key" ON "nutrition_goals"("slug");

-- CreateIndex
CREATE INDEX "nutrition_goal_translations_nutritionGoalId_idx" ON "nutrition_goal_translations"("nutritionGoalId");

-- CreateIndex
CREATE INDEX "nutrition_goal_translations_locale_idx" ON "nutrition_goal_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_goal_translations_nutritionGoalId_locale_key" ON "nutrition_goal_translations"("nutritionGoalId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripePaymentId_key" ON "payments"("stripePaymentId");

-- CreateIndex
CREATE INDEX "payments_createdAt_idx" ON "payments"("createdAt");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "idx_payments_metadata_gin" ON "payments" USING GIN ("metadata");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripeSubscriptionId_key" ON "subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE INDEX "subscriptions_stripeSubscriptionId_idx" ON "subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "subscriptions_userId_idx" ON "subscriptions"("userId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_exerciseId_idx" ON "user_one_rep_max"("exerciseId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_userId_idx" ON "user_one_rep_max"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_one_rep_max_userId_exerciseId_key" ON "user_one_rep_max"("userId", "exerciseId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_createdAt_idx" ON "user_one_rep_max_versions"("createdAt");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_exerciseId_idx" ON "user_one_rep_max_versions"("exerciseId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_maxId_idx" ON "user_one_rep_max_versions"("maxId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_userId_idx" ON "user_one_rep_max_versions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_one_rep_max_versions_maxId_version_key" ON "user_one_rep_max_versions"("maxId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_userId_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE INDEX "user_profiles_userId_idx" ON "user_profiles"("userId");

-- CreateIndex
CREATE INDEX "meal_templates_userId_idx" ON "meal_templates"("userId");

-- CreateIndex
CREATE INDEX "meal_templates_createdAt_idx" ON "meal_templates"("createdAt");

-- CreateIndex
CREATE INDEX "nutrition_templates_userId_idx" ON "nutrition_templates"("userId");

-- CreateIndex
CREATE INDEX "nutrition_templates_type_idx" ON "nutrition_templates"("type");

-- CreateIndex
CREATE INDEX "nutrition_templates_userId_type_idx" ON "nutrition_templates"("userId", "type");

-- CreateIndex
CREATE INDEX "nutrition_templates_category_idx" ON "nutrition_templates"("category");

-- CreateIndex
CREATE INDEX "nutrition_templates_createdAt_idx" ON "nutrition_templates"("createdAt");

-- CreateIndex
CREATE INDEX "nutrition_templates_lastUsedAt_idx" ON "nutrition_templates"("lastUsedAt");

-- CreateIndex
CREATE INDEX "nutrition_templates_usageCount_idx" ON "nutrition_templates"("usageCount");

-- CreateIndex
CREATE INDEX "nutrition_templates_tags_idx" ON "nutrition_templates" USING GIN ("tags");

-- CreateIndex
CREATE INDEX "workout_templates_userId_idx" ON "workout_templates"("userId");

-- CreateIndex
CREATE INDEX "workout_templates_type_idx" ON "workout_templates"("type");

-- CreateIndex
CREATE INDEX "workout_templates_userId_type_idx" ON "workout_templates"("userId", "type");

-- CreateIndex
CREATE INDEX "workout_templates_category_idx" ON "workout_templates"("category");

-- CreateIndex
CREATE INDEX "workout_templates_createdAt_idx" ON "workout_templates"("createdAt");

-- CreateIndex
CREATE INDEX "workout_templates_lastUsedAt_idx" ON "workout_templates"("lastUsedAt");

-- CreateIndex
CREATE INDEX "workout_templates_usageCount_idx" ON "workout_templates"("usageCount");

-- CreateIndex
CREATE INDEX "workout_templates_tags_idx" ON "workout_templates" USING GIN ("tags");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeCustomerId_key" ON "users"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- CreateIndex
CREATE INDEX "users_stripeCustomerId_idx" ON "users"("stripeCustomerId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "coach_profiles_userId_key" ON "coach_profiles"("userId");

-- CreateIndex
CREATE INDEX "coach_profiles_userId_idx" ON "coach_profiles"("userId");

-- CreateIndex
CREATE INDEX "coach_profiles_verificationStatus_idx" ON "coach_profiles"("verificationStatus");

-- CreateIndex
CREATE INDEX "coach_profiles_isPubliclyVisible_idx" ON "coach_profiles"("isPubliclyVisible");

-- CreateIndex
CREATE INDEX "coach_vetting_requests_userId_idx" ON "coach_vetting_requests"("userId");

-- CreateIndex
CREATE INDEX "coach_vetting_requests_status_idx" ON "coach_vetting_requests"("status");

-- CreateIndex
CREATE UNIQUE INDEX "marketplace_plans_workoutProgramId_key" ON "marketplace_plans"("workoutProgramId");

-- CreateIndex
CREATE UNIQUE INDEX "marketplace_plans_nutritionPlanId_key" ON "marketplace_plans"("nutritionPlanId");

-- CreateIndex
CREATE INDEX "marketplace_plans_coachId_idx" ON "marketplace_plans"("coachId");

-- CreateIndex
CREATE INDEX "marketplace_plans_planType_idx" ON "marketplace_plans"("planType");

-- CreateIndex
CREATE INDEX "marketplace_plans_isPublished_idx" ON "marketplace_plans"("isPublished");

-- CreateIndex
CREATE INDEX "marketplace_plans_averageRating_idx" ON "marketplace_plans"("averageRating");

-- CreateIndex
CREATE UNIQUE INDEX "plan_purchases_stripePaymentId_key" ON "plan_purchases"("stripePaymentId");

-- CreateIndex
CREATE INDEX "plan_purchases_userId_idx" ON "plan_purchases"("userId");

-- CreateIndex
CREATE INDEX "plan_purchases_marketplacePlanId_idx" ON "plan_purchases"("marketplacePlanId");

-- CreateIndex
CREATE INDEX "plan_purchases_status_idx" ON "plan_purchases"("status");

-- CreateIndex
CREATE INDEX "plan_purchases_purchasedAt_idx" ON "plan_purchases"("purchasedAt");

-- CreateIndex
CREATE INDEX "plan_ratings_marketplacePlanId_idx" ON "plan_ratings"("marketplacePlanId");

-- CreateIndex
CREATE INDEX "plan_ratings_rating_idx" ON "plan_ratings"("rating");

-- CreateIndex
CREATE UNIQUE INDEX "plan_ratings_userId_marketplacePlanId_key" ON "plan_ratings"("userId", "marketplacePlanId");

-- CreateIndex
CREATE UNIQUE INDEX "user_payout_profiles_userId_key" ON "user_payout_profiles"("userId");

-- CreateIndex
CREATE INDEX "user_payout_profiles_userId_idx" ON "user_payout_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE INDEX "workout_goal_translations_locale_idx" ON "workout_goal_translations"("locale");

-- CreateIndex
CREATE INDEX "workout_goal_translations_workoutGoalId_idx" ON "workout_goal_translations"("workoutGoalId");

-- CreateIndex
CREATE UNIQUE INDEX "workout_goal_translations_workoutGoalId_locale_key" ON "workout_goal_translations"("workoutGoalId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "workout_goals_name_key" ON "workout_goals"("name");

-- CreateIndex
CREATE UNIQUE INDEX "workout_goals_slug_key" ON "workout_goals"("slug");

-- CreateIndex
CREATE INDEX "workout_goals_name_idx" ON "workout_goals"("name");

-- CreateIndex
CREATE INDEX "workout_program_versions_createdAt_idx" ON "workout_program_versions"("createdAt");

-- CreateIndex
CREATE INDEX "workout_program_versions_programId_idx" ON "workout_program_versions"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "workout_program_versions_programId_version_key" ON "workout_program_versions"("programId", "version");

-- CreateIndex
CREATE INDEX "workout_programs_createdAt_idx" ON "workout_programs"("createdAt");

-- CreateIndex
CREATE INDEX "workout_programs_status_idx" ON "workout_programs"("status");

-- CreateIndex
CREATE INDEX "workout_programs_userId_idx" ON "workout_programs"("userId");

-- CreateIndex
CREATE INDEX "workout_sessions_userId_idx" ON "workout_sessions"("userId");

-- CreateIndex
CREATE INDEX "workout_sessions_programId_idx" ON "workout_sessions"("programId");

-- CreateIndex
CREATE INDEX "workout_sessions_startedAt_idx" ON "workout_sessions"("startedAt");

-- CreateIndex
CREATE INDEX "workout_sessions_completedAt_idx" ON "workout_sessions"("completedAt");

-- CreateIndex
CREATE INDEX "nutrition_day_logs_userId_idx" ON "nutrition_day_logs"("userId");

-- CreateIndex
CREATE INDEX "nutrition_day_logs_planId_idx" ON "nutrition_day_logs"("planId");

-- CreateIndex
CREATE INDEX "nutrition_day_logs_date_idx" ON "nutrition_day_logs"("date");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_day_logs_userId_planId_weekNumber_dayNumber_date_key" ON "nutrition_day_logs"("userId", "planId", "weekNumber", "dayNumber", "date");

-- CreateIndex
CREATE INDEX "body_measurements_userId_idx" ON "body_measurements"("userId");

-- CreateIndex
CREATE INDEX "body_measurements_date_idx" ON "body_measurements"("date");

-- CreateIndex
CREATE UNIQUE INDEX "body_measurements_userId_date_key" ON "body_measurements"("userId", "date");

-- CreateIndex
CREATE INDEX "exercise_performance_records_userId_idx" ON "exercise_performance_records"("userId");

-- CreateIndex
CREATE INDEX "exercise_performance_records_exerciseId_idx" ON "exercise_performance_records"("exerciseId");

-- CreateIndex
CREATE INDEX "exercise_performance_records_date_idx" ON "exercise_performance_records"("date");

-- CreateIndex
CREATE INDEX "user_progress_snapshots_userId_idx" ON "user_progress_snapshots"("userId");

-- CreateIndex
CREATE INDEX "user_progress_snapshots_date_idx" ON "user_progress_snapshots"("date");

-- CreateIndex
CREATE UNIQUE INDEX "user_progress_snapshots_userId_date_key" ON "user_progress_snapshots"("userId", "date");

-- CreateIndex
CREATE INDEX "user_goals_userId_idx" ON "user_goals"("userId");

-- CreateIndex
CREATE INDEX "user_goals_status_idx" ON "user_goals"("status");

-- CreateIndex
CREATE INDEX "user_goals_deadline_idx" ON "user_goals"("deadline");

-- CreateIndex
CREATE INDEX "nutrition_adherence_metrics_userId_idx" ON "nutrition_adherence_metrics"("userId");

-- CreateIndex
CREATE INDEX "nutrition_adherence_metrics_planId_idx" ON "nutrition_adherence_metrics"("planId");

-- CreateIndex
CREATE INDEX "nutrition_adherence_metrics_startDate_idx" ON "nutrition_adherence_metrics"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "nutrition_adherence_metrics_userId_planId_weekNumber_key" ON "nutrition_adherence_metrics"("userId", "planId", "weekNumber");

-- CreateIndex
CREATE UNIQUE INDEX "policies_slug_key" ON "policies"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "policies_type_key" ON "policies"("type");

-- CreateIndex
CREATE INDEX "policies_slug_idx" ON "policies"("slug");

-- CreateIndex
CREATE INDEX "policies_status_idx" ON "policies"("status");

-- CreateIndex
CREATE INDEX "policies_type_idx" ON "policies"("type");

-- CreateIndex
CREATE INDEX "policies_createdById_idx" ON "policies"("createdById");

-- CreateIndex
CREATE INDEX "policy_history_policyId_idx" ON "policy_history"("policyId");

-- CreateIndex
CREATE INDEX "policy_history_createdAt_idx" ON "policy_history"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "policy_history_policyId_version_key" ON "policy_history"("policyId", "version");

-- CreateIndex
CREATE INDEX "user_consents_userId_idx" ON "user_consents"("userId");

-- CreateIndex
CREATE INDEX "user_consents_policyId_idx" ON "user_consents"("policyId");

-- CreateIndex
CREATE INDEX "user_consents_policyType_idx" ON "user_consents"("policyType");

-- CreateIndex
CREATE INDEX "user_consents_consentedAt_idx" ON "user_consents"("consentedAt");

-- CreateIndex
CREATE UNIQUE INDEX "user_consents_userId_policyId_key" ON "user_consents"("userId", "policyId");

-- CreateIndex
CREATE INDEX "PlanningPlan_userId_idx" ON "PlanningPlan"("userId");

-- CreateIndex
CREATE INDEX "PlanningPlan_status_idx" ON "PlanningPlan"("status");

-- CreateIndex
CREATE INDEX "PlanningPlan_agentType_idx" ON "PlanningPlan"("agentType");

-- CreateIndex
CREATE INDEX "PlanningPlan_createdAt_idx" ON "PlanningPlan"("createdAt");

-- CreateIndex
CREATE INDEX "PlanningTask_planId_idx" ON "PlanningTask"("planId");

-- CreateIndex
CREATE INDEX "PlanningTask_status_idx" ON "PlanningTask"("status");

-- CreateIndex
CREATE INDEX "PlanningTask_weekNumber_idx" ON "PlanningTask"("weekNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningTask_planId_weekNumber_key" ON "PlanningTask"("planId", "weekNumber");

-- CreateIndex
CREATE INDEX "PlanningSubTask_taskId_idx" ON "PlanningSubTask"("taskId");

-- CreateIndex
CREATE INDEX "PlanningSubTask_status_idx" ON "PlanningSubTask"("status");

-- CreateIndex
CREATE INDEX "PlanningSubTask_dayNumber_idx" ON "PlanningSubTask"("dayNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningSubTask_taskId_dayNumber_key" ON "PlanningSubTask"("taskId", "dayNumber");

-- CreateIndex
CREATE INDEX "calendar_assignments_userId_date_idx" ON "calendar_assignments"("userId", "date");

-- CreateIndex
CREATE INDEX "calendar_assignments_userId_idx" ON "calendar_assignments"("userId");

-- CreateIndex
CREATE INDEX "calendar_assignments_date_idx" ON "calendar_assignments"("date");

-- CreateIndex
CREATE INDEX "calendar_assignments_planType_idx" ON "calendar_assignments"("planType");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_assignments_userId_date_planType_planId_key" ON "calendar_assignments"("userId", "date", "planType", "planId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_program_levels" ADD CONSTRAINT "affiliate_program_levels_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_parentAttributionId_fkey" FOREIGN KEY ("parentAttributionId") REFERENCES "referral_attributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referralCodeId_fkey" FOREIGN KEY ("referralCodeId") REFERENCES "referral_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referrerUserId_fkey" FOREIGN KEY ("referrerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_attributionId_fkey" FOREIGN KEY ("attributionId") REFERENCES "referral_attributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payout_audit_log" ADD CONSTRAINT "payout_audit_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_part_translations" ADD CONSTRAINT "body_part_translations_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "body_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipment_translations" ADD CONSTRAINT "equipment_translations_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_body_parts" ADD CONSTRAINT "exercise_body_parts_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "body_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_body_parts" ADD CONSTRAINT "exercise_body_parts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_muscles" ADD CONSTRAINT "exercise_muscles_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_muscles" ADD CONSTRAINT "exercise_muscles_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_relations" ADD CONSTRAINT "exercise_relations_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_relations" ADD CONSTRAINT "exercise_relations_toId_fkey" FOREIGN KEY ("toId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_translations" ADD CONSTRAINT "exercise_translations_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_type_translations" ADD CONSTRAINT "exercise_type_translations_exerciseTypeId_fkey" FOREIGN KEY ("exerciseTypeId") REFERENCES "exercise_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_versions" ADD CONSTRAINT "exercise_versions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_versions" ADD CONSTRAINT "exercise_versions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_exerciseTypeId_fkey" FOREIGN KEY ("exerciseTypeId") REFERENCES "exercise_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muscle_translations" ADD CONSTRAINT "muscle_translations_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_plan_versions" ADD CONSTRAINT "nutrition_plan_versions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_plans" ADD CONSTRAINT "nutrition_plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_items" ADD CONSTRAINT "food_items_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "food_brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_item_translations" ADD CONSTRAINT "food_item_translations_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_item_categories" ADD CONSTRAINT "food_item_categories_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_item_categories" ADD CONSTRAINT "food_item_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "food_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_goal_translations" ADD CONSTRAINT "nutrition_goal_translations_nutritionGoalId_fkey" FOREIGN KEY ("nutritionGoalId") REFERENCES "nutrition_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_one_rep_max" ADD CONSTRAINT "user_one_rep_max_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_one_rep_max" ADD CONSTRAINT "user_one_rep_max_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_one_rep_max_versions" ADD CONSTRAINT "user_one_rep_max_versions_userOneRepMaxId_fkey" FOREIGN KEY ("userOneRepMaxId") REFERENCES "user_one_rep_max"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_templates" ADD CONSTRAINT "meal_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_templates" ADD CONSTRAINT "nutrition_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_profiles" ADD CONSTRAINT "coach_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_vetting_requests" ADD CONSTRAINT "coach_vetting_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_workoutProgramId_fkey" FOREIGN KEY ("workoutProgramId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_nutritionPlanId_fkey" FOREIGN KEY ("nutritionPlanId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_purchases" ADD CONSTRAINT "plan_purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_purchases" ADD CONSTRAINT "plan_purchases_marketplacePlanId_fkey" FOREIGN KEY ("marketplacePlanId") REFERENCES "marketplace_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_ratings" ADD CONSTRAINT "plan_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_ratings" ADD CONSTRAINT "plan_ratings_marketplacePlanId_fkey" FOREIGN KEY ("marketplacePlanId") REFERENCES "marketplace_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_payout_profiles" ADD CONSTRAINT "user_payout_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_goal_translations" ADD CONSTRAINT "workout_goal_translations_workoutGoalId_fkey" FOREIGN KEY ("workoutGoalId") REFERENCES "workout_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_program_versions" ADD CONSTRAINT "workout_program_versions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_programs" ADD CONSTRAINT "workout_programs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_day_logs" ADD CONSTRAINT "nutrition_day_logs_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_day_logs" ADD CONSTRAINT "nutrition_day_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_measurements" ADD CONSTRAINT "body_measurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "workout_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress_snapshots" ADD CONSTRAINT "user_progress_snapshots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_adherence_metrics" ADD CONSTRAINT "nutrition_adherence_metrics_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_adherence_metrics" ADD CONSTRAINT "nutrition_adherence_metrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_history" ADD CONSTRAINT "policy_history_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningPlan" ADD CONSTRAINT "PlanningPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningTask" ADD CONSTRAINT "PlanningTask_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PlanningPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanningSubTask" ADD CONSTRAINT "PlanningSubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "PlanningTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_assignments" ADD CONSTRAINT "calendar_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

