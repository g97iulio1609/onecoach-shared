/**
 * Food Base Schemas
 *
 * Schemi base per il dominio food
 * UNICA FONTE DI VERITÀ per tutti gli schemi food
 */
import { z } from 'zod';
/**
 * Main Macro Schema - Predominant macronutrient
 * Type is defined in @onecoach/types to avoid circular dependency
 */
import type { MainMacro } from '@onecoach/types';
export declare const mainMacroSchema: z.ZodType<MainMacro>;
/**
 * Food Translation Schema - REQUIRED for multi-language support
 */
export declare const foodTranslationSchema: z.ZodObject<{
    locale: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export type FoodTranslation = z.infer<typeof foodTranslationSchema>;
//# sourceMappingURL=base.schemas.d.ts.map