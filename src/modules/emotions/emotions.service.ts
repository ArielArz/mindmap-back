import { Between, Repository } from "typeorm";
import { CreateEmotionDto } from "./dto/create-emotion.dto";
import { UpdateEmotionDto } from "./dto/update-emotion.dto";
import { seedEmotions } from "./emotion.seeder";
import { Injectable, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Emotion } from "./entities/emotion.entity";
import { UserState } from "../user-state/entities/user-state.entity";
import { rangosIEG } from "./dto/rango-ieg.interface";

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
        clinicalValue: true,
        significado: true,
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

  private elegirAleatorio<T>(lista: T[]): T {
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
  }

  private analizarIEG(ieg: number): {
    min: number;
    max: number;
    interpretacion: string;
    consejo: string;
    accion: string | null;
  } {
    const resultado = rangosIEG.find(r => ieg >= r.min && ieg <= r.max);

    if (!resultado) {
      return {
        min: -100,
        max: 100,
        interpretacion: 'Valor fuera de rango',
        consejo: 'No se pudo analizar el estado emocional. Verificá tus registros.',
        accion: null
      };
    }

    return {
      min: resultado.min,
      max: resultado.max,
      interpretacion: resultado.interpretacion,
      consejo: this.elegirAleatorio(resultado.consejos),
      accion: resultado.acciones.length > 0 ? this.elegirAleatorio(resultado.acciones) : null
    };
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
    const resultado = this.analizarIEG(IEG);

    return {
      puntajes,
      desde,
      hasta: new Date(),
      cantidadRegistros: userStates.length,
      total,
      IEG,
      interpretacion: resultado.interpretacion,
      consejo: resultado.consejo,
      accion: resultado.accion
    };
  }
}