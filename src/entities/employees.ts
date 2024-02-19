
import {
  Entity,
  OneToMany,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '@entities/users';
import { CheckIn } from '@entities/check_ins';
import { AttendanceRecord } from '@entities/attendance_records';
import { TimeEntry } from '@entities/time_entries';

@Entity('employees')
export class Employee {
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

  @Column({ nullable: true, type: 'boolean', default: false })
  logged_in: boolean = false;

  @Column({ nullable: true, type: 'varchar' })
  name: string;

  @Column({ nullable: true, type: 'varchar' })
  email: string;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @OneToOne(() => User, (user) => user.employee, { onDelete: 'CASCADE', cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => TimeSheet, (timeSheet) => timeSheet.employee, { cascade: true })
  @JoinColumn({ name: 'employee_id' })
  time_sheets: TimeSheet[];


  @OneToMany(() => CheckIn, (checkIn) => checkIn.employee, { cascade: true })
  @JoinColumn({ name: 'employee_id' })
  check_ins: CheckIn[];

  @OneToMany(() => AttendanceRecord, (attendanceRecord) => attendanceRecord.employee, {
    cascade: true,
  })
  @JoinColumn({ name: 'employee_id' })
  attendance_records: AttendanceRecord[];

  @OneToMany(() => TimeEntry, (timeEntry) => timeEntry.employee, { cascade: true })
  time_entries: TimeEntry[];
}
