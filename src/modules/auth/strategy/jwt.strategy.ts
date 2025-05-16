import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
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
                (req) => req?.cookies?.token,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || '',
        });
    }

    validate(payload: JwtPayload): { userId: string; email: string; role:string } {
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
}
