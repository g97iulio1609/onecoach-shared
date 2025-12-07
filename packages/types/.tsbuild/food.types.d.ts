/**
 * Food Types
 *
 * Type definitions per food items catalog e integrazione con nutrition plans
 */
import type { Macros } from './nutrition.types';
/**
 * Main Macronutrient Type
 */
export type MacroType = 'PROTEIN' | 'CARBS' | 'FATS' | 'BALANCED';
/**
 * Main Macro - Predominant macronutrient in food item
 * Defined directly in types to avoid circular dependency with schemas
 */
export type MainMacro = {
    type: 'PROTEIN' | 'CARBS' | 'FATS' | 'BALANCED';
    percentage: number;
};
/**
 * Food Item - Catalogo centralizzato alimenti
 * ALL FIELDS ARE REQUIRED UNLESS MARKED OPTIONAL
 */
export interface FoodItem {
    id: string;
    name: string;
    nameNormalized: string;
    barcode?: string;
    macrosPer100g: Macros;
    servingSize: number;
    unit: string;
    imageUrl?: string;
    brandId?: string;
    mainMacro: MainMacro;
    proteinPct: number;
    carbPct: number;
    fatPct: number;
    metadata?: {
        category?: string;
        [key: string]: unknown;
    };
    createdAt: string;
    updatedAt: string;
}
/**
 * Food Item Translation
 * ALL FIELDS ARE REQUIRED
 */
export interface FoodItemTranslation {
    id: string;
    foodItemId: string;
    locale: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}
/**
 * Risultato estrazione etichetta da Vision AI
 */
export interface LabelExtractionResult {
    name: string;
    macrosPer100g: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
        fiber?: number;
        sugar?: number;
        sodium?: number;
    };
    servingSize?: number;
    barcode?: string;
    brand?: string;
    metadata?: Record<string, unknown>;
}
/**
 * Risultato segmentazione piatto da Vision AI
 */
export interface DishSegmentationResult {
    items: Array<{
        name: string;
        quantity: number;
        confidence: number;
    }>;
    totalMacros: Macros;
}
/**
 * Risultato matching alimento
 */
export interface FoodMatchResult {
    matched: boolean;
    foodItem?: FoodItem;
    matchType?: 'exact' | 'bm25' | 'fuzzy';
    confidence?: number;
}
