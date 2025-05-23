import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class SubscriptionCronService {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Cron('0 0 * * *') // Corre todos los días a la medianoche
  async handleCron() {
    await this.subscriptionService.expireSubscriptions();
  }

  @Cron('0 10 * * *') // Todos los días a las 10:00 AM
  async handleReminderCron() {
    await this.subscriptionService.notifyUpcomingExpirations();
  }
}
