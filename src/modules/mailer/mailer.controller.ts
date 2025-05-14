import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('test')
  async sendTestEmail() {
    const testEmail = 'miguelfuenzalida.n97@gmail.com';
    const testName = 'Ariel';

    await this.mailerService.sendWelcomeEmail(testEmail, testName);
    return { message: `Test email sent to ${testEmail}` };
  }
}
