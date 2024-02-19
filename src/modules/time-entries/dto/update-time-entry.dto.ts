import { IsBoolean, IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateTimeEntryDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsInt()
  @IsNotEmpty()
  user_id: number;

  @IsDate()
  @IsNotEmpty()
  check_in: Date;

  @IsDate()
  check_out: Date;

  @IsBoolean()
  is_edited: boolean;
}
