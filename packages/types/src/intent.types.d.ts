/**
 * Intent Detection Types
 *
 * Type definitions per intent detection e workflow
 */
/**
 * Tipo di intent rilevato
 */
export type IntentType = 'create_nutrition' | 'create_workout' | 'modify_nutrition' | 'modify_workout' | 'generate_exercises' | 'search_exercises' | 'create_exercise_variants' | 'general_chat' | 'get_info';
/**
 * Parametri estratti dall'intent
 */
export interface IntentParameters {
    weight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female' | 'other';
    activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
    goal?: 'weight_loss' | 'muscle_gain' | 'maintenance' | 'performance';
    durationWeeks?: number;
    daysPerWeek?: number;
    restrictions?: string[];
    preferences?: string[];
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    equipment?: string[];
    goals?: string[];
    planId?: string;
    planType?: 'nutrition' | 'workout';
    modifications?: string[];
    exerciseQuery?: string;
    muscleGroups?: string[];
    exerciseSlug?: string;
    variationType?: 'equipment' | 'difficulty' | 'angle' | 'grip';
}
/**
 * Intent rilevato con metadata
 */
export interface DetectedIntent {
    type: IntentType;
    confidence: number;
    parameters: IntentParameters;
    missingParams: string[];
    context?: {
        planId?: string;
        planType?: 'nutrition' | 'workout';
        referencedPlans?: string[];
    };
    reasoning?: string;
}
/**
 * Risultato detection intent
 */
export interface IntentDetectionResult {
    intent: DetectedIntent;
    requiresMoreInfo: boolean;
    suggestedQuestions?: string[];
}
/**
 * Workflow step
 */
export type WorkflowStep = 'idle' | 'detecting_intent' | 'collecting_params' | 'generating' | 'preview' | 'modifying' | 'saving' | 'complete' | 'error';
/**
 * Workflow state
 */
export interface WorkflowState {
    currentStep: WorkflowStep;
    intent?: DetectedIntent;
    collectedParams: IntentParameters;
    missingParams: string[];
    generatedPlan?: {
        type: 'nutrition' | 'workout';
        data: unknown;
        planId?: string;
    };
    isComplete: boolean;
    error?: string;
}
/**
 * Chat message type
 */
export type ChatMessageType = 'text' | 'plan_preview' | 'form_request' | 'confirmation' | 'status' | 'workflow_progress';
/**
 * Extended message con metadata
 */
export interface ExtendedMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    type?: ChatMessageType;
    metadata?: {
        intent?: DetectedIntent;
        workflowStep?: WorkflowStep;
        planData?: unknown;
        planType?: 'nutrition' | 'workout';
        planId?: string;
        formFields?: Array<{
            name: string;
            label: string;
            type: 'text' | 'number' | 'select' | 'multiselect';
            required: boolean;
            options?: string[];
        }>;
        collectedParams?: string[];
        missingParams?: string[];
        progress?: number;
        statusType?: 'info' | 'success' | 'warning' | 'error';
    };
}
//# sourceMappingURL=intent.types.d.ts.map