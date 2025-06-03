import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './enum/user-role.enum';
import { UserState } from 'src/modules/user-state/entities/user-state.entity';
import { Subscription } from '../../subscription/entities/subscription.entity';
import { UserStatus } from './enum/user-status.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ name: 'varchar', nullable: true })
  profileImage?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.FREE })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'boolean', nullable: true, default: false })
  notifications: boolean;

  @OneToMany(() => UserState, (userState) => userState.user)
  states: UserState[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
