import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { EmotionsModule } from './modules/emotions/emotions.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { UsersModule } from './modules/users/users.module';
import { HelppointsModule } from './modules/helppoints/helppoints.module';
import { UserStateModule } from './modules/user-state/user-state.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import typeormConfig from './config/typeorm.config';
import { MailerModule } from './modules/mailer/mailer.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ContactModule } from './modules/contact/contact.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { ChatbotModule } from './modules/chatbot/chatbot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const typeOrmConfig = config.get<DataSourceOptions>('typeorm');
        return {
          ...typeOrmConfig,
          autoLoadEntities: true,
        };
      },
    }),
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1h' },
    // }),
    ScheduleModule.forRoot(),
    AuthModule,
    EmotionsModule,
    ResourcesModule,
    UsersModule,
    HelppointsModule,
    UserStateModule,
    MailerModule,
    ContactModule,
    SubscriptionModule,
    StripeModule,
    ChatbotModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
