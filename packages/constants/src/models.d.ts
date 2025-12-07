/**
 * AI Models Configuration
 *
 * Configurazioni per i modelli AI di Claude
 */
/**
 * Type for AI model identifiers
 */
export type AiModel = string;
/**
 * Modelli AI disponibili
 */
export declare const AI_MODELS: {
  readonly SONNET_4_5: AiModel;
  readonly HAIKU_4_5: AiModel;
  readonly SONNET_3_5: AiModel;
};
/**
 * Modello di default
 */
export declare const DEFAULT_MODEL: AiModel;
/**
 * Token limits - Single Source of Truth (SSOT)
 */
export declare const TOKEN_LIMITS: {
  readonly MAX_INPUT: 1000000;
  readonly MAX_OUTPUT: 65000;
  readonly DEFAULT_OUTPUT: 65000;
  /** Default max tokens for model generation (uses MAX_OUTPUT) */
  readonly DEFAULT_MAX_TOKENS: 65000;
};
/**
 * Configurazione modelli
 */
export declare const MODEL_CONFIG: {
  readonly [AI_MODELS.SONNET_4_5]: {
    readonly name: 'Claude Sonnet 4.5';
    readonly maxTokens: 65000;
    readonly defaultTemperature: 0.7;
    readonly supportExtendedThinking: true;
    readonly description: 'Modello bilanciato con ragionamento esteso';
  };
  readonly [AI_MODELS.HAIKU_4_5]: {
    readonly name: 'Claude Haiku 4.5';
    readonly maxTokens: 65000;
    readonly defaultTemperature: 0.7;
    readonly supportExtendedThinking: false;
    readonly description: 'Modello veloce per risposte rapide';
  };
  readonly [AI_MODELS.SONNET_3_5]: {
    readonly name: 'Claude Sonnet 3.5';
    readonly maxTokens: 65000;
    readonly defaultTemperature: 0.7;
    readonly supportExtendedThinking: false;
    readonly description: 'Modello precedente, affidabile';
  };
};
/**
 * Temperature presets
 */
export declare const TEMPERATURE_PRESETS: {
  readonly PRECISE: 0.3;
  readonly BALANCED: 0.7;
  readonly CREATIVE: 1;
};
/**
 * AI Reasoning Configuration - Single Source of Truth (SSOT)
 */
export declare const AI_REASONING_CONFIG: {
  /** Default thinking budget for AI operations */
  readonly DEFAULT_THINKING_BUDGET: 32000;
  /** Default reasoning effort level */
  readonly DEFAULT_REASONING_EFFORT: 'high';
};
