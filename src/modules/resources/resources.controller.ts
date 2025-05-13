import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Express } from 'express';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // 'file' debe coincidir con el key del formulario
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDto: CreateResourceDto,
  ) {
    return this.resourcesService.create(createDto, file);
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
