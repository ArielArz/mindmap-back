import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { FileType } from '../common/enums/file-type.enum';
import { FileExtension } from '../common/enums/file-extension.enum';

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

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => User)
  uploadedBy: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
