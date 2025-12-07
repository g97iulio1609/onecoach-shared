-- =============================================================================
-- OneCoach Database - Remaining Modules
-- =============================================================================
-- Module 0010: Affiliate, AI, Policy, Planning, Analytics, Progress, Versioning, and Translations
-- Following KISS, SOLID, and DRY principles
-- =============================================================================

-- =============================================================================
-- AFFILIATE SYSTEM
-- =============================================================================

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

-- =============================================================================
-- AI AND OPERATIONS SYSTEM
-- =============================================================================

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

-- =============================================================================
-- POLICY AND LEGAL SYSTEM
-- =============================================================================

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

-- =============================================================================
-- PLANNING SYSTEM
-- =============================================================================

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

-- =============================================================================
-- ANALYTICS AND TRACKING
-- =============================================================================

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

-- =============================================================================
-- USER PROGRESS AND TRACKING
-- =============================================================================

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

-- =============================================================================
-- VERSIONING AND HISTORY TABLES
-- =============================================================================

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

-- =============================================================================
-- TRANSLATION TABLES
-- =============================================================================

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

-- =============================================================================
-- INDEXES - Module 0010
-- =============================================================================

-- Affiliate system indexes
CREATE INDEX "affiliate_program_levels_programId_idx" ON "affiliate_program_levels"("programId");
CREATE UNIQUE INDEX "affiliate_program_levels_programId_level_key" ON "affiliate_program_levels"("programId", "level");

CREATE UNIQUE INDEX "referral_codes_userId_key" ON "referral_codes"("userId");
CREATE UNIQUE INDEX "referral_codes_code_key" ON "referral_codes"("code");
CREATE INDEX "referral_codes_programId_idx" ON "referral_codes"("programId");

CREATE INDEX "referral_attributions_programId_idx" ON "referral_attributions"("programId");
CREATE INDEX "referral_attributions_referralCodeId_idx" ON "referral_attributions"("referralCodeId");
CREATE INDEX "referral_attributions_referrerUserId_idx" ON "referral_attributions"("referrerUserId");
CREATE INDEX "referral_attributions_referredUserId_idx" ON "referral_attributions"("referredUserId");
CREATE UNIQUE INDEX "referral_attributions_programId_referredUserId_level_key" ON "referral_attributions"("programId", "referredUserId", "level");

CREATE INDEX "affiliate_rewards_programId_idx" ON "affiliate_rewards"("programId");
CREATE INDEX "affiliate_rewards_attributionId_idx" ON "affiliate_rewards"("attributionId");
CREATE INDEX "affiliate_rewards_status_idx" ON "affiliate_rewards"("status");
CREATE INDEX "idx_affiliate_rewards_metadata_gin" ON "affiliate_rewards" USING GIN ("metadata");

CREATE INDEX "payout_audit_log_userId_idx" ON "payout_audit_log"("userId");
CREATE INDEX "payout_audit_log_performedBy_idx" ON "payout_audit_log"("performedBy");
CREATE INDEX "payout_audit_log_action_idx" ON "payout_audit_log"("action");
CREATE INDEX "payout_audit_log_createdAt_idx" ON "payout_audit_log"("createdAt");
CREATE INDEX "idx_payout_audit_log_rewardids_gin" ON "payout_audit_log" USING GIN ("rewardIds");

-- AI and operations indexes
CREATE UNIQUE INDEX "ai_provider_configs_provider_key" ON "ai_provider_configs"("provider");

CREATE UNIQUE INDEX "ai_operation_configs_operationType_key" ON "ai_operation_configs"("operationType");
CREATE INDEX "ai_operation_configs_isActive_idx" ON "ai_operation_configs"("isActive");
CREATE INDEX "ai_operation_configs_operationType_idx" ON "ai_operation_configs"("operationType");

CREATE INDEX "ai_config_history_createdAt_idx" ON "ai_config_history"("createdAt");
CREATE INDEX "ai_config_history_operationType_idx" ON "ai_config_history"("operationType");

CREATE INDEX "conversations_createdAt_idx" ON "conversations"("createdAt");
CREATE INDEX "conversations_userId_idx" ON "conversations"("userId");

