import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  // Registro local de usuario
  @Post('signup')
  async signup(@Body() data: SignUpDto) {
    const user = await this.userRepository.findOneBy({ email: data.email });
    if(!user) {
      // Por momento solo registramos sin enviar correo
      return await this.authService.signUp(data);
    }
    throw new BadRequestException('El correo ya esta registrado');
  }

  // Inicio de sesion local
  // @Post('signin')
  // async signin(@Body() data: SignInDto, @Res({ passthrough: true }) res: Response){
  //   const { token, userWhitOutPassword } = await this.authService.signIn(data);

  //   res.cookie('token', token, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     maxAge: 1000 * 60 * 60 * 24,
  //   });
  // }

  // // validar sesion activa
  // @Post('session')
  // @UseGuards(AuthenticationGuard)
  // getSession(@Req() req){
  //   return req.user;
  // }

  // // Google OAuth - inicio del flujo
  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleAuth(){
  //   console.log('Inicia el proceso de autenticacion con Google.');
  // }

  // // Google OAuth - redireccion
  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() requestAnimationFrame, @Res({ passthrough: true }) res: Response){
  //   const { user, token } = await this.authService.validateGoogleUser(req.user);

  //   res.cookie('token', token, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     maxAge: 1000 * 60 * 60 * 24
  //   });
  //   res.redirected(`${process.env.API_FRONT}/sentia`);
  // }

  // // Logout: limpiar cookie
  // @Get('logout')
  // @UseGuards(AuthenticationGuard)
  // async logout(@Res({ passthrough: true }) res: Response){
  //   res.clearCookie('token', {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'none',
  //     path: '/'
  //   });
  //   return res.json({ message: 'Sesion cerrada correctamente' });
  // }

}
