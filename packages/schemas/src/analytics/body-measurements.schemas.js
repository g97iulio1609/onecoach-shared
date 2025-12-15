/**
 * Body Measurements Schemas
 *
 * Schemi per le misurazioni corporee
 */
import { z } from 'zod';
export const bodyMeasurementsQuerySchema = z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    limit: z.string().optional(),
    latest: z.string().optional(),
});
export const createBodyMeasurementSchema = z.object({
    date: z.string(),
    weight: z.number().optional(),
    bodyFat: z.number().optional(),
    muscleMass: z.number().optional(),
    chest: z.number().optional(),
    waist: z.number().optional(),
    hips: z.number().optional(),
    thigh: z.number().optional(),
    arm: z.number().optional(),
    calf: z.number().optional(),
    neck: z.number().optional(),
    shoulders: z.number().optional(),
    notes: z.string().optional(),
    photos: z.array(z.string()).optional(),
});
