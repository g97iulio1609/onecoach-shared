-- Create enums if they don't exist
DO $$ BEGIN
    CREATE TYPE "RolloutStrategy" AS ENUM ('ALL', 'ROLE_BASED', 'PERCENTAGE', 'RANDOM', 'BETA_USERS', 'COMBINED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE "FlagEventType" AS ENUM ('ENABLED', 'DISABLED', 'EVALUATED', 'ERROR');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Feature flags table
CREATE TABLE IF NOT EXISTS "feature_flags" (
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
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("id")
);

-- Feature flag metrics table
CREATE TABLE IF NOT EXISTS "feature_flag_metrics" (
    "id" TEXT NOT NULL,
    "flagKey" TEXT NOT NULL,
    "userId" TEXT,
    "event" "FlagEventType" NOT NULL,
    "value" BOOLEAN,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "feature_flag_metrics_pkey" PRIMARY KEY ("id")
);

-- Feature flag feedback table
CREATE TABLE IF NOT EXISTS "feature_flag_feedback" (
    "id" TEXT NOT NULL,
    "flagKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "feature_flag_feedback_pkey" PRIMARY KEY ("id")
);

-- Indexes for feature_flags
CREATE UNIQUE INDEX IF NOT EXISTS "feature_flags_key_key" ON "feature_flags"("key");
CREATE INDEX IF NOT EXISTS "feature_flags_key_idx" ON "feature_flags"("key");
CREATE INDEX IF NOT EXISTS "feature_flags_enabled_idx" ON "feature_flags"("enabled");
CREATE INDEX IF NOT EXISTS "feature_flags_strategy_idx" ON "feature_flags"("strategy");
CREATE INDEX IF NOT EXISTS "feature_flags_createdAt_idx" ON "feature_flags"("createdAt");

-- Indexes for feature_flag_metrics
CREATE INDEX IF NOT EXISTS "feature_flag_metrics_flagKey_idx" ON "feature_flag_metrics"("flagKey");
CREATE INDEX IF NOT EXISTS "feature_flag_metrics_userId_idx" ON "feature_flag_metrics"("userId");
CREATE INDEX IF NOT EXISTS "feature_flag_metrics_event_idx" ON "feature_flag_metrics"("event");
CREATE INDEX IF NOT EXISTS "feature_flag_metrics_timestamp_idx" ON "feature_flag_metrics"("timestamp");

-- Indexes for feature_flag_feedback
CREATE INDEX IF NOT EXISTS "feature_flag_feedback_flagKey_idx" ON "feature_flag_feedback"("flagKey");
CREATE INDEX IF NOT EXISTS "feature_flag_feedback_userId_idx" ON "feature_flag_feedback"("userId");
CREATE INDEX IF NOT EXISTS "feature_flag_feedback_rating_idx" ON "feature_flag_feedback"("rating");
CREATE INDEX IF NOT EXISTS "feature_flag_feedback_createdAt_idx" ON "feature_flag_feedback"("createdAt");

-- Foreign keys (only if tables don't exist)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'feature_flag_metrics_flagKey_fkey'
    ) THEN
        ALTER TABLE "feature_flag_metrics" 
        ADD CONSTRAINT "feature_flag_metrics_flagKey_fkey" 
        FOREIGN KEY ("flagKey") REFERENCES "feature_flags"("key") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'feature_flag_feedback_flagKey_fkey'
    ) THEN
        ALTER TABLE "feature_flag_feedback" 
        ADD CONSTRAINT "feature_flag_feedback_flagKey_fkey" 
        FOREIGN KEY ("flagKey") REFERENCES "feature_flags"("key") 
        ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

