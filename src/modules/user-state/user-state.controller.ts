import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserStateService } from './user-state.service';
import { CreateUserStateDto } from './dto/create-user-state.dto';
import { UpdateUserStateDto } from './dto/update-user-state.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User State')
@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller('user_state')
export class UserStateController {
  constructor(private readonly userStateService: UserStateService) { }

  @Post()
  @ApiOperation({ summary: 'Crear estado emocional del usuario' })
  @ApiResponse({ status: 201, description: 'Estado creado correctamente.' })
  @ApiBody({ type: CreateUserStateDto })
  create(@Body() createUserStateDto: CreateUserStateDto) {
    return this.userStateService.create(createUserStateDto);
  }
  // GET /user_state: obtener emociones del usuario (por fecha o rango)

  @Get()
  @ApiOperation({ summary: 'Obtener todos los estados emocionales del usuario' })
  @ApiResponse({ status: 200, description: 'Listado de estados obtenido correctamente.' })
  findAll() {
    return this.userStateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un estado emocional específico por ID' })
  @ApiResponse({ status: 200, description: 'Estado encontrado.' })
  @ApiResponse({ status: 404, description: 'Estado no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.userStateService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un estado emocional del usuario' })
  @ApiResponse({ status: 200, description: 'Estado actualizado correctamente.' })
  @ApiResponse({ status: 404, description: 'Estado no encontrado.' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateUserStateDto })
  update(@Param('id') id: string, @Body() updateUserStateDto: UpdateUserStateDto) {
    return this.userStateService.update(+id, updateUserStateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un estado emocional del usuario' })
  @ApiResponse({ status: 200, description: 'Estado eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Estado no encontrado.' })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id') id: string) {
    return this.userStateService.remove(id);
  }
}
