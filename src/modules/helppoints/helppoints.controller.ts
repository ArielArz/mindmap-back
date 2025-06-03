import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { HelppointsService } from './helppoints.service';
import { CreateHelppointDto } from './dto/create-helppoint.dto';
import { UpdateHelppointDto } from './dto/update-helppoint.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserRole } from '../users/entities/enum/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('helppoints')
export class HelppointsController {
  constructor(private readonly helppointsService: HelppointsService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() createHelppointDto: CreateHelppointDto) {
    return this.helppointsService.create(createHelppointDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PREMIUM)
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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countAll() {
    return this.helppointsService.countAll();
  }

  @Get('count/last-week')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  countLasteWeek() {
    return this.helppointsService.countLastWeek();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PREMIUM)
  findOne(@Param('id') id: string) {
    return this.helppointsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PREMIUM)
  update(@Param('id') id: string, @Body() updateHelppointDto: UpdateHelppointDto) {
    return this.helppointsService.update(id, updateHelppointDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.helppointsService.remove(id);
  }
}
