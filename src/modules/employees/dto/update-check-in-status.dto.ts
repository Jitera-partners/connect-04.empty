import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateCheckInStatusDto {
  @IsNotEmpty({
    message: 'Employee ID must not be empty.',
  })
  @IsInt({
    message: 'Invalid employee ID format.',
  })
  employee_id: number;
}
