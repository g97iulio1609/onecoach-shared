-- AlterTable
ALTER TABLE "exercise_performance_records" ADD COLUMN IF NOT EXISTS "intensityPercent" INTEGER,
ADD COLUMN IF NOT EXISTS "intensityPercentMax" INTEGER;
