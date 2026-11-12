import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../error/app.error.js";
import { env } from "../config/env.js";

export function guard(req: Request, res: Response, next: NextFunction): void {
  try {
    const token: unknown = req.cookies?.access_token;

    if (typeof token !== "string") {
      throw new AppError("Invalid action: No access token", 401);
    }

    const payload = jwt.verify(token, env.jwt.secret);

    if (typeof payload === "string") {
      throw new AppError("Invalid action: Invalid access token", 401);
    }

    req.user = payload;

    next();
  } catch (error) {
    // bad/expired tokens are the client's fault, not a 500
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError("Invalid action: Invalid or expired token", 401));
      return;
    }
    next(error);
  }
}
