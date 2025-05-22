import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from 'rxjs';
import { UsersModule } from '../users/users.module';
import { SubscriptionModule } from '../subscription/subscription.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscription]),
    UsersModule,
    SubscriptionModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
