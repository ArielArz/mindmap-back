import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { HelppointsService } from './helppoints.service';
import { CreateHelppointDto } from './dto/create-helppoint.dto';
import { UpdateHelppointDto } from './dto/update-helppoint.dto';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';

@ApiTags('helppoints')
@Controller('helppoints')
export class HelppointsController {
  constructor(private readonly helppointsService: HelppointsService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo punto de ayuda' })
  @ApiBody({ type: CreateHelppointDto })
  @ApiResponse({ status: 201, description: 'Punto de ayuda creado correctamente.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createHelppointDto: CreateHelppointDto) {
    return this.helppointsService.create(createHelppointDto);
  }

@Get()
@ApiOperation({ summary: 'Obtener todos los puntos de ayuda o filtrar por categoria y/o cercania.' })
@ApiQuery({ name: 'category', required: false })
@ApiQuery({ name: 'lat', required: false })
@ApiQuery({ name: 'lng', required: false })
@ApiQuery({ name: 'radius', required: false, description: 'Radio en metros (default: 10000)' })
@ApiResponse({ status: 200, description: 'Lista de puntos de ayuda.' })
findAll(
  @Query('category') category?: string,
  @Query('lat') lat?: string,
  @Query('lng') lng?: string,
  @Query('radius') radius?: string,
) {
  const latNum = lat ? parseFloat(lat) : undefined;
  const lngNum = lng ? parseFloat(lng) : undefined;
  const radiusNum = radius ? parseInt(radius) : 10000;

    if (latNum !== undefined && lngNum !== undefined) {
      return this.helppointsService.findNearbyWithCategory(
        latNum,
        lngNum,
        radiusNum,
        category,
      );
    }

    if (category) {
      return this.helppointsService.findByCategory(category);
    }

    return this.helppointsService.findAll();
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Obtener puntos de ayuda cercanos segun coordenadas y radio.' })
  @ApiQuery({ name: 'lat', required: true })
  @ApiQuery({ name: 'lng', required: true })
  @ApiQuery({ name: 'radius', required: false, description: 'Radio en metros (default: 10000).' })
  @ApiResponse({ status: 200, description: 'Lista de puntos de ayuda cercanos.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PREMIUM)
  findNearby(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
    @Query('radius') radius?: string,
  ) {
    return this.helppointsService.findNearby(
      parseFloat(lat),
      parseFloat(lng),
      radius ? parseInt(radius) : 10000,
    );
  }

  @Get('count')
  @ApiOperation({ summary: 'Obtener el total de puntos de ayuda creados.' })
  @ApiResponse({ status: 200, description: 'Cantidad total de puntos de ayuda.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countAll() {
    return this.helppointsService.countAll();
  }

  @Get('count/last-week')
  @ApiOperation({ summary: 'Obtener lacantidad de puntos de ayuda creados la ultima semana.' })
  @ApiResponse({ status: 200, description: 'Cantidad de puntos creados en la ultima semana.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countLasteWeek() {
    return this.helppointsService.countLastWeek();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un punto de ayuda por ID' })
  @ApiParam({ name: 'id', description: 'ID del punto de ayuda' })
  @ApiResponse({ status: 200, description: 'Punto de ayuda encontrado.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PREMIUM)
  findOne(@Param('id') id: string) {
    return this.helppointsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un punto de ayuda por ID' })
  @ApiParam({ name: 'id', description: 'ID del punto de ayuda a actualizar.' })
  @ApiBody({ type: UpdateHelppointDto })
  @ApiResponse({ status: 200, description: 'Punto de ayuda actualizado correctamente.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PREMIUM)
  update(@Param('id') id: string, @Body() updateHelppointDto: UpdateHelppointDto) {
    return this.helppointsService.update(id, updateHelppointDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un punto de ayuda por ID.' })
  @ApiParam({ name: 'id', description: 'ID del punto de ayuda a eliminar.' })
  @ApiResponse({ status: 200, description: 'Punto de ayuda eliminado correctamente.' }) 
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.helppointsService.remove(id);
  }

}

