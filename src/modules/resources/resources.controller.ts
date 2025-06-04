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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/enum/user-role.enum';

@ApiBearerAuth()
@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) { }

  @Post()
  @ApiOperation({ summary: 'Subir un nuevo recurso con archivo y thumbnail' })
  @ApiResponse({ status: 201, description: 'Recurso creado correctamente' })
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
  @ApiOperation({ summary: 'Listar todos los recursos.' })
  @ApiResponse({ status: 200, description: 'Lista de recursos.' })
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get('/count/by-type/total')
  @ApiOperation({ summary: 'Contar todos los recursos agrupados por tipo de archivo' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countTotalByType() {
    return this.resourcesService.countAllByFiletype();
  }

  @Get('/count/by-type/last-7-days')
  @ApiOperation({ summary: 'Contar recursos subidos en los ultimos 7 dias por tipo de archivo.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countLast7DaysByType() {
    return this.resourcesService.countLast7DaysByFileType();
  }

  @Get('latest')
  @ApiOperation({ summary: 'Obtener los ultimos 5 archivos subidos.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Obtener los ultimos 5 archivos subidos' })
  getLast5Resources() {
    return this.resourcesService.getLast5UploadedResorces();
  }

  @Patch(':id/show-in-cardlist')
  @ApiOperation({ summary: 'Actualizar visibilidad en la lista de tarjetas' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateCardListVisibility(
    @Param('id') id: string,
    @Body() body: { show: boolean },
  ) {
    return this.resourcesService.updateShowInCardList(id, body.show);
  }

  @Patch(':id/show-in-section/:section')
  @ApiOperation({ summary: 'Actualizar visibilidad en una seccion especifica.' })
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
  @ApiOperation({ summary: 'Obtener recursos destacados para la CardList' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getFeaturedForCardList() {
    return this.resourcesService.findWhereShowInCardList();
  }

  @Get('/featured/section')
  @ApiOperation({ summary: 'Obtener recursos destacados por seccion' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getFeaturedForSection() {
    return this.resourcesService.findWhereShowInSection();
  }

  @Get('/featured/section/:section')
  @ApiOperation({ summary: 'Obtener recursos destacados de una seccion especifica' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getFeaturedFilterSection(@Param('section') section: FileType) {
    return this.resourcesService.findWhereFilterSection(section);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un recurso por su ID' })
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un recurso' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un recurso' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.resourcesService.remove(id);
  }
}
