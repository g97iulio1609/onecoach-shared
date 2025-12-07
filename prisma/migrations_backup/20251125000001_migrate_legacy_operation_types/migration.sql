-- Migration: Migrate legacy OperationType values to new values
-- 
-- This migration updates existing data from legacy operation types:
-- - WORKOUT_GENERATION -> PLAN_GENERATION
-- - NUTRITION_GENERATION -> PLAN_GENERATION
-- - WORKOUT_EDIT -> PLAN_MODIFICATION
-- - NUTRITION_EDIT -> PLAN_MODIFICATION
--
-- Note: The enum values PLAN_GENERATION, PLAN_MODIFICATION, and PLAN_RECALCULATION
-- must be added in a previous migration (20250115000001_add_operation_type_enums)
--
-- This migration is idempotent and will only run if the tables exist.

DO $$
BEGIN
  -- Only proceed if ai_operation_configs table exists
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'ai_operation_configs'
  ) THEN
-- Step 1: Handle potential duplicates before migration
-- If there are both WORKOUT_GENERATION and NUTRITION_GENERATION with the same model,
-- we keep the one with higher creditCost (assuming it's more comprehensive)
-- and delete the other one.
-- Only proceed if the legacy enum values exist

-- Check if NUTRITION_GENERATION enum value exists before using it
IF EXISTS (
  SELECT 1 FROM pg_enum 
  WHERE enumlabel = 'NUTRITION_GENERATION' 
  AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
) AND EXISTS (
  SELECT 1 FROM pg_enum 
  WHERE enumlabel = 'WORKOUT_GENERATION' 
  AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
) THEN
  -- Delete duplicate NUTRITION_GENERATION entries where WORKOUT_GENERATION exists with same model
  DELETE FROM ai_operation_configs a1
  WHERE a1."operationType" = 'NUTRITION_GENERATION'
    AND EXISTS (
      SELECT 1 FROM ai_operation_configs a2
      WHERE a2."operationType" = 'WORKOUT_GENERATION'
        AND a2."model" = a1."model"
        AND a2."creditCost" >= a1."creditCost"
    );

  -- Delete duplicate WORKOUT_GENERATION entries where NUTRITION_GENERATION exists with same model and higher cost
  DELETE FROM ai_operation_configs a1
  WHERE a1."operationType" = 'WORKOUT_GENERATION'
    AND EXISTS (
      SELECT 1 FROM ai_operation_configs a2
      WHERE a2."operationType" = 'NUTRITION_GENERATION'
        AND a2."model" = a1."model"
        AND a2."creditCost" > a1."creditCost"
    );
END IF;

-- Similar logic for EDIT types
IF EXISTS (
  SELECT 1 FROM pg_enum 
  WHERE enumlabel = 'NUTRITION_EDIT' 
  AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
) AND EXISTS (
  SELECT 1 FROM pg_enum 
  WHERE enumlabel = 'WORKOUT_EDIT' 
  AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
) THEN
  DELETE FROM ai_operation_configs a1
  WHERE a1."operationType" = 'NUTRITION_EDIT'
    AND EXISTS (
      SELECT 1 FROM ai_operation_configs a2
      WHERE a2."operationType" = 'WORKOUT_EDIT'
        AND a2."model" = a1."model"
        AND a2."creditCost" >= a1."creditCost"
    );

  DELETE FROM ai_operation_configs a1
  WHERE a1."operationType" = 'WORKOUT_EDIT'
    AND EXISTS (
      SELECT 1 FROM ai_operation_configs a2
      WHERE a2."operationType" = 'NUTRITION_EDIT'
        AND a2."model" = a1."model"
        AND a2."creditCost" > a1."creditCost"
    );
END IF;

-- Step 1b: Drop old unique constraint and add composite unique constraint
-- This allows multiple configs with same operationType but different models
ALTER TABLE ai_operation_configs DROP CONSTRAINT IF EXISTS ai_operation_configs_operationType_key;
    
    -- Only add constraint if it doesn't already exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint 
      WHERE conname = 'ai_operation_configs_operationType_model_key'
    ) THEN
ALTER TABLE ai_operation_configs ADD CONSTRAINT ai_operation_configs_operationType_model_key UNIQUE ("operationType", "model");
    END IF;

    -- Step 2: Update remaining entries to new operation types (only if enum values exist)
    IF EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'PLAN_GENERATION' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
    ) THEN
      -- Only update if legacy values exist in enum
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'WORKOUT_GENERATION' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
      ) THEN
        UPDATE ai_operation_configs
        SET "operationType" = 'PLAN_GENERATION'
        WHERE "operationType" = 'WORKOUT_GENERATION';
      END IF;
      
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'NUTRITION_GENERATION' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
      ) THEN
        UPDATE ai_operation_configs
        SET "operationType" = 'PLAN_GENERATION'
        WHERE "operationType" = 'NUTRITION_GENERATION';
      END IF;
    END IF;

    IF EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'PLAN_MODIFICATION' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
    ) THEN
      -- Only update if legacy values exist in enum
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'WORKOUT_EDIT' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
      ) THEN
        UPDATE ai_operation_configs
        SET "operationType" = 'PLAN_MODIFICATION'
        WHERE "operationType" = 'WORKOUT_EDIT';
      END IF;
      
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'NUTRITION_EDIT' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
      ) THEN
        UPDATE ai_operation_configs
        SET "operationType" = 'PLAN_MODIFICATION'
        WHERE "operationType" = 'NUTRITION_EDIT';
      END IF;
    END IF;
  END IF;

-- Step 3: Update history table (no unique constraint, so no duplicates to worry about)
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'ai_config_history'
  ) THEN
    IF EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'PLAN_GENERATION' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
    ) THEN
      -- Only update if legacy values exist in enum
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'WORKOUT_GENERATION' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
      ) THEN
        UPDATE ai_config_history
        SET "operationType" = 'PLAN_GENERATION'
        WHERE "operationType" = 'WORKOUT_GENERATION';
      END IF;
      
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'NUTRITION_GENERATION' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
      ) THEN
        UPDATE ai_config_history
        SET "operationType" = 'PLAN_GENERATION'
        WHERE "operationType" = 'NUTRITION_GENERATION';
      END IF;
    END IF;

    IF EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'PLAN_MODIFICATION' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
    ) THEN
      -- Only update if legacy values exist in enum
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'WORKOUT_EDIT' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
      ) THEN
        UPDATE ai_config_history
        SET "operationType" = 'PLAN_MODIFICATION'
        WHERE "operationType" = 'WORKOUT_EDIT';
      END IF;
      
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'NUTRITION_EDIT' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
      ) THEN
        UPDATE ai_config_history
        SET "operationType" = 'PLAN_MODIFICATION'
        WHERE "operationType" = 'NUTRITION_EDIT';
      END IF;
    END IF;
  END IF;
END $$;

