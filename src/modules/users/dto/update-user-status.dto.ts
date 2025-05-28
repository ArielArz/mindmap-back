import { IsEnum, IsUUID } from 'class-validator';
import { UserStatus } from '../entities/enum/user-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserStatusDto {
  @ApiProperty({
    example: '13e6f02c-76a8-4b30-8a9f-5b1e3c6f92df',
    description: 'ID del usuario al que se le cambiará el estado.',
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    example: UserStatus.BANNED,
    enum: UserStatus,
    description: 'Nuevo estado del usuario (ACTIVE, INACTIVE, BANNED)',
  })
  @IsEnum(UserStatus, {
    message: 'El estado debe ser ACTIVE, INACTIVE o BANNED.',
  })
  status: UserStatus;
}
