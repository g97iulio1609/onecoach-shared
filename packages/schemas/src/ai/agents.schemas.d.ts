/**
 * Agents Schemas
 *
 * Schemi per gli agenti AI
 */
import { z } from 'zod';
export declare const agentRequestSchema: z.ZodObject<{
    type: z.ZodEnum<{
        analytics: "analytics";
        workout: "workout";
        nutrition: "nutrition";
        combined: "combined";
    }>;
    task: z.ZodString;
    context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    strategy: z.ZodOptional<z.ZodEnum<{
        single: "single";
        parallel: "parallel";
        sequential: "sequential";
    }>>;
    options: z.ZodOptional<z.ZodObject<{
        enableMemory: z.ZodOptional<z.ZodBoolean>;
        enableLearning: z.ZodOptional<z.ZodBoolean>;
        enableObservability: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type AgentRequest = z.infer<typeof agentRequestSchema>;
//# sourceMappingURL=agents.schemas.d.ts.map