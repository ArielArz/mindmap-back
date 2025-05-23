import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { MailerService } from '../mailer/mailer.service';
import { Between } from 'typeorm';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly mailerService: MailerService,
  ) {}

  async createSubscription(data: CreateSubscriptionDto) {
    const user = await this.userRepo.findOneBy({ id: data.userId });
    if (!user) throw new Error('User not found');

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
      newEndDate.setDate(newEndDate.getDate() + 30);
      existingSubscription.endDate = newEndDate;
      existingSubscription.active = true;
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
      const response = {
        email: user.email,
        name: user.name,
        role: user.role,
        startDate: existingSubscription.startDate.toLocaleDateString(
          'es-ES',
          dateFormatterOptions,
        ),
        endDate: existingSubscription.endDate.toLocaleDateString(
          'es-ES',
          dateFormatterOptions,
        ),
      };

      return response;
    } else {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + 37);

      const newSubscription = this.subscriptionRepo.create({
        userId: user.id,
        startDate,
        endDate,
        active: true,
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
      const response = {
        email: user.email,
        name: user.name,
        role: user.role,
        startDate: startDate.toLocaleDateString('es-ES', dateFormatterOptions),
        endDate: endDate.toLocaleDateString('es-ES', dateFormatterOptions),
      };

      return response;
    }
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

    for (const sub of upcomingSubs) {
      await this.mailerService.sendSubscriptionReminderEmail(
        sub.user.email,
        sub.user.name,
        sub.endDate.toDateString(),
      );
    }
  }
}
