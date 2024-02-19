
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { EmployeeRepository } from 'src/repositories/employees.repository';
import { CheckInRepository } from 'src/repositories/check-ins.repository';

@Module({
  providers: [
    EmployeeService,
    EmployeeRepository,
    CheckInRepository,
  ],
  controllers: [EmployeeController],
})
export class EmployeesModule {}
