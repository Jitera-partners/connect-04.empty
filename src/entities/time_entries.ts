import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/users';
import { Employee } from '@entities/employees';

@Entity('time_entries')
export class TimeEntry {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  check_in: Date;

  @Column({ nullable: true, type: 'timestamp' })
  check_out: Date;

  @Column({ nullable: true, type: 'date' })
  date: Date;

  @Column({ nullable: true, type: 'boolean', default: false })
  is_edited: boolean = false;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @Column({ nullable: true, type: 'integer' })
  employee_id: number;

  @ManyToOne(() => User, (user) => user.time_entries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Employee, (employee) => employee.time_entries)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
