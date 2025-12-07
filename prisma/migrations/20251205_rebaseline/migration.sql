-- CreateEnum
CREATE TYPE "AIProvider" AS ENUM ('GOOGLE', 'ANTHROPIC', 'OPENAI', 'XAI', 'OPENROUTER', 'MINIMAX');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'COACH', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'DELETED');

-- CreateEnum
CREATE TYPE "ConversationRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM', 'TOOL');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LBS');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PURCHASE', 'CONSUMPTION', 'REFUND', 'ADMIN_ADJUSTMENT', 'SUBSCRIPTION_RENEWAL', 'PROMOTION');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('GENERAL_CHAT', 'VISION_ANALYSIS', 'FOOD_LABEL_ANALYSIS', 'MEAL_SEGMENTATION', 'PLAN_GENERATION', 'PLAN_MODIFICATION', 'PLAN_RECALCULATION', 'EXERCISE_GENERATION', 'EXERCISE_AUTOCOMPLETE', 'ANALYTICS_INSIGHTS', 'PROGRESS_ANALYSIS', 'WORKOUT_IMPORT', 'COMPLEXITY_EVALUATION');

-- CreateEnum
CREATE TYPE "AIChatFeature" AS ENUM ('MODEL_SELECTOR', 'SPEECH_RECOGNITION', 'CHECKPOINT', 'CONTEXT', 'CONVERSATION', 'SOURCES', 'SUGGESTION', 'TASK', 'ARTIFACT', 'WEB_PREVIEW', 'REASONING', 'QUEUE');

-- CreateEnum
CREATE TYPE "ExerciseApprovalStatus" AS ENUM ('DRAFT', 'PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ExerciseRelationType" AS ENUM ('ALTERNATIVE', 'COMPLEMENTARY', 'PROGRESSION');

-- CreateEnum
CREATE TYPE "MuscleRole" AS ENUM ('PRIMARY', 'SECONDARY');

-- CreateEnum
CREATE TYPE "WorkoutGoal" AS ENUM ('STRENGTH', 'HYPERTROPHY', 'ENDURANCE', 'MOBILITY', 'GENERAL_FITNESS');

-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "NutritionStatus" AS ENUM ('DRAFT', 'ACTIVE', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "DietType" AS ENUM ('OMNIVORE', 'VEGETARIAN', 'VEGAN', 'PESCATARIAN', 'KETO', 'PALEO', 'MEDITERRANEAN');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('SUBSCRIPTION', 'CREDITS', 'MARKETPLACE');

-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('PLUS', 'PRO');

-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'CANCELLED', 'EXPIRED', 'PAST_DUE');

-- CreateEnum
CREATE TYPE "PromotionType" AS ENUM ('STRIPE_COUPON', 'BONUS_CREDITS');

-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');

-- CreateEnum
CREATE TYPE "AffiliateRewardType" AS ENUM ('REGISTRATION_CREDIT', 'SUBSCRIPTION_COMMISSION', 'BONUS');

-- CreateEnum
CREATE TYPE "AffiliateRewardStatus" AS ENUM ('PENDING', 'CLEARED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ReferralAttributionStatus" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "MarketplacePlanType" AS ENUM ('WORKOUT', 'NUTRITION');

-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'COMPLETED', 'REFUNDED', 'FAILED');

-- CreateEnum
CREATE TYPE "CoachVerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VettingStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ConversationPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "PlanningStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'CANCELLED', 'PAUSED');

-- CreateEnum
CREATE TYPE "PlanningAgentType" AS ENUM ('WORKOUT', 'NUTRITION');

-- CreateEnum
CREATE TYPE "CalendarPlanType" AS ENUM ('NUTRITION', 'WORKOUT');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ARCHIVED', 'ON_HOLD');

-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'COMPLETED', 'BLOCKED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "HabitFrequency" AS ENUM ('DAILY', 'WEEKLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PolicyType" AS ENUM ('PRIVACY', 'TERMS', 'GDPR', 'CONTENT');

