/**
 * Nutrition Types
 *
 * Type definitions per il dominio nutrizione
 * Gli schemi Zod sono in @onecoach/schemas (unica fonte di verità)
 */
// Types are defined directly here to avoid circular dependency with schemas
// Schemas can use these types to create Zod schemas, but types don't depend on schemas
import { NutritionStatus } from './database.types';
