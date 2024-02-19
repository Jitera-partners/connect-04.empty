import { IsInt, IsDateString, IsNumber, Min, IsOptional } from 'class-validator';

export class FilterAttendanceRecordsDto {
  @IsInt({ message: 'Invalid employee ID format.' })
  @IsOptional()
  employee_id?: number;

  @IsDateString({}, { message: 'Wrong date format.' })
  @IsOptional()
  date?: string;

  @IsNumber({}, { message: 'Page must be a number greater than 0.' })
  @Min(1, { message: 'Page must be a number greater than 0.' })
  @IsOptional()
  page?: number;

  @IsNumber({}, { message: 'Limit must be a number.' })
  @IsOptional()
  limit?: number;

  constructor(partial: Partial<FilterAttendanceRecordsDto>) {
    Object.assign(this, partial);
  }
}
