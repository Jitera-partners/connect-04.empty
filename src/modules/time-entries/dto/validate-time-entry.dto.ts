import { IsDate, Validate } from 'class-validator';
import { ValidateTimeEntry } from '../validators/validate-time-entry.validator';

export class ValidateTimeEntryDto {
  @IsDate({ message: 'Check-in must be a valid date.' })
  @Validate(ValidateTimeEntry, {
    message: 'Check-in must be before check-out.',
  })
  check_in: Date;

  @IsDate({ message: 'Check-out must be a valid date.' })
  @Validate(ValidateTimeEntry, {
    message: 'Check-out must be after check-in.',
  })
  check_out: Date;
}
