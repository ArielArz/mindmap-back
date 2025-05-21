
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileType } from '../entities/enum/file-type.enum';
import { FileExtension } from '../entities/enum/file-extension.enum';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(FileType)
  fileType: FileType;

  @IsEnum(FileExtension)
  fileExtension: FileExtension;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  uploadedById: string; // UUID del usuario que sube el recurso

  @IsOptional()
  @IsBoolean()
  isMainVideo?: boolean;
}
