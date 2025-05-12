import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('emotions')
export class Emotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;
}
