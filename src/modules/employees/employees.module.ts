import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeesController } from './employees.controller';
import { EmployeeController } from './employee.controller';
import { AttendanceController } from './attendance.controller';
import { Employee } from 'src/entities/employees';
import { CheckIn } from 'src/entities/check_ins';
import { EmployeeRepository } from 'src/repositories/employees.repository';
import { CheckInRepository } from 'src/repositories/check-ins.repository';
import { AttendanceService } from './attendance.service';
import { AttendanceRepository } from 'src/repositories/attendance.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, CheckIn])],
  providers: [
    EmployeeService,
    EmployeeRepository,
    CheckInRepository,
    AttendanceService,
    AttendanceRepository,
  ],
  controllers: [EmployeesController, EmployeeController, AttendanceController],
})
export class EmployeesModule {}
