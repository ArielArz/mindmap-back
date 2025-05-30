import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, MoreThan } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MailerService } from '../mailer/mailer.service';
import { UserRole } from './entities/enum/user-role.enum';
import { UserState } from '../user-state/entities/user-state.entity';
import { seedUsersAndUserStates } from './users.userState.seeder';
import { Emotion } from '../emotions/entities/emotion.entity';
import { UpdatePasswordDto } from './dto/update-password-dto';
import { PaginationAndFilterDto } from './dto/pagination-and-filter.dto';
import { ChangeRoleDto } from './dto/change-role.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserStatus } from './entities/enum/user-status.enum';
import { ChangeAdminDto } from './dto/update-admin.dto';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { FilesUploadRepository } from 'src/cloudinary/files-upload.repository';

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
    private readonly fileUpload: FilesUploadRepository,
  ) {}

  async findAll(dto: PaginationAndFilterDto) {
    try {
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

      if (role) where.push({ role });

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
    } catch (error) {
      console.error('Error en findAll:', error);
      throw new InternalServerErrorException('Error al obtener los usuarios');
    }
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['states', 'states.emotion'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return user;
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
        relations: ['subscriptions'],
      });
    } catch {
      throw new InternalServerErrorException(
        'Error al buscar el usuario por email',
      );
    }
  }

  async createUser(userDto: UserDto): Promise<User> {
    const { name, email, password, profileImage, address } = userDto;

    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('Ya existe un usuario con ese correo');
    }

    try {
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

      const savedUser = await this.userRepository.save(newUser);

      if (password) {
        await this.mailerService.sendWelcomeEmail(email, name);
      }

      return savedUser;
    } catch {
      throw new InternalServerErrorException('Error al crear el usuario');
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    try {
      return await this.userRepository.save({ ...user, ...updateUserDto });
    } catch {
      throw new InternalServerErrorException('Error al actualizar el usuario');
    }
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('La contraseña actual es incorrecta.');
    }

    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException(
        'La nueva contraseña y su confirmación no coinciden.',
      );
    }

    try {
      const hashedPassword = await bcrypt.hash(
        dto.password,
        await bcrypt.genSalt(),
      );
      user.password = hashedPassword;
      await this.userRepository.save(user);

      return { message: 'Contraseña actualizada con éxito.' };
    } catch {
      throw new InternalServerErrorException(
        'Error al actualizar la contraseña',
      );
    }
  }

  async desactivate(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    try {
      user.status = UserStatus.INACTIVE;
      await this.userRepository.save(user);
      return { message: 'Usuario desactivado correctamente' };
    } catch {
      throw new InternalServerErrorException('Error al desactivar el usuario');
    }
  }

  async getPremiumUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({
        where: { role: UserRole.PREMIUM },
      });
      if (!users || users.length === 0) {
        throw new NotFoundException('No hay usuarios premium');
      }
      return users;
    } catch {
      throw new InternalServerErrorException(
        'Error al obtener los usuarios premium',
      );
    }
  }
  async changeAdmin({
    userId,
    role,
    status,
    name,
    email,
    address,
    profileImage,
  }: ChangeAdminDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    let hasChanges = false;

    if (role && user.role !== role) {
      user.role = role;
      hasChanges = true;
    }

    if (status && user.status !== status) {
      user.status = status;
      hasChanges = true;
    }

    if (name && user.name !== name) {
      user.name = name;
      hasChanges = true;
    }

    if (email && user.email !== email) {
      const existing = await this.userRepository.findOne({ where: { email } });
      if (existing && existing.id !== user.id) {
        throw new BadRequestException(
          'El correo ya está en uso por otro usuario.',
        );
      }
      user.email = email;
      hasChanges = true;
    }

    if (address && user.address !== address) {
      user.address = address;
      hasChanges = true;
    }

    if (profileImage && user.profileImage !== profileImage) {
      user.profileImage = profileImage;
      hasChanges = true;
    }

    if (!hasChanges) {
      throw new BadRequestException('No se realizaron cambios en el usuario.');
    }

    try {
      return await this.userRepository.save(user);
    } catch {
      throw new InternalServerErrorException('Error al actualizar el usuario.');
    }
  }

  async changeRole({ userId, newRole }: ChangeRoleDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    try {
      user.role = newRole;
      return await this.userRepository.save(user);
    } catch {
      throw new InternalServerErrorException(
        'Error al cambiar el rol del usuario',
      );
    }
  }

  async saveUser(user: User): Promise<User> {
    try {
      return await this.userRepository.save(user);
    } catch {
      throw new InternalServerErrorException('Error al guardar el usuario');
    }
  }

  async seedUsuariosYEstados() {
    try {
      await seedUsersAndUserStates(
        this.userRepository,
        this.userStateRepository,
        this.emotionRepository,
      );
      return { message: 'Usuarios y estados precargados' };
    } catch {
      throw new InternalServerErrorException(
        'Error al precargar los usuarios y estados',
      );
    }
  }

  async createByAdmin(dto: CreateUserByAdminDto, file?: Express.Multer.File) {
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException('Correo ya registrado');
    }
    const hashedPassword = await bcrypt.hash('Sentia123*', 10);

    const user = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    if (file) {
      try {
        const result = await this.fileUpload.uploadFile(file);
        savedUser.profileImage = result.secure_url;
        await this.userRepository.save(savedUser);
      } catch (err) {
        console.log(err);
        throw new InternalServerErrorException(
          'Usuario creado pero error al subir imagen.',
        );
      }
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      profileImage: user.profileImage,
      role: user.role,
      status: user.status,
    };
  }

  async updateStatus(dto: UpdateUserStatusDto): Promise<{ message: string }> {
    const { id, status } = dto;

    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    try {
      user.status = status;
      await this.userRepository.save(user);
    } catch {
      throw new InternalServerErrorException(
        'Error al actualizar el estado del usuario',
      );
    }
    return { message: `El usuario cambio a el estado ${status}` };
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

    const count = await this.userRepository.count({
      where: {
        createdAt: MoreThan(sevenDaysAgo),
      },
    });

    return { last7Days: count };
  }
}
