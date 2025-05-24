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
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) { }

  @Post()
  // @Roles(UserRole.ADMIN)
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
  // @Roles(UserRole.ADMIN)
  findAll() {
    return this.resourcesService.findAll();
  }

  @Patch(':id/show-in-cardlist')
  // @Roles(UserRole.ADMIN)
  updateCardListVisibility(
    @Param('id') id: string,
    @Body() body: { show: boolean }
  ) {
    return this.resourcesService.updateShowInCardList(id, body.show);
  }

  @Patch(':id/show-in-section/:section')
  // @Roles(UserRole.ADMIN)
  updateCardListSection(
    @Param('id') id: string,
    @Param('section') section: FileType,
    @Body() body: { show: boolean }
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
