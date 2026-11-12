import { Client } from "node-mailjet";
import type { MailProvider } from "../mail/mail.provider.js";

export interface MailjetConfig {
  apiKey: string;
  secretKey: string;
  fromEmail: string;
  fromName: string;
}

export class MailjetProvider implements MailProvider {
  private readonly client: Client;
  private readonly fromEmail: string;
  private readonly fromName: string;

  constructor(config: MailjetConfig) {
    this.client = new Client({
      apiKey: config.apiKey,
      apiSecret: config.secretKey,
    });
    this.fromEmail = config.fromEmail;
    this.fromName = config.fromName;
  }

  async sendMail(to: string, subject: string, html: string): Promise<void> {
    await this.client.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: this.fromEmail,
            Name: this.fromName,
          },
          To: [
            {
              Email: to,
              Name: "You",
            },
          ],
          Subject: subject,
          HTMLPart: html,
        },
      ],
    });
  }
}
