-- Migration: Remove apiKey from ai_provider_configs and add vercelEnvVarId
-- API keys principali sono ora gestite su Vercel Environment Variables (secrets)
-- Database contiene solo metadata (isEnabled, defaultModel, etc.)

-- Step 1: Aggiungi colonna vercelEnvVarId (opzionale)
ALTER TABLE "ai_provider_configs" 
ADD COLUMN IF NOT EXISTS "vercelEnvVarId" TEXT;

-- Step 2: Rimuovi colonna apiKey
-- NOTA: Le API key esistenti nel DB devono essere migrate manualmente a Vercel
-- usando il servizio vercel-env-vars-api.service.ts o la dashboard Vercel
ALTER TABLE "ai_provider_configs" 
DROP COLUMN IF EXISTS "apiKey";

-- Step 3: Aggiungi commento per documentazione
COMMENT ON COLUMN "ai_provider_configs"."vercelEnvVarId" IS 'ID della env var su Vercel (per tracciamento). Le API key principali sono gestite su Vercel secrets, non nel database.';

