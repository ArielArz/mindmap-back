import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/enum/user-role.enum';

export class CreateUserByAdminDto {
  @ApiProperty({
    example: 'Ana López',
    description: 'Nombre completo del usuario.',
    minLength: 3,
    maxLength: 80,
  })
  @IsString()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    example: 'ana@example.com',
    description: 'Correo electrónico válido del usuario.',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    example: 'Av. Siempre Viva 742',
    description: 'Dirección del usuario (opcional).',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    example: 'free',
    enum: UserRole,
    description: 'Rol asignado al usuario (admin, free, premium).',
  })
  @IsEnum(UserRole)
  role: UserRole;
}
