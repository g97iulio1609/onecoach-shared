/**
 * AI Generated Food Schemas
 *
 * UNICA FONTE DI VERITÀ per gli alimenti generati dall'AI
 * Definisce la struttura completa che l'AI deve generare per creare nuovi alimenti nel DB.
 *
 * ARCHITETTURA:
 * - AIGeneratedFoodSchema: schema che l'AI deve rispettare per ogni alimento
 * - AIFoodToCreateSchema: schema per la creazione nel database (post-processing)
 * - Validazione centralizzata usata da:
 *   - MealGenerationAgent (generazione)
 *   - CatalogProviderService (matching/creazione)
 *   - FoodAutoCreationService (batch processing)
 *
 * NOTA: I macros sono SEMPRE per 100g di alimento crudo (raw weight)
 */
import { z } from 'zod';
/**
 * Locales supportati per le traduzioni automatiche
 * L'AI può fornire traduzioni opzionali, altrimenti vengono generate dal sistema
 */
export declare const SUPPORTED_FOOD_LOCALES: readonly ["en", "it", "es", "fr", "de", "pt", "nl", "pl", "ja", "zh"];
export type SupportedFoodLocale = (typeof SUPPORTED_FOOD_LOCALES)[number];
/**
 * Default values per alimenti generati dall'AI
 */
export declare const AI_FOOD_DEFAULTS: {
    readonly unit: "g";
    readonly servingSize: 100;
    readonly brandName: "Generic";
};
/**
 * Schema per i macros per 100g - fiber è opzionale (AI può non fornirlo)
 */
