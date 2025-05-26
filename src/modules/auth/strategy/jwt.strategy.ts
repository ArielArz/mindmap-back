import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
  role: string; //Agregar el rol al payload para gestionar autorizaciones basadas en roles
}



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),  // Primero busca en el header Authorization
        (req) => req?.cookies?.token,               // Luego en la cookie 'token'
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  async validate(payload: any): Promise<{ id: string; email: string; role: string }> {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };
  }


}
