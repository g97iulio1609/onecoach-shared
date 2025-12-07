import { z } from 'zod';
import { macrosSchema } from './nutrition-schemas';
/**
 * Main Macro Schema - Predominant macronutrient
 */
export const mainMacroSchema = z.object({
    type: z.enum(['PROTEIN', 'CARBS', 'FATS', 'BALANCED']),
    percentage: z.number().min(0).max(100),
});
/**
 * Food Translation Schema - REQUIRED for multi-language support
 */
export const foodTranslationSchema = z.object({
    locale: z.string().min(2).max(8),
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(2000), // NOW REQUIRED
});
/**
 * Create Food Schema - REQUIRED fields: name, macrosPer100g, servingSize, unit, description
 * Optional: barcode, metadata, imageUrl, brandId, brandName, categoryIds, mainMacro, translations
 * If translations not provided, they will be auto-generated from description in 10 languages
 */
export const createFoodSchema = z.object({
    name: z.string().min(2).max(255),
    description: z.string().min(1).max(2000), // REQUIRED - used to generate translations if not provided
    macrosPer100g: macrosSchema,
    servingSize: z.number().min(1).max(10000), // REQUIRED
    unit: z.string().min(1).max(16).default('g'),
    barcode: z.string().min(3).max(128).optional(), // Optional - only for packaged foods
    metadata: z.record(z.string(), z.unknown()).optional(),
    imageUrl: z.url().max(512).optional(), // Optional
    brandId: z.string().optional(), // Optional
    brandName: z.string().min(1).max(128).optional(), // Optional - used to find/create brand if brandId not provided
    categoryIds: z.array(z.string()).optional(),
    mainMacro: mainMacroSchema.optional(), // Optional - will be calculated if not provided
    translations: z.array(foodTranslationSchema).min(1).optional(), // Optional - will be generated if not provided
});
// Update schema: description è sempre obbligatoria, altri campi opzionali
export const updateFoodSchema = createFoodSchema.partial().extend({
    description: z.string().min(1).max(2000), // REQUIRED anche negli update
});
export const foodQuerySchema = z.object({
    search: z.string().max(255).optional(),
    brandId: z.string().max(255).optional(),
    categoryIds: z.string().optional(), // comma-separated in querystring
    barcode: z.string().max(128).optional(),
    kcalMin: z.coerce.number().min(0).optional(),
    kcalMax: z.coerce.number().min(0).optional(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).max(100).default(20),
    sortBy: z.enum(['createdAt', 'updatedAt', 'name', 'calories']).default('updatedAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
    macroDominant: z.enum(['protein', 'carbs', 'fats']).optional(),
    minProteinPct: z.coerce.number().min(0).max(100).optional(),
    minCarbPct: z.coerce.number().min(0).max(100).optional(),
    minFatPct: z.coerce.number().min(0).max(100).optional(),
});
