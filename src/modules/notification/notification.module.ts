import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationCronService } from './notification-cron.service';
import { MailerModule } from '../mailer/mailer.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [MailerModule, UsersModule],
  providers: [NotificationService, NotificationCronService],
  exports: [NotificationModule],
  controllers: [],
})
export class NotificationModule {}
