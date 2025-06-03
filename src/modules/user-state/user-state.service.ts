import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserStateDto } from './dto/create-user-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserState } from './entities/user-state.entity';
import { User } from '../users/entities/user.entity';
import { Emotion } from '../emotions/entities/emotion.entity';
import { Between, MoreThan, Repository } from 'typeorm';
import { UpdateUserStateDto } from './dto/update-user-state.dto';

@Injectable()
export class UserStateService {
  constructor(
    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Emotion)
    private readonly emotionRepository: Repository<Emotion>,
  ) { }

  async create(createUserStateDto: CreateUserStateDto) {
    const { userId, emotionId, intensidad, comentario } = createUserStateDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);

    const emotion = await this.emotionRepository.findOne({ where: { id: emotionId } });
    if (!emotion) throw new NotFoundException(`Emoción con ID ${emotionId} no encontrada`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingToday = await this.userStateRepository.findOne({
      where: {
        user: { id: userId },
        date: Between(today, tomorrow),
      },
    });

    if (existingToday) {
      throw new BadRequestException('Ya existe un estado para este usuario en el día de hoy');
    }

    const newUserState = this.userStateRepository.create({
      user,
      emotion,
      intensidad,
      date: new Date(),
      comentario,
    });

    return await this.userStateRepository.save(newUserState);
  }

  async findAll() {
    return await this.userStateRepository.find({
      relations: ['user', 'emotion'],
      order: { date: 'DESC' }
    });
  }

  async findOne(id: number) {
    const state = await this.userStateRepository.findOne({
      where: { id: String(id) },
      relations: ['user', 'emotion'],
    });

    if (!state) throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    return state;
  }

  async update(id: number, dto: UpdateUserStateDto) {
    const state = await this.userStateRepository.findOne({ where: { id: String(id) } });
    if (!state) throw new NotFoundException(`Estado con ID ${id} no encontrado`);

    // if (dto.emotionId) {
    //   const emotion = await this.emotionRepository.findOne({ where: { id: dto.emotionId } });
    //   if (!emotion) throw new NotFoundException(`Emoción con ID ${dto.emotionId} no encontrada`);
    //   state.emotion = emotion;
    // }

    // if (dto.intensidad !== undefined) state.intensidad = dto.intensidad;
    if (dto.comentario !== undefined) state.comentario = dto.comentario;

    return await this.userStateRepository.save(state);
  }

  async remove(id: string) {
    const result = await this.userStateRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Estado con ID ${id} no encontrado`);
    }

    return { message: `${id} eliminado correctamente` };
  }
}
