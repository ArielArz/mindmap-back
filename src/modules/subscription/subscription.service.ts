import { Injectable } from '@nestjs/common';
import { LessThan, Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
// import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepo: Repository<Subscription>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createSubscription(data: CreateSubscriptionDto) {
    const user = await this.userRepo.findOneBy({ id: data.userId });
    if (!user) throw new Error('User not found');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30);

    const subscription = this.subscriptionRepo.create({
      user,
      startDate,
      endDate,
      active: true,
    });

    await this.subscriptionRepo.save(subscription);

    user.role = UserRole.PREMIUM;
    await this.userRepo.save(user);

    return subscription;
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
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['subscriptions'],
    });

    if (!user) throw new Error('User not found');

    const existingTrial = await this.subscriptionRepo.findOne({
      where: {
        user: { id: userId },
        isTrial: true,
      },
    });

    if (existingTrial) throw new Error('User already had a trial subscription');

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 7);

    const trial = this.subscriptionRepo.create({
      user,
      startDate,
      endDate,
      active: true,
      isTrial: true,
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
