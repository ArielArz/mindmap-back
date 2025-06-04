import { Controller, Post, Body, Req, Headers, HttpCode, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Stripe')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Post('create-session')
  @ApiOperation({ summary: 'Crear una sesión de pago en Stripe' })
  @ApiResponse({
    status: 201,
    description: 'Sesión de pago creada correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos o error al crear la sesión.',
  })
  async createSession(@Body() body: { userId: string }) {
    return this.stripeService.createCheckoutSession(body.userId);
  }

  @Post('webhook')
  @HttpCode(200)
  @ApiOperation({ summary: 'Endpoint para recibir eventos de Stripe (webhook)' })
  @ApiHeader({
    name: 'stripe-signature',
    description: 'Firma del header que Stripe usa para validar el webhook',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Evento recibido y procesado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error de validación o firma inválida.',
  })
  async handleWebhook(
    @Req() req: Request & { rawBody: Buffer },
    @Headers('stripe-signature') signature: string,
  ) {
    if (!req.rawBody) throw new Error('Missing raw body');

    // delegamos al servicio
    return this.stripeService.handleWebhook(req.rawBody, signature);
  }
}
