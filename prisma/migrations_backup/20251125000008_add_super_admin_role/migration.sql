-- AlterEnum
-- This migration adds SUPER_ADMIN to the UserRole enum and converts existing ADMIN users to SUPER_ADMIN

-- Step 1: Add SUPER_ADMIN to the enum
ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'SUPER_ADMIN';

-- Step 2: Convert existing ADMIN users to SUPER_ADMIN (only if they are the default admin email)
-- This ensures backward compatibility while establishing the new hierarchy
-- Note: In production, the default admin should already be SUPER_ADMIN via env vars
-- This migration is safe to run multiple times (idempotent)

-- The conversion is handled by the application code, not the migration
-- This migration only adds the enum value

