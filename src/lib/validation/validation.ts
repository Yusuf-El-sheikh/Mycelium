import type { z } from "zod";
import { AppError } from "../error/app.error.js";

// Generic: pass any zod schema, get back the type that schema produces
export function validateBody<T extends z.ZodType>(
  dto: T,
  body: unknown,
): z.output<T> {
  const result = dto.safeParse(body);
  if (!result.success) {
    const errMessages = result.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    throw new AppError(`Invalid action: ${errMessages.join(", ")}`, 400);
  }
  return result.data;
}
