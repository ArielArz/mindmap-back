import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsInt, Max, Min } from 'class-validator';
import { UserState } from 'src/modules/user-state/entities/user-state.entity';

@Entity('emotions')
export class Emotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  emoji: string;

  @Column({ type: 'text', nullable: false })
  significado: string;

  @Column({ nullable: false })
  @IsInt()
  @Min(-3)
  @Max(3)
  clinicalValue: number;

  @Column({ type: 'text', nullable: false })
  reflexion: string;

  @ManyToOne(() => UserState)
  userState: UserState;
}