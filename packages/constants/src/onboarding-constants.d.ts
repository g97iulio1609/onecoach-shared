/**
 * Onboarding constants extracted from service for client use
 * This file contains only data, no server operations
 */
/**
 * Onboarding step configuration
 * Definisce i 15 step del wizard
 */
export declare const ONBOARDING_STEPS: {
    readonly PROFILE_SETUP: 1;
    readonly GOALS_SETUP: 2;
    readonly DASHBOARD_TOUR: 3;
    readonly LIVE_COACH_INTRO: 4;
    readonly ANALYTICS_INTRO: 5;
    readonly CHAT_INTRO: 6;
    readonly CALENDAR_INTRO: 7;
    readonly CREATION_INTRO: 8;
    readonly PROFILE_COMPLETE: 9;
    readonly CREDITS_INTRO: 10;
    readonly MARKETPLACE_INTRO: 11;
    readonly AFFILIATES_INTRO: 12;
    readonly COACH_OPTION: 13;
    readonly SUBSCRIPTION_OFFER: 14;
    readonly COMPLETION: 15;
};
export declare const TOTAL_STEPS = 15;
export declare const WELCOME_STEPS: (1 | 2 | 14)[];
export declare const ROUTE_TO_TOUR_STEP: Record<string, number>;
export type OnboardingStep = (typeof ONBOARDING_STEPS)[keyof typeof ONBOARDING_STEPS];
/**
 * Onboarding Progress Type
 * Extracted from service for client use
 */
export interface OnboardingProgress {
    id: string;
    userId: string;
    isCompleted: boolean;
    currentStep: number;
    completedSteps: Record<number, boolean>;
    skippedSteps: Record<number, boolean>;
    metadata?: Record<string, unknown>;
    startedAt: Date;
    completedAt: Date | null;
    lastInteraction: Date;
}
export interface StepCompletionInput {
    stepNumber: number;
    skipped?: boolean;
    metadata?: Record<string, unknown>;
}
//# sourceMappingURL=onboarding-constants.d.ts.map