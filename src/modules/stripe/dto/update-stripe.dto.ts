import { PartialType } from '@nestjs/mapped-types';
import { CreateStripeDto } from './create-stripe.dto';

export class UpdateStripeDto extends PartialType(CreateStripeDto) {}
