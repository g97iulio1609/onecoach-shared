-- =============================================================================
-- OneCoach Database - Workout Programs and Sessions
-- =============================================================================
-- Module 0006: Workout Programs, Sessions, and Performance Tracking
-- Following KISS, SOLID, and DRY principles
-- =============================================================================

-- Workout programs and sessions
CREATE TABLE "workout_programs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "DifficultyLevel" NOT NULL,
    "durationWeeks" INTEGER NOT NULL,
    "goals" TEXT[],
    "status" "WorkoutStatus" NOT NULL DEFAULT 'ACTIVE',
    "weeks" JSONB NOT NULL,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workout_programs_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "workout_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "weekNumber" INTEGER NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "exercises" JSONB NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "workout_sessions_pkey" PRIMARY KEY ("id")
);

-- User performance tracking
CREATE TABLE "user_one_rep_max" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "oneRepMax" DECIMAL(5,2) NOT NULL,
    "notes" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "user_one_rep_max_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exercise_performance_records" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT NOT NULL,
    "sessionId" TEXT,
    "date" DATE NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" DECIMAL(6,2) NOT NULL,
    "volume" DECIMAL(8,2) NOT NULL,
    "rpe" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exercise_performance_records_pkey" PRIMARY KEY ("id")
);

-- =============================================================================
-- INDEXES - Workout Programs and Sessions
-- =============================================================================

CREATE INDEX "workout_programs_createdAt_idx" ON "workout_programs"("createdAt");
CREATE INDEX "workout_programs_status_idx" ON "workout_programs"("status");
CREATE INDEX "workout_programs_userId_idx" ON "workout_programs"("userId");

CREATE INDEX "workout_sessions_userId_idx" ON "workout_sessions"("userId");
CREATE INDEX "workout_sessions_programId_idx" ON "workout_sessions"("programId");
CREATE INDEX "workout_sessions_startedAt_idx" ON "workout_sessions"("startedAt");
CREATE INDEX "workout_sessions_completedAt_idx" ON "workout_sessions"("completedAt");

-- Performance tracking indexes
CREATE INDEX "user_one_rep_max_exerciseId_idx" ON "user_one_rep_max"("exerciseId");
CREATE INDEX "user_one_rep_max_userId_idx" ON "user_one_rep_max"("userId");
CREATE UNIQUE INDEX "user_one_rep_max_userId_exerciseId_key" ON "user_one_rep_max"("userId", "exerciseId");

CREATE INDEX "exercise_performance_records_userId_idx" ON "exercise_performance_records"("userId");
CREATE INDEX "exercise_performance_records_exerciseId_idx" ON "exercise_performance_records"("exerciseId");
CREATE INDEX "exercise_performance_records_date_idx" ON "exercise_performance_records"("date");

-- =============================================================================
-- FOREIGN KEYS - Workout Programs and Sessions
-- =============================================================================

ALTER TABLE "workout_programs" ADD CONSTRAINT "workout_programs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_programId_fkey" FOREIGN KEY ("programId") REFERENCES "workout_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "workout_sessions" ADD CONSTRAINT "workout_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "user_one_rep_max" ADD CONSTRAINT "user_one_rep_max_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_one_rep_max" ADD CONSTRAINT "user_one_rep_max_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "workout_sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "exercise_performance_records" ADD CONSTRAINT "exercise_performance_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
