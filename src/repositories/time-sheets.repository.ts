import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { TimeSheet } from '@entities/time_sheets';

@Injectable()
export class TimeSheetRepository extends BaseRepository<TimeSheet> {}
