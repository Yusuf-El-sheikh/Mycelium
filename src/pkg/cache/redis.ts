import { Redis } from "ioredis";
import { logger } from "../logger/logger.js";
import type { CacheProvider } from "./cache.provider.js";

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

export class RedisCacheProvider implements CacheProvider {
  private readonly client: Redis;

  constructor(config: RedisConfig) {
    this.client = new Redis({
      host: config.host,
      port: config.port,
      password: config.password,
      lazyConnect: true,
      maxLoadingRetryTime: 3,
    });
    this.client.on("error", (error: Error) => {
      logger.error("Redis error", { message: error.message });
    });
    this.client.connect().catch((error: Error) => {
      logger.error("System failure: failed to connect to cache", {
        message: error.message,
      });
    });
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }

  async set(key: string, value: string, ttlSeconds: number): Promise<void> {
    await this.client.set(key, value, "EX", ttlSeconds);
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }
}
