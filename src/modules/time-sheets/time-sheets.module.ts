import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeSheetRepository } from 'src/repositories/time-sheets.repository';
import { TimeSheetsService } from './time-sheets.service';
import { TimeSheetsController } from './time-sheets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TimeSheetRepository]),
    // other necessary modules can be imported here
  ],
  controllers: [TimeSheetsController],
  providers: [
    TimeSheetsService,
    // TimeSheetRepository is already included in the TypeOrmModule.forFeature
    // so it does not need to be provided again here
  ],
  exports: [TimeSheetsService],
})
export class TimeSheetsModule {}
