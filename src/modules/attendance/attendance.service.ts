
import { Injectable } from '@nestjs/common';
import { AttendanceRecordRepository } from 'src/repositories/attendance-records.repository';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { LessThanOrEqual, MoreThan } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(private readonly attendanceRecordRepository: AttendanceRecordRepository) {}

  async recordCheckOut(employeeId: number, checkOutTime: Date): Promise<{ message: string } | Error> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendanceRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        date: LessThanOrEqual(today),
        check_in_time: MoreThan(today)
      }
    });

    if (!attendanceRecord) {
      throw new Error('Employee has not checked in today.');
    }

    if (attendanceRecord.check_in_time >= checkOutTime) {
      throw new Error('Invalid check-out time. Check-out time must be later than check-in time.');
    }

    attendanceRecord.check_out_time = checkOutTime;
    await this.attendanceRecordRepository.save(attendanceRecord);

    return { message: 'Check-out time has been recorded successfully.' };
  }

  async filterAttendanceRecords(query: any): Promise<{ records: AttendanceRecord[], totalPages: number }> {
    // Implement the logic to filter attendance records based on the query parameters
    // This is a placeholder implementation and should be replaced with actual logic
    const [records, total] = await this.attendanceRecordRepository.findAndCount({
      where: query, // Replace with actual query conditions
      // Add pagination logic if needed
    });

    const totalPages = Math.ceil(total / (query.limit || 10)); // Assuming default limit is 10

    return {
      records: records,
      totalPages: totalPages,
    };
  }
}
