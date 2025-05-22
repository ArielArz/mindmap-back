import { Controller, Post, Body, Req, Headers, HttpCode } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('create-session')
  async createSession(@Body() body: { userId: string }) {
    return this.stripeService.createCheckoutSession(body.userId);
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Req() req: Request & { rawBody: Buffer },
    @Headers('stripe-signature') signature: string,
  ) {
    if (!req.rawBody) throw new Error('Missing raw body');

    // delegamos al servicio
    return this.stripeService.handleWebhook(req.rawBody, signature);
  }
}
