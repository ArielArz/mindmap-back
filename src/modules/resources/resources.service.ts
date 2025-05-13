import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { User } from '../users/entities/user.entity';
import { FilesUploadRepository } from 'src/cloudinary/files-upload.repository';


@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepo: Repository<Resource>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private readonly cloudinary: FilesUploadRepository,
  ) {}

  async create(dto: CreateResourceDto, file: Express.Multer.File): Promise<Resource> {
    // const user = await this.userRepo.findOneBy({ id: dto.uploadedById });
    // if (!user) throw new NotFoundException('User not found');

    const uploadResult = await this.cloudinary.uploadFile(file);

    const resource = this.resourceRepo.create({
      ...dto,
      cloudinaryUrl: uploadResult.secure_url,
      // uploadedBy: user,
    });

    return this.resourceRepo.save(resource);
  }

  findAll(): Promise<Resource[]> {
    return this.resourceRepo.find({ relations: ['uploadedBy'] });
  }

  async findOne(id: string): Promise<Resource> {
    const resource = await this.resourceRepo.findOne({
      where: { id },
      relations: ['uploadedBy'],
    });
    if (!resource) throw new NotFoundException('Resource not found');
    return resource;
  }

  async update(id: string, dto: UpdateResourceDto): Promise<Resource> {
    const resource = await this.resourceRepo.preload({ id, ...dto });
    if (!resource) throw new NotFoundException('Resource not found');
    return this.resourceRepo.save(resource);
  }

  async remove(id: string): Promise<void> {
    const resource = await this.findOne(id);
    await this.resourceRepo.remove(resource);
  }
}
