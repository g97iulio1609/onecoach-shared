-- CreateTable
CREATE TABLE "ai_framework_configs" (
    "id" TEXT NOT NULL,
    "feature" TEXT NOT NULL,
    "isEnabled" BOOLEAN NOT NULL DEFAULT false,
    "config" JSONB,
    "description" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_framework_configs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_framework_configs_feature_key" ON "ai_framework_configs"("feature");

-- CreateIndex
CREATE INDEX "ai_framework_configs_feature_idx" ON "ai_framework_configs"("feature");

