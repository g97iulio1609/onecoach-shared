-- CreateEnum
CREATE TYPE "CartStatus" AS ENUM ('ACTIVE', 'CHECKOUT_IN_PROGRESS', 'COMPLETED', 'ABANDONED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "CartItemType" AS ENUM ('CREDIT_PACK', 'MARKETPLACE_PLAN', 'SUBSCRIPTION');

-- CreateEnum
CREATE TYPE "CheckoutOfferType" AS ENUM ('CROSS_SELL', 'UPSELL');

-- CreateEnum
CREATE TYPE "CheckoutOfferPlacement" AS ENUM ('CART', 'CHECKOUT', 'POST_PURCHASE');

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "status" "CartStatus" NOT NULL DEFAULT 'ACTIVE',
    "currency" VARCHAR(3) NOT NULL DEFAULT 'EUR',
    "subtotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discountTotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "promoCode" TEXT,
    "referralCode" TEXT,
    "metadata" JSONB,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cart_items" (
    "id" TEXT NOT NULL,
    "cartId" TEXT NOT NULL,
    "itemType" "CartItemType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'EUR',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_settings" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "oneClickEnabled" BOOLEAN NOT NULL DEFAULT true,
    "linkEnabled" BOOLEAN NOT NULL DEFAULT true,
    "applePayEnabled" BOOLEAN NOT NULL DEFAULT true,
    "googlePayEnabled" BOOLEAN NOT NULL DEFAULT true,
    "savePaymentMethodDefault" BOOLEAN NOT NULL DEFAULT true,
    "autofillEnabled" BOOLEAN NOT NULL DEFAULT true,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'EUR',
    "cartExpirationHours" INTEGER NOT NULL DEFAULT 72,
    "abandonedCartReminder" BOOLEAN NOT NULL DEFAULT true,
    "reminderDelayHours" INTEGER NOT NULL DEFAULT 24,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_offer_rules" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "CheckoutOfferType" NOT NULL,
    "placement" "CheckoutOfferPlacement" NOT NULL DEFAULT 'CHECKOUT',
    "priority" INTEGER NOT NULL DEFAULT 100,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "audience" JSONB,
    "conditions" JSONB,
    "offerPayload" JSONB,
    "layout" JSONB,
    "ctaLabel" TEXT,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkout_offer_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkout_events" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "cartId" TEXT,
    "userId" UUID,
    "offerId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkout_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "carts_userId_idx" ON "carts"("userId");
CREATE INDEX "carts_status_idx" ON "carts"("status");
CREATE INDEX "carts_createdAt_idx" ON "carts"("createdAt");
CREATE INDEX "carts_lastSeenAt_idx" ON "carts"("lastSeenAt");
CREATE INDEX "carts_userId_status_idx" ON "carts"("userId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "cart_items_cartId_itemType_itemId_key" ON "cart_items"("cartId", "itemType", "itemId");
CREATE INDEX "cart_items_cartId_idx" ON "cart_items"("cartId");
CREATE INDEX "cart_items_itemType_idx" ON "cart_items"("itemType");

-- CreateIndex
CREATE INDEX "checkout_offer_rules_isActive_idx" ON "checkout_offer_rules"("isActive");
CREATE INDEX "checkout_offer_rules_placement_idx" ON "checkout_offer_rules"("placement");
CREATE INDEX "checkout_offer_rules_priority_idx" ON "checkout_offer_rules"("priority");
CREATE INDEX "checkout_offer_rules_startsAt_idx" ON "checkout_offer_rules"("startsAt");
CREATE INDEX "checkout_offer_rules_endsAt_idx" ON "checkout_offer_rules"("endsAt");

-- CreateIndex
CREATE INDEX "checkout_events_type_idx" ON "checkout_events"("type");
CREATE INDEX "checkout_events_cartId_idx" ON "checkout_events"("cartId");
CREATE INDEX "checkout_events_userId_idx" ON "checkout_events"("userId");
CREATE INDEX "checkout_events_createdAt_idx" ON "checkout_events"("createdAt");

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed default settings record
INSERT INTO "checkout_settings" (
    "id",
    "oneClickEnabled",
    "linkEnabled",
    "applePayEnabled",
    "googlePayEnabled",
    "savePaymentMethodDefault",
    "autofillEnabled",
    "currency",
    "cartExpirationHours",
    "abandonedCartReminder",
    "reminderDelayHours",
    "createdAt",
    "updatedAt"
) VALUES (
    'default',
    true,
    true,
    true,
    true,
    true,
    true,
    'EUR',
    72,
    true,
    24,
    NOW(),
    NOW()
) ON CONFLICT ("id") DO NOTHING;

