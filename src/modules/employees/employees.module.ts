import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesController } from './employees.controller';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/entities/employees';
import { CheckIn } from 'src/entities/check_ins';
import { EmployeeRepository } from 'src/repositories/employees.repository';
import { CheckInRepository } from 'src/repositories/check-ins.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, CheckIn])],
  providers: [
    EmployeeService,
    // If EmployeeRepository and CheckInRepository are custom repositories,
    // they should be provided like this:
    EmployeeRepository,
    CheckInRepository,
  ],
  // If both EmployeesController and EmployeeController are meant to be used,
  // they should be included in the controllers array:
  controllers: [EmployeesController, EmployeeController],
})
export class EmployeesModule {}
