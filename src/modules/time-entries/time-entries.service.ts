import { Injectable, BadRequestException } from '@nestjs/common';
import { ValidateTimeEntryDto } from './dto/validate-time-entry.dto';
import { ValidateTimeEntry } from '/src/shared/validators/validate-time-entry.validator';

@Injectable()
export class TimeEntriesService {
  // ... other methods and properties

  async validateTimeEntry(dto: ValidateTimeEntryDto): Promise<string> {
    const validator = new ValidateTimeEntry();
    const { check_in, check_out } = dto;

    const isValid = validator.validate(check_in, check_out);
    if (!isValid) {
      throw new BadRequestException('Validation failed: check-in time must be before check-out time.');
    }

    // If the validation passes, you can proceed with the next business logic here
    // For example, updating the time entry in the database

    return 'Time entry data is valid.';
  }
}
