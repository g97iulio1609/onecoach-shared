-- =============================================================================
-- OneCoach Database - Exercise Reference Data
-- =============================================================================
-- Module 0004: Exercise Types, Muscles, Body Parts, Equipment
-- Following KISS, SOLID, and DRY principles
-- =============================================================================

-- Exercise reference data
CREATE TABLE "exercise_types" (
    "name" VARCHAR(64) NOT NULL,
    "imageUrl" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "exercise_types_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "muscles" (
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "muscles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "body_parts" (
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "body_parts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "equipments" (
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "id" TEXT NOT NULL,

    CONSTRAINT "equipments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "workout_goals" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "workout_goals_pkey" PRIMARY KEY ("id")
);

-- =============================================================================
-- INDEXES - Exercise Reference Data
-- =============================================================================

CREATE UNIQUE INDEX "exercise_types_name_key" ON "exercise_types"("name");
CREATE INDEX "exercise_types_name_idx" ON "exercise_types"("name");

CREATE UNIQUE INDEX "muscles_name_key" ON "muscles"("name");
CREATE UNIQUE INDEX "muscles_slug_key" ON "muscles"("slug");
CREATE INDEX "muscles_name_idx" ON "muscles"("name");

CREATE UNIQUE INDEX "body_parts_name_key" ON "body_parts"("name");
CREATE UNIQUE INDEX "body_parts_slug_key" ON "body_parts"("slug");
CREATE INDEX "body_parts_name_idx" ON "body_parts"("name");

CREATE UNIQUE INDEX "equipments_name_key" ON "equipments"("name");
CREATE UNIQUE INDEX "equipments_slug_key" ON "equipments"("slug");
CREATE INDEX "equipments_name_idx" ON "equipments"("name");

CREATE UNIQUE INDEX "workout_goals_name_key" ON "workout_goals"("name");
CREATE UNIQUE INDEX "workout_goals_slug_key" ON "workout_goals"("slug");
CREATE INDEX "workout_goals_name_idx" ON "workout_goals"("name");
