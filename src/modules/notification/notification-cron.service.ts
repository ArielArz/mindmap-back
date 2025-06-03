import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationService } from './notification.service';

@Injectable()
export class NotificationCronService {
  constructor(private readonly notificationService: NotificationService) {}

  @Cron('0 5 * * 1')
  async handleExpireCron() {
    await this.notificationService.weeklyNotification();
  }
}
