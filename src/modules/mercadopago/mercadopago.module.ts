import { Module } from '@nestjs/common';
import { MercadoPagoService } from './mercadopago.service';
import { MercadoPagoController } from './mercadopago.controller';

@Module({
  providers: [MercadoPagoService],
  controllers: [MercadoPagoController],
})
export class MercadopagoModule {}
