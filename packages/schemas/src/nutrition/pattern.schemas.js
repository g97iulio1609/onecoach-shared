/**
 * Pattern-Based Nutrition Schemas - SINGLE SOURCE OF TRUTH
 *
 * Sistema di generazione diete pattern-based:
 * - DayPattern: 2-3 pattern giornalieri (A, B, C)
 * - MealVariants: varianti intelligenti per ogni pasto
 * - WeeklyRotation: assemblaggio settimane ruotando i pattern
 *
 * @module @OneCoach/schemas/nutrition/pattern
 */
import { z } from 'zod';
import {
  MealTypeSchema,
  MacrosSchema,
  CompleteMacrosSchema,
  NutritionGoalSchema,
  DietTypeSchema,
  ActivityLevelSchema,
  GenderSchema,
  PlanStatusSchema,
} from './base.schemas';
// ============================================================================
// PATTERN CODES
// ============================================================================
export const PatternCodeSchema = z.enum(['A', 'B', 'C']);
// ============================================================================
// FOOD SELECTION (Agent 2)
// ============================================================================
/**
 * Alimento generato dall'AI con macros per 100g
 */
export const AIFoodItemSchema = z.object({
  name: z.string().min(2).max(255),
  description: z.string().min(10).max(2000),
  macrosPer100g: z.object({
    calories: z.number().min(0).max(1000),
    protein: z.number().min(0).max(100),
    carbs: z.number().min(0).max(100),
    fats: z.number().min(0).max(100),
    fiber: z.number().min(0).max(100).default(0),
  }),
  servingSize: z.number().min(1).max(5000),
  unit: z.enum(['g', 'ml']).default('g'),
  barcode: z.string().max(128).optional(),
  brandName: z.string().max(128).optional(),
  categories: z.array(z.string()).default([]),
  notes: z.string().max(500).optional(),
});
/**
 * Output FoodSelectionAgent
 */
export const FoodSelectionOutputSchema = z.object({
  existingFoods: z.array(z.object({ id: z.string(), name: z.string() })).default([]),
  newFoods: z.array(AIFoodItemSchema).default([]),
  selectionRationale: z.string().optional(),
  stats: z
    .object({
      totalSelected: z.number(),
      fromCatalog: z.number(),
      newlyCreated: z.number(),
      proteinSources: z.number(),
      carbSources: z.number(),
      fatSources: z.number(),
    })
    .optional(),
});
// ============================================================================
// MACRO DISTRIBUTION (Agent 1 - SSOT)
// ============================================================================
/**
 * Distribuzione macro per singolo pasto
 */
export const MealMacroDistributionSchema = z.object({
  type: MealTypeSchema,
  name: z.string(),
  time: z.string().optional(),
  caloriePercentage: z.number().min(5).max(60),
  targetMacros: CompleteMacrosSchema,
  notes: z.string().optional(),
});
/**
 * Output MacroDistributionAgent (SSOT calculations)
 */
export const MacroDistributionOutputSchema = z.object({
  calculations: z.object({
    bmr: z.number(),
    tdee: z.number(),
    targetCalories: z.number(),
  }),
  dailyTargetMacros: CompleteMacrosSchema,
  mealDistribution: z.array(MealMacroDistributionSchema).min(3).max(6),
  mealsPerDay: z.number().int().min(3).max(6),
  distributionNotes: z.string().optional(),
});
// ============================================================================
// MEAL PATTERNS (Agent 3)
// ============================================================================
/**
 * Swap alimento con alternativa
 */
export const FoodSwapSchema = z.object({
  original: z.string(),
  originalFoodItemId: z.string().optional(),
  alternative: z.string(),
  alternativeFoodItemId: z.string().optional(),
  alternativeQuantity: z.number().optional(),
  reason: z.string().optional(),
});
/**
 * Alimento nel pattern
 */
export const PatternFoodSchema = z.object({
  id: z.string(),
  foodItemId: z.string(),
  name: z.string(),
  quantity: z.number().min(1),
  unit: z.enum(['g', 'ml']).default('g'),
  macros: MacrosSchema,
  notes: z.string().optional(),
});
/**
 * Pasto con varianti
 */
export const MealWithVariantsSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: MealTypeSchema,
  time: z.string().optional(),
  foods: z.array(PatternFoodSchema).min(1),
  totalMacros: MacrosSchema,
  variants: z.array(FoodSwapSchema).default([]),
  notes: z.string().optional(),
  prepTimeMinutes: z.number().optional(),
});
/**
 * Pattern giornaliero (A, B, C)
 */
export const DayPatternSchema = z.object({
  id: z.string(),
  name: z.string(),
  patternCode: PatternCodeSchema,
  description: z.string().optional(),
  meals: z.array(MealWithVariantsSchema).min(3).max(6),
  totalMacros: MacrosSchema,
  waterIntake: z.number().optional(),
  notes: z.string().optional(),
  focus: z.string().optional(),
});
/**
 * Output MealPatternAgent
 */
