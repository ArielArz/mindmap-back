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

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: FileType, nullable: false })
  fileType: FileType;

  @Column({ type: 'enum', enum: FileExtension, nullable: false })
  fileExtension: FileExtension;

  @Column()
  cloudinaryUrl: string;

  @Column({ nullable: true })
  publicId: string;

  @Column({ nullable: true })
  resourceType: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User)
  uploadedBy: User;

  @Column({ nullable: true })
  thumbnailUrl?: string;

  @Column({ nullable: true })
  thumbnailPublicId?: string;

  @Column({ default: false })
  showInCardList: boolean;

  @Column({ default: false })
  showInSection: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
