import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/mailer.service';
import { UserRole } from './entities/enum/user-role.enum';
import { UserState } from '../user-state/entities/user-state.entity';
import { seedUsersAndUserStates } from './users.userState.seeder';
import { Emotion } from '../emotions/entities/emotion.entity';
import { UpdatePasswordDto } from './dto/update-password-dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly mailerService: MailerService,

    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,

    @InjectRepository(Emotion)
    private readonly emotionRepository: Repository<Emotion>,
  ) { }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const foundUser = await this.userRepository.findOne({
      where: { id },
      relations: ['states', 'states.emotion'],
    });
    if (!foundUser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return foundUser;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['subscriptions'],
    });
  }

  async createUser(userDto: UserDto): Promise<User> {
    const { name, email, password, profileImage, address } = userDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      return existingUser;
    }

    let hashedPassword = '';
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
      profileImage,
    });
    const userCreated = await this.userRepository.save(newUser);

    if (password) {
      await this.mailerService.sendWelcomeEmail(email, name);
    }

    return userCreated;
  }

  async remove(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.userStateRepository
      .createQueryBuilder()
      .delete()
      .where('userId = :id', { id })
      .execute();

    return await this.userRepository.delete(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    //   async updateUser(id: string, dto: UpdateUserDto) {
    // if (dto.password || dto.confirmPassword) {
    //   throw new BadRequestException('No está permitido cambiar la contraseña desde este endpoint.');
    // }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const { confirmPassword, ...rest } = updateUserDto;

    const updatedUser = { ...user, ...rest };

    return this.userRepository.save(updatedUser);
  }


  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('La contraseña actual es incorrecta.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    user.password = hashedPassword;
    await this.userRepository.save(user);

    return { message: 'Contraseña actualizada con éxito.' };
  }


  async getPremiumUsers(): Promise<User[]> {
    const premiumUsers = await this.userRepository.find({
      where: { role: UserRole.PREMIUM },
    });

    if (!premiumUsers || premiumUsers.length === 0) {
      throw new NotFoundException(`No son usuarios premium`);
    }
    return premiumUsers;
  }

  async saveUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async seedUsuariosYEstados() {
    await seedUsersAndUserStates(
      this.userRepository,
      this.userStateRepository,
      this.emotionRepository,
    );
    return { message: 'Usuarios y estados precargados' };
  }
}
