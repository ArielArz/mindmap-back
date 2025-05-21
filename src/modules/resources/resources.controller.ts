import {
  Controller,
  Post,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 }, // archivo principal
      { name: 'thumbnail', maxCount: 1 }, // imagen relacionada
    ]),
  )
  create(
    @UploadedFiles() files: { file?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] },
    @Body() createDto: CreateResourceDto,
  ) {
    return this.resourcesService.create(createDto, files);
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }
  
  @Get('main-video')
  async getMainVideo() {
    return this.resourcesService.findMainVideo();
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

  @Patch('main-video/:id')
  async setMainVideo(@Param('id') id: string) {
    if (id === 'none') {
      return this.resourcesService.clearMainVideo();
    }
    return this.resourcesService.setMainVideo(id);
  }
}
