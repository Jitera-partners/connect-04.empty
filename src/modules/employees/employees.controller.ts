import {
  Controller,
  Put,
  Get,
  Query,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { EmployeeService } from './employee.service';
import { Employee } from 'src/entities/employees';

@Controller('api/employee')
@Controller('api/attendance')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/check-in/status')
  @UseGuards(AuthGuard)
  async getCheckInStatus(@Query('employee_id') employeeId: number) {
    if (!Number.isInteger(employeeId)) {
      throw new HttpException('Invalid employee ID format.', HttpStatus.BAD_REQUEST);
    }

    @Put('/check-in/status')
    @UseGuards(AuthGuard)
    async updateCheckInStatus(@Body() body: any) {
      const { employee_id } = body;

      if (!Number.isInteger(employee_id)) {
        throw new HttpException('Invalid employee ID format.', HttpStatus.BAD_REQUEST);
      }

      let employee: Employee;
      try {
        employee = await this.employeeService.findEmployeeById(employee_id);
      } catch (error) {
        throw new HttpException('Employee not found.', HttpStatus.NOT_FOUND);
      }

      if (!employee) {
        throw new HttpException('Employee not found.', HttpStatus.NOT_FOUND);
      }

      // Business logic to update check-in status will be implemented here
    }

    let employee: Employee;
    try {
      employee = await this.employeeService.findEmployeeById(employeeId);
    } catch (error) {
      throw new HttpException('Employee not found.', HttpStatus.NOT_FOUND);
    }

    if (!employee) {
      throw new HttpException('Employee not found.', HttpStatus.NOT_FOUND);
    }

    try {
      const checkInStatus = await this.employeeService.getCheckInStatus(employeeId);
      return {
        status: HttpStatus.OK,
        check_in_status: checkInStatus,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
