/**
 * Chat Schemas
 *
 * Schemi per la chat AI
 * Base ChatMessage type is defined in @onecoach/types to avoid circular dependency
 */
import { z } from 'zod';
/**
 * Schema for base chat message (without UI-specific fields like id, timestamp, metadata)
 * This matches the base structure of ChatMessage in @onecoach/types
 */
export declare const chatMessageSchema: z.ZodObject<{
    role: z.ZodEnum<{
        system: "system";
        user: "user";
        assistant: "assistant";
    }>;
    content: z.ZodString;
}, z.core.$strip>;
export declare const chatStreamRequestSchema: z.ZodObject<{
    messages: z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<{
            system: "system";
            user: "user";
            assistant: "assistant";
        }>;
        content: z.ZodString;
    }, z.core.$strip>>;
    tier: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        fast: "fast";
        balanced: "balanced";
        quality: "quality";
    }>>>;
    provider: z.ZodOptional<z.ZodEnum<{
        google: "google";
        anthropic: "anthropic";
        openai: "openai";
        xai: "xai";
        openrouter: "openrouter";
    }>>;
    model: z.ZodOptional<z.ZodString>;
    temperature: z.ZodOptional<z.ZodNumber>;
    enableIntentDetection: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    enableTools: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoning: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
    reasoningEffort: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        low: "low";
        medium: "medium";
        high: "high";
    }>>>;
}, z.core.$strip>;
export type ChatStreamRequest = z.infer<typeof chatStreamRequestSchema>;
//# sourceMappingURL=chat.schemas.d.ts.map