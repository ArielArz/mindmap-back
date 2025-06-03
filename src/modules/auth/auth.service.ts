import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SetPasswordDto } from './dto/set-password.dto';
import { MailerService } from '../mailer/mailer.service';
import { UserStatus } from '../users/entities/enum/user-status.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      if (existingUser.password) {
        throw new BadRequestException(
          'El correo ya está registrado manualmente',
        );
      } else {
        throw new BadRequestException(
          'El correo está registrado mediante Google',
        );
      }
    }

    const user = await this.usersService.createUser(signUpDto);

    // Enviar correo de bienvenida
    await this.mailerService.sendWelcomeEmail(user.email, user.name);

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

    // validar que el usuario este activo
    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException(
        'Este usuario ha sido inhabilitado y no puede iniciar sesion',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Credenciales invalidas -BCR');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        profileImage: user.profileImage,
        subscription: user.subscriptions.map((subscription) => ({
          active: subscription.active,
          isTrial: subscription.isTrial,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
        })),
      },
    };
  }

  // Autenticacion con Google OAuth
  async validateGoogleUser(googleUser: any) {
    let user = await this.usersService.findOneByEmail(googleUser.email);

    //Validar que el usuario este activo
    if (user && user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException(
        'Este usuario ha sido unhabilitado y no puede iniciar sesion',
      );
    }

    // Genera contraseña aleatoria
    const randomPassword = crypto.randomBytes(10).toString('base64url'); // por ejemplo, 10 bytes → ~14 caracteres

    if (!user) {
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await this.usersService.createUser({
        name: googleUser.name,
        email: googleUser.email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        address: '',
        profileImage: googleUser.profileImage || '',
      });
    }

    //Enviar correo con la contraseña generada
    try {
      await this.mailerService.sendGeneratedPasswordEmail(
        user.email,
        user.name,
        randomPassword,
      );
    } catch (error) {
      console.warn(
        `No se pudo enviar el email con la contraseña a ${user.email}:`,
        error.message,
      );
    }

    // Enviar correo de bienvenida
    try {
      await this.mailerService.sendWelcomeLoginGoogle(user.email, user.name);
    } catch (error) {
      console.warn(
        `No se pudo enviar el email de bienvenida a ${user.email}:`,
        error.message,
      );
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        profileImage: user.profileImage,
        subscription: user.subscriptions.map((subscription) => ({
          active: subscription.active,
          isTrial: subscription.isTrial,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
        })),
      },
    };
  }

  // Login manual con datos de Google (pruebas desde Insomnia o fronted directo)
  async googleLoginManual(googleUser: any) {
    if (!googleUser?.email || !googleUser?.sub) {
      throw new BadRequestException('Faltan datos del usuario de Google');
    }

    let user = await this.usersService.findOneByEmail(googleUser.email);

    // validar que el usuario este activo
    if (user && user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException(
        'Este usuario ha sido inhabilitado y no puede iniciar sesion',
      );
    }

    if (!user) {
      user = await this.usersService.createUser({
        name: googleUser.name,
        email: googleUser.email,
        password: '', // No se requiere
        confirmPassword: '',
        address: '',
        profileImage: googleUser.profileImage || '',
      });
    }

    // Enviar correo de bienvenida
    try {
      await this.mailerService.sendWelcomeLoginGoogle(user.email, user.name);
    } catch (error) {
      console.warn(
        `No se pudo enviar el email de bienvenida a ${user.email}:`,
        error.message,
      );
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { token, user };
  }

  // Metodo para establecer contraseña a usuarios de Google
  async addPasswordToGoogleUser(data: SetPasswordDto) {
    const { email, newPassword, confirmPassword } = data;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('El usuario no existe');
    }

    if (user.password) {
      throw new BadRequestException(
        'Este usuario ya tiene una contraseña asignada',
      );
    }

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.usersService.saveUser(user);

    return {
      message:
        'Contraseña asignada correctamente, Ya pudes iniciar sesion manualmente.',
    };
  }

  // Metodo ¿Olvidaste tu contraseña?
  async sendPasswrodResetToken(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('No existe un usuario con ese email');
    }

    const token = this.jwtService.sign(
      { email },
      { secret: process.env.JWT_SECRET, expiresIn: '30m' },
    );

    //Este log te mostrará el token en la terminal
    // console.log('Token generado para reset password:', token);

    await this.mailerService.sendPasswordResetEmail(email, token);

    return { message: 'Enlace de restablecimiento enviado por correo' };
  }

  async resetPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const user = await this.usersService.findOneByEmail(payload.email);

      if (!user) {
        throw new NotFoundException('Usuario no encontrado.');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;

      await this.usersService.saveUser(user);

      return { message: 'Contraseña actualizada correctamente' };
    } catch {
      throw new UnauthorizedException('Token invalido o expirado');
    }
  }
}
