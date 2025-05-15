import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { CLIENT_RENEG_WINDOW } from "tls";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super(
            {
                clientID: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
                callbackURL: `${process.env.API_BACKEND}/auth/google/redirect`,
                scope: ['email', 'profile'],
            }
        );
    }

    validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
): any {
    const { name, emails, photos } = profile;

    const user = {
        email: emails[0].value,
        name: name.givenName,
        profileImage: photos[0].value,
        googleId: profile.id,
    };

    done(null, user);
}
}