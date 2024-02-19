
import { Module } from '@nestjs/common';
import { TimeSheetsController } from './time-sheets.controller';
import { TimeSheetsService } from './time-sheets.service';
import { TimeSheetRepository } from 'src/repositories/time-sheets.repository';

@Module({
  controllers: [TimeSheetsController],
  providers: [
    TimeSheetsService,
    TimeSheetRepository
  ],
})
export class TimeSheetsModule {}
