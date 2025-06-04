import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/enum/user-role.enum';

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

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obtener todos los mensajes de contacto (ADMIN)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de mensajes obtenida exitosamente.',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado.',
  })
  findAll() {
    return this.contactService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obtener un mensaje de contacto por ID (ADMIN)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del contacto' })
  @ApiResponse({
    status: 200,
    description: 'Mensaje de contacto obtenido exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Mensaje de contacto no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Actualizar un mensaje de contacto (ADMIN)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del contacto' })
  @ApiResponse({
    status: 200,
    description: 'Mensaje actualizado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos.',
  })
  @ApiResponse({
    status: 404,
    description: 'Mensaje de contacto no encontrado.',
  })
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar un mensaje de contacto (ADMIN)' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del contacto' })
  @ApiResponse({
    status: 200,
    description: 'Mensaje eliminado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Mensaje de contacto no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.contactService.remove(+id);
  }
}
