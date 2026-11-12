import type { RequestHandler } from "express";
import { cacheProvider } from "../cache/init.js";
import { logger } from "../../pkg/logger/logger.js";

export function idempotency(ttl: number): RequestHandler {
  return async (req, res, next) => {
    const idempotencyKey = req.headers["idempotency-key"];

    // no header (or sent twice) = nothing to dedupe, don't share one "undefined" key
    if (typeof idempotencyKey !== "string") {
      next();
      return;
    }

    const key = `${req.method}:${req.originalUrl}:${idempotencyKey}`;

    try {
      const cached = await cacheProvider.get(key);
      if (cached) {
        res.setHeader("X-Cache", "HIT");
        res.json(JSON.parse(cached));
        return;
      }
    } catch (error) {
      logger.warn("Idempotency cache read failed", { key });
    }

    const originalJson = res.json.bind(res);

    res.json = (body?: unknown) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheProvider.set(key, JSON.stringify(body), ttl).catch(() => {
          logger.warn("Idempotency cache write failed", { key });
        });
        res.setHeader("X-Cache", "MISS");
      }
      return originalJson(body);
    };

    next();
  };
}
