import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, Max, Min } from 'class-validator';

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

}