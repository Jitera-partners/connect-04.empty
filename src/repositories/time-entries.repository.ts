
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeEntry } from 'src/entities/time_entries';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';

export interface UpdateTimeEntryDto {
  id: number;
  user_id: number;
  check_in: Date;
  check_out: Date;
  is_edited: boolean;
}

@Injectable()
export class TimeEntriesRepository extends Repository<TimeEntry> {
  constructor(
    @InjectRepository(TimeEntry) private readonly timeEntryRepository: Repository<TimeEntry>
  ) {
    super();
  }

  async updateTimeEntry(updateTimeEntryDto: UpdateTimeEntryDto): Promise<string> {
    const { id, user_id, check_in, check_out, is_edited } = updateTimeEntryDto;
    const updateResult: UpdateResult = await this.timeEntryRepository.update({ id, user_id }, { check_in, check_out, is_edited: true });

    if (updateResult.affected === 0) {
      throw new Error('Time entry update failed or not found.');
    }

    return 'Time entry has been successfully updated.';
  }
}
