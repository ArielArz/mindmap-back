import { PartialType } from '@nestjs/mapped-types';
import { CreateUserStateDto } from './create-user-state.dto';

export class UpdateUserStateDto extends PartialType(CreateUserStateDto) {}
