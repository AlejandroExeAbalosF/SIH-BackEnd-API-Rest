import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { customAlphabet } from 'nanoid';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_CALLBACK_URL,
      scope: ['profile', 'email'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const codeGen = customAlphabet('01234567890', 8);
    const document = codeGen();
    try {
      const user = await this.authService.validateUser({
        email: profile._json.email,
        name: profile._json.name,
        username: profile._json.email.split('@')[0],
        password: profile._json.sub,
        lastName: profile._json.family_name,
        document: Number(document),
        image: profile._json.picture,
        cellphone: 6000000613,
        googleAccount: true,
        validate: profile._json.email_verified,
        lastLogin: new Date(),
      });
      const dataUser = {
        token: accessToken,
        dataUser: {
          username: user.username,
          name: user.name,
          lastName: user.lastName,
          document: user.document,
          image: user.image,
          phone: user.phone,
          cellphone: user.cellphone,
          email: user.email,
          googleAccount: user.googleAccount,
          rol: 'googletemp',
          lastLogin: user.lastLogin,
        },
      };

      // const tokenDataUser = this.jwtService.sign(dataUser);
      return dataUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
