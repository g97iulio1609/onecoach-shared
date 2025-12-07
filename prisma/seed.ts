/**
 * Prisma Seed Script
 * Inizializza il database con dati di default
 * Usa seed files modulari per organizzazione e manutenibilità
 */

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local first, then .env
config({ path: resolve(process.cwd(), '.env.local') });
config({ path: resolve(process.cwd(), '.env') });

import { PrismaClient } from '@prisma/client';
import { seedAuth } from '../packages/lib-core/src/seeds/seed-auth';
import { seedAffiliate } from '../packages/lib-core/src/seeds/seed-affiliate';
import { seedAIConfigs } from '../packages/lib-core/src/seeds/seed-ai-configs';
import { seedExerciseCatalog } from '../packages/lib-core/src/seeds/seed-exercise-catalog';
import { seedTranslationsAndGoals } from '../packages/lib-core/src/seeds/seed-translations-and-goals';
import { seedPolicies } from '../packages/lib-core/src/seeds/seed-policies';
import { seedMarketplace } from '../packages/lib-core/src/seeds/seed-marketplace';
import { seedFoodItems } from '../packages/lib-core/src/seeds/seed-food-items';
import { seedFeatureFlags } from '../packages/lib-core/src/seeds/seed-feature-flags';
import { seedSystemPrompts } from '../packages/lib-ai/src/seeds/seed-system-prompts';
import { seedStaticModels } from '../packages/lib-core/src/seeds/seed-static-models';

/**
 * Normalizza l'URL del database per assicurarsi che abbia i parametri SSL corretti
 * Gestisce certificati self-signed per Supabase/Vercel Postgres
 */
function normalizeDatabaseUrl(url: string): string {
  try {
    const urlObj = new URL(url);

    // Se l'URL non ha già parametri SSL, aggiungili
    if (!urlObj.searchParams.has('sslmode')) {
      // Per produzione (Vercel/Supabase), usa sslmode=require
      // Il pool di pg gestirà rejectUnauthorized: false per certificati self-signed
      urlObj.searchParams.set('sslmode', 'require');
    }

    return urlObj.toString();
  } catch {
    // Se l'URL non è valido, prova ad aggiungere i parametri manualmente
    if (url.includes('?')) {
      // URL già ha parametri query
      if (!url.includes('sslmode=')) {
        return `${url}&sslmode=require`;
      }
      return url;
    } else {
      // URL senza parametri query
      return `${url}?sslmode=require`;
    }
  }
}

// Get DATABASE_URL from environment
const rawDatabaseUrl = process.env.DATABASE_URL || process.env.DIRECT_URL;

if (!rawDatabaseUrl) {
  console.error('❌ Error: DATABASE_URL or DIRECT_URL environment variable is required');
  process.exit(1);
}

// Normalizza l'URL per assicurarsi che abbia i parametri SSL corretti
const databaseUrl = normalizeDatabaseUrl(rawDatabaseUrl);

// In Prisma 7, l'URL deve essere passato tramite variabile d'ambiente
// Imposta DATABASE_URL temporaneamente per questo script
process.env.DATABASE_URL = databaseUrl;

// Prisma 7: il client legge DATABASE_URL da process.env automaticamente
const prisma = new PrismaClient();

