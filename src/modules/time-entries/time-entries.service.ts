
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntryRepository } from 'src/repositories/time-entries.repository';
import { TimeEntry } from 'src/entities/time_entries';
import { UpdateTimeEntryDto } from './dto/update-time-entry.dto';
import { ValidateTimeEntryDto } from './dto/validate-time-entry.dto';
import { ValidateTimeEntry } from '../../shared/validators/validate-time-entry.validator';

@Injectable()
export class TimeEntriesService {
  constructor(
    @InjectRepository(TimeEntryRepository)
    private timeEntryRepository: TimeEntryRepository,
  ) {}

  async updateTimeEntry(updateTimeEntryDto: UpdateTimeEntryDto): Promise<string> {
    try {
      const { id, user_id, check_in, check_out, is_edited } = updateTimeEntryDto;
      const timeEntry = await this.timeEntryRepository.findOneBy({ id, user_id });

      if (!timeEntry) {
        throw new Error('Time entry not found.');
      }

      // Before updating, validate the check-in and check-out times
      const isValid = ValidateTimeEntry(check_in, check_out);
      if (!isValid) {
        throw new BadRequestException('Validation failed: check-in time must be before check-out time.');
      }

      timeEntry.check_in = check_in;
      timeEntry.check_out = check_out;
      timeEntry.is_edited = is_edited;

      await this.timeEntryRepository.save(timeEntry);

      return 'Time entry has been successfully updated.';
    } catch (error) {
      throw new Error('Failed to update time entry.');
    }
  }

  async validateTimeEntry(dto: ValidateTimeEntryDto): Promise<string> {
    const { check_in, check_out } = dto;

    const isValid = ValidateTimeEntry(check_in, check_out);
    if (!isValid) {
      throw a BadRequestException('Validation failed: check-in time must be before check-out time.');
    }

    // If the validation passes, you can proceed with the next business logic here
    // For example, updating the time entry in the database

    return 'Time entry data is valid.';
  }

  // ... other methods and properties
}
