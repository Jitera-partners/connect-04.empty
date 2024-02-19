import { Injectable } from '@nestjs/common';
import { TimeSheetRepository } from 'src/repositories/time-sheets.repository';
import { ViewPastTimeSheetsDto } from './dto/view-past-time-sheets.dto';
import { TimeSheet } from 'src/entities/time_sheets';
import * as moment from 'moment';

@Injectable()
export class TimeSheetsService {
  constructor(private readonly timeSheetRepository: TimeSheetRepository) {}

  async viewPastTimeSheets(params: ViewPastTimeSheetsDto): Promise<{ timeEntries: TimeSheet[]; message?: string; }> {
    const { userId, selectedMonth, selectedYear } = params;
    const currentDate = moment();
    const selectedDate = moment(`${selectedYear}-${selectedMonth}`, 'YYYY-MM');

    if (!selectedDate.isValid() || selectedDate.isAfter(currentDate, 'month')) {
      throw new Error('Invalid or future date selected.');
    }

    const timeEntries = await this.timeSheetRepository.find({
      where: {
        user_id: userId,
        date: Between(
          selectedDate.startOf('month').format('YYYY-MM-DD'),
          selectedDate.endOf('month').format('YYYY-MM-DD')
        )
      }
    });

    if (timeEntries.length === 0) {
      return { timeEntries, message: 'No time sheet records found for the selected period.' };
    }

    const formattedTimeEntries = timeEntries.map(entry => ({
      date: entry.date,
      dayType: entry.day_type,
      checkInTime: entry.check_in_time,
      checkOutTime: entry.check_out_time,
      totalHours: entry.total_hours
    }));

    return { timeEntries: formattedTimeEntries };
  }
}