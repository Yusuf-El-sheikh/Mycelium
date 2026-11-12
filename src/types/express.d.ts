import type { JwtPayload } from "jsonwebtoken";

// Declaration merging: adds our custom fields to Express's Request type
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
      correlationId?: string;
    }
  }
}

export {};
