import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Emotion } from './emotion.entity';

@Entity('user_state')
export class UserState {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Emotion)
  emotion: Emotion;

  @Column({ nullable: false })
  date: Date;

  @Column({ type: 'int', nullable: false })
  intensity: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
