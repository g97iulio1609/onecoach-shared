/**
 * Workout Base Schemas
 *
 * Schemi base per il dominio workout
 * UNICA FONTE DI VERITÀ per tutti gli schemi workout
 *
 * ARCHITETTURA SERIE:
 * - SetGroup è la sorgente di verità per rappresentare le serie
 * - Ogni SetGroup ha un baseSet (parametri comuni) e count (numero serie)
 * - Le serie individuali sono generate dal baseSet + progression opzionale
 * - Il campo sets[] legacy è deprecato, usare sempre setGroups[]
 */
import { z } from 'zod';
/**
 * Exercise set schema - Singola serie di un esercizio
 *
 * Campi principali:
 * - reps/duration: volume (reps per forza, duration per cardio/plank)
 * - weight/weightLbs: carico (kg e conversione lbs automatica)
 * - intensityPercent: % del 1RM (calcolato auto se 1RM disponibile)
 * - rpe: Rate of Perceived Exertion 1-10
 * - rest: secondi di recupero
 *
 * Campi tracking (opzionali) per esecuzione effettiva:
 * - done, repsDone, weightDone, etc.
 */
export declare const exerciseSetSchema: z.ZodObject<{
    reps: z.ZodOptional<z.ZodNumber>;
    repsMax: z.ZodOptional<z.ZodNumber>;
    duration: z.ZodOptional<z.ZodNumber>;
    weight: z.ZodNullable<z.ZodNumber>;
    weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    weightLbs: z.ZodNullable<z.ZodNumber>;
    intensityPercent: z.ZodNullable<z.ZodNumber>;
    intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    rpe: z.ZodNullable<z.ZodNumber>;
    rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    rest: z.ZodNumber;
    done: z.ZodOptional<z.ZodBoolean>;
    repsDone: z.ZodOptional<z.ZodNumber>;
    durationDone: z.ZodOptional<z.ZodNumber>;
    weightDone: z.ZodOptional<z.ZodNumber>;
    weightDoneLbs: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ExerciseSet = z.infer<typeof exerciseSetSchema>;
/**
 * Set progression schema - Progressione tra serie di un gruppo
 *
 * Tipi di progressione:
 * - linear: incremento fisso in kg (es. +2.5kg ogni serie)
 * - percentage: incremento % del peso base
 * - rpe: incremento RPE (es. da 7 a 9 nelle ultime serie)
 */
export declare const setProgressionSchema: z.ZodObject<{
    type: z.ZodEnum<{
        linear: "linear";
        percentage: "percentage";
        rpe: "rpe";
    }>;
    steps: z.ZodArray<z.ZodObject<{
        fromSet: z.ZodNumber;
        toSet: z.ZodNumber;
        adjustment: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SetProgression = z.infer<typeof setProgressionSchema>;
/**
 * Set group schema - Gruppo di serie con parametri comuni
 *
 * SORGENTE DI VERITÀ per le serie di un esercizio.
 * Vantaggi rispetto a sets[] flat:
 * - Rappresenta serie uniformi in modo compatto (es. 4x8 = 1 gruppo con count:4)
 * - Supporta progressioni intelligenti (pyramid, drop sets, etc.)
 * - Facilita editing nel visual builder
 *
 * Esempio 4x8 @ 100kg:
 * {
 *   id: "setgroup_123",
 *   count: 4,
 *   baseSet: { reps: 8, weight: 100, rest: 120, ... },
 *   sets: [<4 ExerciseSet espansi>]
 * }
 */
export declare const setGroupSchema: z.ZodObject<{
    id: z.ZodString;
    count: z.ZodNumber;
    baseSet: z.ZodObject<{
        reps: z.ZodOptional<z.ZodNumber>;
        repsMax: z.ZodOptional<z.ZodNumber>;
        duration: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodNullable<z.ZodNumber>;
        weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        weightLbs: z.ZodNullable<z.ZodNumber>;
        intensityPercent: z.ZodNullable<z.ZodNumber>;
        intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        rpe: z.ZodNullable<z.ZodNumber>;
        rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        rest: z.ZodNumber;
        done: z.ZodOptional<z.ZodBoolean>;
        repsDone: z.ZodOptional<z.ZodNumber>;
        durationDone: z.ZodOptional<z.ZodNumber>;
        weightDone: z.ZodOptional<z.ZodNumber>;
        weightDoneLbs: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    progression: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<{
            linear: "linear";
            percentage: "percentage";
            rpe: "rpe";
        }>;
        steps: z.ZodArray<z.ZodObject<{
            fromSet: z.ZodNumber;
            toSet: z.ZodNumber;
            adjustment: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    sets: z.ZodArray<z.ZodObject<{
        reps: z.ZodOptional<z.ZodNumber>;
        repsMax: z.ZodOptional<z.ZodNumber>;
        duration: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodNullable<z.ZodNumber>;
        weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        weightLbs: z.ZodNullable<z.ZodNumber>;
        intensityPercent: z.ZodNullable<z.ZodNumber>;
        intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        rpe: z.ZodNullable<z.ZodNumber>;
        rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        rest: z.ZodNumber;
        done: z.ZodOptional<z.ZodBoolean>;
        repsDone: z.ZodOptional<z.ZodNumber>;
        durationDone: z.ZodOptional<z.ZodNumber>;
        weightDone: z.ZodOptional<z.ZodNumber>;
        weightDoneLbs: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SetGroup = z.infer<typeof setGroupSchema>;
/**
 * Exercise schema - Esercizio completo con setGroups
 *
 * ARCHITETTURA:
 * - setGroups[] è la SORGENTE DI VERITÀ per le serie
 * - Ogni SetGroup rappresenta serie uniformi o con progressione
 * - Il campo sets[] legacy è mantenuto per compatibilità ma deprecato
 *
 * L'AI genera sempre setGroups. Il normalizer converte sets[] legacy → setGroups[]
 */
export declare const exerciseSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    exerciseId: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodString;
    type: z.ZodEnum<{
        core: "core";
        isolation: "isolation";
        compound: "compound";
        accessory: "accessory";
    }>;
    category: z.ZodEnum<{
        strength: "strength";
        cardio: "cardio";
        flexibility: "flexibility";
        balance: "balance";
        endurance: "endurance";
        core: "core";
    }>;
    muscleGroup: z.ZodOptional<z.ZodString>;
    muscleGroups: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        core: "core";
        chest: "chest";
        back: "back";
        shoulders: "shoulders";
        arms: "arms";
        legs: "legs";
        "full-body": "full-body";
    }>>>;
    setGroups: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        count: z.ZodNumber;
        baseSet: z.ZodObject<{
            reps: z.ZodOptional<z.ZodNumber>;
            repsMax: z.ZodOptional<z.ZodNumber>;
            duration: z.ZodOptional<z.ZodNumber>;
            weight: z.ZodNullable<z.ZodNumber>;
            weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            weightLbs: z.ZodNullable<z.ZodNumber>;
            intensityPercent: z.ZodNullable<z.ZodNumber>;
            intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            rpe: z.ZodNullable<z.ZodNumber>;
            rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            rest: z.ZodNumber;
            done: z.ZodOptional<z.ZodBoolean>;
            repsDone: z.ZodOptional<z.ZodNumber>;
            durationDone: z.ZodOptional<z.ZodNumber>;
            weightDone: z.ZodOptional<z.ZodNumber>;
            weightDoneLbs: z.ZodOptional<z.ZodNumber>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        progression: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<{
                linear: "linear";
                percentage: "percentage";
                rpe: "rpe";
            }>;
            steps: z.ZodArray<z.ZodObject<{
                fromSet: z.ZodNumber;
                toSet: z.ZodNumber;
                adjustment: z.ZodNumber;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        sets: z.ZodArray<z.ZodObject<{
            reps: z.ZodOptional<z.ZodNumber>;
            repsMax: z.ZodOptional<z.ZodNumber>;
            duration: z.ZodOptional<z.ZodNumber>;
            weight: z.ZodNullable<z.ZodNumber>;
            weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            weightLbs: z.ZodNullable<z.ZodNumber>;
            intensityPercent: z.ZodNullable<z.ZodNumber>;
            intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            rpe: z.ZodNullable<z.ZodNumber>;
            rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            rest: z.ZodNumber;
            done: z.ZodOptional<z.ZodBoolean>;
            repsDone: z.ZodOptional<z.ZodNumber>;
            durationDone: z.ZodOptional<z.ZodNumber>;
            weightDone: z.ZodOptional<z.ZodNumber>;
            weightDoneLbs: z.ZodOptional<z.ZodNumber>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    reps: z.ZodOptional<z.ZodString>;
    rest: z.ZodOptional<z.ZodString>;
    intensity: z.ZodOptional<z.ZodString>;
    typeLabel: z.ZodOptional<z.ZodString>;
    repRange: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    formCues: z.ZodOptional<z.ZodArray<z.ZodString>>;
    variation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
    videoUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Exercise = z.infer<typeof exerciseSchema>;
/**
 * Workout day schema
 */
export declare const workoutDaySchema: z.ZodObject<{
    dayNumber: z.ZodNumber;
    dayName: z.ZodString;
    name: z.ZodString;
    targetMuscles: z.ZodArray<z.ZodString>;
    exercises: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        exerciseId: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        description: z.ZodString;
        type: z.ZodEnum<{
            core: "core";
            isolation: "isolation";
            compound: "compound";
            accessory: "accessory";
        }>;
        category: z.ZodEnum<{
            strength: "strength";
            cardio: "cardio";
            flexibility: "flexibility";
            balance: "balance";
            endurance: "endurance";
            core: "core";
        }>;
        muscleGroup: z.ZodOptional<z.ZodString>;
        muscleGroups: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            core: "core";
            chest: "chest";
            back: "back";
            shoulders: "shoulders";
            arms: "arms";
            legs: "legs";
            "full-body": "full-body";
        }>>>;
        setGroups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            count: z.ZodNumber;
            baseSet: z.ZodObject<{
                reps: z.ZodOptional<z.ZodNumber>;
                repsMax: z.ZodOptional<z.ZodNumber>;
                duration: z.ZodOptional<z.ZodNumber>;
                weight: z.ZodNullable<z.ZodNumber>;
                weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                weightLbs: z.ZodNullable<z.ZodNumber>;
                intensityPercent: z.ZodNullable<z.ZodNumber>;
                intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                rpe: z.ZodNullable<z.ZodNumber>;
                rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                rest: z.ZodNumber;
                done: z.ZodOptional<z.ZodBoolean>;
                repsDone: z.ZodOptional<z.ZodNumber>;
                durationDone: z.ZodOptional<z.ZodNumber>;
                weightDone: z.ZodOptional<z.ZodNumber>;
                weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                notes: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
            progression: z.ZodOptional<z.ZodObject<{
                type: z.ZodEnum<{
                    linear: "linear";
                    percentage: "percentage";
                    rpe: "rpe";
                }>;
                steps: z.ZodArray<z.ZodObject<{
                    fromSet: z.ZodNumber;
                    toSet: z.ZodNumber;
                    adjustment: z.ZodNumber;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
            sets: z.ZodArray<z.ZodObject<{
                reps: z.ZodOptional<z.ZodNumber>;
                repsMax: z.ZodOptional<z.ZodNumber>;
                duration: z.ZodOptional<z.ZodNumber>;
                weight: z.ZodNullable<z.ZodNumber>;
                weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                weightLbs: z.ZodNullable<z.ZodNumber>;
                intensityPercent: z.ZodNullable<z.ZodNumber>;
                intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                rpe: z.ZodNullable<z.ZodNumber>;
                rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                rest: z.ZodNumber;
                done: z.ZodOptional<z.ZodBoolean>;
                repsDone: z.ZodOptional<z.ZodNumber>;
                durationDone: z.ZodOptional<z.ZodNumber>;
                weightDone: z.ZodOptional<z.ZodNumber>;
                weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                notes: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        reps: z.ZodOptional<z.ZodString>;
        rest: z.ZodOptional<z.ZodString>;
        intensity: z.ZodOptional<z.ZodString>;
        typeLabel: z.ZodOptional<z.ZodString>;
        repRange: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        formCues: z.ZodOptional<z.ZodArray<z.ZodString>>;
        variation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
        videoUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    totalDuration: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodString;
    warmup: z.ZodOptional<z.ZodString>;
    cooldown: z.ZodString;
}, z.core.$strip>;
export type WorkoutDay = z.infer<typeof workoutDaySchema>;
/**
 * Workout week schema
 */
export declare const workoutWeekSchema: z.ZodObject<{
    weekNumber: z.ZodNumber;
    focus: z.ZodOptional<z.ZodString>;
    days: z.ZodArray<z.ZodObject<{
        dayNumber: z.ZodNumber;
        dayName: z.ZodString;
        name: z.ZodString;
        targetMuscles: z.ZodArray<z.ZodString>;
        exercises: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            exerciseId: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            description: z.ZodString;
            type: z.ZodEnum<{
                core: "core";
                isolation: "isolation";
                compound: "compound";
                accessory: "accessory";
            }>;
            category: z.ZodEnum<{
                strength: "strength";
                cardio: "cardio";
                flexibility: "flexibility";
                balance: "balance";
                endurance: "endurance";
                core: "core";
            }>;
            muscleGroup: z.ZodOptional<z.ZodString>;
            muscleGroups: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                core: "core";
                chest: "chest";
                back: "back";
                shoulders: "shoulders";
                arms: "arms";
                legs: "legs";
                "full-body": "full-body";
            }>>>;
            setGroups: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                count: z.ZodNumber;
                baseSet: z.ZodObject<{
                    reps: z.ZodOptional<z.ZodNumber>;
                    repsMax: z.ZodOptional<z.ZodNumber>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    weight: z.ZodNullable<z.ZodNumber>;
                    weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    weightLbs: z.ZodNullable<z.ZodNumber>;
                    intensityPercent: z.ZodNullable<z.ZodNumber>;
                    intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    rpe: z.ZodNullable<z.ZodNumber>;
                    rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    rest: z.ZodNumber;
                    done: z.ZodOptional<z.ZodBoolean>;
                    repsDone: z.ZodOptional<z.ZodNumber>;
                    durationDone: z.ZodOptional<z.ZodNumber>;
                    weightDone: z.ZodOptional<z.ZodNumber>;
                    weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                    notes: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                progression: z.ZodOptional<z.ZodObject<{
                    type: z.ZodEnum<{
                        linear: "linear";
                        percentage: "percentage";
                        rpe: "rpe";
                    }>;
                    steps: z.ZodArray<z.ZodObject<{
                        fromSet: z.ZodNumber;
                        toSet: z.ZodNumber;
                        adjustment: z.ZodNumber;
                    }, z.core.$strip>>;
                }, z.core.$strip>>;
                sets: z.ZodArray<z.ZodObject<{
                    reps: z.ZodOptional<z.ZodNumber>;
                    repsMax: z.ZodOptional<z.ZodNumber>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    weight: z.ZodNullable<z.ZodNumber>;
                    weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    weightLbs: z.ZodNullable<z.ZodNumber>;
                    intensityPercent: z.ZodNullable<z.ZodNumber>;
                    intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    rpe: z.ZodNullable<z.ZodNumber>;
                    rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    rest: z.ZodNumber;
                    done: z.ZodOptional<z.ZodBoolean>;
                    repsDone: z.ZodOptional<z.ZodNumber>;
                    durationDone: z.ZodOptional<z.ZodNumber>;
                    weightDone: z.ZodOptional<z.ZodNumber>;
                    weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                    notes: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
            reps: z.ZodOptional<z.ZodString>;
            rest: z.ZodOptional<z.ZodString>;
            intensity: z.ZodOptional<z.ZodString>;
            typeLabel: z.ZodOptional<z.ZodString>;
            repRange: z.ZodOptional<z.ZodString>;
            notes: z.ZodOptional<z.ZodString>;
            formCues: z.ZodOptional<z.ZodArray<z.ZodString>>;
            variation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
            videoUrl: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        totalDuration: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodString;
        warmup: z.ZodOptional<z.ZodString>;
        cooldown: z.ZodString;
    }, z.core.$strip>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type WorkoutWeek = z.infer<typeof workoutWeekSchema>;
/**
 * Workout program schema (main)
 */
export declare const workoutProgramSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    difficulty: z.ZodEnum<{
        BEGINNER: "BEGINNER";
        INTERMEDIATE: "INTERMEDIATE";
        ADVANCED: "ADVANCED";
        ELITE: "ELITE";
    }>;
    durationWeeks: z.ZodNumber;
    weeks: z.ZodArray<z.ZodObject<{
        weekNumber: z.ZodNumber;
        focus: z.ZodOptional<z.ZodString>;
        days: z.ZodArray<z.ZodObject<{
            dayNumber: z.ZodNumber;
            dayName: z.ZodString;
            name: z.ZodString;
            targetMuscles: z.ZodArray<z.ZodString>;
            exercises: z.ZodArray<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                exerciseId: z.ZodOptional<z.ZodString>;
                name: z.ZodString;
                description: z.ZodString;
                type: z.ZodEnum<{
                    core: "core";
                    isolation: "isolation";
                    compound: "compound";
                    accessory: "accessory";
                }>;
                category: z.ZodEnum<{
                    strength: "strength";
                    cardio: "cardio";
                    flexibility: "flexibility";
                    balance: "balance";
                    endurance: "endurance";
                    core: "core";
                }>;
                muscleGroup: z.ZodOptional<z.ZodString>;
                muscleGroups: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                    core: "core";
                    chest: "chest";
                    back: "back";
                    shoulders: "shoulders";
                    arms: "arms";
                    legs: "legs";
                    "full-body": "full-body";
                }>>>;
                setGroups: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    count: z.ZodNumber;
                    baseSet: z.ZodObject<{
                        reps: z.ZodOptional<z.ZodNumber>;
                        repsMax: z.ZodOptional<z.ZodNumber>;
                        duration: z.ZodOptional<z.ZodNumber>;
                        weight: z.ZodNullable<z.ZodNumber>;
                        weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        weightLbs: z.ZodNullable<z.ZodNumber>;
                        intensityPercent: z.ZodNullable<z.ZodNumber>;
                        intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        rpe: z.ZodNullable<z.ZodNumber>;
                        rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        rest: z.ZodNumber;
                        done: z.ZodOptional<z.ZodBoolean>;
                        repsDone: z.ZodOptional<z.ZodNumber>;
                        durationDone: z.ZodOptional<z.ZodNumber>;
                        weightDone: z.ZodOptional<z.ZodNumber>;
                        weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                        notes: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                    progression: z.ZodOptional<z.ZodObject<{
                        type: z.ZodEnum<{
                            linear: "linear";
                            percentage: "percentage";
                            rpe: "rpe";
                        }>;
                        steps: z.ZodArray<z.ZodObject<{
                            fromSet: z.ZodNumber;
                            toSet: z.ZodNumber;
                            adjustment: z.ZodNumber;
                        }, z.core.$strip>>;
                    }, z.core.$strip>>;
                    sets: z.ZodArray<z.ZodObject<{
                        reps: z.ZodOptional<z.ZodNumber>;
                        repsMax: z.ZodOptional<z.ZodNumber>;
                        duration: z.ZodOptional<z.ZodNumber>;
                        weight: z.ZodNullable<z.ZodNumber>;
                        weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        weightLbs: z.ZodNullable<z.ZodNumber>;
                        intensityPercent: z.ZodNullable<z.ZodNumber>;
                        intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        rpe: z.ZodNullable<z.ZodNumber>;
                        rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        rest: z.ZodNumber;
                        done: z.ZodOptional<z.ZodBoolean>;
                        repsDone: z.ZodOptional<z.ZodNumber>;
                        durationDone: z.ZodOptional<z.ZodNumber>;
                        weightDone: z.ZodOptional<z.ZodNumber>;
                        weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                        notes: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>>;
                }, z.core.$strip>>;
                reps: z.ZodOptional<z.ZodString>;
                rest: z.ZodOptional<z.ZodString>;
                intensity: z.ZodOptional<z.ZodString>;
                typeLabel: z.ZodOptional<z.ZodString>;
                repRange: z.ZodOptional<z.ZodString>;
                notes: z.ZodOptional<z.ZodString>;
                formCues: z.ZodOptional<z.ZodArray<z.ZodString>>;
                variation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
                videoUrl: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
            totalDuration: z.ZodOptional<z.ZodNumber>;
            notes: z.ZodString;
            warmup: z.ZodOptional<z.ZodString>;
            cooldown: z.ZodString;
        }, z.core.$strip>>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    goals: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type WorkoutProgram = z.infer<typeof workoutProgramSchema>;
/**
 * AI Generation Schemas - Simplified versions for AI output
 *
 * These schemas allow AI to generate only baseSet + count,
 * and the sets[] array is built programmatically to save tokens.
 */
/**
 * AI SetGroup Schema - sets[] is optional for AI generation
 * The code will expand sets[] from baseSet + count after AI generation
 */
export declare const aiSetGroupSchema: z.ZodObject<{
    id: z.ZodString;
    count: z.ZodNumber;
    baseSet: z.ZodObject<{
        reps: z.ZodOptional<z.ZodNumber>;
        repsMax: z.ZodOptional<z.ZodNumber>;
        duration: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodNullable<z.ZodNumber>;
        weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        weightLbs: z.ZodNullable<z.ZodNumber>;
        intensityPercent: z.ZodNullable<z.ZodNumber>;
        intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        rpe: z.ZodNullable<z.ZodNumber>;
        rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        rest: z.ZodNumber;
        done: z.ZodOptional<z.ZodBoolean>;
        repsDone: z.ZodOptional<z.ZodNumber>;
        durationDone: z.ZodOptional<z.ZodNumber>;
        weightDone: z.ZodOptional<z.ZodNumber>;
        weightDoneLbs: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    progression: z.ZodOptional<z.ZodObject<{
        type: z.ZodEnum<{
            linear: "linear";
            percentage: "percentage";
            rpe: "rpe";
        }>;
        steps: z.ZodArray<z.ZodObject<{
            fromSet: z.ZodNumber;
            toSet: z.ZodNumber;
            adjustment: z.ZodNumber;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    sets: z.ZodOptional<z.ZodArray<z.ZodObject<{
        reps: z.ZodOptional<z.ZodNumber>;
        repsMax: z.ZodOptional<z.ZodNumber>;
        duration: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodNullable<z.ZodNumber>;
        weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        weightLbs: z.ZodNullable<z.ZodNumber>;
        intensityPercent: z.ZodNullable<z.ZodNumber>;
        intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        rpe: z.ZodNullable<z.ZodNumber>;
        rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        rest: z.ZodNumber;
        done: z.ZodOptional<z.ZodBoolean>;
        repsDone: z.ZodOptional<z.ZodNumber>;
        durationDone: z.ZodOptional<z.ZodNumber>;
        weightDone: z.ZodOptional<z.ZodNumber>;
        weightDoneLbs: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type AISetGroup = z.infer<typeof aiSetGroupSchema>;
/**
 * AI Exercise Schema - uses aiSetGroupSchema
 */
export declare const aiExerciseSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    exerciseId: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodString;
    type: z.ZodEnum<{
        core: "core";
        isolation: "isolation";
        compound: "compound";
        accessory: "accessory";
    }>;
    category: z.ZodEnum<{
        strength: "strength";
        cardio: "cardio";
        flexibility: "flexibility";
        balance: "balance";
        endurance: "endurance";
        core: "core";
    }>;
    muscleGroup: z.ZodOptional<z.ZodString>;
    muscleGroups: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        core: "core";
        chest: "chest";
        back: "back";
        shoulders: "shoulders";
        arms: "arms";
        legs: "legs";
        "full-body": "full-body";
    }>>>;
    setGroups: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        count: z.ZodNumber;
        baseSet: z.ZodObject<{
            reps: z.ZodOptional<z.ZodNumber>;
            repsMax: z.ZodOptional<z.ZodNumber>;
            duration: z.ZodOptional<z.ZodNumber>;
            weight: z.ZodNullable<z.ZodNumber>;
            weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            weightLbs: z.ZodNullable<z.ZodNumber>;
            intensityPercent: z.ZodNullable<z.ZodNumber>;
            intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            rpe: z.ZodNullable<z.ZodNumber>;
            rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            rest: z.ZodNumber;
            done: z.ZodOptional<z.ZodBoolean>;
            repsDone: z.ZodOptional<z.ZodNumber>;
            durationDone: z.ZodOptional<z.ZodNumber>;
            weightDone: z.ZodOptional<z.ZodNumber>;
            weightDoneLbs: z.ZodOptional<z.ZodNumber>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
        progression: z.ZodOptional<z.ZodObject<{
            type: z.ZodEnum<{
                linear: "linear";
                percentage: "percentage";
                rpe: "rpe";
            }>;
            steps: z.ZodArray<z.ZodObject<{
                fromSet: z.ZodNumber;
                toSet: z.ZodNumber;
                adjustment: z.ZodNumber;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        sets: z.ZodOptional<z.ZodArray<z.ZodObject<{
            reps: z.ZodOptional<z.ZodNumber>;
            repsMax: z.ZodOptional<z.ZodNumber>;
            duration: z.ZodOptional<z.ZodNumber>;
            weight: z.ZodNullable<z.ZodNumber>;
            weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            weightLbs: z.ZodNullable<z.ZodNumber>;
            intensityPercent: z.ZodNullable<z.ZodNumber>;
            intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            rpe: z.ZodNullable<z.ZodNumber>;
            rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
            rest: z.ZodNumber;
            done: z.ZodOptional<z.ZodBoolean>;
            repsDone: z.ZodOptional<z.ZodNumber>;
            durationDone: z.ZodOptional<z.ZodNumber>;
            weightDone: z.ZodOptional<z.ZodNumber>;
            weightDoneLbs: z.ZodOptional<z.ZodNumber>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    reps: z.ZodOptional<z.ZodString>;
    rest: z.ZodOptional<z.ZodString>;
    intensity: z.ZodOptional<z.ZodString>;
    typeLabel: z.ZodOptional<z.ZodString>;
    repRange: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    formCues: z.ZodOptional<z.ZodArray<z.ZodString>>;
    variation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
    videoUrl: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type AIExercise = z.infer<typeof aiExerciseSchema>;
/**
 * AI Workout Day Schema
 */
export declare const aiWorkoutDaySchema: z.ZodObject<{
    dayNumber: z.ZodNumber;
    dayName: z.ZodString;
    name: z.ZodString;
    targetMuscles: z.ZodArray<z.ZodString>;
    exercises: z.ZodArray<z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        exerciseId: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        description: z.ZodString;
        type: z.ZodEnum<{
            core: "core";
            isolation: "isolation";
            compound: "compound";
            accessory: "accessory";
        }>;
        category: z.ZodEnum<{
            strength: "strength";
            cardio: "cardio";
            flexibility: "flexibility";
            balance: "balance";
            endurance: "endurance";
            core: "core";
        }>;
        muscleGroup: z.ZodOptional<z.ZodString>;
        muscleGroups: z.ZodOptional<z.ZodArray<z.ZodEnum<{
            core: "core";
            chest: "chest";
            back: "back";
            shoulders: "shoulders";
            arms: "arms";
            legs: "legs";
            "full-body": "full-body";
        }>>>;
        setGroups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            count: z.ZodNumber;
            baseSet: z.ZodObject<{
                reps: z.ZodOptional<z.ZodNumber>;
                repsMax: z.ZodOptional<z.ZodNumber>;
                duration: z.ZodOptional<z.ZodNumber>;
                weight: z.ZodNullable<z.ZodNumber>;
                weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                weightLbs: z.ZodNullable<z.ZodNumber>;
                intensityPercent: z.ZodNullable<z.ZodNumber>;
                intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                rpe: z.ZodNullable<z.ZodNumber>;
                rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                rest: z.ZodNumber;
                done: z.ZodOptional<z.ZodBoolean>;
                repsDone: z.ZodOptional<z.ZodNumber>;
                durationDone: z.ZodOptional<z.ZodNumber>;
                weightDone: z.ZodOptional<z.ZodNumber>;
                weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                notes: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
            progression: z.ZodOptional<z.ZodObject<{
                type: z.ZodEnum<{
                    linear: "linear";
                    percentage: "percentage";
                    rpe: "rpe";
                }>;
                steps: z.ZodArray<z.ZodObject<{
                    fromSet: z.ZodNumber;
                    toSet: z.ZodNumber;
                    adjustment: z.ZodNumber;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
            sets: z.ZodOptional<z.ZodArray<z.ZodObject<{
                reps: z.ZodOptional<z.ZodNumber>;
                repsMax: z.ZodOptional<z.ZodNumber>;
                duration: z.ZodOptional<z.ZodNumber>;
                weight: z.ZodNullable<z.ZodNumber>;
                weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                weightLbs: z.ZodNullable<z.ZodNumber>;
                intensityPercent: z.ZodNullable<z.ZodNumber>;
                intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                rpe: z.ZodNullable<z.ZodNumber>;
                rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                rest: z.ZodNumber;
                done: z.ZodOptional<z.ZodBoolean>;
                repsDone: z.ZodOptional<z.ZodNumber>;
                durationDone: z.ZodOptional<z.ZodNumber>;
                weightDone: z.ZodOptional<z.ZodNumber>;
                weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                notes: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
        reps: z.ZodOptional<z.ZodString>;
        rest: z.ZodOptional<z.ZodString>;
        intensity: z.ZodOptional<z.ZodString>;
        typeLabel: z.ZodOptional<z.ZodString>;
        repRange: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        formCues: z.ZodOptional<z.ZodArray<z.ZodString>>;
        variation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
        equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
        videoUrl: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    totalDuration: z.ZodOptional<z.ZodNumber>;
    notes: z.ZodString;
    warmup: z.ZodOptional<z.ZodString>;
    cooldown: z.ZodString;
}, z.core.$strip>;
export type AIWorkoutDay = z.infer<typeof aiWorkoutDaySchema>;
/**
 * AI Workout Week Schema
 */
export declare const aiWorkoutWeekSchema: z.ZodObject<{
    weekNumber: z.ZodNumber;
    focus: z.ZodOptional<z.ZodString>;
    days: z.ZodArray<z.ZodObject<{
        dayNumber: z.ZodNumber;
        dayName: z.ZodString;
        name: z.ZodString;
        targetMuscles: z.ZodArray<z.ZodString>;
        exercises: z.ZodArray<z.ZodObject<{
            id: z.ZodOptional<z.ZodString>;
            exerciseId: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            description: z.ZodString;
            type: z.ZodEnum<{
                core: "core";
                isolation: "isolation";
                compound: "compound";
                accessory: "accessory";
            }>;
            category: z.ZodEnum<{
                strength: "strength";
                cardio: "cardio";
                flexibility: "flexibility";
                balance: "balance";
                endurance: "endurance";
                core: "core";
            }>;
            muscleGroup: z.ZodOptional<z.ZodString>;
            muscleGroups: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                core: "core";
                chest: "chest";
                back: "back";
                shoulders: "shoulders";
                arms: "arms";
                legs: "legs";
                "full-body": "full-body";
            }>>>;
            setGroups: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                count: z.ZodNumber;
                baseSet: z.ZodObject<{
                    reps: z.ZodOptional<z.ZodNumber>;
                    repsMax: z.ZodOptional<z.ZodNumber>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    weight: z.ZodNullable<z.ZodNumber>;
                    weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    weightLbs: z.ZodNullable<z.ZodNumber>;
                    intensityPercent: z.ZodNullable<z.ZodNumber>;
                    intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    rpe: z.ZodNullable<z.ZodNumber>;
                    rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    rest: z.ZodNumber;
                    done: z.ZodOptional<z.ZodBoolean>;
                    repsDone: z.ZodOptional<z.ZodNumber>;
                    durationDone: z.ZodOptional<z.ZodNumber>;
                    weightDone: z.ZodOptional<z.ZodNumber>;
                    weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                    notes: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>;
                progression: z.ZodOptional<z.ZodObject<{
                    type: z.ZodEnum<{
                        linear: "linear";
                        percentage: "percentage";
                        rpe: "rpe";
                    }>;
                    steps: z.ZodArray<z.ZodObject<{
                        fromSet: z.ZodNumber;
                        toSet: z.ZodNumber;
                        adjustment: z.ZodNumber;
                    }, z.core.$strip>>;
                }, z.core.$strip>>;
                sets: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    reps: z.ZodOptional<z.ZodNumber>;
                    repsMax: z.ZodOptional<z.ZodNumber>;
                    duration: z.ZodOptional<z.ZodNumber>;
                    weight: z.ZodNullable<z.ZodNumber>;
                    weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    weightLbs: z.ZodNullable<z.ZodNumber>;
                    intensityPercent: z.ZodNullable<z.ZodNumber>;
                    intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    rpe: z.ZodNullable<z.ZodNumber>;
                    rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                    rest: z.ZodNumber;
                    done: z.ZodOptional<z.ZodBoolean>;
                    repsDone: z.ZodOptional<z.ZodNumber>;
                    durationDone: z.ZodOptional<z.ZodNumber>;
                    weightDone: z.ZodOptional<z.ZodNumber>;
                    weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                    notes: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>>;
            }, z.core.$strip>>;
            reps: z.ZodOptional<z.ZodString>;
            rest: z.ZodOptional<z.ZodString>;
            intensity: z.ZodOptional<z.ZodString>;
            typeLabel: z.ZodOptional<z.ZodString>;
            repRange: z.ZodOptional<z.ZodString>;
            notes: z.ZodOptional<z.ZodString>;
            formCues: z.ZodOptional<z.ZodArray<z.ZodString>>;
            variation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
            equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
            videoUrl: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        totalDuration: z.ZodOptional<z.ZodNumber>;
        notes: z.ZodString;
        warmup: z.ZodOptional<z.ZodString>;
        cooldown: z.ZodString;
    }, z.core.$strip>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type AIWorkoutWeek = z.infer<typeof aiWorkoutWeekSchema>;
/**
 * AI Workout Program Schema - for AI generation only
 * Uses simplified schemas where sets[] is optional
 */
export declare const aiWorkoutProgramSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    difficulty: z.ZodEnum<{
        BEGINNER: "BEGINNER";
        INTERMEDIATE: "INTERMEDIATE";
        ADVANCED: "ADVANCED";
        ELITE: "ELITE";
    }>;
    durationWeeks: z.ZodNumber;
    weeks: z.ZodArray<z.ZodObject<{
        weekNumber: z.ZodNumber;
        focus: z.ZodOptional<z.ZodString>;
        days: z.ZodArray<z.ZodObject<{
            dayNumber: z.ZodNumber;
            dayName: z.ZodString;
            name: z.ZodString;
            targetMuscles: z.ZodArray<z.ZodString>;
            exercises: z.ZodArray<z.ZodObject<{
                id: z.ZodOptional<z.ZodString>;
                exerciseId: z.ZodOptional<z.ZodString>;
                name: z.ZodString;
                description: z.ZodString;
                type: z.ZodEnum<{
                    core: "core";
                    isolation: "isolation";
                    compound: "compound";
                    accessory: "accessory";
                }>;
                category: z.ZodEnum<{
                    strength: "strength";
                    cardio: "cardio";
                    flexibility: "flexibility";
                    balance: "balance";
                    endurance: "endurance";
                    core: "core";
                }>;
                muscleGroup: z.ZodOptional<z.ZodString>;
                muscleGroups: z.ZodOptional<z.ZodArray<z.ZodEnum<{
                    core: "core";
                    chest: "chest";
                    back: "back";
                    shoulders: "shoulders";
                    arms: "arms";
                    legs: "legs";
                    "full-body": "full-body";
                }>>>;
                setGroups: z.ZodArray<z.ZodObject<{
                    id: z.ZodString;
                    count: z.ZodNumber;
                    baseSet: z.ZodObject<{
                        reps: z.ZodOptional<z.ZodNumber>;
                        repsMax: z.ZodOptional<z.ZodNumber>;
                        duration: z.ZodOptional<z.ZodNumber>;
                        weight: z.ZodNullable<z.ZodNumber>;
                        weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        weightLbs: z.ZodNullable<z.ZodNumber>;
                        intensityPercent: z.ZodNullable<z.ZodNumber>;
                        intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        rpe: z.ZodNullable<z.ZodNumber>;
                        rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        rest: z.ZodNumber;
                        done: z.ZodOptional<z.ZodBoolean>;
                        repsDone: z.ZodOptional<z.ZodNumber>;
                        durationDone: z.ZodOptional<z.ZodNumber>;
                        weightDone: z.ZodOptional<z.ZodNumber>;
                        weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                        notes: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                    progression: z.ZodOptional<z.ZodObject<{
                        type: z.ZodEnum<{
                            linear: "linear";
                            percentage: "percentage";
                            rpe: "rpe";
                        }>;
                        steps: z.ZodArray<z.ZodObject<{
                            fromSet: z.ZodNumber;
                            toSet: z.ZodNumber;
                            adjustment: z.ZodNumber;
                        }, z.core.$strip>>;
                    }, z.core.$strip>>;
                    sets: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        reps: z.ZodOptional<z.ZodNumber>;
                        repsMax: z.ZodOptional<z.ZodNumber>;
                        duration: z.ZodOptional<z.ZodNumber>;
                        weight: z.ZodNullable<z.ZodNumber>;
                        weightMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        weightLbs: z.ZodNullable<z.ZodNumber>;
                        intensityPercent: z.ZodNullable<z.ZodNumber>;
                        intensityPercentMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        rpe: z.ZodNullable<z.ZodNumber>;
                        rpeMax: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
                        rest: z.ZodNumber;
                        done: z.ZodOptional<z.ZodBoolean>;
                        repsDone: z.ZodOptional<z.ZodNumber>;
                        durationDone: z.ZodOptional<z.ZodNumber>;
                        weightDone: z.ZodOptional<z.ZodNumber>;
                        weightDoneLbs: z.ZodOptional<z.ZodNumber>;
                        notes: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>>>;
                }, z.core.$strip>>;
                reps: z.ZodOptional<z.ZodString>;
                rest: z.ZodOptional<z.ZodString>;
                intensity: z.ZodOptional<z.ZodString>;
                typeLabel: z.ZodOptional<z.ZodString>;
                repRange: z.ZodOptional<z.ZodString>;
                notes: z.ZodOptional<z.ZodString>;
                formCues: z.ZodOptional<z.ZodArray<z.ZodString>>;
                variation: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
                equipment: z.ZodOptional<z.ZodArray<z.ZodString>>;
                videoUrl: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
            totalDuration: z.ZodOptional<z.ZodNumber>;
            notes: z.ZodString;
            warmup: z.ZodOptional<z.ZodString>;
            cooldown: z.ZodString;
        }, z.core.$strip>>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    goals: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type AIWorkoutProgram = z.infer<typeof aiWorkoutProgramSchema>;
/**
 * Progression Diff Schema - for Progression Agent output
 *
 * Represents ONLY the changes to apply to subsequent weeks.
 * This saves tokens by generating only diffs instead of full weeks.
 *
 * Structure:
 * - week2/3/4: Contains only the fields that change
 * - changes[]: Array of specific modifications to exercises
 * - Each change targets a specific exercise by dayNumber + exerciseIndex + setGroupIndex
 */
export declare const progressionChangeSchema: z.ZodObject<{
    dayNumber: z.ZodNumber;
    exerciseIndex: z.ZodNumber;
    setGroupIndex: z.ZodNumber;
    reps: z.ZodNumber;
    weight: z.ZodOptional<z.ZodNumber>;
    weightLbs: z.ZodOptional<z.ZodNumber>;
    intensityPercent: z.ZodOptional<z.ZodNumber>;
    rpe: z.ZodOptional<z.ZodNumber>;
    rest: z.ZodOptional<z.ZodNumber>;
    count: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export type ProgressionChange = z.infer<typeof progressionChangeSchema>;
export declare const progressionWeekDiffSchema: z.ZodObject<{
    focus: z.ZodOptional<z.ZodString>;
    notes: z.ZodOptional<z.ZodString>;
    changes: z.ZodArray<z.ZodObject<{
        dayNumber: z.ZodNumber;
        exerciseIndex: z.ZodNumber;
        setGroupIndex: z.ZodNumber;
        reps: z.ZodNumber;
        weight: z.ZodOptional<z.ZodNumber>;
        weightLbs: z.ZodOptional<z.ZodNumber>;
        intensityPercent: z.ZodOptional<z.ZodNumber>;
        rpe: z.ZodOptional<z.ZodNumber>;
        rest: z.ZodOptional<z.ZodNumber>;
        count: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ProgressionWeekDiff = z.infer<typeof progressionWeekDiffSchema>;
export declare const progressionDiffSchema: z.ZodObject<{
    week2: z.ZodObject<{
        focus: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        changes: z.ZodArray<z.ZodObject<{
            dayNumber: z.ZodNumber;
            exerciseIndex: z.ZodNumber;
            setGroupIndex: z.ZodNumber;
            reps: z.ZodNumber;
            weight: z.ZodOptional<z.ZodNumber>;
            weightLbs: z.ZodOptional<z.ZodNumber>;
            intensityPercent: z.ZodOptional<z.ZodNumber>;
            rpe: z.ZodOptional<z.ZodNumber>;
            rest: z.ZodOptional<z.ZodNumber>;
            count: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    week3: z.ZodOptional<z.ZodObject<{
        focus: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        changes: z.ZodArray<z.ZodObject<{
            dayNumber: z.ZodNumber;
            exerciseIndex: z.ZodNumber;
            setGroupIndex: z.ZodNumber;
            reps: z.ZodNumber;
            weight: z.ZodOptional<z.ZodNumber>;
            weightLbs: z.ZodOptional<z.ZodNumber>;
            intensityPercent: z.ZodOptional<z.ZodNumber>;
            rpe: z.ZodOptional<z.ZodNumber>;
            rest: z.ZodOptional<z.ZodNumber>;
            count: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    week4: z.ZodOptional<z.ZodObject<{
        focus: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        changes: z.ZodArray<z.ZodObject<{
            dayNumber: z.ZodNumber;
            exerciseIndex: z.ZodNumber;
            setGroupIndex: z.ZodNumber;
            reps: z.ZodNumber;
            weight: z.ZodOptional<z.ZodNumber>;
            weightLbs: z.ZodOptional<z.ZodNumber>;
            intensityPercent: z.ZodOptional<z.ZodNumber>;
            rpe: z.ZodOptional<z.ZodNumber>;
            rest: z.ZodOptional<z.ZodNumber>;
            count: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ProgressionDiff = z.infer<typeof progressionDiffSchema>;
/**
 * Exercise Selection Output Schema - SSOT for Exercise Selection Agent
 *
 * Output schema for the exercise selection step in workout generation.
 * This is the single source of truth for exercise selection results.
 */
export declare const exerciseSelectionOutputSchema: z.ZodObject<{
    selectedExercises: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        exerciseId: z.ZodOptional<z.ZodString>;
        category: z.ZodEnum<{
            cardio: "cardio";
            core: "core";
            isolation: "isolation";
            compound: "compound";
            mobility: "mobility";
        }>;
        targetMuscles: z.ZodArray<z.ZodString>;
        equipment: z.ZodArray<z.ZodString>;
        difficulty: z.ZodEnum<{
            beginner: "beginner";
            intermediate: "intermediate";
            advanced: "advanced";
            elite: "elite";
        }>;
        sets: z.ZodNumber;
        reps: z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>;
        restSeconds: z.ZodNumber;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    weeklyStructure: z.ZodObject<{
        splitType: z.ZodEnum<{
            custom: "custom";
            full_body: "full_body";
            upper_lower: "upper_lower";
            push_pull_legs: "push_pull_legs";
            bro_split: "bro_split";
        }>;
        workouts: z.ZodArray<z.ZodObject<{
            day: z.ZodString;
            focus: z.ZodString;
            exerciseNames: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type ExerciseSelectionOutput = z.infer<typeof exerciseSelectionOutputSchema>;
/**
 * Workout Planning Output Schema - SSOT for Workout Planning Agent
 *
 * Output schema for the workout planning step in workout generation.
 * This is the single source of truth for workout planning results.
 */
export declare const workoutPlanningOutputSchema: z.ZodObject<{
    programStructure: z.ZodObject<{
        name: z.ZodString;
        splitType: z.ZodEnum<{
            custom: "custom";
            full_body: "full_body";
            upper_lower: "upper_lower";
            push_pull_legs: "push_pull_legs";
            bro_split: "bro_split";
        }>;
        durationWeeks: z.ZodNumber;
        mesocycles: z.ZodArray<z.ZodObject<{
            week: z.ZodNumber;
            phase: z.ZodEnum<{
                accumulation: "accumulation";
                intensification: "intensification";
                realization: "realization";
                deload: "deload";
            }>;
            description: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    weeklySchedule: z.ZodArray<z.ZodAny>;
    progressionStrategy: z.ZodObject<{
        method: z.ZodEnum<{
            linear: "linear";
            double_progression: "double_progression";
            wave_loading: "wave_loading";
            block_periodization: "block_periodization";
        }>;
        description: z.ZodString;
        incrementPerWeek: z.ZodString;
        deloadFrequency: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type WorkoutPlanningOutput = z.infer<typeof workoutPlanningOutputSchema>;
//# sourceMappingURL=base.schemas.d.ts.map