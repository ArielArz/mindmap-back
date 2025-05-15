import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Emotion } from '../../emotions/entities/emotion.entity';

@Entity('user_state')
export class UserState {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.states, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Emotion, { eager: true, nullable: false })
  emotion: Emotion;

  @Column({ nullable: false })
  intensidad: number;

  @Column({ nullable: false })
  date: Date;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
