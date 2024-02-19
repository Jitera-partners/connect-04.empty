import { IsNotEmpty, IsInt, IsDate, IsString, Equals } from 'class-validator';

export class RecordCheckInDto {
  @IsNotEmpty({ message: 'Employee ID must not be empty' }) // Retained from existing code
  @IsInt({ message: 'Employee ID must be an integer' }) // Retained from new code
  employeeId: number;

  @IsNotEmpty({ message: 'Date must not be empty' }) // Retained from existing code
  @IsDate({ message: 'Date must be a valid date' }) // Retained from new code
  date: Date;

  @IsNotEmpty({ message: 'Check-in time must not be empty' }) // Retained from existing code
  @IsDate({ message: 'Check-in time must be a valid datetime' }) // Retained from new code
  checkInTime: Date;

  @IsNotEmpty({ message: 'Action must not be empty' }) // Retained from existing code
  @IsString({ message: 'Action must be a string' }) // Retained from existing code
  @Equals('check_in', { message: 'Invalid action type.' }) // Retained from existing code
  action: string;
}
