import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntriesController } from './time-entries.controller';
import { TimeEntriesService } from './time-entries.service';
import { TimeEntryRepository } from 'src/repositories/time-entries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntryRepository])],
  controllers: [TimeEntriesController],
  providers: [TimeEntriesService],
  exports: [TimeEntriesService], // Added from existing code
})
export class TimeEntriesModule {}
