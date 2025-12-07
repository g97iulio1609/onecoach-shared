/**
 * Domain-Specific Logger Extensions
 *
 * Specialized logging methods for AI, streaming, and other domains.
 * Following: Separation of Concerns, Single Responsibility
 */

import { Logger, type LogContext } from './core';

/**
 * AI-specific logger with domain methods
 */
export class AILogger extends Logger {
  /**
   * Log streaming event
   */
  streamEvent(event: string, data?: unknown): void {
    this.debug(`Stream event: ${event}`, data as LogContext);
  }

  /**
   * Log model creation
   */
  modelCreated(provider: string, model: string, config?: Record<string, unknown>): void {
    this.debug('Model created', { provider, model, ...(config || {}) });
  }

  /**
   * Log credit operation
   */
  creditOperation(
    operation: 'check' | 'consume',
    userId: string,
    amount: number,
    result: boolean
  ): void {
    this.info(`Credit ${operation}`, {
      userId,
      amount,
      success: result,
    });
  }

  /**
   * Log AI generation start
   */
  generationStart(type: 'workout' | 'nutrition' | 'chat', userId: string, tier: string): void {
    this.info(`${type} generation started`, {
      userId,
      tier,
    });
  }

  /**
   * Log AI generation complete
   */
  generationComplete(
    type: 'workout' | 'nutrition' | 'chat',
    userId: string,
    duration: number
  ): void {
    this.info(`${type} generation completed`, {
      userId,
      duration: `${duration.toFixed(2)}ms`,
    });
  }
}
