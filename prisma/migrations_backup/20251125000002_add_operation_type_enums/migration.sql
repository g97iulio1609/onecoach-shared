-- Migration: Add new OperationType enum values
-- 
-- This migration adds the new enum values that will replace legacy values:
-- - PLAN_GENERATION
-- - PLAN_MODIFICATION  
-- - PLAN_RECALCULATION
--
-- These must be added in a separate migration because PostgreSQL requires
-- enum values to be committed before they can be used in the same transaction.
--
-- This migration is idempotent and will only run if the enum type exists.

DO $$
BEGIN
  -- Only proceed if OperationType enum exists
  IF EXISTS (
    SELECT 1 FROM pg_type 
    WHERE typname = 'OperationType'
  ) THEN
-- Add new enum values (each ALTER TYPE statement commits implicitly)
    -- IF NOT EXISTS is not supported for enum values, so we check first
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'PLAN_GENERATION' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
    ) THEN
      ALTER TYPE "OperationType" ADD VALUE 'PLAN_GENERATION';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'PLAN_MODIFICATION' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
    ) THEN
      ALTER TYPE "OperationType" ADD VALUE 'PLAN_MODIFICATION';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'PLAN_RECALCULATION' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OperationType')
    ) THEN
      ALTER TYPE "OperationType" ADD VALUE 'PLAN_RECALCULATION';
    END IF;
  END IF;
END $$;

