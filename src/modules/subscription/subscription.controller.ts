import { Controller, Post, Body } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    const days = 30;
    return this.subscriptionService.createSubscription(
      createSubscriptionDto,
      days,
    );
  }

  @Post('extended')
  createSuscriptionExtended(
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const days = 90;
    return this.subscriptionService.createSubscription(
      createSubscriptionDto,
      days,
    );
  }

  @Post('trial')
  createTrial(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.createTrialSubscription(
      createSubscriptionDto.userId,
    );
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  // ) {
  //   return this.subscriptionService.update(id, updateSubscriptionDto);
  // }
}
