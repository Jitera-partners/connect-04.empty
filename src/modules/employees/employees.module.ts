
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service'; // Added import for EmployeeService
import { EmployeesController } from './employees.controller';
import { EmployeeController } from './employee.controller';
import { Employee } from 'src/entities/employees';
import { CheckIn } from 'src/entities/check_ins';
import { EmployeeRepository } from 'src/repositories/employees.repository';
import { CheckInRepository } from 'src/repositories/check-ins.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, CheckIn])],
  providers: [
    EmployeeService, // Ensure EmployeeService is included in the providers array
    EmployeeRepository,
    CheckInRepository,
  ],
  controllers: [EmployeesController, EmployeeController],
})
export class EmployeesModule {}
