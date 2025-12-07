/**
 * Body Measurements Schemas
 *
 * Schemi per le misurazioni corporee
 */
import { z } from 'zod';
export declare const bodyMeasurementsQuerySchema: z.ZodObject<{
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    latest: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createBodyMeasurementSchema: z.ZodObject<{
    date: z.ZodString;
    weight: z.ZodOptional<z.ZodNumber>;
    bodyFat: z.ZodOptional<z.ZodNumber>;
    muscleMass: z.ZodOptional<z.ZodNumber>;
    chest: z.ZodOptional<z.ZodNumber>;
    waist: z.ZodOptional<z.ZodNumber>;
    hips: z.ZodOptional<z.ZodNumber>;
    thigh: z.ZodOptional<z.ZodNumber>;
    arm: z.ZodOptional<z.ZodNumber>;
    calf: z.ZodOptional<z.ZodNumber>;
    neck: z.ZodOptional<z.ZodNumber>;
    shoulders: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
    photos: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type BodyMeasurementsQuery = z.infer<typeof bodyMeasurementsQuerySchema>;
export type CreateBodyMeasurementInput = z.infer<typeof createBodyMeasurementSchema>;
