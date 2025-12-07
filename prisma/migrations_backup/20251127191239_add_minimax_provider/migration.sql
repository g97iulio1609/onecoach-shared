-- Migration: Add MINIMAX to AIProvider enum
-- 
-- This migration adds MINIMAX to the AIProvider enum to support MiniMax provider
-- which uses Anthropic SDK with custom base URL
--
-- This migration is idempotent and will only run if the enum type exists.

DO $$
BEGIN
  -- Only proceed if AIProvider enum exists
  IF EXISTS (
    SELECT 1 FROM pg_type 
    WHERE typname = 'AIProvider'
  ) THEN
    -- Add MINIMAX enum value (IF NOT EXISTS is not supported, so we check first)
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'MINIMAX' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIProvider')
    ) THEN
      ALTER TYPE "AIProvider" ADD VALUE 'MINIMAX';
    END IF;
  END IF;
END $$;







