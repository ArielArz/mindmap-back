import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const from = `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`;

    await this.transporter.sendMail({
      from,
      to,
      subject: '¡Bienvenido a Sentia!',
      html: `<h1>Hola, ${name}!</h1><p>Gracias por registrarte en MindMap.</p>`,
    });
  }
}
