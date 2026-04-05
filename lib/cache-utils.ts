/**
 * Cache Utilities and Helpers
 * Provides cache integration for common database queries
 */

import cache from "./cache";

type CacheKeyPrefix =
  | "user"
  | "project"
  | "ticket"
  | "company"
  | "projects-list"
  | "users-list";

interface CacheConfig {
  ttl?: number;
  prefix: CacheKeyPrefix;
}

/**
 * Generate cache key with prefix
 */
function generateCacheKey(prefix: CacheKeyPrefix, id: string): string {
  return `${prefix}:${id}`;
}

/**
 * Generate list cache key with filters
 */
function generateListCacheKey(
  prefix: CacheKeyPrefix,
  filters: Record<string, any> = {}
): string {
  const filterStr = Object.keys(filters)
    .sort()
    .map((key) => `${key}=${filters[key]}`)
    .join("|");

  return filterStr ? `${prefix}:list:${filterStr}` : `${prefix}:list:*`;
}

/**
 * Cache a single document
 */
export function cacheDocument<T>(
  prefix: CacheKeyPrefix,
  id: string,
  data: T,
  ttl?: number
): void {
  const key = generateCacheKey(prefix, id);
  cache.set(key, data, ttl || 5 * 60 * 1000); // 5 minutes default
}

/**
 * Get cached document
 */
export function getCachedDocument<T>(prefix: CacheKeyPrefix, id: string): T | null {
  const key = generateCacheKey(prefix, id);
  return cache.get<T>(key);
}

/**
 * Cache a document list
 */
export function cacheDocumentList<T>(
  prefix: CacheKeyPrefix,
  filters: Record<string, any>,
  data: T[],
  ttl?: number
): void {
  const key = generateListCacheKey(prefix, filters);
  cache.set(key, data, ttl || 10 * 60 * 1000); // 10 minutes default
}

/**
 * Get cached document list
 */
export function getCachedDocumentList<T>(
  prefix: CacheKeyPrefix,
  filters: Record<string, any>
): T[] | null {
  const key = generateListCacheKey(prefix, filters);
  return cache.get<T[]>(key);
}

/**
 * Invalidate single document cache
 */
export function invalidateDocumentCache(
  prefix: CacheKeyPrefix,
  id: string
): void {
  const key = generateCacheKey(prefix, id);
  cache.delete(key);
}

/**
 * Invalidate all documents of a type
 */
export function invalidateDocumentListCache(prefix: CacheKeyPrefix): number {
  return cache.deletePattern(`^${prefix}:`);
}

/**
 * Invalidate cache by company
 */
export function invalidateCompanyCache(companyId: string): number {
  return cache.deletePattern(`.*:${companyId}.*`);
}

/**
 * Prefetch and cache documents
 */
export function prefetchCache(
  keys: Array<{ prefix: CacheKeyPrefix; id: string; data: any; ttl?: number }>
): void {
  for (const item of keys) {
    cacheDocument(item.prefix, item.id, item.data, item.ttl);
  }
}

/**
 * Get cache hit rate
 */
export function getCacheHitRate(): {
  hitRate: number;
  hits: number;
  misses: number;
  total: number;
} {
  const stats = cache.getStats();
  const total = stats.hits + stats.misses;
  const hitRate = total > 0 ? (stats.hits / total) * 100 : 0;

  return {
    hitRate: Math.round(hitRate * 100) / 100,
    hits: stats.hits,
    misses: stats.misses,
    total,
  };
}

/**
 * Get cache memory usage
 */
export function getCacheMemoryUsage(): {
  bytes: number;
  kb: number;
  mb: number;
  entries: number;
} {
  const stats = cache.getStats();
  const bytes = cache.getMemoryUsage?.() || 0;

  return {
    bytes,
    kb: Math.round((bytes / 1024) * 100) / 100,
    mb: Math.round((bytes / 1024 / 1024) * 100) / 100,
    entries: stats.entries,
  };
}

/**
 * Get detailed cache statistics
 */
export function getCacheStats(): {
  hitRate: number;
  hits: number;
  misses: number;
  entries: number;
  memoryUsage: {
    bytes: number;
    kb: number;
    mb: number;
  };
} {
  const stats = cache.getStats();
  const memoryUsage = getCacheMemoryUsage();
  const hitRate = getCacheHitRate();

  return {
    hitRate: hitRate.hitRate,
    hits: stats.hits,
    misses: stats.misses,
    entries: stats.entries,
    memoryUsage: {
      bytes: memoryUsage.bytes,
      kb: memoryUsage.kb,
      mb: memoryUsage.mb,
    },
  };
}

/**
 * Clear all cache
 */
export function clearAllCache(): void {
  cache.clear();
}

/**
 * Reset cache statistics
 */
export function resetCacheStats(): void {
  cache.resetStats();
}

/**
 * Get all cache keys
 */
export function getCacheKeys(): string[] {
  return cache.keys();
}

/**
 * Create a cache invalidation trigger for automated updates
 */
export function setCacheInvalidationTrigger(
  document: "user" | "project" | "ticket",
  operation: "create" | "update" | "delete",
  companyId: string,
  documentId?: string
): void {
  // Invalidate specific document
  if (documentId) {
    const prefix = `${document}` as CacheKeyPrefix;
    invalidateDocumentCache(prefix, documentId);
  }

  // Invalidate lists
  const listPrefix = `${document}s-list` as CacheKeyPrefix;
  invalidateDocumentListCache(listPrefix);

  // Invalidate company-related caches
  invalidateCompanyCache(companyId);
}

/**
 * Monitoring function to check cache health
 */
export function getHealthReport(): {
  status: "healthy" | "warning" | "critical";
  hitRate: number;
  memoryMb: number;
  entries: number;
  recommendations: string[];
} {
  const stats = getCacheStats();
  const recommendations: string[] = [];

  let status: "healthy" | "warning" | "critical" = "healthy";

  // Check hit rate
  if (stats.hitRate < 50) {
    status = "warning";
    recommendations.push("Cache hit rate is low. Consider verifying cache keys.");
  }

  // Check memory usage
  if (stats.memoryUsage.mb > 100) {
    status = "critical";
    recommendations.push(
      "Cache memory usage is high. Consider clearing cache or reducing TTL."
    );
  } else if (stats.memoryUsage.mb > 50) {
    if (status === "healthy") status = "warning";
    recommendations.push(
      "Cache memory usage is increasing. Monitor and consider optimization."
    );
  }

  // Check entry count
  if (stats.entries > 10000) {
    status = "critical";
    recommendations.push(
      "Cache has too many entries. Consider clearing old entries or increasing cleanup frequency."
    );
  }

  return {
    status,
    hitRate: stats.hitRate,
    memoryMb: stats.memoryUsage.mb,
    entries: stats.entries,
    recommendations,
  };
}
