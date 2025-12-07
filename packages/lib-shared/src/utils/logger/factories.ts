/**
 * Logger Factories
 *
 * Factory functions for creating domain-specific loggers.
 * Following: Factory Pattern, DRY
 */

import { Logger } from './core';
import { AILogger } from './domain';

/**
 * Create general logger with prefix
 */
export function createLogger(prefix: string): Logger {
  return new Logger({ prefix });
}

/**
 * Create AI logger with prefix
 */
export function createAILogger(prefix: string): AILogger {
  return new AILogger({ prefix });
}

/**
 * Create streaming logger
 */
export function createStreamingLogger(): AILogger {
  return createAILogger('AI-Stream');
}

/**
 * Create agent logger
 */
export function createAgentLogger(): AILogger {
  return createAILogger('AI-Agent');
}

/**
 * Create intent detection logger
 */
export function createIntentLogger(): AILogger {
  return createAILogger('AI-Intent');
}
