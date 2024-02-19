import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/users';

enum RoleEnum {
  EMPLOYEE = 'employee',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

@Entity('permissions')
export class Permission {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['employee', 'manager', 'admin'],
    default: 'employee',
  })
  role: `${RoleEnum}` = 'employee';

  @Column({ nullable: true, type: 'boolean', default: false })
  can_edit_time_entries: boolean = false;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @OneToOne(() => User, (user) => user.permission, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export { RoleEnum };
