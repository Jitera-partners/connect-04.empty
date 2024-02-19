import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EmployeeRepository } from 'src/repositories/employees.repository';
import { isNumber } from 'util'; // Added import
import { CheckInRepository } from 'src/repositories/check-ins.repository';
import { AttendanceRecordRepository } from 'src/repositories/attendance-records.repository';
import { Employee } from 'src/entities/employees';
import { CheckIn } from 'src/entities/check_ins';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private checkInRepository: CheckInRepository,
    private attendanceRecordRepository: AttendanceRecordRepository
  ) {}

  async checkInEmployee(employeeId: number, checkInTime: Date, checkInDate: Date): Promise<{ message: string }> {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });

    if (!employee || !employee.logged_in) {
      throw new BadRequestException('Employee must be logged in to check in.');
    }

    const checkInRecord = await this.checkInRepository.findOne({
      where: {
        employee_id: employeeId,
        check_in_date: checkInDate
      }
    });

    if (checkInRecord) {
      throw new BadRequestException('Employee has already checked in.');
    }

    const newCheckIn = new CheckIn();
    newCheckIn.employee_id = employeeId;
    newCheckIn.check_in_time = checkInTime;
    newCheckIn.check_in_date = checkInDate;

    await this.checkInRepository.save(newCheckIn);

    return { message: 'Check-in successful' };
  }

  async logCheckInAction(employeeId: number, action: string, timestamp: Date): Promise<{ message: string; status?: number; log?: any }> {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found.`);
    }

    if (typeof action !== 'string') {
      throw new BadRequestException('Invalid action type.');
    }

    const newLogEntry = this.checkInRepository.create(); // Use repository create method
    newLogEntry.employee_id = employeeId;
    newLogEntry.action = action; // Assuming action is a valid property of CheckIn entity
    newLogEntry.check_in_time = timestamp;

    try {
      await this.checkInRepository.save(newLogEntry);
    } catch (error) {
      throw new BadRequestException('Failed to log check-in action.');
    }

    return {
      status: 200,
      message: `Check-in action '${action}' for employee ID ${employeeId} has been logged at ${timestamp.toISOString()}.`,
      log: {
        id: newLogEntry.id,
        employee_id: newLogEntry.employee_id,
        action: newLogEntry.action,
        created_at: newLogEntry.created_at.toISOString()
      }
    };
  }

  async recordCheckInTime(employeeId: number, date: Date, checkInTime: Date): Promise<{ message: string; check_in_time?: Date; date?: Date; }> {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });

    if (!employee || !employee.logged_in) {
      throw new BadRequestException('Invalid employee ID or employee is not logged in.');
    }

    const existingRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        date: date
      }
    });

    if (existingRecord) {
      return { message: 'Employee has already checked in.', check_in_time: existingRecord.check_in_time, date: existingRecord.date };
    }

    const newRecord = this.attendanceRecordRepository.create({
      employee_id: employeeId,
      date: date,
      check_in_time: checkInTime,
      created_at: new Date(),
      updated_at: new Date()
    });

    await this.attendanceRecordRepository.save(newRecord);

    return { message: 'Check-in time has been recorded.', check_in_time: checkInTime, date: date };
  }

  async updateCheckInStatus(employeeId: number): Promise<{ message: string; employee: { id: number; logged_in: boolean; } }> {
    if (!isNumber(employeeId)) {
      throw new BadRequestException('Invalid employee ID format.');
    }

    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });

    if (!employee) {
      throw a new NotFoundException('Employee not found.');
    }

    employee.logged_in = !employee.logged_in; // Toggle the logged_in status
    await this.employeeRepository.save(employee);

    return {
      message: 'Check-in status updated successfully',
      employee: {
        id: employee.id,
        logged_in: employee.logged_in
      }
    };
  }
}
