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

    return { timeEntries: formattedTimeEntries as TimeSheet[] };
  }

  async viewCurrentMonthTimeSheet(userId: number): Promise<{ status: number; time_sheets: any[]; message?: string; }> {
    const { month, year } = getCurrentMonthAndYear(); // Use the utility function to get the current month and year
    const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate();
    const endDate = moment(startDate).endOf('month').toDate();

    const timeEntries = await this.timeSheetRepository.find({
      where: {
        user_id: userId,
        date: Between(startDate, endDate)
      },
      order: {
        date: 'ASC' // Ensure the time entries are ordered by date in ascending order
      }
    });

    if (timeEntries.length === 0) {
      return { status: 200, time_sheets: [], message: 'No time sheet records found for the current month.' };
    }

    // Format the time entries to match the required response structure
    const formattedTimeEntries = timeEntries.map(entry => {
      return {
        id: entry.id,
        date: entry.date,
        dayType: entry.day_type,
        checkInTime: entry.check_in_time,
        checkOutTime: entry.check_out_time,
        totalHours: entry.total_hours || moment(entry.check_out_time).diff(moment(entry.check_in_time), 'hours', true), // Added calculation for totalHours if not present
        user_id: entry.user_id
      };
    });

    return { status: 200, time_sheets: formattedTimeEntries };
  }

  // Added new method
  async viewSelectedMonthTimeSheet(params: ViewSelectedMonthTimeSheetDto): Promise<{ status: number; time_sheets?: TimeSheet[]; message?: string; }> {
    const { user_id, month } = params;

    if (!user_id) {
      throw new Error('User ID is required.');
    }

    if (typeof user_id !== 'number') {
      throw new Error('User ID must be an integer.');
    }

    if (!month) {
      throw new Error('Month is required.');
    }

    if (!moment(month, 'YYYY-MM', true).isValid()) {
      throw new Error('Month must be in the format YYYY-MM.');
    }

    const startDate = moment(month).startOf('month').format('YYYY-MM-DD');
    const endDate = moment(month).endOf('month').format('YYYY-MM-DD');

    const timeSheets = await this.timeSheetRepository.find({
      where: { user_id, date: Between(startDate, endDate) }
    });

    return { status: 200, time_sheets: timeSheets };
  }
}
