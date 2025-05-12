import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('locations')
export class Location {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column('decimal', { precision: 10, scale: 6, nullable: false })
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6, nullable: false })
  longitude: number;

  @Column({ type: 'text', nullable: true })
  address: string;

  @ManyToOne(() => User, { nullable: true })
  createdBy: User;
}
