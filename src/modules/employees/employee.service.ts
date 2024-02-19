
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { EmployeeRepository } from 'src/repositories/employees.repository';
import { CheckInRepository } from 'src/repositories/check-ins.repository';
import { Employee } from 'src/entities/employees';
import { CheckIn } from 'src/entities/check_ins';

@Injectable()
export class EmployeeService {
  constructor(
    private employeeRepository: EmployeeRepository,
    private checkInRepository: CheckInRepository
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

  async logCheckInAction(employeeId: number, action: string, timestamp: Date): Promise<{ message: string }> {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });

    if (!employee || !employee.logged_in) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found or not logged in.`);
    }

    const newLogEntry = new CheckIn();
    newLogEntry.employee_id = employeeId;
    newLogEntry.action = action;
    newLogEntry.check_in_time = timestamp;

    try {
      await this.checkInRepository.save(newLogEntry);
    } catch (error) {
      throw new BadRequestException('Failed to log check-in action.');
    }

    return {
      message: `Check-in action '${action}' for employee ID ${employeeId} has been logged at ${timestamp.toISOString()}.`
    };
  }

}
