import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, ILike, MoreThan, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailerService } from '../mailer/mailer.service';
import { UserRole } from './entities/enum/user-role.enum';
import { UserState } from '../user-state/entities/user-state.entity';
import { seedUsersAndUserStates } from './users.userState.seeder';
import { Emotion } from '../emotions/entities/emotion.entity';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { PaginationAndFilterDto } from './dto/pagination-and-filter.dto';
import { ChangeRoleDto } from './dto/update-role.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserStatus } from './entities/enum/user-status.enum';

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
  ) {}

  async findAll(dto: PaginationAndFilterDto) {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortDirection = 'ASC',
      search,
      role,
      status,
    } = dto;

    const skip = (page - 1) * limit;

    const where: FindOptionsWhere<User>[] = [];

    if (search) {
      where.push({ name: ILike(`%${search}%`) });
      where.push({ email: ILike(`%${search}%`) });
    }

    if (role) {
      where.push({ role });
    }

    if (status) {
      const normalizedStatus = Object.values(UserStatus).find(
        (val) => val.toLowerCase() === status.toLowerCase(),
      );
      if (normalizedStatus) {
        where.push({ status: normalizedStatus });
      }
    }

    const [users, total] = await this.userRepository.findAndCount({
      where: where.length > 0 ? where : undefined,
      take: limit,
      skip,
      order: { [sortBy]: sortDirection },
      select: [
        'id',
        'name',
        'email',
        'role',
        'status',
        'profileImage',
        'address',
      ],
    });

    return {
      data: users,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
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

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const updatedUser = {
      ...user,
      ...updateUserDto,
    };

    return this.userRepository.save(updatedUser);
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    console.log('Received userId:', userId);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    console.log('Current password input:', dto.currentPassword);
    console.log('Password hash stored:', user.password);

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('La contraseña actual es incorrecta.');
    }

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(
        'La nueva contraseña y su confirmación no coinciden.',
      );
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    user.password = hashedPassword;
    await this.userRepository.save(user);

    return { message: 'Contraseña actualizada con éxito.' };
  }

  async desactivate(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    user.status = UserStatus.INACTIVE;
    await this.userRepository.save(user);

    return { message: 'Usuario desactivado correctamente' };
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

  async changeRole({ userId, newRole }: ChangeRoleDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (user.role === newRole) {
      throw new BadRequestException('El usuario ya tiene ese rol.');
    }

    user.role = newRole;
    return await this.userRepository.save(user);
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

  async updateStatus(dto: UpdateUserStatusDto): Promise<void> {
    const { id, status } = dto;

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.status = status;
    await this.userRepository.save(user);
  }

  // contar usuarios totales
  async countTotalUsers(): Promise<{ total: number }> {
    const total = await this.userRepository.count();
    return { total };
  }

  //Contar usuarios creados en los ultimos 7 dias
  async countUserLast7Days(): Promise<{ last7Days: number }> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const count =await this.userRepository.count({
      where: {
        createdAt: MoreThan(sevenDaysAgo),
      },
    });

    return { last7Days: count };
  }
}
