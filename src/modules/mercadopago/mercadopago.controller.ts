import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { CreatepaymentsDto } from './dto/create-payments.dto';

@Controller('payments')
export class MercadoPagoController {
  constructor(private readonly paymentService: MercadoPagoService) {}

  @Post('suscripcion')
  async crearSuscripcion(@Body() data: CreatepaymentsDto) {
    try {
      const response = await this.paymentService.createPayment(data);
      return {
        message: 'Suscripción creada correctamente',
        data: response,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Error creando suscripción',
          details: error.message || error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
