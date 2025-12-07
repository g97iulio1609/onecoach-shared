-- AlterTable
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "healthLastSync" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "healthPlatform" TEXT;

