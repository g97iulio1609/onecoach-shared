/**
 * Exercise Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input exercise
 */
import { ExerciseApprovalStatus, ExerciseRelationType, MuscleRole } from '@prisma/client';
import { z } from 'zod';
import { localeSchema, optionalUrlSchema, stringArraySchema } from '../core/common.schemas';
export const exerciseTranslationSchema = z.object({
    locale: localeSchema,
    name: z.string().trim().min(1, 'Il nome è obbligatorio').max(255),
    shortName: z.string().trim().min(1).max(128).optional(),
    description: z.string().trim().min(1).max(8000).optional(),
    searchTerms: stringArraySchema.max(32).optional(),
});
export const exerciseMuscleInputSchema = z.object({
    id: z.string().trim().min(1), // ID del muscolo
    role: z.nativeEnum(MuscleRole),
});
export const exerciseRelationInputSchema = z.object({
    id: z.string().trim().min(1),
    relation: z.nativeEnum(ExerciseRelationType),
    direction: z.enum(['outbound', 'bidirectional']).default('outbound'),
});
const baseExercisePayloadSchema = z.object({
    slug: z.string().trim().min(1).max(128).optional(),
    exerciseTypeId: z.string().trim().min(1, 'exerciseTypeId è obbligatorio'), // ID obbligatorio
    overview: z.string().trim().max(16000).optional(),
    imageUrl: optionalUrlSchema.optional(),
    videoUrl: optionalUrlSchema.optional(),
    keywords: stringArraySchema.optional(),
    instructions: z.array(z.string().trim().min(1).max(2000)).optional(),
    exerciseTips: z.array(z.string().trim().min(1).max(2000)).optional(),
    variations: z.array(z.string().trim().min(1).max(2000)).optional(),
    translations: z.array(exerciseTranslationSchema).min(1, 'È richiesta almeno una traduzione'),
    muscles: z.array(exerciseMuscleInputSchema).min(1, 'Specificare almeno un muscolo'),
    bodyPartIds: z.array(z.string().trim().min(1)).min(1, 'Specificare almeno una parte del corpo'), // ID array
    equipmentIds: z.array(z.string().trim().min(1)).optional(), // ID array
    relatedExercises: z.array(exerciseRelationInputSchema).optional(),
    isUserGenerated: z.boolean().optional(),
});
export const createExerciseSchema = baseExercisePayloadSchema.superRefine((value, ctx) => {
    const locales = value.translations.map((translation) => translation.locale.toLowerCase());
    if (!locales.includes('en')) {
        ctx.addIssue({
            code: 'custom',
            message: 'È obbligatoria la traduzione in inglese',
            path: ['translations'],
        });
    }
});
const updateExerciseBaseSchema = baseExercisePayloadSchema.partial();
export const updateExerciseSchema = updateExerciseBaseSchema
    .extend({
    approvalStatus: z.nativeEnum(ExerciseApprovalStatus).optional(),
})
    .superRefine((value, ctx) => {
    if (Object.keys(value).length === 0) {
        ctx.addIssue({
            code: 'custom',
            message: 'Nessun campo da aggiornare',
        });
    }
    if (value.translations) {
        const locales = value.translations.map((translation) => translation.locale.toLowerCase());
        if (!locales.includes('en')) {
            ctx.addIssue({
                code: 'custom',
                message: 'La traduzione in inglese è obbligatoria',
                path: ['translations'],
            });
        }
    }
});
export const exerciseQuerySchema = z.object({
    locale: localeSchema.default('en'),
    search: z.string().trim().max(256).optional(),
    page: z
        .preprocess((val) => {
        if (val === undefined || val === null || val === '')
            return undefined;
        const num = typeof val === 'string' ? parseInt(val, 10) : Number(val);
        return isNaN(num) ? undefined : num;
    }, z.number().int().min(1).optional())
        .default(1),
    pageSize: z
        .preprocess((val) => {
        if (val === undefined || val === null || val === '')
            return undefined;
        const num = typeof val === 'string' ? parseInt(val, 10) : Number(val);
        return isNaN(num) ? undefined : num;
    }, z.number().int().min(1).max(100).optional())
        .default(20),
    exerciseTypeId: z.string().trim().min(1).optional(), // ID invece di name
    muscleIds: z
        .preprocess((value) => (typeof value === 'string' ? value.split(',') : value), z.array(z.string().trim().min(1)).optional())
        .optional(),
    bodyPartIds: z
        .preprocess((value) => (typeof value === 'string' ? value.split(',') : value), z.array(z.string().trim().min(1)).optional())
        .optional(),
    equipmentIds: z
        .preprocess((value) => (typeof value === 'string' ? value.split(',') : value), z.array(z.string().trim().min(1)).optional())
        .optional(),
    approvalStatus: z.nativeEnum(ExerciseApprovalStatus).optional(),
    includeTranslations: z.coerce.boolean().optional(),
    includeUnapproved: z.coerce.boolean().optional(),
});
export const exerciseDetailQuerySchema = z.object({
    locale: localeSchema.default('en'),
    includeTranslations: z.coerce.boolean().optional(),
    includeUnapproved: z.coerce.boolean().optional(),
});
