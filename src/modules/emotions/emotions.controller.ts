import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

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


  // IEG = suma de todos los puntajes emocionales / cantidad total de registros

  // GET /analysis/weekly: devolver resumen semanal por emoción + IEG

  // GET /analysis/monthly: lo mismo para mes

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
