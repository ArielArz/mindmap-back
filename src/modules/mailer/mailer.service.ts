import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as nodemailer from 'nodemailer';
import * as sgTransport from 'nodemailer-sendgrid-transport';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly jwtService: JwtService) {
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
    const link = `${process.env.FRONTEND_URL}/login`;
    const html = `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #333333; text-align: center;">¡Bienvenido a <span style="color: #4CAF50;">Sentia</span>, ${name}!</h2>
          <p style="font-size: 16px; color: #555555; text-align: center;">Nos alegra tenerte con nosotros.</p>
          <p style="font-size: 16px; color: #555555; text-align: center;">
            Comienza tu camino hacia la serenidad con nuestras meditaciones, reflexiones y contenido especialmente diseñado para ti.
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
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

  async sendSubscriptionConfirmationEmail(
    to: string,
    name: string,
    expirationDate: string,
  ) {
    const link = `${process.env.FRONTEND_URL}/profile`;
    const html = `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #4CAF50; text-align: center;">¡Suscripción exitosa, ${name}!</h2>
          <p style="font-size: 16px; color: #555555; text-align: center;">Gracias por suscribirte a Sentia Premium.</p>
          <p style="font-size: 16px; color: #555555; text-align: center;">
            Ahora tienes acceso a todo nuestro contenido exclusivo, hasta el ${expirationDate}. ¡Disfrútalo!
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
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

  async sendSubscriptionRenewalEmail(
    to: string,
    name: string,
    expirationDate: string,
  ) {
    const link = `${process.env.FRONTEND_URL}/profile`;
    const html = `
    <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        <h2 style="color: #4CAF50; text-align: center;">¡Gracias por renovar, ${name}!</h2>
        <p style="font-size: 16px; color: #555555; text-align: center;">Tu suscripción a Sentia Premium ha sido renovada con éxito.</p>
        <p style="font-size: 16px; color: #555555; text-align: center;">
          Tu acceso continuará hasta el ${expirationDate}. ¡Nos alegra seguir contando contigo!
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Ir a Sentia Premium
          </a>
        </div>
        <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Gracias por seguir apoyando nuestro crecimiento.</p>
      </div>
    </div>
  `;
    await this.transporter.sendMail(
      this.commonMailOptions(to, 'Renovación de Sentia Premium', html),
    );
  }
  async sendSubscriptionTrialEmail(
    to: string,
    name: string,
    expirationDate: string,
  ) {
    const html = `
    <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        <h2 style="color: #4CAF50; text-align: center;">¡Bienvenido a tu prueba gratuita, ${name}!</h2>
        <p style="font-size: 16px; color: #555555; text-align: center;">Has activado tu prueba de 7 días en Sentia Premium.</p>
        <p style="font-size: 16px; color: #555555; text-align: center;">
          Tendrás acceso completo a nuestro contenido exclusivo hasta el ${expirationDate}. ¡Aprovecha esta experiencia premium!
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Explorar Sentia Premium
          </a>
        </div>
        <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Esperamos que disfrutes esta prueba. ¡Gracias por unirte a Sentia!</p>
      </div>
    </div>
  `;

    await this.transporter.sendMail(
      this.commonMailOptions(to, 'Tu prueba gratuita en Sentia Premium', html),
    );
  }

  async sendSubscriptionExpiredEmail(to: string, name: string) {
    const link = `${process.env.FRONTEND_URL}/`;
    const html = `
      <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <h2 style="color: #ff9800; text-align: center;">Tu suscripción a Sentia ha expirado, ${name}.</h2>
          <p style="font-size: 16px; color: #555555; text-align: center;">Tu acceso a Sentia Premium ha finalizado.</p>
          <p style="font-size: 16px; color: #555555; text-align: center;">
            Para seguir disfrutando de todo nuestro contenido exclusivo, renueva tu suscripción.
          </p>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${link}" style="background-color: #ff9800; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
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

  async sendSubscriptionReminderEmail(
    to: string,
    name: string,
    expirationDate: string,
  ) {
    const link = `${process.env.FRONTEND_URL}/`;
    const html = `
    <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        <h2 style="color: #2196f3; text-align: center;">Tu suscripción a Sentia está por expirar, ${name}.</h2>
        <p style="font-size: 16px; color: #555555; text-align: center;">Quedan 2 días para que finalice tu acceso a Sentia Premium.</p>
        <p style="font-size: 16px; color: #555555; text-align: center;">
          Tienes acceso hasta el ${expirationDate}. No pierdas tu contenido favorito, ¡renueva a tiempo!
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="${link}" style="background-color: #2196f3; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Renovar suscripción
          </a>
        </div>
        <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 30px;">Gracias por ser parte de Sentia.</p>
      </div>
    </div>
  `;

    await this.transporter.sendMail(
      this.commonMailOptions(to, 'Tu suscripción está por expirar', html),
    );
  }

  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
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

  async sendWelcomeLoginGoogle(to: string, name: string) {
    const token = this.jwtService.sign(
      { email: to },
      {
        expiresIn: '1h', // token válido por 1 hora
        secret: process.env.JWT_SECRET,
      },
    );

    const link = `https://tu-frontend.com/create-password?token=${token}`;

    const html = `
    <div style="font-family: 'Arial', sans-serif; background-color: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
        <h2 style="color: #4CAF50; text-align: center;">¡Hola ${name}!</h2>
        <p style="font-size: 16px; color: #555555; text-align: center;">Has iniciado sesión correctamente en <strong>Sentia</strong>.</p>
        <p style="font-size: 16px; color: #555555; text-align: center;">
          Para proteger tu cuenta, te recomendamos crear una contraseña personalizada.
        </p>
        <div style="text-align: center; margin-top: 30px;">
          <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Crear contraseña
          </a>
        </div>
        <p style="font-size: 14px; color: #777777; text-align: center; margin-top: 30px;">
          Si ya configuraste tu contraseña, puedes ignorar este mensaje.
        </p>
        <p style="font-size: 12px; color: #aaaaaa; text-align: center; margin-top: 20px;">
          Este correo fue enviado automáticamente. No respondas a este mensaje.
        </p>
      </div>
    </div>
  `;

    await this.transporter.sendMail(
      this.commonMailOptions(
        to,
        'Bienvenido a Sentia - Crea tu contraseña',
        html,
      ),
    );
  }
}
