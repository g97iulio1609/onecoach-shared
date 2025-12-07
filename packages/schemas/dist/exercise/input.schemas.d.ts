/**
 * Exercise Input Schemas
 *
 * Schemi per input API (request validation)
 * UNICA FONTE DI VERITÀ per input exercise
 */
import { ExerciseApprovalStatus } from '@prisma/client';
import { z } from 'zod';
export declare const exerciseTranslationSchema: z.ZodObject<{
    locale: z.ZodString;
    name: z.ZodString;
    shortName: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    searchTerms: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const exerciseMuscleInputSchema: z.ZodObject<{
    id: z.ZodString;
    role: z.ZodEnum<{
        PRIMARY: "PRIMARY";
        SECONDARY: "SECONDARY";
    }>;
}, z.core.$strip>;
export declare const exerciseRelationInputSchema: z.ZodObject<{
    id: z.ZodString;
    relation: z.ZodEnum<{
        ALTERNATIVE: "ALTERNATIVE";
        COMPLEMENTARY: "COMPLEMENTARY";
        PROGRESSION: "PROGRESSION";
    }>;
    direction: z.ZodDefault<z.ZodEnum<{
        outbound: "outbound";
        bidirectional: "bidirectional";
    }>>;
}, z.core.$strip>;
declare const baseExercisePayloadSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    exerciseTypeId: z.ZodString;
    overview: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>>;
    videoUrl: z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    instructions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    exerciseTips: z.ZodOptional<z.ZodArray<z.ZodString>>;
    variations: z.ZodOptional<z.ZodArray<z.ZodString>>;
    translations: z.ZodArray<z.ZodObject<{
        locale: z.ZodString;
        name: z.ZodString;
        shortName: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        searchTerms: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
    muscles: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        role: z.ZodEnum<{
            PRIMARY: "PRIMARY";
            SECONDARY: "SECONDARY";
        }>;
    }, z.core.$strip>>;
    bodyPartIds: z.ZodArray<z.ZodString>;
    equipmentIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    relatedExercises: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        relation: z.ZodEnum<{
            ALTERNATIVE: "ALTERNATIVE";
            COMPLEMENTARY: "COMPLEMENTARY";
            PROGRESSION: "PROGRESSION";
        }>;
        direction: z.ZodDefault<z.ZodEnum<{
            outbound: "outbound";
            bidirectional: "bidirectional";
        }>>;
    }, z.core.$strip>>>;
    isUserGenerated: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export type BaseExercisePayload = z.infer<typeof baseExercisePayloadSchema>;
export type CreateExerciseInput = BaseExercisePayload;
export declare const createExerciseSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodString>;
    exerciseTypeId: z.ZodString;
    overview: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>>;
    videoUrl: z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>>;
    keywords: z.ZodOptional<z.ZodArray<z.ZodString>>;
    instructions: z.ZodOptional<z.ZodArray<z.ZodString>>;
    exerciseTips: z.ZodOptional<z.ZodArray<z.ZodString>>;
    variations: z.ZodOptional<z.ZodArray<z.ZodString>>;
    translations: z.ZodArray<z.ZodObject<{
        locale: z.ZodString;
        name: z.ZodString;
        shortName: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        searchTerms: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
    muscles: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        role: z.ZodEnum<{
            PRIMARY: "PRIMARY";
            SECONDARY: "SECONDARY";
        }>;
    }, z.core.$strip>>;
    bodyPartIds: z.ZodArray<z.ZodString>;
    equipmentIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    relatedExercises: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        relation: z.ZodEnum<{
            ALTERNATIVE: "ALTERNATIVE";
            COMPLEMENTARY: "COMPLEMENTARY";
            PROGRESSION: "PROGRESSION";
        }>;
        direction: z.ZodDefault<z.ZodEnum<{
            outbound: "outbound";
            bidirectional: "bidirectional";
        }>>;
    }, z.core.$strip>>>;
    isUserGenerated: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
