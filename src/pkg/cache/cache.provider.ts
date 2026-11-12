// Anything that implements this can be the cache (redis, in-memory, ...)
export interface CacheProvider {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttlSeconds: number): Promise<void>;
  del(key: string): Promise<void>;
}
