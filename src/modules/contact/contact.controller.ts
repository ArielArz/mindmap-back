import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Contact')
@ApiBearerAuth()
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un registro del formulario de Contacto' })
  @ApiResponse({
    status: 201,
    description: 'El mensaje de contacto fue creado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos.',
  })
  sendContactMessage(@Body() body: CreateContactDto) {
    return this.contactService.create(body);
  }

}