declare const updateExerciseBaseSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    exerciseTypeId: z.ZodOptional<z.ZodString>;
    overview: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>>>;
    videoUrl: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>>>;
    keywords: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    instructions: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    exerciseTips: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    variations: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    translations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        locale: z.ZodString;
        name: z.ZodString;
        shortName: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        searchTerms: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
    muscles: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        role: z.ZodEnum<{
            PRIMARY: "PRIMARY";
            SECONDARY: "SECONDARY";
        }>;
    }, z.core.$strip>>>;
    bodyPartIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    equipmentIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    relatedExercises: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        relation: z.ZodEnum<{
            ALTERNATIVE: "ALTERNATIVE";
            COMPLEMENTARY: "COMPLEMENTARY";
            PROGRESSION: "PROGRESSION";
        }>;
        direction: z.ZodDefault<z.ZodEnum<{
            outbound: "outbound";
            bidirectional: "bidirectional";
        }>>;
    }, z.core.$strip>>>>;
    isUserGenerated: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type UpdateExerciseInput = z.infer<typeof updateExerciseBaseSchema> & {
    approvalStatus?: ExerciseApprovalStatus;
};
export declare const updateExerciseSchema: z.ZodObject<{
    slug: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    exerciseTypeId: z.ZodOptional<z.ZodString>;
    overview: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    imageUrl: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>>>;
    videoUrl: z.ZodOptional<z.ZodOptional<z.ZodPipe<z.ZodTransform<{} | undefined, unknown>, z.ZodOptional<z.ZodURL>>>>;
    keywords: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    instructions: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    exerciseTips: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    variations: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    translations: z.ZodOptional<z.ZodArray<z.ZodObject<{
        locale: z.ZodString;
        name: z.ZodString;
        shortName: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        searchTerms: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
    muscles: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        role: z.ZodEnum<{
            PRIMARY: "PRIMARY";
            SECONDARY: "SECONDARY";
        }>;
    }, z.core.$strip>>>;
    bodyPartIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
    equipmentIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
    relatedExercises: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        relation: z.ZodEnum<{
            ALTERNATIVE: "ALTERNATIVE";
            COMPLEMENTARY: "COMPLEMENTARY";
            PROGRESSION: "PROGRESSION";
        }>;
        direction: z.ZodDefault<z.ZodEnum<{
            outbound: "outbound";
            bidirectional: "bidirectional";
        }>>;
    }, z.core.$strip>>>>;
    isUserGenerated: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    approvalStatus: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>>;
}, z.core.$strip>;
export declare const exerciseQuerySchema: z.ZodObject<{
    locale: z.ZodDefault<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodOptional<z.ZodNumber>>>;
    pageSize: z.ZodDefault<z.ZodPipe<z.ZodTransform<number | undefined, unknown>, z.ZodOptional<z.ZodNumber>>>;
    exerciseTypeId: z.ZodOptional<z.ZodString>;
    muscleIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    bodyPartIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    equipmentIds: z.ZodOptional<z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodOptional<z.ZodArray<z.ZodString>>>>;
    approvalStatus: z.ZodOptional<z.ZodEnum<{
        DRAFT: "DRAFT";
        PENDING: "PENDING";
        APPROVED: "APPROVED";
        REJECTED: "REJECTED";
    }>>;
    includeTranslations: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    includeUnapproved: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export declare const exerciseDetailQuerySchema: z.ZodObject<{
    locale: z.ZodDefault<z.ZodString>;
    includeTranslations: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    includeUnapproved: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export type ExerciseTranslationInput = z.infer<typeof exerciseTranslationSchema>;
export type ExerciseMuscleInput = z.infer<typeof exerciseMuscleInputSchema>;
export type ExerciseRelationInput = z.infer<typeof exerciseRelationInputSchema>;
export type ExerciseQueryParams = z.infer<typeof exerciseQuerySchema>;
export type ExerciseDetailQueryParams = z.infer<typeof exerciseDetailQuerySchema>;
export {};
