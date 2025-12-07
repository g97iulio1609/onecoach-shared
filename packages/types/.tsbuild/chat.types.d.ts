/**
 * Chat Types
 *
 * Type definitions per chat AI e messaggi
 */
/**
 * Ruolo del messaggio
 */
export type MessageRole = 'user' | 'assistant' | 'system';
/**
 * AI Model
 */
export type AiModel = string;
/**
 * Tipo di richiesta
 */
export type RequestType = 'workout' | 'nutrition' | 'general' | 'question' | 'modification';
/**
 * Messaggio chat
 */
export interface Message {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: string;
    model?: AiModel;
    tokenCount?: number;
}
/**
 * Conversation
 */
export interface Conversation {
    id: string;
    messages: Message[];
    createdAt: string;
    updatedAt: string;
    title?: string;
}
/**
 * Chat context per AI
 */
export interface ChatContext {
    conversationId: string;
    requestType: RequestType;
    userContext?: {
        workoutPrograms?: string[];
        nutritionPlans?: string[];
        preferences?: string[];
    };
}
/**
 * AI Request
 */
export interface AiRequest {
    messages: Message[];
    model: AiModel;
    context?: ChatContext;
    maxTokens?: number;
    temperature?: number;
}
/**
 * AI Response
 */
export interface AiResponse {
    message: string;
    thinking?: string;
    model: AiModel;
    usage: {
        inputTokens: number;
        outputTokens: number;
        totalTokens: number;
    };
    stopReason?: string;
    creditsUsed?: number;
}
/**
 * Parsed AI Response (per workout/nutrition extraction)
 */
export interface ParsedAiResponse<T = unknown> {
    type: RequestType;
    data: T;
    rawMessage: string;
    success: boolean;
    error?: string;
}
