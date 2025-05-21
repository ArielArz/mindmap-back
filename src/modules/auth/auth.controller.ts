import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { SetPasswordDto } from './dto/set-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  @Post('signup')
  async signup(@Body() data: SignUpDto) {
    const user = await this.userRepository.findOneBy({ email: data.email })
    return await this.authService.signUp(data);
  }


  @Post('signin')
  async signin(@Body() data: SignInDto, @Res({ passthrough: true }) res: Response) {
    const { token, user } = await this.authService.signIn(data);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24, // 1 día
    });

    // Para no enviar password en la respuesta:
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
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
  async googleManualLogin(@Body() googleUserData: any, @Res({ passthrough: true }) res: Response){
    // Validacion minima
    if(!googleUserData?.email || !googleUserData?.sub){
      return { error: 'Faltan datos del usuario de Google' };
    }
    
    const { token, user } = await this.authService.googleLoginManual({
      name: googleUserData.name,
      email: googleUserData.email,
      profileImage: googleUserData.profileImage,
      sub: googleUserData.sub,
    });

    res.cookie('token', token, {
      httpOnly:true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
    });

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  // Google OAuth - inicio del flujo
  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(){
  //   // Passport intercepta y redirige
  // }

  // // Google Oauth - redireccion
  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() req: any,@Res({ passthrough: true }) res: Response) {
  //   const { user, token } = await this.authService.validateGoogleUser(req.user);

  //   res.cookie('token', token, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     maxAge: 1000 * 60 * 60 * 24, // 1 dia
  //   });

  //   res.redirect(`${process.env.API_FRONT}/sentia`);
  // }

  // Logout: limpiar cookie
  @Get('logout')
  @UseGuards(AuthenticationGuard)
  async logout(@Res({ passthrough: true }) res: Response){
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return { message: 'Sesion cerrada correctamente' };
  }

  @Post('set-password')
  async setPassword(@Body() data: SetPasswordDto){
    return this.authService.addPasswordToGoogleUser(data);
  }

  @Post('forgot-password')
  async fotgotPassword(@Body('email') email: string){
    return this.authService.sendPasswrodResetToken(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() data: { token: string, newPassword: string }) {
    return this.authService.resetPassword(data.token, data.newPassword)
  }
}
