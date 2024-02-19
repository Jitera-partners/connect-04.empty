import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TimeSheet } from '@entities/time_sheets';

@Entity('users')
export class User {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'varchar' })
  username: string;

  @Column({ nullable: true, type: 'varchar' })
  password_hash: string;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @OneToMany(() => TimeSheet, (timeSheet) => timeSheet.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  time_sheets: TimeSheet[];
}
