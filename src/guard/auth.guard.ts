
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService, private configService: ConfigService) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No hay token');
    }

    try {
      const secret = this.configService.get<string>('JWT_SECRET');

      if (!secret) {
        throw new UnauthorizedException('JWT_SECRET no configurado');
      }

      const payload = this.jwtService.verify(token, { secret });

      const user = {
        id: payload.sub,
        email: payload.email,
        role: payload.role,
      };

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalido o expirado')
    }



  }
}