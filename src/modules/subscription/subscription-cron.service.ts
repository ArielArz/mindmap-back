import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SubscriptionService } from './subscription.service';

@Injectable()
export class SubscriptionCronService {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Cron('0 0 * * *') // Corre todos los días a la medianoche
  handleCron() {
    this.subscriptionService.expireSubscriptions();
  }
}
