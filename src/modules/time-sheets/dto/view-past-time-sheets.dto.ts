import { IsInt, IsNumber, Min, Max, IsDate, IsString, ValidateIf, Matches } from 'class-validator';

export class ViewPastTimeSheetsDto {
  @IsInt()
  @IsNumber()
  userId: number;

  @IsString()
  @ValidateIf(o => isNaN(parseInt(o.selectedMonth)))
  @Matches(/^(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/, {
    message: 'Invalid month format.'
  })
  @ValidateIf(o => !isNaN(parseInt(o.selectedMonth)))
  @IsInt()
  @Min(1)
  @Max(12)
  selectedMonth: number | string;

  @IsString()
  @Matches(/^(19[0-9]{2}|20[0-9]{2})$/, {
    message: 'Invalid year format.'
  })
  selectedYear: number | string;

  // Additional validations for date can be added here if necessary
}
  @IsInt()
  @Min(1)
  @Max(12)
  selectedMonth: number;

  @IsInt()
  selectedYear: number;

  // Additional validations for date can be added here if necessary
}
