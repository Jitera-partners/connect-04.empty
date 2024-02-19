
import { Injectable } from '@nestjs/common';
import { TimeSheetRepository } from 'src/repositories/time-sheets.repository';
import { ViewPastTimeSheetsDto } from './dto/view-past-time-sheets.dto';
import { ViewSelectedMonthTimeSheetDto } from './dto/view-selected-month-time-sheet.dto'; // Added import
import { TimeSheet, DayTypeEnum } from 'src/entities/time_sheets';
import * as moment from 'moment';
import { Between } from 'typeorm';
import { getCurrentMonthAndYear } from '../../utils/date';

@Injectable()
export class TimeSheetsService {
  constructor(private readonly timeSheetRepository: TimeSheetRepository) {}

  async viewPastTimeSheets(params: ViewPastTimeSheetsDto): Promise<{ timeEntries: TimeSheet[]; message?: string; }> {
    const { user_id, selectedMonth, selectedYear } = params;
    const currentDate = moment();
    const selectedDate = moment(`${selectedYear}-${selectedMonth}`, 'YYYY-MM');
    const timeEntries = await this.timeSheetRepository.find({
      where: {
        user_id: Number(user_id),
        date: Between(
          new Date(selectedDate.startOf('month').format('YYYY-MM-DD')),
          new Date(selectedDate.endOf('month').format('YYYY-MM-DD'))
        )
      }
    });

    if (!selectedDate.isValid() || selectedDate.isAfter(currentDate, 'month')) {
      throw new Error('Invalid or future date selected.');
    }

    if (timeEntries.length === 0) {
      return { timeEntries, message: 'No time sheet records found for the selected period.' };
    }

    const formattedTimeEntries = timeEntries.map(entry => ({
      date: entry.date,
      day_type: entry.day_type,
      check_in_time: entry.check_in_time,
      check_out_time: entry.check_out_time,
      total_hours: entry.total_hours,
      id: entry.id,
      created_at: entry.created_at,
      updated_at: entry.updated_at,
      // Add the missing 'user_id' and 'user' properties to match the TimeSheet type
      user_id: entry.user_id,
      user: entry.user
    }));

    return { timeEntries: formattedTimeEntries };
  }

  async viewCurrentMonthTimeSheet(userId: number): Promise<{ status: number; time_sheets: any[]; message?: string; }> {
    const { month, year } = getCurrentMonthAndYear();
    const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate();
    const endDate = moment(startDate).endOf('month').toDate();

    const timeEntries = await this.timeSheetRepository.find({
      where: { user_id: userId, date: Between(startDate, endDate) },
      order: {
        date: 'ASC'
      }
    });

    if (timeEntries.length === 0) {
      return { status: 200, time_sheets: [], message: 'No time sheet records found for the current month.' };
    }

    const formattedTimeEntries = timeEntries.map(entry => {
      return {
        id: entry.id,
        date: entry.date,
        day_type: entry.day_type,
        check_in_time: entry.check_in_time,
        check_out_time: entry.check_out_time,
        totalHours: entry.total_hours || moment(entry.check_out_time).diff(moment(entry.check_in_time), 'hours', true),
        user_id: entry.user_id
      };
    });

    return { status: 200, time_sheets: formattedTimeEntries };
  }

  async viewSelectedMonthTimeSheet(params: ViewSelectedMonthTimeSheetDto): Promise<{ status: number; time_sheets?: TimeSheet[]; message?: string; }> {
    const { user_id, month, year } = params;

    if (!user_id) {
      throw new Error('User ID is required.');
    }

    if (typeof user_id !== 'number') {
      throw new Error('User ID must be an integer.');
    }

    if (!month || !year) {
      throw new Error('Month and Year are required.');
    }

    if (!moment(`${year}-${month}`, 'YYYY-MM', true).isValid()) {
      throw new Error('Month must be in the format YYYY-MM.');
    }

    const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate();
    const endDate = moment(startDate).endOf('month').toDate();

    const timeSheets = await this.timeSheetRepository.find({
      where: { user_id, date: Between(startDate, endDate) }
    });
    // No changes needed in this method based on the guidelines provided
    return { status: 200, time_sheets: timeSheets.map(ts => ({ ...ts, day_type: ts.day_type })) };
  }
}
