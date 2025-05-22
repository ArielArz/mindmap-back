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
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorator';

@ApiBearerAuth()
@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) { }

  @Post()
  create(@Body() createEmotionDto: CreateEmotionDto) {
    return this.emotionsService.create(createEmotionDto);
  }

  @Get('seeder')
  addEmotions() {
    return this.emotionsService.addEmotions();
  }

  @Get()
  findAll() {
    return this.emotionsService.findAll();
  }


  @Get('/puntaje')
  @UseGuards(AuthGuard('jwt'))
  async puntajeAnalisis(@Req() req) {
    const userId = req.user.id;
    return this.emotionsService.puntajeEmocionalAnalisis(userId);
  }

  @Get('/puntaje/:id')
  async puntajePorId(@Param('id') id: string) {
    return this.emotionsService.puntajeEmocionalAnalisis(id);
  }

  @Get('/analysis/daily')
  @UseGuards(AuthGuard('jwt'))
  async analysisDay(@Req() req) {
    const userId = req.user.id;
    return this.emotionsService.puntajeEmocionalAnalisis(userId, 1);
  }

  @Get('/analysis/weekly')
  @UseGuards(AuthGuard('jwt'))
  async analysisWeek(@Req() req) {
    const userId = req.user.id;
    return this.emotionsService.puntajeEmocionalAnalisis(userId, 7);
  }

  @Get('/analysis/monthly')
  @UseGuards(AuthGuard('jwt'))
  async analysisMonth(@Req() req) {
    const userId = req.user.id;
    return this.emotionsService.puntajeEmocionalAnalisis(userId, 30);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emotionsService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmotionDto: UpdateEmotionDto) {
    return this.emotionsService.update(id, updateEmotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emotionsService.remove(id);
  }
}
