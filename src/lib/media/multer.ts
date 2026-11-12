import multer, { diskStorage } from "multer";
import crypto from "node:crypto";
import path from "node:path";
import type { RequestHandler } from "express";
import { AppError } from "../error/app.error.js";

const DEFAULT_TYPES = ["image/png", "image/jpeg"];

function fileUpload(allowedTypes: string[] = DEFAULT_TYPES) {
  return multer({
    fileFilter: (req, file, callback) => {
      if (!allowedTypes.includes(file.mimetype)) {
        callback(new AppError("Invalid action: invalid file format", 400));
        return;
      }

      callback(null, true);
    },
    storage: diskStorage({
      destination: "uploads",
      filename: (req, file, callback) => {
        // only keep the extension, never trust the client's full filename
        callback(null, `${crypto.randomUUID()}${path.extname(file.originalname)}`);
      },
    }),
  });
}

export function uploadSingleFile(
  fieldName: string,
  allowedTypes: string[] = DEFAULT_TYPES,
): RequestHandler {
  return fileUpload(allowedTypes).single(fieldName);
}

//primitive methods very unlikely to be further developed for lack of purpose, yet declared just in case
export function uploadArrayFiles(fieldName: string, maxCount?: number): RequestHandler {
  return fileUpload().array(fieldName, maxCount);
}

//primitive methods very unlikely to be further developed for lack of purpose, yet declared just in case
export function uploadFields(fields: multer.Field[]): RequestHandler {
  return fileUpload().fields(fields);
}
