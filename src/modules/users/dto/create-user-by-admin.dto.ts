import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { UserRole } from '../entities/enum/user-role.enum';

export class CreateUserByAdminDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsEnum(UserRole)
  role: UserRole;
}
