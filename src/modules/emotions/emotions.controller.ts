import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmotionsService } from './emotions.service';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';

@Controller('emotions')
export class EmotionsController {
  constructor(private readonly emotionsService: EmotionsService) {}

  @Post()
  create(@Body() createEmotionDto: CreateEmotionDto) {
    return this.emotionsService.create(createEmotionDto);
  }

  @Get()
  findAll() {
    return this.emotionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emotionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmotionDto: UpdateEmotionDto) {
    return this.emotionsService.update(+id, updateEmotionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emotionsService.remove(+id);
  }
}
