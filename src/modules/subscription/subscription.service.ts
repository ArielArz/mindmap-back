import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { MailerService } from '../mailer/mailer.service';
import { Between } from 'typeorm';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  async createSubscription(data: CreateSubscriptionDto, days: number) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error(
        'STRIPE_SECRET_KEY no está definido en las variables de entorno',
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2022-11-15',
    });

    const { userId, sessionId } = data;

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('Usuario no encontrado');

    const sessionExists = await this.subscriptionRepo.findOne({
      where: { paymentSessionId: sessionId },
    });

    if (sessionExists) {
      throw new Error('Esta sesión de pago ya fue procesada');
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session || session.payment_status !== 'paid') {
      throw new Error('El pago no se ha completado correctamente');
    }

    const existingSubscription = await this.subscriptionRepo.findOne({
      where: { userId: user.id },
    });

    const dateFormatterOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    if (existingSubscription) {
      const newEndDate = new Date(existingSubscription.endDate);
      newEndDate.setDate(newEndDate.getDate() + days);
      existingSubscription.endDate = newEndDate;
      existingSubscription.active = true;
      existingSubscription.paymentSessionId = sessionId;

      await this.subscriptionRepo.save(existingSubscription);

      user.role = UserRole.PREMIUM;
      await this.userRepo.save(user);

      const formattedEndDate = newEndDate.toLocaleDateString(
        'es-ES',
        dateFormatterOptions,
      );

      await this.mailerService.sendSubscriptionRenewalEmail(
        user.email,
        user.name,
        formattedEndDate,
      );

      return {
        email: user.email,
        name: user.name,
        role: user.role,
        startDate: existingSubscription.startDate.toLocaleDateString(
          'es-ES',
          dateFormatterOptions,
        ),
        endDate: formattedEndDate,
      };
    }

    const startDate = new Date();
    const endDate = new Date();

    const trialUsed = await this.subscriptionRepo.findOne({
      where: { userId: user.id, isTrial: true },
    });

    let totalDays = days;
    let isTrial = false;

    if (!trialUsed) {
      totalDays += 7;
      isTrial = true;
    }

    endDate.setDate(startDate.getDate() + totalDays);

    const newSubscription = this.subscriptionRepo.create({
      userId: user.id,
      startDate,
      endDate,
      active: true,
      paymentSessionId: sessionId,
      isTrial,
    });

    await this.subscriptionRepo.save(newSubscription);

    user.role = UserRole.PREMIUM;
    await this.userRepo.save(user);

    const formattedEndDate = endDate.toLocaleDateString(
      'es-ES',
      dateFormatterOptions,
    );

    await this.mailerService.sendSubscriptionConfirmationEmail(
      user.email,
      user.name,
      formattedEndDate,
    );

    return {
      email: user.email,
      name: user.name,
      role: user.role,
      startDate: startDate.toLocaleDateString('es-ES', dateFormatterOptions),
      endDate: formattedEndDate,
    };
  }

  async expireSubscriptions() {
    const now = new Date();
    const expiredSubs = await this.subscriptionRepo.find({
      where: { active: true, endDate: LessThan(now) },
      relations: ['user'],
    });

    for (const sub of expiredSubs) {
      sub.active = false;
      await this.subscriptionRepo.save(sub);

      sub.user.role = UserRole.FREE;
      await this.userRepo.save(sub.user);

      await this.mailerService.sendSubscriptionExpiredEmail(
        sub.user.email,
        sub.user.name,
      );
    }
  }

  async createTrialSubscription(userId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('Usuario no encontrado');

    const existingTrial = await this.subscriptionRepo.findOne({
      where: { userId },
    });

    if (existingTrial)
      throw new Error('Usuario ya usó la suscripción de prueba');

    const dateFormatterOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);

    const trial = this.subscriptionRepo.create({
      userId,
      startDate,
      endDate,
      active: true,
      isTrial: true,
    });

    await this.subscriptionRepo.save(trial);

    user.role = UserRole.PREMIUM;
    await this.userRepo.save(user);

    const response = {
      email: user.email,
      name: user.name,
      role: user.role,
      startDate: startDate.toLocaleDateString('es-ES', dateFormatterOptions),
      endDate: endDate.toLocaleDateString('es-ES', dateFormatterOptions),
    };
    const formattedEndDate = endDate.toLocaleDateString(
      'es-ES',
      dateFormatterOptions,
    );
    await this.mailerService.sendSubscriptionTrialEmail(
      user.email,
      user.name,
      formattedEndDate,
    );

    return response;
  }

  async notifyUpcomingExpirations() {
    const now = new Date();
    const twoDaysLater = new Date(now);
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);

    // Rango desde el inicio al final del día para más precisión
    const startOfDay = new Date(twoDaysLater.setHours(0, 0, 0, 0));
    const endOfDay = new Date(twoDaysLater.setHours(23, 59, 59, 999));

    const upcomingSubs = await this.subscriptionRepo.find({
      where: {
        active: true,
        endDate: Between(startOfDay, endOfDay),
      },
      relations: ['user'],
    });

    const dateFormatterOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    for (const sub of upcomingSubs) {
      await this.mailerService.sendSubscriptionReminderEmail(
        sub.user.email,
        sub.user.name,
        sub.endDate.toLocaleDateString('es-ES', dateFormatterOptions),
      );
    }
  }
}