-- Policy and legal indexes
CREATE UNIQUE INDEX "policies_slug_key" ON "policies"("slug");
CREATE UNIQUE INDEX "policies_type_key" ON "policies"("type");
CREATE INDEX "policies_slug_idx" ON "policies"("slug");
CREATE INDEX "policies_status_idx" ON "policies"("status");
CREATE INDEX "policies_type_idx" ON "policies"("type");
CREATE INDEX "policies_createdById_idx" ON "policies"("createdById");

CREATE INDEX "policy_history_policyId_idx" ON "policy_history"("policyId");
CREATE INDEX "policy_history_createdAt_idx" ON "policy_history"("createdAt");
CREATE UNIQUE INDEX "policy_history_policyId_version_key" ON "policy_history"("policyId", "version");

CREATE INDEX "user_consents_userId_idx" ON "user_consents"("userId");
CREATE INDEX "user_consents_policyId_idx" ON "user_consents"("policyId");
CREATE INDEX "user_consents_policyType_idx" ON "user_consents"("policyType");
CREATE INDEX "user_consents_consentedAt_idx" ON "user_consents"("consentedAt");
CREATE UNIQUE INDEX "user_consents_userId_policyId_key" ON "user_consents"("userId", "policyId");

-- Planning system indexes
CREATE INDEX "PlanningPlan_userId_idx" ON "PlanningPlan"("userId");
CREATE INDEX "PlanningPlan_status_idx" ON "PlanningPlan"("status");
CREATE INDEX "PlanningPlan_agentType_idx" ON "PlanningPlan"("agentType");
CREATE INDEX "PlanningPlan_createdAt_idx" ON "PlanningPlan"("createdAt");

CREATE INDEX "PlanningTask_planId_idx" ON "PlanningTask"("planId");
CREATE INDEX "PlanningTask_status_idx" ON "PlanningTask"("status");
CREATE INDEX "PlanningTask_weekNumber_idx" ON "PlanningTask"("weekNumber");
CREATE UNIQUE INDEX "PlanningTask_planId_weekNumber_key" ON "PlanningTask"("planId", "weekNumber");

CREATE INDEX "PlanningSubTask_taskId_idx" ON "PlanningSubTask"("taskId");
CREATE INDEX "PlanningSubTask_status_idx" ON "PlanningSubTask"("status");
CREATE INDEX "PlanningSubTask_dayNumber_idx" ON "PlanningSubTask"("dayNumber");
CREATE UNIQUE INDEX "PlanningSubTask_taskId_dayNumber_key" ON "PlanningSubTask"("taskId", "dayNumber");

CREATE INDEX "calendar_assignments_userId_date_idx" ON "calendar_assignments"("userId", "date");
CREATE INDEX "calendar_assignments_userId_idx" ON "calendar_assignments"("userId");
CREATE INDEX "calendar_assignments_date_idx" ON "calendar_assignments"("date");
CREATE INDEX "calendar_assignments_planType_idx" ON "calendar_assignments"("planType");
CREATE UNIQUE INDEX "calendar_assignments_userId_date_planType_planId_key" ON "calendar_assignments"("userId", "date", "planType", "planId");

-- Analytics indexes
CREATE UNIQUE INDEX "daily_metrics_date_key" ON "daily_metrics"("date");
CREATE INDEX "daily_metrics_date_idx" ON "daily_metrics"("date");

-- User progress and tracking indexes
CREATE INDEX "user_goals_userId_idx" ON "user_goals"("userId");
CREATE INDEX "user_goals_status_idx" ON "user_goals"("status");
CREATE INDEX "user_goals_deadline_idx" ON "user_goals"("deadline");

CREATE INDEX "user_progress_snapshots_userId_idx" ON "user_progress_snapshots"("userId");
CREATE INDEX "user_progress_snapshots_date_idx" ON "user_progress_snapshots"("date");
CREATE UNIQUE INDEX "user_progress_snapshots_userId_date_key" ON "user_progress_snapshots"("userId", "date");

CREATE INDEX "body_measurements_userId_idx" ON "body_measurements"("userId");
CREATE INDEX "body_measurements_date_idx" ON "body_measurements"("date");
CREATE UNIQUE INDEX "body_measurements_userId_date_key" ON "body_measurements"("userId", "date");

