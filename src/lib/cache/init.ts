import { RedisCacheProvider } from "../../pkg/cache/redis.js";
import type { CacheProvider } from "../../pkg/cache/cache.provider.js";
import { env } from "../config/env.js";

// typed as the interface so the rest of the app doesn't care it's redis
export const cacheProvider: CacheProvider = new RedisCacheProvider({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.pass,
});
