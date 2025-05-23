import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { MailerModule } from '../mailer/mailer.module';
import { SubscriptionCronService } from './subscription-cron.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription, User]),
    UsersModule,
    MailerModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionCronService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