export const MealPatternOutputSchema = z.object({
  patterns: z.array(DayPatternSchema).min(1).max(3),
  weeklyRotation: z.array(PatternCodeSchema).length(7),
  rotationNotes: z.string().optional(),
  generalTips: z.array(z.string()).optional(),
});
// ============================================================================
// WEEK BUILDER (Deterministic Assembly)
// ============================================================================
/**
 * Giorno assemblato dalla rotazione
 */
export const AssembledDaySchema = z.object({
  id: z.string(),
  dayNumber: z.number().int().positive(),
  dayName: z.string(),
  patternCode: PatternCodeSchema,
  patternId: z.string(),
  appliedVariants: z.array(z.object({ mealId: z.string(), swapIndex: z.number() })).default([]),
  isCustomized: z.boolean().default(false),
  notes: z.string().optional(),
});
/**
 * Settimana assemblata
 */
export const AssembledWeekSchema = z.object({
  id: z.string(),
  weekNumber: z.number().int().positive(),
  days: z.array(AssembledDaySchema).length(7),
  weeklyAverageMacros: MacrosSchema,
  notes: z.string().optional(),
});
// ============================================================================
// PATTERN-BASED NUTRITION PLAN
// ============================================================================
/**
 * Metadata generazione
 */
export const GenerationMetadataSchema = z.object({
  method: z.literal('pattern_based'),
  patternsCount: z.number(),
  selectedFoodsCount: z.number(),
  totalVariants: z.number(),
  generatedAt: z.string(),
  tokensUsed: z.number().optional(),
  costUSD: z.number().optional(),
});
/**
 * Piano nutrizionale pattern-based completo
 */
export const PatternBasedNutritionPlanSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  description: z.string(),
  goals: z.array(z.string()),
  durationWeeks: z.number().int().min(1).max(16),
  targetMacros: CompleteMacrosSchema,
  // Pattern structure
  selectedFoodIds: z.array(z.string()),
  dayPatterns: z.array(DayPatternSchema).min(1).max(3),
  weeklyRotation: z.array(PatternCodeSchema).length(7),
  weeks: z.array(AssembledWeekSchema).min(1),
  // Metadata
  restrictions: z.array(z.string()).default([]),
  preferences: z.array(z.string()).default([]),
  status: PlanStatusSchema.default('ACTIVE'),
  version: z.number().int().default(1),
  userProfile: z
    .object({
      weight: z.number(),
      height: z.number(),
      age: z.number(),
      gender: GenderSchema,
      activityLevel: ActivityLevelSchema,
    })
    .optional(),
  generationMetadata: GenerationMetadataSchema.optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
// ============================================================================
// GENERATION INPUT/OUTPUT
// ============================================================================
/**
 * Input per PatternNutritionOrchestratorService
 */
export const PatternNutritionGenerationInputSchema = z.object({
  userId: z.string(),
  userProfile: z.object({
    weight: z.number().min(30).max(300),
    height: z.number().min(100).max(250),
    age: z.number().min(10).max(100),
    gender: GenderSchema,
    activityLevel: ActivityLevelSchema,
    bodyFatPercentage: z.number().min(0).max(100).optional(),
  }),
  goals: z.object({
    goal: NutritionGoalSchema,
    targetCalories: z.number().optional(),
    targetProtein: z.number().optional(),
    targetCarbs: z.number().optional(),
    targetFats: z.number().optional(),
    durationWeeks: z.number().int().min(1).max(16),
    mealsPerDay: z.number().int().min(3).max(6),
    patternsCount: z.number().int().min(1).max(3).default(2),
  }),
  restrictions: z.object({
    allergies: z.array(z.string()).default([]),
    intolerances: z.array(z.string()).default([]),
    dietType: DietTypeSchema,
    dislikedFoods: z.array(z.string()).default([]),
    preferredFoods: z.array(z.string()).default([]),
  }),
  additionalNotes: z.string().optional(),
  feedbackData: z.unknown().optional(),
});
/**
 * Output PatternNutritionOrchestratorService
 */
export const PatternNutritionGenerationOutputSchema = z.object({
  plan: PatternBasedNutritionPlanSchema,
  summary: z.string(),
  warnings: z.array(z.string()).default([]),
  recommendations: z.array(z.string()).default([]),
  generationStats: z.object({
    patternsGenerated: z.number(),
    foodsSelected: z.number(),
    foodsCreated: z.number(),
    variantsGenerated: z.number(),
    totalTokensUsed: z.number(),
    totalCostUSD: z.number(),
    generationTimeMs: z.number(),
  }),
});
