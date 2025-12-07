/**
 * Nutrition Validation Schemas
 *
 * Schemi estesi per validazione API con vincoli più stretti
 * UNICA FONTE DI VERITÀ per validazione nutrizione
 */
import { z } from 'zod';
export declare const macrosValidationSchema: z.ZodObject<
  {
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    fiber: z.ZodOptional<z.ZodNumber>;
    calories: z.ZodNumber;
  },
  z.core.$strip
>;
export declare const targetMacrosValidationSchema: z.ZodObject<
  {
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    fiber: z.ZodNumber;
    calories: z.ZodNumber;
  },
  z.core.$strip
>;
export declare const foodValidationSchema: z.ZodObject<
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
    notes: z.ZodOptional<z.ZodString>;
    done: z.ZodOptional<z.ZodBoolean>;
    actualQuantity: z.ZodOptional<z.ZodNumber>;
    actualMacros: z.ZodOptional<
      z.ZodObject<
        {
          calories: z.ZodNumber;
          protein: z.ZodNumber;
          carbs: z.ZodNumber;
          fats: z.ZodNumber;
          fiber: z.ZodOptional<z.ZodNumber>;
        },
        z.core.$strip
      >
    >;
    macros: z.ZodObject<
      {
        protein: z.ZodNonOptional<z.ZodNumber>;
        carbs: z.ZodNonOptional<z.ZodNumber>;
        fats: z.ZodNonOptional<z.ZodNumber>;
        fiber: z.ZodNonOptional<z.ZodOptional<z.ZodNumber>>;
        calories: z.ZodNonOptional<z.ZodNumber>;
      },
      z.core.$strip
    >;
  },
  z.core.$strip
>;
export declare const mealValidationSchema: z.ZodObject<
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
    notes: z.ZodOptional<z.ZodString>;
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
          notes: z.ZodOptional<z.ZodString>;
          done: z.ZodOptional<z.ZodBoolean>;
          actualQuantity: z.ZodOptional<z.ZodNumber>;
          actualMacros: z.ZodOptional<
            z.ZodObject<
              {
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
              },
              z.core.$strip
            >
          >;
          macros: z.ZodObject<
            {
              protein: z.ZodNonOptional<z.ZodNumber>;
              carbs: z.ZodNonOptional<z.ZodNumber>;
              fats: z.ZodNonOptional<z.ZodNumber>;
              fiber: z.ZodNonOptional<z.ZodOptional<z.ZodNumber>>;
              calories: z.ZodNonOptional<z.ZodNumber>;
            },
            z.core.$strip
          >;
        },
        z.core.$strip
      >
    >;
    totalMacros: z.ZodObject<
      {
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
        calories: z.ZodNumber;
      },
      z.core.$strip
    >;
  },
  z.core.$strip
>;
export declare const nutritionDayValidationSchema: z.ZodObject<
  {
    id: z.ZodString;
    dayNumber: z.ZodNumber;
    dayName: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
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
          notes: z.ZodOptional<z.ZodString>;
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
                notes: z.ZodOptional<z.ZodString>;
                done: z.ZodOptional<z.ZodBoolean>;
                actualQuantity: z.ZodOptional<z.ZodNumber>;
                actualMacros: z.ZodOptional<
                  z.ZodObject<
                    {
                      calories: z.ZodNumber;
                      protein: z.ZodNumber;
                      carbs: z.ZodNumber;
                      fats: z.ZodNumber;
                      fiber: z.ZodOptional<z.ZodNumber>;
                    },
                    z.core.$strip
                  >
                >;
                macros: z.ZodObject<
                  {
                    protein: z.ZodNonOptional<z.ZodNumber>;
                    carbs: z.ZodNonOptional<z.ZodNumber>;
                    fats: z.ZodNonOptional<z.ZodNumber>;
                    fiber: z.ZodNonOptional<z.ZodOptional<z.ZodNumber>>;
                    calories: z.ZodNonOptional<z.ZodNumber>;
                  },
                  z.core.$strip
                >;
              },
              z.core.$strip
            >
          >;
          totalMacros: z.ZodObject<
            {
              protein: z.ZodNumber;
              carbs: z.ZodNumber;
              fats: z.ZodNumber;
              fiber: z.ZodOptional<z.ZodNumber>;
              calories: z.ZodNumber;
            },
            z.core.$strip
          >;
        },
        z.core.$strip
      >
    >;
    totalMacros: z.ZodObject<
      {
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
        calories: z.ZodNumber;
      },
      z.core.$strip
    >;
    waterIntake: z.ZodOptional<z.ZodNumber>;
  },
  z.core.$strip
