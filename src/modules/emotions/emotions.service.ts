import { DataSource, Repository } from "typeorm";
import { CreateEmotionDto } from "./dto/create-emotion.dto";
import { UpdateEmotionDto } from "./dto/update-emotion.dto";
import { seedEmotions } from "./emotion.seeder";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Emotion } from "./entities/emotion.entity";
import { UserState } from "../user-state/entities/user-state.entity";

@Injectable()
export class EmotionsService {
  constructor(
    @InjectRepository(Emotion)
    private readonly emotionRepo: Repository<Emotion>,
    @InjectRepository(UserState)
    private readonly userStateRepo: Repository<UserState>
  ) { }

  async create(createEmotionDto: CreateEmotionDto) {

    const existing = await this.emotionRepo.findOneBy({ name: createEmotionDto.name });
    if (existing) {
      return { message: 'La emoción ya existe en la base de datos' };
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

  async puntajeEmocional() {
    console.log('Entró al método puntajeEmocional');

    // Traemos todos los estados del usuario, con su emoción (ya está en eager)
    const userStates = await this.userStateRepo.find();

    const puntajes = userStates.map(state => {
      const intensidad = state.intensidad; // Enum, que debería resolverse como número
      const clinicalValue = state.emotion.clinicalValue; // viene por eager

      return intensidad * clinicalValue;
    });

    const total = puntajes.reduce((acc, val) => acc + val, 0);

    return {
      totalPuntajeEmocional: total,
      detalle: puntajes
    };
    // Puntaje emocional = Intensidad (enum de userState) × Valor clínico (clinicalValue de emotion)

  }


}