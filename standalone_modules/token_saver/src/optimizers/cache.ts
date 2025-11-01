/**
 * Performance Cache
 * 
 * LRU cache for optimization results to avoid redundant processing.
 */

interface CacheEntry {
  output: string;
  tokens: number;
  timestamp: number;
}

class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number = 1000) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined;
    }
    
    // Move to end (most recently used)
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      // Update existing
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Global cache instance
const optimizationCache = new LRUCache<string, CacheEntry>(1000);
const CACHE_TTL = 3600000; // 1 hour

/**
 * Get cached optimization result
 */
export function getCachedResult(input: string): CacheEntry | null {
  const cached = optimizationCache.get(input);
  if (!cached) {
    return null;
  }
  
  // Check if cache entry is still valid
  const age = Date.now() - cached.timestamp;
  if (age > CACHE_TTL) {
    optimizationCache.delete(input);
    return null;
  }
  
  return cached;
}

/**
 * Cache optimization result
 */
export function cacheResult(input: string, output: string, tokens: number): void {
  optimizationCache.set(input, {
    output,
    tokens,
    timestamp: Date.now()
  });
}

/**
 * Clear the cache
 */
export function clearCache(): void {
  optimizationCache.clear();
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number; maxSize: number } {
  return {
    size: optimizationCache.size(),
    maxSize: 1000
  };
}

/**
 * Check if content has optimization potential (quick heuristic)
 * Used for early exit to avoid unnecessary processing
 */
export function hasOptimizationPotential(text: string): boolean {
  // Check for common filler words
  const fillerPattern = /basically|actually|simply|in fact|obviously|literally|you know|I mean/i;
  if (fillerPattern.test(text)) {
    return true;
  }
  
  // Check for verbose phrases
  const verbosePattern = /in order to|due to the fact that|at this point in time|for the purpose of/i;
  if (verbosePattern.test(text)) {
    return true;
  }
  
  // Check for excessive whitespace
  if (/\n{3,}/.test(text) || /[ \t]{3,}/.test(text)) {
    return true;
  }
  
  // Check for duplicate sentences (simple heuristic)
  const sentences = text.split(/[.!?]+\s+/);
  const seen = new Set<string>();
  for (const sentence of sentences) {
    const normalized = sentence.toLowerCase().trim();
    if (normalized.length > 20 && seen.has(normalized)) {
      return true;
    }
    seen.add(normalized);
  }
  
  return false;
}

