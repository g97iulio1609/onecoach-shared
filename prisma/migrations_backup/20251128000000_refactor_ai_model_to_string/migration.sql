
/*
  Refactoring AIModel to String
  --------------------------------------------------
  1. Update tables to use String instead of AIModel enum.
  2. Update existing data from Enum-style strings to OpenRouter-style strings.
  3. Drop the AIModel enum.
*/

-- 1. Alter tables to use TEXT instead of AIModel enum (only if columns are of enum type)
DO $$
BEGIN
  -- Check if ai_operation_configs.model is of enum type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'ai_operation_configs' 
    AND column_name = 'model'
    AND udt_name = 'AIModel'
  ) THEN
    ALTER TABLE "ai_operation_configs" ALTER COLUMN "model" TYPE TEXT USING "model"::TEXT;
  END IF;

  -- Check if ai_config_history.model is of enum type
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'ai_config_history' 
    AND column_name = 'model'
    AND udt_name = 'AIModel'
  ) THEN
    ALTER TABLE "ai_config_history" ALTER COLUMN "model" TYPE TEXT USING "model"::TEXT;
  END IF;
END $$;

-- 2. Migrate Data (Static Mapping based on old ai-model-mapper.ts)
UPDATE "ai_operation_configs" SET "model" = 'google/gemini-2.5-flash' WHERE "model" = 'GEMINI_2_5_FLASH';
UPDATE "ai_operation_configs" SET "model" = 'google/gemini-2.5-pro' WHERE "model" = 'GEMINI_2_5_PRO';
UPDATE "ai_operation_configs" SET "model" = 'anthropic/claude-3.5-haiku' WHERE "model" = 'CLAUDE_4_5_HAIKU';
UPDATE "ai_operation_configs" SET "model" = 'anthropic/claude-3.5-sonnet' WHERE "model" = 'CLAUDE_4_5_SONNET';
UPDATE "ai_operation_configs" SET "model" = 'openai/gpt-4o' WHERE "model" = 'GPT_5_MEDIUM';
UPDATE "ai_operation_configs" SET "model" = 'openai/gpt-4o' WHERE "model" = 'GPT_5_HIGH';
UPDATE "ai_operation_configs" SET "model" = 'x-ai/grok-beta' WHERE "model" = 'GROK_4_FAST';
UPDATE "ai_operation_configs" SET "model" = 'x-ai/grok-2' WHERE "model" = 'GROK_4';
UPDATE "ai_operation_configs" SET "model" = 'anthropic/claude-3.5-sonnet' WHERE "model" = 'OPENROUTER_CLAUDE_4_5_SONNET';
UPDATE "ai_operation_configs" SET "model" = 'google/gemini-2.5-flash' WHERE "model" = 'OPENROUTER_GEMINI_2_5_FLASH';
UPDATE "ai_operation_configs" SET "model" = 'x-ai/grok-beta' WHERE "model" = 'OPENROUTER_GROK_4_FAST';
UPDATE "ai_operation_configs" SET "model" = 'openai/gpt-4o' WHERE "model" = 'OPENROUTER_GPT_OSS_120B';

-- History table updates (optional but good for consistency)
UPDATE "ai_config_history" SET "model" = 'google/gemini-2.5-flash' WHERE "model" = 'GEMINI_2_5_FLASH';
UPDATE "ai_config_history" SET "model" = 'google/gemini-2.5-pro' WHERE "model" = 'GEMINI_2_5_PRO';
UPDATE "ai_config_history" SET "model" = 'anthropic/claude-3.5-haiku' WHERE "model" = 'CLAUDE_4_5_HAIKU';
UPDATE "ai_config_history" SET "model" = 'anthropic/claude-3.5-sonnet' WHERE "model" = 'CLAUDE_4_5_SONNET';
UPDATE "ai_config_history" SET "model" = 'openai/gpt-4o' WHERE "model" = 'GPT_5_MEDIUM';
UPDATE "ai_config_history" SET "model" = 'openai/gpt-4o' WHERE "model" = 'GPT_5_HIGH';
UPDATE "ai_config_history" SET "model" = 'x-ai/grok-beta' WHERE "model" = 'GROK_4_FAST';
UPDATE "ai_config_history" SET "model" = 'x-ai/grok-2' WHERE "model" = 'GROK_4';
UPDATE "ai_config_history" SET "model" = 'anthropic/claude-3.5-sonnet' WHERE "model" = 'OPENROUTER_CLAUDE_4_5_SONNET';
UPDATE "ai_config_history" SET "model" = 'google/gemini-2.5-flash' WHERE "model" = 'OPENROUTER_GEMINI_2_5_FLASH';
UPDATE "ai_config_history" SET "model" = 'x-ai/grok-beta' WHERE "model" = 'OPENROUTER_GROK_4_FAST';
UPDATE "ai_config_history" SET "model" = 'openai/gpt-4o' WHERE "model" = 'OPENROUTER_GPT_OSS_120B';

-- 3. Drop Enum (only if it exists and is no longer used)
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
