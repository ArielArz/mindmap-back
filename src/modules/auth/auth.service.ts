import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';



@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Registro
  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const existingUser = await this.usersService.findOneByEmail(email);
    if(existingUser) {
      throw new BadRequestException('El correo ya esta registrado');
    }

    const user = await this.usersService.createUser(signUpDto);

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // Inicio de sesion
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.usersService.findOneByEmail(email);
    if(!user) throw new UnauthorizedException('Credenciales invalidas');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) throw new UnauthorizedException('Credenciales invalidas');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  // Autenticacion con Google OAuth
  async validateGoogleUser(googleUser: any) {
    let user = await this.usersService.findOneByEmail(googleUser.email);

    if(!user){
      user = await this.usersService.createUser({
        name: googleUser.name,
        email: googleUser.email,
        password: '', // No se necesita para Google
        confirmPassword: '',
        address: googleUser.address || 'Cuenta de Google',
        profileImage: googleUser.profileImage || '',
      });
    }

    const payload = { sub: user.id, email: user.email, role: user };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }
}
