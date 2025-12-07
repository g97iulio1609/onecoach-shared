-- =============================================================================
-- onecoach Database - Coach and Marketplace System
-- =============================================================================
-- Module 0009: Coach Profiles, Vetting, and Marketplace Plans
-- Following KISS, SOLID, and DRY principles
-- =============================================================================

CREATE TABLE "coach_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "credentials" TEXT,
    "coachingStyle" TEXT,
    "linkedinUrl" TEXT,
    "instagramUrl" TEXT,
    "websiteUrl" TEXT,
    "verificationStatus" "CoachVerificationStatus" NOT NULL DEFAULT 'PENDING',
    "isPubliclyVisible" BOOLEAN NOT NULL DEFAULT false,
    "totalSales" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(3,2),
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_profiles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "coach_vetting_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "credentialDocuments" JSONB,
    "status" "VettingStatus" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "reviewNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coach_vetting_requests_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "user_payout_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "beneficiaryName" VARCHAR(255) NOT NULL,
    "taxCode" VARCHAR(32),
    "vatNumber" VARCHAR(32),
    "iban" VARCHAR(34),
    "bicSwift" VARCHAR(11),
    "addressLine1" VARCHAR(255),
    "addressLine2" VARCHAR(255),
    "city" VARCHAR(128),
    "postalCode" VARCHAR(24),
    "country" VARCHAR(2),
    "taxResidence" VARCHAR(2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_payout_profiles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "marketplace_plans" (
    "id" TEXT NOT NULL,
    "coachId" TEXT NOT NULL,
    "planType" "MarketplacePlanType" NOT NULL,
    "workoutProgramId" TEXT,
    "nutritionPlanId" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'EUR',
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "totalPurchases" INTEGER NOT NULL DEFAULT 0,
    "averageRating" DECIMAL(3,2),
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "marketplace_plans_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "plan_purchases" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketplacePlanId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL,
    "coachCommission" DECIMAL(10,2) NOT NULL,
    "platformCommission" DECIMAL(10,2) NOT NULL,
    "stripePaymentId" TEXT,
    "status" "PurchaseStatus" NOT NULL DEFAULT 'PENDING',
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "refundedAt" TIMESTAMP(3),

    CONSTRAINT "plan_purchases_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "plan_ratings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "marketplacePlanId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plan_ratings_pkey" PRIMARY KEY ("id")
);

-- =============================================================================
-- INDEXES - Coach and Marketplace System
-- =============================================================================

CREATE UNIQUE INDEX "coach_profiles_userId_key" ON "coach_profiles"("userId");
CREATE INDEX "coach_profiles_userId_idx" ON "coach_profiles"("userId");
CREATE INDEX "coach_profiles_verificationStatus_idx" ON "coach_profiles"("verificationStatus");
CREATE INDEX "coach_profiles_isPubliclyVisible_idx" ON "coach_profiles"("isPubliclyVisible");

CREATE INDEX "coach_vetting_requests_userId_idx" ON "coach_vetting_requests"("userId");
CREATE INDEX "coach_vetting_requests_status_idx" ON "coach_vetting_requests"("status");

CREATE UNIQUE INDEX "user_payout_profiles_userId_key" ON "user_payout_profiles"("userId");
CREATE INDEX "user_payout_profiles_userId_idx" ON "user_payout_profiles"("userId");

CREATE INDEX "marketplace_plans_coachId_idx" ON "marketplace_plans"("coachId");
CREATE INDEX "marketplace_plans_planType_idx" ON "marketplace_plans"("planType");
CREATE INDEX "marketplace_plans_isPublished_idx" ON "marketplace_plans"("isPublished");
CREATE INDEX "marketplace_plans_averageRating_idx" ON "marketplace_plans"("averageRating");
CREATE UNIQUE INDEX "marketplace_plans_workoutProgramId_key" ON "marketplace_plans"("workoutProgramId");
CREATE UNIQUE INDEX "marketplace_plans_nutritionPlanId_key" ON "marketplace_plans"("nutritionPlanId");

CREATE INDEX "plan_purchases_userId_idx" ON "plan_purchases"("userId");
CREATE INDEX "plan_purchases_marketplacePlanId_idx" ON "plan_purchases"("marketplacePlanId");
CREATE INDEX "plan_purchases_status_idx" ON "plan_purchases"("status");
CREATE INDEX "plan_purchases_purchasedAt_idx" ON "plan_purchases"("purchasedAt");
CREATE UNIQUE INDEX "plan_purchases_stripePaymentId_key" ON "plan_purchases"("stripePaymentId");

CREATE INDEX "plan_ratings_marketplacePlanId_idx" ON "plan_ratings"("marketplacePlanId");
CREATE INDEX "plan_ratings_rating_idx" ON "plan_ratings"("rating");
CREATE UNIQUE INDEX "plan_ratings_userId_marketplacePlanId_key" ON "plan_ratings"("userId", "marketplacePlanId");

-- =============================================================================
-- FOREIGN KEYS - Coach and Marketplace System
-- =============================================================================

ALTER TABLE "coach_profiles" ADD CONSTRAINT "coach_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "coach_vetting_requests" ADD CONSTRAINT "coach_vetting_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_payout_profiles" ADD CONSTRAINT "user_payout_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_workoutProgramId_fkey" FOREIGN KEY ("workoutProgramId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "marketplace_plans" ADD CONSTRAINT "marketplace_plans_nutritionPlanId_fkey" FOREIGN KEY ("nutritionPlanId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "plan_purchases" ADD CONSTRAINT "plan_purchases_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "plan_purchases" ADD CONSTRAINT "plan_purchases_marketplacePlanId_fkey" FOREIGN KEY ("marketplacePlanId") REFERENCES "marketplace_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "plan_ratings" ADD CONSTRAINT "plan_ratings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "plan_ratings" ADD CONSTRAINT "plan_ratings_marketplacePlanId_fkey" FOREIGN KEY ("marketplacePlanId") REFERENCES "marketplace_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
