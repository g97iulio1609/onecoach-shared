-- =============================================================================
-- Migration: Add userProfile column to nutrition_plans
-- Purpose: Align production database with Prisma schema / app expectations
-- =============================================================================

ALTER TABLE "nutrition_plans"
ADD COLUMN IF NOT EXISTS "userProfile" JSONB;


