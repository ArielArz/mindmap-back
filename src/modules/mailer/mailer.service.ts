import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sgTransport from 'nodemailer-sendgrid-transport';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const options = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
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
            <a href="" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
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

  async sendSubscriptionConfirmationEmail(to: string, name: string) {
    const html = `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #4CAF50; text-align: center;">¡Suscripción exitosa, ${name}!</h2>
          <p style="font-size: 16px; color: #555555; text-align: center;">Gracias por suscribirte a Sentia Premium.</p>
          <p style="font-size: 16px; color: #555555; text-align: center;">
            Ahora tienes acceso a todo nuestro contenido exclusivo. ¡Disfrútalo!
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Ir a Sentia Premium
            </a>
          </div>
          <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Gracias por apoyar nuestro crecimiento.</p>
        </div>
      </div>
    `;

    await this.transporter.sendMail(
      this.commonMailOptions(to, 'Suscripción a Sentia Premium', html),
    );
  }

  async sendSubscriptionExpiredEmail(to: string, name: string) {
    const html = `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #ff9800; text-align: center;">Tu suscripción a Sentia ha expirado, ${name}.</h2>
          <p style="font-size: 16px; color: #555555; text-align: center;">Tu acceso a Sentia Premium ha finalizado.</p>
          <p style="font-size: 16px; color: #555555; text-align: center;">
            Para seguir disfrutando de todo nuestro contenido exclusivo, renueva tu suscripción.
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="" style="background-color: #ff9800; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Renovar suscripción
            </a>
          </div>
          <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Esperamos verte de nuevo pronto.</p>
        </div>
      </div>
    `;

    await this.transporter.sendMail(
      this.commonMailOptions(to, 'Tu suscripción a Sentia ha expirado', html),
    );
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`; // Asegúrate de tener la URL de tu frontend
    const html = `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #333333; text-align: center;">¿Olvidaste tu contraseña?</h2>
          <p style="font-size: 16px; color: #555555;">Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.</p>
          <p style="font-size: 16px; color: #555555;">Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
              Restablecer mi contraseña
            </a>
          </div>
          <p style="font-size: 16px; color: #555555; margin-top: 20px;">Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
          <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Este enlace es válido por un tiempo limitado.</p>
        </div>
      </div>
    `;

    await this.transporter.sendMail(
      this.commonMailOptions(to, 'Restablecer tu contraseña', html),
    );
  }
}
