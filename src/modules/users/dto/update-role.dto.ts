import { IsEnum, IsUUID } from "class-validator";
import { UserRole } from "../entities/enum/user-role.enum";

export class ChangeRoleDto {
  @IsUUID()
  userId: string;

  @IsEnum(UserRole)
  newRole: UserRole;
}