async function main() {
  console.warn('🌱 Seeding database...\n');

  // NOTA: Le tabelle vengono create dalle migrazioni Prisma durante il build.
  // Gli admin/super admin vengono creati automaticamente al primo login (vedi lib/auth/config.ts).
  // Questo seed è principalmente per dati demo e configurazioni iniziali.
  // Il seed è idempotente - può essere eseguito più volte senza problemi.

  // 1. Seed Auth (Admin e Demo users) - sempre eseguito (idempotente)
  console.warn('👤 Seeding auth users...');
  const { admin } = await seedAuth(prisma);

  // Verifica che l'admin sia stato creato se necessario
  if (!admin) {
    console.warn('⚠️ Admin not created. Some seeds may fail.');
    console.warn(
      'ℹ️ Set ADMIN_EMAIL and ADMIN_DEFAULT_PASSWORD env vars to create admin during seed.'
    );
  } else {
    console.warn('✅ Auth users seeded\n');
  }

  // 2. Seed Translations and Goals - sempre eseguito (idempotente)
  console.warn('🌐 Seeding translations and goals...');
  await seedTranslationsAndGoals(prisma);
  console.warn('✅ Translations and goals seeded\n');

  // 3. Seed Exercise Catalog (richiede admin) - idempotente
  if (admin) {
    console.warn('🏋️ Seeding exercise catalog...');
    await seedExerciseCatalog(prisma, admin.id);
    console.warn('✅ Exercise catalog seeded\n');
  } else {
    console.warn('⚠️ Skipping exercise catalog seed: admin not found\n');
  }

  // 4. Seed Policies (richiede admin) - idempotente
  if (admin) {
    console.warn('📜 Seeding policies...');
    await seedPolicies(prisma, admin.id);
    console.warn('✅ Policies seeded\n');
  } else {
    console.warn('⚠️ Skipping policies seed: admin not found\n');
  }

  // 5. Seed Affiliate Program (richiede admin) - idempotente
  if (admin) {
    console.warn('🤝 Seeding affiliate program...');
    await seedAffiliate(prisma, admin.id);
    console.warn('✅ Affiliate program seeded\n');
  } else {
    console.warn('⚠️ Skipping affiliate program seed: admin not found\n');
  }

  // 6. Seed AI Configs (richiede admin) - idempotente
  if (admin) {
    console.warn('🤖 Seeding AI configs...');
    try {
      await seedAIConfigs(prisma, admin.id);
      console.warn('✅ AI configs seeded\n');
    } catch (error: unknown) {
      console.warn(
        '⚠️ AI configs seed failed (may need schema migration):',
        error instanceof Error ? error.message : String(error)
      );
      console.warn('⚠️ Continuing with other seeds...\n');
    }
  } else {
    console.warn('⚠️ Skipping AI configs seed: admin not found\n');
  }

  // 6b. Seed External AI Models - idempotente
  console.warn('🧠 Seeding external AI models...');
  await seedStaticModels(prisma);
  console.warn('✅ External AI models seeded\n');

  // 7. Seed Marketplace - idempotente
  console.warn('🛒 Seeding marketplace...');
  await seedMarketplace(prisma);
  console.warn('✅ Marketplace seeded\n');

  // 8. Seed Food Items - idempotente
  console.warn('🍎 Seeding food items...');
  await seedFoodItems(prisma);
  console.warn('✅ Food items seeded\n');

  // 9. Seed Feature Flags (richiede admin) - idempotente
  if (admin) {
    console.warn('🚩 Seeding feature flags...');
    try {
      await seedFeatureFlags(prisma, admin.id);
      console.warn('✅ Feature flags seeded\n');
    } catch (error: unknown) {
      console.warn(
        '⚠️ Feature flags seed failed (may need schema migration):',
        error instanceof Error ? error.message : String(error)
      );
      console.warn('⚠️ Continuing with other seeds...\n');
    }
  } else {
    console.warn('⚠️ Skipping feature flags seed: admin not found\n');
  }

  // 10. Seed System Prompts - idempotente
  console.warn('📝 Seeding system prompts...');
  try {
    await seedSystemPrompts(prisma);
    console.warn('✅ System prompts seeded\n');
  } catch (error: unknown) {
    console.warn(
      '⚠️ System prompts seed failed (may need schema migration):',
      error instanceof Error ? error.message : String(error)
    );
    console.warn('⚠️ Continuing with other seeds...\n');
  }

  console.warn('\n🎉 Seeding completed!');
  // Don't log credentials in production for security
  if (process.env.NODE_ENV !== 'production') {
    console.warn('\n📧 Login credentials (development only):');
    console.warn('   Admin: admin@OneCoach.com / Admin123!');
    console.warn('   Demo:  demo@OneCoach.com / Demo123!');
  }
}

main()
  .catch((e: unknown) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
