import { IsEnum, IsUUID } from 'class-validator';
import { UserRole } from '../entities/enum/user-role.enum'; // Asegúrate de que esta ruta sea correcta

export class ChangeRoleDto {
  @IsUUID()
  userId: string;

  @IsEnum(UserRole, { message: 'El rol debe ser válido' })
  newRole: UserRole;
}
