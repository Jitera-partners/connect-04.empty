import { Controller, Get, Query, UseGuards, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { TimeSheetsService } from './time-sheets.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { ViewPastTimeSheetsDto } from './dto/view-past-time-sheets.dto';

@Controller('api/time_sheets')
export class TimeSheetsController {
  constructor(private readonly timeSheetsService: TimeSheetsService) {}

  @Get('/current_month')
  @UseGuards(AuthGuard)
  async getCurrentMonthTimeSheet(@Query('user_id', ParseIntPipe) userId: number) {
    try {
      const timeSheets = await this.timeSheetsService.viewCurrentMonthTimeSheet(userId);
      return {
        status: HttpStatus.OK,
        time_sheets: timeSheets
      };
    } catch (error) {
      if (error.message === 'User not found.') {
        throw new HttpException('User not found.', HttpStatus.BAD_REQUEST);
      } else if (error.message === 'Invalid or future date selected.') {
        throw new HttpException('Invalid or future date selected.', HttpStatus.UNPROCESSABLE_ENTITY);
      } else {
        throw new HttpException('An unexpected error occurred on the server.', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Get('/past_months')
  @UseGuards(AuthGuard)
  async viewPastTimeSheets(@Query() query: ViewPastTimeSheetsDto) {
    try {
      const { user_id, month, year } = query;
      const timeSheets = await this.timeSheetsService.viewPastTimeSheets({ userId: user_id, selectedMonth: month, selectedYear: year });
      return {
        status: HttpStatus.OK,
        time_sheets: timeSheets.timeEntries,
      };
    } catch (error) {
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'An unexpected error occurred on the server.';

      if (error.message === 'User not found.') {
        status = HttpStatus.UNAUTHORIZED;
        message = error.message;
      } else if (error.message === 'Invalid month format.' || error.message === 'Invalid year format.') {
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = error.message;
      } else if (error.message === 'Invalid or future date selected.') {
        status = HttpStatus.BAD_REQUEST;
        message = error.message;
      }

      throw new HttpException({ status, message }, status);
    }
  }
}
