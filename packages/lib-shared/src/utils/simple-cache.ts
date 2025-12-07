/**
 * Simple in-memory cache with optional TTL and basic LRU eviction.
 * Avoids external dependencies (e.g. lru-cache) that can cause bundler issues.
 */

export interface SimpleCacheOptions {
  max: number;
  ttl?: number;
}

interface CacheEntry<V> {
  value: V;
  expiresAt: number | null;
}

export class SimpleCache<K, V> {
  private readonly store = new Map<K, CacheEntry<V>>();
  private readonly max: number;
  private readonly ttl: number;

  constructor(options: SimpleCacheOptions) {
    this.max = Math.max(1, options.max);
    this.ttl = Math.max(0, options.ttl ?? 0);
  }

  get(key: K): V | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (entry.expiresAt && entry.expiresAt <= Date.now()) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  set(key: K, value: V): void {
    const expiresAt = this.ttl > 0 ? Date.now() + this.ttl : null;

    // Refresh insertion order when updating an existing key
    if (this.store.has(key)) {
      this.store.delete(key);
    }

    this.store.set(key, { value, expiresAt });
    this.enforceLimit();
  }

  delete(key: K): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  private enforceLimit(): void {
    if (this.store.size <= this.max) {
      return;
    }

    const oldestKey = this.store.keys().next().value;
    if (oldestKey !== undefined) {
      this.store.delete(oldestKey);
    }
  }
}
