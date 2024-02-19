import { IsInt, IsNotEmpty } from 'class-validator';

export class GetCheckInStatusDto {
  @IsNotEmpty({
    message: 'Employee ID must not be empty.',
  })
  @IsInt({
    message: 'Invalid employee ID format.',
  })
  employee_id: number;
}
