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
export declare const PatternCodeSchema: z.ZodEnum<{
  A: 'A';
  B: 'B';
  C: 'C';
}>;
export type PatternCode = z.infer<typeof PatternCodeSchema>;
/**
 * Alimento generato dall'AI con macros per 100g
 */
export declare const AIFoodItemSchema: z.ZodObject<
  {
    name: z.ZodString;
    description: z.ZodString;
    macrosPer100g: z.ZodObject<
      {
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodDefault<z.ZodNumber>;
      },
      z.core.$strip
    >;
    servingSize: z.ZodNumber;
    unit: z.ZodDefault<
      z.ZodEnum<{
        g: 'g';
        ml: 'ml';
      }>
    >;
    barcode: z.ZodOptional<z.ZodString>;
    brandName: z.ZodOptional<z.ZodString>;
    categories: z.ZodDefault<z.ZodArray<z.ZodString>>;
    notes: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type AIFoodItem = z.infer<typeof AIFoodItemSchema>;
/**
 * Output FoodSelectionAgent
 */
export declare const FoodSelectionOutputSchema: z.ZodObject<
  {
    existingFoods: z.ZodDefault<
      z.ZodArray<
        z.ZodObject<
          {
            id: z.ZodString;
            name: z.ZodString;
          },
          z.core.$strip
        >
      >
    >;
    newFoods: z.ZodDefault<
      z.ZodArray<
        z.ZodObject<
          {
            name: z.ZodString;
            description: z.ZodString;
            macrosPer100g: z.ZodObject<
              {
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodDefault<z.ZodNumber>;
              },
              z.core.$strip
            >;
            servingSize: z.ZodNumber;
            unit: z.ZodDefault<
              z.ZodEnum<{
                g: 'g';
                ml: 'ml';
              }>
            >;
            barcode: z.ZodOptional<z.ZodString>;
            brandName: z.ZodOptional<z.ZodString>;
            categories: z.ZodDefault<z.ZodArray<z.ZodString>>;
            notes: z.ZodOptional<z.ZodString>;
          },
          z.core.$strip
        >
      >
    >;
    selectionRationale: z.ZodOptional<z.ZodString>;
    stats: z.ZodOptional<
      z.ZodObject<
        {
          totalSelected: z.ZodNumber;
          fromCatalog: z.ZodNumber;
          newlyCreated: z.ZodNumber;
          proteinSources: z.ZodNumber;
          carbSources: z.ZodNumber;
          fatSources: z.ZodNumber;
        },
        z.core.$strip
      >
    >;
  },
  z.core.$strip
>;
export type FoodSelectionOutput = z.infer<typeof FoodSelectionOutputSchema>;
/**
 * Distribuzione macro per singolo pasto
 */
export declare const MealMacroDistributionSchema: z.ZodObject<
  {
    type: z.ZodEnum<{
      breakfast: 'breakfast';
      lunch: 'lunch';
      dinner: 'dinner';
      snack: 'snack';
      'pre-workout': 'pre-workout';
      'post-workout': 'post-workout';
    }>;
    name: z.ZodString;
    time: z.ZodOptional<z.ZodString>;
    caloriePercentage: z.ZodNumber;
    targetMacros: z.ZodObject<
      {
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodNumber;
      },
      z.core.$strip
    >;
    notes: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type MealMacroDistribution = z.infer<typeof MealMacroDistributionSchema>;
/**
 * Output MacroDistributionAgent (SSOT calculations)
 */
export declare const MacroDistributionOutputSchema: z.ZodObject<
  {
    calculations: z.ZodObject<
      {
        bmr: z.ZodNumber;
        tdee: z.ZodNumber;
        targetCalories: z.ZodNumber;
      },
      z.core.$strip
    >;
    dailyTargetMacros: z.ZodObject<
      {
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodNumber;
      },
      z.core.$strip
    >;
    mealDistribution: z.ZodArray<
      z.ZodObject<
        {
          type: z.ZodEnum<{
            breakfast: 'breakfast';
            lunch: 'lunch';
            dinner: 'dinner';
            snack: 'snack';
            'pre-workout': 'pre-workout';
            'post-workout': 'post-workout';
          }>;
          name: z.ZodString;
          time: z.ZodOptional<z.ZodString>;
          caloriePercentage: z.ZodNumber;
          targetMacros: z.ZodObject<
            {
              calories: z.ZodNumber;
              protein: z.ZodNumber;
              carbs: z.ZodNumber;
              fats: z.ZodNumber;
              fiber: z.ZodNumber;
            },
            z.core.$strip
          >;
          notes: z.ZodOptional<z.ZodString>;
        },
        z.core.$strip
      >
    >;
    mealsPerDay: z.ZodNumber;
    distributionNotes: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type MacroDistributionOutput = z.infer<typeof MacroDistributionOutputSchema>;
/**
 * Swap alimento con alternativa
 */
export declare const FoodSwapSchema: z.ZodObject<
  {
    original: z.ZodString;
    originalFoodItemId: z.ZodOptional<z.ZodString>;
    alternative: z.ZodString;
    alternativeFoodItemId: z.ZodOptional<z.ZodString>;
    alternativeQuantity: z.ZodOptional<z.ZodNumber>;
    reason: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type FoodSwap = z.infer<typeof FoodSwapSchema>;
/**
 * Alimento nel pattern
 */
export declare const PatternFoodSchema: z.ZodObject<
  {
    id: z.ZodString;
    foodItemId: z.ZodString;
    name: z.ZodString;
    quantity: z.ZodNumber;
    unit: z.ZodDefault<
      z.ZodEnum<{
        g: 'g';
        ml: 'ml';
      }>
    >;
    macros: z.ZodObject<
      {
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
      },
      z.core.$strip
    >;
    notes: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type PatternFood = z.infer<typeof PatternFoodSchema>;
/**
 * Pasto con varianti
 */
export declare const MealWithVariantsSchema: z.ZodObject<
  {
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<{
      breakfast: 'breakfast';
      lunch: 'lunch';
      dinner: 'dinner';
      snack: 'snack';
      'pre-workout': 'pre-workout';
      'post-workout': 'post-workout';
    }>;
    time: z.ZodOptional<z.ZodString>;
    foods: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          foodItemId: z.ZodString;
          name: z.ZodString;
          quantity: z.ZodNumber;
          unit: z.ZodDefault<
            z.ZodEnum<{
              g: 'g';
              ml: 'ml';
            }>
          >;
          macros: z.ZodObject<
            {
              calories: z.ZodNumber;
              protein: z.ZodNumber;
              carbs: z.ZodNumber;
              fats: z.ZodNumber;
              fiber: z.ZodOptional<z.ZodNumber>;
            },
            z.core.$strip
          >;
          notes: z.ZodOptional<z.ZodString>;
        },
        z.core.$strip
      >
    >;
    totalMacros: z.ZodObject<
      {
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
      },
      z.core.$strip
    >;
    variants: z.ZodDefault<
      z.ZodArray<
        z.ZodObject<
          {
            original: z.ZodString;
            originalFoodItemId: z.ZodOptional<z.ZodString>;
            alternative: z.ZodString;
            alternativeFoodItemId: z.ZodOptional<z.ZodString>;
            alternativeQuantity: z.ZodOptional<z.ZodNumber>;
            reason: z.ZodOptional<z.ZodString>;
          },
          z.core.$strip
        >
      >
    >;
    notes: z.ZodOptional<z.ZodString>;
    prepTimeMinutes: z.ZodOptional<z.ZodNumber>;
  },
  z.core.$strip
>;
export type MealWithVariants = z.infer<typeof MealWithVariantsSchema>;
/**
 * Pattern giornaliero (A, B, C)
 */
export declare const DayPatternSchema: z.ZodObject<
  {
    id: z.ZodString;
    name: z.ZodString;
    patternCode: z.ZodEnum<{
      A: 'A';
      B: 'B';
      C: 'C';
    }>;
    description: z.ZodOptional<z.ZodString>;
    meals: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          name: z.ZodString;
          type: z.ZodEnum<{
            breakfast: 'breakfast';
            lunch: 'lunch';
            dinner: 'dinner';
            snack: 'snack';
            'pre-workout': 'pre-workout';
            'post-workout': 'post-workout';
          }>;
          time: z.ZodOptional<z.ZodString>;
          foods: z.ZodArray<
            z.ZodObject<
              {
                id: z.ZodString;
                foodItemId: z.ZodString;
                name: z.ZodString;
                quantity: z.ZodNumber;
                unit: z.ZodDefault<
                  z.ZodEnum<{
                    g: 'g';
                    ml: 'ml';
                  }>
                >;
                macros: z.ZodObject<
                  {
                    calories: z.ZodNumber;
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                  },
                  z.core.$strip
                >;
                notes: z.ZodOptional<z.ZodString>;
              },
              z.core.$strip
            >
          >;
          totalMacros: z.ZodObject<
            {
              calories: z.ZodNumber;
              protein: z.ZodNumber;
              carbs: z.ZodNumber;
              fats: z.ZodNumber;
              fiber: z.ZodOptional<z.ZodNumber>;
            },
            z.core.$strip
          >;
          variants: z.ZodDefault<
            z.ZodArray<
              z.ZodObject<
                {
                  original: z.ZodString;
                  originalFoodItemId: z.ZodOptional<z.ZodString>;
                  alternative: z.ZodString;
                  alternativeFoodItemId: z.ZodOptional<z.ZodString>;
                  alternativeQuantity: z.ZodOptional<z.ZodNumber>;
                  reason: z.ZodOptional<z.ZodString>;
                },
                z.core.$strip
              >
            >
          >;
          notes: z.ZodOptional<z.ZodString>;
          prepTimeMinutes: z.ZodOptional<z.ZodNumber>;
        },
        z.core.$strip
      >
    >;
    totalMacros: z.ZodObject<
      {
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
      },
      z.core.$strip
    >;
    waterIntake: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
    focus: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type DayPattern = z.infer<typeof DayPatternSchema>;
/**
 * Output MealPatternAgent
 */
export declare const MealPatternOutputSchema: z.ZodObject<
  {
    patterns: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          name: z.ZodString;
          patternCode: z.ZodEnum<{
            A: 'A';
            B: 'B';
            C: 'C';
          }>;
          description: z.ZodOptional<z.ZodString>;
          meals: z.ZodArray<
            z.ZodObject<
              {
                id: z.ZodString;
                name: z.ZodString;
                type: z.ZodEnum<{
                  breakfast: 'breakfast';
                  lunch: 'lunch';
                  dinner: 'dinner';
                  snack: 'snack';
                  'pre-workout': 'pre-workout';
                  'post-workout': 'post-workout';
                }>;
                time: z.ZodOptional<z.ZodString>;
                foods: z.ZodArray<
                  z.ZodObject<
                    {
                      id: z.ZodString;
                      foodItemId: z.ZodString;
                      name: z.ZodString;
                      quantity: z.ZodNumber;
                      unit: z.ZodDefault<
                        z.ZodEnum<{
                          g: 'g';
                          ml: 'ml';
                        }>
                      >;
                      macros: z.ZodObject<
                        {
                          calories: z.ZodNumber;
                          protein: z.ZodNumber;
                          carbs: z.ZodNumber;
                          fats: z.ZodNumber;
                          fiber: z.ZodOptional<z.ZodNumber>;
                        },
                        z.core.$strip
                      >;
                      notes: z.ZodOptional<z.ZodString>;
                    },
                    z.core.$strip
                  >
                >;
                totalMacros: z.ZodObject<
                  {
                    calories: z.ZodNumber;
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                  },
                  z.core.$strip
                >;
                variants: z.ZodDefault<
                  z.ZodArray<
                    z.ZodObject<
                      {
                        original: z.ZodString;
                        originalFoodItemId: z.ZodOptional<z.ZodString>;
                        alternative: z.ZodString;
                        alternativeFoodItemId: z.ZodOptional<z.ZodString>;
                        alternativeQuantity: z.ZodOptional<z.ZodNumber>;
                        reason: z.ZodOptional<z.ZodString>;
                      },
                      z.core.$strip
                    >
                  >
                >;
                notes: z.ZodOptional<z.ZodString>;
                prepTimeMinutes: z.ZodOptional<z.ZodNumber>;
              },
              z.core.$strip
            >
          >;
          totalMacros: z.ZodObject<
            {
              calories: z.ZodNumber;
              protein: z.ZodNumber;
              carbs: z.ZodNumber;
              fats: z.ZodNumber;
              fiber: z.ZodOptional<z.ZodNumber>;
            },
            z.core.$strip
          >;
          waterIntake: z.ZodOptional<z.ZodNumber>;
          notes: z.ZodOptional<z.ZodString>;
          focus: z.ZodOptional<z.ZodString>;
        },
        z.core.$strip
      >
    >;
    weeklyRotation: z.ZodArray<
      z.ZodEnum<{
        A: 'A';
        B: 'B';
        C: 'C';
      }>
    >;
    rotationNotes: z.ZodOptional<z.ZodString>;
    generalTips: z.ZodOptional<z.ZodArray<z.ZodString>>;
  },
  z.core.$strip
>;
export type MealPatternOutput = z.infer<typeof MealPatternOutputSchema>;
/**
 * Giorno assemblato dalla rotazione
 */
export declare const AssembledDaySchema: z.ZodObject<
  {
    id: z.ZodString;
    dayNumber: z.ZodNumber;
    dayName: z.ZodString;
    patternCode: z.ZodEnum<{
      A: 'A';
      B: 'B';
      C: 'C';
    }>;
    patternId: z.ZodString;
    appliedVariants: z.ZodDefault<
      z.ZodArray<
        z.ZodObject<
          {
            mealId: z.ZodString;
            swapIndex: z.ZodNumber;
          },
          z.core.$strip
        >
      >
    >;
    isCustomized: z.ZodDefault<z.ZodBoolean>;
    notes: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type AssembledDay = z.infer<typeof AssembledDaySchema>;
/**
 * Settimana assemblata
 */
export declare const AssembledWeekSchema: z.ZodObject<
  {
    id: z.ZodString;
    weekNumber: z.ZodNumber;
    days: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          dayNumber: z.ZodNumber;
          dayName: z.ZodString;
          patternCode: z.ZodEnum<{
            A: 'A';
            B: 'B';
            C: 'C';
          }>;
          patternId: z.ZodString;
          appliedVariants: z.ZodDefault<
            z.ZodArray<
              z.ZodObject<
                {
                  mealId: z.ZodString;
                  swapIndex: z.ZodNumber;
                },
                z.core.$strip
              >
            >
          >;
          isCustomized: z.ZodDefault<z.ZodBoolean>;
          notes: z.ZodOptional<z.ZodString>;
        },
        z.core.$strip
      >
    >;
    weeklyAverageMacros: z.ZodObject<
      {
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
      },
      z.core.$strip
    >;
    notes: z.ZodOptional<z.ZodString>;
  },
  z.core.$strip
>;
export type AssembledWeek = z.infer<typeof AssembledWeekSchema>;
/**
 * Metadata generazione
 */
export declare const GenerationMetadataSchema: z.ZodObject<
  {
    method: z.ZodLiteral<'pattern_based'>;
    patternsCount: z.ZodNumber;
    selectedFoodsCount: z.ZodNumber;
    totalVariants: z.ZodNumber;
    generatedAt: z.ZodString;
    tokensUsed: z.ZodOptional<z.ZodNumber>;
    costUSD: z.ZodOptional<z.ZodNumber>;
  },
  z.core.$strip
>;
export type GenerationMetadata = z.infer<typeof GenerationMetadataSchema>;
/**
 * Piano nutrizionale pattern-based completo
 */
export declare const PatternBasedNutritionPlanSchema: z.ZodObject<
  {
    id: z.ZodString;
    userId: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    goals: z.ZodArray<z.ZodString>;
    durationWeeks: z.ZodNumber;
    targetMacros: z.ZodObject<
      {
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodNumber;
      },
      z.core.$strip
    >;
    selectedFoodIds: z.ZodArray<z.ZodString>;
    dayPatterns: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          name: z.ZodString;
          patternCode: z.ZodEnum<{
            A: 'A';
            B: 'B';
            C: 'C';
          }>;
          description: z.ZodOptional<z.ZodString>;
          meals: z.ZodArray<
            z.ZodObject<
              {
                id: z.ZodString;
                name: z.ZodString;
                type: z.ZodEnum<{
                  breakfast: 'breakfast';
                  lunch: 'lunch';
                  dinner: 'dinner';
                  snack: 'snack';
                  'pre-workout': 'pre-workout';
                  'post-workout': 'post-workout';
                }>;
                time: z.ZodOptional<z.ZodString>;
                foods: z.ZodArray<
                  z.ZodObject<
                    {
                      id: z.ZodString;
                      foodItemId: z.ZodString;
                      name: z.ZodString;
                      quantity: z.ZodNumber;
                      unit: z.ZodDefault<
                        z.ZodEnum<{
                          g: 'g';
                          ml: 'ml';
                        }>
                      >;
                      macros: z.ZodObject<
                        {
                          calories: z.ZodNumber;
                          protein: z.ZodNumber;
                          carbs: z.ZodNumber;
                          fats: z.ZodNumber;
                          fiber: z.ZodOptional<z.ZodNumber>;
                        },
                        z.core.$strip
                      >;
                      notes: z.ZodOptional<z.ZodString>;
                    },
                    z.core.$strip
                  >
                >;
                totalMacros: z.ZodObject<
                  {
                    calories: z.ZodNumber;
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                  },
                  z.core.$strip
                >;
                variants: z.ZodDefault<
                  z.ZodArray<
                    z.ZodObject<
                      {
                        original: z.ZodString;
                        originalFoodItemId: z.ZodOptional<z.ZodString>;
                        alternative: z.ZodString;
                        alternativeFoodItemId: z.ZodOptional<z.ZodString>;
                        alternativeQuantity: z.ZodOptional<z.ZodNumber>;
                        reason: z.ZodOptional<z.ZodString>;
                      },
                      z.core.$strip
                    >
                  >
                >;
                notes: z.ZodOptional<z.ZodString>;
                prepTimeMinutes: z.ZodOptional<z.ZodNumber>;
              },
              z.core.$strip
            >
          >;
          totalMacros: z.ZodObject<
            {
              calories: z.ZodNumber;
              protein: z.ZodNumber;
              carbs: z.ZodNumber;
              fats: z.ZodNumber;
              fiber: z.ZodOptional<z.ZodNumber>;
            },
            z.core.$strip
          >;
          waterIntake: z.ZodOptional<z.ZodNumber>;
          notes: z.ZodOptional<z.ZodString>;
          focus: z.ZodOptional<z.ZodString>;
        },
        z.core.$strip
      >
    >;
    weeklyRotation: z.ZodArray<
      z.ZodEnum<{
        A: 'A';
        B: 'B';
        C: 'C';
      }>
    >;
    weeks: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          weekNumber: z.ZodNumber;
          days: z.ZodArray<
            z.ZodObject<
              {
                id: z.ZodString;
                dayNumber: z.ZodNumber;
                dayName: z.ZodString;
                patternCode: z.ZodEnum<{
                  A: 'A';
                  B: 'B';
                  C: 'C';
                }>;
                patternId: z.ZodString;
                appliedVariants: z.ZodDefault<
                  z.ZodArray<
                    z.ZodObject<
                      {
                        mealId: z.ZodString;
                        swapIndex: z.ZodNumber;
                      },
                      z.core.$strip
                    >
                  >
                >;
                isCustomized: z.ZodDefault<z.ZodBoolean>;
                notes: z.ZodOptional<z.ZodString>;
              },
              z.core.$strip
            >
          >;
          weeklyAverageMacros: z.ZodObject<
            {
              calories: z.ZodNumber;
              protein: z.ZodNumber;
              carbs: z.ZodNumber;
              fats: z.ZodNumber;
              fiber: z.ZodOptional<z.ZodNumber>;
            },
            z.core.$strip
          >;
          notes: z.ZodOptional<z.ZodString>;
        },
        z.core.$strip
      >
    >;
    restrictions: z.ZodDefault<z.ZodArray<z.ZodString>>;
    preferences: z.ZodDefault<z.ZodArray<z.ZodString>>;
    status: z.ZodDefault<
      z.ZodEnum<{
        ACTIVE: 'ACTIVE';
        COMPLETED: 'COMPLETED';
        DRAFT: 'DRAFT';
        ARCHIVED: 'ARCHIVED';
      }>
    >;
    version: z.ZodDefault<z.ZodNumber>;
    userProfile: z.ZodOptional<
      z.ZodObject<
        {
          weight: z.ZodNumber;
          height: z.ZodNumber;
          age: z.ZodNumber;
          gender: z.ZodEnum<{
            other: 'other';
            male: 'male';
            female: 'female';
          }>;
          activityLevel: z.ZodEnum<{
            moderate: 'moderate';
            active: 'active';
            sedentary: 'sedentary';
            light: 'light';
            very_active: 'very_active';
          }>;
        },
        z.core.$strip
      >
    >;
    generationMetadata: z.ZodOptional<
      z.ZodObject<
        {
          method: z.ZodLiteral<'pattern_based'>;
          patternsCount: z.ZodNumber;
          selectedFoodsCount: z.ZodNumber;
          totalVariants: z.ZodNumber;
          generatedAt: z.ZodString;
          tokensUsed: z.ZodOptional<z.ZodNumber>;
          costUSD: z.ZodOptional<z.ZodNumber>;
        },
        z.core.$strip
      >
    >;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
  },
  z.core.$strip
>;
export type PatternBasedNutritionPlan = z.infer<typeof PatternBasedNutritionPlanSchema>;
/**
 * Input per PatternNutritionOrchestratorService
 */
export declare const PatternNutritionGenerationInputSchema: z.ZodObject<
  {
    userId: z.ZodString;
    userProfile: z.ZodObject<
      {
        weight: z.ZodNumber;
        height: z.ZodNumber;
        age: z.ZodNumber;
        gender: z.ZodEnum<{
          other: 'other';
          male: 'male';
          female: 'female';
        }>;
        activityLevel: z.ZodEnum<{
          moderate: 'moderate';
          active: 'active';
          sedentary: 'sedentary';
          light: 'light';
          very_active: 'very_active';
        }>;
        bodyFatPercentage: z.ZodOptional<z.ZodNumber>;
      },
      z.core.$strip
    >;
    goals: z.ZodObject<
      {
        goal: z.ZodEnum<{
          weight_loss: 'weight_loss';
          muscle_gain: 'muscle_gain';
          maintenance: 'maintenance';
          performance: 'performance';
          health: 'health';
          body_recomposition: 'body_recomposition';
        }>;
        targetCalories: z.ZodOptional<z.ZodNumber>;
        targetProtein: z.ZodOptional<z.ZodNumber>;
        targetCarbs: z.ZodOptional<z.ZodNumber>;
        targetFats: z.ZodOptional<z.ZodNumber>;
        durationWeeks: z.ZodNumber;
        mealsPerDay: z.ZodNumber;
        patternsCount: z.ZodDefault<z.ZodNumber>;
      },
      z.core.$strip
    >;
    restrictions: z.ZodObject<
      {
        allergies: z.ZodDefault<z.ZodArray<z.ZodString>>;
        intolerances: z.ZodDefault<z.ZodArray<z.ZodString>>;
        dietType: z.ZodEnum<{
          none: 'none';
          omnivore: 'omnivore';
          vegetarian: 'vegetarian';
          vegan: 'vegan';
          pescatarian: 'pescatarian';
          keto: 'keto';
          paleo: 'paleo';
          mediterranean: 'mediterranean';
        }>;
        dislikedFoods: z.ZodDefault<z.ZodArray<z.ZodString>>;
        preferredFoods: z.ZodDefault<z.ZodArray<z.ZodString>>;
      },
      z.core.$strip
    >;
    additionalNotes: z.ZodOptional<z.ZodString>;
    feedbackData: z.ZodOptional<z.ZodUnknown>;
  },
  z.core.$strip
>;
export type PatternNutritionGenerationInput = z.infer<typeof PatternNutritionGenerationInputSchema>;
/**
 * Output PatternNutritionOrchestratorService
 */
export declare const PatternNutritionGenerationOutputSchema: z.ZodObject<
  {
    plan: z.ZodObject<
      {
        id: z.ZodString;
        userId: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
        goals: z.ZodArray<z.ZodString>;
        durationWeeks: z.ZodNumber;
        targetMacros: z.ZodObject<
          {
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodNumber;
          },
          z.core.$strip
        >;
        selectedFoodIds: z.ZodArray<z.ZodString>;
        dayPatterns: z.ZodArray<
          z.ZodObject<
            {
              id: z.ZodString;
              name: z.ZodString;
              patternCode: z.ZodEnum<{
                A: 'A';
                B: 'B';
                C: 'C';
              }>;
              description: z.ZodOptional<z.ZodString>;
              meals: z.ZodArray<
                z.ZodObject<
                  {
                    id: z.ZodString;
                    name: z.ZodString;
                    type: z.ZodEnum<{
                      breakfast: 'breakfast';
                      lunch: 'lunch';
                      dinner: 'dinner';
                      snack: 'snack';
                      'pre-workout': 'pre-workout';
                      'post-workout': 'post-workout';
                    }>;
                    time: z.ZodOptional<z.ZodString>;
                    foods: z.ZodArray<
                      z.ZodObject<
                        {
                          id: z.ZodString;
                          foodItemId: z.ZodString;
                          name: z.ZodString;
                          quantity: z.ZodNumber;
                          unit: z.ZodDefault<
                            z.ZodEnum<{
                              g: 'g';
                              ml: 'ml';
                            }>
                          >;
                          macros: z.ZodObject<
                            {
                              calories: z.ZodNumber;
                              protein: z.ZodNumber;
                              carbs: z.ZodNumber;
                              fats: z.ZodNumber;
                              fiber: z.ZodOptional<z.ZodNumber>;
                            },
                            z.core.$strip
                          >;
                          notes: z.ZodOptional<z.ZodString>;
                        },
                        z.core.$strip
                      >
                    >;
                    totalMacros: z.ZodObject<
                      {
                        calories: z.ZodNumber;
                        protein: z.ZodNumber;
                        carbs: z.ZodNumber;
                        fats: z.ZodNumber;
                        fiber: z.ZodOptional<z.ZodNumber>;
                      },
                      z.core.$strip
                    >;
                    variants: z.ZodDefault<
                      z.ZodArray<
                        z.ZodObject<
                          {
                            original: z.ZodString;
                            originalFoodItemId: z.ZodOptional<z.ZodString>;
                            alternative: z.ZodString;
                            alternativeFoodItemId: z.ZodOptional<z.ZodString>;
                            alternativeQuantity: z.ZodOptional<z.ZodNumber>;
                            reason: z.ZodOptional<z.ZodString>;
                          },
                          z.core.$strip
                        >
                      >
                    >;
                    notes: z.ZodOptional<z.ZodString>;
                    prepTimeMinutes: z.ZodOptional<z.ZodNumber>;
                  },
                  z.core.$strip
                >
              >;
              totalMacros: z.ZodObject<
                {
                  calories: z.ZodNumber;
                  protein: z.ZodNumber;
                  carbs: z.ZodNumber;
                  fats: z.ZodNumber;
                  fiber: z.ZodOptional<z.ZodNumber>;
                },
                z.core.$strip
              >;
              waterIntake: z.ZodOptional<z.ZodNumber>;
              notes: z.ZodOptional<z.ZodString>;
              focus: z.ZodOptional<z.ZodString>;
            },
            z.core.$strip
          >
        >;
        weeklyRotation: z.ZodArray<
          z.ZodEnum<{
            A: 'A';
            B: 'B';
            C: 'C';
          }>
        >;
        weeks: z.ZodArray<
          z.ZodObject<
            {
              id: z.ZodString;
              weekNumber: z.ZodNumber;
              days: z.ZodArray<
                z.ZodObject<
                  {
                    id: z.ZodString;
                    dayNumber: z.ZodNumber;
                    dayName: z.ZodString;
                    patternCode: z.ZodEnum<{
                      A: 'A';
                      B: 'B';
                      C: 'C';
                    }>;
                    patternId: z.ZodString;
                    appliedVariants: z.ZodDefault<
                      z.ZodArray<
                        z.ZodObject<
                          {
                            mealId: z.ZodString;
                            swapIndex: z.ZodNumber;
                          },
                          z.core.$strip
                        >
                      >
                    >;
                    isCustomized: z.ZodDefault<z.ZodBoolean>;
                    notes: z.ZodOptional<z.ZodString>;
                  },
                  z.core.$strip
                >
              >;
              weeklyAverageMacros: z.ZodObject<
                {
                  calories: z.ZodNumber;
                  protein: z.ZodNumber;
                  carbs: z.ZodNumber;
                  fats: z.ZodNumber;
                  fiber: z.ZodOptional<z.ZodNumber>;
                },
                z.core.$strip
              >;
              notes: z.ZodOptional<z.ZodString>;
            },
            z.core.$strip
          >
        >;
        restrictions: z.ZodDefault<z.ZodArray<z.ZodString>>;
        preferences: z.ZodDefault<z.ZodArray<z.ZodString>>;
        status: z.ZodDefault<
          z.ZodEnum<{
            ACTIVE: 'ACTIVE';
            COMPLETED: 'COMPLETED';
            DRAFT: 'DRAFT';
            ARCHIVED: 'ARCHIVED';
          }>
        >;
        version: z.ZodDefault<z.ZodNumber>;
        userProfile: z.ZodOptional<
          z.ZodObject<
            {
              weight: z.ZodNumber;
              height: z.ZodNumber;
              age: z.ZodNumber;
              gender: z.ZodEnum<{
                other: 'other';
                male: 'male';
                female: 'female';
              }>;
              activityLevel: z.ZodEnum<{
                moderate: 'moderate';
                active: 'active';
                sedentary: 'sedentary';
                light: 'light';
                very_active: 'very_active';
              }>;
            },
            z.core.$strip
          >
        >;
        generationMetadata: z.ZodOptional<
          z.ZodObject<
            {
              method: z.ZodLiteral<'pattern_based'>;
              patternsCount: z.ZodNumber;
              selectedFoodsCount: z.ZodNumber;
              totalVariants: z.ZodNumber;
              generatedAt: z.ZodString;
              tokensUsed: z.ZodOptional<z.ZodNumber>;
              costUSD: z.ZodOptional<z.ZodNumber>;
            },
            z.core.$strip
          >
        >;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
      },
      z.core.$strip
    >;
    summary: z.ZodString;
    warnings: z.ZodDefault<z.ZodArray<z.ZodString>>;
    recommendations: z.ZodDefault<z.ZodArray<z.ZodString>>;
    generationStats: z.ZodObject<
      {
        patternsGenerated: z.ZodNumber;
        foodsSelected: z.ZodNumber;
        foodsCreated: z.ZodNumber;
        variantsGenerated: z.ZodNumber;
        totalTokensUsed: z.ZodNumber;
        totalCostUSD: z.ZodNumber;
        generationTimeMs: z.ZodNumber;
      },
      z.core.$strip
    >;
  },
  z.core.$strip
>;
export type PatternNutritionGenerationOutput = z.infer<
  typeof PatternNutritionGenerationOutputSchema
>;
