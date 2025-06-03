import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { FileType } from './enum/file-type.enum';
import { FileExtension } from './enum/file-extension.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity('resources')
export class Resource {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Guía de meditación diaria' })
  @Column()
  name: string;

  @ApiProperty({ enum: FileType, example: FileType.VIDEO })
  @Column({ type: 'enum', enum: FileType, nullable: false })
  fileType: FileType;

  @ApiProperty({ enum: FileExtension, example: FileExtension.MP4 })
  @Column({ type: 'enum', enum: FileExtension, nullable: false })
  fileExtension: FileExtension;

  @ApiProperty({ example: 'https://res.cloudinary.com/ejemplo/video.mp4' })
  @Column()
  cloudinaryUrl: string;

  @ApiProperty({ example: 'videos/meditacion123', nullable: true })
  @Column({ nullable: true })
  publicId: string;

  @ApiProperty({ example: 'meditacion', nullable: true })
  @Column({ nullable: true })
  resourceType: string;

  @ApiProperty({
    example: 'Video guiado de 10 minutos para ayudarte a relajarte y conectar con tu respiración.',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User)
  uploadedBy: User;

   @ApiProperty({ example: 'https://res.cloudinary.com/ejemplo/thumbnail.jpg', nullable: true })
  @Column({ nullable: true })
  thumbnailUrl?: string;

  @ApiProperty({ example: 'thumbnails/thumb123', nullable: true })
  @Column({ nullable: true })
  thumbnailPublicId?: string;

  @ApiProperty({ example: false })
  @Column({ default: false })
  showInCardList: boolean;

  @ApiProperty({ example: false })
  @Column({ default: false })
  showInSection: boolean;

  @ApiProperty({ example: '2024-05-30T14:35:22.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2024-05-30T15:42:10.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
