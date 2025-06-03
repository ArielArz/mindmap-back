import { Injectable } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UsersService,
  ) {}

  async weeklyNotification() {
    const notificationsUsers = await this.userService.getNotificationUsers();

    for (const user of notificationsUsers) {
      try {
        await this.mailerService.sendWeeklyEmail(user.email, user.name);
        console.log(`Correo enviado a ${user.email}`);
      } catch (error) {
        console.error(`Error al enviar correo a ${user.email}`, error);
      }
    }
  }
}
