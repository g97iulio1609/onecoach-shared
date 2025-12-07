/**
 * Universal Copilot Types
 * Type definitions for context-aware copilot system
 */
/**
 * Screen/Route types that copilot can detect
 */
export type CopilotScreen = 'dashboard' | 'nutrition_plan' | 'nutrition_day' | 'workout_program' | 'workout_week' | 'workout_day' | 'exercises' | 'analytics' | 'profile' | 'settings' | 'food_camera' | 'chat' | 'unknown';
/**
 * Domain context for copilot
 */
export type CopilotDomain = 'nutrition' | 'workout' | 'exercise' | 'analytics' | 'chat' | 'general';
/**
 * Screen context metadata
 */
export interface ScreenContext {
    screen: CopilotScreen;
    domain: CopilotDomain;
    route: string;
    params?: Record<string, string | number>;
    metadata?: Record<string, unknown>;
}
/**
 * Copilot capabilities for current screen
 */
export interface CopilotCapabilities {
    canGenerate: boolean;
    canModify: boolean;
    canAnalyze: boolean;
    canChat: boolean;
    canUseCamera: boolean;
    canAccessHealth: boolean;
    suggestedPrompts: string[];
}
/**
 * Universal copilot context
 */
export interface UniversalCopilotContext {
    screenContext: ScreenContext;
    capabilities: CopilotCapabilities;
    userContext: {
        userId: string;
        profile?: Record<string, unknown>;
    };
    dataContext?: {
        currentPlan?: unknown;
        currentProgram?: unknown;
        recentActivity?: unknown[];
    };
    timestamp: string;
}
/**
 * Copilot message with enhanced metadata
 */
export interface CopilotMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: string;
    metadata?: {
        screen?: CopilotScreen;
        domain?: CopilotDomain;
        actionType?: 'generate' | 'modify' | 'analyze' | 'chat';
        relatedDataId?: string;
    };
}
/**
 * Copilot session state
 */
export interface CopilotSession {
    id: string;
    userId: string;
    messages: CopilotMessage[];
    context: UniversalCopilotContext;
    startedAt: string;
    lastActivityAt: string;
    isActive: boolean;
}
/**
 * Screen context builder function
 */
export type ScreenContextBuilder = (userId: string, params?: Record<string, string | number>) => Promise<{
    context: Record<string, unknown>;
    capabilities: CopilotCapabilities;
}>;
/**
 * Context registry entry
 */
export interface ContextRegistryEntry {
    screen: CopilotScreen;
    domain: CopilotDomain;
    pattern: RegExp;
    builder: ScreenContextBuilder;
    capabilities: Partial<CopilotCapabilities>;
}