-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "InvitationType" AS ENUM ('ONE_TIME', 'MULTI_USE');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('ACTIVE', 'USED', 'REVOKED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "TemplateType" AS ENUM ('meal', 'day', 'week');

-- CreateEnum
CREATE TYPE "WorkoutTemplateType" AS ENUM ('exercise', 'day', 'week', 'progression');

-- CreateEnum
CREATE TYPE "RolloutStrategy" AS ENUM ('ALL', 'ROLE_BASED', 'PERCENTAGE', 'RANDOM', 'BETA_USERS', 'COMBINED');

-- CreateEnum
CREATE TYPE "FlagEventType" AS ENUM ('ENABLED', 'DISABLED', 'EVALUATED', 'ERROR');

-- CreateEnum
CREATE TYPE "ApiKeyStatus" AS ENUM ('ACTIVE', 'REVOKED', 'EXPIRED');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
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
    "healthLastSync" TIMESTAMP(3),
    "healthPlatform" TEXT,
    "betaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "invitationId" TEXT,
    "copilotEnabled" BOOLEAN NOT NULL DEFAULT true,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_config_history" (
    "id" TEXT NOT NULL,
    "operationType" "OperationType" NOT NULL,
    "model" TEXT NOT NULL,
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
    "model" TEXT NOT NULL,
    "creditCost" INTEGER NOT NULL,
    "maxTokens" INTEGER NOT NULL DEFAULT 65000,
    "thinkingBudget" INTEGER NOT NULL DEFAULT 32000,
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
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "defaultModel" TEXT,
    "metadata" JSONB,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "vercelEnvVarId" TEXT,

    CONSTRAINT "ai_provider_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_framework_configs" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,
    "description" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_framework_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_framework_config_history" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL,
    "config" JSONB,
    "changedBy" TEXT NOT NULL,
    "changeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_framework_config_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_system_prompts" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "agentCategory" TEXT NOT NULL,
    "agentName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "promptTemplate" TEXT NOT NULL,
    "variables" JSONB,
    "description" TEXT,
    "defaultPrompt" TEXT NOT NULL,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_system_prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_system_prompt_history" (
    "id" TEXT NOT NULL,
    "promptId" TEXT NOT NULL,
    "promptTemplate" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "changedBy" TEXT NOT NULL,
    "changeReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_system_prompt_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_external_models" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'openrouter',
    "modelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contextLength" INTEGER,
    "maxOutputTokens" INTEGER,
    "promptPrice" DECIMAL(10,6) NOT NULL,
    "completionPrice" DECIMAL(10,6) NOT NULL,
    "supportsImages" BOOLEAN NOT NULL DEFAULT false,
    "supportsReasoning" BOOLEAN NOT NULL DEFAULT false,
    "reasoningEffort" TEXT,
    "supportsStructuredOutput" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_external_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_chat_models" (
    "id" TEXT NOT NULL,
    "provider" "AIProvider" NOT NULL,
    "modelId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "maxTokens" INTEGER NOT NULL DEFAULT 8192,
    "contextWindow" INTEGER NOT NULL DEFAULT 128000,
    "inputPricePerMillion" DECIMAL(10,4),
    "outputPricePerMillion" DECIMAL(10,4),
    "supportsVision" BOOLEAN NOT NULL DEFAULT false,
    "supportsTools" BOOLEAN NOT NULL DEFAULT true,
    "supportsStreaming" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_chat_models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_chat_feature_configs" (
    "id" TEXT NOT NULL,
    "feature" "AIChatFeature" NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "enabledForRoles" "UserRole"[] DEFAULT ARRAY[]::"UserRole"[],
    "config" JSONB,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_chat_feature_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_chat_model_access" (
    "id" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "canSelect" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_chat_model_access_pkey" PRIMARY KEY ("id")
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
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" UUID,

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
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseTypeId" TEXT,
    "createdById" UUID,
    "approvedById" UUID,

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
    "userId" UUID,

    CONSTRAINT "workout_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_sessions" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "exercises" JSONB NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_performance_records" (
    "id" TEXT NOT NULL,
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
    "repsMax" INTEGER,
    "rpeMax" INTEGER,
    "weightMax" DECIMAL(6,2),
    "intensityPercent" INTEGER,
    "intensityPercentMax" INTEGER,
    "userId" UUID,

    CONSTRAINT "exercise_performance_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_one_rep_max" (
    "id" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "oneRepMax" DECIMAL(5,2) NOT NULL,
    "notes" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,
    "userId" UUID,

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
    "adaptations" JSONB,
    "personalizedPlan" JSONB,
    "userProfile" JSONB,

    CONSTRAINT "nutrition_plan_versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_plans" (
    "id" TEXT NOT NULL,
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
    "adaptations" JSONB,
    "personalizedPlan" JSONB,
    "userProfile" JSONB,
    "userId" UUID,

    CONSTRAINT "nutrition_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_day_logs" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "nutrition_day_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_adherence_metrics" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "nutrition_adherence_metrics_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "food_items" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nameNormalized" VARCHAR(255) NOT NULL,
    "barcode" VARCHAR(128),
    "macrosPer100g" JSONB NOT NULL,
    "servingSize" DECIMAL(6,2) NOT NULL,
    "unit" TEXT NOT NULL DEFAULT 'g',
    "metadata" JSONB,
    "imageUrl" VARCHAR(512),
    "brandId" TEXT,
    "proteinPct" DECIMAL(5,2) NOT NULL,
    "carbPct" DECIMAL(5,2) NOT NULL,
    "fatPct" DECIMAL(5,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mainMacro" JSONB NOT NULL,

    CONSTRAINT "food_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_item_translations" (
    "id" TEXT NOT NULL,
    "foodItemId" TEXT NOT NULL,
    "locale" VARCHAR(8) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
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
CREATE TABLE "user_profiles" (
    "id" TEXT NOT NULL,
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
    "dietType" "DietType" DEFAULT 'OMNIVORE',
    "userId" UUID,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "body_measurements" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "body_measurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress_snapshots" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "user_progress_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_goals" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "user_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_onboarding_progress" (
    "id" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "completedSteps" JSONB NOT NULL DEFAULT '{}',
    "skippedSteps" JSONB NOT NULL DEFAULT '{}',
    "metadata" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "lastInteraction" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "user_onboarding_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_skills" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "category" TEXT,
    "tags" JSONB DEFAULT '[]',
    "inputSchema" JSONB NOT NULL,
    "outputSchema" JSONB,
    "implementation" JSONB NOT NULL,
    "generatedCode" TEXT,
    "codeHash" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deployedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "user_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_workflows" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" TEXT NOT NULL DEFAULT '1.0.0',
    "domain" TEXT,
    "entryNodeId" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deployedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "user_workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_nodes" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "position" JSONB NOT NULL,
    "config" JSONB NOT NULL,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflow_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflow_edges" (
    "id" TEXT NOT NULL,
    "workflowId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "label" TEXT,
    "condition" JSONB,
    "order" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workflow_edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
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
    "stripePaymentIntentId" TEXT,
    "userId" UUID,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscriptions" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "credit_transactions" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "balanceAfter" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "credit_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "PromotionType" NOT NULL,
    "stripeCouponId" TEXT,
    "discountType" "DiscountType",
    "discountValue" DECIMAL(65,30),
    "bonusCredits" INTEGER,
    "maxUses" INTEGER,
    "maxUsesPerUser" INTEGER NOT NULL DEFAULT 1,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion_uses" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "paymentId" TEXT,
    "stripeCheckoutSessionId" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,
    "userId" UUID,

    CONSTRAINT "promotion_uses_pkey" PRIMARY KEY ("id")
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
    "programId" TEXT NOT NULL,
    "code" CITEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "referral_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral_attributions" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "referralCodeId" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "status" "ReferralAttributionStatus" NOT NULL DEFAULT 'PENDING',
    "attributedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "graceEndAt" TIMESTAMP(3),
    "parentAttributionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referrerUserId" UUID,
    "referredUserId" UUID,

    CONSTRAINT "referral_attributions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "affiliate_rewards" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "attributionId" TEXT NOT NULL,
    "type" "AffiliateRewardType" NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
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
    "userId" UUID,

    CONSTRAINT "affiliate_rewards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payout_audit_log" (
    "id" TEXT NOT NULL,
    "rewardIds" JSONB NOT NULL,
    "action" TEXT NOT NULL,
    "amount" DECIMAL(10,2),
    "currencyCode" VARCHAR(8),
    "performedBy" TEXT NOT NULL,
    "notes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "payout_audit_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_payout_profiles" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "user_payout_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marketplace_plans" (
    "id" TEXT NOT NULL,
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
    "coachId" UUID,

    CONSTRAINT "marketplace_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_purchases" (
    "id" TEXT NOT NULL,
    "marketplacePlanId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "coachCommission" DECIMAL(10,2) NOT NULL,
    "platformCommission" DECIMAL(10,2) NOT NULL,
    "stripePaymentId" TEXT,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refundedAt" TIMESTAMP(3),
    "userId" UUID,

    CONSTRAINT "plan_purchases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plan_ratings" (
    "id" TEXT NOT NULL,
    "marketplacePlanId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "plan_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_profiles" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "coach_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coach_vetting_requests" (
    "id" TEXT NOT NULL,
    "credentialDocuments" JSONB,
    "status" "VettingStatus" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "reviewNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "coach_vetting_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastMessageAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "modelOverride" TEXT,
    "providerOverride" "AIProvider",
    "userId" UUID,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversation_messages" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" "ConversationRole" NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "sequence" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversation_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direct_conversations" (
    "id" TEXT NOT NULL,
    "coachId" UUID NOT NULL,
    "athleteId" UUID NOT NULL,
    "title" TEXT,
    "isMuted" BOOLEAN NOT NULL DEFAULT false,
    "priority" "ConversationPriority" NOT NULL DEFAULT 'MEDIUM',
    "lastMessageAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "direct_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "direct_messages" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "senderId" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "isImportant" BOOLEAN NOT NULL DEFAULT false,
    "isReported" BOOLEAN NOT NULL DEFAULT false,
    "reportedReason" TEXT,
    "reportedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "direct_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_reads" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "message_reads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planning_plans" (
    "id" TEXT NOT NULL,
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
    "progress" INTEGER NOT NULL DEFAULT 0,
    "result" JSONB,
    "userId" UUID,

    CONSTRAINT "PlanningPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planning_tasks" (
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
CREATE TABLE "planning_sub_tasks" (
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
CREATE TABLE "planning_sub_sub_tasks" (
    "id" TEXT NOT NULL,
    "subTaskId" TEXT NOT NULL,
    "mealNumber" INTEGER NOT NULL,
    "mealName" TEXT,
    "mealType" TEXT,
    "status" "PlanningStatus" NOT NULL DEFAULT 'PENDING',
    "result" JSONB,
    "errorMessage" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanningSubSubTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_assignments" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "planType" "CalendarPlanType" NOT NULL,
    "planId" TEXT NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "recurrenceRule" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "calendar_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "execution_metrics" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "decisions" JSONB NOT NULL,
    "outcome" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "planId" TEXT NOT NULL,

    CONSTRAINT "execution_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_projects" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMPTZ(6),
    "endDate" TIMESTAMPTZ(6),
    "color" TEXT,
    "icon" TEXT,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_milestones" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "dueDate" TIMESTAMPTZ(6),
    "order" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_milestone_dependencies" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_milestone_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_tasks" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMPTZ(6),
    "completedAt" TIMESTAMPTZ(6),
    "order" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT,
    "milestoneId" TEXT,
    "parentId" TEXT,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_task_dependencies" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_task_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_habits" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "frequency" "HabitFrequency" NOT NULL DEFAULT 'DAILY',
    "color" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_habits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agenda_habit_logs" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "habitId" TEXT NOT NULL,
    "date" TIMESTAMPTZ(6) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_habit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_steps" (
    "id" TEXT NOT NULL,
    "steps" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "health_steps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_heart_rate" (
    "id" TEXT NOT NULL,
    "bpm" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "health_heart_rate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_active_calories" (
    "id" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "health_active_calories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_weight" (
    "id" TEXT NOT NULL,
    "weight" DECIMAL(5,2) NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "health_weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_workout" (
    "id" TEXT NOT NULL,
    "activityType" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "distance" DECIMAL(8,2),
    "calories" INTEGER,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "source" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "health_workout_pkey" PRIMARY KEY ("id")
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
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,
    "updatedById" UUID,

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
    "userId" UUID,

    CONSTRAINT "user_consents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "InvitationType" NOT NULL DEFAULT 'ONE_TIME',
    "status" "InvitationStatus" NOT NULL DEFAULT 'ACTIVE',
    "maxUses" INTEGER NOT NULL DEFAULT 1,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" UUID,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation_uses" (
    "id" TEXT NOT NULL,
    "invitationId" TEXT NOT NULL,
    "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "invitation_uses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workout_templates" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "workout_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_templates" (
    "id" TEXT NOT NULL,
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
    "userId" UUID,

    CONSTRAINT "nutrition_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "meal" JSONB NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "meal_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_flags" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(128) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "strategy" "RolloutStrategy" NOT NULL DEFAULT 'ALL',
    "config" JSONB,
    "metadata" JSONB,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_flag_metrics" (
    "id" TEXT NOT NULL,
    "flagKey" TEXT NOT NULL,
    "userId" TEXT,
    "event" "FlagEventType" NOT NULL,
    "value" BOOLEAN,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feature_flag_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_flag_feedback" (
    "id" TEXT NOT NULL,
    "flagKey" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID,

    CONSTRAINT "feature_flag_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_api_keys" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'openrouter',
    "keyLabel" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "status" "ApiKeyStatus" NOT NULL DEFAULT 'ACTIVE',
    "stripePaymentIntentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "user_api_keys_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "agenda_project_milestones" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "project_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "due_date" DATE,
    "completed" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_project_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneagenda_habit_logs" (
    "id" TEXT NOT NULL,
    "habitId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "value" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HabitLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneagenda_habits" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "frequency" "HabitFrequency" NOT NULL DEFAULT 'DAILY',
    "targetDays" INTEGER[],
    "color" TEXT,
    "icon" TEXT,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneagenda_milestone_dependencies" (
    "id" TEXT NOT NULL,
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MilestoneDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneagenda_milestones" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneagenda_projects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'ACTIVE',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "color" TEXT DEFAULT '#3B82F6',
    "icon" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" UUID,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneagenda_task_dependencies" (
    "id" TEXT NOT NULL,
    "blockerId" TEXT NOT NULL,
    "blockedId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaskDependency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneagenda_tasks" (
    "id" TEXT NOT NULL,
    "projectId" TEXT,
    "milestoneId" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL DEFAULT 'TODO',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parentId" TEXT,
    "userId" UUID,
    "goalId" TEXT,
    "estimatedMinutes" INTEGER DEFAULT 30,
    "actualMinutes" INTEGER,
    "complexity" TEXT DEFAULT 'MODERATE',
    "confidence" DECIMAL DEFAULT 0.5,
    "deadline" TIMESTAMPTZ(6),
    "scheduledStart" TIMESTAMPTZ(6),
    "scheduledEnd" TIMESTAMPTZ(6),
    "blockedBy" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dependencies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "context" JSONB DEFAULT '{}',
    "createdBy" UUID,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_memories" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "memory" JSONB NOT NULL DEFAULT '{}',
    "version" INTEGER NOT NULL DEFAULT 1,
    "lastAnalyzedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_memories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_memory_timeline" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "eventType" TEXT NOT NULL,
    "domain" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "data" JSONB,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_memoriesId" TEXT,

    CONSTRAINT "user_memory_timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_memory_versions" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "memory" JSONB NOT NULL,
    "changeType" TEXT NOT NULL,
    "changeNote" TEXT,
    "changedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_memoriesId" TEXT,

    CONSTRAINT "user_memory_versions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

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
CREATE INDEX "users_betaEnabled_idx" ON "users"("betaEnabled");

-- CreateIndex
CREATE INDEX "idx_users_created" ON "users"("createdAt");

-- CreateIndex
CREATE INDEX "idx_users_role_status" ON "users"("role", "status");

-- CreateIndex
CREATE INDEX "users_invitationId_idx" ON "users"("invitationId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "password_reset_tokens_token_idx" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "password_reset_tokens_expiresAt_idx" ON "password_reset_tokens"("expiresAt");

-- CreateIndex
CREATE INDEX "password_reset_tokens_userId_idx" ON "password_reset_tokens"("userId");

-- CreateIndex
CREATE INDEX "ai_config_history_createdAt_idx" ON "ai_config_history"("createdAt");

-- CreateIndex
CREATE INDEX "ai_config_history_operationType_idx" ON "ai_config_history"("operationType");

-- CreateIndex
CREATE INDEX "ai_operation_configs_isActive_idx" ON "ai_operation_configs"("isActive");

-- CreateIndex
CREATE INDEX "ai_operation_configs_operationType_idx" ON "ai_operation_configs"("operationType");

-- CreateIndex
CREATE UNIQUE INDEX "ai_operation_configs_operationType_model_key" ON "ai_operation_configs"("operationType", "model");

-- CreateIndex
CREATE UNIQUE INDEX "ai_operation_configs_operationtype_model_key" ON "ai_operation_configs"("operationType", "model");

-- CreateIndex
CREATE UNIQUE INDEX "ai_provider_configs_provider_key" ON "ai_provider_configs"("provider");

-- CreateIndex
CREATE UNIQUE INDEX "ai_framework_configs_feature_key" ON "ai_framework_configs"("feature");

-- CreateIndex
CREATE INDEX "ai_framework_configs_feature_idx" ON "ai_framework_configs"("feature");

-- CreateIndex
CREATE INDEX "ai_framework_configs_isEnabled_idx" ON "ai_framework_configs"("isEnabled");

-- CreateIndex
CREATE INDEX "ai_framework_config_history_feature_idx" ON "ai_framework_config_history"("feature");

-- CreateIndex
CREATE INDEX "ai_framework_config_history_createdAt_idx" ON "ai_framework_config_history"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ai_system_prompts_agentId_key" ON "ai_system_prompts"("agentId");

-- CreateIndex
CREATE INDEX "ai_system_prompts_agentCategory_idx" ON "ai_system_prompts"("agentCategory");

-- CreateIndex
CREATE INDEX "ai_system_prompts_isActive_idx" ON "ai_system_prompts"("isActive");

-- CreateIndex
CREATE INDEX "ai_system_prompts_agentId_idx" ON "ai_system_prompts"("agentId");

-- CreateIndex
CREATE INDEX "ai_system_prompt_history_promptId_idx" ON "ai_system_prompt_history"("promptId");

-- CreateIndex
CREATE INDEX "ai_system_prompt_history_createdAt_idx" ON "ai_system_prompt_history"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "ai_external_models_modelId_key" ON "ai_external_models"("modelId");

-- CreateIndex
CREATE INDEX "ai_external_models_provider_idx" ON "ai_external_models"("provider");

-- CreateIndex
CREATE INDEX "ai_external_models_isActive_idx" ON "ai_external_models"("isActive");

-- CreateIndex
CREATE INDEX "ai_chat_models_isActive_idx" ON "ai_chat_models"("isActive");

-- CreateIndex
CREATE INDEX "ai_chat_models_isDefault_idx" ON "ai_chat_models"("isDefault");

-- CreateIndex
CREATE INDEX "ai_chat_models_provider_idx" ON "ai_chat_models"("provider");

-- CreateIndex
CREATE INDEX "ai_chat_models_sortOrder_idx" ON "ai_chat_models"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ai_chat_models_provider_modelId_key" ON "ai_chat_models"("provider", "modelId");

-- CreateIndex
CREATE UNIQUE INDEX "ai_chat_feature_configs_feature_key" ON "ai_chat_feature_configs"("feature");

-- CreateIndex
CREATE INDEX "ai_chat_feature_configs_isEnabled_idx" ON "ai_chat_feature_configs"("isEnabled");

-- CreateIndex
CREATE INDEX "ai_chat_model_access_role_idx" ON "ai_chat_model_access"("role");

-- CreateIndex
CREATE UNIQUE INDEX "ai_chat_model_access_modelId_role_key" ON "ai_chat_model_access"("modelId", "role");

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
CREATE INDEX "idx_exercise_translations_covering" ON "exercise_translations"("exerciseId", "locale", "name");

-- CreateIndex
CREATE INDEX "idx_exercise_translations_name_trgm" ON "exercise_translations" USING GIN ("name" gin_trgm_ops);

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
CREATE INDEX "exercise_versions_exerciseId_idx" ON "exercise_versions"("exerciseId");

-- CreateIndex
CREATE INDEX "exercise_versions_createdById_idx" ON "exercise_versions"("createdById");

-- CreateIndex
CREATE UNIQUE INDEX "exercise_versions_exerciseId_version_key" ON "exercise_versions"("exerciseId", "version");

-- CreateIndex
CREATE UNIQUE INDEX "exercises_slug_key" ON "exercises"("slug");

-- CreateIndex
CREATE INDEX "exercises_approvalStatus_idx" ON "exercises"("approvalStatus");

-- CreateIndex
CREATE INDEX "exercises_createdAt_idx" ON "exercises"("createdAt");

-- CreateIndex
CREATE INDEX "exercises_exerciseTypeId_idx" ON "exercises"("exerciseTypeId");

-- CreateIndex
CREATE INDEX "idx_exercises_approval_created" ON "exercises"("approvalStatus", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "exercises_approvedById_idx" ON "exercises"("approvedById");

-- CreateIndex
CREATE INDEX "exercises_createdById_idx" ON "exercises"("createdById");

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
CREATE INDEX "idx_workout_programs_user_created" ON "workout_programs"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "idx_workout_programs_user_status" ON "workout_programs"("userId", "status");

-- CreateIndex
CREATE INDEX "workout_programs_userId_idx" ON "workout_programs"("userId");

-- CreateIndex
CREATE INDEX "idx_workout_programs_metadata_gin" ON "workout_programs" USING GIN ("metadata");

-- CreateIndex
CREATE INDEX "idx_workout_programs_weeks_gin" ON "workout_programs" USING GIN ("weeks");

-- CreateIndex
CREATE INDEX "workout_sessions_programId_idx" ON "workout_sessions"("programId");

-- CreateIndex
CREATE INDEX "workout_sessions_startedAt_idx" ON "workout_sessions"("startedAt");

-- CreateIndex
CREATE INDEX "workout_sessions_completedAt_idx" ON "workout_sessions"("completedAt");

-- CreateIndex
CREATE INDEX "idx_workout_sessions_prog_week_day" ON "workout_sessions"("programId", "weekNumber", "dayNumber");

-- CreateIndex
CREATE INDEX "idx_workout_sessions_user_started" ON "workout_sessions"("userId", "startedAt" DESC);

-- CreateIndex
CREATE INDEX "workout_sessions_userId_idx" ON "workout_sessions"("userId");

-- CreateIndex
CREATE INDEX "idx_workout_sessions_covering" ON "workout_sessions"("programId", "weekNumber", "dayNumber", "startedAt", "completedAt");

-- CreateIndex
CREATE INDEX "idx_workout_sessions_exercises_gin" ON "workout_sessions" USING GIN ("exercises");

-- CreateIndex
CREATE INDEX "exercise_performance_records_exerciseId_idx" ON "exercise_performance_records"("exerciseId");

-- CreateIndex
CREATE INDEX "exercise_performance_records_date_idx" ON "exercise_performance_records"("date");

-- CreateIndex
CREATE INDEX "exercise_performance_records_userId_idx" ON "exercise_performance_records"("userId");

-- CreateIndex
CREATE INDEX "idx_exercise_perf_user_date" ON "exercise_performance_records"("userId", "date" DESC);

-- CreateIndex
CREATE INDEX "idx_exercise_perf_user_exercise" ON "exercise_performance_records"("userId", "exerciseId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_exerciseId_idx" ON "user_one_rep_max"("exerciseId");

-- CreateIndex
CREATE INDEX "idx_user_one_rep_max_user_exercise" ON "user_one_rep_max"("userId", "exerciseId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_userId_idx" ON "user_one_rep_max"("userId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_createdAt_idx" ON "user_one_rep_max_versions"("createdAt");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_exerciseId_idx" ON "user_one_rep_max_versions"("exerciseId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_maxId_idx" ON "user_one_rep_max_versions"("maxId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_userId_idx" ON "user_one_rep_max_versions"("userId");

-- CreateIndex
CREATE INDEX "user_one_rep_max_versions_userOneRepMaxId_idx" ON "user_one_rep_max_versions"("userOneRepMaxId");

-- CreateIndex
CREATE UNIQUE INDEX "user_one_rep_max_versions_maxId_version_key" ON "user_one_rep_max_versions"("maxId", "version");

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
CREATE INDEX "idx_nutrition_plans_user_created" ON "nutrition_plans"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "idx_nutrition_plans_user_status" ON "nutrition_plans"("userId", "status");

-- CreateIndex
CREATE INDEX "nutrition_plans_userId_idx" ON "nutrition_plans"("userId");

-- CreateIndex
CREATE INDEX "idx_nutrition_plans_targetmacros_gin" ON "nutrition_plans" USING GIN ("targetMacros");

-- CreateIndex
CREATE INDEX "idx_nutrition_plans_userprofile_gin" ON "nutrition_plans" USING GIN ("userProfile");

-- CreateIndex
CREATE INDEX "idx_nutrition_plans_weeks_gin" ON "nutrition_plans" USING GIN ("weeks");

-- CreateIndex
CREATE INDEX "nutrition_day_logs_planId_idx" ON "nutrition_day_logs"("planId");

-- CreateIndex
CREATE INDEX "nutrition_day_logs_date_idx" ON "nutrition_day_logs"("date");

-- CreateIndex
CREATE INDEX "idx_nutrition_day_logs_plan_week" ON "nutrition_day_logs"("planId", "weekNumber");

-- CreateIndex
CREATE INDEX "idx_nutrition_day_logs_user_date" ON "nutrition_day_logs"("userId", "date" DESC);

-- CreateIndex
CREATE INDEX "nutrition_day_logs_userId_idx" ON "nutrition_day_logs"("userId");

-- CreateIndex
CREATE INDEX "nutrition_adherence_metrics_planId_idx" ON "nutrition_adherence_metrics"("planId");

-- CreateIndex
CREATE INDEX "nutrition_adherence_metrics_startDate_idx" ON "nutrition_adherence_metrics"("startDate");

-- CreateIndex
CREATE INDEX "idx_nutrition_adherence_plan_week" ON "nutrition_adherence_metrics"("planId", "weekNumber");

-- CreateIndex
CREATE INDEX "nutrition_adherence_metrics_userId_idx" ON "nutrition_adherence_metrics"("userId");

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
CREATE INDEX "food_items_createdAt_idx" ON "food_items"("createdAt");

-- CreateIndex
CREATE INDEX "food_items_createdAt_name_idx" ON "food_items"("createdAt", "name");

-- CreateIndex
CREATE INDEX "idx_food_items_covering" ON "food_items"("id", "name", "nameNormalized", "proteinPct", "carbPct", "fatPct");

-- CreateIndex
CREATE INDEX "idx_food_items_macros_gin" ON "food_items" USING GIN ("macrosPer100g");

-- CreateIndex
CREATE INDEX "idx_food_items_metadata_gin" ON "food_items" USING GIN ("metadata");

-- CreateIndex
CREATE INDEX "idx_food_items_name_normalized_trgm" ON "food_items" USING GIN ("nameNormalized" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "idx_food_items_name_trgm" ON "food_items" USING GIN ("name" gin_trgm_ops);

-- CreateIndex
CREATE INDEX "food_item_translations_foodItemId_idx" ON "food_item_translations"("foodItemId");

-- CreateIndex
CREATE INDEX "food_item_translations_locale_idx" ON "food_item_translations"("locale");

-- CreateIndex
CREATE INDEX "idx_food_item_translations_name_trgm" ON "food_item_translations" USING GIN ("name" gin_trgm_ops);

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
CREATE UNIQUE INDEX "user_profiles_userid_key" ON "user_profiles"("userId");

-- CreateIndex
CREATE INDEX "idx_user_profiles_dietary_restrictions_gin" ON "user_profiles" USING GIN ("dietaryRestrictions");

-- CreateIndex
CREATE INDEX "idx_user_profiles_equipment_gin" ON "user_profiles" USING GIN ("equipment");

-- CreateIndex
CREATE INDEX "idx_user_profiles_nutrition_goals_gin" ON "user_profiles" USING GIN ("nutritionGoals");

-- CreateIndex
CREATE INDEX "idx_user_profiles_workout_goals_gin" ON "user_profiles" USING GIN ("workoutGoals");

-- CreateIndex
CREATE INDEX "body_measurements_date_idx" ON "body_measurements"("date");

-- CreateIndex
CREATE INDEX "body_measurements_userId_idx" ON "body_measurements"("userId");

-- CreateIndex
CREATE INDEX "idx_body_measurements_user_date" ON "body_measurements"("userId", "date" DESC);

-- CreateIndex
CREATE INDEX "user_progress_snapshots_date_idx" ON "user_progress_snapshots"("date");

-- CreateIndex
CREATE INDEX "user_progress_snapshots_userId_idx" ON "user_progress_snapshots"("userId");

-- CreateIndex
CREATE INDEX "user_goals_status_idx" ON "user_goals"("status");

-- CreateIndex
CREATE INDEX "user_goals_deadline_idx" ON "user_goals"("deadline");

-- CreateIndex
CREATE INDEX "idx_user_goals_user_status" ON "user_goals"("userId", "status");

-- CreateIndex
CREATE INDEX "user_goals_userId_idx" ON "user_goals"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_onboarding_progress_userid_key" ON "user_onboarding_progress"("userId");

-- CreateIndex
CREATE INDEX "user_onboarding_progress_isCompleted_idx" ON "user_onboarding_progress"("isCompleted");

-- CreateIndex
CREATE INDEX "user_onboarding_progress_lastInteraction_idx" ON "user_onboarding_progress"("lastInteraction");

-- CreateIndex
CREATE INDEX "user_skills_category_idx" ON "user_skills"("category");

-- CreateIndex
CREATE INDEX "user_skills_isActive_idx" ON "user_skills"("isActive");

-- CreateIndex
CREATE INDEX "user_skills_createdAt_idx" ON "user_skills"("createdAt");

-- CreateIndex
CREATE INDEX "user_skills_userId_idx" ON "user_skills"("userId");

-- CreateIndex
CREATE INDEX "user_workflows_domain_idx" ON "user_workflows"("domain");

-- CreateIndex
CREATE INDEX "user_workflows_isActive_idx" ON "user_workflows"("isActive");

-- CreateIndex
CREATE INDEX "user_workflows_createdAt_idx" ON "user_workflows"("createdAt");

-- CreateIndex
CREATE INDEX "user_workflows_userId_idx" ON "user_workflows"("userId");

-- CreateIndex
CREATE INDEX "workflow_nodes_workflowId_idx" ON "workflow_nodes"("workflowId");

-- CreateIndex
CREATE INDEX "workflow_nodes_type_idx" ON "workflow_nodes"("type");

-- CreateIndex
CREATE INDEX "workflow_edges_workflowId_idx" ON "workflow_edges"("workflowId");

-- CreateIndex
CREATE INDEX "workflow_edges_sourceId_idx" ON "workflow_edges"("sourceId");

-- CreateIndex
CREATE INDEX "workflow_edges_targetId_idx" ON "workflow_edges"("targetId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripePaymentId_key" ON "payments"("stripePaymentId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripePaymentIntentId_key" ON "payments"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "payments_createdAt_idx" ON "payments"("createdAt");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payments_stripePaymentIntentId_idx" ON "payments"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "idx_payments_metadata_gin" ON "payments" USING GIN ("metadata");

-- CreateIndex
CREATE INDEX "idx_payments_user_created" ON "payments"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "idx_payments_user_status" ON "payments"("userId", "status");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "payments_subscriptionId_idx" ON "payments"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_stripeSubscriptionId_key" ON "subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "subscriptions_status_idx" ON "subscriptions"("status");

-- CreateIndex
CREATE INDEX "subscriptions_stripeSubscriptionId_idx" ON "subscriptions"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "idx_subscriptions_user_status" ON "subscriptions"("userId", "status");

-- CreateIndex
CREATE INDEX "subscriptions_userId_idx" ON "subscriptions"("userId");

-- CreateIndex
CREATE INDEX "credit_transactions_createdAt_idx" ON "credit_transactions"("createdAt");

-- CreateIndex
CREATE INDEX "credit_transactions_type_idx" ON "credit_transactions"("type");

-- CreateIndex
CREATE INDEX "credit_transactions_userId_idx" ON "credit_transactions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "promotions_code_key" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "promotions_code_idx" ON "promotions"("code");

-- CreateIndex
CREATE INDEX "promotions_isActive_idx" ON "promotions"("isActive");

-- CreateIndex
CREATE INDEX "promotions_validFrom_idx" ON "promotions"("validFrom");

-- CreateIndex
CREATE INDEX "promotions_validUntil_idx" ON "promotions"("validUntil");

-- CreateIndex
CREATE INDEX "promotions_type_idx" ON "promotions"("type");

-- CreateIndex
CREATE INDEX "promotions_createdAt_idx" ON "promotions"("createdAt");

-- CreateIndex
CREATE INDEX "promotion_uses_promotionId_idx" ON "promotion_uses"("promotionId");

-- CreateIndex
CREATE INDEX "promotion_uses_paymentId_idx" ON "promotion_uses"("paymentId");

-- CreateIndex
CREATE INDEX "promotion_uses_appliedAt_idx" ON "promotion_uses"("appliedAt");

-- CreateIndex
CREATE INDEX "promotion_uses_userId_idx" ON "promotion_uses"("userId");

-- CreateIndex
CREATE INDEX "affiliate_program_levels_programId_idx" ON "affiliate_program_levels"("programId");

-- CreateIndex
CREATE UNIQUE INDEX "affiliate_program_levels_programId_level_key" ON "affiliate_program_levels"("programId", "level");

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_code_key" ON "referral_codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "referral_codes_userid_key" ON "referral_codes"("userId");

-- CreateIndex
CREATE INDEX "referral_codes_programId_idx" ON "referral_codes"("programId");

-- CreateIndex
CREATE INDEX "referral_attributions_programId_idx" ON "referral_attributions"("programId");

-- CreateIndex
CREATE INDEX "referral_attributions_referralCodeId_idx" ON "referral_attributions"("referralCodeId");

-- CreateIndex
CREATE INDEX "referral_attributions_referredUserId_idx" ON "referral_attributions"("referredUserId");

-- CreateIndex
CREATE INDEX "referral_attributions_referrerUserId_idx" ON "referral_attributions"("referrerUserId");

-- CreateIndex
CREATE INDEX "referral_attributions_parentAttributionId_idx" ON "referral_attributions"("parentAttributionId");

-- CreateIndex
CREATE INDEX "affiliate_rewards_programId_idx" ON "affiliate_rewards"("programId");

-- CreateIndex
CREATE INDEX "affiliate_rewards_attributionId_idx" ON "affiliate_rewards"("attributionId");

-- CreateIndex
CREATE INDEX "affiliate_rewards_status_idx" ON "affiliate_rewards"("status");

-- CreateIndex
CREATE INDEX "idx_affiliate_rewards_metadata_gin" ON "affiliate_rewards" USING GIN ("metadata");

-- CreateIndex
CREATE INDEX "affiliate_rewards_userId_idx" ON "affiliate_rewards"("userId");

-- CreateIndex
CREATE INDEX "payout_audit_log_performedBy_idx" ON "payout_audit_log"("performedBy");

-- CreateIndex
CREATE INDEX "payout_audit_log_action_idx" ON "payout_audit_log"("action");

-- CreateIndex
CREATE INDEX "payout_audit_log_createdAt_idx" ON "payout_audit_log"("createdAt");

-- CreateIndex
CREATE INDEX "idx_payout_audit_log_rewardids_gin" ON "payout_audit_log" USING GIN ("rewardIds");

-- CreateIndex
CREATE INDEX "payout_audit_log_userId_idx" ON "payout_audit_log"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_payout_profiles_userid_key" ON "user_payout_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "marketplace_plans_workoutProgramId_key" ON "marketplace_plans"("workoutProgramId");

-- CreateIndex
CREATE UNIQUE INDEX "marketplace_plans_nutritionPlanId_key" ON "marketplace_plans"("nutritionPlanId");

-- CreateIndex
CREATE INDEX "marketplace_plans_planType_idx" ON "marketplace_plans"("planType");

-- CreateIndex
CREATE INDEX "marketplace_plans_isPublished_idx" ON "marketplace_plans"("isPublished");

-- CreateIndex
CREATE INDEX "marketplace_plans_averageRating_idx" ON "marketplace_plans"("averageRating");

-- CreateIndex
CREATE INDEX "idx_marketplace_plans_pub_type" ON "marketplace_plans"("isPublished", "planType");

-- CreateIndex
CREATE INDEX "idx_marketplace_plans_pub_rating" ON "marketplace_plans"("isPublished", "averageRating" DESC);

-- CreateIndex
CREATE INDEX "idx_marketplace_coach_published" ON "marketplace_plans"("coachId", "isPublished");

-- CreateIndex
CREATE INDEX "marketplace_plans_coachId_idx" ON "marketplace_plans"("coachId");

-- CreateIndex
CREATE UNIQUE INDEX "plan_purchases_stripePaymentId_key" ON "plan_purchases"("stripePaymentId");

-- CreateIndex
CREATE INDEX "plan_purchases_marketplacePlanId_idx" ON "plan_purchases"("marketplacePlanId");

-- CreateIndex
CREATE INDEX "plan_purchases_status_idx" ON "plan_purchases"("status");

-- CreateIndex
CREATE INDEX "plan_purchases_purchasedAt_idx" ON "plan_purchases"("purchasedAt");

-- CreateIndex
CREATE INDEX "plan_purchases_userId_idx" ON "plan_purchases"("userId");

-- CreateIndex
CREATE INDEX "plan_ratings_marketplacePlanId_idx" ON "plan_ratings"("marketplacePlanId");

-- CreateIndex
CREATE INDEX "plan_ratings_rating_idx" ON "plan_ratings"("rating");

-- CreateIndex
CREATE INDEX "plan_ratings_userId_idx" ON "plan_ratings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "coach_profiles_userid_key" ON "coach_profiles"("userId");

-- CreateIndex
CREATE INDEX "coach_profiles_verificationStatus_idx" ON "coach_profiles"("verificationStatus");

-- CreateIndex
CREATE INDEX "coach_profiles_isPubliclyVisible_idx" ON "coach_profiles"("isPubliclyVisible");

-- CreateIndex
CREATE INDEX "coach_vetting_requests_status_idx" ON "coach_vetting_requests"("status");

-- CreateIndex
CREATE INDEX "coach_vetting_requests_userId_idx" ON "coach_vetting_requests"("userId");

-- CreateIndex
CREATE INDEX "conversations_createdAt_idx" ON "conversations"("createdAt");

-- CreateIndex
CREATE INDEX "conversations_lastMessageAt_idx" ON "conversations"("lastMessageAt");

-- CreateIndex
CREATE INDEX "conversations_userId_idx" ON "conversations"("userId");

-- CreateIndex
CREATE INDEX "idx_conversations_user_lastmsg" ON "conversations"("userId", "lastMessageAt" DESC);

-- CreateIndex
CREATE INDEX "conversation_messages_conversationId_idx" ON "conversation_messages"("conversationId");

-- CreateIndex
CREATE INDEX "conversation_messages_createdAt_idx" ON "conversation_messages"("createdAt");

-- CreateIndex
CREATE INDEX "conversation_messages_sequence_idx" ON "conversation_messages"("sequence");

-- CreateIndex
CREATE INDEX "idx_conversation_messages_conv_seq" ON "conversation_messages"("conversationId", "sequence");

-- CreateIndex
CREATE INDEX "idx_conversation_messages_conv_created" ON "conversation_messages"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "idx_direct_conv_coach_lastmsg" ON "direct_conversations"("coachId", "lastMessageAt" DESC);

-- CreateIndex
CREATE INDEX "idx_direct_conv_athlete_lastmsg" ON "direct_conversations"("athleteId", "lastMessageAt" DESC);

-- CreateIndex
CREATE INDEX "direct_conversations_coachId_idx" ON "direct_conversations"("coachId");

-- CreateIndex
CREATE INDEX "direct_conversations_athleteId_idx" ON "direct_conversations"("athleteId");

-- CreateIndex
CREATE INDEX "direct_conversations_priority_idx" ON "direct_conversations"("priority");

-- CreateIndex
CREATE INDEX "direct_conversations_isMuted_idx" ON "direct_conversations"("isMuted");

-- CreateIndex
CREATE UNIQUE INDEX "direct_conversations_coach_athlete_unique" ON "direct_conversations"("coachId", "athleteId");

-- CreateIndex
CREATE INDEX "idx_direct_msg_conv_created" ON "direct_messages"("conversationId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "direct_messages_conversationId_idx" ON "direct_messages"("conversationId");

-- CreateIndex
CREATE INDEX "direct_messages_senderId_idx" ON "direct_messages"("senderId");

-- CreateIndex
CREATE INDEX "direct_messages_isImportant_idx" ON "direct_messages"("isImportant");

-- CreateIndex
CREATE INDEX "direct_messages_isReported_idx" ON "direct_messages"("isReported");

-- CreateIndex
CREATE INDEX "direct_messages_createdAt_idx" ON "direct_messages"("createdAt");

-- CreateIndex
CREATE INDEX "message_reads_messageId_idx" ON "message_reads"("messageId");

-- CreateIndex
CREATE INDEX "message_reads_userId_idx" ON "message_reads"("userId");

-- CreateIndex
CREATE INDEX "message_reads_readAt_idx" ON "message_reads"("readAt");

-- CreateIndex
CREATE UNIQUE INDEX "message_reads_message_user_unique" ON "message_reads"("messageId", "userId");

-- CreateIndex
CREATE INDEX "idx_planning_plan_agent_status" ON "planning_plans"("agentType", "status");

-- CreateIndex
CREATE INDEX "idx_planningplan_user_agent_status" ON "planning_plans"("userId", "agentType", "status");

-- CreateIndex
CREATE INDEX "idx_planningplan_user_status" ON "planning_plans"("userId", "status");

-- CreateIndex
CREATE INDEX "PlanningPlan_agentType_idx" ON "planning_plans"("agentType");

-- CreateIndex
CREATE INDEX "PlanningPlan_createdAt_idx" ON "planning_plans"("createdAt");

-- CreateIndex
CREATE INDEX "PlanningPlan_status_idx" ON "planning_plans"("status");

-- CreateIndex
CREATE INDEX "PlanningPlan_userId_idx" ON "planning_plans"("userId");

-- CreateIndex
CREATE INDEX "PlanningTask_planId_idx" ON "planning_tasks"("planId");

-- CreateIndex
CREATE INDEX "PlanningTask_status_idx" ON "planning_tasks"("status");

-- CreateIndex
CREATE INDEX "PlanningTask_weekNumber_idx" ON "planning_tasks"("weekNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningTask_planId_weekNumber_key" ON "planning_tasks"("planId", "weekNumber");

-- CreateIndex
CREATE INDEX "PlanningSubTask_dayNumber_idx" ON "planning_sub_tasks"("dayNumber");

-- CreateIndex
CREATE INDEX "PlanningSubTask_status_idx" ON "planning_sub_tasks"("status");

-- CreateIndex
CREATE INDEX "PlanningSubTask_taskId_idx" ON "planning_sub_tasks"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningSubTask_taskId_dayNumber_key" ON "planning_sub_tasks"("taskId", "dayNumber");

-- CreateIndex
CREATE INDEX "PlanningSubSubTask_mealNumber_idx" ON "planning_sub_sub_tasks"("mealNumber");

-- CreateIndex
CREATE INDEX "PlanningSubSubTask_status_idx" ON "planning_sub_sub_tasks"("status");

-- CreateIndex
CREATE INDEX "PlanningSubSubTask_subTaskId_idx" ON "planning_sub_sub_tasks"("subTaskId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanningSubSubTask_subTaskId_mealNumber_key" ON "planning_sub_sub_tasks"("subTaskId", "mealNumber");

-- CreateIndex
CREATE INDEX "calendar_assignments_date_idx" ON "calendar_assignments"("date");

-- CreateIndex
CREATE INDEX "calendar_assignments_planType_idx" ON "calendar_assignments"("planType");

-- CreateIndex
CREATE INDEX "calendar_assignments_userId_idx" ON "calendar_assignments"("userId");

-- CreateIndex
CREATE INDEX "idx_calendar_assignments_user_date" ON "calendar_assignments"("userId", "date");

-- CreateIndex
CREATE INDEX "idx_calendar_assignments_user_plantype_date" ON "calendar_assignments"("userId", "planType", "date");

-- CreateIndex
CREATE INDEX "execution_metrics_planId_idx" ON "execution_metrics"("planId");

-- CreateIndex
CREATE INDEX "execution_metrics_domain_idx" ON "execution_metrics"("domain");

-- CreateIndex
CREATE INDEX "execution_metrics_timestamp_idx" ON "execution_metrics"("timestamp");

-- CreateIndex
CREATE INDEX "execution_metrics_createdAt_idx" ON "execution_metrics"("createdAt");

-- CreateIndex
CREATE INDEX "idx_agenda_projects_status" ON "agenda_projects"("status");

-- CreateIndex
CREATE INDEX "idx_agenda_projects_user" ON "agenda_projects"("userId");

-- CreateIndex
CREATE INDEX "idx_agenda_milestones_project" ON "agenda_milestones"("projectId");

-- CreateIndex
CREATE INDEX "idx_agenda_milestone_dep_blocked" ON "agenda_milestone_dependencies"("blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "uq_agenda_milestone_dep" ON "agenda_milestone_dependencies"("blockerId", "blockedId");

-- CreateIndex
CREATE INDEX "idx_agenda_tasks_milestone" ON "agenda_tasks"("milestoneId");

-- CreateIndex
CREATE INDEX "idx_agenda_tasks_parent" ON "agenda_tasks"("parentId");

-- CreateIndex
CREATE INDEX "idx_agenda_tasks_project" ON "agenda_tasks"("projectId");

-- CreateIndex
CREATE INDEX "idx_agenda_tasks_user" ON "agenda_tasks"("userId");

-- CreateIndex
CREATE INDEX "idx_agenda_task_dep_blocked" ON "agenda_task_dependencies"("blockedId");

-- CreateIndex
CREATE UNIQUE INDEX "uq_agenda_task_dep" ON "agenda_task_dependencies"("blockerId", "blockedId");

-- CreateIndex
CREATE INDEX "idx_agenda_habits_archived" ON "agenda_habits"("archived");

-- CreateIndex
CREATE INDEX "idx_agenda_habits_user" ON "agenda_habits"("userId");

-- CreateIndex
CREATE INDEX "idx_agenda_habit_logs_date" ON "agenda_habit_logs"("date");

-- CreateIndex
CREATE INDEX "idx_agenda_habit_logs_habit" ON "agenda_habit_logs"("habitId");

-- CreateIndex
CREATE UNIQUE INDEX "uq_agenda_habit_logs_habit_date" ON "agenda_habit_logs"("habitId", "date");

-- CreateIndex
CREATE INDEX "health_steps_date_idx" ON "health_steps"("date");

-- CreateIndex
CREATE INDEX "health_steps_userId_idx" ON "health_steps"("userId");

-- CreateIndex
CREATE INDEX "idx_health_steps_user_date" ON "health_steps"("userId", "date" DESC);

-- CreateIndex
CREATE INDEX "health_heart_rate_recordedAt_idx" ON "health_heart_rate"("recordedAt");

-- CreateIndex
CREATE INDEX "health_heart_rate_userId_idx" ON "health_heart_rate"("userId");

-- CreateIndex
CREATE INDEX "idx_health_heart_rate_user_recorded" ON "health_heart_rate"("userId", "recordedAt" DESC);

-- CreateIndex
CREATE INDEX "health_active_calories_date_idx" ON "health_active_calories"("date");

-- CreateIndex
CREATE INDEX "health_active_calories_userId_idx" ON "health_active_calories"("userId");

-- CreateIndex
CREATE INDEX "idx_health_active_calories_user_date" ON "health_active_calories"("userId", "date" DESC);

-- CreateIndex
CREATE INDEX "health_weight_recordedAt_idx" ON "health_weight"("recordedAt");

-- CreateIndex
CREATE INDEX "health_weight_userId_idx" ON "health_weight"("userId");

-- CreateIndex
CREATE INDEX "idx_health_weight_user_recorded" ON "health_weight"("userId", "recordedAt" DESC);

-- CreateIndex
CREATE INDEX "health_workout_startDate_idx" ON "health_workout"("startDate");

-- CreateIndex
CREATE INDEX "health_workout_activityType_idx" ON "health_workout"("activityType");

-- CreateIndex
CREATE INDEX "health_workout_userId_idx" ON "health_workout"("userId");

-- CreateIndex
CREATE INDEX "idx_health_workout_user_start" ON "health_workout"("userId", "startDate" DESC);

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
CREATE INDEX "policies_updatedById_idx" ON "policies"("updatedById");

-- CreateIndex
CREATE INDEX "policy_history_policyId_idx" ON "policy_history"("policyId");

-- CreateIndex
CREATE INDEX "policy_history_createdAt_idx" ON "policy_history"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "policy_history_policyId_version_key" ON "policy_history"("policyId", "version");

-- CreateIndex
CREATE INDEX "user_consents_policyId_idx" ON "user_consents"("policyId");

-- CreateIndex
CREATE INDEX "user_consents_policyType_idx" ON "user_consents"("policyType");

-- CreateIndex
CREATE INDEX "user_consents_consentedAt_idx" ON "user_consents"("consentedAt");

-- CreateIndex
CREATE INDEX "user_consents_userId_idx" ON "user_consents"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "invitations_code_key" ON "invitations"("code");

-- CreateIndex
CREATE INDEX "invitations_code_idx" ON "invitations"("code");

-- CreateIndex
CREATE INDEX "invitations_status_idx" ON "invitations"("status");

-- CreateIndex
CREATE INDEX "invitations_createdById_idx" ON "invitations"("createdById");

-- CreateIndex
CREATE INDEX "invitation_uses_invitationId_idx" ON "invitation_uses"("invitationId");

-- CreateIndex
CREATE INDEX "invitation_uses_userId_idx" ON "invitation_uses"("userId");

-- CreateIndex
CREATE INDEX "workout_templates_type_idx" ON "workout_templates"("type");

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
CREATE INDEX "idx_workout_templates_user_category" ON "workout_templates"("userId", "category");

-- CreateIndex
CREATE INDEX "idx_workout_templates_user_type" ON "workout_templates"("userId", "type");

-- CreateIndex
CREATE INDEX "workout_templates_userId_idx" ON "workout_templates"("userId");

-- CreateIndex
CREATE INDEX "nutrition_templates_type_idx" ON "nutrition_templates"("type");

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
CREATE INDEX "idx_nutrition_templates_user_category" ON "nutrition_templates"("userId", "category");

-- CreateIndex
CREATE INDEX "idx_nutrition_templates_user_type" ON "nutrition_templates"("userId", "type");

-- CreateIndex
CREATE INDEX "nutrition_templates_userId_idx" ON "nutrition_templates"("userId");

-- CreateIndex
CREATE INDEX "meal_templates_createdAt_idx" ON "meal_templates"("createdAt");

-- CreateIndex
CREATE INDEX "meal_templates_userId_idx" ON "meal_templates"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "feature_flags_key_key" ON "feature_flags"("key");

-- CreateIndex
CREATE INDEX "feature_flags_key_idx" ON "feature_flags"("key");

-- CreateIndex
CREATE INDEX "feature_flags_enabled_idx" ON "feature_flags"("enabled");

-- CreateIndex
CREATE INDEX "feature_flags_strategy_idx" ON "feature_flags"("strategy");

-- CreateIndex
CREATE INDEX "feature_flags_createdAt_idx" ON "feature_flags"("createdAt");

-- CreateIndex
CREATE INDEX "feature_flag_metrics_flagKey_idx" ON "feature_flag_metrics"("flagKey");

-- CreateIndex
CREATE INDEX "feature_flag_metrics_userId_idx" ON "feature_flag_metrics"("userId");

-- CreateIndex
CREATE INDEX "feature_flag_metrics_event_idx" ON "feature_flag_metrics"("event");

-- CreateIndex
CREATE INDEX "feature_flag_metrics_timestamp_idx" ON "feature_flag_metrics"("timestamp");

-- CreateIndex
CREATE INDEX "feature_flag_feedback_flagKey_idx" ON "feature_flag_feedback"("flagKey");

-- CreateIndex
CREATE INDEX "feature_flag_feedback_rating_idx" ON "feature_flag_feedback"("rating");

-- CreateIndex
CREATE INDEX "feature_flag_feedback_createdAt_idx" ON "feature_flag_feedback"("createdAt");

-- CreateIndex
CREATE INDEX "feature_flag_feedback_userId_idx" ON "feature_flag_feedback"("userId");

-- CreateIndex
CREATE INDEX "user_api_keys_stripePaymentIntentId_idx" ON "user_api_keys"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "user_api_keys_status_idx" ON "user_api_keys"("status");

-- CreateIndex
CREATE INDEX "user_api_keys_provider_idx" ON "user_api_keys"("provider");

-- CreateIndex
CREATE INDEX "user_api_keys_userId_idx" ON "user_api_keys"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "daily_metrics_date_key" ON "daily_metrics"("date");

-- CreateIndex
CREATE INDEX "daily_metrics_date_idx" ON "daily_metrics"("date");

-- CreateIndex
CREATE INDEX "idx_agenda_project_milestones_project" ON "agenda_project_milestones"("project_id");

-- CreateIndex
CREATE INDEX "HabitLog_date_idx" ON "oneagenda_habit_logs"("date");

-- CreateIndex
CREATE INDEX "HabitLog_habitId_idx" ON "oneagenda_habit_logs"("habitId");

-- CreateIndex
CREATE INDEX "idx_habitlog_habit_date" ON "oneagenda_habit_logs"("habitId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "HabitLog_habitId_date_key" ON "oneagenda_habit_logs"("habitId", "date");

-- CreateIndex
CREATE INDEX "Habit_archived_idx" ON "oneagenda_habits"("archived");

-- CreateIndex
CREATE INDEX "Habit_userId_idx" ON "oneagenda_habits"("userId");

-- CreateIndex
CREATE INDEX "idx_habit_user_archived" ON "oneagenda_habits"("userId", "archived");

-- CreateIndex
CREATE INDEX "MilestoneDependency_blockedId_idx" ON "oneagenda_milestone_dependencies"("blockedId");

-- CreateIndex
CREATE INDEX "MilestoneDependency_blockerId_idx" ON "oneagenda_milestone_dependencies"("blockerId");

-- CreateIndex
CREATE UNIQUE INDEX "MilestoneDependency_blockerId_blockedId_key" ON "oneagenda_milestone_dependencies"("blockerId", "blockedId");

-- CreateIndex
CREATE INDEX "Milestone_projectId_idx" ON "oneagenda_milestones"("projectId");

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "oneagenda_projects"("status");

-- CreateIndex
CREATE INDEX "Project_userId_idx" ON "oneagenda_projects"("userId");

-- CreateIndex
CREATE INDEX "TaskDependency_blockedId_idx" ON "oneagenda_task_dependencies"("blockedId");

-- CreateIndex
CREATE INDEX "TaskDependency_blockerId_idx" ON "oneagenda_task_dependencies"("blockerId");

-- CreateIndex
CREATE UNIQUE INDEX "TaskDependency_blockerId_blockedId_key" ON "oneagenda_task_dependencies"("blockerId", "blockedId");

-- CreateIndex
CREATE INDEX "Task_dueDate_idx" ON "oneagenda_tasks"("dueDate");

-- CreateIndex
CREATE INDEX "Task_milestoneId_idx" ON "oneagenda_tasks"("milestoneId");

-- CreateIndex
CREATE INDEX "Task_parentId_idx" ON "oneagenda_tasks"("parentId");

-- CreateIndex
CREATE INDEX "Task_projectId_idx" ON "oneagenda_tasks"("projectId");

-- CreateIndex
CREATE INDEX "Task_status_idx" ON "oneagenda_tasks"("status");

-- CreateIndex
CREATE INDEX "Task_userId_idx" ON "oneagenda_tasks"("userId");

-- CreateIndex
CREATE INDEX "idx_oneagenda_tasks_deadline" ON "oneagenda_tasks"("deadline");

-- CreateIndex
CREATE INDEX "idx_oneagenda_tasks_goal" ON "oneagenda_tasks"("goalId");

-- CreateIndex
CREATE INDEX "idx_oneagenda_tasks_user" ON "oneagenda_tasks"("userId");

-- CreateIndex
CREATE INDEX "idx_task_project_order" ON "oneagenda_tasks"("projectId", "order");

-- CreateIndex
CREATE INDEX "idx_task_project_status" ON "oneagenda_tasks"("projectId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "user_memories_userid_key" ON "user_memories"("userId");

-- CreateIndex
CREATE INDEX "idx_user_memories_last_analyzed_at" ON "user_memories"("lastAnalyzedAt");

-- CreateIndex
CREATE INDEX "idx_user_memories_memory_gin" ON "user_memories" USING GIN ("memory" jsonb_path_ops);

-- CreateIndex
CREATE INDEX "idx_user_memories_updated_at" ON "user_memories"("updatedAt");

-- CreateIndex
CREATE INDEX "idx_user_memories_userid" ON "user_memories"("userId");

-- CreateIndex
CREATE INDEX "idx_user_memory_timeline_domain" ON "user_memory_timeline"("domain");

-- CreateIndex
CREATE INDEX "idx_user_memory_timeline_eventtype" ON "user_memory_timeline"("eventType");

-- CreateIndex
CREATE INDEX "idx_user_memory_timeline_user_memoriesid" ON "user_memory_timeline"("user_memoriesId");

-- CreateIndex
CREATE INDEX "idx_user_memory_timeline_userid" ON "user_memory_timeline"("userId");

-- CreateIndex
CREATE INDEX "idx_user_memory_timeline_userid_date" ON "user_memory_timeline"("userId", "date");

-- CreateIndex
CREATE INDEX "idx_user_memory_versions_createdat" ON "user_memory_versions"("createdAt");

-- CreateIndex
CREATE INDEX "idx_user_memory_versions_user_memoriesid" ON "user_memory_versions"("user_memoriesId");

-- CreateIndex
CREATE INDEX "idx_user_memory_versions_userid" ON "user_memory_versions"("userId");

-- CreateIndex
CREATE INDEX "idx_user_memory_versions_userid_version" ON "user_memory_versions"("userId", "versionNumber");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "password_reset_tokens" ADD CONSTRAINT "password_reset_tokens_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_system_prompt_history" ADD CONSTRAINT "ai_system_prompt_history_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "ai_system_prompts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_chat_model_access" ADD CONSTRAINT "ai_chat_model_access_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "ai_chat_models"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_part_translations" ADD CONSTRAINT "body_part_translations_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "body_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "exercise_versions" ADD CONSTRAINT "exercise_versions_createdbyid_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_versions" ADD CONSTRAINT "exercise_versions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_approvedbyid_fkey" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_createdbyid_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_exerciseTypeId_fkey" FOREIGN KEY ("exerciseTypeId") REFERENCES "exercise_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muscle_translations" ADD CONSTRAINT "muscle_translations_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_goal_translations" ADD CONSTRAINT "workout_goal_translations_workoutGoalId_fkey" FOREIGN KEY ("workoutGoalId") REFERENCES "workout_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_program_versions" ADD CONSTRAINT "workout_program_versions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_programs" ADD CONSTRAINT "workout_programs_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "workout_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_one_rep_max" ADD CONSTRAINT "user_one_rep_max_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_one_rep_max" ADD CONSTRAINT "user_one_rep_max_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_one_rep_max_versions" ADD CONSTRAINT "user_one_rep_max_versions_userOneRepMaxId_fkey" FOREIGN KEY ("userOneRepMaxId") REFERENCES "user_one_rep_max"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_plan_versions" ADD CONSTRAINT "nutrition_plan_versions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_plans" ADD CONSTRAINT "nutrition_plans_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_day_logs" ADD CONSTRAINT "nutrition_day_logs_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_day_logs" ADD CONSTRAINT "nutrition_day_logs_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_adherence_metrics" ADD CONSTRAINT "nutrition_adherence_metrics_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_adherence_metrics" ADD CONSTRAINT "nutrition_adherence_metrics_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_goal_translations" ADD CONSTRAINT "nutrition_goal_translations_nutritionGoalId_fkey" FOREIGN KEY ("nutritionGoalId") REFERENCES "nutrition_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_items" ADD CONSTRAINT "food_items_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "food_brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_item_translations" ADD CONSTRAINT "food_item_translations_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_item_categories" ADD CONSTRAINT "food_item_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "food_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_item_categories" ADD CONSTRAINT "food_item_categories_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "body_measurements" ADD CONSTRAINT "body_measurements_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress_snapshots" ADD CONSTRAINT "user_progress_snapshots_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_onboarding_progress" ADD CONSTRAINT "user_onboarding_progress_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workflows" ADD CONSTRAINT "user_workflows_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_nodes" ADD CONSTRAINT "workflow_nodes_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "user_workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_edges" ADD CONSTRAINT "workflow_edges_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "workflow_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_edges" ADD CONSTRAINT "workflow_edges_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "workflow_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflow_edges" ADD CONSTRAINT "workflow_edges_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "user_workflows"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "credit_transactions" ADD CONSTRAINT "credit_transactions_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_program_levels" ADD CONSTRAINT "affiliate_program_levels_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_parentAttributionId_fkey" FOREIGN KEY ("parentAttributionId") REFERENCES "referral_attributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referralCodeId_fkey" FOREIGN KEY ("referralCodeId") REFERENCES "referral_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referreduserid_fkey" FOREIGN KEY ("referredUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referreruserid_fkey" FOREIGN KEY ("referrerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_attributionId_fkey" FOREIGN KEY ("attributionId") REFERENCES "referral_attributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payout_audit_log" ADD CONSTRAINT "payout_audit_log_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_payout_profiles" ADD CONSTRAINT "user_payout_profiles_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_coachid_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_nutritionPlanId_fkey" FOREIGN KEY ("nutritionPlanId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_workoutProgramId_fkey" FOREIGN KEY ("workoutProgramId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_purchases" ADD CONSTRAINT "plan_purchases_marketplacePlanId_fkey" FOREIGN KEY ("marketplacePlanId") REFERENCES "marketplace_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_purchases" ADD CONSTRAINT "plan_purchases_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_ratings" ADD CONSTRAINT "plan_ratings_marketplacePlanId_fkey" FOREIGN KEY ("marketplacePlanId") REFERENCES "marketplace_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plan_ratings" ADD CONSTRAINT "plan_ratings_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_profiles" ADD CONSTRAINT "coach_profiles_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coach_vetting_requests" ADD CONSTRAINT "coach_vetting_requests_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conversation_messages" ADD CONSTRAINT "conversation_messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_conversations" ADD CONSTRAINT "direct_conversations_athleteid_fkey" FOREIGN KEY ("athleteId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_conversations" ADD CONSTRAINT "direct_conversations_coachid_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_conversationid_fkey" FOREIGN KEY ("conversationId") REFERENCES "direct_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "direct_messages" ADD CONSTRAINT "direct_messages_senderid_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_reads" ADD CONSTRAINT "message_reads_messageid_fkey" FOREIGN KEY ("messageId") REFERENCES "direct_messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_reads" ADD CONSTRAINT "message_reads_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_plans" ADD CONSTRAINT "PlanningPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_tasks" ADD CONSTRAINT "PlanningTask_planId_fkey" FOREIGN KEY ("planId") REFERENCES "planning_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_sub_tasks" ADD CONSTRAINT "PlanningSubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "planning_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planning_sub_sub_tasks" ADD CONSTRAINT "PlanningSubSubTask_subTaskId_fkey" FOREIGN KEY ("subTaskId") REFERENCES "planning_sub_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_assignments" ADD CONSTRAINT "calendar_assignments_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "execution_metrics" ADD CONSTRAINT "execution_metrics_planId_fkey" FOREIGN KEY ("planId") REFERENCES "planning_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agenda_milestones" ADD CONSTRAINT "agenda_milestones_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "agenda_projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenda_milestone_dependencies" ADD CONSTRAINT "agenda_milestone_dependencies_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "agenda_milestones"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenda_milestone_dependencies" ADD CONSTRAINT "agenda_milestone_dependencies_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "agenda_milestones"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenda_tasks" ADD CONSTRAINT "agenda_tasks_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "agenda_milestones"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenda_tasks" ADD CONSTRAINT "agenda_tasks_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "agenda_tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenda_tasks" ADD CONSTRAINT "agenda_tasks_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "agenda_projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenda_task_dependencies" ADD CONSTRAINT "agenda_task_dependencies_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "agenda_tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenda_task_dependencies" ADD CONSTRAINT "agenda_task_dependencies_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "agenda_tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "agenda_habit_logs" ADD CONSTRAINT "agenda_habit_logs_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "agenda_habits"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "health_steps" ADD CONSTRAINT "health_steps_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_heart_rate" ADD CONSTRAINT "health_heart_rate_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_active_calories" ADD CONSTRAINT "health_active_calories_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_weight" ADD CONSTRAINT "health_weight_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_workout" ADD CONSTRAINT "health_workout_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_createdbyid_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policies" ADD CONSTRAINT "policies_updatedbyid_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "policy_history" ADD CONSTRAINT "policy_history_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_createdbyid_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_uses" ADD CONSTRAINT "invitation_uses_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitation_uses" ADD CONSTRAINT "invitation_uses_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_templates" ADD CONSTRAINT "nutrition_templates_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_templates" ADD CONSTRAINT "meal_templates_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature_flag_metrics" ADD CONSTRAINT "feature_flag_metrics_flagKey_fkey" FOREIGN KEY ("flagKey") REFERENCES "feature_flags"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feature_flag_feedback" ADD CONSTRAINT "feature_flag_feedback_flagKey_fkey" FOREIGN KEY ("flagKey") REFERENCES "feature_flags"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_api_keys" ADD CONSTRAINT "user_api_keys_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_habit_logs" ADD CONSTRAINT "oneagenda_habitlog_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "oneagenda_habits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_habits" ADD CONSTRAINT "oneagenda_habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_milestone_dependencies" ADD CONSTRAINT "oneagenda_mildep_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "oneagenda_milestones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_milestone_dependencies" ADD CONSTRAINT "oneagenda_mildep_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "oneagenda_milestones"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_milestones" ADD CONSTRAINT "oneagenda_milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "oneagenda_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_projects" ADD CONSTRAINT "oneagenda_project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_task_dependencies" ADD CONSTRAINT "oneagenda_taskdep_blockedId_fkey" FOREIGN KEY ("blockedId") REFERENCES "oneagenda_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_task_dependencies" ADD CONSTRAINT "oneagenda_taskdep_blockerId_fkey" FOREIGN KEY ("blockerId") REFERENCES "oneagenda_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_tasks" ADD CONSTRAINT "oneagenda_task_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "oneagenda_milestones"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_tasks" ADD CONSTRAINT "oneagenda_task_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "oneagenda_tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_tasks" ADD CONSTRAINT "oneagenda_task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "oneagenda_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "oneagenda_tasks" ADD CONSTRAINT "oneagenda_task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_memories" ADD CONSTRAINT "user_memories_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_memory_timeline" ADD CONSTRAINT "user_memory_timeline_user_memoriesId_fkey" FOREIGN KEY ("user_memoriesId") REFERENCES "user_memories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_memory_timeline" ADD CONSTRAINT "user_memory_timeline_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_memory_versions" ADD CONSTRAINT "user_memory_versions_user_memoriesId_fkey" FOREIGN KEY ("user_memoriesId") REFERENCES "user_memories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_memory_versions" ADD CONSTRAINT "user_memory_versions_userid_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

