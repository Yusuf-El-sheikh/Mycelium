import http from "node:http";
import mongoose from "mongoose";
import { createApp } from "./index.js";
import { connectDB } from "./lib/db/connection.js";
import { env } from "./lib/config/env.js";
import { logger } from "./pkg/logger/logger.js";

await connectDB();

const server = http.createServer(createApp());

server.listen(env.port, () => {
  logger.info(`server running on http://localhost:${env.port}`);
});

async function shutdown(): Promise<void> {
  server.close();
  await mongoose.disconnect();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
