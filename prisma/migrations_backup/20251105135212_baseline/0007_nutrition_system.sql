-- =============================================================================
-- OneCoach Database - Nutrition System
-- =============================================================================
-- Module 0007: Food Database and Nutrition Plans
-- Following KISS, SOLID, and DRY principles
-- =============================================================================

-- Food reference data
CREATE TABLE "food_brands" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "nameNormalized" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_brands_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "food_categories" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_categories_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "nutrition_goals" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "nutrition_goals_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "food_items" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "nameNormalized" VARCHAR(255) NOT NULL,
    "barcode" VARCHAR(128),
    "macrosPer100g" JSONB NOT NULL,
    "servingSize" DECIMAL(6,2),
    "unit" TEXT NOT NULL DEFAULT 'g',
    "metadata" JSONB,
    "imageUrl" VARCHAR(512),
    "brandId" TEXT,
    "proteinPct" DECIMAL(5,2),
    "carbPct" DECIMAL(5,2),
    "fatPct" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_items_pkey" PRIMARY KEY ("id")
);

-- Food relationships
CREATE TABLE "food_item_categories" (
    "foodItemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "food_item_categories_pkey" PRIMARY KEY ("foodItemId","categoryId")
);

-- Nutrition plans and tracking
CREATE TABLE "nutrition_plans" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "targetMacros" JSONB NOT NULL,
    "restrictions" TEXT[],
    "preferences" TEXT[],
    "status" "NutritionStatus" NOT NULL DEFAULT 'ACTIVE',
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "goals" TEXT[],
    "weeks" JSONB NOT NULL,

    CONSTRAINT "nutrition_plans_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "nutrition_day_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "meals" JSONB NOT NULL,
    "actualDailyMacros" JSONB,
    "waterIntake" DECIMAL(4,2),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutrition_day_logs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "nutrition_adherence_metrics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "daysLogged" INTEGER NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "adherenceRate" DECIMAL(5,2) NOT NULL,
    "avgCalories" DECIMAL(6,2) NOT NULL,
    "avgProtein" DECIMAL(6,2) NOT NULL,
    "avgCarbs" DECIMAL(6,2) NOT NULL,
    "avgFats" DECIMAL(6,2) NOT NULL,
    "avgWaterIntake" DECIMAL(4,2),
    "caloriesVariance" DECIMAL(6,2) NOT NULL,
    "proteinVariance" DECIMAL(6,2) NOT NULL,
    "carbsVariance" DECIMAL(6,2) NOT NULL,
    "fatsVariance" DECIMAL(6,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutrition_adherence_metrics_pkey" PRIMARY KEY ("id")
);

-- =============================================================================
-- INDEXES - Nutrition System
-- =============================================================================

CREATE UNIQUE INDEX "food_brands_name_key" ON "food_brands"("name");
CREATE INDEX "food_brands_nameNormalized_idx" ON "food_brands"("nameNormalized");

CREATE UNIQUE INDEX "food_categories_name_key" ON "food_categories"("name");
CREATE UNIQUE INDEX "food_categories_slug_key" ON "food_categories"("slug");
CREATE INDEX "food_categories_slug_idx" ON "food_categories"("slug");

CREATE UNIQUE INDEX "nutrition_goals_name_key" ON "nutrition_goals"("name");
CREATE UNIQUE INDEX "nutrition_goals_slug_key" ON "nutrition_goals"("slug");

-- Food items indexes
CREATE UNIQUE INDEX "food_items_barcode_key" ON "food_items"("barcode");
CREATE INDEX "food_items_name_idx" ON "food_items"("name");
CREATE INDEX "food_items_nameNormalized_idx" ON "food_items"("nameNormalized");
CREATE INDEX "food_items_barcode_idx" ON "food_items"("barcode");
CREATE INDEX "food_items_brandId_idx" ON "food_items"("brandId");
CREATE INDEX "food_items_proteinPct_idx" ON "food_items"("proteinPct");
CREATE INDEX "food_items_carbPct_idx" ON "food_items"("carbPct");
CREATE INDEX "food_items_fatPct_idx" ON "food_items"("fatPct");

-- Food relationship indexes
CREATE INDEX "food_item_categories_categoryId_idx" ON "food_item_categories"("categoryId");

-- Nutrition plan indexes
CREATE INDEX "nutrition_plans_createdAt_idx" ON "nutrition_plans"("createdAt");
CREATE INDEX "nutrition_plans_status_idx" ON "nutrition_plans"("status");
CREATE INDEX "nutrition_plans_userId_idx" ON "nutrition_plans"("userId");

CREATE INDEX "nutrition_day_logs_userId_idx" ON "nutrition_day_logs"("userId");
CREATE INDEX "nutrition_day_logs_planId_idx" ON "nutrition_day_logs"("planId");
CREATE INDEX "nutrition_day_logs_date_idx" ON "nutrition_day_logs"("date");
CREATE UNIQUE INDEX "nutrition_day_logs_userId_planId_weekNumber_dayNumber_date_key" ON "nutrition_day_logs"("userId", "planId", "weekNumber", "dayNumber", "date");

CREATE INDEX "nutrition_adherence_metrics_userId_idx" ON "nutrition_adherence_metrics"("userId");
CREATE INDEX "nutrition_adherence_metrics_planId_idx" ON "nutrition_adherence_metrics"("planId");
CREATE INDEX "nutrition_adherence_metrics_startDate_idx" ON "nutrition_adherence_metrics"("startDate");
CREATE UNIQUE INDEX "nutrition_adherence_metrics_userId_planId_weekNumber_key" ON "nutrition_adherence_metrics"("userId", "planId", "weekNumber");

-- =============================================================================
-- FOREIGN KEYS - Nutrition System
-- =============================================================================

ALTER TABLE "food_items" ADD CONSTRAINT "food_items_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "food_brands"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "food_item_categories" ADD CONSTRAINT "food_item_categories_foodItemId_fkey" FOREIGN KEY ("foodItemId") REFERENCES "food_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "food_item_categories" ADD CONSTRAINT "food_item_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "food_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "nutrition_plans" ADD CONSTRAINT "nutrition_plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "nutrition_day_logs" ADD CONSTRAINT "nutrition_day_logs_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "nutrition_day_logs" ADD CONSTRAINT "nutrition_day_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "nutrition_adherence_metrics" ADD CONSTRAINT "nutrition_adherence_metrics_planId_fkey" FOREIGN KEY ("planId") REFERENCES "nutrition_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "nutrition_adherence_metrics" ADD CONSTRAINT "nutrition_adherence_metrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
