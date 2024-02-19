
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

enum DayTypeEnum {
  WORK = 'work',
  WEEKEND = 'weekend',
  HOLIDAY = 'holiday',
  WORKDAY = 'Workday',
  // HOLIDAY = 'Holiday', // Removed duplicate 'HOLIDAY' enum value
  VACATION = 'Vacation',
  SICK_LEAVE = 'Sick Leave',
}

@Entity('time_sheets')
export class TimeSheet {
  @Column({ type: 'integer', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: 'timestamp' })
  @CreateDateColumn()
  created_at: Date;

  @Column({ nullable: true, type: 'timestamp' })
  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true, type: 'date' })
  date: Date;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['work', 'weekend', 'holiday', 'Workday', 'Holiday', 'Vacation', 'Sick Leave'],
    default: 'work',
  })
  day_type: `${DayTypeEnum}` = 'work';

  @Column({ nullable: true, type: 'timestamp' })
  check_in_time: Date;

  @Column({ nullable: true, type: 'timestamp' })
  check_out_time: Date;

  @Column({ nullable: true, type: 'float' })
  total_hours: number;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @Column({ nullable: true, type: 'integer' })
  employee_id: number;

  @ManyToOne(() => User, (user) => user.time_sheets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Employee, (employee) => employee.time_sheets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}

export { DayTypeEnum };
