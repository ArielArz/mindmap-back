import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HelppointsService } from './helppoints.service';
import { CreateHelppointDto } from './dto/create-helppoint.dto';
import { UpdateHelppointDto } from './dto/update-helppoint.dto';

@Controller('helppoints')
export class HelppointsController {
  constructor(private readonly helppointsService: HelppointsService) {}

  @Post()
  create(@Body() createHelppointDto: CreateHelppointDto) {
    return this.helppointsService.create(createHelppointDto);
  }

  @Get()
  findAll(@Query('category') category?: string) {
    if (category) {
      return this.helppointsService.findByCategory(category);
    }
    return this.helppointsService.findAll();
  }

  @Get('nearby')
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
  countAll() {
    return this.helppointsService.countAll();
  }

  @Get('count/last-week')
  countLasteWeek(){
    return this.helppointsService.countLastWeek();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.helppointsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHelppointDto: UpdateHelppointDto) {
    return this.helppointsService.update(id, updateHelppointDto);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.helppointsService.remove(id);
  }
}
