import { Controller, Put, Body, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RecordCheckOutDto } from './dto/record-check-out.dto';
import { AttendanceService } from './attendance.service';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Put('/api/attendance/checkout')
  @UseGuards(AuthGuard)
  async checkout(@Body() recordCheckOutDto: RecordCheckOutDto): Promise<{ status: number; message: string; check_out_time: Date }> {
    try {
      const response = await this.attendanceService.recordCheckOut(recordCheckOutDto.employeeId, new Date());
      return { status: HttpStatus.OK, message: response.message, check_out_time: new Date() };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
