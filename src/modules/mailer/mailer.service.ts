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
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <h2 style="color: #333333; text-align: center;">¡Bienvenido a <span style="color: #4CAF50;">Sentia</span>, ${name}!</h2>
            <p style="font-size: 16px; color: #555555; text-align: center;">Nos alegra tenerte con nosotros.</p>
            <p style="font-size: 16px; color: #555555; text-align: center;">
              Comienza tu camino hacia la serenidad con nuestras meditaciones, reflexiones y contenido especialmente diseñado para ti.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://tusitio.com/mindful" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                Ir a Sentia
              </a>
            </div>
            <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Este mensaje fue enviado automáticamente. No respondas a este correo.</p>
          </div>
        </div>
      `,
    });
  }

  async sendWeeklyEmail(to: string, name: string) {
    const from = `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`;

    await this.transporter.sendMail({
      from,
      to,
      subject: 'Tu resumen semanal',
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
          <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
            <h2 style="color: #4CAF50; text-align: center;">Hola ${name},</h2>
            <p style="font-size: 16px; color: #555555; text-align: center;">Gracias por ser parte de Sentia Premium.</p>
            <p style="font-size: 16px; color: #555555; text-align: center;">
              Aquí tienes tu resumen semanal con lo más visto y recomendado por nuestra comunidad.
            </p>
            <div style="text-align: center; margin-top: 20px;">
              <a href="https://tusitio.com/recomendaciones" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
                Ver mi resumen
              </a>
            </div>
            <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Nos encanta acompañarte en tu bienestar emocional.</p>
          </div>
        </div>
      `,
    });
  }
}
