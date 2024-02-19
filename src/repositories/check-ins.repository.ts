import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { CheckIn } from '@entities/check_ins';

@Injectable()
export class CheckInRepository extends BaseRepository<CheckIn> {}
