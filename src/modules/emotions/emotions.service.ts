import { Between, DataSource, Repository } from "typeorm";
import { CreateEmotionDto } from "./dto/create-emotion.dto";
import { UpdateEmotionDto } from "./dto/update-emotion.dto";
import { seedEmotions } from "./emotion.seeder";
import { Injectable, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Emotion } from "./entities/emotion.entity";
import { UserState } from "../user-state/entities/user-state.entity";
import dayjs from "dayjs";

@Injectable()
export class EmotionsService {
  constructor(
    @InjectRepository(Emotion)
    private readonly emotionRepo: Repository<Emotion>,
    @InjectRepository(UserState)
    private readonly userStateRepo: Repository<UserState>,

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
    return this.emotionRepo.find({
      select: {
        id: true,
        name: true,
        emoji: true,
        reflexion: true

      }
    });
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


  async calculaPuntajes(userStates: UserState[]): Promise<number[]> {
    return userStates.map(state => {
      const intensidad = state.intensidad;
      const clinicalValue = state.emotion.clinicalValue;
      return intensidad * clinicalValue;
    });
  }

  interpretarIEG(ieg: number): string {
    if (ieg >= 1.5 && ieg <= 3.0) {
      return 'Muy positivo, bienestar alto';
    } else if (ieg >= 0.5 && ieg < 1.5) {
      return 'Leve positivo, saludable';
    } else if (ieg >= -0.5 && ieg < 0.5) {
      return 'Neutro / estable';
    } else if (ieg >= -1.4 && ieg < -0.5) {
      return 'Leve malestar';
    } else if (ieg >= -2.9 && ieg < -1.4) {
      return 'Malestar emocional moderado';
    } else if (ieg <= -3.0) {
      return 'Riesgo emocional alto';
    } else {
      return 'Valor fuera de rango';
    }
  }

  async puntajeEmocionalAnalisis(userId: string, dias: number = 0) {
    if (!userId) {
      throw new Error('userId es obligatorio');
    }
    const desde = new Date();
    if (dias > 0) {
      desde.setDate(desde.getDate() - dias);
    } else {
      desde.setFullYear(2000);
    }
    const userStates = await this.userStateRepo.find({
      where: {
        user: { id: userId },
        date: Between(desde, new Date()),
      },
      relations: ['emotion'],
    });

    if (userStates.length === 0) {
      return {
        message: `No hay registros en los últimos ${dias} días`,
        IEG: 0,
        interpretacion: 'Sin datos',
      };
    }

    const puntajes = await this.calculaPuntajes(userStates);
    const total = puntajes.reduce((acc, val) => acc + val, 0);
    const IEG = total / userStates.length;
    const interpretacion = this.interpretarIEG(IEG);

    return {
      puntajes,
      desde,
      hasta: new Date(),
      cantidadRegistros: userStates.length,
      total,
      IEG,
      interpretacion,
    };
  }



}