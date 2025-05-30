import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { RolesGuard } from 'src/guard/roles.guard';

@ApiTags('emotions')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Post()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Crear una emocion' })
  @ApiResponse({ status: 201, description: 'Emocion creada' })
  create(@Body() createEmotionDto: CreateEmotionDto) {
    return this.emotionsService.create(createEmotionDto);
  }

  @Get('seeder')
  @ApiOperation({ summary: 'Cargar emociones base en la BD' })
  @ApiResponse({ status: 201, description: 'Emociones creadas correctamente' })
  addEmotions() {
    return this.emotionsService.addEmotions();
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las emociones' })
  @ApiResponse({ status: 200, description: 'Lista de emociones obtenida' })
  findAll() {
    return this.emotionsService.findAll();
  }

  @Get('/puntaje')
  @ApiOperation({
    summary: 'Obtener puntaje emocional del usuario autenticado',
  })
  @ApiResponse({ status: 200, description: 'Puntaje emocional obtenido' })
  async puntajeAnalisis(@Req() req) {
    const userId = req.user.id;
    return this.emotionsService.puntajeEmocionalAnalisis(userId);
  }

  @Get('/puntaje/:id')
  @ApiOperation({ summary: 'Obtener puntaje emocional por ID de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Puntaje emocional del usuario obtenido',
  })
  async puntajePorId(@Param('id') id: string) {
    return this.emotionsService.puntajeEmocionalAnalisis(id);
  }

  @Get('/analysis/daily')
  @ApiOperation({
    summary: 'Análisis emocional diario del usuario autenticado',
  })
  async analysisDay(@Req() req) {
    const userId = req.user.id;
    return this.emotionsService.puntajeEmocionalAnalisis(userId, 1);
  }

  @Get('/analysis/weekly')
  @ApiOperation({
    summary: 'Análisis emocional semanal del usuario autenticado',
  })
  async analysisWeek0(@Req() req) {
    const userId = req.user.id;
    return this.emotionsService.puntajeEmocionalAnalisis(userId, 7);
  }

  @Get('/analysis/monthly')
  @ApiOperation({
    summary: 'Análisis emocional mensual del usuario autenticado',
  })
  async analysisMonth0(@Req() req) {
    const userId = req.user.id;
    return this.emotionsService.puntajeEmocionalAnalisis(userId, 30);
  }

  @Get('/analysis/daily/:oid')
  @ApiOperation({ summary: 'Análisis emocional diario de un usuario por ID' })
  async analysisDay0(@Param('oid') oid: string) {
    return this.emotionsService.puntajeEmocionalAnalisis(oid, 1);
  }

  @Get('/analysis/weekly/:oid')
  @ApiOperation({ summary: 'Análisis emocional semanal de un usuario por ID' })
  async analysisWeek(@Param('oid') oid: string) {
    return this.emotionsService.puntajeEmocionalAnalisis(oid, 7);
  }

  @Get('/analysis/monthly/:oid')
  @ApiOperation({ summary: 'Análisis emocional mensual de un usuario por ID' })
  async analysisMonth(@Param('oid') oid: string) {
    return this.emotionsService.puntajeEmocionalAnalisis(oid, 30);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una emoción por ID' })
  findOne(@Param('id') id: string) {
    return this.emotionsService.findOne(id);
  }
  @Patch(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Actualizar un estado emocional por ID' })
  update(@Param('id') id: string, @Body() updateEmotionDto: UpdateEmotionDto) {
    return this.emotionsService.update(id, updateEmotionDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Eliminar un estado emocional por ID' })
  remove(@Param('id') id: string) {
    return this.emotionsService.remove(id);
  }
}
