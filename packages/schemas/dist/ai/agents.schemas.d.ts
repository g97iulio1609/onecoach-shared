/**
 * Agents Schemas
 *
 * Schemi per gli agenti AI
 */
import { z } from 'zod';
export declare const agentRequestSchema: z.ZodObject<{
    type: z.ZodEnum<{
        workout: "workout";
        nutrition: "nutrition";
        analytics: "analytics";
        combined: "combined";
    }>;
    task: z.ZodString;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    strategy: z.ZodOptional<z.ZodEnum<{
        single: "single";
        sequential: "sequential";
        parallel: "parallel";
    }>>;
    options: z.ZodOptional<z.ZodObject<{
        enableMemory: z.ZodOptional<z.ZodBoolean>;
        enableLearning: z.ZodOptional<z.ZodBoolean>;
        enableObservability: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type AgentRequest = z.infer<typeof agentRequestSchema>;
