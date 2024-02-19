import { IsNotEmpty, IsInt, IsDate } from 'class-validator';

export class CheckInDto {
  @IsNotEmpty()
  @IsInt()
  employeeId: number;

  @IsNotEmpty()
  @IsDate()
  checkInTime: Date;

  @IsNotEmpty()
  @IsDate()
  checkInDate: Date;
}
