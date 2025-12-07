-- Migration: Convert all user IDs to UUID format
-- Date: 2024-12-02
-- Description: This migration converts the users.id column from String to UUID type
--              and updates all foreign keys that reference it.

-- ============================================================================
-- STEP 1: Prepare the migration
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a temporary mapping table for old -> new UUIDs
CREATE TEMP TABLE user_id_mapping (
    old_id TEXT PRIMARY KEY,
    new_id UUID NOT NULL DEFAULT gen_random_uuid()
);

-- Populate mapping with existing users
INSERT INTO user_id_mapping (old_id)
SELECT id FROM users;

-- ============================================================================
-- STEP 2: Drop all foreign key constraints referencing users.id
-- ============================================================================

-- accounts
ALTER TABLE accounts DROP CONSTRAINT IF EXISTS accounts_userId_fkey;

-- referral_codes
ALTER TABLE referral_codes DROP CONSTRAINT IF EXISTS referral_codes_userId_fkey;

-- referral_attributions
ALTER TABLE referral_attributions DROP CONSTRAINT IF EXISTS referral_attributions_referrerUserId_fkey;
ALTER TABLE referral_attributions DROP CONSTRAINT IF EXISTS referral_attributions_referredUserId_fkey;

-- affiliate_rewards
ALTER TABLE affiliate_rewards DROP CONSTRAINT IF EXISTS affiliate_rewards_userId_fkey;

-- payout_audit_log
ALTER TABLE payout_audit_log DROP CONSTRAINT IF EXISTS payout_audit_log_userId_fkey;

-- conversations
ALTER TABLE conversations DROP CONSTRAINT IF EXISTS conversations_userId_fkey;

-- credit_transactions
ALTER TABLE credit_transactions DROP CONSTRAINT IF EXISTS credit_transactions_userId_fkey;

-- exercise_versions
ALTER TABLE exercise_versions DROP CONSTRAINT IF EXISTS exercise_versions_createdById_fkey;

-- exercises
ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_createdById_fkey;
ALTER TABLE exercises DROP CONSTRAINT IF EXISTS exercises_approvedById_fkey;

-- nutrition_plans
ALTER TABLE nutrition_plans DROP CONSTRAINT IF EXISTS nutrition_plans_userId_fkey;

-- payments (no FK to users directly in schema, but check)
-- No direct userId FK in payments model

-- sessions
ALTER TABLE sessions DROP CONSTRAINT IF EXISTS sessions_userId_fkey;

-- subscriptions
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_userId_fkey;

-- user_one_rep_max
ALTER TABLE user_one_rep_max DROP CONSTRAINT IF EXISTS user_one_rep_max_userId_fkey;

-- user_profiles
ALTER TABLE user_profiles DROP CONSTRAINT IF EXISTS user_profiles_userId_fkey;

-- meal_templates
ALTER TABLE meal_templates DROP CONSTRAINT IF EXISTS meal_templates_userId_fkey;

-- nutrition_templates
ALTER TABLE nutrition_templates DROP CONSTRAINT IF EXISTS nutrition_templates_userId_fkey;

-- workout_templates
ALTER TABLE workout_templates DROP CONSTRAINT IF EXISTS workout_templates_userId_fkey;

-- body_measurements
ALTER TABLE body_measurements DROP CONSTRAINT IF EXISTS body_measurements_userId_fkey;

-- exercise_performance_records
ALTER TABLE exercise_performance_records DROP CONSTRAINT IF EXISTS exercise_performance_records_userId_fkey;

-- user_progress_snapshots
ALTER TABLE user_progress_snapshots DROP CONSTRAINT IF EXISTS user_progress_snapshots_userId_fkey;

-- user_goals
ALTER TABLE user_goals DROP CONSTRAINT IF EXISTS user_goals_userId_fkey;

-- nutrition_adherence_metrics
ALTER TABLE nutrition_adherence_metrics DROP CONSTRAINT IF EXISTS nutrition_adherence_metrics_userId_fkey;

-- nutrition_day_logs
ALTER TABLE nutrition_day_logs DROP CONSTRAINT IF EXISTS nutrition_day_logs_userId_fkey;

-- policies
ALTER TABLE policies DROP CONSTRAINT IF EXISTS policies_createdById_fkey;
ALTER TABLE policies DROP CONSTRAINT IF EXISTS policies_updatedById_fkey;

-- user_consents
ALTER TABLE user_consents DROP CONSTRAINT IF EXISTS user_consents_userId_fkey;

-- workout_programs
ALTER TABLE workout_programs DROP CONSTRAINT IF EXISTS workout_programs_userId_fkey;

-- workout_sessions
ALTER TABLE workout_sessions DROP CONSTRAINT IF EXISTS workout_sessions_userId_fkey;

