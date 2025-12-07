-- AlterEnum
-- This migration is idempotent and will only run if the enum type exists.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'PaymentType') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_enum 
      WHERE enumlabel = 'MARKETPLACE' 
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'PaymentType')
    ) THEN
      ALTER TYPE "PaymentType" ADD VALUE 'MARKETPLACE';
    END IF;
  END IF;
END $$;

