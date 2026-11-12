import type { RequestHandler } from "express";
import { cacheProvider } from "./init.js";
import { logger } from "../../pkg/logger/logger.js";

// WARNING: key is method + url only, so don't use on user-specific routes
export function withCache(ttl = 3600): RequestHandler {
  return async (req, res, next) => {
    const key = `${req.method}:${req.originalUrl}`;

    try {
      const cached = await cacheProvider.get(key);
      if (cached) {
        res.setHeader("X-Cache", "HIT");
        res.json(JSON.parse(cached));
        return;
      }
    } catch (error) {
      // cache down? serve the request normally instead of failing it
      logger.warn("Cache read failed", { key });
    }

    const originalJson = res.json.bind(res);

    // interceptor
    res.json = (body?: unknown) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheProvider.set(key, JSON.stringify(body), ttl).catch(() => {
          logger.warn("Cache write failed", { key });
        });
        res.setHeader("X-Cache", "MISS");
      }
      // always send, even for non-2xx (the old version hung on errors)
      return originalJson(body);
    };

    next();
  };
}
