
import { Module } from '@nestjs/common';
import { AttendanceController } from './attendance.controller';

@Module({
  controllers: [AttendanceController],
  providers: [],
})
export class AttendanceModule {}
