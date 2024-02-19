
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

  @Post('/api/employee/check-in')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async checkIn(@Body() checkInDto: CheckInDto) {
    try {
      const checkInDate = new Date();
      const checkInTime = new Date();
      const result = await this.employeeService.checkInEmployee(checkInDto.employeeId, checkInTime, checkInDate);
      return {
        status: HttpStatus.OK,
        message: `Check-in successful for employee ID: ${checkInDto.employeeId}`,
        check_in_time: checkInTime.toISOString(),
      };
    } catch (error) {
      // Error handling should be implemented based on the error type
      // This is a placeholder for proper error handling
      throw error;
    }
  }
}