-- Versioning indexes
CREATE INDEX "exercise_versions_createdAt_idx" ON "exercise_versions"("createdAt");
CREATE INDEX "exercise_versions_createdById_idx" ON "exercise_versions"("createdById");
CREATE INDEX "exercise_versions_exerciseId_idx" ON "exercise_versions"("exerciseId");
CREATE UNIQUE INDEX "exercise_versions_exerciseId_version_key" ON "exercise_versions"("exerciseId", "version");

CREATE INDEX "user_one_rep_max_versions_createdAt_idx" ON "user_one_rep_max_versions"("createdAt");
CREATE INDEX "user_one_rep_max_versions_exerciseId_idx" ON "user_one_rep_max_versions"("exerciseId");
CREATE INDEX "user_one_rep_max_versions_maxId_idx" ON "user_one_rep_max_versions"("maxId");
CREATE INDEX "user_one_rep_max_versions_userId_idx" ON "user_one_rep_max_versions"("userId");
CREATE UNIQUE INDEX "user_one_rep_max_versions_maxId_version_key" ON "user_one_rep_max_versions"("maxId", "version");

CREATE INDEX "nutrition_plan_versions_createdAt_idx" ON "nutrition_plan_versions"("createdAt");
CREATE INDEX "nutrition_plan_versions_planId_idx" ON "nutrition_plan_versions"("planId");
CREATE UNIQUE INDEX "nutrition_plan_versions_planId_version_key" ON "nutrition_plan_versions"("planId", "version");

CREATE INDEX "workout_program_versions_createdAt_idx" ON "workout_program_versions"("createdAt");
CREATE INDEX "workout_program_versions_programId_idx" ON "workout_program_versions"("programId");
CREATE UNIQUE INDEX "workout_program_versions_programId_version_key" ON "workout_program_versions"("programId", "version");

-- Translation indexes
CREATE INDEX "body_part_translations_bodyPartId_idx" ON "body_part_translations"("bodyPartId");
CREATE INDEX "body_part_translations_locale_idx" ON "body_part_translations"("locale");
CREATE UNIQUE INDEX "body_part_translations_bodyPartId_locale_key" ON "body_part_translations"("bodyPartId", "locale");

CREATE INDEX "equipment_translations_equipmentId_idx" ON "equipment_translations"("equipmentId");
CREATE INDEX "equipment_translations_locale_idx" ON "equipment_translations"("locale");
CREATE UNIQUE INDEX "equipment_translations_equipmentId_locale_key" ON "equipment_translations"("equipmentId", "locale");

CREATE INDEX "exercise_translations_exerciseId_idx" ON "exercise_translations"("exerciseId");
CREATE INDEX "exercise_translations_locale_idx" ON "exercise_translations"("locale");
CREATE INDEX "exercise_translations_name_idx" ON "exercise_translations"("name");
CREATE UNIQUE INDEX "exercise_translations_exerciseId_locale_key" ON "exercise_translations"("exerciseId", "locale");

CREATE INDEX "exercise_type_translations_exerciseTypeId_idx" ON "exercise_type_translations"("exerciseTypeId");
CREATE INDEX "exercise_type_translations_locale_idx" ON "exercise_type_translations"("locale");
CREATE UNIQUE INDEX "exercise_type_translations_exerciseTypeId_locale_key" ON "exercise_type_translations"("exerciseTypeId", "locale");

CREATE INDEX "muscle_translations_locale_idx" ON "muscle_translations"("locale");
CREATE INDEX "muscle_translations_muscleId_idx" ON "muscle_translations"("muscleId");
CREATE UNIQUE INDEX "muscle_translations_muscleId_locale_key" ON "muscle_translations"("muscleId", "locale");

CREATE INDEX "food_item_translations_foodItemId_idx" ON "food_item_translations"("foodItemId");
CREATE INDEX "food_item_translations_locale_idx" ON "food_item_translations"("locale");
CREATE UNIQUE INDEX "food_item_translations_foodItemId_locale_key" ON "food_item_translations"("foodItemId", "locale");

