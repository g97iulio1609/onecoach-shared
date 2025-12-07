-- =============================================================================
-- OneCoach Database - Exercise Main Tables
-- =============================================================================
-- Module 0005: Exercises and Relationships
-- Following KISS, SOLID, and DRY principles
-- =============================================================================

-- Main exercises table
CREATE TABLE "exercises" (
    "id" VARCHAR(40) NOT NULL,
    "slug" VARCHAR(128) NOT NULL,
    "overview" TEXT,
    "imageUrl" TEXT,
    "videoUrl" TEXT,
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "instructions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "exerciseTips" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "variations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "approvalStatus" "ExerciseApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "approvedAt" TIMESTAMP(3),
    "isUserGenerated" BOOLEAN NOT NULL DEFAULT false,
    "createdById" TEXT,
    "approvedById" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "exerciseTypeId" TEXT,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- Exercise relationships and associations
CREATE TABLE "exercise_body_parts" (
    "exerciseId" TEXT NOT NULL,
    "bodyPartId" TEXT NOT NULL,

    CONSTRAINT "exercise_body_parts_pkey" PRIMARY KEY ("exerciseId","bodyPartId")
);

CREATE TABLE "exercise_equipments" (
    "exerciseId" TEXT NOT NULL,
    "equipmentId" TEXT NOT NULL,

    CONSTRAINT "exercise_equipments_pkey" PRIMARY KEY ("exerciseId","equipmentId")
);

CREATE TABLE "exercise_muscles" (
    "exerciseId" TEXT NOT NULL,
    "role" "MuscleRole" NOT NULL,
    "muscleId" TEXT NOT NULL,

    CONSTRAINT "exercise_muscles_pkey" PRIMARY KEY ("exerciseId","muscleId","role")
);

CREATE TABLE "exercise_relations" (
    "id" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,
    "toId" TEXT NOT NULL,
    "relation" "ExerciseRelationType" NOT NULL DEFAULT 'ALTERNATIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_relations_pkey" PRIMARY KEY ("id")
);

-- =============================================================================
-- INDEXES - Exercise Main Tables
-- =============================================================================

CREATE UNIQUE INDEX "exercises_slug_key" ON "exercises"("slug");
CREATE INDEX "exercises_approvalStatus_idx" ON "exercises"("approvalStatus");
CREATE INDEX "exercises_approvedById_idx" ON "exercises"("approvedById");
CREATE INDEX "exercises_createdAt_idx" ON "exercises"("createdAt");
CREATE INDEX "exercises_createdById_idx" ON "exercises"("createdById");
CREATE INDEX "exercises_exerciseTypeId_idx" ON "exercises"("exerciseTypeId");

-- Exercise relationship indexes
CREATE INDEX "exercise_body_parts_bodyPartId_idx" ON "exercise_body_parts"("bodyPartId");
CREATE INDEX "exercise_equipments_equipmentId_idx" ON "exercise_equipments"("equipmentId");
CREATE INDEX "exercise_muscles_muscleId_idx" ON "exercise_muscles"("muscleId");
CREATE INDEX "exercise_muscles_role_idx" ON "exercise_muscles"("role");
CREATE INDEX "exercise_relations_toId_idx" ON "exercise_relations"("toId");
CREATE UNIQUE INDEX "exercise_relations_fromId_toId_relation_key" ON "exercise_relations"("fromId", "toId", "relation");

-- =============================================================================
-- FOREIGN KEYS - Exercise Main Tables
-- =============================================================================

ALTER TABLE "exercises" ADD CONSTRAINT "exercises_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_exerciseTypeId_fkey" FOREIGN KEY ("exerciseTypeId") REFERENCES "exercise_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "exercise_body_parts" ADD CONSTRAINT "exercise_body_parts_bodyPartId_fkey" FOREIGN KEY ("bodyPartId") REFERENCES "body_parts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_body_parts" ADD CONSTRAINT "exercise_body_parts_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_equipments" ADD CONSTRAINT "exercise_equipments_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "exercise_muscles" ADD CONSTRAINT "exercise_muscles_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_muscles" ADD CONSTRAINT "exercise_muscles_muscleId_fkey" FOREIGN KEY ("muscleId") REFERENCES "muscles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "exercise_relations" ADD CONSTRAINT "exercise_relations_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_relations" ADD CONSTRAINT "exercise_relations_toId_fkey" FOREIGN KEY ("toId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
