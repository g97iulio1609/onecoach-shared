/**
 * Conversations Schemas
 *
 * Schemi per le conversazioni
 */
import { z } from 'zod';
const isoDateStringSchema = z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), { message: 'Invalid datetime format' });
const roleSchema = z.enum(['user', 'assistant', 'system', 'tool']);
export const conversationCreateSchema = z.object({
    title: z.string().trim().min(1).max(160).optional(),
    metadata: z.unknown().optional(),
    providerOverride: z.enum(['GOOGLE', 'ANTHROPIC', 'OPENAI', 'XAI', 'OPENROUTER']).optional(),
    modelOverride: z.string().trim().min(1).max(128).optional(),
    initialMessages: z
        .array(z.object({
        role: roleSchema,
        content: z.string().min(1).max(8000),
        metadata: z.unknown().optional(),
        sequence: z.number().int().min(0).max(1_000_000).optional(),
        occurredAt: isoDateStringSchema.optional(),
    }))
        .max(200)
        .optional(),
});
