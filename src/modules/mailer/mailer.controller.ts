import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) { }

  @Get('test')
  @ApiOperation({ summary: 'Enviar un email de prueba' })
  @ApiResponse({ status: 200, description: 'Correo de prueba enviado correctamente.' })
  async sendTestEmail() {
    const testEmail = 'miguelfuenzalida.n97@gmail.com';
    const testName = 'Ariel';

    await this.mailerService.sendWelcomeEmail(testEmail, testName);
    return { message: `Test email sent to ${testEmail}` };
  }
}
