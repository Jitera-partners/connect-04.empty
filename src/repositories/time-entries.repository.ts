
import { Injectable } from '@nestjs/common';
import { EntityRepository, EntityManager, Repository, UpdateResult } from 'typeorm';
import { TimeEntry } from 'src/entities/time_entries';

export interface UpdateTimeEntryDto {
  id: number;
  user_id: number;
  check_in: Date;
  check_out: Date;
  is_edited: boolean;
}
@EntityRepository(TimeEntry)
@Injectable()
export class TimeEntriesRepository extends Repository<TimeEntry> {
  constructor(
    manager: EntityManager
  ) {
    super(TimeEntry, manager);
  }

  async updateTimeEntry(updateTimeEntryDto: UpdateTimeEntryDto): Promise<string> {
    const { id, user_id, check_in, check_out, is_edited } = updateTimeEntryDto;
    const updateResult: UpdateResult = await this.update({ id, user_id }, { check_in, check_out, is_edited: true });

    if (updateResult.affected === 0) {
      throw new Error('Time entry update failed or not found.');
    }

    return 'Time entry has been successfully updated.';
  }
}
