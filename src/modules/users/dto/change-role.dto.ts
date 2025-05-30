import { IsEnum, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../entities/enum/user-role.enum';

export class ChangeRoleDto {
  @ApiProperty({
    description: 'ID del usuario al que se le cambiará el rol',
    example: 'd9b1c2f6-4cfa-4d9f-9a15-8df5d0f1f9e2',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'Nuevo rol del usuario',
    enum: UserRole,
    example: UserRole.PREMIUM,
  })
  @IsEnum(UserRole, { message: 'El rol debe ser válido' })
  newRole: UserRole;
}
