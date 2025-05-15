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
import { UsersService } from './users.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { UserRole } from './entities/enum/user-role.enum';
import { RolesGuard } from 'src/guard/roles.guard';
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  create(@Body() createUserDto: UserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthenticationGuard, RolesGuard)
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario existente' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}