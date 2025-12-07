-- Migration: Remove AIModel enum and add ai_external_models table
-- 
-- This migration:
-- 1. Removes the AIModel enum (replaced with String type)
-- 2. Changes model column type from AIModel enum to TEXT in ai_config_history and ai_operation_configs
-- 3. Creates the new ai_external_models table for external model configurations

-- Step 1: Change model column type in ai_config_history from enum to TEXT
DO $$
BEGIN
  -- Check if column exists and is of enum type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'ai_config_history' 
    AND column_name = 'model'
    AND udt_name = 'AIModel'
  ) THEN
    -- Convert enum to text
    ALTER TABLE "ai_config_history" 
    ALTER COLUMN "model" TYPE TEXT USING "model"::TEXT;
  END IF;
END $$;

-- Step 2: Change model column type in ai_operation_configs from enum to TEXT
DO $$
BEGIN
  -- Check if column exists and is of enum type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'ai_operation_configs' 
    AND column_name = 'model'
    AND udt_name = 'AIModel'
  ) THEN
    -- Convert enum to text
    ALTER TABLE "ai_operation_configs" 
    ALTER COLUMN "model" TYPE TEXT USING "model"::TEXT;
  END IF;
END $$;

-- Step 3: Drop AIModel enum if it exists and is no longer used
DO $$
BEGIN
  -- Only drop if enum exists and no other tables are using it
  IF EXISTS (
    SELECT 1 FROM pg_type WHERE typname = 'AIModel'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE udt_name = 'AIModel'
  ) THEN
    DROP TYPE "AIModel";
  END IF;
END $$;

-- Step 4: Create ai_external_models table
CREATE TABLE IF NOT EXISTS "ai_external_models" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'openrouter',
    "modelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "contextLength" INTEGER,
    "maxOutputTokens" INTEGER,
    "promptPrice" DECIMAL(10, 6) NOT NULL,
    "completionPrice" DECIMAL(10, 6) NOT NULL,
    "supportsImages" BOOLEAN NOT NULL DEFAULT false,
    "supportsReasoning" BOOLEAN NOT NULL DEFAULT false,
    "reasoningEffort" TEXT,
    "supportsStructuredOutput" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_external_models_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint on modelId
CREATE UNIQUE INDEX IF NOT EXISTS "ai_external_models_modelId_key" ON "ai_external_models"("modelId");

-- Create indexes
CREATE INDEX IF NOT EXISTS "ai_external_models_provider_idx" ON "ai_external_models"("provider");
CREATE INDEX IF NOT EXISTS "ai_external_models_isActive_idx" ON "ai_external_models"("isActive");

