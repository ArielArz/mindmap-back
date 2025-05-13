import { Injectable } from '@nestjs/common';
import { CreateEmotionDto } from './dto/create-emotion.dto';
import { UpdateEmotionDto } from './dto/update-emotion.dto';

@Injectable()
export class EmotionsService {
  create(createEmotionDto: CreateEmotionDto) {
    return 'This action adds a new emotion';
  }

  findAll() {
    return `This action returns all emotions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emotion`;
  }

  update(id: number, updateEmotionDto: UpdateEmotionDto) {
    return `This action updates a #${id} emotion`;
  }

  remove(id: number) {
    return `This action removes a #${id} emotion`;
  }
}
