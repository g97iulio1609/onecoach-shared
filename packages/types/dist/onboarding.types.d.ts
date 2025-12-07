/**
 * Onboarding Types
 *
 * Type definitions for onboarding progress and step completion
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
