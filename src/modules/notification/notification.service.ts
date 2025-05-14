import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '../mailer/mailer.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UsersService,
  ) {}

  @Cron(CronExpression.EVERY_WEEKDAY)
  async sendEmailsUsers() {
    const premiumUsers = await this.userService.getPremiumUsers();

    for (const user of premiumUsers) {
      try {
        await this.mailerService.sendWeeklyEmail(user.email, user.name);
        console.log(`Correo enviado a ${user.email}`);
      } catch (error) {
        console.error(`Error al enviar correo a ${user.email}`, error);
      }
    }
  }
}
