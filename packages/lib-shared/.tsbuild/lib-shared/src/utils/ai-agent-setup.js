/**
 * AI Agent Setup Utility
 *
 * Utility condivisa per setup comune di agent AI:
 * - Provider e cost calculator
 * - Model configuration
 * - API key validation
 *
 * Principi: KISS, SOLID (Single Responsibility), DRY
 */
import { getModelByTier } from '@onecoach/lib-ai-agents/core/providers';
import { createAIProvider, createCostCalculator } from '@OneCoach/one-agent';
import { TOKEN_LIMITS } from '@OneCoach/constants/models';
/**
 * Crea configurazione comune per agent AI
 *
 * @param options Opzioni di configurazione
 * @returns Configurazione completa per agent AI
 * @throws Error se API key non configurata
 */
export async function createAIAgentConfig(options = {}) {
    const { modelTier = 'balanced', temperature = 0.7, maxTokens = TOKEN_LIMITS.DEFAULT_MAX_TOKENS, } = options;
    // Get model configuration
    const modelConfig = getModelByTier(modelTier);
    // Import dinamico per evitare che venga incluso nel bundle client
    const { AIProviderConfigService } = await import('@onecoach/lib-ai/ai-provider-config.service');
    const apiKey = await AIProviderConfigService.getApiKey(modelConfig.provider);
    if (!apiKey) {
        throw new Error(`API key non configurata per il provider ${modelConfig.provider}`);
    }
    // Create AI provider and cost calculator
    // Passiamo esplicitamente la chiave recuperata (che può venire da Edge Config)
    const provider = createAIProvider([
        {
            type: modelConfig.provider,
            apiKey,
        },
    ]);
    const costCalculator = createCostCalculator();
    // Normalize model name (add openrouter/ prefix if needed)
    const model = modelConfig.model.includes('/')
        ? modelConfig.model
        : `openrouter/${modelConfig.model}`;
    return {
        provider,
        costCalculator,
        model,
        temperature,
        maxTokens,
    };
}
/**
 * Factory per creare istanza di agent con configurazione comune
 *
 * @param AgentClass Classe dell'agent da istanziare
 * @param config Configurazione AI agent
 * @returns Istanza dell'agent configurata
 */
export function createAgentInstance(AgentClass, config) {
    return new AgentClass(config.provider, config.costCalculator, config.model, config.temperature, config.maxTokens);
}
