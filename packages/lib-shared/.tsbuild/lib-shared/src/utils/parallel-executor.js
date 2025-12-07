/**
 * Parallel Executor for OneAgent SDK 2.5 Mesh
 * Phase 2.1: Parallelizzazione ed Esecuzione Parallela
 *
 * Advanced parallel execution engine with:
 * - Worker pool pattern with dynamic sizing
 * - Intelligent rate limiting (sliding window)
 * - Retry logic with exponential backoff
 * - Dependency respect
 * - Circuit breaker for failure protection
 * - Performance metrics and monitoring
 * - Priority-based task scheduling
 *
 * Optimized for real parallel execution with Promise.allSettled
 */
'server-only';
import { executorLogger } from './logger';
/**
 * Parallel Executor with Worker Pool Pattern and Advanced Features
 */
export class ParallelExecutor {
    config;
    activeWorkers = 0;
    requestTimestamps = [];
    // Circuit breaker state
    circuitBreakerFailures = 0;
    circuitBreakerStatus = 'closed';
    circuitBreakerOpenedAt;
    // Metrics tracking
    metrics = {
        totalExecuted: 0,
        successCount: 0,
        failureCount: 0,
        totalRetries: 0,
        averageDuration: 0,
        peakConcurrency: 0,
        circuitBreakerStatus: 'closed',
        rateLimit: {
            current: 0,
            max: 0,
            utilizationPercent: 0,
        },
    };
    totalDuration = 0;
    constructor(config) {
        this.config = {
            ...config,
            retryConfig: {
                maxRetries: 3,
                retryDelay: 1000,
                exponentialBackoff: true,
                maxRetryDelay: 30000,
                ...config.retryConfig,
            },
            circuitBreaker: {
                enabled: false,
                failureThreshold: 5,
                resetTimeout: 60000,
                ...config.circuitBreaker,
            },
            priorityEnabled: config.priorityEnabled ?? false,
            metrics: {
                enabled: true,
                ...config.metrics,
            },
        };
        if (this.config.rateLimit) {
            this.metrics.rateLimit.max = this.config.rateLimit.maxRequestsPerMinute;
        }
    }
    /**
     * Execute tasks in parallel with worker pool (OPTIMIZED)
     * Uses Promise.allSettled for better error handling and true parallel execution
     */
    async executeParallel(tasks, executor, onProgress) {
        // Check circuit breaker before starting
        if (!this.canExecute()) {
            executorLogger.error('[ParallelExecutor] Circuit breaker is OPEN, rejecting execution');
            return tasks.map((task) => ({
                subtaskId: task.id,
                success: false,
                error: 'Circuit breaker is open - too many failures',
                retries: 0,
                duration: 0,
            }));
        }
        const results = [];
        const queue = [...tasks];
        let completed = 0;
        const executeOne = async (task) => {
            // Check circuit breaker before each execution
            if (!this.canExecute()) {
                return {
                    subtaskId: task.id,
                    success: false,
                    error: 'Circuit breaker is open',
                    retries: 0,
                    duration: 0,
                };
            }
            // Rate limiting check
            await this.waitForRateLimit();
            this.activeWorkers++;
            this.updateMetrics();
            const startTime = Date.now();
            try {
                const result = await this.executeWithRetry(task, executor);
                const duration = Date.now() - startTime;
                // Update metrics
                this.metrics.totalExecuted++;
                if (result.success) {
                    this.metrics.successCount++;
                    this.onExecutionSuccess();
                }
                else {
                    this.metrics.failureCount++;
                    this.onExecutionFailure();
                }
                this.metrics.totalRetries += result.retries;
                this.totalDuration += duration;
                this.metrics.averageDuration = this.totalDuration / this.metrics.totalExecuted;
                completed++;
                if (onProgress) {
                    onProgress(completed, tasks.length, result);
                }
                this.emitMetrics();
                return result;
            }
            finally {
                this.activeWorkers--;
                this.recordRequest();
            }
        };
        // Execute tasks in batches up to concurrency limit
        // Use Promise.allSettled for better error handling
        while (queue.length > 0) {
            const batch = queue.splice(0, this.config.concurrency);
            const promises = batch.map((task) => executeOne(task));
            // Wait for all tasks in batch to complete (success or failure)
            const settled = await Promise.allSettled(promises);
            // Collect results from settled promises
            for (const result of settled) {
                if (result.status === 'fulfilled') {
                    results.push(result.value);
                }
                else {
                    // Promise rejected (should not happen as executeOne catches errors)
                    executorLogger.error('[ParallelExecutor] Unexpected rejection:', result.reason);
                    results.push({
                        subtaskId: 'unknown',
                        success: false,
                        error: result.reason?.message || 'Unknown error',
                        retries: 0,
                        duration: 0,
                    });
                }
            }
        }
        return results;
    }
    /**
     * Execute task with retry logic (OPTIMIZED)
     */
    async executeWithRetry(task, executor) {
        const { maxRetries, retryDelay, exponentialBackoff, maxRetryDelay } = this.config.retryConfig;
        let lastError;
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const result = await executor.execute(task);
                return {
                    ...result,
                    retries: attempt,
                };
            }
            catch (_error) {
                lastError = error;
                // Don't retry if it's the last attempt
                if (attempt < maxRetries) {
                    let delay = exponentialBackoff ? retryDelay * Math.pow(2, attempt) : retryDelay;
                    // Cap retry delay at maxRetryDelay
                    if (maxRetryDelay && delay > maxRetryDelay) {
                        delay = maxRetryDelay;
                    }
                    executorLogger.warn(`[ParallelExecutor] Retry attempt ${attempt + 1}/${maxRetries} for task ${task.id}, waiting ${delay}ms`);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }
        // All retries failed
        executorLogger.error(`[ParallelExecutor] Task ${task.id} failed after ${maxRetries} retries`);
        return {
            subtaskId: task.id,
            success: false,
            error: lastError?.message || 'Unknown error',
            retries: maxRetries,
            duration: 0,
        };
    }
    /**
     * Circuit Breaker: Check if execution is allowed
     */
    canExecute() {
        if (!this.config.circuitBreaker?.enabled) {
            return true;
        }
        const now = Date.now();
        // If circuit is open, check if reset timeout has passed
        if (this.circuitBreakerStatus === 'open') {
            if (this.circuitBreakerOpenedAt &&
                now - this.circuitBreakerOpenedAt >= this.config.circuitBreaker.resetTimeout) {
                executorLogger.info('[ParallelExecutor] Circuit breaker entering half-open state');
                this.circuitBreakerStatus = 'half-open';
                this.circuitBreakerFailures = 0;
                this.metrics.circuitBreakerStatus = 'half-open';
                return true;
            }
            return false;
        }
        return true;
    }
    /**
     * Circuit Breaker: Handle successful execution
     */
    onExecutionSuccess() {
        if (!this.config.circuitBreaker?.enabled) {
            return;
        }
        // If circuit is half-open and execution succeeded, close it
        if (this.circuitBreakerStatus === 'half-open') {
            executorLogger.info('[ParallelExecutor] Circuit breaker closing (execution succeeded)');
            this.circuitBreakerStatus = 'closed';
            this.circuitBreakerFailures = 0;
            this.metrics.circuitBreakerStatus = 'closed';
        }
        // Reset failure count on success
        this.circuitBreakerFailures = 0;
    }
    /**
     * Circuit Breaker: Handle failed execution
     */
    onExecutionFailure() {
        if (!this.config.circuitBreaker?.enabled) {
            return;
        }
        this.circuitBreakerFailures++;
        // If failure threshold exceeded, open circuit
        if (this.circuitBreakerFailures >= this.config.circuitBreaker.failureThreshold) {
            executorLogger.error(`[ParallelExecutor] Circuit breaker OPENING (${this.circuitBreakerFailures} failures)`);
            this.circuitBreakerStatus = 'open';
            this.circuitBreakerOpenedAt = Date.now();
            this.metrics.circuitBreakerStatus = 'open';
        }
    }
    /**
     * Update metrics (called on each execution)
     */
    updateMetrics() {
        if (!this.config.metrics?.enabled) {
            return;
        }
        // Update peak concurrency
        if (this.activeWorkers > this.metrics.peakConcurrency) {
            this.metrics.peakConcurrency = this.activeWorkers;
        }
        // Update rate limit metrics
        if (this.config.rateLimit) {
            const now = Date.now();
            const oneMinuteAgo = now - 60000;
            const recentRequests = this.requestTimestamps.filter((ts) => ts > oneMinuteAgo).length;
            this.metrics.rateLimit.current = recentRequests;
            this.metrics.rateLimit.utilizationPercent =
                (recentRequests / this.config.rateLimit.maxRequestsPerMinute) * 100;
        }
    }
    /**
     * Emit metrics to callback if configured
     */
    emitMetrics() {
        if (this.config.metrics?.enabled && this.config.metrics.onMetricsUpdate) {
            this.config.metrics.onMetricsUpdate({ ...this.metrics });
        }
    }
    /**
     * Wait if rate limit would be exceeded
     */
    async waitForRateLimit() {
        if (!this.config.rateLimit) {
            return;
        }
        const { maxRequestsPerMinute } = this.config.rateLimit;
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        // Remove timestamps older than 1 minute
        this.requestTimestamps = this.requestTimestamps.filter((ts) => ts > oneMinuteAgo);
        // Check if we're at the limit
        if (this.requestTimestamps.length >= maxRequestsPerMinute) {
            // Calculate how long to wait
            const oldestTimestamp = this.requestTimestamps[0];
            if (oldestTimestamp !== undefined) {
                const waitTime = oldestTimestamp + 60000 - now + 100; // +100ms buffer
                if (waitTime > 0) {
                    await new Promise((resolve) => setTimeout(resolve, waitTime));
                }
            }
        }
    }
    /**
     * Record request timestamp for rate limiting
     */
    recordRequest() {
        if (this.config.rateLimit) {
            this.requestTimestamps.push(Date.now());
        }
    }
    /**
     * Get current status
     */
    getStatus() {
        const now = Date.now();
        const oneMinuteAgo = now - 60000;
        const requestsLastMinute = this.requestTimestamps.filter((ts) => ts > oneMinuteAgo).length;
        return {
            activeWorkers: this.activeWorkers,
            requestsLastMinute,
            availableSlots: this.config.concurrency - this.activeWorkers,
            circuitBreakerStatus: this.circuitBreakerStatus,
        };
    }
    /**
     * Get execution metrics
     */
    getMetrics() {
        return { ...this.metrics };
    }
    /**
     * Reset metrics (useful for testing or new execution cycles)
     */
    resetMetrics() {
        this.metrics = {
            totalExecuted: 0,
            successCount: 0,
            failureCount: 0,
            totalRetries: 0,
            averageDuration: 0,
            peakConcurrency: 0,
            circuitBreakerStatus: this.circuitBreakerStatus,
            rateLimit: {
                current: 0,
                max: this.config.rateLimit?.maxRequestsPerMinute || 0,
                utilizationPercent: 0,
            },
        };
        this.totalDuration = 0;
        executorLogger.info('[ParallelExecutor] Metrics reset');
    }
    /**
     * Manually reset circuit breaker (useful for recovery)
     */
    resetCircuitBreaker() {
        if (!this.config.circuitBreaker?.enabled) {
            return;
        }
        executorLogger.info('[ParallelExecutor] Circuit breaker manually reset');
        this.circuitBreakerStatus = 'closed';
        this.circuitBreakerFailures = 0;
        this.circuitBreakerOpenedAt = undefined;
        this.metrics.circuitBreakerStatus = 'closed';
    }
}
/**
 * Execute tasks in batches/waves respecting dependencies
 */
export async function executeInWaves(waves, executor, config, onWaveComplete, onProgress) {
    const allResults = [];
    const parallelExecutor = new ParallelExecutor(config);
    const totalTasks = waves.reduce((sum, wave) => sum + wave.length, 0);
    let completedTasks = 0;
    for (let i = 0; i < waves.length; i++) {
        const wave = waves[i];
        if (!wave) {
            continue;
        }
        const waveResults = await parallelExecutor.executeParallel(wave, executor, (_completed, _total, result) => {
            completedTasks++;
            if (onProgress) {
                onProgress(completedTasks, totalTasks, result);
            }
        });
        allResults.push(...waveResults);
        if (onWaveComplete) {
            onWaveComplete(i, waveResults);
        }
        // Check if wave had failures - might want to stop execution
        const hasFailures = waveResults.some((r) => !r.success);
        if (hasFailures) {
            // For now, continue with next wave
            // Could add config to stop on first failure
            executorLogger.warn(`Wave ${i} had failures, continuing with next wave`);
        }
    }
    return allResults;
}
