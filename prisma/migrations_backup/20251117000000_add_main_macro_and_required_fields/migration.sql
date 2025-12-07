-- Migration: Add mainMacro field and make required fields NOT NULL
-- Created: 2025-11-17
-- Description: Adds mainMacro JSON field to food_items, makes servingSize and macro percentages required
-- Note: imageUrl and brandId remain optional (nullable) to match Prisma schema

-- ============================================
-- STEP 1: Create default "Generic" brand if not exists
-- ============================================
DO $$
DECLARE
    generic_brand_id text;
BEGIN
    -- Check if Generic brand exists
    SELECT id INTO generic_brand_id FROM food_brands WHERE name = 'Generic' LIMIT 1;

    IF generic_brand_id IS NULL THEN
        -- Create Generic brand
        INSERT INTO food_brands (id, name, "nameNormalized", "createdAt", "updatedAt")
        VALUES (
            'brand_generic_default',
            'Generic',
            'generic',
            NOW(),
            NOW()
        );
        generic_brand_id := 'brand_generic_default';
    END IF;
END $$;

-- ============================================
-- STEP 2: Add new mainMacro column (nullable for now)
-- ============================================
ALTER TABLE "food_items" ADD COLUMN IF NOT EXISTS "mainMacro" JSONB;

-- ============================================
-- STEP 3: Update existing records with default values
-- ============================================

-- Set default servingSize (100g) for NULL values (only if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'food_items') THEN
UPDATE "food_items"
SET "servingSize" = 100.00
WHERE "servingSize" IS NULL;
  END IF;
END $$;

-- Calculate and set mainMacro for all existing foods (only if table exists)
-- SIMPLIFIED FOR MIGRATION STABILITY: defaulting to BALANCED/0
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'food_items') THEN
    UPDATE "food_items"
    SET "mainMacro" = '{"type": "BALANCED", "percentage": 0}'::jsonb
    WHERE "mainMacro" IS NULL;

    -- Set default macro percentages for NULL values
    UPDATE "food_items"
    SET "proteinPct" = 0.00
    WHERE "proteinPct" IS NULL;

    UPDATE "food_items"
    SET "carbPct" = 0.00
    WHERE "carbPct" IS NULL;

    UPDATE "food_items"
    SET "fatPct" = 0.00
    WHERE "fatPct" IS NULL;
  END IF;

  -- Update translations: set default description for NULL values (only if table exists)
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'food_item_translations') THEN
    UPDATE "food_item_translations"
    SET "description" = 'No description available'
    WHERE "description" IS NULL OR "description" = '';
  END IF;
END $$;

-- ============================================
-- STEP 4: Make required columns NOT NULL (only if table exists)
-- ============================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'food_items') THEN
-- Make servingSize required
ALTER TABLE "food_items" ALTER COLUMN "servingSize" SET NOT NULL;

-- Make mainMacro required
ALTER TABLE "food_items" ALTER COLUMN "mainMacro" SET NOT NULL;

-- Make macro percentages required
ALTER TABLE "food_items" ALTER COLUMN "proteinPct" SET NOT NULL;
ALTER TABLE "food_items" ALTER COLUMN "carbPct" SET NOT NULL;
ALTER TABLE "food_items" ALTER COLUMN "fatPct" SET NOT NULL;
  END IF;

  -- Make description required in translations (only if table exists)
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'food_item_translations') THEN
ALTER TABLE "food_item_translations" ALTER COLUMN "description" SET NOT NULL;
  END IF;
END $$;

-- ============================================
-- STEP 5: Update foreign key constraint for brandId (keep it optional)
-- ============================================
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'food_items') THEN
    -- Drop existing constraint if it exists
ALTER TABLE "food_items" DROP CONSTRAINT IF EXISTS "food_items_brandId_fkey";

    -- Add back as optional constraint (ON DELETE SET NULL) - only if constraint doesn't already exist
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint 
      WHERE conname = 'food_items_brandId_fkey'
    ) THEN
ALTER TABLE "food_items"
ADD CONSTRAINT "food_items_brandId_fkey"
FOREIGN KEY ("brandId") REFERENCES "food_brands"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
  END IF;
END $$;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON COLUMN "food_items"."mainMacro" IS 'Predominant macronutrient: { "type": "PROTEIN"|"CARBS"|"FATS"|"BALANCED", "percentage": number }';
COMMENT ON COLUMN "food_items"."servingSize" IS 'Standard serving size in grams (REQUIRED)';
COMMENT ON COLUMN "food_items"."imageUrl" IS 'Food item image URL (Optional)';
COMMENT ON COLUMN "food_items"."brandId" IS 'Brand reference (Optional)';
COMMENT ON COLUMN "food_item_translations"."description" IS 'Food description in the locale language (REQUIRED)';
