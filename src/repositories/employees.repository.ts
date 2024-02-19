import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Employee } from '@entities/employees';

@Injectable()
export class EmployeeRepository extends BaseRepository<Employee> {}
