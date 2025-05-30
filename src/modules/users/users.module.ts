import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailerModule } from '../mailer/mailer.module';
import { UserState } from '../user-state/entities/user-state.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmotionsModule } from '../emotions/emotions.module';
import { AuthModule } from '../auth/auth.module';
import { FilesUploadRepository } from 'src/cloudinary/files-upload.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserState]),
    MailerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES') || '1H',
        },
      }),
    }),
    EmotionsModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, FilesUploadRepository],
  exports: [UsersService, JwtModule],
})
export class UsersModule {}
