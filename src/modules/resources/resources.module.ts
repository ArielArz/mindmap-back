import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesService } from './resources.service';
import { ResourcesController } from './resources.controller';
import { Resource } from './entities/resource.entity';
import { User } from '../users/entities/user.entity';
import { CloudinaryModule } from 'src/cloudinary/clodunary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, User]), CloudinaryModule],
  controllers: [ResourcesController],
  providers: [ResourcesService],
})
export class ResourcesModule {}