export declare const AIMacrosPer100gSchema: z.ZodObject<{
    calories: z.ZodNumber;
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    fiber: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type AIMacrosPer100g = z.infer<typeof AIMacrosPer100gSchema>;
/**
 * Schema per un alimento generato dall'AI in un pasto
 * Questo è il formato che l'AI deve produrre per ogni food item in un meal
 *
 * CAMPI OBBLIGATORI (AI deve sempre fornirli):
 * - name: nome dell'alimento (es. "Chicken breast, raw")
 * - quantity: quantità in grammi da consumare
 * - unit: unità di misura (default "g")
 * - macros: valori nutrizionali PER 100G CRUDO
 * - servingSize: porzione standard in grammi
 * - description: descrizione dettagliata (OBBLIGATORIA per DB)
 *
 * CAMPI OPZIONALI:
 * - brandName: marca dell'alimento (default "Generic")
 * - imageUrl: URL immagine (null se non disponibile)
 * - barcode: codice a barre (solo per prodotti confezionati)
 * - notes: note aggiuntive sul food
 */
export declare const AIGeneratedFoodSchema: z.ZodObject<{
    name: z.ZodString;
    quantity: z.ZodNumber;
    unit: z.ZodDefault<z.ZodString>;
    macros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    servingSize: z.ZodDefault<z.ZodNumber>;
    description: z.ZodString;
    brandName: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    barcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type AIGeneratedFood = z.infer<typeof AIGeneratedFoodSchema>;
/**
 * Schema per creare un alimento nel database
 * Usato da CatalogProviderService.matchOrCreateFood e FoodAutoCreationService
 *
 * Tutti i campi necessari per la creazione in food_items:
 * - name, nameNormalized
 * - macrosPer100g
 * - servingSize, unit
 * - mainMacro (calcolato se non fornito)
 * - proteinPct, carbPct, fatPct (calcolati)
 * - food_item_translations (generate automaticamente)
 * - brandId (opzionale, creato se brandName fornito)
 * - imageUrl, barcode (opzionali)
 */
export declare const FoodToCreateSchema: z.ZodObject<{
    name: z.ZodString;
    macrosPer100g: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    servingSize: z.ZodNumber;
    unit: z.ZodDefault<z.ZodString>;
    description: z.ZodString;
    brandName: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    barcode: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    category: z.ZodOptional<z.ZodString>;
    mainMacro: z.ZodOptional<z.ZodType<import("@onecoach/types").MainMacro, unknown, z.core.$ZodTypeInternals<import("@onecoach/types").MainMacro, unknown>>>;
}, z.core.$strip>;
export type FoodToCreate = z.infer<typeof FoodToCreateSchema>;
/**
 * Valida un alimento generato dall'AI
 * @throws ZodError se la validazione fallisce
 */
export declare function validateAIGeneratedFood(input: unknown): AIGeneratedFood;
/**
 * Valida in modo sicuro un alimento generato dall'AI
 */
export declare function safeValidateAIGeneratedFood(input: unknown): z.ZodSafeParseResult<{
    name: string;
    quantity: number;
    unit: string;
    macros: {
        calories: number;
        protein: number;
        carbs: number;
        fats: number;
        fiber?: number;
    };
    servingSize: number;
    description: string;
    brandName?: string;
    imageUrl?: string;
    barcode?: string;
    notes?: string;
}>;
/**
 * Valida un alimento per la creazione nel DB
 */
export declare function validateFoodToCreate(input: unknown): FoodToCreate;
/**
 * Converte un AIGeneratedFood in FoodToCreate (per il DB)
 * Applica i default e normalizza i dati
 */
export declare function aiGeneratedFoodToFoodToCreate(food: AIGeneratedFood): FoodToCreate;
/**
 * Istruzioni per l'AI sulla generazione degli alimenti
 * Usate nel system prompt del MealGenerationAgent
 */
export declare const AI_FOOD_GENERATION_INSTRUCTIONS = "\n## FOOD ITEM SPECIFICATION - MANDATORY FIELDS\n\nFor each food item in a meal, you MUST provide ALL of these fields:\n\n### REQUIRED FIELDS (NO EXCEPTIONS):\n\n1. **name** (string): Exact food name with preparation state\n   - Format: \"Food name, preparation state\" (e.g., \"Chicken breast, raw\")\n   - Include: protein cut, variety, brand if relevant\n   - ALWAYS specify if raw/cooked\n\n2. **quantity** (number): Amount in grams (ALWAYS RAW/UNCOOKED WEIGHT)\n   - Use raw weight even if the food will be cooked\n   - Example: For 150g cooked chicken, specify 200g raw (accounts for cooking loss)\n\n3. **unit** (string): Always use \"g\" for consistency\n\n4. **macros** (object): Nutritional values PER 100g RAW weight\n   - calories: kcal per 100g raw\n   - protein: grams per 100g raw\n   - carbs: grams per 100g raw\n   - fats: grams per 100g raw\n   - fiber: grams per 100g raw (optional, use 0 if unknown)\n\n5. **servingSize** (number): Standard serving in grams\n   - Use 100 for most items\n   - Use 30 for cheese, nuts, dried fruits\n   - Use 200-250 for liquids\n\n6. **description** (string): REQUIRED - detailed description (10-2000 chars)\n   - Include: preparation state, nutritional highlights, common uses\n   - Example: \"Lean protein source, boneless and skinless chicken breast. High in protein, low in fat. Ideal for grilling, baking, or stir-frying.\"\n   - NEVER return null or empty string\n\n### OPTIONAL FIELDS:\n\n7. **brandName** (string): Brand name (defaults to \"Generic\")\n   - Specify if known (e.g., \"Barilla\", \"Perdue\")\n\n8. **imageUrl** (string|null): Product image URL\n   - Use actual product URL if known\n   - Return null if unavailable (NOT placeholder URLs)\n\n9. **barcode** (string|null): EAN/UPC barcode\n   - Only for packaged products\n   - Return null for fresh/unpackaged foods\n\n10. **notes** (string): Additional notes\n    - Preparation tips, storage info, etc.\n\n### CRITICAL RULES:\n\n\u26A0\uFE0F **MACROS ARE ALWAYS PER 100g RAW WEIGHT**\n- The \"macros\" field is ALWAYS per 100g regardless of quantity\n- Example for 200g chicken breast:\n  - quantity: 200\n  - macros: { calories: 120, protein: 23, carbs: 0, fats: 2.6, fiber: 0 } // per 100g!\n\n\u26A0\uFE0F **ALWAYS USE RAW WEIGHT**\n- All quantities and macros refer to RAW/UNCOOKED weight\n- Account for cooking loss when specifying quantity\n- Example: User wants 150g cooked pasta \u2192 specify 70g raw pasta\n\n\u26A0\uFE0F **DESCRIPTION IS MANDATORY**\n- Cannot be null, undefined, or empty\n- Must be at least 10 characters\n- Should be informative and accurate\n\n### EXAMPLE - CORRECT:\n\n```json\n{\n  \"name\": \"Chicken breast, raw\",\n  \"quantity\": 200,\n  \"unit\": \"g\",\n  \"macros\": {\n    \"calories\": 120,\n    \"protein\": 23,\n    \"carbs\": 0,\n    \"fats\": 2.6,\n    \"fiber\": 0\n  },\n  \"servingSize\": 100,\n  \"description\": \"Lean protein source, boneless and skinless chicken breast. High in protein with minimal fat content. Excellent for grilling, baking, or pan-searing.\",\n  \"brandName\": \"Generic\",\n  \"imageUrl\": null,\n  \"barcode\": null\n}\n```\n\n### EXAMPLE - INCORRECT:\n\n```json\n{\n  \"name\": \"Chicken\",  // TOO VAGUE - specify cut and state\n  \"quantity\": 200,\n  \"unit\": \"g\",\n  \"macros\": {\n    \"calories\": 240,  // WRONG - these are for 200g, not per 100g!\n    \"protein\": 46,\n    \"carbs\": 0,\n    \"fats\": 5.2\n  }\n  // MISSING: servingSize, description (REQUIRED)\n}\n```\n\nThe system will automatically:\n- Generate unique IDs for each food item\n- Match foods with existing database entries (\u226585% similarity)\n- Create new entries if no match found\n- Generate translations in 10 languages\n- Calculate mainMacro and percentage values\n";
export default AIGeneratedFoodSchema;
//# sourceMappingURL=ai-generated.schemas.d.ts.map