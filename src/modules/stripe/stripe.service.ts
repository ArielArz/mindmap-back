import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { Subscription } from '../subscription/entities/subscription.entity';
import { Repository } from 'typeorm';
import { SubscriptionService } from '../subscription/subscription.service';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);
  @InjectRepository(Subscription)
  private readonly subscriptionRepository: Repository<Subscription>;

  constructor(
    private readonly configService: ConfigService,
    private readonly subscriptionService: SubscriptionService,
  ) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) throw new Error('STRIPE_SECRET_KEY not defined');

    this.stripe = new Stripe(stripeKey, {
      apiVersion: '2022-11-15',
    });
  }

  async createCheckoutSession(userId: string) {
    const baseUrl =
      this.configService.get<string>('CLIENT_URL') ?? 'http://localhost:3000';

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: this.configService.getOrThrow('STRIPE_PRICE_ID'),
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: { userId },
    });

    return { url: session.url! };
  }

  async handleWebhook(payload: Buffer, sig: string) {
    const webhookSecret = this.configService.getOrThrow(
      'STRIPE_WEBHOOK_SECRET',
    );

    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(payload, sig, webhookSecret);
    } catch (err) {
      this.logger.error('Invalid Stripe webhook signature', err);
      throw err;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      if (!userId) {
        this.logger.warn('Missing userId in session metadata');
        return;
      }
      const days = 30;
      await this.subscriptionService.createSubscription({ userId }, days);
      this.logger.log(`Subscription created for user ${userId}`);
    }
  }
}
