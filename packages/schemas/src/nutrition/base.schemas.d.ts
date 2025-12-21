/**
 * Nutrition Base Schemas - SINGLE SOURCE OF TRUTH
 *
 * Core value objects per il dominio nutrizione.
 * Pattern-based schemas sono in pattern.schemas.ts
 *
 * @module @onecoach/schemas/nutrition
 */
import { z } from 'zod';
/**
 * Tipi di pasto supportati
 */
export declare const MealTypeSchema: z.ZodEnum<{
    breakfast: "breakfast";
    lunch: "lunch";
    dinner: "dinner";
    snack: "snack";
    "pre-workout": "pre-workout";
    "post-workout": "post-workout";
}>;
export type MealType = z.infer<typeof MealTypeSchema>;
/**
 * Macronutrienti base (fiber opzionale)
 */
export declare const MacrosSchema: z.ZodObject<{
    calories: z.ZodNumber;
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    fiber: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type Macros = z.infer<typeof MacrosSchema>;
/**
 * Macronutrienti completi (fiber obbligatorio)
 */
export declare const CompleteMacrosSchema: z.ZodObject<{
    calories: z.ZodNumber;
    protein: z.ZodNumber;
    carbs: z.ZodNumber;
    fats: z.ZodNumber;
    fiber: z.ZodNumber;
}, z.core.$strip>;
export type CompleteMacros = z.infer<typeof CompleteMacrosSchema>;
/**
 * Obiettivi nutrizionali
 */
export declare const NutritionGoalSchema: z.ZodEnum<{
    performance: "performance";
    health: "health";
    weight_loss: "weight_loss";
    muscle_gain: "muscle_gain";
    maintenance: "maintenance";
    body_recomposition: "body_recomposition";
}>;
export type NutritionGoal = z.infer<typeof NutritionGoalSchema>;
/**
 * Tipi di dieta supportati
 */
export declare const DietTypeSchema: z.ZodEnum<{
    none: "none";
    omnivore: "omnivore";
    vegetarian: "vegetarian";
    vegan: "vegan";
    pescatarian: "pescatarian";
    keto: "keto";
    paleo: "paleo";
    mediterranean: "mediterranean";
}>;
export type DietType = z.infer<typeof DietTypeSchema>;
/**
 * Livelli di attività
 */
export declare const ActivityLevelSchema: z.ZodEnum<{
    light: "light";
    active: "active";
    sedentary: "sedentary";
    moderate: "moderate";
    very_active: "very_active";
}>;
export type ActivityLevel = z.infer<typeof ActivityLevelSchema>;
/**
 * Genere
 */
export declare const GenderSchema: z.ZodEnum<{
    other: "other";
    male: "male";
    female: "female";
}>;
export type Gender = z.infer<typeof GenderSchema>;
/**
 * Profilo utente per calcoli nutrizionali
 */
export declare const NutritionUserProfileSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    weight: z.ZodNumber;
    height: z.ZodNumber;
    age: z.ZodNumber;
    gender: z.ZodEnum<{
        other: "other";
        male: "male";
        female: "female";
    }>;
    activityLevel: z.ZodEnum<{
        light: "light";
        active: "active";
        sedentary: "sedentary";
        moderate: "moderate";
        very_active: "very_active";
    }>;
    bodyFatPercentage: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type NutritionUserProfile = z.infer<typeof NutritionUserProfileSchema>;
/**
 * Alimento in un pasto
 */
export declare const FoodSchema: z.ZodObject<{
    id: z.ZodString;
    foodItemId: z.ZodString;
    name: z.ZodString;
    quantity: z.ZodNumber;
    unit: z.ZodDefault<z.ZodEnum<{
        g: "g";
        ml: "ml";
    }>>;
    macros: z.ZodOptional<z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    notes: z.ZodOptional<z.ZodString>;
    done: z.ZodOptional<z.ZodBoolean>;
    actualQuantity: z.ZodOptional<z.ZodNumber>;
    actualMacros: z.ZodOptional<z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Food = z.infer<typeof FoodSchema>;
/**
 * Pasto
 */
export declare const MealSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<{
        breakfast: "breakfast";
        lunch: "lunch";
        dinner: "dinner";
        snack: "snack";
        "pre-workout": "pre-workout";
        "post-workout": "post-workout";
    }>;
    time: z.ZodOptional<z.ZodString>;
    foods: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        foodItemId: z.ZodString;
        name: z.ZodString;
        quantity: z.ZodNumber;
        unit: z.ZodDefault<z.ZodEnum<{
            g: "g";
            ml: "ml";
        }>>;
        macros: z.ZodOptional<z.ZodObject<{
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
        notes: z.ZodOptional<z.ZodString>;
        done: z.ZodOptional<z.ZodBoolean>;
        actualQuantity: z.ZodOptional<z.ZodNumber>;
        actualMacros: z.ZodOptional<z.ZodObject<{
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    totalMacros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Meal = z.infer<typeof MealSchema>;
/**
 * Giorno nutrizionale
 */
export declare const NutritionDaySchema: z.ZodObject<{
    id: z.ZodString;
    dayNumber: z.ZodNumber;
    dayName: z.ZodString;
    meals: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<{
            breakfast: "breakfast";
            lunch: "lunch";
            dinner: "dinner";
            snack: "snack";
            "pre-workout": "pre-workout";
            "post-workout": "post-workout";
        }>;
        time: z.ZodOptional<z.ZodString>;
        foods: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            foodItemId: z.ZodString;
            name: z.ZodString;
            quantity: z.ZodNumber;
            unit: z.ZodDefault<z.ZodEnum<{
                g: "g";
                ml: "ml";
            }>>;
            macros: z.ZodOptional<z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>;
            notes: z.ZodOptional<z.ZodString>;
            done: z.ZodOptional<z.ZodBoolean>;
            actualQuantity: z.ZodOptional<z.ZodNumber>;
            actualMacros: z.ZodOptional<z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        totalMacros: z.ZodObject<{
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    totalMacros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    waterIntake: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type NutritionDay = z.infer<typeof NutritionDaySchema>;
/**
 * Settimana nutrizionale
 */
export declare const NutritionWeekSchema: z.ZodObject<{
    id: z.ZodString;
    weekNumber: z.ZodNumber;
    days: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        dayNumber: z.ZodNumber;
        dayName: z.ZodString;
        meals: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            type: z.ZodEnum<{
                breakfast: "breakfast";
                lunch: "lunch";
                dinner: "dinner";
                snack: "snack";
                "pre-workout": "pre-workout";
                "post-workout": "post-workout";
            }>;
            time: z.ZodOptional<z.ZodString>;
            foods: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                foodItemId: z.ZodString;
                name: z.ZodString;
                quantity: z.ZodNumber;
                unit: z.ZodDefault<z.ZodEnum<{
                    g: "g";
                    ml: "ml";
                }>>;
                macros: z.ZodOptional<z.ZodObject<{
                    calories: z.ZodNumber;
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                }, z.core.$strip>>;
                notes: z.ZodOptional<z.ZodString>;
                done: z.ZodOptional<z.ZodBoolean>;
                actualQuantity: z.ZodOptional<z.ZodNumber>;
                actualMacros: z.ZodOptional<z.ZodObject<{
                    calories: z.ZodNumber;
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
            totalMacros: z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        totalMacros: z.ZodObject<{
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        waterIntake: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    weeklyAverageMacros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type NutritionWeek = z.infer<typeof NutritionWeekSchema>;
/**
 * Stati del piano
 */
export declare const PlanStatusSchema: z.ZodEnum<{
    DRAFT: "DRAFT";
    ACTIVE: "ACTIVE";
    COMPLETED: "COMPLETED";
    ARCHIVED: "ARCHIVED";
}>;
export type PlanStatus = z.infer<typeof PlanStatusSchema>;
/**
 * Piano nutrizionale base (senza timestamps)
 */
export declare const NutritionPlanBaseSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    goals: z.ZodArray<z.ZodString>;
    durationWeeks: z.ZodNumber;
    targetMacros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodNumber;
    }, z.core.$strip>;
    weeks: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        weekNumber: z.ZodNumber;
        days: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            dayNumber: z.ZodNumber;
            dayName: z.ZodString;
            meals: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                type: z.ZodEnum<{
                    breakfast: "breakfast";
                    lunch: "lunch";
                    dinner: "dinner";
                    snack: "snack";
                    "pre-workout": "pre-workout";
                    "post-workout": "post-workout";
                }>;
                time: z.ZodOptional<z.ZodString>;
                foods: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    foodItemId: z.ZodString;
                    name: z.ZodString;
                    quantity: z.ZodNumber;
                    unit: z.ZodDefault<z.ZodEnum<{
                        g: "g";
                        ml: "ml";
                    }>>;
                    macros: z.ZodOptional<z.ZodObject<{
                        calories: z.ZodNumber;
                        protein: z.ZodNumber;
                        carbs: z.ZodNumber;
                        fats: z.ZodNumber;
                        fiber: z.ZodOptional<z.ZodNumber>;
                    }, z.core.$strip>>;
                    notes: z.ZodOptional<z.ZodString>;
                    done: z.ZodOptional<z.ZodBoolean>;
                    actualQuantity: z.ZodOptional<z.ZodNumber>;
                    actualMacros: z.ZodOptional<z.ZodObject<{
                        calories: z.ZodNumber;
                        protein: z.ZodNumber;
                        carbs: z.ZodNumber;
                        fats: z.ZodNumber;
                        fiber: z.ZodOptional<z.ZodNumber>;
                    }, z.core.$strip>>;
                }, z.core.$strip>>;
                totalMacros: z.ZodObject<{
                    calories: z.ZodNumber;
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                }, z.core.$strip>;
                notes: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
            totalMacros: z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>;
            waterIntake: z.ZodOptional<z.ZodNumber>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        weeklyAverageMacros: z.ZodObject<{
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    restrictions: z.ZodDefault<z.ZodArray<z.ZodString>>;
    preferences: z.ZodDefault<z.ZodArray<z.ZodString>>;
    status: z.ZodDefault<z.ZodEnum<{
        DRAFT: "DRAFT";
        ACTIVE: "ACTIVE";
        COMPLETED: "COMPLETED";
        ARCHIVED: "ARCHIVED";
    }>>;
    version: z.ZodDefault<z.ZodNumber>;
    userProfile: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        weight: z.ZodNumber;
        height: z.ZodNumber;
        age: z.ZodNumber;
        gender: z.ZodEnum<{
            other: "other";
            male: "male";
            female: "female";
        }>;
        activityLevel: z.ZodEnum<{
            light: "light";
            active: "active";
            sedentary: "sedentary";
            moderate: "moderate";
            very_active: "very_active";
        }>;
        bodyFatPercentage: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
}, z.core.$strip>;
/**
 * Piano nutrizionale completo
 */
export declare const NutritionPlanSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    goals: z.ZodArray<z.ZodString>;
    durationWeeks: z.ZodNumber;
    targetMacros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodNumber;
    }, z.core.$strip>;
    weeks: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        weekNumber: z.ZodNumber;
        days: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            dayNumber: z.ZodNumber;
            dayName: z.ZodString;
            meals: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                type: z.ZodEnum<{
                    breakfast: "breakfast";
                    lunch: "lunch";
                    dinner: "dinner";
                    snack: "snack";
                    "pre-workout": "pre-workout";
                    "post-workout": "post-workout";
                }>;
                time: z.ZodOptional<z.ZodString>;
                foods: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    foodItemId: z.ZodString;
                    name: z.ZodString;
                    quantity: z.ZodNumber;
                    unit: z.ZodDefault<z.ZodEnum<{
                        g: "g";
                        ml: "ml";
                    }>>;
                    macros: z.ZodOptional<z.ZodObject<{
                        calories: z.ZodNumber;
                        protein: z.ZodNumber;
                        carbs: z.ZodNumber;
                        fats: z.ZodNumber;
                        fiber: z.ZodOptional<z.ZodNumber>;
                    }, z.core.$strip>>;
                    notes: z.ZodOptional<z.ZodString>;
                    done: z.ZodOptional<z.ZodBoolean>;
                    actualQuantity: z.ZodOptional<z.ZodNumber>;
                    actualMacros: z.ZodOptional<z.ZodObject<{
                        calories: z.ZodNumber;
                        protein: z.ZodNumber;
                        carbs: z.ZodNumber;
                        fats: z.ZodNumber;
                        fiber: z.ZodOptional<z.ZodNumber>;
                    }, z.core.$strip>>;
                }, z.core.$strip>>;
                totalMacros: z.ZodObject<{
                    calories: z.ZodNumber;
                    protein: z.ZodNumber;
                    carbs: z.ZodNumber;
                    fats: z.ZodNumber;
                    fiber: z.ZodOptional<z.ZodNumber>;
                }, z.core.$strip>;
                notes: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
            totalMacros: z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>;
            waterIntake: z.ZodOptional<z.ZodNumber>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        weeklyAverageMacros: z.ZodObject<{
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    restrictions: z.ZodDefault<z.ZodArray<z.ZodString>>;
    preferences: z.ZodDefault<z.ZodArray<z.ZodString>>;
    status: z.ZodDefault<z.ZodEnum<{
        DRAFT: "DRAFT";
        ACTIVE: "ACTIVE";
        COMPLETED: "COMPLETED";
        ARCHIVED: "ARCHIVED";
    }>>;
    version: z.ZodDefault<z.ZodNumber>;
    userProfile: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        weight: z.ZodNumber;
        height: z.ZodNumber;
        age: z.ZodNumber;
        gender: z.ZodEnum<{
            other: "other";
            male: "male";
            female: "female";
        }>;
        activityLevel: z.ZodEnum<{
            light: "light";
            active: "active";
            sedentary: "sedentary";
            moderate: "moderate";
            very_active: "very_active";
        }>;
        bodyFatPercentage: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    createdAt: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>, z.ZodTransform<string, string | Date>>;
    updatedAt: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>, z.ZodTransform<string, string | Date>>;
}, z.core.$strip>;
export type NutritionPlan = z.infer<typeof NutritionPlanSchema>;
/**
 * Piano personalizzato - customizzazioni specifiche per l'utente
 */
export declare const PersonalizedPlanSchema: z.ZodObject<{
    customizations: z.ZodArray<z.ZodString>;
    personalNotes: z.ZodArray<z.ZodString>;
    motivationalMessage: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type PersonalizedPlan = z.infer<typeof PersonalizedPlanSchema>;
/**
 * Adattamenti al piano - timing, porzioni, sostituzioni
 */
export declare const AdaptationsSchema: z.ZodObject<{
    mealTimingAdjustments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        mealId: z.ZodString;
        newTime: z.ZodString;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    portionAdjustments: z.ZodOptional<z.ZodArray<z.ZodObject<{
        mealId: z.ZodString;
        foodId: z.ZodString;
        adjustmentFactor: z.ZodNumber;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
    substitutions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        originalFoodId: z.ZodString;
        substituteFoodId: z.ZodString;
        reason: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type Adaptations = z.infer<typeof AdaptationsSchema>;
/**
 * Tracking giornaliero
 */
export declare const NutritionTrackingSchema: z.ZodObject<{
    planId: z.ZodString;
    date: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>, z.ZodTransform<string, string | Date>>;
    meals: z.ZodArray<z.ZodObject<{
        mealId: z.ZodString;
        completed: z.ZodBoolean;
        actualFoods: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            foodItemId: z.ZodString;
            name: z.ZodString;
            quantity: z.ZodNumber;
            unit: z.ZodDefault<z.ZodEnum<{
                g: "g";
                ml: "ml";
            }>>;
            macros: z.ZodOptional<z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>;
            notes: z.ZodOptional<z.ZodString>;
            done: z.ZodOptional<z.ZodBoolean>;
            actualQuantity: z.ZodOptional<z.ZodNumber>;
            actualMacros: z.ZodOptional<z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>;
        }, z.core.$strip>>>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    actualMacros: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    waterIntake: z.ZodNumber;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type NutritionTracking = z.infer<typeof NutritionTrackingSchema>;
export declare const NutritionTemplateTypeSchema: z.ZodEnum<{
    day: "day";
    week: "week";
    meal: "meal";
}>;
export type NutritionTemplateType = z.infer<typeof NutritionTemplateTypeSchema>;
export declare const MealTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    meal: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<{
            breakfast: "breakfast";
            lunch: "lunch";
            dinner: "dinner";
            snack: "snack";
            "pre-workout": "pre-workout";
            "post-workout": "post-workout";
        }>;
        time: z.ZodOptional<z.ZodString>;
        foods: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            foodItemId: z.ZodString;
            name: z.ZodString;
            quantity: z.ZodNumber;
            unit: z.ZodDefault<z.ZodEnum<{
                g: "g";
                ml: "ml";
            }>>;
            macros: z.ZodOptional<z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>;
            notes: z.ZodOptional<z.ZodString>;
            done: z.ZodOptional<z.ZodBoolean>;
            actualQuantity: z.ZodOptional<z.ZodNumber>;
            actualMacros: z.ZodOptional<z.ZodObject<{
                calories: z.ZodNumber;
                protein: z.ZodNumber;
                carbs: z.ZodNumber;
                fats: z.ZodNumber;
                fiber: z.ZodOptional<z.ZodNumber>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        totalMacros: z.ZodObject<{
            calories: z.ZodNumber;
            protein: z.ZodNumber;
            carbs: z.ZodNumber;
            fats: z.ZodNumber;
            fiber: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    tags: z.ZodArray<z.ZodString>;
    isPublic: z.ZodBoolean;
    userId: z.ZodString;
    createdAt: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>, z.ZodTransform<string, string | Date>>;
    updatedAt: z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodDate]>, z.ZodTransform<string, string | Date>>;
}, z.core.$strip>;
export type MealTemplate = z.infer<typeof MealTemplateSchema>;
/**
 * Restrizioni alimentari
 */
export declare const DietaryRestrictionsSchema: z.ZodObject<{
    allergies: z.ZodDefault<z.ZodArray<z.ZodString>>;
    intolerances: z.ZodDefault<z.ZodArray<z.ZodString>>;
    dietType: z.ZodEnum<{
        none: "none";
        omnivore: "omnivore";
        vegetarian: "vegetarian";
        vegan: "vegan";
        pescatarian: "pescatarian";
        keto: "keto";
        paleo: "paleo";
        mediterranean: "mediterranean";
    }>;
    dislikedFoods: z.ZodDefault<z.ZodArray<z.ZodString>>;
    preferredFoods: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type DietaryRestrictions = z.infer<typeof DietaryRestrictionsSchema>;
//# sourceMappingURL=base.schemas.d.ts.map