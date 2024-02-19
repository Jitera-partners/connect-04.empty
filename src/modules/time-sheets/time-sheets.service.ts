
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
    const { user_id, selectedMonth, selectedYear } = params; // Changed userId to user_id
    const currentDate = moment();
    const selectedDate = moment(`${selectedYear}-${selectedMonth}`, 'YYYY-MM');
    const timeEntries: TimeSheet[] = await this.timeSheetRepository.find({ // Type added to timeEntries
      where: {
        user_id: Number(user_id), // Ensure user_id is a number
        date: Between(
          new Date(selectedDate.startOf('month').format('YYYY-MM-DD')), // Wrapped with new Date()
          new Date(selectedDate.endOf('month').format('YYYY-MM-DD')) // Wrapped with new Date()
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
      day_type: entry.day_type, // Changed to day_type
      checkInTime: entry.check_in_time,
      checkOutTime: entry.check_out_time,
      total_hours: entry.total_hours // Changed to total_hours
    })).map(entry => ({ // Added map to include id, created_at, updated_at, and day_type
      ...entry,
      id: entry.id,
      created_at: entry.created_at,
      updated_at: entry.updated_at,
      day_type: entry.day_type
    }));

    return { timeEntries: formattedTimeEntries };
  }

  async viewCurrentMonthTimeSheet(userId: number): Promise<{ status: number; time_sheets: any[]; message?: string; }> {
    const { month, year } = getCurrentMonthAndYear(); // Use the utility function to get the current month and year
    const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate();
    const endDate = moment(startDate).endOf('month').toDate();

    const timeEntries = await this.timeSheetRepository.find({
      where: { user_id: userId, date: Between(startDate, endDate) }, // Corrected where clause
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
        day_type: entry.day_type, // Changed to day_type
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
    const { user_id, month, year } = params; // Add year to the destructured parameters

    if (!user_id) {
      throw new Error('User ID is required.');
    }

    if (typeof user_id !== 'number') {
      throw new Error('User ID must be an integer.');
    }

    if (!month || !year) { // Check for both month and year
      throw new Error('Month and Year are required.'); // Update error message to include year
    }

    if (!moment(`${year}-${month}`, 'YYYY-MM', true).isValid()) { // Check for valid year and month
      throw new Error('Month must be in the format YYYY-MM.');
    }

    const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').startOf('month').toDate(); // Convert to Date object
    const endDate = moment(startDate).endOf('month').toDate(); // Convert to Date object

    const timeSheets = await this.timeSheetRepository.find({
      where: { user_id, date: Between(startDate, endDate) }
    });

    return { status: 200, time_sheets: timeSheets.map(ts => ({ ...ts, day_type: ts.day_type })) }; // Added map to include day_type
  }
}
