-- AlterTable
ALTER TABLE "exercise_performance_records" ADD COLUMN IF NOT EXISTS "repsMax" INTEGER,
ADD COLUMN IF NOT EXISTS "rpeMax" INTEGER,
ADD COLUMN IF NOT EXISTS "weightMax" DECIMAL(6,2);

-- AlterTable
ALTER TABLE "nutrition_plan_versions" ADD COLUMN IF NOT EXISTS "userProfile" JSONB;
