import {
  Controller,
  Get,
  Put,
  Query,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard as JwtAuthGuard } from '@nestjs/passport';
import { AuthGuard as CustomAuthGuard } from 'src/guards/auth.guard';
import { AttendanceService } from './attendance.service';
import { FilterAttendanceRecordsDto } from './dto/filter-attendance-records.dto';
import { RecordCheckOutDto } from './dto/record-check-out.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('records')
  @UseGuards(JwtAuthGuard('oauth2'))
  async filterAttendanceRecords(@Query() query: FilterAttendanceRecordsDto) {
    try {
      // Validate the query parameters here
      // For example, check if employee_id exists in the employees table
      // If not, throw new HttpException('Employee not found.', HttpStatus.BAD_REQUEST);

      // Assuming the service method is implemented to handle the filtering logic
      const attendanceRecords = await this.attendanceService.filterAttendanceRecords(query);
      return {
        status: HttpStatus.OK,
        attendance_records: attendanceRecords.records,
        total_pages: attendanceRecords.totalPages,
        limit: query.limit,
        page: query.page,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('/api/attendance/checkout')
  @UseGuards(CustomAuthGuard)
  async checkout(@Body() recordCheckOutDto: RecordCheckOutDto): Promise<{ status: number; message: string; check_out_time: Date }> {
    try {
      const response = await this.attendanceService.recordCheckOut(recordCheckOutDto.employeeId, new Date());
      return { status: HttpStatus.OK, message: response.message, check_out_time: new Date() };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
