import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sgTransport from 'nodemailer-sendgrid-transport';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const options = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY, // Usa la API Key de SendGrid
      },
    };

    this.transporter = nodemailer.createTransport(sgTransport(options));
  }

  private commonMailOptions(
    to: string,
    subject: string,
    html: string,
  ): nodemailer.SendMailOptions {
    return {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_EMAIL}>`,
      to,
      replyTo: process.env.MAIL_FROM_EMAIL,
      subject,
      html,
      headers: {
        'X-Mailer': 'Nodemailer',
        'List-Unsubscribe': `<mailto:${process.env.MAIL_FROM_EMAIL}>`,
      },
    };
  }

  async sendWelcomeEmail(to: string, name: string) {
    const html = `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #333333; text-align: center;">¡Bienvenido a <span style="color: #4CAF50;">Sentia</span>, ${name}!</h2>
          <p style="font-size: 16px; color: #555555; text-align: center;">Nos alegra tenerte con nosotros.</p>
          <p style="font-size: 16px; color: #555555; text-align: center;">
            Comienza tu camino hacia la serenidad con nuestras meditaciones, reflexiones y contenido especialmente diseñado para ti.
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Ir a Sentia
            </a>
          </div>
          <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Este mensaje fue enviado automáticamente. No respondas a este correo.</p>
        </div>
      </div>
    `;

    await this.transporter.sendMail(
      this.commonMailOptions(to, '¡Bienvenido a Sentia!', html),
    );
  }

  async sendWeeklyEmail(to: string, name: string) {
    const html = `
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
    `;

    await this.transporter.sendMail(
      this.commonMailOptions(to, 'Tu resumen semanal', html),
    );
  }
}
