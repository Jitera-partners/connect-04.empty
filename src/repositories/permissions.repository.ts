import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/base.repository';
import { Permission } from '@entities/permissions';

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {}
