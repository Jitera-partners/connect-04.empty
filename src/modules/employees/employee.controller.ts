import { Controller, Post, Body, UseGuards, HttpCode, HttpStatus, BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RecordCheckInDto } from './dto/record-check-in.dto';
import { CheckInDto } from './dto/check-in.dto';
import { EmployeeService } from './employee.service';

@Controller()
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/api/employee/check-in')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async logCheckIn(@Body() recordCheckInDto: RecordCheckInDto) {
    try {
      if (recordCheckInDto.action !== 'check_in') {
        throw new BadRequestException('Invalid action type.');
      }
      const timestamp = new Date();
      const result = await this.employeeService.logCheckInAction(recordCheckInDto.employeeId, recordCheckInDto.action, timestamp);
      return {
        status: HttpStatus.OK,
        message: "Check-in action logged successfully",
        log: {
          id: result.id,
          employee_id: recordCheckInDto.employeeId,
          action: recordCheckInDto.action,
          created_at: timestamp.toISOString(),
        }
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  @Post('/api/attendance/check-in')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async checkIn(@Body() checkInDto: CheckInDto) {
    try {
      const checkInDate = new Date();
      const checkInTime = new Date();
      const result = await this.employeeService.checkInEmployee(checkInDto.employeeId, checkInTime, checkInDate);
      const checkIn = {
        id: result.id,
        check_in_time: checkInTime.toISOString(),
        check_in_date: checkInDate.toISOString().split('T')[0],
        employee_id: checkInDto.employeeId
      };
      return {
        status: HttpStatus.OK,
        message: "Check-in recorded successfully",
        check_in: checkIn
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException("Employee not found.");
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException("Invalid employee ID format.");
      } else {
        throw new Error("An unexpected error occurred on the server.");
      }
    }
  }
}
