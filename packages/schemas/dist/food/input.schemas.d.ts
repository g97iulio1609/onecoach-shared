/**
 * Food Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input food
 */
import { z } from 'zod';
/**
 * Create Food Schema - REQUIRED fields: name, macrosPer100g, servingSize, unit, description
 * Optional: barcode, metadata, imageUrl, brandId, brandName, categoryIds, mainMacro, translations
 * If translations not provided, they will be auto-generated from description in 10 languages
 */
export declare const createFoodSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    macrosPer100g: z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    servingSize: z.ZodNumber;
    unit: z.ZodDefault<z.ZodString>;
    barcode: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    imageUrl: z.ZodOptional<z.ZodURL>;
    brandId: z.ZodOptional<z.ZodString>;
    brandName: z.ZodOptional<z.ZodString>;
    categoryIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    mainMacro: z.ZodOptional<z.ZodType<import("@OneCoach/types").MainMacro, unknown, z.core.$ZodTypeInternals<import("@OneCoach/types").MainMacro, unknown>>>;
    translations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        locale: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updateFoodSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    macrosPer100g: z.ZodOptional<z.ZodObject<{
        calories: z.ZodNumber;
        protein: z.ZodNumber;
        carbs: z.ZodNumber;
        fats: z.ZodNumber;
        fiber: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    servingSize: z.ZodOptional<z.ZodNumber>;
    unit: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    barcode: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodURL>>;
    brandId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    brandName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    categoryIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    mainMacro: z.ZodOptional<z.ZodOptional<z.ZodType<import("@OneCoach/types").MainMacro, unknown, z.core.$ZodTypeInternals<import("@OneCoach/types").MainMacro, unknown>>>>;
    translations: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        locale: z.ZodString;
        name: z.ZodString;
        description: z.ZodString;
    }, z.core.$strip>>>>;
    description: z.ZodString;
}, z.core.$strip>;
export declare const foodQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    brandId: z.ZodOptional<z.ZodString>;
    categoryIds: z.ZodOptional<z.ZodString>;
    barcode: z.ZodOptional<z.ZodString>;
    kcalMin: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    kcalMax: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    pageSize: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        name: "name";
        updatedAt: "updatedAt";
        createdAt: "createdAt";
        calories: "calories";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    macroDominant: z.ZodOptional<z.ZodEnum<{
        protein: "protein";
        carbs: "carbs";
        fats: "fats";
    }>>;
    minProteinPct: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    minCarbPct: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    minFatPct: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreateFoodInput = z.infer<typeof createFoodSchema>;
export type UpdateFoodInput = z.infer<typeof updateFoodSchema>;
export type FoodQueryInput = z.infer<typeof foodQuerySchema>;
