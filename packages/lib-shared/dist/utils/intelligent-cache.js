/**
 * Intelligent Cache System for AI Agents
 *
 * Advanced caching system with:
 * - TTL (Time To Live) support
 * - LRU (Least Recently Used) eviction
 * - Memory limits
 * - Cache statistics
 * - Automatic cleanup
 * - Serialization support
 *
 * Usage:
 * ```ts
 * const cache = new IntelligentCache({ maxSize: 100, ttl: 60000 });
 * await cache.set('key', value);
 * const value = await cache.get('key');
 * ```
 */
import { cacheLogger } from './logger';
('server-only');
/**
 * Intelligent Cache with TTL, LRU eviction, and stats
 */
export class IntelligentCache {
    config;
    cache;
    accessOrder; // For LRU tracking
    stats;
    cleanupTimer;
    constructor(config = {}) {
        this.config = {
            maxSize: config.maxSize || 1000,
            ttl: config.ttl || 60000, // 1 minute default
            evictionPolicy: config.evictionPolicy || 'lru',
            enableStats: config.enableStats ?? true,
            cleanupInterval: config.cleanupInterval || 30000, // 30 seconds
        };
        this.cache = new Map();
        this.accessOrder = [];
        this.stats = {
            hits: 0,
            misses: 0,
            evictions: 0,
        };
        // Start cleanup timer
        this.startCleanup();
    }
    /**
     * Get value from cache
     */
    async get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            if (this.config.enableStats) {
                this.stats.misses++;
            }
            return undefined;
        }
        // Check if expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            this.removeFromAccessOrder(key);
            if (this.config.enableStats) {
                this.stats.misses++;
            }
            return undefined;
        }
        // Update access tracking
        entry.accessCount++;
        entry.lastAccessed = Date.now();
        this.updateAccessOrder(key);
        if (this.config.enableStats) {
            this.stats.hits++;
        }
        return entry.value;
    }
    /**
     * Set value in cache
     */
    async set(key, value, ttl) {
        const now = Date.now();
        const effectiveTtl = ttl || this.config.ttl;
        // Check if we need to evict entries
        if (this.cache.size >= this.config.maxSize && !this.cache.has(key)) {
            this.evict();
        }
        // Estimate size (rough estimation)
        const size = this.estimateSize(value);
        const entry = {
            value,
            expiresAt: now + effectiveTtl,
            accessCount: 0,
            lastAccessed: now,
            createdAt: now,
            size,
        };
        this.cache.set(key, entry);
        this.updateAccessOrder(key);
    }
    /**
     * Check if key exists in cache (doesn't update access time)
     */
    has(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return false;
        }
        // Check if expired
        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            this.removeFromAccessOrder(key);
            return false;
        }
        return true;
    }
    /**
     * Delete entry from cache
     */
    async delete(key) {
        const deleted = this.cache.delete(key);
        if (deleted) {
            this.removeFromAccessOrder(key);
        }
        return deleted;
    }
    /**
     * Clear all entries
     */
    async clear() {
        this.cache.clear();
        this.accessOrder = [];
        if (this.config.enableStats) {
            this.stats = {
                hits: 0,
                misses: 0,
                evictions: 0,
            };
        }
        cacheLogger.info('[IntelligentCache] Cache cleared');
    }
    /**
     * Get cache statistics
     */
    getStats() {
        const totalRequests = this.stats.hits + this.stats.misses;
        const hitRate = totalRequests > 0 ? this.stats.hits / totalRequests : 0;
        let oldestEntry;
        let newestEntry;
        let totalSize = 0;
        for (const entry of this.cache.values()) {
            if (!oldestEntry || entry.createdAt < oldestEntry) {
                oldestEntry = entry.createdAt;
            }
            if (!newestEntry || entry.createdAt > newestEntry) {
                newestEntry = entry.createdAt;
            }
            totalSize += entry.size || 0;
        }
        return {
            size: this.cache.size,
            maxSize: this.config.maxSize,
            hits: this.stats.hits,
            misses: this.stats.misses,
            hitRate,
            evictions: this.stats.evictions,
            totalSize,
            oldestEntry,
            newestEntry,
        };
    }
    /**
     * Get all keys
     */
    keys() {
        return Array.from(this.cache.keys());
    }
    /**
     * Get cache size
     */
    size() {
        return this.cache.size;
    }
    /**
     * Evict entries based on policy
     */
    evict() {
        if (this.config.evictionPolicy === 'lru') {
            // Evict least recently used
            const lruKey = this.accessOrder[0];
            if (lruKey) {
                this.cache.delete(lruKey);
                this.accessOrder.shift();
                this.stats.evictions++;
                cacheLogger.info(`[IntelligentCache] Evicted LRU entry: ${lruKey}`);
            }
        }
        else {
            // FIFO: evict oldest entry
            const oldestKey = Array.from(this.cache.entries()).sort((a, b) => a[1].createdAt - b[1].createdAt)[0]?.[0];
            if (oldestKey) {
                this.cache.delete(oldestKey);
                this.removeFromAccessOrder(oldestKey);
                this.stats.evictions++;
                cacheLogger.info(`[IntelligentCache] Evicted FIFO entry: ${oldestKey}`);
            }
        }
    }
    /**
     * Update access order for LRU
     */
    updateAccessOrder(key) {
        // Remove from current position
        this.removeFromAccessOrder(key);
        // Add to end (most recently used)
        this.accessOrder.push(key);
    }
    /**
     * Remove key from access order
     */
    removeFromAccessOrder(key) {
        const index = this.accessOrder.indexOf(key);
        if (index !== -1) {
            this.accessOrder.splice(index, 1);
        }
    }
    /**
     * Estimate size of value (rough estimation)
     */
    estimateSize(value) {
        try {
            const json = JSON.stringify(value);
            return json.length * 2; // Rough estimate: 2 bytes per character
        }
        catch (_error) {
            return 0;
        }
    }
    /**
     * Cleanup expired entries
     */
    cleanup() {
        const now = Date.now();
        let cleaned = 0;
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
                this.removeFromAccessOrder(key);
                cleaned++;
            }
        }
        if (cleaned > 0) {
            cacheLogger.info(`[IntelligentCache] Cleaned up ${cleaned} expired entries`);
        }
    }
    /**
     * Start automatic cleanup timer
     */
    startCleanup() {
        this.cleanupTimer = setInterval(() => {
            this.cleanup();
        }, this.config.cleanupInterval);
    }
    /**
     * Stop cleanup timer and destroy cache
     */
    destroy() {
        if (this.cleanupTimer) {
            clearInterval(this.cleanupTimer);
            this.cleanupTimer = undefined;
        }
        this.cache.clear();
        this.accessOrder = [];
        cacheLogger.info('[IntelligentCache] Cache destroyed');
    }
    /**
     * Get or set pattern: get value if exists, otherwise compute and cache
     */
    async getOrSet(key, computeFn, ttl) {
        const cached = await this.get(key);
        if (cached !== undefined) {
            return cached;
        }
        const value = await computeFn();
        await this.set(key, value, ttl);
        return value;
    }
    /**
     * Batch get: get multiple keys at once
     */
    async getMany(keys) {
        const results = new Map();
        for (const key of keys) {
            const value = await this.get(key);
            if (value !== undefined) {
                results.set(key, value);
            }
        }
        return results;
    }
    /**
     * Batch set: set multiple keys at once
     */
    async setMany(entries, ttl) {
        for (const [key, value] of entries) {
            await this.set(key, value, ttl);
        }
    }
    /**
     * Export cache to JSON (for persistence)
     */
    async export() {
        const exported = {};
        for (const [key, entry] of this.cache.entries()) {
            exported[key] = entry;
        }
        return exported;
    }
    /**
     * Import cache from JSON (for persistence)
     */
    async import(data) {
        const now = Date.now();
        let imported = 0;
        let skipped = 0;
        for (const [key, entry] of Object.entries(data)) {
            // Skip expired entries
            if (now > entry.expiresAt) {
                skipped++;
                continue;
            }
            this.cache.set(key, entry);
            this.updateAccessOrder(key);
            imported++;
        }
        cacheLogger.info(`[IntelligentCache] Imported ${imported} entries, skipped ${skipped} expired entries`);
    }
}
/**
 * Global cache instance (singleton pattern)
 */
let globalCache = null;
/**
 * Get global cache instance
 */
export function getGlobalCache(config) {
    if (!globalCache) {
        globalCache = new IntelligentCache(config);
        cacheLogger.info('[IntelligentCache] Global cache instance created');
    }
    return globalCache;
}
/**
 * Destroy global cache instance
 */
export function destroyGlobalCache() {
    if (globalCache) {
        globalCache.destroy();
        globalCache = null;
        cacheLogger.info('[IntelligentCache] Global cache instance destroyed');
    }
}
