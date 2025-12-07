/**
 * Core Logger Implementation
 *
 * Production-ready centralized logging system.
 * Following: Strong Typing First, SRP, DRY, Explicit > Implicit
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  readonly [key: string]: unknown;
}

export interface LoggerConfig {
  readonly level: LogLevel;
  readonly enabledInProduction: boolean;
  readonly prefix?: string;
  readonly enableTimestamps: boolean;
}

interface LogEntry {
  readonly level: LogLevel;
  readonly message: string;
  readonly context?: LogContext;
  readonly timestamp: string;
  readonly environment: string;
  readonly prefix?: string;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
} as const;

const DEFAULT_CONFIG: LoggerConfig = {
  level: (process.env.LOG_LEVEL as LogLevel) || 'info',
  enabledInProduction: process.env.LOG_IN_PRODUCTION === 'true',
  enableTimestamps: true,
} as const;

/**
 * Logger class with environment-aware logging and performance tracking
 */
export class Logger {
  private readonly config: LoggerConfig;
  private readonly isDevelopment: boolean;
  private readonly isServer: boolean;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.isServer = typeof window === 'undefined';
  }

  /**
   * Create child logger with prefix
   *
   * @example
   * const dbLogger = logger.child('Database');
   * dbLogger.info('Connected');
   */
  child(prefix: string): Logger {
    return new Logger({
      ...this.config,
      prefix: this.config.prefix ? `${this.config.prefix}:${prefix}` : prefix,
    });
  }

  /**
   * Check if logging is enabled for this level
   */
  private shouldLog(level: LogLevel): boolean {
    // Always log errors
    if (level === 'error') return true;

    // In production, only log if explicitly enabled
    if (!this.isDevelopment && !this.config.enabledInProduction) {
      return false;
    }

    // Check if this level should be logged based on configured level
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.level];
  }

  /**
   * Format log entry for structured logging
   */
  private formatLogEntry(level: LogLevel, message: string, context?: LogContext): LogEntry {
    return {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'unknown',
      prefix: this.config.prefix,
    };
  }

  /**
   * Format message for console output (development)
   */
  private formatConsoleMessage(level: LogLevel, message: string): string {
    const parts: string[] = [];

    if (this.config.enableTimestamps) {
      parts.push(`[${new Date().toISOString()}]`);
    }

    if (this.config.prefix) {
      parts.push(`[${this.config.prefix}]`);
    }

    const emoji = {
      debug: '🐛',
      info: 'ℹ️',
      warn: '⚠️',
      error: '❌',
    }[level];

    parts.push(`${emoji} [${level.toUpperCase()}]`);
    parts.push(message);

    return parts.join(' ');
  }

  /**
   * Send to external logging service (production)
   */
  private sendToExternalLogger(_entry: LogEntry): void {
    // Sentry Integration (Placeholder)
    // To enable, install @sentry/nextjs or @sentry/node and uncomment:
    /*
    if (typeof globalThis !== 'undefined' && (globalThis as any).Sentry) {
      const Sentry = (globalThis as any).Sentry;
      
      if (_entry.level === 'error') {
        Sentry.captureException(new Error(_entry.message), {
          extra: _entry.context,
          tags: {
            prefix: _entry.prefix,
            environment: _entry.environment
          }
        });
      } else {
        Sentry.captureMessage(_entry.message, {
          level: _entry.level,
          extra: _entry.context,
          tags: {
            prefix: _entry.prefix,
            environment: _entry.environment
          }
        });
      }
    }
    */
  }

  /**
   * Core log method
   */
  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (!this.shouldLog(level)) return;

    const entry = this.formatLogEntry(level, message, context);

    // Development: Pretty console output
    if (this.isDevelopment) {
      const formattedMessage = this.formatConsoleMessage(level, message);
      const consoleFn = console[level === 'debug' ? 'log' : level];
      consoleFn(formattedMessage, context || '');
    }
    // Production: Structured JSON logging
    else {
      console.warn(JSON.stringify(entry));
    }

    // Production server: Send to external logger for errors
    if (!this.isDevelopment && this.isServer && level === 'error') {
      this.sendToExternalLogger(entry);
    }
  }

  /**
   * Debug level logging (most verbose)
   */
  debug(message: string, context?: LogContext | string | unknown): void {
    const ctx = typeof context === 'object' && context !== null ? (context as LogContext) : {};
    this.log('debug', message, ctx);
  }

  /**
   * Info level logging
   */
  info(message: string, context?: LogContext | string | unknown): void {
    const ctx = typeof context === 'object' && context !== null ? (context as LogContext) : {};
    this.log('info', message, ctx);
  }

  /**
   * Warning level logging
   */
  warn(message: string, context?: LogContext | string | unknown): void {
    const ctx = typeof context === 'object' && context !== null ? (context as LogContext) : {};
    this.log('warn', message, ctx);
  }

  /**
   * Error level logging (always logged)
   */
  error(message: string, error?: Error | unknown, context?: LogContext | string | unknown): void {
    const ctx =
      typeof context === 'object' && context !== null && !(context instanceof Error)
        ? (context as LogContext)
        : {};

    const errorContext: LogContext = {
      ...ctx,
      ...(error instanceof Error && {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      }),
    };

    this.log('error', message, errorContext);
  }

  /**
   * Performance tracking: start timer
   */
  time(label: string): void {
    if (this.isDevelopment) {
      console.time(label);
    }
  }

  /**
   * Performance tracking: end timer
   */
  timeEnd(label: string): void {
    if (this.isDevelopment) {
      console.timeEnd(label);
    }
  }

  /**
   * Measure async operation performance
   *
   * @example
   * const result = await logger.measure('fetchUser', async () => {
   *   return await fetchUser(id);
   * }, { userId: id });
   */
  async measure<T>(label: string, fn: () => Promise<T> | T, context?: LogContext): Promise<T> {
    const start = performance.now();

    try {
      const result = await fn();
      const duration = performance.now() - start;

      this.debug(`${label} completed`, {
        ...context,
        duration: `${duration.toFixed(2)}ms`,
      });

      return result;
    } catch (error: unknown) {
      const duration = performance.now() - start;

      this.error(`${label} failed`, error, {
        ...context,
        duration: `${duration.toFixed(2)}ms`,
      });

      throw error;
    }
  }
}
