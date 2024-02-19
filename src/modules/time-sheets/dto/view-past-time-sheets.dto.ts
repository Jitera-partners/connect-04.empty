import { IsInt, IsNumber, Min, Max, IsDate } from 'class-validator';

export class ViewPastTimeSheetsDto {
  @IsInt()
  @IsNumber()
  userId: number;

  @IsInt()
  @Min(1)
  @Max(12)
  selectedMonth: number;

  @IsInt()
  selectedYear: number;

  // Additional validations for date can be added here if necessary
}
