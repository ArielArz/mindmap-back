import { ConflictException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepo: Repository<Contact>,
  ) {}

  async create(data: CreateContactDto) {
    const { email } = data;
    const existingUser = await this.contactRepo.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Mensaje enviado correctamente');
    }
    const message = this.contactRepo.create(data);
    await this.contactRepo.save(message);

    return { message: 'Mensaje enviado correctamente' };
  }
}
