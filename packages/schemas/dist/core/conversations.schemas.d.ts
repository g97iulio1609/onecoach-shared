/**
 * Conversations Schemas
 *
 * Schemi per le conversazioni
 */
import { z } from 'zod';
export declare const conversationCreateSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodUnknown>;
    providerOverride: z.ZodOptional<z.ZodEnum<{
        GOOGLE: "GOOGLE";
        ANTHROPIC: "ANTHROPIC";
        OPENAI: "OPENAI";
        XAI: "XAI";
        OPENROUTER: "OPENROUTER";
    }>>;
    modelOverride: z.ZodOptional<z.ZodString>;
    initialMessages: z.ZodOptional<z.ZodArray<z.ZodObject<{
        role: z.ZodEnum<{
            user: "user";
            system: "system";
            assistant: "assistant";
            tool: "tool";
        }>;
        content: z.ZodString;
        metadata: z.ZodOptional<z.ZodUnknown>;
        sequence: z.ZodOptional<z.ZodNumber>;
        occurredAt: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type ConversationCreateInput = z.infer<typeof conversationCreateSchema>;