>;
export declare const nutritionWeekValidationSchema: z.ZodObject<
  {
    id: z.ZodString;
    weekNumber: z.ZodNumber;
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
    days: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          dayNumber: z.ZodNumber;
          dayName: z.ZodString;
          notes: z.ZodOptional<z.ZodString>;
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
                notes: z.ZodOptional<z.ZodString>;
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
                      notes: z.ZodOptional<z.ZodString>;
                      done: z.ZodOptional<z.ZodBoolean>;
                      actualQuantity: z.ZodOptional<z.ZodNumber>;
                      actualMacros: z.ZodOptional<
                        z.ZodObject<
                          {
                            calories: z.ZodNumber;
                            protein: z.ZodNumber;
                            carbs: z.ZodNumber;
                            fats: z.ZodNumber;
                            fiber: z.ZodOptional<z.ZodNumber>;
                          },
                          z.core.$strip
                        >
                      >;
                      macros: z.ZodObject<
                        {
                          protein: z.ZodNonOptional<z.ZodNumber>;
                          carbs: z.ZodNonOptional<z.ZodNumber>;
                          fats: z.ZodNonOptional<z.ZodNumber>;
                          fiber: z.ZodNonOptional<z.ZodOptional<z.ZodNumber>>;
                          calories: z.ZodNonOptional<z.ZodNumber>;
                        },
                        z.core.$strip
                      >;
                    },
                    z.core.$strip
                  >
                >;
                totalMacros: z.ZodObject<
                  {
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                    calories: z.ZodNumber;
                  },
                  z.core.$strip
                >;
              },
              z.core.$strip
            >
          >;
          totalMacros: z.ZodObject<
            {
              protein: z.ZodNumber;
              carbs: z.ZodNumber;
              fats: z.ZodNumber;
              fiber: z.ZodOptional<z.ZodNumber>;
              calories: z.ZodNumber;
            },
            z.core.$strip
          >;
          waterIntake: z.ZodOptional<z.ZodNumber>;
        },
        z.core.$strip
      >
    >;
  },
  z.core.$strip
>;
export declare const nutritionPlanValidationSchema: z.ZodObject<
  {
    id: z.ZodString;
    userId: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    goals: z.ZodArray<z.ZodString>;
    durationWeeks: z.ZodNumber;
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
          name: z.ZodOptional<z.ZodString>;
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
      >
    >;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    createdAt: z.ZodPipe<
      z.ZodUnion<readonly [z.ZodString, z.ZodDate]>,
      z.ZodTransform<string, string | Date>
    >;
    updatedAt: z.ZodPipe<
      z.ZodUnion<readonly [z.ZodString, z.ZodDate]>,
      z.ZodTransform<string, string | Date>
    >;
    targetMacros: z.ZodObject<
      {
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodNumber;
        calories: z.ZodNumber;
      },
      z.core.$strip
    >;
    weeks: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          weekNumber: z.ZodNumber;
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
          days: z.ZodArray<
            z.ZodObject<
              {
                id: z.ZodString;
                dayNumber: z.ZodNumber;
                dayName: z.ZodString;
                notes: z.ZodOptional<z.ZodString>;
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
                      notes: z.ZodOptional<z.ZodString>;
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
                            notes: z.ZodOptional<z.ZodString>;
                            done: z.ZodOptional<z.ZodBoolean>;
                            actualQuantity: z.ZodOptional<z.ZodNumber>;
                            actualMacros: z.ZodOptional<
                              z.ZodObject<
                                {
                                  calories: z.ZodNumber;
                                  protein: z.ZodNumber;
                                  carbs: z.ZodNumber;
                                  fats: z.ZodNumber;
                                  fiber: z.ZodOptional<z.ZodNumber>;
                                },
                                z.core.$strip
                              >
                            >;
                            macros: z.ZodObject<
                              {
                                protein: z.ZodNonOptional<z.ZodNumber>;
                                carbs: z.ZodNonOptional<z.ZodNumber>;
                                fats: z.ZodNonOptional<z.ZodNumber>;
                                fiber: z.ZodNonOptional<z.ZodOptional<z.ZodNumber>>;
                                calories: z.ZodNonOptional<z.ZodNumber>;
                              },
                              z.core.$strip
                            >;
                          },
                          z.core.$strip
                        >
                      >;
                      totalMacros: z.ZodObject<
                        {
                          protein: z.ZodNumber;
                          carbs: z.ZodNumber;
                          fats: z.ZodNumber;
                          fiber: z.ZodOptional<z.ZodNumber>;
                          calories: z.ZodNumber;
                        },
                        z.core.$strip
                      >;
                    },
                    z.core.$strip
                  >
                >;
                totalMacros: z.ZodObject<
                  {
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                    calories: z.ZodNumber;
                  },
                  z.core.$strip
                >;
                waterIntake: z.ZodOptional<z.ZodNumber>;
              },
              z.core.$strip
            >
          >;
        },
        z.core.$strip
      >
    >;
  },
  z.core.$strip
>;
export type ValidatedNutritionPlan = z.infer<typeof nutritionPlanValidationSchema>;
/**
 * User metrics validation schema
 *
 * Validates weight, height, age, gender, and activity level.
 * Used across all nutrition endpoints.
 */
export declare const userMetricsSchema: z.ZodObject<
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
>;
/**
 * Nutrition plan goals schema (array of goals)
 */
export declare const nutritionPlanGoalsSchema: z.ZodArray<
  z.ZodEnum<{
    weight_loss: 'weight_loss';
    muscle_gain: 'muscle_gain';
    maintenance: 'maintenance';
    performance: 'performance';
  }>
>;
/**
 * Macros validation schema
 * Consolidated schema used across the application
 */
export declare const macrosSchema: z.ZodObject<
  {
    calories: z.ZodNumber;
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    fiber: z.ZodOptional<z.ZodNumber>;
  },
  z.core.$strip
>;
/**
 * Nutrition day input schema (for modifications - STRICT schema corrente)
 */
export declare const nutritionDayInputSchema: z.ZodObject<
  {
    dayNumber: z.ZodNumber;
    dayName: z.ZodOptional<z.ZodString>;
    meals: z.ZodArray<z.ZodAny>;
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
  },
  z.core.$strip
>;
export type UserMetrics = z.infer<typeof userMetricsSchema>;
export type NutritionPlanGoals = z.infer<typeof nutritionPlanGoalsSchema>;
export type NutritionDayInput = z.infer<typeof nutritionDayInputSchema>;
