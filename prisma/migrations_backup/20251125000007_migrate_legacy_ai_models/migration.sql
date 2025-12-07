-- Migration: Migrate legacy AIModel enum values to modern equivalents
-- Step 1: Add new enum values first
-- This migration is idempotent and will only run if the enum type exists.

DO $$
BEGIN
  -- Only proceed if AIModel enum exists
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'AIModel') THEN
    -- Add new enum values (IF NOT EXISTS is not supported, so we check first)
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'CLAUDE_4_5_HAIKU' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'CLAUDE_4_5_HAIKU';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'CLAUDE_4_5_SONNET' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'CLAUDE_4_5_SONNET';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'GEMINI_2_5_FLASH' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'GEMINI_2_5_FLASH';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'GEMINI_2_5_PRO' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'GEMINI_2_5_PRO';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'GPT_5_MEDIUM' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'GPT_5_MEDIUM';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'GPT_5_HIGH' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'GPT_5_HIGH';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'GROK_4_FAST' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'GROK_4_FAST';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'GROK_4' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'GROK_4';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'OPENROUTER_CLAUDE_4_5_SONNET' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'OPENROUTER_CLAUDE_4_5_SONNET';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'OPENROUTER_GEMINI_2_5_FLASH' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'OPENROUTER_GEMINI_2_5_FLASH';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'OPENROUTER_GROK_4_FAST' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'OPENROUTER_GROK_4_FAST';
    END IF;

    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'OPENROUTER_GPT_OSS_120B' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
    ) THEN
      ALTER TYPE "AIModel" ADD VALUE 'OPENROUTER_GPT_OSS_120B';
    END IF;

    -- Step 2: Migrate existing data from legacy values to new values (only if tables and enum values exist)
    -- This migration combines both enum addition and data migration in one step
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ai_operation_configs') THEN
      -- Only update if both legacy and new enum values exist
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'CLAUDE_4_5_HAIKU' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
      ) AND EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'HAIKU' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
      ) THEN
        UPDATE "ai_operation_configs"
        SET "model" = 'CLAUDE_4_5_HAIKU'
        WHERE "model" = 'HAIKU';
      END IF;

      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'CLAUDE_4_5_SONNET' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
      ) AND EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'SONNET' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
      ) THEN
        UPDATE "ai_operation_configs"
        SET "model" = 'CLAUDE_4_5_SONNET'
        WHERE "model" = 'SONNET';
      END IF;
    END IF;

    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ai_config_history') THEN
      -- Only update if both legacy and new enum values exist
      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'CLAUDE_4_5_HAIKU' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
      ) AND EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'HAIKU' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
      ) THEN
        UPDATE "ai_config_history"
        SET "model" = 'CLAUDE_4_5_HAIKU'
        WHERE "model" = 'HAIKU';
      END IF;

      IF EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'CLAUDE_4_5_SONNET' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
      ) AND EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'SONNET' 
        AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'AIModel')
      ) THEN
        UPDATE "ai_config_history"
        SET "model" = 'CLAUDE_4_5_SONNET'
        WHERE "model" = 'SONNET';
      END IF;
    END IF;
  END IF;
END $$;

-- Note: We cannot directly remove enum values in PostgreSQL
-- The removal will be handled by Prisma when applying schema changes
