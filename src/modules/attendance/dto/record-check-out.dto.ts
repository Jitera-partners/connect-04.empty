import { IsInt, IsDate } from 'class-validator';

export class RecordCheckOutDto {
  @IsInt({ message: 'Employee ID must be an integer' })
  employeeId: number;

  @IsDate({ message: 'Check-out time must be a valid date' })
  checkOutTime: Date;

  constructor(employeeId: number, checkOutTime: Date) {
    this.employeeId = employeeId; this.checkOutTime = checkOutTime;
  }
}
