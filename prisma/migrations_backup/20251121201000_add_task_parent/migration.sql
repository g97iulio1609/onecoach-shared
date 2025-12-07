-- Add parentId for task hierarchy (subtasks)

ALTER TABLE "Task"
ADD COLUMN IF NOT EXISTS "parentId" TEXT;

-- Create FK if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.table_constraints tc
    WHERE tc.constraint_name = 'Task_parentId_fkey'
      AND tc.table_name = 'Task'
  ) THEN
    ALTER TABLE "Task"
    ADD CONSTRAINT "Task_parentId_fkey"
    FOREIGN KEY ("parentId") REFERENCES "Task"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- Index for parent lookups
CREATE INDEX IF NOT EXISTS "Task_parentId_idx" ON "Task"("parentId");
