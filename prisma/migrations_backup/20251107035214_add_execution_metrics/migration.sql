-- Create ExecutionMetrics table for learning loop
-- Stores execution metrics for AI decision optimization

CREATE TABLE IF NOT EXISTS "execution_metrics" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "plan_id" TEXT NOT NULL,
  "domain" TEXT NOT NULL,
  "timestamp" BIGINT NOT NULL,
  "decisions" JSONB NOT NULL,
  "outcome" JSONB NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraint only if PlanningPlan table exists
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'PlanningPlan') THEN
    ALTER TABLE "execution_metrics" 
    ADD CONSTRAINT "execution_metrics_plan_id_fkey" 
    FOREIGN KEY ("plan_id") REFERENCES "PlanningPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  ELSIF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'planning_plans') THEN
    ALTER TABLE "execution_metrics" 
    ADD CONSTRAINT "execution_metrics_plan_id_fkey" 
    FOREIGN KEY ("plan_id") REFERENCES "planning_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "execution_metrics_plan_id_idx" ON "execution_metrics"("plan_id");
CREATE INDEX IF NOT EXISTS "execution_metrics_domain_idx" ON "execution_metrics"("domain");
CREATE INDEX IF NOT EXISTS "execution_metrics_timestamp_idx" ON "execution_metrics"("timestamp");
CREATE INDEX IF NOT EXISTS "execution_metrics_created_at_idx" ON "execution_metrics"("created_at");

-- Add comment
COMMENT ON TABLE "execution_metrics" IS 'Stores execution metrics for AI agent learning loop optimization';

