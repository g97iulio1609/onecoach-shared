/**
 * UI Types Package
 *
 * Tipi specifici per componenti UI e hooks
 * Riduce la dipendenza da any/unknown nell'interfaccia utente
 */
import {} from './common.types';
import {} from './client-safe.types';
/**
 * Profilo vuoto per default
 */
export const EMPTY_PROFILE = {
    age: null,
    sex: null,
    heightCm: null,
    weightKg: null,
    weightUnit: 'KG',
    activityLevel: null,
    trainingFrequency: null,
    dailyCalories: null,
    nutritionGoals: [],
    workoutGoals: [],
    equipment: [],
    dietaryRestrictions: [],
    dietaryPreferences: [],
    healthNotes: null,
    // Body composition
    bodyFat: null,
    muscleMass: null,
    visceralFat: null,
    waterPercentage: null,
    boneMass: null,
    metabolicAge: null,
    bmr: null,
    // Circumferences
    chest: null,
    waist: null,
    hips: null,
    thigh: null,
    arm: null,
    calf: null,
    neck: null,
    shoulders: null,
};
/**
 * Type guard per verificare UserProfileResponse
 */
export function isUserProfileResponse(value) {
    return typeof value === 'object' && value !== null;
}
/**
 * Type guard per verificare AgentStreamRequest
 */
export function isAgentStreamRequest(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const req = value;
    return (typeof req.agentType === 'string' &&
        typeof req.userId === 'string' &&
        typeof req.prompt === 'string');
}
/**
 * Type guard per verificare ChatMessage
 */
export function isChatMessage(value) {
    if (typeof value !== 'object' || value === null)
        return false;
    const msg = value;
    return (typeof msg.id === 'string' &&
        typeof msg.role === 'string' &&
        typeof msg.content === 'string' &&
        typeof msg.timestamp === 'string');
}
/**
 * Crea un AgentStreamRequest tipizzato
 */
export function createAgentStreamRequest(agentType, userId, prompt, overrides = {}) {
    return {
        agentType,
        userId,
        prompt,
        ...overrides,
    };
}
/**
 * Crea un ChatRequestPayload tipizzato
 */
export function createChatApiRequest(messages, options = {}) {
    return {
        messages: messages.map(({ role, content }) => ({ role, content })),
        ...options,
    };
}
