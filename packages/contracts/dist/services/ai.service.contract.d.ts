/**
 * AI Services Contracts
 *
 * Interfacce per servizi AI (config, chat, intent-detection, etc.)
 * UNICA FONTE DI VERITÀ per i contratti dei servizi AI
 */
import type { OperationType, ai_operation_configs } from '@prisma/client';
import type { Message, Conversation, ParsedAiResponse, RequestType } from '@OneCoach/types';
/**
 * AI Config Service Contract
 */
export interface AIOperationParams {
    operationType: OperationType;
    model: string;
}
export interface UpdateConfigParams {
    operationType: OperationType;
    model: string;
    creditCost?: number;
    maxTokens?: number;
    thinkingBudget?: number;
    recalculateCreditsCost?: number;
    changedBy: string;
    changeReason?: string;
}
export interface IAIConfigService {
    getConfig(params: AIOperationParams): Promise<ai_operation_configs | null>;
    getActiveConfigByOperationType(operationType: OperationType): Promise<ai_operation_configs | null>;
    getAllConfigs(): Promise<ai_operation_configs[]>;
    getConfigsByOperationType(): Promise<Record<string, ai_operation_configs[]>>;
    getCreditCost(params: AIOperationParams): Promise<number>;
    updateConfig(params: UpdateConfigParams): Promise<ai_operation_configs>;
    detectOperationType(messageContent: string, isEdit: boolean): OperationType;
}
/**
 * Chat Service Contract
 */
export interface IChatService {
    createConversation(title?: string): Conversation;
    getConversation(id: string): Conversation | null;
    getAllConversations(): Conversation[];
    addMessage(conversationId: string, message: Omit<Message, 'id' | 'timestamp'>): Message | null;
    deleteConversation(id: string): boolean;
    parseAiResponse<T>(response: string, type: RequestType): ParsedAiResponse<T>;
}
