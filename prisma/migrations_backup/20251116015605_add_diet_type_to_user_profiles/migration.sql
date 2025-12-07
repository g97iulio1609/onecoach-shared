-- Add dietType column to user_profiles table
-- This column was missing from the baseline migration but is defined in the Prisma schema

-- First, ensure the DietType enum exists (it should already exist from baseline)
-- If it doesn't exist, create it
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'DietType') THEN
        CREATE TYPE "DietType" AS ENUM (
            'OMNIVORE',
            'VEGETARIAN',
            'VEGAN',
            'PESCATARIAN',
            'KETO',
            'PALEO',
            'MEDITERRANEAN'
        );
    END IF;
END $$;

-- Add the dietType column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'dietType'
    ) THEN
        ALTER TABLE "user_profiles" 
        ADD COLUMN "dietType" "DietType" DEFAULT 'OMNIVORE';
    END IF;
END $$;

