import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private readonly authService: AuthService){
        super(
            {
                clientID: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
                callbackURL: `${process.env.API_BACKEND}/auth/google/redirect`,
                scope: ['email', 'profile'],
            }
        );
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
    const { name, emails, photos } = profile;

    const user = {
      email: emails[0].value,
      name: name.givenName,
      profileImage: photos[0].value,
      googleId: profile.id,
    };

    try {
        const validateUser = await this.authService.validateGoogleUser(user);
        return done(null, validateUser);
    } catch (err){
        return done(new UnauthorizedException('Error al autenticar con Google'), false)
    }
}
}