-- "PlanningPlan" (planning_plans)
ALTER TABLE "PlanningPlan" DROP CONSTRAINT IF EXISTS "PlanningPlan_userId_fkey";

-- calendar_assignments
ALTER TABLE calendar_assignments DROP CONSTRAINT IF EXISTS calendar_assignments_userId_fkey;

-- coach_profiles
ALTER TABLE coach_profiles DROP CONSTRAINT IF EXISTS coach_profiles_userId_fkey;

-- coach_vetting_requests
ALTER TABLE coach_vetting_requests DROP CONSTRAINT IF EXISTS coach_vetting_requests_userId_fkey;

-- marketplace_plans
ALTER TABLE marketplace_plans DROP CONSTRAINT IF EXISTS marketplace_plans_coachId_fkey;

-- plan_purchases
ALTER TABLE plan_purchases DROP CONSTRAINT IF EXISTS plan_purchases_userId_fkey;

-- plan_ratings
ALTER TABLE plan_ratings DROP CONSTRAINT IF EXISTS plan_ratings_userId_fkey;

-- user_payout_profiles
ALTER TABLE user_payout_profiles DROP CONSTRAINT IF EXISTS user_payout_profiles_userId_fkey;

-- user_onboarding_progress
ALTER TABLE user_onboarding_progress DROP CONSTRAINT IF EXISTS user_onboarding_progress_userId_fkey;

-- password_reset_tokens
ALTER TABLE password_reset_tokens DROP CONSTRAINT IF EXISTS password_reset_tokens_userId_fkey;

-- user_skills
ALTER TABLE user_skills DROP CONSTRAINT IF EXISTS user_skills_userId_fkey;

-- user_workflows
ALTER TABLE user_workflows DROP CONSTRAINT IF EXISTS user_workflows_userId_fkey;

-- user_api_keys
ALTER TABLE user_api_keys DROP CONSTRAINT IF EXISTS user_api_keys_userId_fkey;

-- promotion_uses
ALTER TABLE promotion_uses DROP CONSTRAINT IF EXISTS promotion_uses_userId_fkey;

-- health_steps
ALTER TABLE health_steps DROP CONSTRAINT IF EXISTS health_steps_userId_fkey;

-- health_heart_rate
ALTER TABLE health_heart_rate DROP CONSTRAINT IF EXISTS health_heart_rate_userId_fkey;

-- health_active_calories
ALTER TABLE health_active_calories DROP CONSTRAINT IF EXISTS health_active_calories_userId_fkey;

-- health_weight
ALTER TABLE health_weight DROP CONSTRAINT IF EXISTS health_weight_userId_fkey;

-- health_workout
ALTER TABLE health_workout DROP CONSTRAINT IF EXISTS health_workout_userId_fkey;

-- invitations (createdById)
ALTER TABLE invitations DROP CONSTRAINT IF EXISTS invitations_createdById_fkey;

-- invitation_uses
ALTER TABLE invitation_uses DROP CONSTRAINT IF EXISTS invitation_uses_userId_fkey;

-- "Project"
ALTER TABLE "Project" DROP CONSTRAINT IF EXISTS "Project_userId_fkey";

-- "Task"
ALTER TABLE "Task" DROP CONSTRAINT IF EXISTS "Task_userId_fkey";

-- "Habit"
ALTER TABLE "Habit" DROP CONSTRAINT IF EXISTS "Habit_userId_fkey";

-- ============================================================================
-- STEP 3: Update users.id to UUID
-- ============================================================================

-- Add new UUID column to users
ALTER TABLE users ADD COLUMN id_new UUID;

-- Populate with mapped UUIDs
UPDATE users u SET id_new = m.new_id FROM user_id_mapping m WHERE u.id = m.old_id;

