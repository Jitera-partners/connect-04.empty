import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserRepository } from 'src/repositories/users.repository';
import { PermissionRepository } from 'src/repositories/permissions.repository';
import { User } from 'src/entities/users';
import { Permission } from 'src/entities/permissions';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async checkEditTimeEntryPermission(userId: number, role: string): Promise<boolean> {
    const user: User = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || user.role !== role) {
      throw new ForbiddenException('User role does not match or user not found.');
    }

    const permission: Permission = await this.permissionRepository.findOne({ where: { role: user.role } });
    if (!permission || !permission.can_edit_time_entries) {
      throw new ForbiddenException('You do not have permission to edit time entries.');
    }

    return true;
  }
}
