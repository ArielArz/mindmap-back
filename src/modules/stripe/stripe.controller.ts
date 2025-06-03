import { Controller, Post, Body, Req, Headers, HttpCode, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';



@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

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
