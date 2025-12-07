-- CreateTable
CREATE TABLE "PlanningSubSubTask" (
    "id" TEXT NOT NULL,
    "subTaskId" TEXT NOT NULL,
    "mealNumber" INTEGER NOT NULL,
    "mealName" TEXT,
    "mealType" TEXT,
    "status" "PlanningStatus" NOT NULL DEFAULT 'PENDING',
    "result" JSONB,
    "errorMessage" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanningSubSubTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanningSubSubTask_subTaskId_mealNumber_key" ON "PlanningSubSubTask"("subTaskId", "mealNumber");

-- CreateIndex
CREATE INDEX "PlanningSubSubTask_subTaskId_idx" ON "PlanningSubSubTask"("subTaskId");

-- CreateIndex
CREATE INDEX "PlanningSubSubTask_status_idx" ON "PlanningSubSubTask"("status");

-- CreateIndex
CREATE INDEX "PlanningSubSubTask_mealNumber_idx" ON "PlanningSubSubTask"("mealNumber");

-- AddForeignKey
ALTER TABLE "PlanningSubSubTask" ADD CONSTRAINT "PlanningSubSubTask_subTaskId_fkey" FOREIGN KEY ("subTaskId") REFERENCES "PlanningSubTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

