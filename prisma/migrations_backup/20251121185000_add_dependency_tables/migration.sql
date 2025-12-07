-- Create explicit dependency join tables for milestones and tasks

-- Remove legacy implicit junction tables if they exist (harmless if absent)
DROP TABLE IF EXISTS "_MilestoneDependencies";
DROP TABLE IF EXISTS "_TaskDependencies";

-- Milestone dependencies (blocker -> blocked)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Milestone') THEN
        CREATE TABLE IF NOT EXISTS "MilestoneDependency" (
            "id" TEXT NOT NULL,
            "blockerId" TEXT NOT NULL,
            "blockedId" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "MilestoneDependency_pkey" PRIMARY KEY ("id"),
            CONSTRAINT "MilestoneDependency_blocker_fkey" FOREIGN KEY ("blockerId") REFERENCES "Milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT "MilestoneDependency_blocked_fkey" FOREIGN KEY ("blockedId") REFERENCES "Milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE
        );

        -- Indexes (only if table created)
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'MilestoneDependency') THEN
            CREATE UNIQUE INDEX IF NOT EXISTS "MilestoneDependency_blocker_blocked_key" ON "MilestoneDependency"("blockerId", "blockedId");
            CREATE INDEX IF NOT EXISTS "MilestoneDependency_blockerId_idx" ON "MilestoneDependency"("blockerId");
            CREATE INDEX IF NOT EXISTS "MilestoneDependency_blockedId_idx" ON "MilestoneDependency"("blockedId");
        END IF;
    END IF;
END $$;

-- Task dependencies (blocker -> blocked)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Task') THEN
        CREATE TABLE IF NOT EXISTS "TaskDependency" (
            "id" TEXT NOT NULL,
            "blockerId" TEXT NOT NULL,
            "blockedId" TEXT NOT NULL,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            CONSTRAINT "TaskDependency_pkey" PRIMARY KEY ("id"),
            CONSTRAINT "TaskDependency_blocker_fkey" FOREIGN KEY ("blockerId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE,
            CONSTRAINT "TaskDependency_blocked_fkey" FOREIGN KEY ("blockedId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE
        );

        -- Indexes (only if table created)
        IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'TaskDependency') THEN
            CREATE UNIQUE INDEX IF NOT EXISTS "TaskDependency_blocker_blocked_key" ON "TaskDependency"("blockerId", "blockedId");
            CREATE INDEX IF NOT EXISTS "TaskDependency_blockerId_idx" ON "TaskDependency"("blockerId");
            CREATE INDEX IF NOT EXISTS "TaskDependency_blockedId_idx" ON "TaskDependency"("blockedId");
        END IF;
    END IF;
END $$;
