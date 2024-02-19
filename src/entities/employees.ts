import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CheckIn } from '@entities/check_ins';

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

  @OneToMany(() => CheckIn, (checkIn) => checkIn.employee, { cascade: true })
  @JoinColumn({ name: 'employee_id' })
  check_ins: CheckIn[];
}
