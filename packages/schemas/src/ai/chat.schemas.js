/**
 * Chat Schemas
 *
 * Schemi per la chat AI
 * Base ChatMessage type is defined in @onecoach/types to avoid circular dependency
 */
import { z } from 'zod';
import { AI_REASONING_CONFIG } from '@onecoach/constants/analytics-constants';
/**
 * Schema for base chat message (without UI-specific fields like id, timestamp, metadata)
 * This matches the base structure of ChatMessage in @onecoach/types
 */
export const chatMessageSchema = z.object({
    role: z.enum(['user', 'assistant', 'system']),
    content: z.string().min(1),
});
export const chatStreamRequestSchema = z.object({
    messages: z.array(chatMessageSchema),
    tier: z.enum(['fast', 'balanced', 'quality']).optional().default('balanced'),
    provider: z.enum(['google', 'anthropic', 'openai', 'xai', 'openrouter']).optional(),
    model: z.string().trim().min(1).max(128).optional(),
    temperature: z.number().min(0).max(2).optional(),
    enableIntentDetection: z.boolean().optional().default(true),
    enableTools: z.boolean().optional().default(true),
    reasoning: z.boolean().optional().default(true),
    reasoningEffort: z
        .enum(['low', 'medium', 'high'])
        .optional()
        .default(AI_REASONING_CONFIG.DEFAULT_REASONING_EFFORT),
});
