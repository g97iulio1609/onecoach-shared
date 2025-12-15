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
import { MacrosSchema } from '../nutrition/base.schemas';
import { mainMacroSchema } from './base.schemas';
// ============================================================================
// CONSTANTS
// ============================================================================
/**
 * Locales supportati per le traduzioni automatiche
 * L'AI può fornire traduzioni opzionali, altrimenti vengono generate dal sistema
 */
export const SUPPORTED_FOOD_LOCALES = [
    'en',
    'it',
    'es',
    'fr',
    'de',
    'pt',
    'nl',
    'pl',
    'ja',
    'zh',
];
/**
 * Default values per alimenti generati dall'AI
 */
export const AI_FOOD_DEFAULTS = {
    unit: 'g',
    servingSize: 100,
    brandName: 'Generic',
};
// ============================================================================
// AI GENERATED FOOD SCHEMA (OUTPUT DALL'AI)
// ============================================================================
/**
 * Schema per i macros per 100g - fiber è opzionale (AI può non fornirlo)
 */
export const AIMacrosPer100gSchema = z.object({
    calories: z.number().min(0, 'Calorie must be >= 0'),
    protein: z.number().min(0, 'Protein must be >= 0'),
    carbs: z.number().min(0, 'Carbs must be >= 0'),
    fats: z.number().min(0, 'Fats must be >= 0'),
    fiber: z.number().min(0).optional(), // Optional - AI may not provide it
});
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
export const AIGeneratedFoodSchema = z.object({
    // === IDENTIFICAZIONE (generati dal sistema, non dall'AI) ===
    // id e foodItemId vengono aggiunti dal sistema dopo la generazione
    // === CAMPI OBBLIGATORI (AI deve sempre fornirli) ===
    name: z
        .string()
        .min(2, 'Food name must be at least 2 characters')
        .max(255, 'Food name must be at most 255 characters')
        .describe('Nome completo alimento con stato preparazione (es. "Chicken breast, raw")'),
    quantity: z
        .number()
        .min(0.1, 'Quantity must be at least 0.1')
        .describe('Quantità da consumare in grammi (PESO CRUDO)'),
    unit: z
        .string()
        .min(1)
        .max(16)
        .default(AI_FOOD_DEFAULTS.unit)
        .describe('Unità di misura - usare sempre "g" per consistenza'),
    macros: AIMacrosPer100gSchema.describe('Valori nutrizionali PER 100G di alimento CRUDO (non per la quantità)'),
    servingSize: z
        .number()
        .min(1)
        .max(10000)
        .default(AI_FOOD_DEFAULTS.servingSize)
        .describe('Porzione standard in grammi (100 per la maggior parte, 30 per formaggio/noci)'),
    description: z
        .string()
        .min(10, 'Description must be at least 10 characters')
        .max(2000, 'Description must be at most 2000 characters')
        .describe('Descrizione dettagliata: stato preparazione, caratteristiche nutrizionali, uso tipico'),
    // === CAMPI OPZIONALI ===
    brandName: z
        .string()
        .min(1)
        .max(128)
        .default(AI_FOOD_DEFAULTS.brandName)
        .optional()
        .describe('Marca alimento - "Generic" se non specificato'),
    imageUrl: z
        .string()
        .url()
        .max(512)
        .nullable()
        .optional()
        .describe('URL immagine prodotto - null se non disponibile'),
    barcode: z
        .string()
        .min(3)
        .max(128)
        .nullable()
        .optional()
        .describe('Codice EAN/UPC - solo per prodotti confezionati'),
    notes: z.string().max(500).optional().describe('Note aggiuntive su preparazione o consumo'),
});
// ============================================================================
// FOOD TO CREATE SCHEMA (INPUT PER DB)
// ============================================================================
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
export const FoodToCreateSchema = z.object({
    // === CAMPI OBBLIGATORI ===
    name: z.string().min(2).max(255),
    macrosPer100g: MacrosSchema,
    servingSize: z.number().min(1).max(10000),
    unit: z.string().min(1).max(16).default('g'),
    description: z.string().min(10).max(2000),
    // === CAMPI OPZIONALI ===
    brandName: z.string().min(1).max(128).optional(),
    imageUrl: z.string().url().max(512).nullable().optional(),
    barcode: z.string().min(3).max(128).nullable().optional(),
    category: z.string().max(128).optional(),
    mainMacro: mainMacroSchema.optional(), // Calcolato se non fornito
});
// ============================================================================
// VALIDATION HELPERS
// ============================================================================
/**
 * Valida un alimento generato dall'AI
 * @throws ZodError se la validazione fallisce
 */
export function validateAIGeneratedFood(input) {
    return AIGeneratedFoodSchema.parse(input);
}
/**
 * Valida in modo sicuro un alimento generato dall'AI
 */
export function safeValidateAIGeneratedFood(input) {
    return AIGeneratedFoodSchema.safeParse(input);
}
/**
 * Valida un alimento per la creazione nel DB
 */
export function validateFoodToCreate(input) {
    return FoodToCreateSchema.parse(input);
}
/**
 * Converte un AIGeneratedFood in FoodToCreate (per il DB)
 * Applica i default e normalizza i dati
 */
