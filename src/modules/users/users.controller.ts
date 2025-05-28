import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { UserRole } from './entities/enum/user-role.enum';
import { RolesGuard } from 'src/guard/roles.guard';
import { isUUID } from 'class-validator';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationAndFilterDto } from './dto/pagination-and-filter.dto';
import { ChangeRoleDto } from './dto/update-role.dto';
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
  create(@Body() createUserDto: UserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios con paginación, filtros y búsqueda',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuarios obtenida con éxito.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'sortBy', required: false, type: String, example: 'name' })
  @ApiQuery({
    name: 'sortDirection',
    required: false,
    type: String,
    enum: ['ASC', 'DESC'],
    example: 'ASC',
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: UserRole,
    example: 'premium',
  })
  @ApiQuery({ name: 'search', required: false, type: String, example: 'juan' })
  // @UseGuards(AuthenticationGuard, RolesGuard)
  // @Roles(UserRole.ADMIN)
  findAll(@Query() paginationDto: PaginationAndFilterDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 400, description: 'UUID inválido.' })
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return this.usersService.findOne(id);
  }

  @Patch('update/password')
  @UseGuards(AuthenticationGuard)
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Actualizar contraseña del usuario' })
  async updatePassword(@Request() req, @Body() dto: UpdatePasswordDto) {
    const userId = req.user.id;
    return this.usersService.updatePassword(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @UseGuards(AuthenticationGuard, RolesGuard)
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }


  @Patch('change/role')
  @ApiOperation({ summary: 'Cambiar rol de usuario' })
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, description: 'Rol cambiado correctamente.' })
  async changeUserRole(@Body() changeRoleDto: ChangeRoleDto) {
    return this.usersService.changeRole(changeRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario existente' })
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({ status: 200, description: 'Usuario eliminado correctamente.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Get('seed/users')
  @ApiOperation({ summary: 'Cargar usuarios y estados' })
  @ApiResponse({
    status: 201,
    description: 'Usuarios y estados creados correctamente.',
  })
  addUsuariosYEstados() {
    return this.usersService.seedUsuariosYEstados();
  }

}