CREATE INDEX "nutrition_goal_translations_nutritionGoalId_idx" ON "nutrition_goal_translations"("nutritionGoalId");
CREATE INDEX "nutrition_goal_translations_locale_idx" ON "nutrition_goal_translations"("locale");
CREATE UNIQUE INDEX "nutrition_goal_translations_nutritionGoalId_locale_key" ON "nutrition_goal_translations"("nutritionGoalId", "locale");

CREATE INDEX "workout_goal_translations_locale_idx" ON "workout_goal_translations"("locale");
CREATE INDEX "workout_goal_translations_workoutGoalId_idx" ON "workout_goal_translations"("workoutGoalId");
CREATE UNIQUE INDEX "workout_goal_translations_workoutGoalId_locale_key" ON "workout_goal_translations"("workoutGoalId", "locale");

-- =============================================================================
-- FOREIGN KEYS - Module 0010
-- =============================================================================

-- Affiliate system foreign keys
ALTER TABLE "affiliate_program_levels" ADD CONSTRAINT "affiliate_program_levels_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "referral_codes" ADD CONSTRAINT "referral_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_parentAttributionId_fkey" FOREIGN KEY ("parentAttributionId") REFERENCES "referral_attributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referralCodeId_fkey" FOREIGN KEY ("referralCodeId") REFERENCES "referral_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referredUserId_fkey" FOREIGN KEY ("referredUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "referral_attributions" ADD CONSTRAINT "referral_attributions_referrerUserId_fkey" FOREIGN KEY ("referrerUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_attributionId_fkey" FOREIGN KEY ("attributionId") REFERENCES "referral_attributions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_programId_fkey" FOREIGN KEY ("programId") REFERENCES "affiliate_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "affiliate_rewards" ADD CONSTRAINT "affiliate_rewards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "payout_audit_log" ADD CONSTRAINT "payout_audit_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AI and operations foreign keys
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Policy and legal foreign keys
ALTER TABLE "policies" ADD CONSTRAINT "policies_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "policies" ADD CONSTRAINT "policies_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "policy_history" ADD CONSTRAINT "policy_history_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_consents" ADD CONSTRAINT "user_consents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Planning system foreign keys
ALTER TABLE "PlanningPlan" ADD CONSTRAINT "PlanningPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PlanningTask" ADD CONSTRAINT "PlanningTask_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PlanningPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PlanningSubTask" ADD CONSTRAINT "PlanningSubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "PlanningTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "calendar_assignments" ADD CONSTRAINT "calendar_assignments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- User progress and tracking foreign keys
ALTER TABLE "user_goals" ADD CONSTRAINT "user_goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_progress_snapshots" ADD CONSTRAINT "user_progress_snapshots_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "body_measurements" ADD CONSTRAINT "body_measurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Versioning foreign keys
ALTER TABLE "exercise_versions" ADD CONSTRAINT "exercise_versions_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "exercise_versions" ADD CONSTRAINT "exercise_versions_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_one_rep_max_versions" ADD CONSTRAINT "user_one_rep_max_versions_userOneRepMaxId_fkey" FOREIGN KEY ("userOneRepMaxId") REFERENCES "user_one_rep_max"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "nutrition_plan_versions" ADD CONSTRAINT "nutrition_plan_versions_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workout_program_versions" ADD CONSTRAINT "workout_program_versions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Translation foreign keys
ALTER TABLE "body_part_translations" ADD CONSTRAINT "body_part_translations_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "body_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "equipment_translations" ADD CONSTRAINT "equipment_translations_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_translations" ADD CONSTRAINT "exercise_translations_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_type_translations" ADD CONSTRAINT "exercise_type_translations_exerciseTypeId_fkey" FOREIGN KEY ("exerciseTypeId") REFERENCES "exercise_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "muscle_translations" ADD CONSTRAINT "muscle_translations_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "food_item_translations" ADD CONSTRAINT "food_item_translations_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "nutrition_goal_translations" ADD CONSTRAINT "nutrition_goal_translations_nutritionGoalId_fkey" FOREIGN KEY ("nutritionGoalId") REFERENCES "nutrition_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workout_goal_translations" ADD CONSTRAINT "workout_goal_translations_workoutGoalId_fkey" FOREIGN KEY ("workoutGoalId") REFERENCES "workout_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
