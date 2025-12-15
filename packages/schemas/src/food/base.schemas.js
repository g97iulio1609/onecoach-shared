/**
 * Food Base Schemas
 *
 * Schemi base per il dominio food
 * UNICA FONTE DI VERITÀ per tutti gli schemi food
 */
import { z } from 'zod';
export const mainMacroSchema = z.object({
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
