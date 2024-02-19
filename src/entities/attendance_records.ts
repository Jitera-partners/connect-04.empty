import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from '@entities/employees';

@Entity('attendance_records')
export class AttendanceRecord {
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
  check_in_time: Date;

  @Column({ nullable: true, type: 'timestamp' })
  check_out_time: Date;

  @Column({ nullable: true, type: 'date' })
  date: Date;

  @Column({ nullable: true, type: 'integer' })
  employee_id: number;

  @ManyToOne(() => Employee, (employee) => employee.attendance_records, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
