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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from './entities/enum/user-role.enum';
import { RolesGuard } from 'src/guard/roles.guard';
import { isUUID } from 'class-validator';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { PaginationAndFilterDto } from './dto/pagination-and-filter.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserStatus } from './entities/enum/user-status.enum';
import { ChangeAdminDto } from './dto/update-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado correctamente.' })
  async create(@Body() createUserDto: UserDto) {
    const user = await this.usersService.createUser(createUserDto);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      profileImage: user.profileImage,
      address: user.address,
    };
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
  @ApiQuery({
    name: 'status',
    required: false,
    enum: UserStatus,
    example: 'Activo',
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll(@Query() paginationDto: PaginationAndFilterDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get('count/total')
  @ApiOperation({ summary: 'Cantidad total de usuarios registrados' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countTotalUsers() {
    return this.usersService.countTotalUsers();
  }

  @Get('count/last-7-days')
  @ApiOperation({
    summary: 'Cantidad de usuarios registrados en los ultimos 7 dias',
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countUserLast7Days() {
    return this.usersService.countUserLast7Days();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
  @ApiResponse({ status: 400, description: 'UUID inválido.' })
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Formato UUID invalido');
    }
    return this.usersService.findOne(id);
  }

  @Patch('status')
  @ApiOperation({
    summary: 'Actualizar el estado de un usuario (ACTIVE, INACTIVE, BANNED)',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateStatus(
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<{ message: string }> {
    console.log('DTO recibido:', updateUserStatusDto);
    return this.usersService.updateStatus(updateUserStatusDto);
  }

  @Patch('update/password')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Actualizar contraseña del usuario' })
  async updatePassword(@Request() req, @Body() dto: UpdatePasswordDto) {
    const userId = req.user.id;
    return this.usersService.updatePassword(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Patch('change/admin')
  @ApiOperation({
    summary: 'Actualizar datos de usuario (rol, estado, email, etc)',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  @ApiResponse({
    status: 400,
    description: 'No se realizaron cambios en el usuario.',
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBody({
    description: 'Datos a actualizar del usuario',
    type: ChangeAdminDto,
  })
  async changeAdmin(@Body() changeAdminDto: ChangeAdminDto) {
    return this.usersService.changeAdmin(changeAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar (no eliminar) un usuario existente' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Usuario desactivado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async remove(@Param('id') id: string) {
    return this.usersService.desactivate(id);
  }

  @Get('seed/users')
  @ApiOperation({ summary: 'Cargar usuarios y estados' })
  @ApiResponse({
    status: 201,
    description: 'Usuarios y estados creados correctamente.',
  })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  addUsuariosYEstados() {
    return this.usersService.seedUsuariosYEstados();
  }

  @Post('admin-create')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('profileImage'))
  async createByAdmin(
    @Body() dto: CreateUserByAdminDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
        'image/svg+xml',
      ];
      const maxSize = 300 * 1024; // 300 KB

      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          'Formato de imagen no válido. Los formatos permitidos son: jpg, jpeg, png, webp, svg.',
        );
      }

      if (file.size > maxSize) {
        throw new BadRequestException('La imagen no debe superar los 300KB.');
      }
    }

    try {
      return await this.usersService.createByAdmin(dto, file);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
