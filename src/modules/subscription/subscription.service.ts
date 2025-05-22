import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { MailerService } from '../mailer/mailer.service';

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

      const formattedEndDate = newEndDate.toLocaleDateString(
        'es-ES',
        dateFormatterOptions,
      );
      await this.mailerService.sendSubscriptionRenewalEmail(
        user.email,
        user.name,
        formattedEndDate,
      );
      return `Suscripción renovada hasta el ${formattedEndDate}`;
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
      return `Suscripción activa hasta el ${formattedEndDate}`;
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
    }
  }

  async createTrialSubscription(userId: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const existingTrial = await this.subscriptionRepo.findOne({
      where: { userId },
    });

    if (existingTrial) throw new Error('User already had a trial subscription');

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

    return trial;
  }

  findAll() {
    return `This action returns all subscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  // update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
  //   return `This action updates a #${id} subscription`;
  // }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
