import { IsUUID } from 'class-validator';

export class CreateSubscriptionDto {
  @IsUUID()
  userId: string;
}
