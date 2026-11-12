import { fileTypeFromBuffer } from "file-type";
import fs from "node:fs/promises";
import type { NextFunction, Request, Response } from "express";
import { AppError } from "../error/app.error.js";

const MAX_SIZE = 5 * 1024 * 1024;

// Middleware to validate file type by magic number (file signatures)
export const fileValidation = (
  allowedTypes: string[] = ["image/png", "image/jpeg"],
) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const file = req.file;

      if (!file) {
        throw new AppError("Invalid action: No file uploaded", 400);
      }

      if (file.size > MAX_SIZE) {
        await fs.unlink(file.path);
        throw new AppError("Invalid action: File size is too big", 400);
      }

      const buffer = await fs.readFile(file.path);
      const type = await fileTypeFromBuffer(buffer);

      if (!type || !allowedTypes.includes(type.mime)) {
        await fs.unlink(file.path);
        throw new AppError("Invalid action: Invalid file type", 400);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
