-- =============================================================================
-- onecoach Database - Promotions System
-- =============================================================================
-- Migration: Add promotions and promotion_uses tables
-- Following KISS, SOLID, and DRY principles
-- =============================================================================
-- This migration is idempotent and will only run if the required tables exist.

DO $$
BEGIN
  -- Add PROMOTION to TransactionType enum if it exists
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'TransactionType') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'PROMOTION' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'TransactionType')
    ) THEN
      ALTER TYPE "TransactionType" ADD VALUE 'PROMOTION';
    END IF;
  END IF;

  -- Add PromotionType enum if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PromotionType') THEN
CREATE TYPE "PromotionType" AS ENUM ('STRIPE_COUPON', 'BONUS_CREDITS');
  END IF;

  -- Add DiscountType enum if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'DiscountType') THEN
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');
  END IF;

  -- Create promotions table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotions') THEN
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "PromotionType" NOT NULL,
    "stripeCouponId" TEXT,
    "discountType" "DiscountType",
    "discountValue" DECIMAL(65,30),
    "bonusCredits" INTEGER,
    "maxUses" INTEGER,
    "maxUsesPerUser" INTEGER NOT NULL DEFAULT 1,
    "validFrom" TIMESTAMP(3) NOT NULL,
    "validUntil" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- Create unique index for code
CREATE UNIQUE INDEX "promotions_code_key" ON "promotions"("code");

-- Create indexes for promotions
CREATE INDEX "promotions_code_idx" ON "promotions"("code");
CREATE INDEX "promotions_isActive_idx" ON "promotions"("isActive");
CREATE INDEX "promotions_validFrom_idx" ON "promotions"("validFrom");
CREATE INDEX "promotions_validUntil_idx" ON "promotions"("validUntil");
CREATE INDEX "promotions_type_idx" ON "promotions"("type");
CREATE INDEX "promotions_createdAt_idx" ON "promotions"("createdAt");
  END IF;

  -- Create promotion_uses table if it doesn't exist
  IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotion_uses') THEN
CREATE TABLE "promotion_uses" (
    "id" TEXT NOT NULL,
    "promotionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "paymentId" TEXT,
    "stripeCheckoutSessionId" TEXT,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "promotion_uses_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint for promotionId + userId (one use per user per promo)
CREATE UNIQUE INDEX "promotion_uses_promotionId_userId_key" ON "promotion_uses"("promotionId", "userId");

-- Create indexes for promotion_uses
CREATE INDEX "promotion_uses_promotionId_idx" ON "promotion_uses"("promotionId");
CREATE INDEX "promotion_uses_userId_idx" ON "promotion_uses"("userId");
CREATE INDEX "promotion_uses_paymentId_idx" ON "promotion_uses"("paymentId");
CREATE INDEX "promotion_uses_appliedAt_idx" ON "promotion_uses"("appliedAt");

    -- Add foreign key constraints only if referenced tables exist
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'promotions') THEN
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'users') THEN
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'payments') THEN
ALTER TABLE "promotion_uses" ADD CONSTRAINT "promotion_uses_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
  END IF;
END $$;

