import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './entities/resource.entity';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { User } from '../users/entities/user.entity';
import { FilesUploadRepository } from 'src/cloudinary/files-upload.repository';
import { FileType } from './entities/enum/file-type.enum';


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
      if (dto.isMainVideo) {
    // Desmarcar cualquier otro recurso como principal
        await this.resourceRepo.update({ isMainVideo: true }, { isMainVideo: false });
      } 

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
          if (dto.isMainVideo) {
    // Desmarcar cualquier otro recurso como principal
        await this.resourceRepo.update({ isMainVideo: true }, { isMainVideo: false });
      } 
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

    async findMainVideo(): Promise<Resource> {
    const mainVideo = await this.resourceRepo.findOne({
    where: { isMainVideo: true, fileType: FileType.VIDEO },
      relations: ['uploadedBy'],
    });
    if (!mainVideo) throw new NotFoundException('Main video not found');
    return mainVideo;
  }
  
  async clearMainVideo() {
    await this.resourceRepo.update({ isMainVideo: true }, { isMainVideo: false });
    return { message: "Recurso destacado eliminado" };
  }

  async setMainVideo(id: string): Promise<Resource> {
      await this.clearMainVideo();
      // Desmarcar todos los videos destacados
      await this.resourceRepo.createQueryBuilder()
        .update(Resource)
        .set({ isMainVideo: false })
        .where("isMainVideo = :val", { val: true })
        .execute();

      // Marcar el nuevo video principal
      const resource = await this.resourceRepo.findOneBy({ id });
      if (!resource) throw new NotFoundException('Resource not found');

      resource.isMainVideo = true;
      return this.resourceRepo.save(resource);
    }
}
