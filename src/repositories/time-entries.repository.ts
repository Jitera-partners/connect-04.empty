import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { TimeEntry } from '@entities/time_entries';

@Injectable()
export class TimeEntryRepository extends BaseRepository<TimeEntry> {}
