/**
 * Agents Schemas
 *
 * Schemi per gli agenti AI
 */
import { z } from 'zod';
export const agentRequestSchema = z.object({
    type: z.enum(['nutrition', 'workout', 'analytics', 'combined']),
    task: z.string().min(1).max(10000),
    context: z.record(z.string(), z.unknown()).optional(),
    strategy: z.enum(['single', 'parallel', 'sequential']).optional(),
    options: z
        .object({
        enableMemory: z.boolean().optional(),
        enableLearning: z.boolean().optional(),
        enableObservability: z.boolean().optional(),
    })
        .optional(),
});
