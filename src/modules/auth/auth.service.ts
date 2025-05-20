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
  ) { }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      if (existingUser.password) {
        throw new BadRequestException('El correo ya está registrado manualmente');
      } else {
        throw new BadRequestException('El correo está registrado mediante Google');
      }
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
    console.log('Usuario encontrado:', user);

    if (!user) throw new UnauthorizedException('Credenciales invalidas - E');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Credenciales invalidas -BCR');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  // Autenticacion con Google OAuth
  async validateGoogleUser(googleUser: any) {
    let user = await this.usersService.findOneByEmail(googleUser.email);

    if (!user) {
      user = await this.usersService.createUser({
        name: googleUser.name,
        email: googleUser.email,
        password: '', // No se necesita para Google
        confirmPassword: '',
        address: '',
        profileImage: googleUser.profileImage || '',
      });
    }

    const payload = { sub: user.id, email: user.email, role: user };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  // Login manual con datos de Google (pruebas desde Insomnia o fronted directo)
  async googleLoginManual(googleUser: any){
    if(!googleUser?.email || !googleUser?.sub){
      throw new BadRequestException('Falatan datos del usuario de Google');
    }

    let user = await this.usersService.findOneByEmail(googleUser.email);

    if(!user) {
      user = await this.usersService.createUser({
        name: googleUser.name,
        email: googleUser.email,
        password: '', // No se requiere
        confirmPassword: '',
        address: '',
        profileImage: googleUser.profileImage || '',
      });
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token, user };

  } 
}