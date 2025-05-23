import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [MailerService],
  exports: [MailerService],
  controllers: [MailerController],
})
export class MailerModule {}
