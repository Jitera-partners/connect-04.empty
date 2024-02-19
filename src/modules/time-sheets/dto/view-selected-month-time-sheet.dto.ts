import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

export class ViewSelectedMonthTimeSheetDto {
  @IsInt({ message: "User ID must be an integer." })
  @IsNotEmpty({ message: "User ID is required." })
  user_id: number;

  @IsString({ message: "Month is required." })
  @IsNotEmpty({ message: "Month is required." })
  @Matches(/^(19|20)\d{2}-(0[1-9]|1[012])$/, { message: "Month must be in the format YYYY-MM." })
  month: string;
}
