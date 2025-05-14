import { DataSource, Repository } from "typeorm";
import { CreateEmotionDto } from "./dto/create-emotion.dto";
import { UpdateEmotionDto } from "./dto/update-emotion.dto";
import { seedEmotions } from "./emotion.seeder";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Emotion } from "./entities/emotion.entity";

@Injectable()
export class EmotionsService {
  constructor(
    @InjectRepository(Emotion)
    private readonly emotionRepo: Repository<Emotion>
  ) { }

  async create(createEmotionDto: CreateEmotionDto) {

    const existing = await this.emotionRepo.findOneBy({ name: createEmotionDto.name });
    if (existing) {
      return { message: 'La emoción ya existe' };
    }
    const newEmotion = this.emotionRepo.create(createEmotionDto);
    return this.emotionRepo.save(newEmotion);
  }

  async findAll() {
    return this.emotionRepo.find();
  }

  async findOne(id: string) {
    return this.emotionRepo.findOneBy({ id });
  }

  async update(id: string, updateEmotionDto: UpdateEmotionDto) {
    await this.emotionRepo.update(id, updateEmotionDto);
    return this.emotionRepo.findOneBy({ id });
  }

  async remove(id: string) {
    await this.emotionRepo.delete(id);
    return { message: 'Emoción eliminada' };
  }

  async addEmotions() {
    console.log('Entró al método addEmotions');

    await seedEmotions(this.emotionRepo);
    return { message: 'Emociones precargadas' };
  }
}