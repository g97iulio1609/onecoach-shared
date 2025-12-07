/**
 * Nutrition Types
 *
 * Type definitions per il dominio nutrizione
 * Gli schemi Zod sono in @onecoach/schemas (unica fonte di verità)
 */
import { NutritionStatus } from './database.types';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre-workout' | 'post-workout';
export type Macros = {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber?: number;
};
export type CompleteMacros = {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
};
export type NutritionUserProfile = {
    age: number;
    sex: 'male' | 'female';
    heightCm: number;
    weightKg: number;
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    goal: string;
};
export type PersonalizedPlan = {
    tdee: number;
    targetCalories: number;
    macroSplit: {
        protein: number;
        carbs: number;
        fats: number;
    };
    recommendations: string[];
};
export type Adaptations = {
    weekNumber: number;
    reason: string;
    changes: string[];
};
export type Food = {
    id: string;
    foodItemId: string;
    name: string;
    quantity: number;
    unit: string;
    notes?: string;
    macros?: Macros;
    barcode?: string;
    brand?: string;
    imageUrl?: string;
    done?: boolean;
    actualQuantity?: number;
    actualMacros?: Macros;
};
export type Ingredient = {
    foodItemId: string;
    food: string;
    quantity: number;
    unit: string;
    preparation?: string;
    macros?: Macros;
};
export type Recipe = {
    name: string;
    description?: string;
    ingredients: Ingredient[];
    instructions: string[];
    prepTime: number;
    cookTime: number;
    servings: number;
    difficulty: 'easy' | 'medium' | 'hard';
    mealPrepTips?: string[];
    substitutions?: Array<{
        original: string;
        alternative: string;
    }>;
};
export type Meal = {
    id: string;
    name: string;
    type: MealType;
    time?: string;
    foods: Food[];
    totalMacros: Macros;
    notes?: string;
};
export type NutritionDay = {
    id: string;
    dayNumber: number;
    dayName: string;
    meals: Meal[];
    totalMacros: Macros;
    waterIntake?: number;
    notes?: string;
};
export type NutritionWeek = {
    id: string;
    weekNumber: number;
    days: NutritionDay[];
    weeklyAverageMacros: Macros;
    notes?: string;
};
export type NutritionPlan = {
    id: string;
    name: string;
    description: string;
    goals: string[];
    durationWeeks: number;
    targetMacros: CompleteMacros;
    weeks: NutritionWeek[];
    restrictions: string[];
    preferences: string[];
    status: NutritionStatus;
    userId: string;
    version: number;
    userProfile?: NutritionUserProfile;
    metadata?: Record<string, unknown> | null;
    personalizedPlan?: PersonalizedPlan;
    adaptations?: Adaptations;
    createdAt: string;
    updatedAt: string;
};
export type NutritionTracking = {
    planId: string;
    date: string;
    meals: Array<{
        mealId: string;
        completed: boolean;
        actualFoods?: Food[];
        notes?: string;
    }>;
    actualMacros: Macros;
    waterIntake: number;
    notes?: string;
};
export type NutritionTemplateType = 'meal' | 'day' | 'week';
export type NutritionTemplate = {
    id: string;
    type: NutritionTemplateType;
    name: string;
    description?: string;
    category?: string;
    tags: string[];
    data: Meal | NutritionDay | NutritionWeek;
    isPublic: boolean;
    usageCount: number;
    lastUsedAt?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};
export type MealTemplate = {
    id: string;
    name: string;
    description?: string;
    meal: Meal;
    tags: string[];
    isPublic: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
};
export type NutritionGoalCode = 'weight_loss' | 'muscle_gain' | 'maintenance' | 'performance' | 'health' | 'body_recomposition';
export type NutritionGenerationGoals = {
    goal: NutritionGoalCode;
    targetCalories?: number | null;
    targetProtein?: number | null;
    targetCarbs?: number | null;
    targetFats?: number | null;
    targetFiber?: number | null;
    durationWeeks: number;
    durationDays?: number;
    mealsPerDay: number;
};
export type DietaryRestrictions = {
    allergies: string[];
    intolerances: string[];
    dietType: 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'paleo' | 'mediterranean' | 'none';
    dislikedFoods: string[];
    preferredFoods: string[];
    preferences?: {
        dietType?: string;
        allergies?: string[];
        intolerances?: string[];
        dislikedFoods?: string[];
        preferredFoods?: string[];
        mealTiming?: string[];
        largestMeal?: 'breakfast' | 'lunch' | 'dinner';
        culturalPreferences?: string;
        generateImages?: boolean;
    };
};
export type NutritionGenerationInput = {
    userId: string;
    userProfile: NutritionUserProfile;
    goals: NutritionGenerationGoals;
    restrictions: DietaryRestrictions;
    additionalNotes?: string;
    availableFoods?: string[];
};
export type NutritionGenerationOutput = {
    program: NutritionPlan;
    summary: string;
    warnings: string[];
    recommendations: string[];
    generatedAt: string;
    tokensUsed: number;
    costUSD: number;
};
export type NutritionProgram = NutritionPlan;
/**
 * Type helper for Prisma nutrition_plans model
 * Maps exactly to Prisma schema with Json fields typed correctly
 */
export type PrismaNutritionPlan = {
    id: string;
    userId: string;
    name: string;
    description: string;
    durationWeeks: number;
    targetMacros: CompleteMacros;
    userProfile: NutritionUserProfile | null;
    personalizedPlan: PersonalizedPlan | null;
    adaptations: Adaptations | null;
    restrictions: string[];
    preferences: string[];
    status: NutritionStatus;
    metadata: Record<string, unknown> | null;
    version: number;
    createdAt: Date;
    updatedAt: Date;
    goals: string[];
    weeks: NutritionWeek[];
};
/**
 * Type helper for Prisma food_items model
 * Maps exactly to Prisma schema with Json fields typed correctly
 */
export type PrismaFoodItem = {
    id: string;
    name: string;
    nameNormalized: string;
    barcode: string | null;
    macrosPer100g: Macros;
    servingSize: number;
    unit: string;
    metadata: Record<string, unknown> | null;
    imageUrl: string | null;
    mainMacro: {
        type: 'PROTEIN' | 'CARBS' | 'FATS' | 'BALANCED';
        percentage: number;
    };
    brandId: string | null;
    proteinPct: number;
    carbPct: number;
    fatPct: number;
    createdAt: Date;
    updatedAt: Date;
};
/**
 * App-level NutritionPlan type (from Zod schema)
 * This is the canonical type used throughout the application
 */
export type AppNutritionPlan = NutritionPlan;
/**
 * Utility type for converting Prisma Json fields to typed values
 */
export type PrismaJsonToType<T> = T extends CompleteMacros ? CompleteMacros : T extends Macros ? Macros : T extends NutritionWeek[] ? NutritionWeek[] : T extends PersonalizedPlan ? PersonalizedPlan : T extends Adaptations ? Adaptations : T extends Record<string, unknown> ? Record<string, unknown> : T;
