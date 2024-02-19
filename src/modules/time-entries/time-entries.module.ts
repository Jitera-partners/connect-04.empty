import { Module } from '@nestjs/common';
import { TimeEntriesService } from './time-entries.service';
import { TimeEntriesController } from './time-entries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeEntryRepository } from 'src/repositories/time-entries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TimeEntryRepository])],
  controllers: [TimeEntriesController],
  providers: [TimeEntriesService],
  exports: [TimeEntriesService],
})
export class TimeEntriesModule {}
