import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string){
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if(!foundUser){
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return foundUser;
  }

  async createUser(userDto: UserDto): Promise<User>{
    const { name, email, password, profileImage, address } = userDto;

    const existingUser = await this.userRepository.findOne({ where: { email } });
    if(existingUser) {
      throw new UnauthorizedException('El correo electronico ya esta registrado');
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
    return this.userRepository.save(newUser);
  }

  async remove(id: string) {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if(!foundUser) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepository.remove(foundUser);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
