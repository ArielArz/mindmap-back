import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationCronService } from './notification-cron.service';

@Module({
  providers: [NotificationService, NotificationCronService],
  exports: [NotificationModule],
  controllers: [],
})
export class NotificationModule {}
