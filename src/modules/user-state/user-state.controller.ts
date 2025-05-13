import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserStateService } from './user-state.service';
import { CreateUserStateDto } from './dto/create-user-state.dto';
import { UpdateUserStateDto } from './dto/update-user-state.dto';

@Controller('user-state')
export class UserStateController {
  constructor(private readonly userStateService: UserStateService) {}

  @Post()
  create(@Body() createUserStateDto: CreateUserStateDto) {
    return this.userStateService.create(createUserStateDto);
  }

  @Get()
  findAll() {
    return this.userStateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userStateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserStateDto: UpdateUserStateDto) {
    return this.userStateService.update(+id, updateUserStateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userStateService.remove(+id);
  }
}
