-- Migration: Add indexes on createdAt for food_items
-- Created: 2025-01-20
-- Description: Adds indexes to optimize queries ordering by creation date
-- This is used in AI duplicate prevention when fetching recent foods
-- Idempotent: Uses IF NOT EXISTS to allow safe re-execution

-- Single column index for general createdAt queries
CREATE INDEX IF NOT EXISTS "food_items_createdAt_idx" ON "food_items"("createdAt");

-- Composite index for efficient sorting by createdAt and name retrieval
-- Optimizes: SELECT name FROM food_items ORDER BY createdAt DESC LIMIT N
-- This index covers the query pattern used in getExistingFoodsForAI()
CREATE INDEX IF NOT EXISTS "food_items_createdAt_name_idx" ON "food_items"("createdAt", "name");

