import { DataSource } from "typeorm";
import { CreateEmotionDto } from "./dto/create-emotion.dto";
import { UpdateEmotionDto } from "./dto/update-emotion.dto";
import { seedEmotions } from "./emotion.seeder";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmotionsService {
  constructor(private dataSource: DataSource) { }

  async create(createEmotionDto: CreateEmotionDto) {
    const repo = this.dataSource.getRepository('emotion');
    const existing = await repo.findOneBy({ name: createEmotionDto.name });
    if (existing) {
      return { message: 'La emoción ya existe' };
    }
    const newEmotion = repo.create(createEmotionDto);
    return repo.save(newEmotion);
  }

  async findAll() {
    return this.dataSource.getRepository('emotion').find();
  }

  async findOne(id: string) {
    return this.dataSource.getRepository('emotion').findOneBy({ id });
  }

  async update(id: string, updateEmotionDto: UpdateEmotionDto) {
    const repo = this.dataSource.getRepository('emotion');
    await repo.update(id, updateEmotionDto);
    return repo.findOneBy({ id });
  }

  async remove(id: string) {
    const repo = this.dataSource.getRepository('emotion');
    await repo.delete(id);
    return { message: 'Emoción eliminada' };
  }

  async addEmotions() {
    await seedEmotions(this.dataSource);
    return { message: 'Emociones precargadas' };
  }
}