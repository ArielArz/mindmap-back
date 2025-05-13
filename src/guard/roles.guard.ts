import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/modules/users/entities/enum/user-role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: { id: string; email: string; role: UserRole } = request.user;

    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('No tenés permiso para acceder a esta ruta');
    }

    return true;
  }
}