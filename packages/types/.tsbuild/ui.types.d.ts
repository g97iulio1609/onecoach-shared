/**
 * UI Types Package
 *
 * Tipi specifici per componenti UI e hooks
 * Riduce la dipendenza da any/unknown nell'interfaccia utente
 */
import { type ExecutionContext } from './common.types';
import { type WeightUnit } from './client-safe.types';
/**
 * Profilo utente fortemente tipizzato
 */
export interface UserProfileData {
    age: number | null;
    sex: 'male' | 'female' | 'other' | null;
    heightCm: number | null;
    weightKg: number | null;
    weightUnit: WeightUnit;
    activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | null;
    trainingFrequency: number | null;
    dailyCalories: number | null;
    nutritionGoals: string[];
    workoutGoals: string[];
    equipment: string[];
    dietaryRestrictions: string[];
    dietaryPreferences: string[];
    healthNotes: string | null;
    bodyFat: number | null;
    muscleMass: number | null;
    visceralFat: number | null;
    waterPercentage: number | null;
    boneMass: number | null;
    metabolicAge: number | null;
    bmr: number | null;
    chest: number | null;
    waist: number | null;
    hips: number | null;
    thigh: number | null;
    arm: number | null;
    calf: number | null;
    neck: number | null;
    shoulders: number | null;
}
/**
 * Profilo vuoto per default
 */
export declare const EMPTY_PROFILE: UserProfileData;
/**
 * Tipi di peso
 */
/**
 * Definizione di tool per agent streaming
 * Sostituisce any con tipo strutturato
 */
export interface ToolDefinition {
    name: string;
    description?: string;
    parameters?: {
        type: string;
        properties?: Record<string, unknown>;
        required?: string[];
    };
    handler?: (...args: unknown[]) => unknown | Promise<unknown>;
    [key: string]: unknown;
}
/**
 * Request per agent streaming fortemente tipizzato
 */
export interface AgentStreamRequest {
    agentType: 'nutrition' | 'workout' | 'exercise' | 'chat';
    userId: string;
    prompt: string;
    systemPrompt?: string;
    tools?: Record<string, ToolDefinition>;
    tier?: 'fast' | 'balanced' | 'quality';
    provider?: string;
    model?: string;
    maxSteps?: number;
    temperatureOverride?: number;
    reasoning?: boolean;
    reasoningEffort?: 'low' | 'medium' | 'high';
    description?: string;
    context?: ExecutionContext;
}
/**
 * Stato dello streaming fortemente tipizzato
 */
export interface StreamState {
    isStreaming: boolean;
    error: string | null;
    data: string;
    isComplete: boolean;
}
/**
 * Messaggio chat fortemente tipizzato
 * Defined directly in types to avoid circular dependency with schemas
 */
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    id: string;
    timestamp: string;
    metadata?: Record<string, unknown>;
}
/**
 * Opzioni chat fortemente tipizzate
 */
export interface ChatOptions {
    temperature?: number;
    provider?: string;
    model?: string;
    enableIntentDetection?: boolean;
    enableTools?: boolean;
    reasoning?: boolean;
    reasoningEffort?: 'low' | 'medium' | 'high';
}
/**
 * Body per richiesta chat API
 */
export interface ChatRequestPayload {
    messages: Array<{
        role: 'user' | 'assistant' | 'system';
        content: string;
    }>;
    tier?: 'fast' | 'balanced' | 'quality';
    temperature?: number;
    provider?: string;
    model?: string;
    enableIntentDetection?: boolean;
    enableTools?: boolean;
    reasoning?: boolean;
    reasoningEffort?: 'low' | 'medium' | 'high';
}
/**
 * Risposta API per profilo utente
 */
export interface UserProfileResponse {
    profile?: Partial<UserProfileData>;
    error?: string;
}
/**
 * Type guard per verificare UserProfileResponse
 */
export declare function isUserProfileResponse(value: unknown): value is UserProfileResponse;
/**
 * Type guard per verificare AgentStreamRequest
 */
export declare function isAgentStreamRequest(value: unknown): value is AgentStreamRequest;
/**
 * Type guard per verificare ChatMessage
 */
export declare function isChatMessage(value: unknown): value is ChatMessage;
/**
 * Crea un AgentStreamRequest tipizzato
 */
export declare function createAgentStreamRequest(agentType: AgentStreamRequest['agentType'], userId: string, prompt: string, overrides?: Partial<Omit<AgentStreamRequest, 'agentType' | 'userId' | 'prompt'>>): AgentStreamRequest;
/**
 * Crea un ChatRequestPayload tipizzato
 */
export declare function createChatApiRequest(messages: ChatMessage[], options?: ChatOptions): ChatRequestPayload;
