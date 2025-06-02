import {
  Controller,
  Get,
  Post,
  Body,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { SetPasswordDto } from './dto/set-password.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  @Post('signup')
  @ApiOperation({ summary: 'Registrar nuevo usuario con email y contraseña' })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ status: 201, description: 'Usuario registrado correctamente.', })
  async signup(@Body() data: SignUpDto) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    return await this.authService.signUp(data);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesion con email y contraseña.' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'Usuario autenticado correctamente. Se retorna token y satos del usuario', })
  async signin(
    @Body() data: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, user } = await this.authService.signIn(data);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    return { user, token };
  }

  /**
   * Login con Google desde frontend (POST)
   * {
   *   name: 'sentia',
   *   email: 'pfsentia@gmail.com',
   *   image: 'https://lh3.googleusercontent.com/a/...',
   *   sub: '115610386182944254964'
   * }
   */
  @Post('google')
  @ApiOperation({ summary: 'Iniciar sesión con Google (datos enviados desde frontend)', })
  @ApiBody({
    schema: {
      type: 'object', properties: {
        name: { type: 'string', example: 'Juan Pérez' },
        email: { type: 'string', example: 'juan@gmail.com' },
        profileImage: { type: 'string', example: 'https://lh3.googleusercontent.com/a/...', },
        sub: { type: 'string', example: '115610386182944254964' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Usuario autenticado con Google' })
  async googleManualLogin(
    @Body() googleUserData: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!googleUserData?.email || !googleUserData?.sub) {
      return { error: 'Faltan datos del usuario de Google' };
    }

    const { token, user } = await this.authService.googleLoginManual({
      name: googleUserData.name,
      email: googleUserData.email,
      profileImage: googleUserData.profileImage,
      sub: googleUserData.sub,
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { user, token };
  }

  @Get('logout')
  @ApiOperation({ summary: 'Cerrar sesion (limpia cookie)' })
  @ApiResponse({ status: 200, description: 'Sesion cerrada correctamente' })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return { message: 'Sesion cerrada correctamente' };
  }

  @Post('set-password')
  @ApiOperation({ summary: 'Agregar contraseña a cuenta creada con Google' })
  @ApiBody({ type: SetPasswordDto })
  @ApiResponse({ status: 200, description: 'Contraseña agregada correctamente', })
  async setPassword(@Body() data: SetPasswordDto) {
    return this.authService.addPasswordToGoogleUser(data);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Solicitar enlace de restablecimiento de contraseña', })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@gmail.com' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Enlace de recuperacion enviado por correo', })
  async fotgotPassword(@Body('email') email: string) {
    return this.authService.sendPasswrodResetToken(email);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Restablecer contraseña usando un token de recuperacion', })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'JWT_TOKEN_AQUI' },
        newPassword: { type: 'string', example: 'NuevaClave123!' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Contraseña restablecida exitosamente.', })
  async resetPassword(@Body() data: { token: string; newPassword: string }) {
    return this.authService.resetPassword(data.token, data.newPassword);
  }
}
