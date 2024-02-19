import { IsBoolean, IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateTimeEntryDto {
  @IsInt({ message: 'Invalid time entry ID format.' })
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsDate({ message: 'Invalid datetime format.' })
  @IsNotEmpty()
  check_in: Date;

  @IsDate({ message: 'Invalid datetime format.' })
  check_out: Date;

  @IsBoolean()
  is_edited: boolean;
}
