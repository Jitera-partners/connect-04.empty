import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { TimeSheet } from '@entities/time_sheets';
import { TimeEntry } from '@entities/time_entries';
import { Permission } from '@entities/permissions';
import { Employee } from '@entities/employees';

enum RoleEnum {
  EMPLOYEE = 'employee',
  MANAGER = 'manager',
  ADMIN = 'admin',
}

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

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['employee', 'manager', 'admin'],
    default: 'employee',
  })
  role: `${RoleEnum}` = 'employee';

  @OneToMany(() => TimeSheet, (timeSheet) => timeSheet.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  time_sheets: TimeSheet[];

  @OneToMany(() => TimeEntry, (timeEntry) => timeEntry.user, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  time_entries: TimeEntry[];

  @OneToOne(() => Permission, (permission) => permission.user, { cascade: true })
  permission: Permission;

  @OneToOne(() => Employee, (employee) => employee.user)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;


  @OneToOne(() => Employee, (employee) => employee.user, { onDelete: 'CASCADE' })
  employee: Employee;
}

export { RoleEnum };
