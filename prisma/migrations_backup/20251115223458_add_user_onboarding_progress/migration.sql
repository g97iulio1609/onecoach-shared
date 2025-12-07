-- CreateTable
CREATE TABLE IF NOT EXISTS "user_onboarding_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "completedSteps" JSONB NOT NULL DEFAULT '{}',
    "skippedSteps" JSONB NOT NULL DEFAULT '{}',
    "metadata" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "lastInteraction" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_onboarding_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "user_onboarding_progress_userId_key" ON "user_onboarding_progress"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "user_onboarding_progress_userId_idx" ON "user_onboarding_progress"("userId");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "user_onboarding_progress_isCompleted_idx" ON "user_onboarding_progress"("isCompleted");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "user_onboarding_progress_lastInteraction_idx" ON "user_onboarding_progress"("lastInteraction");

-- AddForeignKey
ALTER TABLE "user_onboarding_progress" ADD CONSTRAINT "user_onboarding_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
