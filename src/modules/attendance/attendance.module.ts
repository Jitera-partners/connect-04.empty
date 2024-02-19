import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceController } from './attendance.controller';
import { AttendanceService } from './attendance.service';
import { AttendanceRecordRepository } from 'src/repositories/attendance-records.repository';
import { EmployeeRepository } from 'src/repositories/employees.repository';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { Employee } from 'src/entities/employees';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceRecord, Employee])],
  controllers: [AttendanceController],
  providers: [AttendanceService, AttendanceRecordRepository, EmployeeRepository],
})
export class AttendanceModule {}
