import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

export function correlationId(req: Request, res: Response, next: NextFunction): void {
  const id = crypto.randomUUID();
  req.correlationId = id;
  res.setHeader("X-Correlation-Id", id);

  next();
}
