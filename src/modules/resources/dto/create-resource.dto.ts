
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { FileType } from '../entities/enum/file-type.enum';
import { FileExtension } from '../entities/enum/file-extension.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class CreateResourceDto {
  @ApiProperty({
    description: 'Nombre del recurso',
    example: 'Clase de Introducción a NestJS',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Tipo de archivo',
    enum: FileType,
    example: FileType.VIDEO,
  })
  @IsEnum(FileType)
  fileType: FileType;

  @ApiProperty({
    description: 'Extensión del archivo',
    enum: FileExtension,
    example: FileExtension.MP4,
  })
  @IsEnum(FileExtension)
  fileExtension: FileExtension;

  @ApiPropertyOptional({
    description: 'Descripción del recurso',
    example: 'Este video cubre los conceptos básicos de NestJS.',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'ID del usuario que subió el recurso',
    example: 'de305d54-75b4-431b-adb2-eb6b9e546014',
  })
  @IsString()
  @IsNotEmpty()
  uploadedById: string;

  @ApiPropertyOptional({
    description: 'Indica si es el video principal',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isMainVideo?: boolean;
}