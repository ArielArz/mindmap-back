import { Injectable } from '@nestjs/common';
import { CreateUserStateDto } from './dto/create-user-state.dto';
import { UpdateUserStateDto } from './dto/update-user-state.dto';

@Injectable()
export class UserStateService {
  create(createUserStateDto: CreateUserStateDto) {
    return 'This action adds a new userState';
  }

  findAll() {
    return `This action returns all userState`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userState`;
  }

  update(id: number, updateUserStateDto: UpdateUserStateDto) {
    return `This action updates a #${id} userState`;
  }

  remove(id: number) {
    return `This action removes a #${id} userState`;
  }
}
