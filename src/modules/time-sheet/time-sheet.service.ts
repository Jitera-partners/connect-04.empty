import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { TimeSheetRepository } from '/src/repositories/time-sheets.repository.ts';
import { getCurrentMonthAndYear } from '/src/utils/date.ts';
import { TimeSheet } from '/src/entities/time_sheets.ts';

@Injectable()
export class TimeSheetService {
  constructor(
    @InjectRepository(TimeSheet)
    private readonly timeSheetRepository: Repository<TimeSheet>
  ) {}

  async viewCurrentMonthTimeSheet(userId: number): Promise<any> {
    // Authenticate the user (omitted for brevity)

    const { month, year } = getCurrentMonthAndYear();
    const timeEntries = await this.timeSheetRepository.find({
      where: {
        user_id: userId,
        date: Raw(alias => `${alias} >= '${year}-${month}-01' AND ${alias} < '${year}-${month}-31'`)
      },
    });

    if (timeEntries.length === 0) {
      return { message: 'No time sheet records for the current month.' };
    }

    const formattedEntries = timeEntries.map(entry => ({
      date: entry.date,
      day_type: entry.day_type,
      check_in_time: entry.check_in_time,
      check_out_time: entry.check_out_time,
      total_hours: entry.total_hours,
    }));

    return formattedEntries;
  }
}
