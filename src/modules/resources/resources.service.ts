import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { User } from '../users/entities/user.entity';
import { FilesUploadRepository } from 'src/cloudinary/files-upload.repository';
import { FileType } from './entities/enum/file-type.enum';
// import { FileType } from './entities/enum/file-type.enum';


@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourceRepo: Repository<Resource>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private readonly cloudinary: FilesUploadRepository,
  ) {}

async create(
  dto: CreateResourceDto,
  files: { file?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] },
): Promise<Resource> {
  try {
    const file = files.file?.[0];
    const thumbnail = files.thumbnail?.[0];

    if (!file) throw new Error('No file provided');

    const uploadResult = await this.cloudinary.uploadFile(file);

    let thumbnailUrl: string | undefined = undefined;
    let thumbnailPublicId: string | undefined = undefined;

    if (thumbnail) {
      const thumbnailUpload = await this.cloudinary.uploadFile(thumbnail);
      thumbnailUrl = thumbnailUpload.secure_url;
      thumbnailPublicId = thumbnailUpload.public_id;
    }

    const resource = this.resourceRepo.create({
      ...dto,
      cloudinaryUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      resourceType: uploadResult.resource_type,
      thumbnailUrl,
      thumbnailPublicId,
    });

    return await this.resourceRepo.save(resource);
  } catch (error) {
    console.error('Error creating resource:', error);
    throw error; // Puedes lanzar un HttpException aquí si quieres personalizar el error
  }
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
    if (!resource) throw new NotFoundException('Recurso no encontrado');

    // Eliminar archivo de Cloudinary si tenés public_id
    if (resource.publicId) {
      await this.cloudinary.deleteFile(resource.publicId, resource.resourceType);
    }

    if (resource.thumbnailPublicId) {
      await this.cloudinary.deleteFile(resource.thumbnailPublicId, 'image');
    }

    await this.resourceRepo.remove(resource);
  }

async findWhereShowInCardList() {
  return await this.resourceRepo.find({
    where: { showInCardList: true },
    order: { createdAt: 'DESC' },
  });
}

async updateShowInCardList(id: string, show: boolean) {
  return this.resourceRepo.update(id, { showInCardList: show });
}


async updateShowInSection(id: string, show: boolean, section: FileType) {
  return this.resourceRepo.update(id, {
    showInSection: show,
    fileType: section,
  });
}

async findWhereShowInSection() {
  return await this.resourceRepo.find({
    where: { showInSection: true },
    order: { createdAt: 'DESC' },
  });
}

async findWhereFilterSection(section: FileType) {
  return this.resourceRepo.find({
    where: {
      showInSection: true,
      fileType: section,
    },
    order: { createdAt: 'DESC' },
  });
}

async countAllByFiletype(){
  const fileTypes = Object.values(FileType);

  const count = await Promise.all(
    fileTypes.map(async (type) => {
      const total = await this.resourceRepo.count({ where: { fileType: type } });
      return { [type]: total };
    }),
  );

  return Object.assign({}, ...count);
}

// 5 ultimos archivos en lugar de 7 dias de total de recursos
async getLast5UploadedResorces() {
  return this.resourceRepo.find({
    order: { createdAt: 'DESC' },
    take: 5,
  });
}
}
