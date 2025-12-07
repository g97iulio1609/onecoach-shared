-- CreateEnum (only if not exists)
DO $$ BEGIN
    CREATE TYPE "InvitationType" AS ENUM ('ONE_TIME', 'MULTI_USE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateEnum (only if not exists)
DO $$ BEGIN
    CREATE TYPE "InvitationStatus" AS ENUM ('ACTIVE', 'USED', 'REVOKED', 'EXPIRED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- CreateTable (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'invitations'
    ) THEN
        CREATE TABLE "invitations" (
            "id" TEXT NOT NULL,
            "code" TEXT NOT NULL,
            "type" "InvitationType" NOT NULL DEFAULT 'ONE_TIME',
            "status" "InvitationStatus" NOT NULL DEFAULT 'ACTIVE',
            "maxUses" INTEGER NOT NULL DEFAULT 1,
            "usedCount" INTEGER NOT NULL DEFAULT 0,
            "expiresAt" TIMESTAMP(3),
            "createdById" TEXT NOT NULL,
            "metadata" JSONB,
            "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
            "updatedAt" TIMESTAMP(3) NOT NULL,

            CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
        );
    END IF;
END $$;

-- CreateTable (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'invitation_uses'
    ) THEN
        CREATE TABLE "invitation_uses" (
            "id" TEXT NOT NULL,
            "invitationId" TEXT NOT NULL,
            "userId" TEXT NOT NULL,
            "usedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT "invitation_uses_pkey" PRIMARY KEY ("id")
        );
    END IF;
END $$;

-- CreateIndex (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'invitations_code_key'
    ) THEN
        CREATE UNIQUE INDEX "invitations_code_key" ON "invitations"("code");
    END IF;
END $$;

-- CreateIndex (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'invitations_code_idx'
    ) THEN
        CREATE INDEX "invitations_code_idx" ON "invitations"("code");
    END IF;
END $$;

-- CreateIndex (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'invitations_status_idx'
    ) THEN
        CREATE INDEX "invitations_status_idx" ON "invitations"("status");
    END IF;
END $$;

-- CreateIndex (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'invitations_createdById_idx'
    ) THEN
        CREATE INDEX "invitations_createdById_idx" ON "invitations"("createdById");
    END IF;
END $$;

-- CreateIndex (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'invitation_uses_invitationId_idx'
    ) THEN
        CREATE INDEX "invitation_uses_invitationId_idx" ON "invitation_uses"("invitationId");
    END IF;
END $$;

-- CreateIndex (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'invitation_uses_userId_idx'
    ) THEN
        CREATE INDEX "invitation_uses_userId_idx" ON "invitation_uses"("userId");
    END IF;
END $$;

-- AddForeignKey (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'invitations_createdById_fkey'
    ) THEN
        ALTER TABLE "invitations" ADD CONSTRAINT "invitations_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'invitation_uses_invitationId_fkey'
    ) THEN
        ALTER TABLE "invitation_uses" ADD CONSTRAINT "invitation_uses_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;

-- AddForeignKey (only if not exists)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'invitation_uses_userId_fkey'
    ) THEN
        ALTER TABLE "invitation_uses" ADD CONSTRAINT "invitation_uses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
