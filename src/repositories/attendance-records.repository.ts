import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { AttendanceRecord } from '@entities/attendance_records';

@Injectable()
export class AttendanceRecordRepository extends BaseRepository<AttendanceRecord> {}
