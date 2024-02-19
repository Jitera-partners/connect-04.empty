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

enum DayTypeEnum {
  WORK = 'work',
  WEEKEND = 'weekend',
  HOLIDAY = 'holiday',
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

  @Column({ nullable: true, type: 'enum', enum: ['work', 'weekend', 'holiday'], default: 'work' })
  day_type: `${DayTypeEnum}` = 'work';

  @Column({ nullable: true, type: 'timestamp' })
  check_in_time: Date;

  @Column({ nullable: true, type: 'timestamp' })
  check_out_time: Date;

  @Column({ nullable: true, type: 'float' })
  total_hours: number;

  @Column({ nullable: true, type: 'integer' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.time_sheets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export { DayTypeEnum };
