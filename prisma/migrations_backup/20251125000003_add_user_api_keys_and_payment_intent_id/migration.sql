-- =============================================================================
-- OneCoach Database - User API Keys and Payment Intent ID
-- =============================================================================
-- Migration: Add user_api_keys table and stripePaymentIntentId to payments
-- Following KISS, SOLID, and DRY principles
-- =============================================================================
-- This migration is idempotent and will only run if the required tables exist.

DO $$
BEGIN
  -- Add ApiKeyStatus enum if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ApiKeyStatus') THEN
CREATE TYPE "ApiKeyStatus" AS ENUM ('ACTIVE', 'REVOKED', 'EXPIRED');
  END IF;

  -- Add stripePaymentIntentId column to payments table if it exists
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payments') THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_schema = 'public' 
      AND table_name = 'payments' 
      AND column_name = 'stripePaymentIntentId'
    ) THEN
ALTER TABLE "payments" ADD COLUMN "stripePaymentIntentId" TEXT;
    END IF;

    -- Create unique index for idempotency if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_indexes 
      WHERE indexname = 'payments_stripePaymentIntentId_key'
    ) THEN
CREATE UNIQUE INDEX "payments_stripePaymentIntentId_key" ON "payments"("stripePaymentIntentId") WHERE "stripePaymentIntentId" IS NOT NULL;
    END IF;

    -- Create index for queries if it doesn't exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_indexes 
      WHERE indexname = 'payments_stripePaymentIntentId_idx'
    ) THEN
CREATE INDEX "payments_stripePaymentIntentId_idx" ON "payments"("stripePaymentIntentId");
    END IF;
  END IF;

  -- Create user_api_keys table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_api_keys') THEN
CREATE TABLE "user_api_keys" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'openrouter',
    "keyLabel" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "limit" INTEGER NOT NULL,
    "status" "ApiKeyStatus" NOT NULL DEFAULT 'ACTIVE',
    "stripePaymentIntentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_api_keys_pkey" PRIMARY KEY ("id")
);

-- Create indexes for user_api_keys
CREATE INDEX "user_api_keys_userId_idx" ON "user_api_keys"("userId");
CREATE INDEX "user_api_keys_stripePaymentIntentId_idx" ON "user_api_keys"("stripePaymentIntentId");
CREATE INDEX "user_api_keys_status_idx" ON "user_api_keys"("status");
CREATE INDEX "user_api_keys_provider_idx" ON "user_api_keys"("provider");

    -- Add foreign key constraint only if users table exists
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
ALTER TABLE "user_api_keys" ADD CONSTRAINT "user_api_keys_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
  END IF;
END $$;

