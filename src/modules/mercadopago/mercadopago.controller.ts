import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';

class CrearSuscripcionDto {
  email: string;
  monto: number;
  back_url: string;
}

@Controller('payments')
export class MercadoPagoController {
  constructor(private readonly paymentService: MercadoPagoService) {}

  @Post('suscripcion')
  async crearSuscripcion(@Body() data: CrearSuscripcionDto) {
    try {
      const response = await this.paymentService.crearSuscripcion(data);
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
