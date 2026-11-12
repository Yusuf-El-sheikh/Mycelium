import type { NextFunction, Request, Response } from "express";
import { logger } from "../../pkg/logger/logger.js";
import { AppError } from "./app.error.js";

// Express only treats this as an error handler if it has exactly 4 params
export function globalErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const err = error instanceof Error ? error : new Error(String(error));

  logger.error(err.message, {
    stack: err.stack,
    correlationId: req.correlationId,
  });

  if (error instanceof AppError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  // unknown errors: never leak internal messages to the client
  res.status(500).json({ message: "Internal server error" });
}
