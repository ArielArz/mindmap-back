import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Subscription')
@ApiBearerAuth()
@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) { }

  @Post()
  @ApiOperation({ summary: 'Crear una suscripcion' })
  createSubscription(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    const days = 30;
    return this.subscriptionService.createSubscription(
      createSubscriptionDto,
      days,
    );
  }

  @Post('extended')
  @ApiOperation({ summary: 'Crear una suscripcion extendida' })
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
  @ApiOperation({ summary: 'Crear una suscripcion de prueba' })
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