export function aiGeneratedFoodToFoodToCreate(food) {
    return {
        name: food.name.trim(),
        macrosPer100g: {
            calories: food.macros.calories,
            protein: food.macros.protein,
            carbs: food.macros.carbs,
            fats: food.macros.fats,
            fiber: food.macros.fiber ?? 0, // Default 0 se non fornito
        },
        servingSize: food.servingSize ?? AI_FOOD_DEFAULTS.servingSize,
        unit: food.unit ?? AI_FOOD_DEFAULTS.unit,
        description: food.description.trim(),
        brandName: food.brandName ?? AI_FOOD_DEFAULTS.brandName,
        imageUrl: food.imageUrl ?? undefined,
        barcode: food.barcode ?? undefined,
    };
}
// ============================================================================
// AI PROMPT INSTRUCTIONS
// ============================================================================
/**
 * Istruzioni per l'AI sulla generazione degli alimenti
 * Usate nel system prompt del MealGenerationAgent
 */
export const AI_FOOD_GENERATION_INSTRUCTIONS = `
## FOOD ITEM SPECIFICATION - MANDATORY FIELDS

For each food item in a meal, you MUST provide ALL of these fields:

### REQUIRED FIELDS (NO EXCEPTIONS):

1. **name** (string): Exact food name with preparation state
   - Format: "Food name, preparation state" (e.g., "Chicken breast, raw")
   - Include: protein cut, variety, brand if relevant
   - ALWAYS specify if raw/cooked

2. **quantity** (number): Amount in grams (ALWAYS RAW/UNCOOKED WEIGHT)
   - Use raw weight even if the food will be cooked
   - Example: For 150g cooked chicken, specify 200g raw (accounts for cooking loss)

3. **unit** (string): Always use "g" for consistency

4. **macros** (object): Nutritional values PER 100g RAW weight
   - calories: kcal per 100g raw
   - protein: grams per 100g raw
   - carbs: grams per 100g raw
   - fats: grams per 100g raw
   - fiber: grams per 100g raw (optional, use 0 if unknown)

5. **servingSize** (number): Standard serving in grams
   - Use 100 for most items
   - Use 30 for cheese, nuts, dried fruits
   - Use 200-250 for liquids

6. **description** (string): REQUIRED - detailed description (10-2000 chars)
   - Include: preparation state, nutritional highlights, common uses
   - Example: "Lean protein source, boneless and skinless chicken breast. High in protein, low in fat. Ideal for grilling, baking, or stir-frying."
   - NEVER return null or empty string

### OPTIONAL FIELDS:

7. **brandName** (string): Brand name (defaults to "Generic")
   - Specify if known (e.g., "Barilla", "Perdue")

8. **imageUrl** (string|null): Product image URL
   - Use actual product URL if known
   - Return null if unavailable (NOT placeholder URLs)

9. **barcode** (string|null): EAN/UPC barcode
   - Only for packaged products
   - Return null for fresh/unpackaged foods

10. **notes** (string): Additional notes
    - Preparation tips, storage info, etc.

### CRITICAL RULES:

⚠️ **MACROS ARE ALWAYS PER 100g RAW WEIGHT**
- The "macros" field is ALWAYS per 100g regardless of quantity
- Example for 200g chicken breast:
  - quantity: 200
  - macros: { calories: 120, protein: 23, carbs: 0, fats: 2.6, fiber: 0 } // per 100g!

⚠️ **ALWAYS USE RAW WEIGHT**
- All quantities and macros refer to RAW/UNCOOKED weight
- Account for cooking loss when specifying quantity
- Example: User wants 150g cooked pasta → specify 70g raw pasta

⚠️ **DESCRIPTION IS MANDATORY**
- Cannot be null, undefined, or empty
- Must be at least 10 characters
- Should be informative and accurate

### EXAMPLE - CORRECT:

\`\`\`json
{
  "name": "Chicken breast, raw",
  "quantity": 200,
  "unit": "g",
  "macros": {
    "calories": 120,
    "protein": 23,
    "carbs": 0,
    "fats": 2.6,
    "fiber": 0
  },
  "servingSize": 100,
  "description": "Lean protein source, boneless and skinless chicken breast. High in protein with minimal fat content. Excellent for grilling, baking, or pan-searing.",
  "brandName": "Generic",
  "imageUrl": null,
  "barcode": null
}
\`\`\`

### EXAMPLE - INCORRECT:

\`\`\`json
{
  "name": "Chicken",  // TOO VAGUE - specify cut and state
  "quantity": 200,
  "unit": "g",
  "macros": {
    "calories": 240,  // WRONG - these are for 200g, not per 100g!
    "protein": 46,
    "carbs": 0,
    "fats": 5.2
  }
  // MISSING: servingSize, description (REQUIRED)
}
\`\`\`

The system will automatically:
- Generate unique IDs for each food item
- Match foods with existing database entries (≥85% similarity)
- Create new entries if no match found
- Generate translations in 10 languages
- Calculate mainMacro and percentage values
`;
export default AIGeneratedFoodSchema;
