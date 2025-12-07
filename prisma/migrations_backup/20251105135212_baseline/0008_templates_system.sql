-- =============================================================================
-- onecoach Database - Templates System
-- =============================================================================
-- Module 0008: Meal, Nutrition, and Workout Templates
-- Following KISS, SOLID, and DRY principles
-- =============================================================================

CREATE TABLE "meal_templates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "meal" JSONB NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_templates_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "nutrition_templates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TemplateType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "data" JSONB NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "nutrition_templates_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "workout_templates" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "WorkoutTemplateType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "data" JSONB NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_templates_pkey" PRIMARY KEY ("id")
);

-- =============================================================================
-- INDEXES - Templates System
-- =============================================================================

CREATE INDEX "meal_templates_userId_idx" ON "meal_templates"("userId");
CREATE INDEX "meal_templates_createdAt_idx" ON "meal_templates"("createdAt");

CREATE INDEX "nutrition_templates_userId_idx" ON "nutrition_templates"("userId");
CREATE INDEX "nutrition_templates_type_idx" ON "nutrition_templates"("type");
CREATE INDEX "nutrition_templates_userId_type_idx" ON "nutrition_templates"("userId", "type");
CREATE INDEX "nutrition_templates_category_idx" ON "nutrition_templates"("category");
CREATE INDEX "nutrition_templates_createdAt_idx" ON "nutrition_templates"("createdAt");
CREATE INDEX "nutrition_templates_lastUsedAt_idx" ON "nutrition_templates"("lastUsedAt");
CREATE INDEX "nutrition_templates_usageCount_idx" ON "nutrition_templates"("usageCount");
CREATE INDEX "nutrition_templates_tags_idx" ON "nutrition_templates" USING GIN ("tags");

CREATE INDEX "workout_templates_userId_idx" ON "workout_templates"("userId");
CREATE INDEX "workout_templates_type_idx" ON "workout_templates"("type");
CREATE INDEX "workout_templates_userId_type_idx" ON "workout_templates"("userId", "type");
CREATE INDEX "workout_templates_category_idx" ON "workout_templates"("category");
CREATE INDEX "workout_templates_createdAt_idx" ON "workout_templates"("createdAt");
CREATE INDEX "workout_templates_lastUsedAt_idx" ON "workout_templates"("lastUsedAt");
CREATE INDEX "workout_templates_usageCount_idx" ON "workout_templates"("usageCount");
CREATE INDEX "workout_templates_tags_idx" ON "workout_templates" USING GIN ("tags");

-- =============================================================================
-- FOREIGN KEYS - Templates System
-- =============================================================================

ALTER TABLE "meal_templates" ADD CONSTRAINT "meal_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "nutrition_templates" ADD CONSTRAINT "nutrition_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workout_templates" ADD CONSTRAINT "workout_templates_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
