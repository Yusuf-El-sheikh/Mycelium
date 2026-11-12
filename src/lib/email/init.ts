import { MailjetProvider } from "../../pkg/mailjet/mailjet.js";
import type { MailProvider } from "../../pkg/mail/mail.provider.js";
import { env } from "../config/env.js";

export const mailProvider: MailProvider = new MailjetProvider({
  apiKey: env.mailjet.apiKey,
  secretKey: env.mailjet.secretKey,
  fromEmail: env.mailjet.fromEmail,
  fromName: env.mailjet.appName,
});
