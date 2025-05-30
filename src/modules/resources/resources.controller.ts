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
  UseGuards,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { FileType } from './entities/enum/file-type.enum';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
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
    @UploadedFiles()
    files: { file?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] },
    @Body() createDto: CreateResourceDto,
  ) {
    return this.resourcesService.create(createDto, files);
  }

  @Get()
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get('/count/by-type/total')
  countTotalByType() {
    return this.resourcesService.countAllByFiletype();
  }

  @Get('/count/by-type/last-7-days')
  countLast7DaysByType() {
    return this.resourcesService.countLast7DaysByFileType();
  }

  @Get('latest')
  @ApiOperation({ summary: 'Obtener los ultimos 5 archivos subidos' })
  getLast5Resources(){
    return this.resourcesService.getLast5UploadedResorces();
  }

  @Patch(':id/show-in-cardlist')
  updateCardListVisibility(
    @Param('id') id: string,
    @Body() body: { show: boolean },
  ) {
    return this.resourcesService.updateShowInCardList(id, body.show);
  }

  @Patch(':id/show-in-section/:section')
  updateCardListSection(
    @Param('id') id: string,
    @Param('section') section: FileType,
    @Body() body: { show: boolean },
  ) {
    return this.resourcesService.updateShowInSection(id, body.show, section);
  }

  @Get('/featured')
  getFeaturedForCardList() {
    return this.resourcesService.findWhereShowInCardList();
  }

  @Get('/featured/section')
  getFeaturedForSection() {
    return this.resourcesService.findWhereShowInSection();
  }

  @Get('/featured/section/:section')
  getFeaturedFilterSection(@Param('section') section: FileType) {
    return this.resourcesService.findWhereFilterSection(section);
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
