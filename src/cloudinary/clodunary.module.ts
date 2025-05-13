import { Module } from '@nestjs/common';
import { CloudinaryConfig } from './cloudinary';
import { FilesUploadRepository } from './files-upload.repository';

@Module({
  providers: [CloudinaryConfig, FilesUploadRepository],
  exports: [CloudinaryConfig, FilesUploadRepository],  
})
export class CloudinaryModule {}
