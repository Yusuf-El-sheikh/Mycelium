import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./lib/error/globalErrorHandler.js";
import { correlationId } from "./pkg/correlation/correlationId.js";

export function createApp() {
  const app = express();

  app.use(correlationId);

  app.use(express.json());

  app.use(cookieParser());

  app.use(cors({ origin: "http://localhost:4200" }));

  // routers go here

  app.use(globalErrorHandler);

  return app;
}
