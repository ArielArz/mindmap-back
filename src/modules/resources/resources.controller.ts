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
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/enum/user-role.enum';

@ApiBearerAuth()
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
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
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get('/count/by-type/total')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countTotalByType() {
    return this.resourcesService.countAllByFiletype();
  }

  @Get('/count/by-type/last-7-days')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countLast7DaysByType() {
    return this.resourcesService.countLast7DaysByFileType();
  }

  @Get('latest')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obtener los ultimos 5 archivos subidos' })
  getLast5Resources() {
    return this.resourcesService.getLast5UploadedResorces();
  }

  @Patch(':id/show-in-cardlist')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateCardListVisibility(
    @Param('id') id: string,
    @Body() body: { show: boolean },
  ) {
    return this.resourcesService.updateShowInCardList(id, body.show);
  }

  @Patch(':id/show-in-section/:section')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateCardListSection(
    @Param('id') id: string,
    @Param('section') section: FileType,
    @Body() body: { show: boolean },
  ) {
    return this.resourcesService.updateShowInSection(id, body.show, section);
  }

  @Get('/featured')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  getFeaturedForCardList() {
    return this.resourcesService.findWhereShowInCardList();
  }

  @Get('/featured/section')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  getFeaturedForSection() {
    return this.resourcesService.findWhereShowInSection();
  }

  @Get('/featured/section/:section')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  getFeaturedFilterSection(@Param('section') section: FileType) {
    return this.resourcesService.findWhereFilterSection(section);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
