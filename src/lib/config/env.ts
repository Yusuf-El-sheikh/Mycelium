import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3000),

  DB_URL: z.string(),

  APP_NAME: z.string(),

  EMAIL: z.string().trim().toLowerCase(),

  SECRET_ACCESS_TOKEN_KEY: z.string(),
  SECRET_REFRESH_TOKEN_KEY: z.string(),

  ACCESS_TOKEN_EXPIRE_IN: z.coerce.number(),
  REFRESH_TOKEN_EXPIRE_IN: z.coerce.number(),
  OTP_TTL: z.coerce.number(),

  GOOGLE_CLIENT_ID: z.string(),

  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_HOST: z.string(),
  REDIS_PASS: z.string().default(""),

  MAILJET_API_KEY: z.string().trim(),
  MAILJET_SECRET: z.string().trim(),
});

const parsed = schema.parse(process.env); //check if process.env matches the schema

export const env = {
  port: parsed.PORT,

  db: {
    url: parsed.DB_URL,
  },

  redis: {
    host: parsed.REDIS_HOST,
    port: parsed.REDIS_PORT,
    pass: parsed.REDIS_PASS,
  },

  jwt: {
    accessSecret: parsed.SECRET_ACCESS_TOKEN_KEY,
    refreshSecret: parsed.SECRET_REFRESH_TOKEN_KEY,
  },

  expiration: {
    access: parsed.ACCESS_TOKEN_EXPIRE_IN,
    refresh: parsed.REFRESH_TOKEN_EXPIRE_IN,
    otpTtl: parsed.OTP_TTL,
  },

  google: {
    clientId: parsed.GOOGLE_CLIENT_ID,
  },

  mailjet: {
    appName: parsed.APP_NAME,
    apiKey: parsed.MAILJET_API_KEY,
    secretKey: parsed.MAILJET_SECRET,
    fromEmail: parsed.EMAIL,
  },
};
