/**
 * Food Base Schemas
 *
 * Schemi base per il dominio food
 * UNICA FONTE DI VERITÀ per tutti gli schemi food
 */

import { z } from 'zod';

/**
 * Main Macro Schema - Predominant macronutrient
 * Type is defined in @OneCoach/types to avoid circular dependency
 */
import type { MainMacro } from '@OneCoach/types';

export const mainMacroSchema: z.ZodType<MainMacro> = z.object({
  type: z.enum(['PROTEIN', 'CARBS', 'FATS', 'BALANCED']),
  percentage: z.number().min(0).max(100),
});

/**
 * Food Translation Schema - REQUIRED for multi-language support
 */
export const foodTranslationSchema = z.object({
  locale: z.string().min(2).max(8),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(2000), // NOW REQUIRED
});
export type FoodTranslation = z.infer<typeof foodTranslationSchema>;
