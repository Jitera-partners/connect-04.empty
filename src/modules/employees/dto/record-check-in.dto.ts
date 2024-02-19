import { IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class RecordCheckInDto {
  @IsNotEmpty({ message: 'Employee ID must not be empty' })
  @IsInt({ message: 'Employee ID must be an integer' })
  employeeId: number;

  @IsNotEmpty({ message: 'Date must not be empty' })
  @IsDate({ message: 'Date must be a valid date' })
  date: Date;

  @IsNotEmpty({ message: 'Check-in time must not be empty' })
  @IsDate({ message: 'Check-in time must be a valid datetime' })
  checkInTime: Date;
}
