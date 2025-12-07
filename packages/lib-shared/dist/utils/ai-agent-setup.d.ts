/**
 * Crea configurazione comune per agent AI
 *
 * @param options Opzioni di configurazione
 * @returns Configurazione completa per agent AI
 * @throws Error se API key non configurata
 */
export function createAIAgentConfig(options?: {}): Promise<{
    provider: import("@OneCoach/one-agent").AIProvider;
    costCalculator: import("@OneCoach/one-agent").CostCalculator;
    model: any;
    temperature: any;
    maxTokens: any;
}>;
/**
 * Factory per creare istanza di agent con configurazione comune
 *
 * @param AgentClass Classe dell'agent da istanziare
 * @param config Configurazione AI agent
 * @returns Istanza dell'agent configurata
 */
export function createAgentInstance(AgentClass: any, config: any): any;
