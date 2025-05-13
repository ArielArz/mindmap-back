import { SetMetadata } from '@nestjs/common';
import { UserRole } from "src/modules/users/entities/enum/user-role.enum";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);