-- For any users without mapping (shouldn't exist), generate new UUID
UPDATE users SET id_new = gen_random_uuid() WHERE id_new IS NULL;

-- ============================================================================
-- STEP 4: Update all referencing tables with new UUIDs
-- ============================================================================

-- accounts
ALTER TABLE accounts ADD COLUMN userId_new UUID;
UPDATE accounts a SET userId_new = m.new_id FROM user_id_mapping m WHERE a."userId" = m.old_id;

-- referral_codes  
ALTER TABLE referral_codes ADD COLUMN userId_new UUID;
UPDATE referral_codes rc SET userId_new = m.new_id FROM user_id_mapping m WHERE rc."userId" = m.old_id;

-- referral_attributions
ALTER TABLE referral_attributions ADD COLUMN referrerUserId_new UUID;
ALTER TABLE referral_attributions ADD COLUMN referredUserId_new UUID;
UPDATE referral_attributions ra 
SET referrerUserId_new = m.new_id 
FROM user_id_mapping m 
WHERE ra."referrerUserId" = m.old_id;
UPDATE referral_attributions ra 
SET referredUserId_new = m.new_id 
FROM user_id_mapping m 
WHERE ra."referredUserId" = m.old_id;

-- affiliate_rewards
ALTER TABLE affiliate_rewards ADD COLUMN userId_new UUID;
UPDATE affiliate_rewards ar SET userId_new = m.new_id FROM user_id_mapping m WHERE ar."userId" = m.old_id;

-- payout_audit_log
ALTER TABLE payout_audit_log ADD COLUMN userId_new UUID;
UPDATE payout_audit_log pal SET userId_new = m.new_id FROM user_id_mapping m WHERE pal."userId" = m.old_id;

-- conversations
ALTER TABLE conversations ADD COLUMN userId_new UUID;
UPDATE conversations c SET userId_new = m.new_id FROM user_id_mapping m WHERE c."userId" = m.old_id;

-- credit_transactions
ALTER TABLE credit_transactions ADD COLUMN userId_new UUID;
UPDATE credit_transactions ct SET userId_new = m.new_id FROM user_id_mapping m WHERE ct."userId" = m.old_id;

-- exercise_versions
ALTER TABLE exercise_versions ADD COLUMN createdById_new UUID;
UPDATE exercise_versions ev SET createdById_new = m.new_id FROM user_id_mapping m WHERE ev."createdById" = m.old_id;

-- exercises
ALTER TABLE exercises ADD COLUMN createdById_new UUID;
ALTER TABLE exercises ADD COLUMN approvedById_new UUID;
UPDATE exercises e SET createdById_new = m.new_id FROM user_id_mapping m WHERE e."createdById" = m.old_id;
UPDATE exercises e SET approvedById_new = m.new_id FROM user_id_mapping m WHERE e."approvedById" = m.old_id;

-- nutrition_plans
ALTER TABLE nutrition_plans ADD COLUMN userId_new UUID;
UPDATE nutrition_plans np SET userId_new = m.new_id FROM user_id_mapping m WHERE np."userId" = m.old_id;

-- sessions
ALTER TABLE sessions ADD COLUMN userId_new UUID;
UPDATE sessions s SET userId_new = m.new_id FROM user_id_mapping m WHERE s."userId" = m.old_id;

-- subscriptions
ALTER TABLE subscriptions ADD COLUMN userId_new UUID;
UPDATE subscriptions sub SET userId_new = m.new_id FROM user_id_mapping m WHERE sub."userId" = m.old_id;

-- user_one_rep_max
ALTER TABLE user_one_rep_max ADD COLUMN userId_new UUID;
UPDATE user_one_rep_max uorm SET userId_new = m.new_id FROM user_id_mapping m WHERE uorm."userId" = m.old_id;

-- user_profiles
ALTER TABLE user_profiles ADD COLUMN userId_new UUID;
UPDATE user_profiles up SET userId_new = m.new_id FROM user_id_mapping m WHERE up."userId" = m.old_id;

-- meal_templates
ALTER TABLE meal_templates ADD COLUMN userId_new UUID;
UPDATE meal_templates mt SET userId_new = m.new_id FROM user_id_mapping m WHERE mt."userId" = m.old_id;

-- nutrition_templates
ALTER TABLE nutrition_templates ADD COLUMN userId_new UUID;
UPDATE nutrition_templates nt SET userId_new = m.new_id FROM user_id_mapping m WHERE nt."userId" = m.old_id;

-- workout_templates
ALTER TABLE workout_templates ADD COLUMN userId_new UUID;
UPDATE workout_templates wt SET userId_new = m.new_id FROM user_id_mapping m WHERE wt."userId" = m.old_id;

-- body_measurements
ALTER TABLE body_measurements ADD COLUMN userId_new UUID;
UPDATE body_measurements bm SET userId_new = m.new_id FROM user_id_mapping m WHERE bm."userId" = m.old_id;

-- exercise_performance_records
ALTER TABLE exercise_performance_records ADD COLUMN userId_new UUID;
UPDATE exercise_performance_records epr SET userId_new = m.new_id FROM user_id_mapping m WHERE epr."userId" = m.old_id;

-- user_progress_snapshots
ALTER TABLE user_progress_snapshots ADD COLUMN userId_new UUID;
UPDATE user_progress_snapshots ups SET userId_new = m.new_id FROM user_id_mapping m WHERE ups."userId" = m.old_id;

-- user_goals
ALTER TABLE user_goals ADD COLUMN userId_new UUID;
UPDATE user_goals ug SET userId_new = m.new_id FROM user_id_mapping m WHERE ug."userId" = m.old_id;

-- nutrition_adherence_metrics
ALTER TABLE nutrition_adherence_metrics ADD COLUMN userId_new UUID;
UPDATE nutrition_adherence_metrics nam SET userId_new = m.new_id FROM user_id_mapping m WHERE nam."userId" = m.old_id;

-- nutrition_day_logs
ALTER TABLE nutrition_day_logs ADD COLUMN userId_new UUID;
UPDATE nutrition_day_logs ndl SET userId_new = m.new_id FROM user_id_mapping m WHERE ndl."userId" = m.old_id;

-- policies
ALTER TABLE policies ADD COLUMN createdById_new UUID;
ALTER TABLE policies ADD COLUMN updatedById_new UUID;
UPDATE policies p SET createdById_new = m.new_id FROM user_id_mapping m WHERE p."createdById" = m.old_id;
UPDATE policies p SET updatedById_new = m.new_id FROM user_id_mapping m WHERE p."updatedById" = m.old_id;

-- user_consents
ALTER TABLE user_consents ADD COLUMN userId_new UUID;
UPDATE user_consents uc SET userId_new = m.new_id FROM user_id_mapping m WHERE uc."userId" = m.old_id;

-- workout_programs
ALTER TABLE workout_programs ADD COLUMN userId_new UUID;
UPDATE workout_programs wp SET userId_new = m.new_id FROM user_id_mapping m WHERE wp."userId" = m.old_id;

-- workout_sessions
ALTER TABLE workout_sessions ADD COLUMN userId_new UUID;
UPDATE workout_sessions ws SET userId_new = m.new_id FROM user_id_mapping m WHERE ws."userId" = m.old_id;

-- PlanningPlan
ALTER TABLE "PlanningPlan" ADD COLUMN userId_new UUID;
UPDATE "PlanningPlan" pp SET userId_new = m.new_id FROM user_id_mapping m WHERE pp."userId" = m.old_id;

-- calendar_assignments
ALTER TABLE calendar_assignments ADD COLUMN userId_new UUID;
UPDATE calendar_assignments ca SET userId_new = m.new_id FROM user_id_mapping m WHERE ca."userId" = m.old_id;

-- coach_profiles
ALTER TABLE coach_profiles ADD COLUMN userId_new UUID;
UPDATE coach_profiles cp SET userId_new = m.new_id FROM user_id_mapping m WHERE cp."userId" = m.old_id;

-- coach_vetting_requests
ALTER TABLE coach_vetting_requests ADD COLUMN userId_new UUID;
UPDATE coach_vetting_requests cvr SET userId_new = m.new_id FROM user_id_mapping m WHERE cvr."userId" = m.old_id;

-- marketplace_plans (coachId)
ALTER TABLE marketplace_plans ADD COLUMN coachId_new UUID;
UPDATE marketplace_plans mp SET coachId_new = m.new_id FROM user_id_mapping m WHERE mp."coachId" = m.old_id;

-- plan_purchases
ALTER TABLE plan_purchases ADD COLUMN userId_new UUID;
UPDATE plan_purchases pp SET userId_new = m.new_id FROM user_id_mapping m WHERE pp."userId" = m.old_id;

-- plan_ratings
ALTER TABLE plan_ratings ADD COLUMN userId_new UUID;
UPDATE plan_ratings pr SET userId_new = m.new_id FROM user_id_mapping m WHERE pr."userId" = m.old_id;

-- user_payout_profiles
ALTER TABLE user_payout_profiles ADD COLUMN userId_new UUID;
UPDATE user_payout_profiles upp SET userId_new = m.new_id FROM user_id_mapping m WHERE upp."userId" = m.old_id;

-- user_onboarding_progress
ALTER TABLE user_onboarding_progress ADD COLUMN userId_new UUID;
UPDATE user_onboarding_progress uop SET userId_new = m.new_id FROM user_id_mapping m WHERE uop."userId" = m.old_id;

-- password_reset_tokens
ALTER TABLE password_reset_tokens ADD COLUMN userId_new UUID;
UPDATE password_reset_tokens prt SET userId_new = m.new_id FROM user_id_mapping m WHERE prt."userId" = m.old_id;

-- user_skills
ALTER TABLE user_skills ADD COLUMN userId_new UUID;
UPDATE user_skills us SET userId_new = m.new_id FROM user_id_mapping m WHERE us."userId" = m.old_id;

-- user_workflows
ALTER TABLE user_workflows ADD COLUMN userId_new UUID;
UPDATE user_workflows uw SET userId_new = m.new_id FROM user_id_mapping m WHERE uw."userId" = m.old_id;

-- user_api_keys
ALTER TABLE user_api_keys ADD COLUMN userId_new UUID;
UPDATE user_api_keys uak SET userId_new = m.new_id FROM user_id_mapping m WHERE uak."userId" = m.old_id;

-- promotion_uses
ALTER TABLE promotion_uses ADD COLUMN userId_new UUID;
UPDATE promotion_uses pu SET userId_new = m.new_id FROM user_id_mapping m WHERE pu."userId" = m.old_id;

-- health_steps
ALTER TABLE health_steps ADD COLUMN userId_new UUID;
UPDATE health_steps hs SET userId_new = m.new_id FROM user_id_mapping m WHERE hs."userId" = m.old_id;

-- health_heart_rate
ALTER TABLE health_heart_rate ADD COLUMN userId_new UUID;
UPDATE health_heart_rate hhr SET userId_new = m.new_id FROM user_id_mapping m WHERE hhr."userId" = m.old_id;

-- health_active_calories
ALTER TABLE health_active_calories ADD COLUMN userId_new UUID;
UPDATE health_active_calories hac SET userId_new = m.new_id FROM user_id_mapping m WHERE hac."userId" = m.old_id;

-- health_weight
ALTER TABLE health_weight ADD COLUMN userId_new UUID;
UPDATE health_weight hw SET userId_new = m.new_id FROM user_id_mapping m WHERE hw."userId" = m.old_id;

-- health_workout
ALTER TABLE health_workout ADD COLUMN userId_new UUID;
UPDATE health_workout hwk SET userId_new = m.new_id FROM user_id_mapping m WHERE hwk."userId" = m.old_id;

-- invitations (createdById)
ALTER TABLE invitations ADD COLUMN createdById_new UUID;
UPDATE invitations i SET createdById_new = m.new_id FROM user_id_mapping m WHERE i."createdById" = m.old_id;

-- invitation_uses
ALTER TABLE invitation_uses ADD COLUMN userId_new UUID;
UPDATE invitation_uses iu SET userId_new = m.new_id FROM user_id_mapping m WHERE iu."userId" = m.old_id;

-- Project
ALTER TABLE "Project" ADD COLUMN userId_new UUID;
UPDATE "Project" p SET userId_new = m.new_id FROM user_id_mapping m WHERE p."userId" = m.old_id;

-- Task
ALTER TABLE "Task" ADD COLUMN userId_new UUID;
UPDATE "Task" t SET userId_new = m.new_id FROM user_id_mapping m WHERE t."userId" = m.old_id;

-- Habit
ALTER TABLE "Habit" ADD COLUMN userId_new UUID;
UPDATE "Habit" h SET userId_new = m.new_id FROM user_id_mapping m WHERE h."userId" = m.old_id;

-- users invitationId (FK to invitations, not to users, skip)

-- ============================================================================
-- STEP 5: Drop old columns and rename new ones
-- ============================================================================

-- users
ALTER TABLE users DROP COLUMN id CASCADE;
ALTER TABLE users RENAME COLUMN id_new TO id;
ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users ALTER COLUMN id SET DEFAULT gen_random_uuid();

-- accounts
ALTER TABLE accounts DROP COLUMN "userId";
ALTER TABLE accounts RENAME COLUMN userId_new TO "userId";

-- referral_codes  
ALTER TABLE referral_codes DROP COLUMN "userId";
ALTER TABLE referral_codes RENAME COLUMN userId_new TO "userId";

-- referral_attributions
ALTER TABLE referral_attributions DROP COLUMN "referrerUserId";
ALTER TABLE referral_attributions RENAME COLUMN referrerUserId_new TO "referrerUserId";
ALTER TABLE referral_attributions DROP COLUMN "referredUserId";
ALTER TABLE referral_attributions RENAME COLUMN referredUserId_new TO "referredUserId";

-- affiliate_rewards
ALTER TABLE affiliate_rewards DROP COLUMN "userId";
ALTER TABLE affiliate_rewards RENAME COLUMN userId_new TO "userId";

-- payout_audit_log
ALTER TABLE payout_audit_log DROP COLUMN "userId";
ALTER TABLE payout_audit_log RENAME COLUMN userId_new TO "userId";

-- conversations
ALTER TABLE conversations DROP COLUMN "userId";
ALTER TABLE conversations RENAME COLUMN userId_new TO "userId";

-- credit_transactions
ALTER TABLE credit_transactions DROP COLUMN "userId";
ALTER TABLE credit_transactions RENAME COLUMN userId_new TO "userId";

-- exercise_versions
ALTER TABLE exercise_versions DROP COLUMN "createdById";
ALTER TABLE exercise_versions RENAME COLUMN createdById_new TO "createdById";

-- exercises
ALTER TABLE exercises DROP COLUMN "createdById";
ALTER TABLE exercises RENAME COLUMN createdById_new TO "createdById";
ALTER TABLE exercises DROP COLUMN "approvedById";
ALTER TABLE exercises RENAME COLUMN approvedById_new TO "approvedById";

-- nutrition_plans
ALTER TABLE nutrition_plans DROP COLUMN "userId";
ALTER TABLE nutrition_plans RENAME COLUMN userId_new TO "userId";

-- sessions
ALTER TABLE sessions DROP COLUMN "userId";
ALTER TABLE sessions RENAME COLUMN userId_new TO "userId";

-- subscriptions
ALTER TABLE subscriptions DROP COLUMN "userId";
ALTER TABLE subscriptions RENAME COLUMN userId_new TO "userId";

-- user_one_rep_max
ALTER TABLE user_one_rep_max DROP COLUMN "userId";
ALTER TABLE user_one_rep_max RENAME COLUMN userId_new TO "userId";

-- user_profiles
ALTER TABLE user_profiles DROP COLUMN "userId";
ALTER TABLE user_profiles RENAME COLUMN userId_new TO "userId";

-- meal_templates
ALTER TABLE meal_templates DROP COLUMN "userId";
ALTER TABLE meal_templates RENAME COLUMN userId_new TO "userId";

-- nutrition_templates
ALTER TABLE nutrition_templates DROP COLUMN "userId";
ALTER TABLE nutrition_templates RENAME COLUMN userId_new TO "userId";

-- workout_templates
ALTER TABLE workout_templates DROP COLUMN "userId";
ALTER TABLE workout_templates RENAME COLUMN userId_new TO "userId";

-- body_measurements
ALTER TABLE body_measurements DROP COLUMN "userId";
ALTER TABLE body_measurements RENAME COLUMN userId_new TO "userId";

-- exercise_performance_records
ALTER TABLE exercise_performance_records DROP COLUMN "userId";
ALTER TABLE exercise_performance_records RENAME COLUMN userId_new TO "userId";

-- user_progress_snapshots
ALTER TABLE user_progress_snapshots DROP COLUMN "userId";
ALTER TABLE user_progress_snapshots RENAME COLUMN userId_new TO "userId";

-- user_goals
ALTER TABLE user_goals DROP COLUMN "userId";
ALTER TABLE user_goals RENAME COLUMN userId_new TO "userId";

-- nutrition_adherence_metrics
ALTER TABLE nutrition_adherence_metrics DROP COLUMN "userId";
ALTER TABLE nutrition_adherence_metrics RENAME COLUMN userId_new TO "userId";

-- nutrition_day_logs
ALTER TABLE nutrition_day_logs DROP COLUMN "userId";
ALTER TABLE nutrition_day_logs RENAME COLUMN userId_new TO "userId";

-- policies
ALTER TABLE policies DROP COLUMN "createdById";
ALTER TABLE policies RENAME COLUMN createdById_new TO "createdById";
ALTER TABLE policies DROP COLUMN "updatedById";
ALTER TABLE policies RENAME COLUMN updatedById_new TO "updatedById";

-- user_consents
ALTER TABLE user_consents DROP COLUMN "userId";
ALTER TABLE user_consents RENAME COLUMN userId_new TO "userId";

-- workout_programs
ALTER TABLE workout_programs DROP COLUMN "userId";
ALTER TABLE workout_programs RENAME COLUMN userId_new TO "userId";

-- workout_sessions
ALTER TABLE workout_sessions DROP COLUMN "userId";
ALTER TABLE workout_sessions RENAME COLUMN userId_new TO "userId";

-- PlanningPlan
ALTER TABLE "PlanningPlan" DROP COLUMN "userId";
ALTER TABLE "PlanningPlan" RENAME COLUMN userId_new TO "userId";

-- calendar_assignments
ALTER TABLE calendar_assignments DROP COLUMN "userId";
ALTER TABLE calendar_assignments RENAME COLUMN userId_new TO "userId";

-- coach_profiles
ALTER TABLE coach_profiles DROP COLUMN "userId";
ALTER TABLE coach_profiles RENAME COLUMN userId_new TO "userId";

-- coach_vetting_requests
ALTER TABLE coach_vetting_requests DROP COLUMN "userId";
ALTER TABLE coach_vetting_requests RENAME COLUMN userId_new TO "userId";

-- marketplace_plans
ALTER TABLE marketplace_plans DROP COLUMN "coachId";
ALTER TABLE marketplace_plans RENAME COLUMN coachId_new TO "coachId";

-- plan_purchases
ALTER TABLE plan_purchases DROP COLUMN "userId";
ALTER TABLE plan_purchases RENAME COLUMN userId_new TO "userId";

-- plan_ratings
ALTER TABLE plan_ratings DROP COLUMN "userId";
ALTER TABLE plan_ratings RENAME COLUMN userId_new TO "userId";

-- user_payout_profiles
ALTER TABLE user_payout_profiles DROP COLUMN "userId";
ALTER TABLE user_payout_profiles RENAME COLUMN userId_new TO "userId";

-- user_onboarding_progress
ALTER TABLE user_onboarding_progress DROP COLUMN "userId";
ALTER TABLE user_onboarding_progress RENAME COLUMN userId_new TO "userId";

-- password_reset_tokens
ALTER TABLE password_reset_tokens DROP COLUMN "userId";
ALTER TABLE password_reset_tokens RENAME COLUMN userId_new TO "userId";

-- user_skills
ALTER TABLE user_skills DROP COLUMN "userId";
ALTER TABLE user_skills RENAME COLUMN userId_new TO "userId";

-- user_workflows
ALTER TABLE user_workflows DROP COLUMN "userId";
ALTER TABLE user_workflows RENAME COLUMN userId_new TO "userId";

-- user_api_keys
ALTER TABLE user_api_keys DROP COLUMN "userId";
ALTER TABLE user_api_keys RENAME COLUMN userId_new TO "userId";

-- promotion_uses
ALTER TABLE promotion_uses DROP COLUMN "userId";
ALTER TABLE promotion_uses RENAME COLUMN userId_new TO "userId";

-- health_steps
ALTER TABLE health_steps DROP COLUMN "userId";
ALTER TABLE health_steps RENAME COLUMN userId_new TO "userId";

-- health_heart_rate
ALTER TABLE health_heart_rate DROP COLUMN "userId";
ALTER TABLE health_heart_rate RENAME COLUMN userId_new TO "userId";

-- health_active_calories
ALTER TABLE health_active_calories DROP COLUMN "userId";
ALTER TABLE health_active_calories RENAME COLUMN userId_new TO "userId";

-- health_weight
ALTER TABLE health_weight DROP COLUMN "userId";
ALTER TABLE health_weight RENAME COLUMN userId_new TO "userId";

-- health_workout
ALTER TABLE health_workout DROP COLUMN "userId";
ALTER TABLE health_workout RENAME COLUMN userId_new TO "userId";

-- invitations
ALTER TABLE invitations DROP COLUMN "createdById";
ALTER TABLE invitations RENAME COLUMN createdById_new TO "createdById";

-- invitation_uses
ALTER TABLE invitation_uses DROP COLUMN "userId";
ALTER TABLE invitation_uses RENAME COLUMN userId_new TO "userId";

-- Project
ALTER TABLE "Project" DROP COLUMN "userId";
ALTER TABLE "Project" RENAME COLUMN userId_new TO "userId";

-- Task
ALTER TABLE "Task" DROP COLUMN "userId";
ALTER TABLE "Task" RENAME COLUMN userId_new TO "userId";

-- Habit
ALTER TABLE "Habit" DROP COLUMN "userId";
ALTER TABLE "Habit" RENAME COLUMN userId_new TO "userId";

-- ============================================================================
-- STEP 6: Recreate all foreign key constraints
-- ============================================================================

-- accounts
ALTER TABLE accounts ADD CONSTRAINT accounts_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- referral_codes  
ALTER TABLE referral_codes ADD CONSTRAINT referral_codes_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- referral_attributions
ALTER TABLE referral_attributions ADD CONSTRAINT referral_attributions_referrerUserId_fkey 
FOREIGN KEY ("referrerUserId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE referral_attributions ADD CONSTRAINT referral_attributions_referredUserId_fkey 
FOREIGN KEY ("referredUserId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- affiliate_rewards
ALTER TABLE affiliate_rewards ADD CONSTRAINT affiliate_rewards_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- payout_audit_log
ALTER TABLE payout_audit_log ADD CONSTRAINT payout_audit_log_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON UPDATE CASCADE;

-- conversations
ALTER TABLE conversations ADD CONSTRAINT conversations_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- credit_transactions
ALTER TABLE credit_transactions ADD CONSTRAINT credit_transactions_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- exercise_versions
ALTER TABLE exercise_versions ADD CONSTRAINT exercise_versions_createdById_fkey 
FOREIGN KEY ("createdById") REFERENCES users(id) ON UPDATE CASCADE;

-- exercises
ALTER TABLE exercises ADD CONSTRAINT exercises_createdById_fkey 
FOREIGN KEY ("createdById") REFERENCES users(id) ON UPDATE CASCADE;
ALTER TABLE exercises ADD CONSTRAINT exercises_approvedById_fkey 
FOREIGN KEY ("approvedById") REFERENCES users(id) ON UPDATE CASCADE;

-- nutrition_plans
ALTER TABLE nutrition_plans ADD CONSTRAINT nutrition_plans_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- sessions
ALTER TABLE sessions ADD CONSTRAINT sessions_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- subscriptions
ALTER TABLE subscriptions ADD CONSTRAINT subscriptions_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_one_rep_max
ALTER TABLE user_one_rep_max ADD CONSTRAINT user_one_rep_max_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_profiles
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- meal_templates
ALTER TABLE meal_templates ADD CONSTRAINT meal_templates_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- nutrition_templates
ALTER TABLE nutrition_templates ADD CONSTRAINT nutrition_templates_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- workout_templates
ALTER TABLE workout_templates ADD CONSTRAINT workout_templates_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- body_measurements
ALTER TABLE body_measurements ADD CONSTRAINT body_measurements_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- exercise_performance_records
ALTER TABLE exercise_performance_records ADD CONSTRAINT exercise_performance_records_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_progress_snapshots
ALTER TABLE user_progress_snapshots ADD CONSTRAINT user_progress_snapshots_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_goals
ALTER TABLE user_goals ADD CONSTRAINT user_goals_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- nutrition_adherence_metrics
ALTER TABLE nutrition_adherence_metrics ADD CONSTRAINT nutrition_adherence_metrics_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- nutrition_day_logs
ALTER TABLE nutrition_day_logs ADD CONSTRAINT nutrition_day_logs_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- policies
ALTER TABLE policies ADD CONSTRAINT policies_createdById_fkey 
FOREIGN KEY ("createdById") REFERENCES users(id) ON UPDATE CASCADE;
ALTER TABLE policies ADD CONSTRAINT policies_updatedById_fkey 
FOREIGN KEY ("updatedById") REFERENCES users(id) ON UPDATE CASCADE;

-- user_consents
ALTER TABLE user_consents ADD CONSTRAINT user_consents_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- workout_programs
ALTER TABLE workout_programs ADD CONSTRAINT workout_programs_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- workout_sessions
ALTER TABLE workout_sessions ADD CONSTRAINT workout_sessions_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- PlanningPlan
ALTER TABLE "PlanningPlan" ADD CONSTRAINT "PlanningPlan_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- calendar_assignments
ALTER TABLE calendar_assignments ADD CONSTRAINT calendar_assignments_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- coach_profiles
ALTER TABLE coach_profiles ADD CONSTRAINT coach_profiles_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- coach_vetting_requests
ALTER TABLE coach_vetting_requests ADD CONSTRAINT coach_vetting_requests_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- marketplace_plans
ALTER TABLE marketplace_plans ADD CONSTRAINT marketplace_plans_coachId_fkey 
FOREIGN KEY ("coachId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- plan_purchases
ALTER TABLE plan_purchases ADD CONSTRAINT plan_purchases_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- plan_ratings
ALTER TABLE plan_ratings ADD CONSTRAINT plan_ratings_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_payout_profiles
ALTER TABLE user_payout_profiles ADD CONSTRAINT user_payout_profiles_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_onboarding_progress
ALTER TABLE user_onboarding_progress ADD CONSTRAINT user_onboarding_progress_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- password_reset_tokens
ALTER TABLE password_reset_tokens ADD CONSTRAINT password_reset_tokens_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_skills
ALTER TABLE user_skills ADD CONSTRAINT user_skills_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_workflows
ALTER TABLE user_workflows ADD CONSTRAINT user_workflows_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- user_api_keys
ALTER TABLE user_api_keys ADD CONSTRAINT user_api_keys_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- promotion_uses
ALTER TABLE promotion_uses ADD CONSTRAINT promotion_uses_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- health_steps
ALTER TABLE health_steps ADD CONSTRAINT health_steps_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- health_heart_rate
ALTER TABLE health_heart_rate ADD CONSTRAINT health_heart_rate_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- health_active_calories
ALTER TABLE health_active_calories ADD CONSTRAINT health_active_calories_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- health_weight
ALTER TABLE health_weight ADD CONSTRAINT health_weight_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- health_workout
ALTER TABLE health_workout ADD CONSTRAINT health_workout_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- invitations
ALTER TABLE invitations ADD CONSTRAINT invitations_createdById_fkey 
FOREIGN KEY ("createdById") REFERENCES users(id) ON UPDATE CASCADE;

-- invitation_uses
ALTER TABLE invitation_uses ADD CONSTRAINT invitation_uses_userId_fkey 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Project
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Task
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- Habit
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE;

-- ============================================================================
-- STEP 7: Recreate unique constraints
-- ============================================================================

-- referral_codes userId unique
CREATE UNIQUE INDEX IF NOT EXISTS referral_codes_userId_key ON referral_codes("userId");

-- user_profiles userId unique
CREATE UNIQUE INDEX IF NOT EXISTS user_profiles_userId_key ON user_profiles("userId");

-- coach_profiles userId unique
CREATE UNIQUE INDEX IF NOT EXISTS coach_profiles_userId_key ON coach_profiles("userId");

-- user_payout_profiles userId unique
CREATE UNIQUE INDEX IF NOT EXISTS user_payout_profiles_userId_key ON user_payout_profiles("userId");

-- user_onboarding_progress userId unique
CREATE UNIQUE INDEX IF NOT EXISTS user_onboarding_progress_userId_key ON user_onboarding_progress("userId");

-- ============================================================================
-- Migration Complete
-- ============================================================================
