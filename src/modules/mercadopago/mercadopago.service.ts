import { Injectable } from '@nestjs/common';
import { MercadoPagoConfig, PreApproval } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private mp: MercadoPagoConfig;
  private preapproval: PreApproval;

  constructor() {
    this.mp = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
    });

    this.preapproval = new PreApproval(this.mp);
  }

  async createPayment(data: {
    email: string;
    monto: number;
    back_url: string;
  }): Promise<any> {
    return await this.preapproval.create({
      body: {
        reason: 'Suscripción mensual',
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: data.monto,
          currency_id: 'USD',
          start_date: new Date().toISOString(),
          end_date: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1),
          ).toISOString(),
        },
        back_url: data.back_url,
        payer_email: data.email,
      },
    });
  }
}
