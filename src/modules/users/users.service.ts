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

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly mailerService: MailerService,

    @InjectRepository(UserState)
    private readonly userStateRepository: Repository<UserState>,
  ) { }


  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id }, relations: ['states', 'states.emotion'] });
    if (!foundUser) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return foundUser;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async createUser(userDto: UserDto): Promise<User> {
    const { name, email, password, profileImage, address } = userDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new UnauthorizedException(
        'El correo electronico ya esta registrado',
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      address,
      profileImage,
    });
    const userCreated = await this.userRepository.save(newUser);
    await this.mailerService.sendWelcomeEmail(email, name);
    return userCreated;
  }

  async remove(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Eliminar estados del usuario
    await this.userStateRepository
      .createQueryBuilder()
      .delete()
      .where('userId = :id', { id })
      .execute();

    // Eliminar usuario
    return await this.userRepository.delete(id);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const updatedUser = { ...user, ...updateUserDto };

    return this.userRepository.save(updatedUser);
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
}
